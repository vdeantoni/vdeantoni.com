import nextConfig from "eslint-config-next/core-web-vitals";

// Post demos: their sources repeat the article code, and the bundles are generated
const config = [...nextConfig, { ignores: ["demos/", "public/demos/"] }];

export default config;
