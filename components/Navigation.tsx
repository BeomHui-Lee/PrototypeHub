'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BookOpen,
  Briefcase,
  Code2,
  FlaskConical,
  Github,
  Home as HomeIcon,
  User,
} from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const pathname = usePathname();

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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', icon: <HomeIcon size={20} />, text: '홈', engText: 'Home' },
    {
      path: '/playground',
      icon: <Code2 size={20} />,
      text: '플레이그라운드',
      engText: 'Playground',
    },
    {
      path: '/lab',
      icon: <FlaskConical size={20} />,
      text: '실험실',
      engText: 'Lab',
    },
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

  return (
    <header
      className={`fixed w-full bg-white/80 backdrop-blur-md z-50 transition-all duration-300 
      ${isScrolled ? 'py-2 shadow-md' : 'py-4'}`}
    >
      <nav className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* 페이지 타이틀 */}
          {pathname !== '/' ? (
            <h1 className="text-2xl lg:min-w-[290px] font-bold text-gray-800">
              {getPageTitle(pathname)}
            </h1>
          ) : (
            <Link
              href="/"
              className="text-xl lg:text-2xl lg:min-w-[290px] font-bold text-gray-800 hover:text-blue-600 transition-colors whitespace-nowrap"
            >
              BeomHui's Prototype Hub
            </Link>
          )}

          {/* 메인 네비게이션 */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map(({ path, icon, text, engText }) => (
              <Link
                key={path}
                href={path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300
                  ${
                    pathname === path
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
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

          {/* 소셜 링크 */}
          <div className="flex items-center space-x-4">
            <a
              href="https://github.com/BeomHui-Lee"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-600 transition-colors"
              title="GitHub"
            >
              <Github size={24} />
            </a>
            <a
              href="https://merciful-mongoose-a9b.notion.site/15be6dbc7dd9802aa71cfeea35ea90bf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-600 transition-colors"
              title="Blog"
            >
              <BookOpen size={24} />
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navigation;
