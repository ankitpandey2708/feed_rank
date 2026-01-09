import { PostResult, UserMistakes } from '@/types';

interface ResultsDisplayProps {
  score: number;
  resultsData: PostResult[];
  keyInsight?: string;
}

function analyzeUserMistakes(results: PostResult[]): UserMistakes {
  const errors = results.filter(r => r.userRank !== r.actualRank);

  const prioritizedSmallSample = errors.some(e => {
    const total = e.upvotes + e.downvotes;
    return total < 30 && e.userRank < e.actualRank;
  });

  const ignoredSampleSize = errors.some(e => {
    const total = e.upvotes + e.downvotes;
    const percentage = e.upvotes / total;
    return percentage > 0.9 && e.userRank < e.actualRank;
  });

  const wilsonScores = results.map(r => r.wilsonScore);
  const maxDiff = Math.max(...wilsonScores) - Math.min(...wilsonScores);
  const closeDifference = maxDiff < 0.05 && errors.length > 0;

  return { prioritizedSmallSample, ignoredSampleSize, closeDifference };
}

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
  const withPercentageRank = resultsData.map(post => {
    const total = post.upvotes + post.downvotes;
    const percentage = total > 0 ? post.upvotes / total : 0;
    return { ...post, percentageScore: percentage };
  });

  const percentageOrder = [...withPercentageRank].sort((a, b) => {
    const diff = (b.percentageScore || 0) - (a.percentageScore || 0);
    if (Math.abs(diff) < 0.0001) {
      return (b.upvotes + b.downvotes) - (a.upvotes + a.downvotes);
    }
    return diff;
  });

  percentageOrder.forEach((post, idx) => {
    post.percentageRank = idx + 1;
  });

  const userOrder = [...withPercentageRank].sort((a, b) => a.userRank - b.userRank);
  const correctOrder = [...withPercentageRank].sort((a, b) => a.actualRank - b.actualRank);
  const percentageRanked = [...withPercentageRank].sort((a, b) => (a.percentageRank || 0) - (b.percentageRank || 0));
  const isSameAsPercentage = userOrder.every((post, idx) => post.id === percentageRanked[idx]?.id);
  const allPerfectRates = withPercentageRank.every(post => {
    const total = post.upvotes + post.downvotes;
    return total > 0 && post.downvotes === 0;
  });
  const showPercentage = !allPerfectRates;
  const showUserRanking = !isSameAsPercentage || !showPercentage;
  const visibleColumns = 1 + (showUserRanking ? 1 : 0) + (showPercentage ? 1 : 0);
  const gridColumnsClass =
    visibleColumns === 3 ? 'lg:grid-cols-3' : visibleColumns === 2 ? 'lg:grid-cols-2' : 'lg:grid-cols-1';

  const Card = ({
    post,
    showScore,
    scoreType = 'none',
    index
  }: {
    post: PostResult;
    showScore: boolean;
    scoreType?: 'wilson' | 'percentage' | 'none';
    index: number;
  }) => {
    const total = post.upvotes + post.downvotes;
    const percentage = total > 0 ? ((post.upvotes / total) * 100).toFixed(1) : '0.0';

    return (
      <div
        className="group relative bg-ink-muted border border-white/[0.08] rounded-xl p-4 hover:border-white/[0.15] transition-all duration-250"
        style={{ animationDelay: `${index * 80}ms` }}
      >
        {/* Rank badge */}
        <div className="absolute -top-2 -left-2 w-6 h-6 bg-charcoal border border-white/10 rounded-lg flex items-center justify-center">
          <span className="text-xs font-mono font-bold text-stone">{index + 1}</span>
        </div>

        <div className="pt-1">
          <div className="font-display text-base font-semibold text-ivory mb-2">
            Post #{post.id}
          </div>

          <div className="flex items-center gap-3 text-sm">
            <span className="flex items-center gap-1 text-success">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
              </svg>
              <span className="font-mono">{post.upvotes}</span>
            </span>
            <span className="flex items-center gap-1 text-error">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
              </svg>
              <span className="font-mono">{post.downvotes}</span>
            </span>
          </div>

          {showScore && (
            <div className="mt-3 pt-3 border-t border-white/[0.06]">
              {scoreType === 'wilson' && (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-stone uppercase tracking-wide">Wilson</span>
                  <span className="font-mono text-sm font-semibold text-electric">
                    {post.wilsonScore.toFixed(4)}
                  </span>
                </div>
              )}
              {scoreType === 'percentage' && (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-stone uppercase tracking-wide">Rate</span>
                  <span className="font-mono text-sm font-semibold text-warning">
                    {percentage}%
                  </span>
                  <span className="text-xs text-ash">({total})</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  const personalizedInsight = generatePersonalizedInsight(resultsData, keyInsight);
  const isPerfect = score === 3;

  return (
    <div className="space-y-10">
      {/* Score Hero */}
      <div className="relative text-center">
        {/* Background glow for perfect score */}
        {isPerfect && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-64 h-64 bg-electric/20 rounded-full blur-3xl animate-glow-pulse" />
          </div>
        )}

        <div className="relative inline-block">
          <div className="mb-4">
            <span className="inline-block px-4 py-1.5 bg-surface border border-white/[0.08] rounded-full text-xs font-mono uppercase tracking-wider text-stone">
              Round Complete
            </span>
          </div>

          <div className="flex items-baseline justify-center gap-3">
            <span
              className={`font-display text-7xl sm:text-8xl font-bold tracking-editorial ${
                isPerfect ? 'text-electric' : 'text-ivory'
              }`}
            >
              {score}
            </span>
            <span className="text-3xl sm:text-4xl text-ash font-light">/</span>
            <span className="font-display text-3xl sm:text-4xl text-ash font-bold">3</span>
          </div>

          {isPerfect && (
            <div className="mt-4 flex items-center justify-center gap-2 text-electric">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">Perfect!</span>
            </div>
          )}
        </div>
      </div>

      {/* Three Column Comparison */}
      <div className={`grid grid-cols-1 gap-6 lg:gap-8 ${gridColumnsClass}`}>
        {/* Your Ranking */}
        {showUserRanking && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-surface border border-white/[0.08] rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-ivory" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-ivory">Your Ranking</h3>
                <p className="text-xs text-stone">Your guess</p>
              </div>
            </div>
            <div className="space-y-3 stagger-children">
              {userOrder.map((post, idx) => (
                <Card key={post.id} post={post} showScore={false} scoreType="none" index={idx} />
              ))}
            </div>
          </div>
        )}

        {/* Percentage-Based */}
        {showPercentage && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-warning/10 border border-warning/30 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-warning" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-warning">Percentage-Based</h3>
                <p className="text-xs text-stone">The naive approach</p>
              </div>
            </div>
            <div className="space-y-3 stagger-children">
              {percentageRanked.map((post, idx) => (
                <Card key={post.id} post={post} showScore={true} scoreType="percentage" index={idx} />
              ))}
            </div>
          </div>
        )}

        {/* Wilson Score */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-electric/10 border border-electric/30 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-electric" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h3 className="font-display text-lg font-semibold text-electric">
                <a
                  href="https://www.evanmiller.org/how-not-to-sort-by-average-rating.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline underline-offset-4 decoration-electric/50 transition-all"
                >
                  Wilson Score
                </a>
              </h3>
              <p className="text-xs text-stone">Statistical confidence</p>
            </div>
          </div>
          <div className="space-y-3 stagger-children">
            {correctOrder.map((post, idx) => (
              <Card key={post.id} post={post} showScore={true} scoreType="wilson" index={idx} />
            ))}
          </div>
        </div>
      </div>

      {/* Educational Insight */}
      <div className={`relative overflow-hidden rounded-2xl ${isPerfect ? 'bg-electric/10' : 'bg-surface'}`}>
        {/* Border gradient */}
        <div className={`absolute inset-0 rounded-2xl ${
          isPerfect
            ? 'bg-gradient-to-r from-electric/30 via-electric/20 to-electric/30'
            : 'bg-gradient-to-r from-warning/20 via-warning/10 to-warning/20'
        }`} />

        <div className="relative m-px p-6 sm:p-8 bg-ink-muted rounded-2xl">
          <div className="flex items-start gap-4">
            <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${
              isPerfect ? 'bg-electric/20' : 'bg-warning/20'
            }`}>
              {isPerfect ? (
                <svg className="w-5 h-5 text-electric" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-warning" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              )}
            </div>
            <div className="flex-1">
              <h4 className={`font-display text-base font-semibold mb-2 ${
                isPerfect ? 'text-electric' : 'text-warning'
              }`}>
                {isPerfect ? 'Excellent work!' : 'Learning moment'}
              </h4>
              <p className="text-sm text-mist leading-relaxed">
                {personalizedInsight}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsDisplay;
