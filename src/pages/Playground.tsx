import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Calendar, Search, Tags } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  tags: string[];
  date: string;
  category: 'web' | 'app' | 'game' | 'experiment';
  link: string;
}

const playground: Project[] = [
  {
    id: 'lottery',
    title: '추첨 시뮬레이터',
    description:
      '실시간 추첨 시뮬레이션 시스템입니다. 공정하고 투명한 추첨 과정을 시각화하여 제공합니다.',
    thumbnail: '/api/placeholder/800/600',
    tags: ['React', 'TypeScript', 'Tailwind CSS'],
    date: '2024.01',
    category: 'web',
    link: '/lottery',
  },
  // 추가 프로젝트들...
];

const ProjectsPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: '전체' },
    { id: 'web', name: '웹' },
    { id: 'app', name: '앱' },
    { id: 'game', name: '게임' },
    { id: 'experiment', name: '실험' },
  ];

  const filteredProjects = playground.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    const matchesCategory =
      selectedCategory === 'all' || project.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      {/* 헤더 섹션 */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-gray-800 mb-4"
          >
            플레이그라운드
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            웹 개발부터 실험적인 프로젝트까지, 다양한 도전과 경험을 소개합니다
          </motion.p>
        </div>

        {/* 필터 및 검색 섹션 */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* 카테고리 필터 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex gap-2"
          >
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg transition-colors
                  ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-100'
                  }`}
              >
                {category.name}
              </button>
            ))}
          </motion.div>

          {/* 검색 바 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="프로젝트 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full md:w-64 rounded-lg border border-gray-200
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </motion.div>
        </div>

        {/* 프로젝트 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => navigate(project.link)}
              className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300
                border border-gray-100 overflow-hidden cursor-pointer"
            >
              {/* 썸네일 이미지 */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300
                    group-hover:scale-105"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0
                  group-hover:opacity-100 transition-opacity duration-300"
                />
              </div>

              {/* 프로젝트 정보 */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3
                    className="text-xl font-bold text-gray-800 group-hover:text-blue-600
                    transition-colors"
                  >
                    {project.title}
                  </h3>
                  <ArrowUpRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* 메타 정보 */}
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-2">
                    <Tags size={16} />
                    <span>{project.tags.join(', ')}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar size={16} />
                    <span>{project.date}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
