import { BasicPost, Difficulty, ConceptType } from '@/types';
import { calculateWilsonScore } from './scoring';

export interface ExampleSet {
  id: number;
  difficulty: Difficulty;
  concept: ConceptType;
  posts: BasicPost[];
  keyInsight: string;
}

interface PostSpec {
  targetRatio: number;
  targetVolume: number;
}

const exampleSet1: ExampleSet = {
  id: 1,
  difficulty: 'beginner',
  concept: 'sample_size',
  keyInsight: "An 89% approval rating with 200 votes ranks HIGHEST despite a 95% rating with only 20 votes having higher ratio - statistical confidence beats raw percentages.",
  posts: [
    { id: 1, upvotes: 19, downvotes: 1 },  // 95% ratio, 20 votes
    { id: 2, upvotes: 178, downvotes: 22 }, // 89% ratio, 200 votes
    { id: 3, upvotes: 95, downvotes: 15 }, // 86.4% ratio, 110 votes
  ]
};

const exampleSet2: ExampleSet = {
  id: 2,
  difficulty: 'beginner',
  concept: 'perfect_scores',
  keyInsight: "Two posts with identical 100% ratings rank completely differently based on sample size - small samples are unreliable despite perfect scores.",
  posts: [
    { id: 1, upvotes: 5, downvotes: 0 },   // 100% ratio, 5 votes
    { id: 2, upvotes: 15, downvotes: 0 },  // 100% ratio, 15 votes
    { id: 3, upvotes: 3, downvotes: 0 },   // 100% ratio, 3 votes
  ]
};

const exampleSet3: ExampleSet = {
  id: 3,
  difficulty: 'intermediate',
  concept: 'sample_size',
  keyInsight: "A post with 66.7% approval and 120 votes ranks HIGHER than one with 60% approval and 150 votes - bigger sample beats slightly better ratio.",
  posts: [
    { id: 1, upvotes: 80, downvotes: 40 },  // 66.7% ratio, 120 votes
    { id: 2, upvotes: 90, downvotes: 60 },  // 60% ratio, 150 votes
    { id: 3, upvotes: 48, downvotes: 32 },  // 60% ratio, 80 votes
  ]
};

const exampleSet4: ExampleSet = {
  id: 4,
  difficulty: 'advanced',
  concept: 'high_volume',
  keyInsight: "With thousands of votes, identical 95% ratios still rank by sample size - more votes mean higher confidence, even with same approval rate.",
  posts: [
    { id: 1, upvotes: 950, downvotes: 50 },  // 95% ratio, 1000 votes
    { id: 2, upvotes: 855, downvotes: 45 },  // 95% ratio, 900 votes
    { id: 3, upvotes: 760, downvotes: 40 },  // 95% ratio, 800 votes
  ]
};

const exampleSet5: ExampleSet = {
  id: 5,
  difficulty: 'intermediate',
  concept: 'sample_size',
  keyInsight: "A 96% rating with 25 votes ranks LOWER than an 87% rating with 300 votes - statistical uncertainty matters even at moderate sample sizes.",
  posts: [
    { id: 1, upvotes: 24, downvotes: 1 },     // 96% ratio, 25 votes
    { id: 2, upvotes: 261, downvotes: 39 },   // 87% ratio, 300 votes
    { id: 3, upvotes: 99, downvotes: 21 },    // 82.5% ratio, 120 votes
  ]
};

const exampleSet6: ExampleSet = {
  id: 6,
  difficulty: 'advanced',
  concept: 'similar_ratios',
  keyInsight: "Three posts with nearly identical ratios (around 85%) rank in reverse order of sample size - reliability increases with more data.",
  posts: [
    { id: 1, upvotes: 17, downvotes: 3 },   // 85% ratio, 20 votes
    { id: 2, upvotes: 51, downvotes: 9 },   // 85% ratio, 60 votes
    { id: 3, upvotes: 85, downvotes: 15 },  // 85% ratio, 100 votes
  ]
};

const exampleSets: ExampleSet[] = [exampleSet1, exampleSet2, exampleSet3, exampleSet4, exampleSet5, exampleSet6];

// Helper function to generate posts from specifications
function generatePostsFromSpecs(specs: PostSpec[]): BasicPost[] {
  return specs.map((spec, i) => {
    const upvotes = Math.round(spec.targetVolume * spec.targetRatio);
    const downvotes = spec.targetVolume - upvotes;
    return { id: i + 1, upvotes, downvotes };
  });
}

