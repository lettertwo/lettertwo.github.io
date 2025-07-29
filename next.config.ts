import path from "node:path";
import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const withMDX = createMDX();

const nextConfig: NextConfig = withMDX({
  experimental: {
    mdxRs: true,
  },
});

if (process.env.NODE_ENV === "development") {
  nextConfig.outputFileTracingRoot = path.join(__dirname, "../../");
}

export default nextConfig;
