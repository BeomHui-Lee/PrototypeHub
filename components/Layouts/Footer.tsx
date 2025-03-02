'use client';

import {
  BookOpen,
  Brain,
  Code2,
  Cpu,
  Github,
  Heart,
  Mail,
  Monitor,
  ArrowUpRight,
  ExternalLink,
} from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const Footer = () => {
  const techStacks = [
    { icon: <Code2 size={16} />, text: 'TypeScript' },
    { icon: <Monitor size={16} />, text: 'React' },
    { icon: <Cpu size={16} />, text: 'Next.js' },
    { icon: <Brain size={16} />, text: 'AI Engineering' },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 회사 정보 */}
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xl font-bold mb-4 gradient-text"
            >
              프로토타입 허브
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground"
            >
              프론트엔드 개발과 AI 엔지니어링의 만남
            </motion.p>

            <motion.nav
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap gap-4 mt-6"
            >
              <Link
                href="/public"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                홈
              </Link>
              <Link
                href="/playground"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                플레이그라운드
              </Link>
              <Link
                href="/lab"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                실험실
              </Link>
              <Link
                href="/career"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                경력
              </Link>
              <Link
                href="/about"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                소개
              </Link>
            </motion.nav>
          </div>

          {/* 기술 스택 */}
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xl font-bold mb-4"
            >
              기술 스택
            </motion.h3>
            <div className="grid grid-cols-2 gap-2">
              {techStacks.map(({ icon, text }, index) => (
                <motion.div
                  key={text}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                  className="flex items-center space-x-2 text-muted-foreground"
                >
                  <span className="text-primary">{icon}</span>
                  <span>{text}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* 연락처 */}
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xl font-bold mb-4"
            >
              연락하기
            </motion.h3>
            <div className="space-y-2">
              <motion.a
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                href="mailto:huina0901@naver.com"
                className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors group"
              >
                <Mail size={16} />
                <span>이메일</span>
                <ArrowUpRight
                  size={14}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </motion.a>
              <motion.a
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                href="https://github.com/BeomHui-Lee"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors group"
              >
                <Github size={16} />
                <span>GitHub</span>
                <ExternalLink
                  size={14}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </motion.a>
              <motion.a
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                href="https://merciful-mongoose-a9b.notion.site/15be6dbc7dd9802aa71cfeea35ea90bf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors group"
              >
                <BookOpen size={16} />
                <span>기술 블로그</span>
                <ExternalLink
                  size={14}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </motion.a>
            </div>
          </div>
        </div>

        {/* 카피라이트 */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="border-t border-border mt-8 pt-8 text-center text-muted-foreground text-sm"
        >
          <p className="flex items-center justify-center gap-1">
            © {currentYear} PrototypeHub. Made with
            <Heart size={14} className="text-red-500 animate-pulse-glow" />
            by BeomHui Lee
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
