/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,

  // API proxy to backend services
  async rewrites() {
    return [
      {
        source: '/api/auth/:path*',
        destination: process.env.AUTH_SERVICE_URL || 'http://localhost:3001/:path*'
      },
      {
        source: '/api/content/:path*',
        destination: process.env.CONTENT_SERVICE_URL || 'http://localhost:3002/:path*'
      },
      {
        source: '/api/subscription/:path*',
        destination: process.env.SUBSCRIPTION_SERVICE_URL || 'http://localhost:3003/:path*'
      },
      {
        source: '/api/admin/:path*',
        destination: process.env.ADMIN_SERVICE_URL || 'http://localhost:3100/:path*'
      }
    ];
  },

  // Environment variables available in browser
  env: {
    APP_NAME: 'METRODA Admin',
    APP_VERSION: '1.0.0'
  }
};

module.exports = nextConfig;
