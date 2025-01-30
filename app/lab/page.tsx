'use client';

import { motion } from 'framer-motion';
import { Bot, Brain, Code2, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

interface LabProject {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  comingSoon?: boolean;
  path: string;
  category: string;
  tags: string[];
}

const LabPage = () => {
  const projects: LabProject[] = [
    {
      id: 'code-review',
      title: 'GPT 자동 코드리뷰',
      description:
        'GitHub PR에 대해 GPT-4o-mini가 자동으로 코드리뷰를 수행합니다. 코드 품질, 보안, 성능 관점에서 분석하고 개선점을 제안합니다.',
      icon: <Bot className="w-6 h-6" />,
      path: '/lab/code-review',
      category: 'AI Engineering',
      tags: ['GPT-4', 'GitHub', 'Code Analysis'],
    },
    {
      id: 'ai-assistant',
      title: 'AI 개발 어시스턴트',
      description:
        '개발 과정에서 발생하는 다양한 질문에 대해 AI가 실시간으로 답변을 제공합니다.',
      icon: <Brain className="w-6 h-6" />,
      comingSoon: true,
      path: '/lab/ai-assistant',
      category: 'AI Assistant',
      tags: ['Real-time', 'Development Support'],
    },
    {
      id: 'code-generator',
      title: '코드 생성기',
      description:
        '설계 문서나 요구사항을 기반으로 기본 코드 구조를 자동으로 생성합니다.',
      icon: <Code2 className="w-6 h-6" />,
      comingSoon: true,
      path: '/lab/code-generator',
      category: 'Code Generation',
      tags: ['Automation', 'Boilerplate'],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-gray-800 mb-4"
          >
            AI 실험실
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            최신 AI 기술을 활용한 실험적인 프로젝트들을 소개합니다. 각각의
            프로젝트는 개발 생산성과 코드 품질 향상을 목표로 합니다.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={project.path}>
                <div
                  className={`group relative bg-white rounded-2xl shadow-lg border border-gray-100
                  overflow-hidden transition-all duration-300 hover:shadow-xl
                  ${project.comingSoon ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <div
                    className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500
                    opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl -z-10"
                  />

                  <div className="p-8">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div
                          className="p-3 bg-blue-50 rounded-xl text-blue-600 
                          group-hover:bg-blue-100 transition-colors"
                        >
                          {project.icon}
                        </div>
                        <div>
                          <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                            {project.category}
                          </span>
                        </div>
                      </div>
                      {!project.comingSoon && (
                        <ArrowUpRight
                          className="w-6 h-6 text-gray-400 
                          group-hover:text-blue-600 transition-colors"
                        />
                      )}
                    </div>

                    <h3
                      className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 
                      transition-colors"
                    >
                      {project.title}
                      {project.comingSoon && (
                        <span
                          className="ml-2 inline-block px-2 py-1 text-xs font-medium
                          text-purple-600 bg-purple-50 rounded-full"
                        >
                          Coming Soon
                        </span>
                      )}
                    </h3>

                    <p className="text-gray-600 mb-4">{project.description}</p>

                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LabPage;
