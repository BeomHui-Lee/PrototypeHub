import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  BookOpen,
  Briefcase,
  Code2,
  FlaskConical,
  Github,
  Home,
  User,
} from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', icon: <Home size={20} />, text: '홈' },
    { path: '/projects', icon: <Code2 size={20} />, text: '프로젝트' },
    { path: '/lab', icon: <FlaskConical size={20} />, text: '실험실' },
    { path: '/experience', icon: <Briefcase size={20} />, text: '경력' },
    { path: '/about', icon: <User size={20} />, text: '소개' },
  ];

  return (
    <header
      className={`fixed w-full bg-white/80 backdrop-blur-md z-50 transition-all duration-300 
      ${isScrolled ? 'py-2 shadow-md' : 'py-4'}`}
    >
      <nav className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* 로고 */}
          <Link
            to="/"
            className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors"
          >
            프로토타입 허브
          </Link>

          {/* 메인 네비게이션 */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map(({ path, icon, text }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors
                ${
                  location.pathname === path
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                {icon}
                <span>{text}</span>
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
