import type { NextConfig } from "next";

const allowedOrigins =
  process.env.DEV_ALLOWED_ORIGINS
    ?.split(",")
    .filter(Boolean) ?? [];

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },

  ...(process.env.NODE_ENV === "development"
    ? { allowedDevOrigins: allowedOrigins }
    : {})
};

export default nextConfig;
