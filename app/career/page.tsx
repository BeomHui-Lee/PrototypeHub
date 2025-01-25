'use client';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Building2,
  Calendar,
  ChevronDown,
  ExternalLink,
  Github,
  GraduationCap,
  Trophy,
} from 'lucide-react';

const CareerPage = () => {
  const [expandedCompany, setExpandedCompany] = useState<string | null>(null);

  const companies = [
    {
      id: 'tripbtoz',
      name: '주식회사트립비토즈',
      period: '2023.07 - 현재',
      position: '프론트엔드 개발자',
      projects: [
        {
          title: 'B2B 서비스 TPS 어드민 개발',
          period: '2024.09 - 2024.11',
          description: 'B2B 파트너사를 위한 호텔 API 관리 시스템 개발',
          achievements: [
            '프로젝트 초기 환경 설정 및 기술 스택 구성',
            '호텔 요금제 및 객실 조회 API 관리 페이지 개발',
            '권한에 따른 Auth 설정 구현과 i18n을 이용한 4개국어 다국어 시스템 구축',
          ],
        },
        {
          title: '메인 서비스 메인 화면 개선',
          period: '2024.04 - 2024.07',
          description: '자사 메인 서비스의 메인 페이지 전면 개편',
          achievements: [
            '메인페이지 검색 로직 및 UI 전면 개편',
            '다수의 백엔드 개발자들과 협업하며 서비스 개발 및 배포 진행',
            '코드 퀄리티 유지 및 규격 조율에 기여',
          ],
        },
      ],
    },
    {
      id: 'greenlabs',
      name: '주식회사그린랩스',
      period: '2021.10 - 2023.04',
      position: '자재플랫폼 개발실 / 팀원',
      projects: [
        {
          title: '병해충 처방 v3.2.0',
          period: '2022.12',
          description:
            '진단 결과와 진단 상세 결과 페이지를 고도화하고 제품 추천 기능을 추가 개발',
          achievements: [
            '신규 UI 반영 및 관련 로직 재구성',
            '제품 추천 컴포넌트 개발 및 상세 정보 페이지 작성',
            '개발 일정 단축 및 QA 시간 확보로 성공적인 제품 출시',
          ],
        },
      ],
    },
    {
      id: 'douzone',
      name: '(주)더존비즈온',
      period: '2018.05 - 2021.04',
      position: '플랫폼사업부문 서비스개발센터 / 주임연구원',
      projects: [
        {
          title: '서비스모듈 다국어화',
          period: '2021.02 - 2021.04',
          description:
            '회계/급여 모듈의 일본 서비스를 위한 다국어 지원 시스템 구축',
          achievements: [
            '3개 언어 지원 시스템 구축',
            '유지보수가 용이한 구조 설계',
            '기존 스타일 유지하며 다국어 처리',
          ],
        },
      ],
    },
  ];

  const education = {
    school: '세명대학교',
    major: '컴퓨터학부 소프트웨어학',
    period: '2011.03 - 2018.02',
    degree: '학사',
  };

  const awards = [
    {
      title: '올바름상 (Rightness)',
      organization: '그린랩스',
      category: '개발자 RoleModel 부문',
      date: '2023.01',
    },
  ];

  const links = [
    {
      icon: <Github className="w-5 h-5" />,
      title: 'GitHub',
      url: 'https://github.com/BeomHui-Lee',
    },
    {
      icon: <ExternalLink className="w-5 h-5" />,
      title: '기술 블로그',
      url: 'https://frontend-study.tistory.com/',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* 헤더 섹션 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Career Journey
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            약 6년간의 프론트엔드 개발 경험을 통해 다양한 프로젝트를 성공적으로
            수행해왔습니다.
          </p>
        </motion.div>

        {/* 링크 섹션 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center gap-4 mb-12"
        >
          {links.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm
                hover:shadow-md transition-all duration-300 text-gray-700 hover:text-blue-600"
            >
              {link.icon}
              <span>{link.title}</span>
            </a>
          ))}
        </motion.div>

        {/* 경력 타임라인 */}
        <div className="space-y-8">
          {companies.map((company, index) => (
            <motion.div
              key={company.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              <div
                className={`bg-white rounded-xl shadow-lg overflow-hidden
                  transition-all duration-300 ${expandedCompany === company.id ? 'ring-2 ring-blue-400' : ''}`}
              >
                {/* 회사 정보 헤더 */}
                <div
                  onClick={() =>
                    setExpandedCompany(
                      expandedCompany === company.id ? null : company.id,
                    )
                  }
                  className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <Building2 className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">
                        {company.name}
                      </h3>
                      <p className="text-gray-600">{company.position}</p>
                      <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        <span>{company.period}</span>
                      </div>
                    </div>
                  </div>
                  <ChevronDown
                    className={`w-6 h-6 text-gray-400 transition-transform duration-300
                      ${expandedCompany === company.id ? 'transform rotate-180' : ''}`}
                  />
                </div>

                {/* 프로젝트 목록 */}
                <AnimatePresence>
                  {expandedCompany === company.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-gray-100"
                    >
                      <div className="p-6 space-y-6">
                        {company.projects.map((project, projectIndex) => (
                          <motion.div
                            key={project.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: projectIndex * 0.1 }}
                            className="bg-gray-50 rounded-lg p-4 space-y-3"
                          >
                            <div className="flex items-center justify-between">
                              <h4 className="text-lg font-semibold text-gray-800">
                                {project.title}
                              </h4>
                              <span className="text-sm text-gray-500">
                                {project.period}
                              </span>
                            </div>
                            <p className="text-gray-600">
                              {project.description}
                            </p>
                            <ul className="space-y-2">
                              {project.achievements.map((achievement, i) => (
                                <li
                                  key={i}
                                  className="flex items-center gap-2 text-gray-600"
                                >
                                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                                  {achievement}
                                </li>
                              ))}
                            </ul>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 학력 및 수상 섹션 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {/* 학력 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-purple-50 rounded-lg">
                <GraduationCap className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Education</h3>
            </div>
            <div className="space-y-2">
              <h4 className="text-lg font-semibold text-gray-800">
                {education.school}
              </h4>
              <p className="text-gray-600">{education.major}</p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                <span>{education.period}</span>
              </div>
            </div>
          </motion.div>

          {/* 수상 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-yellow-50 rounded-lg">
                <Trophy className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Awards</h3>
            </div>
            {awards.map((award, index) => (
              <div key={index} className="space-y-2">
                <h4 className="text-lg font-semibold text-gray-800">
                  {award.title}
                </h4>
                <p className="text-gray-600">
                  {award.organization} - {award.category}
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar className="w-4 h-4" />
                  <span>{award.date}</span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CareerPage;
