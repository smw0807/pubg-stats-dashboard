import { Metadata } from 'next';
import PlayerSearch from '~/components/PlayerSearch';
import ThemeToggle from '~/components/ThemeToggle';
import LargeInfo from '~/components/main-info/LargeInfo';
import SmallInfo from '~/components/main-info/SmallInfo';

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <ThemeToggle />
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        {/* Search Section */}
        <div className="max-w-2xl mx-auto mb-16 flex items-center justify-center min-h-[60vh]">
          <PlayerSearch />
        </div>

        {/* Features Showcase */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">
            주요 기능 소개
          </h2>

          {/* Recent Matches Feature */}
          <LargeInfo
            title="최근 매치 히스토리"
            description="최그라운드 플레이한 매치들의 기본 정보를 확인할 수 있습니다. 매치 결과, 킬 수, 순위 등 핵심 정보를 한눈에 파악하세요."
            summary={[
              '최근 매치 목록',
              '매치 결과 요약',
              '기본 성과 지표',
              '매치 상세 분석 링크',
            ]}
            imageUrl="/img/3.png"
          />

          {/* Match Analysis Feature */}
          <LargeInfo
            title="매치 상세 분석"
            description="선택한 매치의 상세한 분석 정보를 제공합니다. 팀 성과, 데미지, 킬 등 매치의 모든 측면을 분석해보세요."
            summary={[
              '매치별 상세 통계',
              '팀 기여도 분석',
              '데미지 및 킬 리더보드',
              '매치 통계',
            ]}
            imageUrl="/img/4.png"
            imagePosition="right"
          />

          {/* Player Stats Feature */}
          <LargeInfo
            title="플레이어 통계 분석"
            description="플레이어의 기본 게임 통계를 확인할 수 있습니다. 매치에서 달성한 데미지, 생존 시간, 킬 어시스트 등 다양한 지표를 제공합니다."
            summary={['성과', '생존 시간', '아이템 사용', '이동거리']}
            imageUrl="/img/7.png"
          />

          {/* Team Analysis Feature */}
          <LargeInfo
            title="팀 분석"
            description="매치 내 각 팀별로 성과를 분석할 수 있습니다. 팀 내 순위 비교, 팀내 최고 성과자 비교 등 팀 성과를 확인할 수 있습니다."
            summary={[
              '팀 달성 킬, 데미지',
              '팀 효율성 지표',
              '팀 내 최고 성과자 비교',
              '팀 내 순위 비교',
            ]}
            imageUrl="/img/11.png"
            imagePosition="right"
          />
        </div>

        {/* Additional Features Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">
            분석 기능들
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <SmallInfo
              title="매치 요약"
              description="해당 매치에 대한 요약 정보를 확인할 수 있습니다."
              imageUrl="/img/5.png"
            />

            <SmallInfo
              title="킬 분석"
              description="해매치에서 가장 많은 킬을 기록한 플레이어들을 확인할 수 있습니다."
              imageUrl="/img/6.png"
            />

            <SmallInfo
              title="생존 리더보드"
              description="가장 오래 생존한 플레이어들을 확인할 수 있습니다."
              imageUrl="/img/8.png"
            />

            <SmallInfo
              title="데미지 리더보드"
              description="가장 많은 데미지를 입힌 플레이어들을 확인할 수 있습니다."
              imageUrl="/img/9.png"
            />

            <SmallInfo
              title="팀 순위"
              description="매치에서 각 팀의 최종 순위를 확인할 수 있습니다."
              imageUrl="/img/10.png"
            />

            <SmallInfo
              title="플레이어 성과"
              description="개별 플레이어의 상세한 성과 정보를 확인할 수 있습니다."
              imageUrl="/img/12.png"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="text-center py-8">
          <p className="text-gray-600 dark:text-gray-400">
            PUBG 전적 분석 대시보드 - 더 나은 게임 경험을 위한 통계 분석
          </p>
        </div>
      </div>
    </div>
  );
}
