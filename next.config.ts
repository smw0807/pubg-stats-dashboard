import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  serverRuntimeConfig: {
    // 서버에서만 사용할 환경 변수
  },
  publicRuntimeConfig: {
    // 클라이언트에서도 사용할 환경 변수
  },
  env: {
    PORT: process.env.PORT || '3000',
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.API_URL}/:path*`,
      },
    ];
  },
  // SEO 최적화 설정
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
  // 이미지 최적화
  images: {
    domains: ['pubg-stats-dashboard.vercel.app'],
    formats: ['image/webp', 'image/avif'],
  },
  // 헤더 설정
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
