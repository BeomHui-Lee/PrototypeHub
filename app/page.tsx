'use client';

import { motion } from 'framer-motion';
import { Briefcase, Code2, FlaskConical, ArrowRight } from 'lucide-react';
import ExpertiseSection from '@/components/ExpertiseSection';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Footer from '@/components/Footer';

const BackgroundScene = dynamic(() => import('@/components/BackgroundScene'), {
  ssr: false,
});

interface SectionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
}

const SectionCard: React.FC<SectionCardProps> = ({
  title,
  description,
  icon,
  path,
}) => {
  return (
    <Link href={path}>
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="group relative bg-white/80 backdrop-blur-sm rounded-xl shadow-sm p-6 cursor-pointer
        transform transition-all duration-300 border border-gray-100 hover:shadow-xl
        hover:bg-gradient-to-br hover:from-white hover:to-blue-50"
      >
        {/* Accent Border */}
        <div
          className="absolute inset-px bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10
          rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
        />

        <div className="relative flex items-center gap-4">
          <div className="flex-shrink-0">
            <div
              className="p-3 bg-blue-50 rounded-lg text-blue-600
              group-hover:bg-blue-100 transition-colors"
            >
              {icon}
            </div>
          </div>
          <div className="flex-grow">
            <h3
              className="text-xl font-bold text-gray-800 mb-1 group-hover:text-blue-600
              transition-colors flex items-center gap-2"
            >
              {title}
              <ArrowRight
                size={18}
                className="opacity-0 -translate-x-2 group-hover:opacity-100
                group-hover:translate-x-0 transition-all"
              />
            </h3>
            <p className="text-gray-600 text-sm">{description}</p>
          </div>
        </div>
      </motion.div>
    </Link>
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
    },
    {
      title: '실험실',
      description:
        '실험적인 프로토타입과 컴포넌트들을 살펴보세요. 새로운 기술과 아이디어를 테스트합니다.',
      icon: <FlaskConical size={24} />,
      path: '/lab',
    },
    {
      title: '경력',
      description:
        '지금까지의 개발 여정과 경험을 공유합니다. 프로젝트 이력과 기술 스택을 확인하세요.',
      icon: <Briefcase size={24} />,
      path: '/career',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 relative overflow-hidden">
      <BackgroundScene />

      <main className="relative max-w-6xl mx-auto px-4 pt-20 pb-12">
        {/* 히어로 섹션 */}
        <div className="relative mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-6"
          >
            <h1
              className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r
              from-blue-600 to-purple-600 pb-2"
            >
              AI Frontend Engineer
            </h1>
            <div className="flex flex-col items-center gap-4">
              <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                <span className="font-semibold text-blue-600">AI</span>와{' '}
                <span className="font-semibold text-purple-600">3D</span>{' '}
                인터랙션을 활용한 혁신적인 웹 경험을 만듭니다.
              </p>
            </div>
          </motion.div>

          {/* 카드 섹션 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="pt-[220px] max-w-4xl mx-auto"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sections.map((section, index) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <SectionCard {...section} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <ExpertiseSection />
      </main>

      <Footer />
    </div>
  );
}
