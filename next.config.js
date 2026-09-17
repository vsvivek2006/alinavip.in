/** @type {import('next').NextConfig} */
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline';
  style-src 'self' 'unsafe-inline';
  img-src 'self' blob: data: https:;
  font-src 'self';
  connect-src 'self' https://wa.me https://api.whatsapp.com;
  frame-ancestors 'self';
  form-action 'self' https://wa.me https://api.whatsapp.com;
  base-uri 'self';
  object-src 'none';
`.replace(/\s{2,}/g, ' ').trim();

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  images: {
    unoptimized: false,
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.roshnikhanna.in',
      },
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io',
      },
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=()' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'Content-Security-Policy', value: ContentSecurityPolicy },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/(favicon.svg|apple-touch-icon.png|manifest.json|robots.txt)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800' },
        ],
      },
      {
        source: '/sitemap(.*).xml',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=3600, stale-while-revalidate=86400' },
        ],
      },
    ];
  },
  async redirects() {
    return [
      { source: '/call-girls', destination: '/services', permanent: true },
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
      // Duplicate alias pages → canonical
      { source: '/about-us', destination: '/about', permanent: true },
      { source: '/contact-us', destination: '/contact', permanent: true },
      { source: '/escorts-categories', destination: '/categories', permanent: true },
      { source: '/gurgaon-escorts-rates', destination: '/rates', permanent: true },
      { source: '/gurgaon-escorts-phone-number', destination: '/phone-number', permanent: true },
      { source: '/location', destination: '/locations', permanent: true },
      { source: '/terms-and-conditions', destination: '/terms', permanent: true },
    ];
  },
};

export default nextConfig;
