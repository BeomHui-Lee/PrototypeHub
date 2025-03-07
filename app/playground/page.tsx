'use client';

import { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from 'framer-motion';
import {
  ArrowUpRight,
  Bot,
  Code2,
  FlaskConical,
  Gamepad2,
  Search,
  Sparkles,
  Tags,
  Filter,
  Calendar,
  Trophy,
  Rocket,
  Brain,
  XCircle,
  Globe,
} from 'lucide-react';
import { useTheme } from '@/components/Layouts/ThemeProvider';

// 프로젝트 타입 정의
interface Project {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  path: string;
  category: 'web' | 'app' | 'game' | 'ai' | 'experiment';
  tags: string[];
  date: string;
  status: 'available' | 'comingSoon' | 'inDevelopment';
  featured?: boolean;
  gradient?: string;
}

// 모든 프로젝트 데이터
const projects: Project[] = [
  // 기존 플레이그라운드 프로젝트
  {
    id: 'lottery',
    title: '추첨 시뮬레이터',
    description:
      '실시간 추첨 시뮬레이션 시스템입니다. 공정하고 투명한 추첨 과정을 시각화하여 제공합니다.',
    thumbnail: '/images/thumbnail/lottery_menu.webp',
    path: '/playground/lottery',
    category: 'web',
    tags: ['React', 'TypeScript', 'Tailwind CSS'],
    date: '2024.01',
    status: 'available',
    gradient: 'from-blue-400 to-cyan-500',
  },
  // {
  //   id: 'agricola',
  //   title: '아그리콜라 점수 계산기',
  //   description:
  //     '아그리콜라 게임의 점수를 계산하는 도구입니다. 게임 진행 중 점수를 실시간으로 확인할 수 있습니다.',
  //   thumbnail: '/images/thumbnail/AgricolaScoreCalculatorThumbnail.webp',
  //   path: '/playground/agricola',
  //   category: 'game',
  //   tags: ['React', 'TypeScript', 'Tailwind CSS', 'Game'],
  //   date: '2024.01',
  //   status: 'available',
  //   gradient: 'from-green-400 to-emerald-500',
  // },
  {
    id: 'btoz-2048',
    title: '2048 게임',
    description:
      '중독성 있는 2048 퍼즐 게임입니다. 타일을 합쳐 2048을 만들어보세요!',
    thumbnail: '/images/thumbnail/2048_menu.webp',
    path: '/playground/2048',
    category: 'game',
    tags: ['React', 'Game', 'Puzzle'],
    date: '2024.02',
    status: 'comingSoon',
    gradient: 'from-orange-400 to-amber-500',
  },
  {
    id: 'watermelon',
    title: '수박 게임',
    description: '수박 합치기 게임! 작은 과일을 합쳐 수박을 만들어보세요.',
    thumbnail: '/images/thumbnail/watermelon_menu.webp',
    path: '/playground/watermelon',
    category: 'game',
    tags: ['Physics', 'Game', 'Web'],
    date: '2024.03',
    status: 'inDevelopment',
    gradient: 'from-green-400 to-emerald-500',
  },

  // 실험실 프로젝트
  {
    id: 'code-review',
    title: 'GPT 자동 코드리뷰',
    description:
      'GitHub PR에 대해 GPT가 자동으로 코드리뷰를 수행합니다. 코드 품질, 보안, 성능 관점에서 분석하고 개선점을 제안합니다.',
    thumbnail: '/images/thumbnail/code_review_menu.webp',
    path: '/playground/code-review',
    category: 'ai',
    tags: ['GPT-4', 'GitHub', 'Code Analysis', 'AI'],
    date: '2024.01',
    status: 'available',
    featured: true,
    gradient: 'from-indigo-400 to-purple-500',
  },
  {
    id: 'ai-assistant',
    title: 'AI 개발 어시스턴트',
    description:
      '개발 과정에서 발생하는 다양한 질문에 대해 AI가 실시간으로 답변을 제공합니다.',
    thumbnail: '/images/thumbnail/ai_assistant_menu.webp',
    path: '/playground/ai-assistant',
    category: 'ai',
    tags: ['AI', 'Development', 'Assistant'],
    date: '2024.02',
    status: 'comingSoon',
    gradient: 'from-blue-400 to-indigo-500',
  },
  {
    id: 'ai-debate',
    title: 'AI 삼자대화',
    description:
      '서로 다른 AI 모델들과 함께하는 토론. 같은 질문에 대한 다양한 관점을 확인해보세요.',
    thumbnail: '/images/thumbnail/ai_debate_menu.webp',
    path: '/playground/ai-debate',
    category: 'ai',
    tags: ['GPT', 'Claude', 'Debate', 'AI'],
    date: '2024.03',
    status: 'inDevelopment',
    gradient: 'from-purple-400 to-pink-500',
  },
  {
    id: 'code-generator',
    title: '코드 생성기',
    description:
      '설계 문서나 요구사항을 기반으로 기본 코드 구조를 자동으로 생성합니다.',
    thumbnail: '/images/thumbnail/code_generator_menu.webp',
    path: '/playground/code-generator',
    category: 'ai',
    tags: ['Automation', 'Boilerplate', 'AI', 'Development'],
    date: '2024.03',
    status: 'inDevelopment',
    gradient: 'from-cyan-400 to-blue-500',
  },
  {
    id: 'npc-chat',
    title: 'AI NPC 월드',
    description: 'AI화된 캐릭터들이 있는 가상세계에서 대화를 나눠보세요.',
    thumbnail: '/images/thumbnail/npc_chat_menu.webp',
    path: '/playground/npc-chat',
    category: 'ai',
    tags: ['AI', 'Chat', 'Virtual World'],
    date: '2024.04',
    status: 'comingSoon',
    gradient: 'from-amber-400 to-orange-500',
  },
];

// 배경 그라데이션 컴포넌트
const BackgroundGradients = () => {
  const { theme } = useTheme();

  return (
    <>
      <div className="fixed -left-20 top-20 h-96 w-96 rounded-full bg-primary/20 dark:bg-primary/10 opacity-70 mix-blend-multiply blur-3xl filter animate-blob" />
      <div className="fixed -right-20 top-20 h-96 w-96 rounded-full bg-purple-500/20 dark:bg-purple-500/10 opacity-70 mix-blend-multiply blur-3xl filter animate-blob animation-delay-2000" />
      <div className="fixed bottom-20 left-40 h-96 w-96 rounded-full bg-blue-300/20 dark:bg-blue-500/10 opacity-70 mix-blend-multiply blur-3xl filter animate-blob animation-delay-4000" />
      <div className="fixed top-1/2 right-1/4 h-64 w-64 rounded-full bg-pink-500/10 dark:bg-pink-500/5 opacity-60 mix-blend-multiply blur-2xl filter animate-blob animation-delay-3000" />
      <div className="absolute top-0 right-0 w-full h-full bg-grid-pattern opacity-[0.015] dark:opacity-[0.03] pointer-events-none" />
    </>
  );
};

// 패럴랙스 섹션 컴포넌트
const ParallaxSection: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50], {
    clamp: false,
  });

  return (
    <motion.div
      ref={ref}
      style={{ y, willChange: 'transform' }}
      className="relative w-full"
    >
      {children}
    </motion.div>
  );
};

