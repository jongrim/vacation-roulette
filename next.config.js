/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "https://vacation-roulette.vercel.app/",
      "https://vacation-roulette-jonjongrim.vercel.app/",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "maps.googleapis.com",
      },
    ],
  },
};

module.exports = nextConfig;
