import { Geist, Geist_Mono } from 'next/font/google';
import { GoogleAnalytics } from '@next/third-parties/google';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';
import { Metadata } from 'next';
import Script from 'next/script';
import Providers from '~/components/Providers';
import ThemeToggle from '~/components/ThemeToggle';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'PUBG 전적 분석 대시보드 - 배틀그라운드 통계 검색',
    template: '%s | PUBG 전적 분석',
  },
  description:
    'PUBG 배틀그라운드 플레이어 전적 검색, 매치 분석, 팀 통계를 제공하는 대시보드입니다. 매치 데이터와 상세한 통계 분석을 확인하세요.',
  keywords: [
    'PUBG',
    '배틀그라운드',
    '전적검색',
    '매치분석',
    '게임통계',
    '배그전적',
  ],
  authors: [{ name: 'PUBG Stats Dashboard' }],
  creator: 'PUBG Stats Dashboard',
  publisher: 'PUBG Stats Dashboard',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://pubg-stats-dashboard.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://pubg-stats-dashboard.vercel.app',
    title: 'PUBG 전적 분석 대시보드 - 배틀그라운드 통계 검색',
    description:
      'PUBG 배틀그라운드 플레이어 전적 검색, 매치 분석, 팀 통계를 제공하는 대시보드입니다.',
    siteName: 'PUBG 전적 분석 대시보드',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'PUBG 전적 분석 대시보드',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PUBG 전적 분석 대시보드 - 배틀그라운드 통계 검색',
    description:
      'PUBG 배틀그라운드 플레이어 전적 검색, 매치 분석, 팀 통계를 제공하 대시보드입니다.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1e40af" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2744752399044248"
          crossOrigin="anonymous"
        ></script>
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('pubg-stats-dashboard.theme');
                  var isDark = theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches);
                  if (isDark) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {
                  // localStorage 접근 실패 시 기본값 사용 (다크모드)
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <Providers>
          <ThemeToggle />
          {children}
          <Analytics />
        </Providers>
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'PUBG 전적 분석 대시보드',
              description:
                'PUBG 배틀그라운드 플레이어 전적 검색, 매치 분석, 팀 통계를 제공하는 대시보드',
              url: 'https://pubg-stats-dashboard.vercel.app',
              applicationCategory: 'Game',
              operatingSystem: 'Web Browser',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'KRW',
              },
              author: {
                '@type': 'Organization',
                name: 'PUBG Stats Dashboard',
              },
            }),
          }}
        />
        <GoogleAnalytics gaId="G-XYZ" />
      </body>
    </html>
  );
}