// 프로젝트 카드 컴포넌트
const ProjectCard: React.FC<{ project: Project; index: number }> = ({
  project,
  index,
}) => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (project.status === 'available') {
      router.push(project.path);
    }
  };

  const getStatusBadge = () => {
    switch (project.status) {
      case 'available':
        return {
          text: '사용 가능',
          className: 'bg-green-100 text-green-800 border border-green-200',
        };
      case 'comingSoon':
        return {
          text: 'Coming Soon',
          className: 'bg-gray-100 text-gray-800 border border-gray-200',
        };
      case 'inDevelopment':
        return {
          text: '개발 중',
          className: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
        };
      default:
        return null;
    }
  };

  const getCategoryBadge = () => {
    switch (project.category) {
      case 'ai':
        return (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 + 0.2 }}
            className="absolute left-4 top-4 z-20 flex items-center gap-1 rounded-full bg-purple-100 dark:bg-purple-900/70 px-3 py-1 text-sm font-medium text-purple-800 dark:text-purple-200 border border-purple-200 dark:border-purple-700 shadow-sm"
          >
            <Bot size={14} />
            <span>AI</span>
          </motion.div>
        );
      case 'game':
        return (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 + 0.2 }}
            className="absolute left-4 top-4 z-20 flex items-center gap-1 rounded-full bg-orange-100 dark:bg-orange-900/70 px-3 py-1 text-sm font-medium text-orange-800 dark:text-orange-200 border border-orange-200 dark:border-orange-700 shadow-sm"
          >
            <Gamepad2 size={14} />
            <span>Game</span>
          </motion.div>
        );
      case 'experiment':
        return (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 + 0.2 }}
            className="absolute left-4 top-4 z-20 flex items-center gap-1 rounded-full bg-blue-100 dark:bg-blue-900/70 px-3 py-1 text-sm font-medium text-blue-800 dark:text-blue-200 border border-blue-200 dark:border-blue-700 shadow-sm"
          >
            <FlaskConical size={14} />
            <span>실험</span>
          </motion.div>
        );
      case 'web':
        return (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 + 0.2 }}
            className="absolute left-4 top-4 z-20 flex items-center gap-1 rounded-full bg-cyan-100 dark:bg-cyan-900/70 px-3 py-1 text-sm font-medium text-cyan-800 dark:text-cyan-200 border border-cyan-200 dark:border-cyan-700 shadow-sm"
          >
            <Globe size={14} />
            <span>Web</span>
          </motion.div>
        );
      default:
        return null;
    }
  };

  const getStatusClasses = () => {
    switch (project.status) {
      case 'available':
        return 'cursor-pointer hover:shadow-xl';
      case 'comingSoon':
        return 'cursor-default opacity-80';
      case 'inDevelopment':
        return 'cursor-default opacity-90';
      default:
        return '';
    }
  };

  const badge = getStatusBadge();
  const gradientClass = project.gradient || 'from-blue-500 to-violet-500';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.05,
      }}
      className={`group relative overflow-hidden rounded-xl bg-white/90 dark:bg-gray-800/90 shadow-lg backdrop-blur-sm hover:backdrop-blur-lg transition-all duration-300 ${getStatusClasses()}`}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[3/2] overflow-hidden">
        {getCategoryBadge()}

        {badge && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 + 0.1 }}
            className={`absolute right-4 top-4 z-20 rounded-full px-3 py-1 text-sm font-medium ${badge.className} shadow-sm`}
          >
            {badge.text}
          </motion.div>
        )}

        {/* 이미지 오버레이 그라데이션 */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/30 opacity-50 transition-opacity duration-300"
          animate={{ opacity: isHovered ? 0.7 : 0.5 }}
        />

        {/* 썸네일 이미지 */}
        <motion.div
          className="h-full w-full"
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </motion.div>

        {/* 강조 효과 (Featured 프로젝트인 경우) */}
        {project.featured && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="absolute -left-16 -top-16 h-32 w-32 bg-gradient-to-br from-pink-500/20 to-purple-500/20 blur-2xl"
          />
        )}
      </div>

      <div className="relative z-10 p-6 bg-gradient-to-b from-white/80 to-white/95 dark:from-gray-800/80 dark:to-gray-800/95 backdrop-blur-md">
        <div className="mb-3 flex items-start justify-between">
          <h3
            className={`bg-gradient-to-r ${gradientClass} bg-clip-text text-xl font-bold text-transparent`}
          >
            {project.title}
          </h3>

          {project.status === 'available' && (
            <motion.div
              animate={{
                x: isHovered ? 0 : -5,
                opacity: isHovered ? 1 : 0,
              }}
              transition={{ duration: 0.3 }}
            >
              <ArrowUpRight className="text-primary" />
            </motion.div>
          )}
        </div>

        <p className="min-h-[3rem] text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-2">
          {project.tags.slice(0, 3).map((tag, tagIndex) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 + tagIndex * 0.1 + 0.2 }}
              className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              {tag}
            </motion.span>
          ))}
          {project.tags.length > 3 && (
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 + 0.5 }}
              className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              +{project.tags.length - 3}
            </motion.span>
          )}
        </div>

        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
          <Calendar size={14} className="mr-1" />
          <span>{project.date}</span>
        </div>
      </div>

      {/* 배경 효과 */}
      <motion.div
        className="absolute right-0 top-1/3 h-64 w-64 rounded-full bg-gradient-to-br from-primary/5 to-violet-500/5 blur-3xl"
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1.1 : 1,
        }}
        transition={{ duration: 0.5 }}
      />
    </motion.div>
  );
};

