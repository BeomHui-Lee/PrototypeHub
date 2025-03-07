'use client';

import { useState, useEffect, useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from 'framer-motion';
import {
  ArrowRight,
  Briefcase,
  Code2,
  FlaskConical,
  ChevronDown,
  ChevronUp,
  Bot,
  Cpu,
  RocketIcon,
} from 'lucide-react';
import { AIIcon, aiTools } from '@/components/AIIcons';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Footer from '@/components/Layouts/Footer';
import { useTheme } from '@/components/Layouts/ThemeProvider';

// 3D 배경 컴포넌트는 클라이언트 사이드에서만 렌더링
const BackgroundScene = dynamic(
  () => import('@/components/MainPage/BackgroundScene'),
  {
    ssr: false,
    loading: () => <div className="h-[550px]" />,
  },
);

// ExpertiseSection 컴포넌트 동적 임포트
const ExpertiseSection = dynamic(
  () => import('@/components/MainPage/ExpertiseSection'),
  {
    ssr: false,
  },
);

interface SectionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
  badges?: string[];
}

const SectionCard: React.FC<SectionCardProps> = ({
  title,
  description,
  icon,
  path,
  badges = [],
}) => {
  return (
    <Link href={path}>
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="group min-h-[145px] relative glass-card rounded-xl shadow-sm p-6 cursor-pointer
        transform transition-all duration-300 border border-border/50 hover:shadow-md
        hover:border-primary/20 overflow-hidden"
      >
        {/* 배경 효과 */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
          <div className="absolute -left-10 -top-10 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl" />
        </div>

        <div className="relative flex items-center gap-4">
          <div className="flex-shrink-0">
            <div
              className="p-3 bg-primary/5 rounded-lg text-primary
              group-hover:bg-primary/10 transition-colors"
            >
              {icon}
            </div>
          </div>
          <div className="flex-grow">
            <div className="flex items-center gap-2 mb-1">
              <h3
                className="text-xl font-bold text-foreground group-hover:text-primary
                transition-colors flex items-center gap-2"
              >
                {title}
                <ArrowRight
                  size={18}
                  className="opacity-0 -translate-x-2 group-hover:opacity-100
                  group-hover:translate-x-0 transition-all"
                />
              </h3>

              {badges.length > 0 && (
                <div className="flex gap-1">
                  {badges.map((badge) => (
                    <span
                      key={badge}
                      className="px-2 py-0.5 text-xs rounded-full bg-primary/10 text-primary"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <p className="text-muted-foreground text-sm">{description}</p>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

// 패럴랙스 텍스트 효과 컴포넌트
const ParallaxText = ({ children }: { children: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity }}
      className="gradient-text font-bold text-3xl md:text-4xl mb-8"
    >
      {children}
    </motion.div>
  );
};

// AI 기술 스택 리스트 컴포넌트
const AITechStack = () => {
  const [expanded, setExpanded] = useState(false);

  const initialItems = aiTools.slice(0, 6);
  const expandedItems = aiTools;

  return (
    <div className="w-full max-w-3xl mx-auto mt-8 relative z-10">
      <div className="glass-card rounded-xl p-6 border border-border/50">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Bot size={20} className="text-primary" />
            AI 기술 스택
          </h3>
          <button
            onClick={() => setExpanded(!expanded)}
            className="p-2 rounded-full hover:bg-accent transition-colors"
            aria-label={expanded ? '접기' : '더 보기'}
          >
            {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {(expanded ? expandedItems : initialItems).map((tool) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors"
            >
              <AIIcon tool={tool} size={32} className="p-1" />
              <div>
                <h4 className="font-medium text-sm">{tool.name}</h4>
                <p className="text-xs text-muted-foreground">
                  {tool.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

// 타이핑 애니메이션 텍스트
const TypingText = ({ texts }: { texts: string[] }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);
  const { theme } = useTheme();

  useEffect(() => {
    const text = texts[currentTextIndex];

    if (isDeleting) {
      if (displayText === '') {
        setIsDeleting(false);
        setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
        setTypingSpeed(100);
      } else {
        const timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 50);
        return () => clearTimeout(timeout);
      }
    } else {
      if (displayText === text) {
        // 완성된 텍스트 유지 시간
        const timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 2000);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setDisplayText(text.slice(0, displayText.length + 1));
        }, typingSpeed);
        return () => clearTimeout(timeout);
      }
    }
  }, [displayText, currentTextIndex, isDeleting, texts, typingSpeed]);

  return (
    <span className="inline-block min-h-[1.5em] font-mono">
      {displayText}
      <span
        className={`inline-block w-2 h-5 ml-1 -mb-0.5 animate-pulse ${theme === 'dark' ? 'bg-blue-400' : 'bg-blue-600'}`}
      ></span>
    </span>
  );
};

export default function Home() {
  const sections: SectionCardProps[] = [
    {
      title: '플레이그라운드',
      description:
        '추첨 시뮬레이터, 룰렛 등 다양한 인터랙티브 컴포넌트들을 체험해보세요.',
      icon: <Code2 size={24} />,
      path: '/playground',
      badges: ['Interactive'],
    },
    {
      title: '실험실',
      description:
        '실험적인 프로토타입과 컴포넌트들을 살펴보세요. 새로운 기술과 아이디어를 테스트합니다.',
      icon: <FlaskConical size={24} />,
      path: '/lab',
      badges: ['AI', 'Experimental'],
    },
    {
      title: '경력',
      description:
        '지금까지의 개발 여정과 경험을 공유합니다. 프로젝트 이력과 기술 스택을 확인하세요.',
      icon: <Briefcase size={24} />,
      path: '/career',
    },
  ];

  const typingTexts = [
    'React와 TypeScript 기반 개발',
    'AI 기술 활용 개발 경험',
    '3D 웹 인터랙션 구현',
    '최적화된 사용자 경험 제공',
  ];

  const { theme } = useTheme();
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* 배경 패턴 */}
      <div className="absolute inset-0 grid-pattern opacity-10" />

      {/* 히어로 섹션 */}
      <section className="relative min-h-[85vh]">
        <BackgroundScene />

        {/* 배경 효과를 위한 전체 너비 컨테이너 */}
        <div className="relative w-full">
          {/* 배경 그라데이션이 전체 너비를 차지하도록 설정 */}
          <div className="absolute inset-0 hero-gradient opacity-80" />

          <motion.div
            style={{ opacity: heroOpacity, scale: heroScale }}
            className="relative max-w-6xl mx-auto px-4 pb-24 z-10"
          >
            <div className="relative py-12 px-6 rounded-2xl overflow-hidden">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center space-y-8 relative z-10 mt-40"
              >
                <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2">
                  AI × Frontend
                </div>

                <h1 className="text-5xl md:text-6xl font-bold gradient-text pb-2 leading-tight">
                  AI Frontend Engineer
                </h1>

                <div className="flex flex-col items-center gap-4">
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                    <TypingText texts={typingTexts} />
                  </p>
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="flex justify-center gap-4 pt-4"
                >
                  <a
                    href="#projects"
                    className="px-6 py-2.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors flex items-center gap-2"
                  >
                    프로젝트 보기
                    <RocketIcon size={16} />
                  </a>
                  <Link
                    href="/about"
                    className="px-6 py-2.5 rounded-lg border border-border hover:bg-accent transition-colors"
                  >
                    자세히 알아보기
                  </Link>
                </motion.div>

                <AITechStack />
              </motion.div>
            </div>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
              <ChevronDown size={24} className="text-muted-foreground" />
            </div>
          </motion.div>
        </div>
      </section>

      <main className="relative -mt-20">
        {/* 프로젝트 섹션 */}
        <section id="projects" className="py-16 relative">
          <div className="max-w-6xl mx-auto px-4">
            <ParallaxText>프로젝트</ParallaxText>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {sections.map((section, index) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <SectionCard {...section} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* 전문 분야 섹션 */}
        <ExpertiseSection />

        {/* CTA 섹션 */}
        <section className="py-20 relative">
          <div className="absolute inset-0 hero-gradient opacity-50" />

          <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold gradient-text">
                함께 프로젝트를 진행해보세요
              </h2>
              <p className="text-muted-foreground">
                AI와 프론트엔드 개발의 결합으로 더 나은 사용자 경험을
                만들어냅니다. 혁신적인 웹 애플리케이션을 함께 만들어보세요.
              </p>
              <div className="pt-4">
                <Link
                  href="/about"
                  className="px-8 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors inline-flex items-center gap-2"
                >
                  자세히 알아보기
                  <ArrowRight size={16} />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
