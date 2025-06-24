'use client';

import { useParams, useRouter } from 'next/navigation';
import { usePlayerStats } from '~/hooks/usePlayerStats';
import PlayerStats from '~/components/PlayerStats';

export default function PlayerPage() {
  const params = useParams();
  const router = useRouter();
  const platform = params.platform as string;
  const playerName = params.playerName as string;

  const {
    data: stats,
    isLoading,
    error,
  } = usePlayerStats(platform, playerName);

  const handleNewSearch = () => {
    router.push('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">플레이어 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">오류 발생</h1>
          <p className="text-gray-600 mb-4">{error.message}</p>
          <button
            onClick={() => window.history.back()}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md"
          >
            뒤로 가기
          </button>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            플레이어 정보 없음
          </h1>
          <p className="text-gray-600 mb-4">
            해당 플레이어의 정보를 찾을 수 없습니다.
          </p>
          <button
            onClick={() => window.history.back()}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md"
          >
            뒤로 가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <PlayerStats
      playerName={playerName}
      platform={platform}
      stats={stats}
      onNewSearch={handleNewSearch}
    />
  );
}
