import type { NextConfig } from "next";

// Enable calling `getCloudflareContext()` in `next dev`
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
import DevInspector, { turbopackDevInspector } from "@mcpc-tech/unplugin-dev-inspector-mcp";
initOpenNextCloudflareForDev();

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.plugins.push(DevInspector.webpack({ enabled: true }));
    return config;
  },
  turbopack: {
    rules: turbopackDevInspector({ enabled: true }),
  },
  /* config options here */
};

export default nextConfig;
