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
  wilsonDetails?: WilsonScoreResult;
  actualRank: number;
  userRank: number;
  percentageRank?: number;
  percentageScore?: number;
}

export interface WilsonScoreResult {
  lowerBound: number;
  upperBound: number;
  pointEstimate: number;
  confidenceRange: number;
  sampleSize: number;
}

export type Difficulty = 'beginner' | 'intermediate' | 'advanced';
export type ConceptType = 'sample_size' | 'perfect_scores' | 'similar_ratios' | 'high_volume';

export interface GameSession {
  roundsPlayed: number;
  totalScore: number;
  maxPossibleScore: number;
  conceptsLearned: Set<string>;
  difficulty: Difficulty;
  streak: number;
  consecutiveCorrect: number;
}



export interface UserMistakes {
  prioritizedSmallSample: boolean;
  ignoredSampleSize: boolean;
  closeDifference: boolean;
}

export interface RankingComparison {
  post: PostResult;
  percentageRank: number;
  wilsonRank: number;
  percentageScore: number;
  wilsonScore: number;
}
