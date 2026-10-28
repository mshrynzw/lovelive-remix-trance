import "./scripts/windows-symlink-fallback.mjs";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/webp"],
  },
  async headers() {
    const tdm = [
      { key: "tdm-reservation", value: "0" },
      {
        key: "tdm-policy",
        value: "https://lovelive-trance.com/tdm-policy.txt",
      },
    ];
    return [
      { source: "/", headers: tdm },
      { source: "/:path*", headers: tdm },
    ];
  },
};

export default nextConfig;

initOpenNextCloudflareForDev();
