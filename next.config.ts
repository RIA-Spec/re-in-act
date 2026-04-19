import type { NextConfig } from "next";

// Enable calling `getCloudflareContext()` in `next dev`
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
// import DevInspector, { turbopackDevInspector } from "@mcpc-tech/unplugin-dev-inspector-mcp";
initOpenNextCloudflareForDev();

const nextConfig: NextConfig = {
  output: "standalone",
  transpilePackages: ["next-mdx-remote"],
  async redirects() {
    return [
      {
        source: "/opengraph-image",
        destination: "/og",
        permanent: true,
      },
    ];
  },
  webpack: (config) => {
    // config.plugins.push(DevInspector.webpack({ enabled: true }));
    return config;
  },
  turbopack: {
    root: __dirname,
    // rules: turbopackDevInspector({ enabled: true }),
  },
};

export default nextConfig;
