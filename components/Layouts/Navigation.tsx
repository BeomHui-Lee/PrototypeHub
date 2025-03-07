'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  Briefcase,
  Code2,
  FlaskConical,
  Github,
  Home as HomeIcon,
  Moon,
  Sun,
  User,
  Menu,
  X,
} from 'lucide-react';
import { useTheme } from './ThemeProvider';

const navItems = [
  { path: '/', icon: <HomeIcon size={20} />, text: '홈', engText: 'Home' },
  {
    path: '/playground',
    icon: <Code2 size={20} />,
    text: '플레이그라운드',
    engText: 'Playground',
  },
  // {
  //   path: '/lab',
  //   icon: <FlaskConical size={20} />,
  //   text: '실험실',
  //   engText: 'Lab',
  // },
  {
    path: '/career',
    icon: <Briefcase size={20} />,
    text: '경력',
    engText: 'Career',
  },
  {
    path: '/about',
    icon: <User size={20} />,
    text: '소개',
    engText: 'About',
  },
];

const getPageTitle = (path: string) => {
  switch (path) {
    case '/lottery':
      return '추첨 시뮬레이터';
    case '/playground':
      return '플레이그라운드';
    case '/lab':
      return '실험실';
    case '/career':
      return '경력';
    case '/about':
      return '소개';
    default:
      return '';
  }
};

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 페이지 변경 시 모바일 메뉴 닫기
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 
      ${
        isScrolled
          ? 'py-2 backdrop-blur-md bg-background/80 dark:bg-background/80 shadow-sm'
          : 'py-4 bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* 페이지 타이틀 */}
          {pathname !== '/' ? (
            <h1 className="text-2xl lg:min-w-[290px] font-bold text-foreground">
              {getPageTitle(pathname)}
            </h1>
          ) : (
            <Link
              href="/public"
              className="text-xl lg:text-2xl lg:min-w-[290px] font-bold text-foreground hover:text-primary transition-colors whitespace-nowrap"
            >
              BeomHui&apos;s PrototypeHub
            </Link>
          )}

          {/* 데스크탑 메뉴 */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map(({ path, icon, text, engText }) => (
              <Link
                key={path}
                href={path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300
                  ${
                    pathname === path
                      ? 'text-primary bg-primary/5 dark:bg-primary/10'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  }
                  lg:min-w-[120px]`}
              >
                <span className="md:hidden lg:inline">{icon}</span>
                <span
                  className="relative overflow-hidden group"
                  onMouseEnter={() => setHoveredItem(path)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <span className="inline-flex min-w-[4.5rem] justify-center">
                    <span
                      className="transition-transform duration-300 text-sm lg:text-base block text-center"
                      style={{
                        transform:
                          hoveredItem === path
                            ? 'translateY(-100%)'
                            : 'translateY(0)',
                      }}
                    >
                      {text}
                    </span>
                  </span>
                  <span
                    className="absolute top-0 left-0 transition-transform duration-300 text-xs lg:text-sm whitespace-nowrap w-full text-center"
                    style={{
                      transform:
                        hoveredItem === path
                          ? 'translateY(0)'
                          : 'translateY(100%)',
                    }}
                  >
                    {engText}
                  </span>
                </span>
              </Link>
            ))}
          </div>

          {/* 우측 아이콘들 */}
          <div className="flex items-center space-x-4">
            {/* 테마 토글 버튼 */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-accent transition-colors text-muted-foreground hover:text-foreground"
              aria-label={
                theme === 'dark' ? '라이트 모드로 전환' : '다크 모드로 전환'
              }
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={theme}
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.3 }}
                >
                  {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                </motion.div>
              </AnimatePresence>
            </button>

            {/* 소셜 링크 */}
            <a
              href="https://github.com/BeomHui-Lee"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              title="GitHub"
            >
              <Github size={20} />
            </a>
            <a
              href="https://merciful-mongoose-a9b.notion.site/15be6dbc7dd9802aa71cfeea35ea90bf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              title="Blog"
            >
              <BookOpen size={20} />
            </a>

            {/* 모바일 메뉴 토글 버튼 */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-full hover:bg-accent transition-colors text-muted-foreground hover:text-foreground"
              aria-label={isMobileMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* 모바일 메뉴 */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-background/95 dark:bg-background/95 backdrop-blur-md border-t border-border"
          >
            <div className="max-w-6xl mx-auto px-4 py-4 space-y-2">
              {navItems.map(({ path, icon, text }) => (
                <Link
                  key={path}
                  href={path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200
                    ${
                      pathname === path
                        ? 'text-primary bg-primary/5 dark:bg-primary/10'
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                    }`}
                >
                  <span>{icon}</span>
                  <span>{text}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navigation;
