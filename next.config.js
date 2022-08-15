/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["imgur.com", "farm1.staticflickr.com"],
  },
  // reactStrictMode: false,
};

module.exports = nextConfig;
