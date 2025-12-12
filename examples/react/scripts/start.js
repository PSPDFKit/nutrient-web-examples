#!/usr/bin/env node

function getWebpackDevServerMajorVersion() {
  try {
    const pkgJson = require("webpack-dev-server/package.json");
    if (!pkgJson || typeof pkgJson.version !== "string") {
      return null;
    }
    const major = Number.parseInt(pkgJson.version.split(".")[0], 10);
    return Number.isNaN(major) ? null : major;
  } catch (error) {
    return null;
  }
}

function patchWebpackDevServerConfig() {
  const major = getWebpackDevServerMajorVersion();
  if (major === null || major < 5) {
    return;
  }

  const configPath = require.resolve(
    "react-scripts/config/webpackDevServer.config",
  );
  const originalFactory = require(configPath);

  const patchedFactory = (proxy, allowedHost) => {
    const originalConfig = originalFactory(proxy, allowedHost);

    const {
      https: httpsOption,
      onBeforeSetupMiddleware: onBefore,
      onAfterSetupMiddleware: onAfter,
      setupMiddlewares: originalSetup,
      ...restConfig
    } = originalConfig;

    const config = { ...restConfig };
    const existingSetup =
      typeof originalSetup === "function" ? originalSetup : null;

    if (
      Object.prototype.hasOwnProperty.call(originalConfig, "https") &&
      httpsOption
    ) {
      config.server =
        typeof httpsOption === "object"
          ? { type: "https", options: httpsOption }
          : "https";
    }

    if (typeof onBefore === "function" || typeof onAfter === "function") {
      config.setupMiddlewares = (middlewares, devServer) => {
        let resolvedMiddlewares = middlewares;

        if (existingSetup) {
          const result = existingSetup(middlewares, devServer);
          if (Array.isArray(result)) {
            resolvedMiddlewares = result;
          }
        }

        if (!devServer) {
          return resolvedMiddlewares;
        }

        if (typeof onBefore === "function") {
          onBefore(devServer);
        }

        if (typeof onAfter === "function") {
          onAfter(devServer);
        }

        return resolvedMiddlewares;
      };
    } else if (existingSetup) {
      config.setupMiddlewares = existingSetup;
    }

    return config;
  };

  require.cache[configPath].exports = patchedFactory;
}

patchWebpackDevServerConfig();

require("react-scripts/scripts/start");
