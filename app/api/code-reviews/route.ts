// app/api/code-reviews/route.ts
import { NextResponse } from 'next/server';
import { Octokit } from '@octokit/rest';
import type { CodeReviewResponse, PullRequest } from '@/types/review';

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

const REPO_OWNER = 'BeomHui-Lee';
const REPO_NAME = 'prototypehub';

export async function GET(): Promise<NextResponse> {
  try {
    // 1. PR 목록 가져오기
    const { data: pullRequests } = await octokit.pulls.list({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      state: 'all',
      sort: 'created',
      direction: 'desc',
      per_page: 10,
    });

    // 2. 각 PR의 코멘트 가져오기
    const prsWithReviews = await Promise.all(
      pullRequests.map(async (pr) => {
        const { data: comments } = await octokit.issues.listComments({
          owner: REPO_OWNER,
          repo: REPO_NAME,
          issue_number: pr.number,
        });

        // GPT 리뷰 코멘트 필터링
        const gptReviews = comments
          .filter(
            (comment) =>
              comment.body && comment.body.includes('## 🤖 AI 코드 리뷰'),
          )
          .map((review) => ({
            id: review.id,
            body: review.body || '', // null/undefined 처리
            createdAt: review.created_at,
          }));

        // PR의 변경사항 가져오기
        const { data: prDiff } = await octokit.pulls.get({
          owner: REPO_OWNER,
          repo: REPO_NAME,
          pull_number: pr.number,
          mediaType: {
            format: 'diff',
          },
        });

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
          diff: typeof prDiff === 'string' ? prDiff : '',
        };

        return pullRequest;
      }),
    );

    return NextResponse.json(prsWithReviews as CodeReviewResponse);
  } catch (error) {
    console.error('Error fetching code reviews:', error);
    return NextResponse.json(
      { error: 'Failed to fetch code reviews' } as const,
      { status: 500 },
    );
  }
}
