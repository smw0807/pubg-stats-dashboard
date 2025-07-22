'use client';

import { useParams } from 'next/navigation';
import { usePlayerRankStats } from '~/components/stats/hooks/usePlayerStats';
import PlayerStats from '~/components/stats/PlayerStats';
import RecentMatchStats from '~/components/stats/RecentMatchStats';

function RankStatsLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400 mx-auto mb-4"></div>
        <p className="text-gray-600 dark:text-gray-300">
          플레이어 정보를 불러오는 중...
        </p>
      </div>
    </div>
  );
}

function RankStatsError({ message }: { message: string }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">
          오류 발생
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{message}</p>
        <button
          onClick={() => window.history.back()}
          className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
        >
          뒤로 가기
        </button>
      </div>
    </div>
  );
}

function NotFoundPlayer() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
          플레이어 정보 없음
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          해당 플레이어의 정보를 찾을 수 없습니다.
        </p>
        <button
          onClick={() => window.history.back()}
          className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
        >
          뒤로 가기
        </button>
      </div>
    </div>
  );
}

export default function PlayerPage() {
  const params = useParams();
  const platform = params.platform as string;
  const playerName = params.playerName as string;

  const {
    data: rankStats,
    isLoading: rankStatsLoading,
    error: rankStatsError,
  } = usePlayerRankStats(platform, playerName);

  if (rankStatsLoading) {
    return <RankStatsLoading />;
  }

  if (rankStatsError) {
    return <RankStatsError message={rankStatsError?.message} />;
  }

  if (!rankStats) {
    return <NotFoundPlayer />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div>
        {rankStats && (
          <PlayerStats
            playerName={playerName}
            platform={platform}
            stats={rankStats}
          />
        )}
      </div>

      {/* <div>
        {normalStats && (
          <PlayerStats
            playerName={playerName}
            platform={platform}
            stats={normalStats}
            onNewSearch={handleNewSearch}
          />
        )}
      </div> */}
      {/* 최근 매치 통계 */}
      <div className="mx-auto px-4 pb-8">
        <RecentMatchStats platform={platform} playerName={playerName} />
      </div>
    </div>
  );
}
