'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light' | 'system';

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  enableSystem?: boolean;
  storageKey?: string;
  attribute?: string;
  disableTransitionOnChange?: boolean;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeProviderContext = createContext<ThemeProviderState | undefined>(
  undefined,
);

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  enableSystem = true,
  storageKey = 'theme',
  attribute = 'data-theme',
  disableTransitionOnChange = false,
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const [mounted, setMounted] = useState(false);

  // 컴포넌트가 마운트될 때 초기 테마 설정
  useEffect(() => {
    setMounted(true);
    const root = window.document.documentElement;

    // 저장된 테마 확인
    const storedTheme = localStorage.getItem(storageKey);

    if (storedTheme) {
      setTheme(storedTheme as Theme);
    } else if (enableSystem) {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : 'light';
      setTheme(systemTheme);
    }
  }, []); // 의존성 배열을 비워 최초 한 번만 실행되도록 수정

  // 시스템 테마 변경 감지
  useEffect(() => {
    if (!mounted) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = () => {
      if (theme === 'system') {
        const newTheme = mediaQuery.matches ? 'dark' : 'light';
        document.documentElement.setAttribute(attribute, newTheme);

        if (newTheme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme, attribute, mounted]);

  // 테마 변경 시 실제 적용
  useEffect(() => {
    if (!mounted) return;

    const root = window.document.documentElement;

    // 테마 변경 시 트랜지션 효과 관리
    const previousTransition = root.style.transition;
    if (disableTransitionOnChange) {
      root.style.transition = 'none';
    }

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : 'light';

      document.documentElement.setAttribute(attribute, systemTheme);

      if (systemTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } else {
      document.documentElement.setAttribute(attribute, theme);

      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }

    localStorage.setItem(storageKey, theme);

    // 트랜지션 스타일 복구
    if (disableTransitionOnChange) {
      const timeoutId = setTimeout(() => {
        root.style.transition = previousTransition;
      }, 0);
      return () => clearTimeout(timeoutId);
    }
  }, [theme, attribute, storageKey, disableTransitionOnChange, mounted]);

  const value = {
    theme,
    setTheme: (newTheme: Theme) => {
      setTheme(newTheme);
    },
  };

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
