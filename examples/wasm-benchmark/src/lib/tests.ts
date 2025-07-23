import { NutrientWindow } from "..";
import { createRunner } from "./runner";
import { clearAllTimings, isMobileOS, isWasmSupported } from "./utils";

export function createBenchmark(pdf: any, licenseKey: any, conf: any) {
  // Factory to create our test suite. It will register all tests in the runner.
  const isWasm = isWasmSupported()

  const runner = createRunner(licenseKey);

  runner.bench(
    "Test-Rendering",
    async () => {
      const instance = await prepareInstance();
      const totalPageCount = (instance as any).totalPageCount;

      const promises = [];

      for (let pageIndex = 0; pageIndex < totalPageCount; pageIndex++) {
        promises.push(
          (instance as any).renderPageAsArrayBuffer({ height: 1024 }, pageIndex),
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
        promises.push((instance as any).search("the"));
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
        (instance as any).exportPDF(),
        (instance as any).exportPDF(),
        (instance as any).exportPDF({ flatten: true }),
        (instance as any).exportPDF({ flatten: true }),
        (instance as any).exportXFDF(),
        (instance as any).exportXFDF(),
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

      const annotation = new (NutrientWindow.NutrientViewer.Annotations as any).TextAnnotation({
        pageIndex: 0,
        text: { format: "plain", value: "test" },
        boundingBox: new (NutrientWindow.NutrientViewer as any).Geometry.Rect({
          width: 200,
          height: 30,
        }),
      });
      const range = [...new Array(100)];

      performance.mark("createAnnotationStart");

      const annotations = (
        await Promise.all(range.map(() => (instance as any).create(annotation)))
      ).map((createdAnnotations: any) => createdAnnotations[0]);

      // Nutrient Web SDK will only write annotations back to the PDF when it
      // has to. To make sure this is happening, we profile the exportPDF
      // endpoint.
      await (instance as any).exportPDF();

      await Promise.all(annotations.map((a: any) => (instance as any).delete(a.id)));

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
  let instance: any | null = null;
  let unload: any | null = null;

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
  function scaleRuns(runs: number) {
    const params = {} as Record<string, string>;

    NutrientWindow.location.search
      .substring(1)
      .replace(/([^=&]+)=([^&]*)/g, (m: string, key: string, value: string) => {
        params[decodeURIComponent(key)] = decodeURIComponent(value);

        return "";
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
