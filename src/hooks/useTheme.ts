'use client';

import { useEffect } from 'react';
import { useThemeStore, initializeTheme } from '~/store/theme';

export function useTheme() {
  const { theme, mounted, toggleTheme } = useThemeStore();

  useEffect(() => {
    console.log('useTheme useEffect - initializing theme');
    // 테마 초기화
    initializeTheme();
  }, []);

  console.log('useTheme hook - theme:', theme, 'mounted:', mounted);

  return { theme, toggleTheme, mounted };
}
