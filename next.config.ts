import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs/config";

const nextConfig: NextConfig = {
  redirects() {
    return [
      // Links elsewhere on the web still use the post's old URL
      {
        source: "/posts/create-a-proximity-graph-animation",
        destination: "/posts/create-a-particle-network-animation",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "miro.medium.com",
      },
    ],
  },
};

export default withSentryConfig(nextConfig, {
  silent: true,
  org: "vdeantoni",
  project: "vdeantoni",
  authToken: process.env.SENTRY_AUTH_TOKEN,
  widenClientFileUpload: true,
  tunnelRoute: "/monitoring",
});
