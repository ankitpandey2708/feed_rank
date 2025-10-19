// Curated examples that demonstrate Wilson Score vs simple ratio differences
import { BasicPost } from '@/types';
import { calculateWilsonScore } from './scoring';

interface ExampleSet {
  id: number;
  description: string;
  posts: BasicPost[];
  keyInsight: string;
}

// Example 1: Sample size certainty difference
// Post A: Small sample, perfect ratio
// Post B: Large sample, slightly lower ratio
// Wilson score should prefer B over A despite A's higher ratio
const exampleSet1: ExampleSet = {
  id: 1,
  keyInsight: "Posts with the same approval ratio but different vote counts rank differently due to statistical certainty.",
  posts: [
    { id: 1, upvotes: 3, downvotes: 0 },    // 100% but very uncertain
    { id: 2, upvotes: 30, downvotes: 3 },   // 90% with high certainty
    { id: 3, upvotes: 15, downvotes: 5 },   // 75% medium certainty
  ]
};

// Example 2: Extreme cases showing statistical power
// High-vote moderate performance vs low-vote perfect performance
const exampleSet2: ExampleSet = {
  id: 2,
  keyInsight: "Even with fewer votes, a 90% approval rating can rank above a 95% approval with more votes due to confidence intervals.",
  posts: [
    { id: 1, upvotes: 5, downvotes: 0 },    // 100% perfect but uncertain
    { id: 2, upvotes: 95, downvotes: 5 },   // 95% with high certainty
    { id: 3, upvotes: 28, downvotes: 2 },   // 93% medium certainty
  ]
};

// Example 3: The "paradox" case
// Where the obvious winner isn't the statistical winner
const exampleSet3: ExampleSet = {
  id: 3,
  keyInsight: "Wilson scoring might rank a post with fewer total votes higher than one with more votes and similar ratios.",
  posts: [
    { id: 1, upvotes: 9, downvotes: 1 },    // 90% with medium certainty
    { id: 2, upvotes: 99, downvotes: 1 },   // 99% with very high certainty
    { id: 3, upvotes: 19, downvotes: 1 },   // 95% with reasonable certainty
  ]
};

// Example 4: Small numbers edge case
// Very small vote counts where random chance plays a big role
const exampleSet4: ExampleSet = {
  id: 4,
  keyInsight: "With very few votes, it's hard to know if a post is truly better or just lucky.",
  posts: [
    { id: 1, upvotes: 2, downvotes: 0 },    // 100% but extremely uncertain
    { id: 2, upvotes: 4, downvotes: 2 },    // 67% uncertain
    { id: 3, upvotes: 1, downvotes: 0 },    // 100% but even more uncertain
  ]
};

// Example 5: Large scale differences
// Showing Wilson score's different behavior at scale
const exampleSet5: ExampleSet = {
  id: 5,
  keyInsight: "Even with thousands of votes, small percentage differences can lead to ranking changes.",
  posts: [
    { id: 1, upvotes: 900, downvotes: 100 }, // 90% very certain
    { id: 2, upvotes: 800, downvotes: 50 },  // 94% also very certain
    { id: 3, upvotes: 950, downvotes: 150 }, // 86% certain but lower ratio
  ]
};

const exampleSets: ExampleSet[] = [exampleSet1, exampleSet2, exampleSet3, exampleSet4, exampleSet5];

/**
 * Get a random example set
 */
export function getRandomExampleSet(): ExampleSet {
  const randomIndex = Math.floor(Math.random() * exampleSets.length);
  return exampleSets[randomIndex];
}

/**
 * Convert basic posts to posts with Wilson scores and actual ranks
 */
export function generatePostsFromExample(exampleSet: ExampleSet) {
  // Create posts with calculated Wilson scores
  const posts = exampleSet.posts.map(post => ({
    ...post,
    wilsonScore: calculateWilsonScore(post.upvotes, post.downvotes),
    actualRank: 0,
  }));

  // Rank posts by Wilson score (descending)
  const sorted = [...posts].sort((a, b) => b.wilsonScore - a.wilsonScore);
  sorted.forEach((post, idx) => {
    post.actualRank = idx + 1;
  });

  // Assign actualRank back to original posts
  posts.forEach(post => {
    post.actualRank = sorted.find(p => p.id === post.id)?.actualRank || 0;
  });

  return posts;
}
