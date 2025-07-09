import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Next.js의 Webpack 설정을 커스터마이징합니다.
  webpack: (config, { isServer }) => {
    // isServer는 현재 빌드가 서버 측(true)인지 클라이언트 측(false)인지를 나타냅니다.
    // 클라이언트 측 빌드일 때만 'fs' 모듈을 무시하도록 설정합니다.
    if (!isServer) {
      config.resolve.fallback = {
        // 기존 fallback 설정을 유지하면서 'fs'를 추가합니다.
        // 이는 다른 모듈에 대한 fallback 설정이 있을 경우를 대비합니다.
        ...config.resolve.fallback,
        fs: false, // 클라이언트 번들에 'fs' 모듈이 포함되지 않도록 합니다.
      };
    }

    // 수정된 Webpack 설정을 반환합니다.
    return config;
  },

  // 여기에 다른 Next.js 설정 옵션을 추가할 수 있습니다.
  // 예: images: { domains: ['example.com'] },
  //     reactStrictMode: true,
};

export default nextConfig;