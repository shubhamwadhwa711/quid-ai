import { hostname } from "os";

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true, // Ensures updated service workers take control
});

const nextConfig = withPWA({
  env: {
    NEXT_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
  },
  reactStrictMode: false, // Keep it outside PWA config
  typescript: {
    ignoreBuildErrors: true,
  },
  swcMinify: true,
  images: {
    domains: [
      "media.licdn.com",
      "s3-alpha-sig.figma.com",
      "res.cloudinary.com",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.licdn.com",
        pathname: "/dms/image/**",
      },
      {
        protocol: "https",
        hostname: "s3-alpha-sig.figma.com",
        pathname: "/img/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/dgz1duuwu/image/upload/**",
      },
    ],
  },
});

export default nextConfig;
