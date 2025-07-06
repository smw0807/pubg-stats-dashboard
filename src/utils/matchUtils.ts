export const formatNumber = (num: number) => {
  if (num === 0) return '0';
  return num.toLocaleString();
};

export const formatTime = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  if (hours === 0) {
    return `${minutes}분 ${remainingSeconds.toFixed(0)}초`;
  }
  return `${hours}시간 ${minutes}분 ${remainingSeconds.toFixed(0)}초`;
};

export const formatDistance = (meters: number) => {
  if (meters < 1000) {
    return `${Math.round(meters)}m`;
  }
  return `${(meters / 1000).toFixed(1)}km`;
};

export const formatPercentage = (num: number) => {
  return (num * 100).toFixed(1) + '%';
};

export const getGameModeDisplayName = (gameMode: string) => {
  switch (gameMode) {
    case 'solo':
      return '솔로';
    case 'duo':
      return '듀오';
    case 'squad':
      return '스쿼드';
    case 'solo-fpp':
      return '솔로 FPP';
    case 'squad-fpp':
      return '스쿼드 FPP';
    case 'normal-solo':
      return '솔로 (일반)';
    case 'normal-duo':
      return '듀오 (일반)';
    case 'normal-squad':
      return '스쿼드 (일반)';
    case 'normal-solo-fpp':
      return '솔로 FPP (일반)';
    case 'normal-duo-fpp':
      return '듀오 FPP (일반)';
    case 'normal-squad-fpp':
      return '스쿼드 FPP (일반)';
    default:
      return gameMode;
  }
};

export const getMapDisplayName = (mapName: string) => {
  switch (mapName) {
    case 'DihorOtok_Main':
      return '비켄디';
    case 'Baltic_Main':
      return '에란겔';
    case 'Desert_Main':
      return '미라마';
    case 'Savage_Main':
      return '사녹';
    case 'Tiger_Main':
      return '태이고';
    case 'Neon_Main':
      return '론도';
    case 'Heaven_Main':
      return '헤이븐';
    case 'Summerland_Main':
      return '카라킨';
    case 'Chimera_Main':
      return '파라모';
    default:
      return mapName;
  }
};

export const getPlaceColor = (place: number) => {
  if (place === 1) return 'text-yellow-600 dark:text-yellow-400 font-bold';
  if (place <= 3) return 'text-orange-600 dark:text-orange-400 font-semibold';
  if (place <= 10) return 'text-blue-600 dark:text-blue-400 font-medium';
  return 'text-gray-600 dark:text-gray-400';
};

export const getTierColor = (tier: string) => {
  switch (tier.toLowerCase()) {
    case 'bronze':
      return 'text-amber-700';
    case 'silver':
      return 'text-gray-600';
    case 'gold':
      return 'text-yellow-600';
    case 'platinum':
      return 'text-cyan-600';
    case 'diamond':
      return 'text-purple-600';
    case 'master':
      return 'text-pink-600';
    default:
      return 'text-red-600';
  }
};

export const getRankColor = (rank: number) => {
  if (rank === 1) return 'text-white bg-yellow-500 dark:bg-yellow-400';
  if (rank === 2) return 'text-white bg-gray-500 dark:bg-gray-500';
  if (rank === 3) return 'text-white bg-orange-500 dark:bg-orange-400';
  return 'text-white bg-gray-400 dark:bg-gray-500';
};

export const getRankIcon = (rank: number) => {
  if (rank === 1) return '🥇';
  if (rank === 2) return '🥈';
  if (rank === 3) return '🥉';
  return `${rank}`;
};
