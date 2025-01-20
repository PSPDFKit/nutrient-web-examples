// Exclude pspdfkit from the client-side bundle to optimize performance
// and avoid potential conflicts with the script loaded in layout.js
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.externals = config.externals || [];
      config.externals.push({
        pspdfkit: "pspdfkit",
      });
    }

    return config;
  },
  experimental: {
    turbo: {
      resolveAlias: {
        pspdfkit: "pspdfkit",
      },
    },
  },
};

module.exports = nextConfig;
