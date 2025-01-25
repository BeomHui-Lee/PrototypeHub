import { useState, useEffect } from 'react';
import {
  Bot,
  GitPullRequest,
  MessageSquare,
  Code,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { PullRequest } from '@/types/review';

const CodeReviewHistory = () => {
  const [reviews, setReviews] = useState<PullRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedPR, setExpandedPR] = useState<number | null>(null);
  const [selectedView, setSelectedView] = useState<'reviews' | 'diff'>(
    'reviews',
  );

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('/api/code-reviews');
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6">
      {/* 헤더 섹션 */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl text-white overflow-hidden">
        <div className="p-6 flex items-center gap-4">
          <Bot size={32} />
          <div>
            <h2 className="text-2xl font-bold">AI 코드 리뷰 히스토리</h2>
            <p className="text-blue-100">
              GPT-4를 활용한 자동 코드 리뷰 시스템
            </p>
          </div>
        </div>
      </div>

      {/* PR 리스트 */}
      <div className="space-y-4">
        {reviews.map((pr) => (
          <motion.div
            key={pr.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* PR 헤더 */}
            <div
              className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => setExpandedPR(expandedPR === pr.id ? null : pr.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <GitPullRequest
                    className={`${
                      pr.state === 'merged'
                        ? 'text-purple-500'
                        : pr.state === 'closed'
                          ? 'text-red-500'
                          : 'text-green-500'
                    }`}
                  />
                  <div>
                    <a
                      href={pr.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-semibold text-gray-800 hover:text-blue-500"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {pr.title}
                    </a>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span>PR #{pr.number}</span>
                      <span>•</span>
                      <span>{pr.author}</span>
                      <span>•</span>
                      <span>{new Date(pr.createdAt).toLocaleDateString()}</span>
                      <span>•</span>
                      <span
                        className={`capitalize font-medium ${
                          pr.state === 'merged'
                            ? 'text-purple-500'
                            : pr.state === 'closed'
                              ? 'text-red-500'
                              : 'text-green-500'
                        }`}
                      >
                        {pr.state}
                      </span>
                    </div>
                  </div>
                </div>
                {expandedPR === pr.id ? <ChevronUp /> : <ChevronDown />}
              </div>
            </div>

            {/* PR 상세 내용 */}
            <AnimatePresence>
              {expandedPR === pr.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="border-t border-gray-100 p-6">
                    {/* 뷰 선택 탭 */}
                    <div className="flex gap-2 mb-4">
                      <button
                        onClick={() => setSelectedView('reviews')}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                          selectedView === 'reviews'
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <MessageSquare size={16} />
                          리뷰
                        </div>
                      </button>
                      <button
                        onClick={() => setSelectedView('diff')}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                          selectedView === 'diff'
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Code size={16} />
                          변경사항
                        </div>
                      </button>
                    </div>

                    {/* 컨텐츠 영역 */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      {selectedView === 'reviews' ? (
                        // 리뷰 내용
                        <div className="space-y-4">
                          {pr.reviews.map((review) => (
                            <div
                              key={review.id}
                              className="bg-white rounded-lg p-4 shadow-sm"
                            >
                              <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                                <Bot size={16} />
                                <span>
                                  {new Date(review.createdAt).toLocaleString()}
                                </span>
                              </div>
                              <div className="prose prose-sm max-w-none">
                                {review.body}
                              </div>
                            </div>
                          ))}
                          {pr.reviews.length === 0 && (
                            <div className="text-center text-gray-500 py-8">
                              아직 리뷰가 없습니다.
                            </div>
                          )}
                        </div>
                      ) : (
                        // 코드 변경사항
                        <pre className="overflow-x-auto p-4 text-sm font-mono text-gray-800">
                          {pr.diff}
                        </pre>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CodeReviewHistory;
