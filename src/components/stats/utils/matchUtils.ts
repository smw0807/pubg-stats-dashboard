export const formatNumber = (num: number) => {
  if (num === 0) return '0';
  return num.toLocaleString();
};

export const formatTime = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${hours}h ${minutes}m`;
};

export const formatDistance = (meters: number) => {
  if (meters < 1000) {
    return `${Math.round(meters)}m`;
  }
  return `${(meters / 1000).toFixed(1)}km`;
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
    default:
      return mapName;
  }
};

export const getPlaceColor = (place: number) => {
  if (place === 1) return 'text-yellow-600 font-bold';
  if (place <= 3) return 'text-orange-600 font-semibold';
  if (place <= 10) return 'text-blue-600 font-medium';
  return 'text-gray-600';
};
