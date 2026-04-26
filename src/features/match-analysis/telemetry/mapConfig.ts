export const TELEMETRY_CANVAS_SIZE = 700;
export const TELEMETRY_MIN_ZOOM = 1;
export const TELEMETRY_MAX_ZOOM = 12;
export const TELEMETRY_ZOOM_STEP = 1.3;

export const TELEMETRY_MAP_SIZES: Record<string, number> = {
  Baltic_Main: 816000,
  Desert_Main: 816000,
  Tiger_Main: 816000,
  Neon_Main: 612000,
  Savage_Main: 408000,
  DihorOtok_Main: 612000,
  Heaven_Main: 204000,
  Summerland_Main: 204000,
  Chimera_Main: 408000,
};

export const TELEMETRY_MAP_IMAGES: Record<string, string> = {
  Baltic_Main: '/maps/erangel.png',
  Desert_Main: '/maps/miramar.png',
  Tiger_Main: '/maps/taego.png',
  Neon_Main: '/maps/Rondo.png',
};

export const getTelemetryMapSize = (mapName: string) =>
  TELEMETRY_MAP_SIZES[mapName] ?? TELEMETRY_MAP_SIZES.Baltic_Main;

export const getTelemetryMapImageSrc = (mapName: string) =>
  TELEMETRY_MAP_IMAGES[mapName];
