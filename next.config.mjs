import "./scripts/windows-symlink-fallback.mjs";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/webp"],
  },
};

export default nextConfig;

initOpenNextCloudflareForDev();
