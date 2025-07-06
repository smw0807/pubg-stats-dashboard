import { create } from 'zustand';

type Theme = 'light' | 'dark';

interface ThemeStore {
  theme: Theme;
  mounted: boolean;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  setMounted: (mounted: boolean) => void;
}

// 초기화 함수 - 앱 시작 시 호출
const getInitialTheme = (): Theme => {
  // 서버 사이드에서는 기본값 반환
  if (typeof window === 'undefined') {
    return 'light';
  }

  const savedTheme = localStorage.getItem(
    'pubg-stats-dashboard.theme'
  ) as Theme;

  if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
    return savedTheme;
  } else {
    // 시스템 테마 감지
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    return prefersDark ? 'dark' : 'light';
  }
};

export const useThemeStore = create<ThemeStore>((set, get) => ({
  theme: 'light', // 서버와 클라이언트 간 일관성을 위해 기본값 사용
  mounted: false,
  toggleTheme: () => {
    const { theme } = get();
    const newTheme = theme === 'light' ? 'dark' : 'light';

    set({ theme: newTheme });

    // localStorage에 저장
    if (typeof window !== 'undefined') {
      localStorage.setItem('pubg-stats-dashboard.theme', newTheme);
    }

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
    if (typeof window !== 'undefined') {
      localStorage.setItem('pubg-stats-dashboard.theme', theme);
    }

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

  // 이미 초기화된 경우 스킵
  if (store.mounted) {
    return;
  }

  const theme = getInitialTheme();
  store.setTheme(theme);
  store.setMounted(true);
};
