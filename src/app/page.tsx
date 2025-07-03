import { Metadata } from 'next';
import PlayerSearch from '../components/PlayerSearch';
import Image from 'next/image';

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        {/* Search Section */}
        <div className="max-w-2xl mx-auto mb-16 flex items-center justify-center min-h-[60vh]">
          <PlayerSearch />
        </div>

        {/* Features Showcase */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            주요 기능 소개
          </h2>

          {/* Recent Matches Feature */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1 relative">
                <Image
                  src="/img/3.png"
                  alt="최근 매치 화면"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-md"
                />
              </div>
              <div className="order-1 md:order-2">
                <h3 className="text-2xl font-bold mb-4 text-blue-600">
                  최근 매치 히스토리
                </h3>
                <p className="text-gray-700 mb-6">
                  최근 플레이한 매치들의 기본 정보를 확인할 수 있습니다. 매치
                  결과, 킬 수, 순위 등 핵심 정보를 한눈에 파악하세요.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• 최근 매치 목록</li>
                  <li>• 매치 결과 요약</li>
                  <li>• 기본 성과 지표</li>
                  <li>• 매치 상세 분석 링크</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Match Analysis Feature */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4 text-blue-600">
                  매치 상세 분석
                </h3>
                <p className="text-gray-700 mb-6">
                  선택한 매치의 상세한 분석 정보를 제공합니다. 팀 성과, 데미지,
                  킬 등 매치의 모든 측면을 분석해보세요.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• 매치별 상세 통계</li>
                  <li>• 팀 기여도 분석</li>
                  <li>• 데미지 및 킬 리더보드</li>
                  <li>• 매치 통계</li>
                </ul>
              </div>
              <div className="relative">
                <Image
                  src="/img/4.png"
                  alt="매치 분석 화면"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-md"
                />
              </div>
            </div>
          </div>

          {/* Player Stats Feature */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="order-1 md:order-2">
                <h3 className="text-2xl font-bold mb-4 text-blue-600">
                  플레이어 통계 분석
                </h3>
                <p className="text-gray-700 mb-6">
                  플레이어의 기본 게임 통계를 확인할 수 있습니다. 매치에서
                  달성한 데미지, 생존 시간, 킬 어시스트 등 다양한 지표를
                  제공합니다.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• 성과</li>
                  <li>• 생존 시간</li>
                  <li>• 아이템 사용</li>
                  <li>• 이동거리</li>
                </ul>
              </div>
              <div className="relative">
                <Image
                  src="/img/7.png"
                  alt="플레이어 통계 화면"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-md"
                />
              </div>
            </div>
          </div>

          {/* Team Analysis Feature */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4 text-blue-600">
                  팀 분석
                </h3>
                <p className="text-gray-700 mb-6">
                  매치 내 각 팀별로 성과를 분석할 수 있습니다. 팀 내 순위 비교,
                  팀내 최고 성과자 비교 등 팀 성과를 확인할 수 있습니다.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• 팀 달성 킬, 데미지</li>
                  <li>• 팀 효율성 지표</li>
                  <li>• 팀 내 최고 성과자 비교</li>
                  <li>• 팀 내 순위 비교</li>
                </ul>
              </div>
              <div className="relative">
                <Image
                  src="/img/11.png"
                  alt="팀 분석 화면"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-md"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Additional Features Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">분석 기능들</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="relative mb-4">
                <Image
                  src="/img/5.png"
                  alt="데미지 분석"
                  width={400}
                  height={250}
                  className="rounded-lg"
                />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-700">
                매치 요약
              </h3>
              <p className="text-gray-600 text-sm">
                해당 매치에 대한 요약 정보를 확인할 수 있습니다.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="relative mb-4">
                <Image
                  src="/img/6.png"
                  alt="킬 분석"
                  width={400}
                  height={250}
                  className="rounded-lg"
                />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-700">
                팀순위
              </h3>
              <p className="text-gray-600 text-sm">
                팀 순위와 팀원별 킬, 데미지를 확인할 수 있습니다.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="relative mb-4">
                <Image
                  src="/img/10.png"
                  alt="생존 분석"
                  width={400}
                  height={250}
                  className="rounded-lg"
                />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-700">
                생존 분석
              </h3>
              <p className="text-gray-600 text-sm">
                생존 시간과 생존 순위를 확인할 수 있습니다.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="relative mb-4">
                <Image
                  src="/img/8.png"
                  alt="킬 리더보드"
                  width={400}
                  height={250}
                  className="rounded-lg"
                />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-700">
                킬 리더보드
              </h3>
              <p className="text-gray-600 text-sm">
                매치 내에서의 킬 리더보드를 확인할 수 있습니다.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="relative mb-4">
                <Image
                  src="/img/9.png"
                  alt="데미지 리더보드    "
                  width={400}
                  height={250}
                  className="rounded-lg"
                />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-700">
                데미지 리더보드
              </h3>
              <p className="text-gray-600 text-sm">
                매치 내에서의 데미지 리더보드를 확인할 수 있습니다.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="relative mb-4">
                <Image
                  src="/img/12.png"
                  alt="생존 리더보드"
                  width={400}
                  height={250}
                  className="rounded-lg"
                />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-700">
                생존 리더보드
              </h3>
              <p className="text-gray-600 text-sm">
                매치 내에서의 생존 리더보드를 확인할 수 있습니다.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-gray-600">
          <p className="mb-4">
            이 사이트는 PUBG 공식 API를 사용하여 실시간 데이터를 제공합니다.
          </p>
          <p className="text-sm">
            © 2025 PUBG Stats Dashboard. 모든 게임 데이터는 PUBG Corporation의
            소유입니다.
          </p>
        </div>
      </div>
    </div>
  );
}
