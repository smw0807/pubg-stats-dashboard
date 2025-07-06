import { create } from 'zustand';

type Theme = 'light' | 'dark';

interface ThemeStore {
  theme: Theme;
  mounted: boolean;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  setMounted: (mounted: boolean) => void;
}

export const useThemeStore = create<ThemeStore>((set, get) => ({
  theme: 'light',
  mounted: false,
  toggleTheme: () => {
    const { theme } = get();
    const newTheme = theme === 'light' ? 'dark' : 'light';

    set({ theme: newTheme });

    // localStorage에 저장
    localStorage.setItem('pubg-stats-dashboard.theme', newTheme);

    // DOM에 클래스 적용
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  },
  setTheme: (theme) => {
    set({ theme });

    // localStorage에 저장
    localStorage.setItem('pubg-stats-dashboard.theme', theme);

    // DOM에 클래스 적용
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  },
  setMounted: (mounted) => {
    set({ mounted });
  },
}));

// 초기화 함수 - 앱 시작 시 호출
export const initializeTheme = () => {
  const store = useThemeStore.getState();
  const savedTheme = localStorage.getItem(
    'pubg-stats-dashboard.theme'
  ) as Theme;

  if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
    store.setTheme(savedTheme);
  } else {
    // 시스템 테마 감지
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    const systemTheme = prefersDark ? 'dark' : 'light';
    store.setTheme(systemTheme);
  }

  store.setMounted(true);
};
