const isProd = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost', 'res.makeyone.com'],
    unoptimized: true,
  },
  env: {
    FRONT_SERVER_URL: process.env.FRONT_SERVER_URL,
    API_SERVER_URL: process.env.API_SERVER_URL,
    RESOURCES_URL: process.env.RESOURCES_URL,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  },
  compiler: {
    removeConsole: isProd,
  }
};

module.exports = nextConfig;
