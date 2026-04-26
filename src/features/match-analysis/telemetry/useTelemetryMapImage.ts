'use client';

import { useEffect, useRef, useState } from 'react';

export const useTelemetryMapImage = (mapImageSrc?: string) => {
  const mapImgRef = useRef<HTMLImageElement | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (!mapImageSrc) {
      mapImgRef.current = null;
      setMapLoaded(false);
      return;
    }

    let cancelled = false;
    setMapLoaded(false);

    const img = new Image();
    img.src = mapImageSrc;
    img.onload = () => {
      if (cancelled) return;
      mapImgRef.current = img;
      setMapLoaded(true);
    };

    return () => {
      cancelled = true;
    };
  }, [mapImageSrc]);

  return {
    mapImage: mapImgRef.current,
    mapLoaded,
  };
};