// 필터 컴포넌트
const FilterButton: React.FC<{
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}> = ({ active, onClick, children, className = '' }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-lg transition-all duration-300 ${
      active
        ? 'bg-primary text-white shadow-md'
        : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
    } ${className}`}
  >
    {children}
  </button>
);

// 메인 페이지 컴포넌트
const PlaygroundPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { theme } = useTheme();

  // 필터 카테고리 목록
  const categories = [
    { id: 'all', name: '전체', icon: <Code2 size={16} /> },
    { id: 'ai', name: 'AI', icon: <Bot size={16} /> },
    { id: 'game', name: '게임', icon: <Gamepad2 size={16} /> },
    { id: 'web', name: '웹', icon: <Globe size={16} /> },
    { id: 'experiment', name: '실험', icon: <FlaskConical size={16} /> },
  ];

  // 상태 필터 목록
  const statusFilters = [
    { id: 'all', name: '전체' },
    { id: 'available', name: '사용 가능' },
    { id: 'comingSoon', name: 'Coming Soon' },
    { id: 'inDevelopment', name: '개발 중' },
  ];

  // 필터링된 프로젝트 목록
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase()),
      );

    const matchesCategory =
      selectedCategory === 'all' || project.category === selectedCategory;
    const matchesStatus =
      selectedStatus === 'all' || project.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  // 피처드 프로젝트가 맨 앞에 오도록 정렬
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return 0;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <BackgroundGradients />
      </div>

      <div className="relative z-10 pt-24 pb-12">
        <ParallaxSection>
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-purple-500 to-primary bg-clip-text text-transparent dark:from-primary-400 dark:via-purple-400 dark:to-primary-400">
                플레이그라운드
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                다양한 실험적 프로젝트와 게임, AI 애플리케이션을 체험해보세요.
                각 프로젝트는 개발자의 창의성과 기술을 보여줍니다.
              </p>
            </motion.div>

            {/* 검색 및 필터 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-8"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                {/* 데스크톱 필터 */}
                <div className="hidden md:flex gap-2 items-center">
                  {categories.map((category) => (
                    <FilterButton
                      key={category.id}
                      active={selectedCategory === category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className="flex items-center gap-2"
                    >
                      {category.icon}
                      <span>{category.name}</span>
                    </FilterButton>
                  ))}
                </div>

                {/* 모바일 필터 토글 */}
                <div className="flex md:hidden w-full justify-between">
                  <button
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm"
                  >
                    <Filter size={18} />
                    <span>필터</span>
                  </button>

                  {/* 현재 선택된 필터 표시 */}
                  <div className="flex items-center gap-2">
                    {selectedCategory !== 'all' && (
                      <div className="px-3 py-1 bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-foreground rounded-full text-sm flex items-center gap-1">
                        {
                          categories.find((c) => c.id === selectedCategory)
                            ?.name
                        }
                        <button onClick={() => setSelectedCategory('all')}>
                          <XCircle size={14} />
                        </button>
                      </div>
                    )}

                    {selectedStatus !== 'all' && (
                      <div className="px-3 py-1 bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-foreground rounded-full text-sm flex items-center gap-1">
                        {
                          statusFilters.find((s) => s.id === selectedStatus)
                            ?.name
                        }
                        <button onClick={() => setSelectedStatus('all')}>
                          <XCircle size={14} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* 검색 */}
                <div className="relative w-full md:w-auto">
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500"
                    size={18}
                  />
                  <input
                    type="text"
                    placeholder="프로젝트 검색..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full md:w-64 rounded-lg border border-gray-200 dark:border-gray-700
                    focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                    bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-800 dark:text-gray-200"
                  />
                </div>
              </div>

              {/* 모바일 필터 드롭다운 */}
              <AnimatePresence>
                {isFilterOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="md:hidden mt-4 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 overflow-hidden"
                  >
                    <div className="mb-4">
                      <h3 className="font-semibold mb-2 flex items-center gap-2">
                        <Code2 size={16} />
                        카테고리
                      </h3>
                      <div className="grid grid-cols-2 gap-2">
                        {categories.map((category) => (
                          <FilterButton
                            key={category.id}
                            active={selectedCategory === category.id}
                            onClick={() => {
                              setSelectedCategory(category.id);
                              setIsFilterOpen(false);
                            }}
                            className="flex items-center justify-center gap-2"
                          >
                            {category.icon}
                            <span>{category.name}</span>
                          </FilterButton>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2 flex items-center gap-2">
                        <Tags size={16} />
                        상태
                      </h3>
                      <div className="grid grid-cols-2 gap-2">
                        {statusFilters.map((status) => (
                          <FilterButton
                            key={status.id}
                            active={selectedStatus === status.id}
                            onClick={() => {
                              setSelectedStatus(status.id);
                              setIsFilterOpen(false);
                            }}
                          >
                            {status.name}
                          </FilterButton>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* 데스크톱 상태 필터 */}
              <div className="hidden md:flex mt-4 gap-2">
                <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center mr-2">
                  <Tags size={16} className="mr-1" />
                  상태:
                </div>
                {statusFilters.map((status) => (
                  <FilterButton
                    key={status.id}
                    active={selectedStatus === status.id}
                    onClick={() => setSelectedStatus(status.id)}
                    className="text-sm py-1.5"
                  >
                    {status.name}
                  </FilterButton>
                ))}
              </div>
            </motion.div>

            {/* 프로젝트 결과 */}
            {filteredProjects.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-sm"
              >
                <div className="flex flex-col items-center justify-center">
                  <Rocket size={48} className="text-gray-300 mb-4" />
                  <h3 className="text-xl font-medium text-gray-600 mb-2">
                    프로젝트를 찾을 수 없습니다
                  </h3>
                  <p className="text-gray-500 mb-6">
                    다른 검색어나 필터를 시도해보세요.
                  </p>
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('all');
                      setSelectedStatus('all');
                    }}
                    className="px-4 py-2 bg-primary text-white dark:bg-primary dark:text-primary-foreground rounded-lg shadow-md hover:bg-primary/90 dark:hover:bg-primary/90 transition-colors"
                  >
                    필터 초기화
                  </button>
                </div>
              </motion.div>
            ) : (
              <>
                {/* 결과 카운트 */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mb-6 text-sm text-gray-500 dark:text-gray-400 flex items-center"
                >
                  <Trophy size={16} className="mr-2" />
                  {filteredProjects.length}개의 프로젝트를 찾았습니다
                </motion.div>

                {/* 프로젝트 그리드 */}
                <motion.div
                  layout
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {sortedProjects.map((project, index) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      index={index}
                    />
                  ))}
                </motion.div>
              </>
            )}

            {/* 첨언 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-16 text-center"
            >
              <p className="text-gray-500 dark:text-gray-400 flex items-center justify-center gap-2">
                <Sparkles size={18} className="text-primary" />
                새로운 프로젝트가 계속 추가될 예정입니다
              </p>
            </motion.div>
          </div>
        </ParallaxSection>
      </div>
    </div>
  );
};

export default PlaygroundPage;
