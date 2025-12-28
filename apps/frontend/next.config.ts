import type { NextConfig } from 'next';
import path from 'path';
import type { Configuration } from 'webpack';

const nextConfig: NextConfig = {
  /* config options here */
  // Port configuration is handled via package.json script
  webpack: (config: Configuration) => {
    if (config.resolve?.alias) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@fe': path.resolve(__dirname, 'src'),
        '@': path.resolve(__dirname, 'src'),
      };
    }
    return config;
  },
};

export default nextConfig;
