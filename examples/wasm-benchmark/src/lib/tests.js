import { createRunner } from "./runner";
import { clearAllTimings, isMobileOS, isWasmSupported } from "./utils";

export function createBenchmark(pdf, licenseKey, conf) {
  // Factory to create our test suite. It will register all tests in the runner.
  const isWasm = isWasmSupported()

  const runner = createRunner(licenseKey);

  runner.bench(
    "Test-Rendering",
    async () => {
      const instance = await prepareInstance();
      const totalPageCount = instance.totalPageCount;

      const promises = [];

      for (let pageIndex = 0; pageIndex < totalPageCount; pageIndex++) {
        promises.push(
          instance.renderPageAsArrayBuffer({ height: 1024 }, pageIndex),
        );
      }

      performance.mark("renderStart");
      await Promise.all(promises);
      performance.mark("renderEnd");

      performance.measure(
        "render tiles for a page",
        "renderStart",
        "renderEnd",
      );

      return performance.getEntriesByType("measure");
    },
    {
      times: scaleRuns(10),
      bucket: "rest",
    },
  );

  runner.bench(
    "Test-Searching",
    async () => {
      const instance = await prepareInstance();

      const promises = [];

      for (let i = 0; i < 50; i++) {
        promises.push(instance.search("the"));
      }

      performance.mark("searchStart");
      await Promise.all(promises);
      performance.mark("searchEnd");

      performance.measure("search text", "searchStart", "searchEnd");

      return performance.getEntriesByType("measure");
    },
    {
      times: scaleRuns(10),
      bucket: "rest",
    },
  );

  runner.bench(
    "Test-Exporting",
    async () => {
      const instance = await prepareInstance();

      performance.mark("exportStart");
      await Promise.all([
        instance.exportPDF(),
        instance.exportPDF(),
        instance.exportPDF({ flatten: true }),
        instance.exportPDF({ flatten: true }),
        instance.exportXFDF(),
        instance.exportXFDF(),
      ]);
      performance.mark("exportEnd");

      performance.measure("different exports", "exportStart", "exportEnd");

      return performance.getEntriesByType("measure");
    },
    {
      times: scaleRuns(10),
      bucket: "rest",
    },
  );

  runner.bench(
    "Test-Annotations",
    async () => {
      const instance = await prepareInstance();

      const annotation = new window.PSPDFKit.Annotations.TextAnnotation({
        pageIndex: 0,
        text: { format: "plain", value: "test" },
        boundingBox: new window.PSPDFKit.Geometry.Rect({
          width: 200,
          height: 30,
        }),
      });
      const range = [...new Array(100)];

      performance.mark("createAnnotationStart");

      const annotations = (
        await Promise.all(range.map(() => instance.create(annotation)))
      ).map((createdAnnotations) => createdAnnotations[0]);

      // Nutrient Web SDK will only write annotations back to the PDF when it
      // has to. To make sure this is happening, we profile the exportPDF
      // endpoint.
      await instance.exportPDF();

      await Promise.all(annotations.map((a) => instance.delete(a.id)));

      performance.mark("createAnnotationEnd");

      performance.measure(
        "create annotation",
        "createAnnotationStart",
        "createAnnotationEnd",
      );

      return performance.getEntriesByType("measure");
    },
    {
      times: scaleRuns(10),
      bucket: "rest",
    },
  );

  runner.bench(
    "Test-Initialization",
    async () => {
      performance.mark("loadStart");

      await prepareInstance(
        /* canReuseLastOne */ false,
        /* clearTimings */ false,
      );

      performance.mark("loadEnd");
      performance.measure("load", "loadStart", "loadEnd");

      return performance.getEntriesByType("measure");
    },
    {
      // We decrease the number of initialization runs on mobile systems to avoid OOM errors.
      times: scaleRuns(isMobileOS() ? 2 : 3),
      bucket: "load",
    },
  );

  // We want to reuse the instance in the following tests. To achieve this, we
  // store it in the function closure.
  let instance;
  let unload;

  async function prepareInstance(canReuseLastOne = true, clearTimings = true) {
    if (!canReuseLastOne) {
      unload?.();
      unload = null;
      instance = null;
    }

    if (!instance) {
      const result = await runner.load(pdf.slice(0), conf);

      instance = result.instance;
      unload = result.unload;
      clearTimings && clearAllTimings();
    }

    return instance;
  }

  // It's possible to scale the individual test runs by a scale factor defined
  // as a query parameter `?runsScaleFactor=2` would run all test twice as much as
  // regular.
  //
  // This will always return at least one.
  function scaleRuns(runs) {
    const params = {};

    window.location.search
      .substring(1)
      .replace(/([^=&]+)=([^&]*)/g, (m, key, value) => {
        params[decodeURIComponent(key)] = decodeURIComponent(value);
      });

    let runsScaleFactor = 1;

    if (typeof params.runsScaleFactor !== "undefined") {
      runsScaleFactor = Number.parseFloat(params.runsScaleFactor);

      if (Number.isNaN(runsScaleFactor)) {
        runsScaleFactor = 1;
      }
    }

    runs = Math.ceil(runs * runsScaleFactor);

    return Math.min(
      // We always want to return at least one run.
      Math.max(1, runs),
      // Anything higher then 100 runs does not really make any sense
      100,
    );
  }

  return {
    run: runner.run,
    isWasm,
  };
}
