import { hostname } from "os";

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true, // Ensures updated service workers take control
});

const nextConfig = withPWA({
  env:{
    NEXT_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL
  },
  reactStrictMode: false, // Keep it outside PWA config
  typescript: {
    ignoreBuildErrors: true,
  },
  swcMinify: true,
  images: {
    domains: ["media.licdn.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.licdn.com",
        pathname: "/dms/image/**",
      },
    ],
  },
});

export default nextConfig;
