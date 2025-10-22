// Wilson Score Lower Bound calculation utility
import { WilsonScoreResult } from '@/types';

/**
 * Calculates the Wilson score lower bound for a Bernoulli parameter (upvotes/downvotes)
 * @param upvotes Number of positive votes
 * @param downvotes Number of negative votes
 * @param confidence Confidence level (default 0.95)
 * @returns Wilson score lower bound
 */
export function calculateWilsonScore(upvotes: number, downvotes: number, confidence: number = 0.95): number {
  const n = upvotes + downvotes;
  if (n === 0) return 0;
  const z = confidence === 0.95 ? 1.96 : 1.64485; // 1.96 for 95%, 1.64485 for 90%
  const phat = upvotes / n;
  return (
    (phat + z * z / (2 * n) - z * Math.sqrt((phat * (1 - phat) + z * z / (4 * n)) / n)) /
    (1 + z * z / n)
  );
}

/**
 * Calculates detailed Wilson score with confidence intervals
 * @param upvotes Number of positive votes
 * @param downvotes Number of negative votes
 * @param confidence Confidence level (default 0.95)
 * @returns Detailed Wilson score result with intervals
 */
export function calculateWilsonScoreDetailed(
  upvotes: number,
  downvotes: number,
  confidence: number = 0.95
): WilsonScoreResult {
  const n = upvotes + downvotes;
  if (n === 0) {
    return {
      lowerBound: 0,
      upperBound: 0,
      pointEstimate: 0,
      confidenceRange: 0,
      sampleSize: 0
    };
  }

  const z = confidence === 0.95 ? 1.96 : 1.64485;
  const phat = upvotes / n;
  const denominator = 1 + z * z / n;
  const center = (phat + z * z / (2 * n)) / denominator;
  const margin = (z * Math.sqrt((phat * (1 - phat) + z * z / (4 * n)) / n)) / denominator;

  return {
    lowerBound: center - margin,
    upperBound: center + margin,
    pointEstimate: phat,
    confidenceRange: 2 * margin,
    sampleSize: n
  };
}
