import { motion } from 'framer-motion';
import {
  Bot,
  Boxes,
  CheckCircle,
  CodeSquare,
  Gauge,
  Layers,
  Palette,
  Smartphone,
  Sparkles,
  Users,
  Wand2,
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
        {
          title: 'AI-Enhanced UX',
          description:
            '인공지능을 활용한 맞춤형 사용자 경험 개선 및 지능형 인터페이스 개발',
          icon: <Wand2 className="w-6 h-6" />,
        },
      ],
    },
    technical: {
      title: 'Technical Expertise',
      items: [
        {
          title: 'Clean Architecture',
          description: '확장 가능하고 유지보수가 용이한 프로젝트 구조 설계',
          icon: <Layers className="w-6 h-6" />,
        },
        {
          title: 'Modern Stack',
          description:
            'Next.js, TypeScript, React Query 등 최신 기술 스택 활용',
          icon: <CodeSquare className="w-6 h-6" />,
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

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const cardHover = {
    rest: { scale: 1, y: 0 },
    hover: { scale: 1.03, y: -5, transition: { duration: 0.3 } },
  };

  return (
    <section className="relative py-20">
      {/* 배경 효과 */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background/80 backdrop-blur-sm" />
      <div className="absolute inset-0 grid-pattern opacity-10" />

      <div className="relative max-w-7xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-3xl font-bold text-center mb-16 gradient-text"
        >
          Expertise
        </motion.h2>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {Object.entries(expertiseCategories).map(
            ([key, category], categoryIndex) => (
              <motion.div key={key} variants={item} className="space-y-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  {key === 'ai' && (
                    <Sparkles className="w-5 h-5 text-primary" />
                  )}
                  {category.title}
                </h3>
                <div className="grid gap-4">
                  {category.items.map((item, itemIndex) => (
                    <motion.div
                      key={item.title}
                      variants={cardHover}
                      initial="rest"
                      whileHover="hover"
                      className={`relative p-6 glass-card rounded-xl shadow-lg
                      transition-all duration-300 group overflow-hidden
                      ${key === 'ai' ? 'border-primary/20' : 'border-border/50'}
                    `}
                    >
                      {/* AI 카드의 경우 특별한 효과 */}
                      {key === 'ai' && (
                        <>
                          <div
                            className="absolute -inset-[1px] bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-blue-500/10
                            rounded-xl opacity-50 group-hover:opacity-0 transition-opacity"
                          />
                          <div
                            className="absolute -inset-[1px] bg-gradient-to-r from-pink-500/40 via-purple-500/40 to-blue-500/40
                            rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          />
                          <div className="absolute -bottom-2 -right-2 w-32 h-32 bg-blue-500/10 blur-2xl rounded-full group-hover:bg-blue-500/20 transition-colors duration-300" />
                        </>
                      )}

                      <div className="relative">
                        <div className="flex items-center space-x-4">
                          <div
                            className={`${key === 'ai' ? 'text-primary group-hover:text-blue-500 transition-colors' : 'text-primary'}`}
                          >
                            {item.icon}
                          </div>
                          <div>
                            <h4 className="font-medium">{item.title}</h4>
                            <p className="text-sm text-muted-foreground mt-1">
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
        </motion.div>
      </div>
    </section>
  );
};

export default ExpertiseSection;
