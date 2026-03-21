/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'https://i5nrun-ci2ahz-7777.proxy.runpod.net',
  },
};

module.exports = nextConfig;
