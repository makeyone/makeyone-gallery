import { NextConfig } from 'next';

const isProd = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.makeyone.com',
      },
      {
        protocol: 'https',
        hostname: 'makeyone-resources.s3.ap-southeast-1.amazonaws.com',
      },
    ],
  },
  env: {
    FRONT_SERVER_URL: process.env.FRONT_SERVER_URL,
    API_SERVER_URL: process.env.API_SERVER_URL,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  },
  compiler: {
    removeConsole: isProd,
  },
};

module.exports = nextConfig;
