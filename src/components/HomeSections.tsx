import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import {
  Code,
  CpuIcon,
  LayoutGrid,
  LineChart,
  MonitorSmartphone,
  Notebook,
} from 'lucide-react';

// 패럴랙스 이미지 섹션
const ParallaxSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

  return (
    <motion.div
      ref={ref}
      className="h-[50vh] relative overflow-hidden bg-gradient-to-b from-blue-100 to-purple-100 my-24"
    >
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="grid grid-cols-3 gap-8 p-8">
          {[
            { icon: <Code size={48} />, title: 'Clean Code' },
            {
              icon: <MonitorSmartphone size={48} />,
              title: 'Responsive Design',
            },
            { icon: <LineChart size={48} />, title: 'Performance' },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="flex flex-col items-center p-8 bg-white/80 backdrop-blur-lg rounded-xl shadow-lg"
            >
              <div className="text-blue-600 mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold text-gray-800">{item.title}</h3>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

// 3D 카드 그리드
const FeatureGrid = () => {
  const cards = [
    {
      icon: <LayoutGrid size={32} />,
      title: '모던 UI/UX',
      description: '최신 디자인 트렌드와 사용자 경험을 고려한 인터페이스 구현',
    },
    {
      icon: <Notebook size={32} />,
      title: '코드 품질',
      description: '클린 코드 원칙을 준수하며 유지보수가 용이한 코드 작성',
    },
    {
      icon: <CpuIcon size={32} />,
      title: '최적화',
      description: '성능과 접근성을 고려한 최적화된 웹 애플리케이션 개발',
    },
  ];

  return (
    <div className="py-24 bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              whileHover={{
                scale: 1.05,
                rotateY: 5,
                z: 50,
              }}
              className="p-8 bg-white rounded-xl shadow-lg transform transition-all duration-300
                hover:shadow-2xl relative overflow-hidden group"
            >
              <div
                className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10
                opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
              <div className="relative z-10">
                <div className="text-blue-600 mb-4">{card.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {card.title}
                </h3>
                <p className="text-gray-600">{card.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

// 스크롤 프로그레스 바
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-1 bg-blue-600 transform origin-left z-50"
    />
  );
};

export { ParallaxSection, FeatureGrid, ScrollProgress };
