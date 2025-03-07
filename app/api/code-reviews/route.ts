// app/api/code-reviews/route.ts
import { NextResponse } from 'next/server';
import { Octokit } from '@octokit/rest';
import type { CodeReviewResponse, PullRequest } from '@/types/review';

// GitHub Personal Access Token 인증 설정
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
if (!GITHUB_TOKEN) {
  console.error('❌ GITHUB_TOKEN 환경 변수가 설정되지 않았습니다.');
  throw new Error('Missing GitHub Token');
}

const octokit = new Octokit({ auth: GITHUB_TOKEN });

const REPO_OWNER = 'BeomHui-Lee';
const REPO_NAME = 'prototypehub';

export const dynamic = 'force-dynamic'; // 정적 캐시 비활성화
export const revalidate = 0; // 캐시 재검증 비활성화

export async function GET(): Promise<NextResponse> {
  try {
    // 1. GitHub API 요청 제한 확인
    const { data: rateLimit } = await octokit.rateLimit.get();
    if (rateLimit.rate.remaining === 0) {
      const resetTime = new Date(
        rateLimit.rate.reset * 1000,
      ).toLocaleTimeString();
      console.warn(
        `⚠️ GitHub API 요청 제한 초과! 제한이 ${resetTime}에 초기화됩니다.`,
      );
      return NextResponse.json(
        { error: `GitHub API 요청 제한 초과. 제한 초기화 시간: ${resetTime}` },
        { status: 429 },
      );
    }

    // 2. PR 목록 가져오기
    const { data: pullRequests } = await octokit.pulls.list({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      state: 'all',
      sort: 'created',
      direction: 'desc',
      per_page: 10,
    });

    // 3. 각 PR의 리뷰 및 변경사항 가져오기
    const prsWithReviews = await Promise.all(
      pullRequests.map(async (pr) => {
        // (1) AI 리뷰 코멘트 가져오기
        const { data: comments } = await octokit.issues.listComments({
          owner: REPO_OWNER,
          repo: REPO_NAME,
          issue_number: pr.number,
        });

        const gptReviews = comments
          .filter((comment) => comment.body?.includes('## 🤖 AI 코드 리뷰'))
          .map((review) => ({
            id: review.id,
            body: review.body || '',
            createdAt: review.created_at,
          }));

        // (2) PR 변경사항 가져오기 (예외 처리 추가)
        let prDiff = '';
        try {
          const { data } = await octokit.pulls.get({
            owner: REPO_OWNER,
            repo: REPO_NAME,
            pull_number: pr.number,
            mediaType: { format: 'diff' },
          });

          prDiff = typeof data === 'string' ? data : '';
        } catch (diffError) {
          console.warn(
            `⚠️ PR #${pr.number} 변경사항(diff) 가져오기 실패:`,
            diffError,
          );
        }

        // PR 정보 객체 생성
        const pullRequest: PullRequest = {
          id: pr.id,
          number: pr.number,
          title: pr.title || '',
          url: pr.html_url || '',
          createdAt: pr.created_at,
          updatedAt: pr.updated_at,
          state: (pr.merged_at ? 'merged' : pr.state) as PullRequest['state'],
          author: pr.user?.login || 'unknown',
          reviews: gptReviews,
          diff: prDiff,
        };

        return pullRequest;
      }),
    );

    // 4. 응답 반환 (캐시 비활성화)
    return new NextResponse(
      JSON.stringify(prsWithReviews as CodeReviewResponse),
      {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
        },
      },
    );
  } catch (error) {
    console.error('❌ 코드 리뷰 정보 가져오기 실패:', error);
    return NextResponse.json(
      { error: 'Failed to fetch code reviews' },
      {
        status: 500,
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
        },
      },
    );
  }
}
