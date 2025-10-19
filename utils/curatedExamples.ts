import { BasicPost } from '@/types';
import { calculateWilsonScore } from './scoring';

interface ExampleSet {
  id: number;
  posts: BasicPost[];
  keyInsight: string;
}

const exampleSet1: ExampleSet = {
  id: 1,
  keyInsight: "An 89% approval rating with 200 votes ranks HIGHEST despite a 95% rating with only 20 votes having higher ratio - statistical confidence beats raw percentages.",
  posts: [
    { id: 1, upvotes: 19, downvotes: 1 },  // 95% ratio, 20 votes
    { id: 2, upvotes: 178, downvotes: 22 }, // 89% ratio, 200 votes
    { id: 3, upvotes: 95, downvotes: 15 }, // 86.4% ratio, 110 votes
  ]
};

const exampleSet2: ExampleSet = {
  id: 2,
  keyInsight: "Two posts with identical 100% ratings rank completely differently based on sample size - small samples are unreliable despite perfect scores.",
  posts: [
    { id: 1, upvotes: 5, downvotes: 0 },   // 100% ratio, 5 votes
    { id: 2, upvotes: 15, downvotes: 0 },  // 100% ratio, 15 votes
    { id: 3, upvotes: 3, downvotes: 0 },   // 100% ratio, 3 votes
  ]
};

const exampleSet3: ExampleSet = {
  id: 3,
  keyInsight: "A post with 66.7% approval and 120 votes ranks HIGHER than one with 60% approval and 150 votes - bigger sample beats slightly better ratio.",
  posts: [
    { id: 1, upvotes: 80, downvotes: 40 },  // 66.7% ratio, 120 votes
    { id: 2, upvotes: 90, downvotes: 60 },  // 60% ratio, 150 votes
    { id: 3, upvotes: 48, downvotes: 32 },  // 60% ratio, 80 votes
  ]
};

const exampleSet4: ExampleSet = {
  id: 4,
  keyInsight: "With thousands of votes, identical 95% ratios still rank by sample size - more votes mean higher confidence, even with same approval rate.",
  posts: [
    { id: 1, upvotes: 950, downvotes: 50 },  // 95% ratio, 1000 votes
    { id: 2, upvotes: 855, downvotes: 45 },  // 95% ratio, 900 votes
    { id: 3, upvotes: 760, downvotes: 40 },  // 95% ratio, 800 votes
  ]
};

const exampleSet5: ExampleSet = {
  id: 5,
  keyInsight: "A 96% rating with 25 votes ranks LOWER than an 87% rating with 300 votes - statistical uncertainty matters even at moderate sample sizes.",
  posts: [
    { id: 1, upvotes: 24, downvotes: 1 },     // 96% ratio, 25 votes
    { id: 2, upvotes: 261, downvotes: 39 },   // 87% ratio, 300 votes
    { id: 3, upvotes: 99, downvotes: 21 },    // 82.5% ratio, 120 votes
  ]
};

const exampleSet6: ExampleSet = {
  id: 6,
  keyInsight: "Three posts with nearly identical ratios (around 85%) rank in reverse order of sample size - reliability increases with more data.",
  posts: [
    { id: 1, upvotes: 17, downvotes: 3 },   // 85% ratio, 20 votes
    { id: 2, upvotes: 51, downvotes: 9 },   // 85% ratio, 60 votes
    { id: 3, upvotes: 85, downvotes: 15 },  // 85% ratio, 100 votes
  ]
};

const exampleSets: ExampleSet[] = [exampleSet1, exampleSet2, exampleSet3, exampleSet4, exampleSet5, exampleSet6];

export function getRandomExampleSet(): ExampleSet {
  const randomIndex = Math.floor(Math.random() * exampleSets.length);
  return exampleSets[randomIndex];
}

export function generatePostsFromExample(exampleSet: ExampleSet) {
  const posts = exampleSet.posts.map(post => ({
    ...post,
    wilsonScore: calculateWilsonScore(post.upvotes, post.downvotes),
    actualRank: 0,
  }));

  const sorted = [...posts].sort((a, b) => b.wilsonScore - a.wilsonScore);
  sorted.forEach((post, idx) => {
    post.actualRank = idx + 1;
  });

  posts.forEach(post => {
    post.actualRank = sorted.find(p => p.id === post.id)?.actualRank || 0;
  });

  return posts;
}
