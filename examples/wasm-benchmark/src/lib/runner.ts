import {
  cleanupMeasurement,
  clearAllTimings,
  getConfigOptionsFromURL,
  median,
} from "./utils";

type TestData = {
  benchmarkFn: () => Promise<any>;
  opts: Record<string, any>;
  state: string;
  progress: number;
  totalTime: number;
  medians: Array<{ name: string; median: number }>;
};

export function createRunner(licenseKey: string) {
  const tests = {} as Record<string, TestData>;

  // Register a benchmark to test
  function bench(id: string, benchmarkFn: () => Promise<any>, opts: Record<string, any> = {}) {
    tests[id] = {
      benchmarkFn,
      opts,
      state: "idle",
      progress: 0,
      totalTime: 0,
      medians: [],
    };
  }

  // Run the test suite. The `onChange` callback will fire whenever the progress
  // of a single test is changed.
  async function run(onChange: (tests: Record<string, TestData>) => void) {
    function notify() {
      onChange(tests);
    }

    const score = {
      load: 0,
      rest: 0,
    };

    for (const testId in tests) {
      const test = tests[testId];

      const { opts, benchmarkFn } = test;
      const totalRuns = opts.times || 1;

      // Mark the current test as running and re-render.
      test.state = "running";

      notify();

      const measurements: Record<string, Array<{ name: string; duration: number }>> = {};

      for (let i = 0; i < totalRuns; i++) {
        clearAllTimings();

        const results = await benchmarkFn();

        // benchmarkFn returns an array of performance measurement objects. In
        // a first step, we filter those results.
        results.forEach((result: any) => {
          const { name } = result;

          if (!measurements[name]) {
            measurements[name] = [];
          }

          measurements[name].push(
            // remove time to load chunks and the pdf from `load`
            opts.bucket === "load"
              ? {
                  name: result.name,
                  duration: cleanupMeasurement(result.duration),
                }
              : { name: result.name, duration: result.duration },
          );
        });

        // Update the progress indicator and re-render.
        test.progress = Math.round((100 * (i + 1)) / totalRuns);

        notify();
      }

      // Collect all relevant timings.
      const medians = Object.keys(measurements).map((name) => ({
        name,
        median: median(measurements[name].map((m: any) => m.duration)),
      }));
      const totalTime = Math.round(
        medians.reduce((sum, { median }) => sum + median, 0),
      );

      // Add the total time of the test to the final score.
      if (score.hasOwnProperty(opts.bucket)) {
        if (opts.bucket !== "load" || score.load === 0) {
          (score as any)[opts.bucket] += totalTime;
        }
      }

      // Update the state and re-render
      test.totalTime = totalTime;

      test.medians = medians;

      test.state = "complete";

      notify();
    }

    return score;
  }

  function load(pdf: any, conf: any = {}) {
    const defaultConf = getConfigOptionsFromURL().nutrientConfig;
    const configuration = Object.assign(
      {
        document: pdf,
        headless: true,
        licenseKey,
      },
      defaultConf,
      conf,
    );

    return (window as any).NutrientViewer.load(configuration).then((instance: any) => ({
      instance,
      unload: () => {
        (window as any).NutrientViewer.unload(instance);
        instance = null;
        pdf = null;
      },
    }));
  }

  return { load, bench, run };
}
