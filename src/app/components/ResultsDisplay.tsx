import { PostResult, UserMistakes } from '@/types';

interface ResultsDisplayProps {
  score: number;
  resultsData: PostResult[];
  keyInsight?: string;
}

// Analyze user mistakes for personalized insights
function analyzeUserMistakes(results: PostResult[]): UserMistakes {
  const errors = results.filter(r => r.userRank !== r.actualRank);

  // Check if user put small-sample post too high
  const prioritizedSmallSample = errors.some(e => {
    const total = e.upvotes + e.downvotes;
    return total < 30 && e.userRank < e.actualRank;
  });

  // Check if user ignored sample size
  const ignoredSampleSize = errors.some(e => {
    const total = e.upvotes + e.downvotes;
    const percentage = e.upvotes / total;
    return percentage > 0.9 && e.userRank < e.actualRank;
  });

  // Check if Wilson scores were very close
  const wilsonScores = results.map(r => r.wilsonScore);
  const maxDiff = Math.max(...wilsonScores) - Math.min(...wilsonScores);
  const closeDifference = maxDiff < 0.05 && errors.length > 0;

  return { prioritizedSmallSample, ignoredSampleSize, closeDifference };
}

// Generate personalized insight based on user's mistakes
function generatePersonalizedInsight(
  resultsData: PostResult[],
  keyInsight?: string
): string {
  const mistakes = analyzeUserMistakes(resultsData);

  if (mistakes.prioritizedSmallSample) {
    return "You ranked a post with a perfect score but few votes too high. Small samples are unreliable - even a 100% rating with 5 votes has high uncertainty.";
  }

  if (mistakes.ignoredSampleSize) {
    return "You focused too much on approval percentage. Remember: a 90% rating with 500 votes is more trustworthy than 95% with 50 votes.";
  }

  if (mistakes.closeDifference) {
    return "These posts had very similar Wilson scores! At this level, even slight differences in sample size and ratio create different confidence levels.";
  }

  return keyInsight || "Good try! Keep practicing to understand how sample size affects ranking confidence.";
}

const ResultsDisplay = ({ score, resultsData, keyInsight }: ResultsDisplayProps) => {
  // Calculate percentage rankings
  const withPercentageRank = resultsData.map(post => {
    const total = post.upvotes + post.downvotes;
    const percentage = total > 0 ? post.upvotes / total : 0;
    return { ...post, percentageScore: percentage };
  });

  // Sort by percentage (the "wrong" naive way)
  const percentageOrder = [...withPercentageRank].sort((a, b) => {
    const diff = (b.percentageScore || 0) - (a.percentageScore || 0);
    // If percentages are equal, sort by volume
    if (Math.abs(diff) < 0.0001) {
      return (b.upvotes + b.downvotes) - (a.upvotes + a.downvotes);
    }
    return diff;
  });

  // Assign percentage ranks
  percentageOrder.forEach((post, idx) => {
    post.percentageRank = idx + 1;
  });

  // Sort data for each column
  const userOrder = [...withPercentageRank].sort((a, b) => a.userRank - b.userRank);
  const correctOrder = [...withPercentageRank].sort((a, b) => a.actualRank - b.actualRank);
  const percentageRanked = [...withPercentageRank].sort((a, b) => (a.percentageRank || 0) - (b.percentageRank || 0));

  // Premium Card component
  const Card = ({
    post,
    showScore,
    scoreType = 'none'
  }: {
    post: PostResult;
    showScore: boolean;
    scoreType?: 'wilson' | 'percentage' | 'none';
  }) => {
    const total = post.upvotes + post.downvotes;
    const percentage = total > 0 ? ((post.upvotes / total) * 100).toFixed(1) : '0.0';

    return (
      <div className="bg-white border border-neutral-200/60 rounded-xl p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 min-h-[100px] flex flex-col items-center justify-center text-center">
        <div className="text-lg font-semibold text-neutral-900 mb-2">
          Post #{post.id}
        </div>
        <div className="text-sm text-neutral-600 mb-1">
          ↑ {post.upvotes} ↓ {post.downvotes}
        </div>
        {showScore && scoreType === 'wilson' && (
          <div className="text-xs text-primary-600 font-semibold font-mono">
            Wilson: {post.wilsonScore.toFixed(4)}
          </div>
        )}
        {showScore && scoreType === 'percentage' && (
          <div className="text-xs text-warning-600 font-semibold font-mono">
            {percentage}% ({total} votes)
          </div>
        )}
      </div>
    );
  };

  const personalizedInsight = generatePersonalizedInsight(resultsData, keyInsight);

  return (
    <div className="mt-8">
      {/* Premium Score Display */}
      <div className="text-center mb-12 p-8 bg-white border border-neutral-200/60 rounded-xl shadow-md">
        <p className="text-sm font-medium text-neutral-500 uppercase tracking-wide mb-2">
          Your Score
        </p>
        <h2 className="text-5xl font-bold text-neutral-950 tracking-tight">
          {score} <span className="text-neutral-400">/</span> 3
        </h2>
      </div>

      {/* Premium 3-Column Comparison */}
      <div className="mb-12 text-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1200px] mx-auto items-start">
          {/* User's Ranking */}
          <div>
            <h3 className="text-xl font-semibold text-neutral-900 mb-1 tracking-tight">
              Your Ranking
            </h3>
            <p className="text-xs text-neutral-500 mb-4">Your guess</p>
            <div className="flex flex-col gap-3">
              {userOrder.map(post => (
                <Card key={post.id} post={post} showScore={false} scoreType="none" />
              ))}
            </div>
          </div>

          {/* Percentage-Based (Wrong Way) */}
          <div>
            <h3 className="text-xl font-semibold text-warning-600 mb-1 tracking-tight">
              Percentage-Based ❌
            </h3>
            <p className="text-xs text-neutral-500 mb-4">The naive approach</p>
            <div className="flex flex-col gap-3">
              {percentageRanked.map(post => (
                <Card key={post.id} post={post} showScore={true} scoreType="percentage" />
              ))}
            </div>
          </div>

          {/* Wilson Score (Correct Way) */}
          <div>
            <h3 className="text-xl font-semibold text-success-600 mb-1 tracking-tight">
              <a
                href="https://www.evanmiller.org/how-not-to-sort-by-average-rating.html"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-success-700 underline transition-colors"
              >
                Wilson Score ✓
              </a>
            </h3>
            <p className="text-xs text-neutral-500 mb-4">Statistical confidence</p>
            <div className="flex flex-col gap-3">
              {correctOrder.map(post => (
                <Card key={post.id} post={post} showScore={true} scoreType="wilson" />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Premium Educational Insight */}
      <div className={`text-center p-6 rounded-xl border max-w-2xl mx-auto shadow-sm ${
        score === 3
          ? 'bg-success-50 border-success-500/60'
          : 'bg-warning-50 border-warning-500/60'
      }`}>
        <p className={`text-sm leading-relaxed m-0 italic ${
          score === 3 ? 'text-success-800' : 'text-warning-800'
        }`}>
          {score === 3 ? "🎉 Perfect! " : "💡 "}{personalizedInsight}
        </p>
      </div>
    </div>
  );
};

export default ResultsDisplay;
