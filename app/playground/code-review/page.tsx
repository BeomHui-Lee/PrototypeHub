'use client';

import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import CodeReviewHistory from '@/private/components/CodeReviewHistory';

const CodeReviewPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* 뒤로가기 버튼 */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link
            href="/playground"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400
              transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" />
            돌아가기
          </Link>
        </motion.div>

        {/* 페이지 헤더 */}
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4"
          >
            GPT 자동 코드리뷰
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            GitHub PR에 대해 GPT가 자동으로 코드리뷰를 수행합니다. 코드 품질,
            보안, 성능 관점에서 분석하고 개선점을 제안합니다.
          </motion.p>
        </div>

        {/* 코드리뷰 컴포넌트 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden"
        >
          <CodeReviewHistory />
        </motion.div>
      </div>
    </div>
  );
};

export default CodeReviewPage;
