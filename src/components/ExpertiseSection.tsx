import { motion } from 'framer-motion';
import {
  Bot,
  Boxes,
  CheckCircle,
  CodeSquare,
  Gauge,
  Palette,
  Smartphone,
  Sparkles,
  Users,
} from 'lucide-react';

const ExpertiseSection = () => {
  const expertiseCategories = {
    ai: {
      title: 'AI Engineering',
      items: [
        {
          title: 'Prompt Engineering',
          description:
            'GPT, Claude 등 AI 도구를 활용한 워크플로우 최적화 및 자동화',
          icon: <Sparkles className="w-6 h-6" />,
        },
        {
          title: 'AI Tools Integration',
          description:
            '다양한 AI 도구에 대한 깊은 이해와 경험을 바탕으로 최신 AI 트렌드를 습득하고 활용',
          icon: <Bot className="w-6 h-6" />,
        },
      ],
    },
    technical: {
      title: 'Technical Expertise',
      items: [
        {
          title: 'Clean Architecture',
          description: '확장 가능하고 유지보수가 용이한 프로젝트 구조 설계',
          icon: <CodeSquare className="w-6 h-6" />,
        },
        {
          title: 'Modern Stack',
          description:
            'Next.js, TypeScript, React Query 등 최신 기술 스택 활용',
          icon: <Boxes className="w-6 h-6" />,
        },
        {
          title: 'Performance Optimization',
          description:
            'Lighthouse 점수 개선, 렌더링 최적화, SEO 향상 등 성능 고도화',
          icon: <Gauge className="w-6 h-6" />,
        },
      ],
    },
    design: {
      title: 'Design & UX',
      items: [
        {
          title: 'Responsive Design',
          description: '모든 디바이스에서 최적화된 사용자 경험 제공',
          icon: <Smartphone className="w-6 h-6" />,
        },
        {
          title: 'Modern UI/UX',
          description: '직관적이고 세련된 사용자 인터페이스 구현',
          icon: <Palette className="w-6 h-6" />,
        },
      ],
    },
    culture: {
      title: 'Development Culture',
      items: [
        {
          title: 'Code Quality',
          description: '테스트, 코드 리뷰, 문서화를 통한 높은 품질 유지',
          icon: <CheckCircle className="w-6 h-6" />,
        },
        {
          title: 'Technical Leadership',
          description: '기술 의사결정 및 팀 성장 주도',
          icon: <Users className="w-6 h-6" />,
        },
      ],
    },
  };

  return (
    <section className="relative py-20">
      {/* 배경 효과 */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/80 to-white/90 backdrop-blur-sm" />
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />

      <div className="relative max-w-7xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
        >
          Expertise
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Object.entries(expertiseCategories).map(
            ([key, category], categoryIndex) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: categoryIndex * 0.1 }}
                className="space-y-6"
              >
                <h3 className="text-xl font-semibold mb-4">{category.title}</h3>
                <div className="grid gap-4">
                  {category.items.map((item, itemIndex) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: categoryIndex * 0.1 + itemIndex * 0.1,
                      }}
                      className={`relative p-6 bg-white/80 backdrop-blur-md rounded-xl shadow-lg
                      transition-all duration-300 group
                      ${key === 'ai' ? 'hover:shadow-blue-200/50' : 'hover:shadow-lg'}
                    `}
                      whileHover={{ y: -5 }}
                    >
                      {/* AI 카드의 경우 항상 보이는 얇은 무지개 테두리 + 호버시 강조 */}
                      {key === 'ai' && (
                        <>
                          {/* 기본 테두리 */}
                          <div
                            className="absolute -inset-[1px] bg-gradient-to-r from-pink-500/40 via-purple-500/40 to-blue-500/40
                          rounded-xl opacity-50"
                          />
                          {/* 호버시 강조되는 테두리 */}
                          <div
                            className="absolute -inset-[1px] bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500
                          rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          />
                        </>
                      )}
                      <div
                        className={`relative ${key === 'ai' ? 'bg-white/95 rounded-lg p-6' : ''}`}
                      >
                        <div className="flex items-center space-x-4">
                          <div
                            className={`${key === 'ai' ? 'text-blue-600 group-hover:text-purple-600 transition-colors' : 'text-blue-600'}`}
                          >
                            {item.icon}
                          </div>
                          <div>
                            <h4 className="font-medium">{item.title}</h4>
                            <p className="text-sm text-gray-600 mt-1">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ),
          )}
        </div>
      </div>
    </section>
  );
};

export default ExpertiseSection;
