'use client';

import { useRouter } from 'next/navigation';
import AnalysisCard from '~/components/match-analysis/AnalysisCard';

export default function MatchAnalysisPage() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* 헤더 */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={handleBack}
              className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
            >
              ← 뒤로 가기
            </button>
            <h1 className="text-3xl font-bold text-gray-900">매치 분석</h1>
          </div>
        </div>

        {/* 분석 카드들 (데이터 연동 없이 제목/아이콘/설명만) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnalysisCard
            title="매치 요약 정보"
            icon="📊"
            description="매치의 전체 요약"
            onClick={() => {}}
          />
          <AnalysisCard
            title="팀 순위"
            icon="🏆"
            description="팀별 순위와 기본 통계"
            onClick={() => {}}
          />
          <AnalysisCard
            title="플레이어 통계"
            icon="👥"
            description="모든 플레이어의 상세 통계"
            onClick={() => {}}
          />
          <AnalysisCard
            title="킬 리더보드"
            icon="🔫"
            description="킬 상위 플레이어"
            onClick={() => {}}
          />
          <AnalysisCard
            title="데미지 리더보드"
            icon="💥"
            description="데미지 상위 플레이어"
            onClick={() => {}}
          />
          <AnalysisCard
            title="생존 시간 리더보드"
            icon="⏱️"
            description="생존 시간 상위 플레이어"
            onClick={() => {}}
          />
          <AnalysisCard
            title="팀 분석"
            icon="🔍"
            description="팀별 상세 분석"
            onClick={() => {}}
          />
          <AnalysisCard
            title="플레이어 성과 분석"
            icon="⚡"
            description="플레이어별 성과 분석"
            onClick={() => {}}
          />
          <AnalysisCard
            title="매치 통계"
            icon="📈"
            description="매치 전체 통계 요약"
            onClick={() => {}}
          />
        </div>
      </div>
    </div>
  );
}
