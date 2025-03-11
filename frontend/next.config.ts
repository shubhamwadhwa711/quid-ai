const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true, // Ensures updated service workers take control
});

const nextConfig = withPWA({
  reactStrictMode: true, // Keep it outside PWA config
  swcMinify: true,
});

export default nextConfig;
