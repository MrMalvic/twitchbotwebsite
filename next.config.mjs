/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ["*"],
    },
  },
  env: {
    PORT: process.env.PORT || 3000,
  },
};

export default nextConfig;
