<center>
  <a href="http://iswebassemblyfastyet.com/">
    <img src="https://www.nutrient.io/assets/images/blog/2018/webassembly-benchmark/article-header.png?commit=d5901d372044382ad59d52a0dac7d4a136db7816" width="1000" style="max-width: 100%;">
  </a>
</center>

# WebAssembly Benchmark by Nutrient

A Benchmark for WebAssembly (Wasm, WA) that uses [Nutrient Web SDK](https://www.nutrient.io/web/) Standalone.

The rendering engine of [Nutrient Web SDK](https://www.nutrient.io/web/) Standalone is written in C/C++ and compiled to Wasm.

Get your score in the [live demo](http://iswebassemblyfastyet.com/) and learn more in our [blog post](https://www.nutrient.io/blog/a-real-world-webassembly-benchmark/).

## Prerequisites

- [Node.js](http://nodejs.org/) (with npm or Yarn)
- A Nutrient Web SDK license. If you don't already have one
  you can [request a free trial here](https://www.nutrient.io/try/).

## Getting Started

Install the `@nutrient-sdk/viewer` npm package and move all contents to the vendor directory.

```bash
npm install --save @nutrient-sdk/viewer
mkdir -p public/vendor
cp -R node_modules/@nutrient-sdk/viewer/dist public/vendor/nutrient
```

Bootstrap the project by installing all the other dependencies.

```bash
npm install
```

## Running the Benchmark

Now that Nutrient Web SDK is installed, you need to copy your product (license) key to the `public/license-key` file.

We can now run the benchmark server:

```bash
npm start
```

The benchmark is available at `http://localhost:3000`.

## Building a Production Version

You can build an optimized version using the following command:

```bash
PUBLIC_URL="/webassembly-benchmark/" npm run build
```

Where `PUBLIC_URL` must be set according to the final URL, where the application is hosted, so the benchmark will be available at `http://your-domain.com/webassembly-benchmark/`.

## Optimizations

The following optimizations can be enabled via URL parameter:

- `disableWebAssemblyStreaming`, `false` by default
- `standaloneInstancesPoolSize`, `0` by default
- `runsScaleFactor`, scales the number of test runs, `1` by default

## What's in This Repository

This repository contains files used to build the [Nutrient WebAssembly benchmark](http://iswebassemblyfastyet.com/).

The source files are structured into two different categories:

- `src/lib` contains all files necessary to set up the test suite including the individual tests and helper functions.
- `src/ui` contains a [React](https://reactjs.org/) application that is used to render the user interface.

For a main entry point, have a look at `src/index.js`.

## License

This software is licensed under [the MIT license](LICENSE).

## Contributing

Please ensure
[you have signed our CLA](https://www.nutrient.io/guides/web/current/miscellaneous/contributing/) so that we can
accept your contributions.
