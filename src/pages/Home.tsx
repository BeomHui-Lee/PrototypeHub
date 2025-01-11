import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Briefcase, Code2, FlaskConical } from 'lucide-react';
import BackgroundScene from '../components/BackgroundScene';
import {
  FeatureGrid,
  ParallaxSection,
  ScrollProgress,
} from '../components/HomeSections';

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
  const navigate = useNavigate();

  return (
    <motion.div
      onClick={() => navigate(path)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="group bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-8 cursor-pointer
      transform transition-all duration-300
      border-2 border-transparent hover:border-blue-100"
    >
      <div className="flex flex-col items-center text-center">
        <div
          className="p-4 bg-blue-50 rounded-full mb-4 text-blue-600 group-hover:bg-blue-100
          transition-colors"
        >
          {icon}
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-blue-600">
          {title}
        </h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </motion.div>
  );
};

const Home = () => {
  const sections: SectionCardProps[] = [
    {
      title: '프로젝트',
      description:
        '완성된 프로젝트들을 확인해보세요. 각 프로젝트의 상세 내용과 기술 스택을 소개합니다.',
      icon: <Code2 size={32} />,
      path: '/projects',
    },
    {
      title: '실험실',
      description:
        '실험적인 프로토타입과 컴포넌트들을 살펴보세요. 새로운 기술과 아이디어를 테스트합니다.',
      icon: <FlaskConical size={32} />,
      path: '/lab',
    },
    {
      title: '경력',
      description:
        '지금까지의 개발 여정과 경험을 공유합니다. 프로젝트 이력과 기술 스택을 확인하세요.',
      icon: <Briefcase size={32} />,
      path: '/experience',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 relative overflow-hidden">
      <ScrollProgress />
      <BackgroundScene />

      {/* 메인 컨텐츠 */}
      <main className="relative">
        <div className="max-w-6xl mx-auto px-4 pt-32 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold text-gray-800 mb-6">
              프론트엔드 개발자
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              AI와 3D를 활용한 혁신적인 웹 경험을 만듭니다. 최신 기술과 창의적인
              아이디어로 사용자 경험을 향상시키는 것을 추구합니다.
            </p>
          </motion.div>

          {/* 섹션 그리드 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto"
          >
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
          </motion.div>
        </div>

        {/* 패럴랙스 섹션 */}
        <ParallaxSection />

        {/* 3D 카드 그리드 */}
        <FeatureGrid />
      </main>
    </div>
  );
};

export default Home;
