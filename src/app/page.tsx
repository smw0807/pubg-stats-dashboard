import { Metadata } from 'next';
import PlayerSearch from '../components/PlayerSearch';

export const metadata: Metadata = {
  title: 'PUBG 전적 분석 대시보드 - 배틀그라운드 통계 검색',
  description:
    'PUBG 배틀그라운드 플레이어 전적 검색, 매치 분석, 팀 통계를 제공하는 대시보드입니다. 매치 데이터와 상세한 통계 분석을 확인하세요.',
  keywords: [
    'PUBG',
    '배틀그라운드',
    '전적검색',
    '매치분석',
    '게임통계',
    'PUBG API',
    '배그전적',
  ],
  openGraph: {
    title: 'PUBG 전적 분석 대시보드 - 배틀그라운드 통계 검색',
    description:
      'PUBG 배틀그라운드 플레이어 전적 검색, 매치 분석, 팀 통계를 제공하는 대시보드입니다.',
    url: 'https://pubg-stats-dashboard.vercel.app',
    siteName: 'PUBG 전적 분석 대시보드',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'PUBG 전적 분석 대시보드',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <PlayerSearch />
    </div>
  );
}
