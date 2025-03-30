import { NextConfig } from 'next';
const nextConfig: NextConfig = {
  // Use the correct config option for external packages
  serverExternalPackages: ['pdf-parse'],
};

module.exports = nextConfig;