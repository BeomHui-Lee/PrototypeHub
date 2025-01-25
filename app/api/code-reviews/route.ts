// app/api/code-reviews/route.ts
import { NextResponse } from 'next/server';
import { Octokit } from '@octokit/rest';
import type { CodeReviewResponse, PullRequest } from '@/types/review';

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

const REPO_OWNER = 'BeomHui-Lee';
const REPO_NAME = 'PrototypeHub';

export async function GET(): Promise<NextResponse<CodeReviewResponse>> {
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
    const prsWithReviews: PullRequest[] = await Promise.all(
      pullRequests.map(async (pr) => {
        const { data: comments } = await octokit.issues.listComments({
          owner: REPO_OWNER,
          repo: REPO_NAME,
          issue_number: pr.number,
        });

        // GPT 리뷰 코멘트 필터링
        const gptReviews = comments
          .filter((comment) => comment.body.includes('## 🤖 AI 코드 리뷰'))
          .map((review) => ({
            id: review.id,
            body: review.body,
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

        return {
          id: pr.id,
          number: pr.number,
          title: pr.title,
          url: pr.html_url,
          createdAt: pr.created_at,
          updatedAt: pr.updated_at,
          state: pr.state as PullRequest['state'],
          author: pr.user.login,
          reviews: gptReviews,
          diff: prDiff,
        };
      }),
    );

    return NextResponse.json(prsWithReviews);
  } catch (error) {
    console.error('Error fetching code reviews:', error);
    return NextResponse.json(
      { error: 'Failed to fetch code reviews' },
      { status: 500 },
    );
  }
}
