import { useState, useEffect } from 'react';
import { Post, GameSession, ScoreResult } from '@/types';
import { getNextExampleSet, generatePostsFromExample } from '../../utils/curatedExamples';

// Helper function to create new game session
function createNewSession(): GameSession {
  return {
    roundsPlayed: 0,
    totalScore: 0,
    maxPossibleScore: 0,
    conceptsLearned: new Set<string>(),
    difficulty: 'beginner',
    streak: 0,
    consecutiveCorrect: 0
  };
}

// Calculate enhanced score with partial credit
function calculateScore(posts: Post[]): ScoreResult {
  let exactMatches = 0;
  let partialScore = 0;

  posts.forEach((post, userIdx) => {
    if (userIdx + 1 === post.actualRank) {
      exactMatches++;
      partialScore += 3; // Full points
    } else {
      // Partial credit for being close
      const distance = Math.abs((userIdx + 1) - post.actualRank);
      if (distance === 1) {
        partialScore += 1; // One position off
      }
    }
  });

  return {
    exactMatches,
    totalScore: partialScore,
    maxScore: posts.length * 3
  };
}

// Get contextual hint based on current user ranking
function getContextualHint(posts: Post[]): string | null {
  const topPost = posts[0];
  const correctHighest = posts.find(p => p.actualRank === 1);

  if (!correctHighest || topPost.id === correctHighest.id) {
    return null;
  }

  const topTotal = topPost.upvotes + topPost.downvotes;
  const topRatio = topPost.upvotes / topTotal;
  const correctTotal = correctHighest.upvotes + correctHighest.downvotes;
  const correctRatio = correctHighest.upvotes / correctTotal;

  if (topRatio > correctRatio && topTotal < correctTotal) {
    return "Consider: Sometimes a higher percentage with fewer votes is less reliable than a slightly lower percentage with many more votes.";
  }

  if (topTotal < 30 && topPost.downvotes === 0) {
    return "Think about it: Can we really trust a perfect score with so few votes?";
  }

  return "Think about statistical confidence: Which post's rating is most trustworthy given the sample sizes?";
}

// Provide live validation feedback
function provideLiveValidation(posts: Post[]): string[] {
  const issues: string[] = [];

  const topPost = posts[0];
  const topTotal = topPost.upvotes + topPost.downvotes;
  const smallSamplePerfectScore = topTotal < 30 && topPost.downvotes === 0;

  if (smallSamplePerfectScore) {
    const largerPosts = posts.filter(p => {
      const total = p.upvotes + p.downvotes;
      return total > topTotal;
    });
    if (largerPosts.length > 0) {
      issues.push("Are you sure about that top post? Perfect scores with few votes can be misleading.");
    }
  }

  return issues;
}

export function useFeedRankGame() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [scoreResult, setScoreResult] = useState<ScoreResult | null>(null);
  const [currentKeyInsight, setCurrentKeyInsight] = useState<string>("");
  const [session, setSession] = useState<GameSession>(createNewSession());
  const [hintsEnabled, setHintsEnabled] = useState(true);
  const [currentHint, setCurrentHint] = useState<string | null>(null);
  const [validationIssues, setValidationIssues] = useState<string[]>([]);

  const generateCuratedPosts = (): Post[] => {
    const exampleSet = getNextExampleSet(
      session.roundsPlayed,
      session.consecutiveCorrect,
      session.conceptsLearned
    );
    setCurrentKeyInsight(exampleSet.keyInsight);
    return generatePostsFromExample(exampleSet);
  };

  // Initialize posts on mount
  useEffect(() => {
    setPosts(generateCuratedPosts());
  }, []);

  // Update validation when posts change
  useEffect(() => {
    if (!isSubmitted && posts.length > 0) {
      const issues = provideLiveValidation(posts);
      setValidationIssues(issues);
    }
  }, [posts, isSubmitted]);

  const isValidRanks = () => posts.length === 3;

  const handleRequestHint = () => {
    const hint = getContextualHint(posts);
    setCurrentHint(hint);
  };

  const handleSubmit = () => {
    const result = calculateScore(posts);
    setScoreResult(result);
    setIsSubmitted(true);
    setCurrentHint(null); // Clear hints on submit

    // Update session
    const isPerfect = result.exactMatches === 3;
    setSession(prev => {
      const newConceptsLearned = new Set(prev.conceptsLearned);
      if (isPerfect) {
        // Mark current concept as learned
        newConceptsLearned.add(currentKeyInsight);
      }

      return {
        ...prev,
        roundsPlayed: prev.roundsPlayed + 1,
        totalScore: prev.totalScore + result.exactMatches,
        maxPossibleScore: prev.maxPossibleScore + 3,
        streak: isPerfect ? prev.streak + 1 : 0,
        consecutiveCorrect: isPerfect ? prev.consecutiveCorrect + 1 : 0,
        conceptsLearned: newConceptsLearned
      };
    });
  };

  const handleRestart = () => {
    setPosts(generateCuratedPosts());
    setIsSubmitted(false);
    setScoreResult(null);
    setCurrentHint(null);
    setValidationIssues([]);
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const reordered = Array.from(posts);
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);
    setPosts(reordered);
  };

  const toggleHints = () => {
    setHintsEnabled(!hintsEnabled);
    if (hintsEnabled) {
      setCurrentHint(null);
    }
  };

  return {
    posts,
    isSubmitted,
    score: scoreResult?.exactMatches ?? null,
    scoreResult,
    isValidRanks: isValidRanks(),
    currentKeyInsight,
    session,
    hintsEnabled,
    currentHint,
    validationIssues,
    handleSubmit,
    handleRestart,
    handleDragEnd,
    handleRequestHint,
    toggleHints,
  };
}
