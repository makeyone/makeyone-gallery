import { NextConfig } from 'next';

import createNextIntlPlugin from 'next-intl/plugin';

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
    ],
  },
  env: {
    FRONT_SERVER_URL: process.env.FRONT_SERVER_URL,
    API_SERVER_URL: process.env.API_SERVER_URL,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    LOKALISE_API_TOKEN: process.env.LOKALISE_API_TOKEN,
    LOKALISE_PROJECT_ID: process.env.LOKALISE_PROJECT_ID,
  },
  compiler: {
    removeConsole: isProd,
  },
  experimental: {
    middlewarePrefetch: 'flexible',
  },
};

const withNextIntl = createNextIntlPlugin();

module.exports = withNextIntl(nextConfig);