// Dynamic example generation by concept
export function generateExampleByPattern(concept: ConceptType, difficulty: Difficulty): ExampleSet {
  const id = Math.floor(Math.random() * 10000);

  switch (concept) {
    case 'sample_size':
      if (difficulty === 'beginner') {
        return {
          id,
          difficulty,
          concept,
          keyInsight: "Higher approval percentage doesn't always win - sample size matters for confidence!",
          posts: generatePostsFromSpecs([
            { targetRatio: 0.95, targetVolume: 20 },
            { targetRatio: 0.87, targetVolume: 200 },
            { targetRatio: 0.83, targetVolume: 100 }
          ])
        };
      } else {
        return {
          id,
          difficulty,
          concept,
          keyInsight: "Even with moderate sample sizes, statistical confidence can override higher percentages.",
          posts: generatePostsFromSpecs([
            { targetRatio: 0.92, targetVolume: 50 },
            { targetRatio: 0.88, targetVolume: 250 },
            { targetRatio: 0.85, targetVolume: 150 }
          ])
        };
      }

    case 'perfect_scores':
      return {
        id,
        difficulty,
        concept,
        keyInsight: "Perfect 100% scores are unreliable with small samples - more data reveals true quality.",
        posts: generatePostsFromSpecs([
          { targetRatio: 1.0, targetVolume: Math.floor(Math.random() * 10) + 3 },
          { targetRatio: 1.0, targetVolume: Math.floor(Math.random() * 15) + 15 },
          { targetRatio: 1.0, targetVolume: Math.floor(Math.random() * 10) + 5 }
        ])
      };

    case 'similar_ratios':
      const baseRatio = 0.8 + Math.random() * 0.1; // 80-90%
      return {
        id,
        difficulty,
        concept,
        keyInsight: "When approval rates are similar, sample size becomes the deciding factor for reliability.",
        posts: generatePostsFromSpecs([
          { targetRatio: baseRatio, targetVolume: 30 },
          { targetRatio: baseRatio + 0.01, targetVolume: 80 },
          { targetRatio: baseRatio - 0.01, targetVolume: 150 }
        ])
      };

    case 'high_volume':
      const highRatio = 0.9 + Math.random() * 0.05;
      return {
        id,
        difficulty,
        concept,
        keyInsight: "Even with thousands of votes and identical percentages, sample size still affects confidence.",
        posts: generatePostsFromSpecs([
          { targetRatio: highRatio, targetVolume: 800 },
          { targetRatio: highRatio, targetVolume: 1200 },
          { targetRatio: highRatio, targetVolume: 1500 }
        ])
      };
  }
}

export function getRandomExampleSet(): ExampleSet {
  const randomIndex = Math.floor(Math.random() * exampleSets.length);
  return exampleSets[randomIndex];
}

export function getExampleByDifficulty(difficulty: Difficulty): ExampleSet {
  const filtered = exampleSets.filter(e => e.difficulty === difficulty);
  if (filtered.length === 0) return exampleSets[0];
  const randomIndex = Math.floor(Math.random() * filtered.length);
  return filtered[randomIndex];
}

export function getNextCuratedExampleSet(previousIds: number[]): ExampleSet {
  const remaining = exampleSets.find(exampleSet => !previousIds.includes(exampleSet.id));
  if (remaining) {
    return remaining;
  }

  return exampleSets[0];
}

export function getNextExampleSet(
  currentLevel: number,
  consecutiveCorrect: number,
  conceptsMastered: Set<string>
): ExampleSet {
  // Start with beginner if new
  if (currentLevel === 0) {
    return getExampleByDifficulty('beginner');
  }

  // Progress to harder examples after 2 consecutive perfect scores
  if (consecutiveCorrect >= 2) {
    if (currentLevel < 5) {
      // Try intermediate
      return getExampleByDifficulty('intermediate');
    } else {
      // Try advanced
      return getExampleByDifficulty('advanced');
    }
  }

  // Mix of current difficulty
  if (currentLevel < 3) {
    return getExampleByDifficulty('beginner');
  } else if (currentLevel < 7) {
    return Math.random() > 0.5 ? getExampleByDifficulty('beginner') : getExampleByDifficulty('intermediate');
  } else {
    return Math.random() > 0.3 ? getExampleByDifficulty('intermediate') : getExampleByDifficulty('advanced');
  }
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
