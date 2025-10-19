export interface BasicPost {
  id: number;
  upvotes: number;
  downvotes: number;
}

export interface Post extends BasicPost {
  wilsonScore: number;
  actualRank: number;
}

export interface PostResult {
  id: number;
  upvotes: number;
  downvotes: number;
  wilsonScore: number;
  actualRank: number;
  userRank: number;
}
