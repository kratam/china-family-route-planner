import type { NextConfig } from "next";

const onGitHubPages = process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
  output: "export",
  basePath: onGitHubPages ? "/china-family-route-planner" : "",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
