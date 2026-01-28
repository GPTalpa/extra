import type { NextConfig } from "next";
import path from "path";
import withBundleAnalyzer from "@next/bundle-analyzer";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import type { Configuration } from "webpack";

const nextConfig: NextConfig = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
})({
  reactStrictMode: true,
  poweredByHeader: false,
  output: "standalone",
  compress: true,
  sassOptions: {
    includePaths: [path.join(process.cwd(), "/styles")],
  },
  webpack(
    config: Configuration,
    { dev, isServer }: { dev: boolean; isServer: boolean },
  ) {
    // Алиасы
    if (config.resolve?.alias) {
      Object.assign(config.resolve.alias, {
        "@": path.resolve(__dirname, "/"),
        "@app": path.resolve(__dirname, "app"),
        "@ui": path.resolve(__dirname, "components/ui"),
        "@layout": path.resolve(__dirname, "components/layout"),
        "@sections": path.resolve(__dirname, "components/sections"),
        "@components": path.resolve(__dirname, "components"),
        "@lib": path.resolve(__dirname, "lib"),
        "@hooks": path.resolve(__dirname, "hooks"),
        "@styles": path.resolve(__dirname, "styles"),
        "@mytypes": path.resolve(__dirname, "types"),
        "@utils": path.resolve(__dirname, "utils"),
      });
    }

    // Минификация CSS только для клиентского продакшн
    if (!dev && !isServer && config.optimization?.minimizer) {
      config.optimization.minimizer.push(new CssMinimizerPlugin());
    }

    return config;
  },
});

export default nextConfig;
