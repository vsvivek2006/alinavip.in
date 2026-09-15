/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    unoptimized: false,
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },
  async redirects() {
    return [
      { source: '/call-girls', destination: '/services', permanent: true },
      { source: '/escorts', destination: '/services', permanent: true },
      { source: '/russian-escorts', destination: '/category/russian-call-girls', permanent: true },
      { source: '/vip-escorts', destination: '/category/vip-call-girls', permanent: true },
      { source: '/model-escorts', destination: '/category/model-escorts', permanent: true },
      { source: '/college-girls', destination: '/category/college-girls', permanent: true },
      { source: '/housewife-escorts', destination: '/category/housewife-escorts', permanent: true },
      { source: '/independent-escorts', destination: '/category/independent-girls', permanent: true },
      { source: '/air-hostess-escorts', destination: '/category/air-hostess', permanent: true },
      { source: '/celebrity-escorts', destination: '/category/celebrity-escorts', permanent: true },
      { source: '/category/celebrity-call-girls', destination: '/category/celebrity-escorts', permanent: true },
      { source: '/travel-escorts', destination: '/category/travel-escorts', permanent: true },
      { source: '/vip-call-girls', destination: '/category/vip-call-girls', permanent: true },
      { source: '/category', destination: '/services', permanent: true },
      { source: '/robot.txt', destination: '/robots.txt', permanent: true },
      { source: '/llm.txt', destination: '/llms.txt', permanent: true },
      { source: '/locations/sector-41', destination: '/locations/south-city', permanent: true },
      { source: '/locations/sector-58', destination: '/locations/golf-course-extension-road', permanent: true },
    ];
  },
};

export default nextConfig;
