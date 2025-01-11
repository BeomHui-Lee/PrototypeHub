import {
  BookOpen,
  Brain,
  Code2,
  Cpu,
  Github,
  Mail,
  Monitor,
} from 'lucide-react';

const Footer = () => {
  const techStacks = [
    { icon: <Code2 size={16} />, text: 'TypeScript' },
    { icon: <Monitor size={16} />, text: 'React' },
    { icon: <Cpu size={16} />, text: 'Next.js' },
    { icon: <Brain size={16} />, text: 'AI Engineering' },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 회사 정보 */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">
              프로토타입 허브
            </h3>
            <p className="text-gray-400">
              프론트엔드 개발과 AI 엔지니어링의 만남
            </p>
          </div>

          {/* 기술 스택 */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">기술 스택</h3>
            <div className="grid grid-cols-2 gap-2">
              {techStacks.map(({ icon, text }) => (
                <div key={text} className="flex items-center space-x-2">
                  {icon}
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 연락처 */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">연락하기</h3>
            <div className="space-y-2">
              <a
                href="mailto:your.email@example.com"
                className="flex items-center space-x-2 hover:text-blue-400 transition-colors"
              >
                <Mail size={16} />
                <span>이메일</span>
              </a>
              <a
                href="https://github.com/BeomHui-Lee"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 hover:text-blue-400 transition-colors"
              >
                <Github size={16} />
                <span>GitHub</span>
              </a>
              <a
                href="https://merciful-mongoose-a9b.notion.site/15be6dbc7dd9802aa71cfeea35ea90bf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 hover:text-blue-400 transition-colors"
              >
                <BookOpen size={16} />
                <span>기술 블로그</span>
              </a>
            </div>
          </div>
        </div>

        {/* 카피라이트 */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p>© 2025 PrototypeHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
