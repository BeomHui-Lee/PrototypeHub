// types/review.ts

export interface Review {
  id: number;
  body: string;
  createdAt: string;
}

export interface PullRequest {
  id: number;
  number: number;
  title: string;
  url: string;
  createdAt: string;
  updatedAt: string;
  state: 'open' | 'closed' | 'merged';
  author: string;
  reviews: Review[];
  diff: string;
}

export type CodeReviewResponse = PullRequest[];
