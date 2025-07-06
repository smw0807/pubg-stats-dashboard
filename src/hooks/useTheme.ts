'use client';

import { useEffect } from 'react';
import { useThemeStore, initializeTheme } from '~/store/theme';

export function useTheme() {
  const { theme, mounted, toggleTheme } = useThemeStore();

  useEffect(() => {
    // 테마 초기화 (이미 초기화된 경우 스킵됨)
    initializeTheme();
  }, []);

  return { theme, toggleTheme, mounted };
}
