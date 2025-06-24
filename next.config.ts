import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  serverRuntimeConfig: {
    // 서버에서만 사용할 환경 변수
  },
  publicRuntimeConfig: {
    // 클라이언트에서도 사용할 환경 변수
  },
};

export default nextConfig;
