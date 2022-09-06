const { withSentryConfig } = require("@sentry/nextjs");

/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["res.cloudinary.com", "miro.medium.com"]
  },
  webpack: function(config) {
    config.module.rules.push({
      test: /\.ya?ml$/,
      use: "js-yaml-loader"
    });
    return config;
  },
  sentry: {
    hideSourceMaps: true
  }
};

const sentryWebpackPluginOptions = {
  silent: true
};

module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions);
