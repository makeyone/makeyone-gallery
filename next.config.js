const isProd = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost', 'res.makeyone.com'],
    unoptimized: true,
  },
  env: {},
  compiler: {
    removeConsole: isProd,
  }
};

module.exports = nextConfig;
