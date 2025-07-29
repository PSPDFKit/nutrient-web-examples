// This function takes a `duration` and subtracts the time to load chunks
// (Wasm artifacts) which otherwise would influence the final benchmark
// result.
const ignoredResourceRegex = /.*nutrient-viewer.w?asm.*/;

export function cleanupMeasurement(duration: number) {
  const ignoredResources = performance
    .getEntriesByType("resource")
    .filter((r) => ignoredResourceRegex.test(r.name));

  const noise = ignoredResources.reduce((time, resource) => {
    time += resource.duration;

    return time;
  }, 0);

  if (noise >= duration) {
    console.warn(
      "An error occurred while calculating the network noise. Including network noise in this example.",
      {
        duration,
        noise,
        ignoredResources,
      },
    );

    return duration;
  }

  return duration - noise;
}

export function clearAllTimings() {
  performance.clearMarks();
  performance.clearMeasures();
  performance.clearResourceTimings();
}

// Given an array of numbers it calculates the median value.
export function median(arr: number[]) {
  arr = arr.slice(0);

  arr.sort((a: number, b: number) => a - b);

  const half = Math.floor(arr.length / 2);

  if (arr.length % 2) {
    return arr[half];
  }
  return (arr[half - 1] + arr[half]) / 2.0;
}

// Parses the url to retrieve the configuration options for Nutrient Web SDK.
export function getConfigOptionsFromURL() {
  const params: Record<string, string> = {};

  window.location.search
    .substring(1)
    .replace(/([^=&]+)=([^&]*)/g, (m: string, key: string, value: string) => {
      params[decodeURIComponent(key)] = decodeURIComponent(value);
      return m;
    });

  const standaloneInstancesPoolSize = Number.parseInt(
    params.standaloneInstancesPoolSize,
    10,
  );

  return {
    nutrientConfig: {
      disableWebAssemblyStreaming:
      params.disableWebAssemblyStreaming !== undefined && params.disableWebAssemblyStreaming !== "false",
      standaloneInstancesPoolSize: Number.isNaN(standaloneInstancesPoolSize)
        ? 0
        : standaloneInstancesPoolSize,
      baseUrl: window.location.origin + (params.baseUrl || import.meta.env.BASE_URL) + 'vendor/nutrient/',
    },
    writeResults: params.writeResults === "true",
  };
}

// The same Wasm test that is used in Nutrient Web SDK
export function isWasmSupported() {
  try {
    // iOS ~11.2.2 has a known Wasm problem.
    // See: https://github.com/kripken/emscripten/issues/6042
    if (
      /iPad|iPhone|iPod/.test(navigator.userAgent) &&
      /11_2_\d+/.test(navigator.userAgent)
    ) {
      return false;
    }
  } catch (_) {
    // In case of an error, we simply continue to the regular feature check
  }

  return (
    typeof window.WebAssembly === "object" &&
    typeof window.WebAssembly.instantiate === "function"
  );
}

// We don't want to show the final Nutrient Web SDK view if we're on a mobile
// browser and only have limited resources available.
export function isMobileOS() {
  const { userAgent } = navigator;

  if (/windows phone/i.test(userAgent)) {
    return true;
  }

  if (/android/i.test(userAgent)) {
    return true;
  }

  if (/iPad|iPhone|iPod/.test(userAgent)) {
    return true;
  }

  return false;
}
