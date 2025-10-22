import { PostResult, UserMistakes, ScoreResult } from '@/types';

interface ResultsDisplayProps {
  score: number;
  scoreResult?: ScoreResult | null;
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

const ResultsDisplay = ({ score, scoreResult, resultsData, keyInsight }: ResultsDisplayProps) => {
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

  // Consistent Card component
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
      <div
        style={{
          padding: "var(--space-4)",
          backgroundColor: "var(--background)",
          border: "1px solid var(--color-gray-200)",
          borderRadius: "var(--radius-md)",
          boxShadow: "var(--shadow-sm)",
          transition: "all 0.2s ease",
          minHeight: "100px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          color: "var(--foreground)",
        }}
      >
        <div
          style={{
            fontSize: "var(--text-lg)",
            fontWeight: "600",
            lineHeight: "1.4",
            marginBottom: "var(--space-2)"
          }}
        >
          Post #{post.id}
        </div>
        <div
          style={{
            fontSize: "var(--text-sm)",
            color: "var(--color-secondary)",
            lineHeight: "1.5",
            marginBottom: "var(--space-1)"
          }}
        >
          ↑ {post.upvotes} ↓ {post.downvotes}
        </div>
        {showScore && scoreType === 'wilson' && (
          <div
            style={{
              fontSize: "var(--text-xs)",
              color: "var(--color-primary-light)",
              fontWeight: "600",
              fontFamily: "monospace",
            }}
          >
            Wilson: {post.wilsonScore.toFixed(4)}
          </div>
        )}
        {showScore && scoreType === 'percentage' && (
          <div
            style={{
              fontSize: "var(--text-xs)",
              color: "var(--color-warning)",
              fontWeight: "600",
              fontFamily: "monospace",
            }}
          >
            {percentage}% ({total} votes)
          </div>
        )}
      </div>
    );
  };

  const personalizedInsight = generatePersonalizedInsight(resultsData, keyInsight);

  return (
    <div style={{ marginTop: "var(--space-6)" }}>
      {/* Score Display */}
      <div style={{
        textAlign: "center",
        marginBottom: "var(--space-8)",
        padding: "var(--space-6)",
        backgroundColor: "var(--background)",
        border: "1px solid var(--color-gray-200)",
        borderRadius: "var(--radius-lg)",
        boxShadow: "var(--shadow-sm)"
      }}>
        <h2
          style={{
            fontSize: "var(--text-2xl)",
            fontWeight: "600",
            margin: 0,
            marginBottom: "var(--space-2)",
            color: "var(--foreground)"
          }}
        >
          Your Score: {score} / 3
        </h2>
        {scoreResult && (
          <p style={{
            fontSize: "var(--text-sm)",
            color: "var(--color-secondary)",
            margin: 0
          }}>
            Points: {scoreResult.totalScore} / {scoreResult.maxScore} (partial credit for close answers)
          </p>
        )}
      </div>

      {/* 3-Column Comparison */}
      <div style={{
        marginBottom: "var(--space-8)",
        textAlign: "center"
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "var(--space-4)",
          maxWidth: "1200px",
          margin: "0 auto",
          alignItems: "start"
        }}>
          {/* User's Ranking */}
          <div>
            <h3
              style={{
                fontSize: "var(--text-lg)",
                fontWeight: "600",
                marginBottom: "var(--space-4)",
                color: "var(--foreground)"
              }}
            >
              Your Ranking
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
              {userOrder.map(post => (
                <Card key={post.id} post={post} showScore={false} scoreType="none" />
              ))}
            </div>
          </div>

          {/* Percentage-Based (Wrong Way) */}
          <div>
            <h3
              style={{
                fontSize: "var(--text-lg)",
                fontWeight: "600",
                marginBottom: "var(--space-4)",
                color: "var(--color-warning)"
              }}
            >
              Percentage-Based ❌
            </h3>
            <p style={{
              fontSize: "var(--text-xs)",
              color: "var(--color-secondary)",
              marginBottom: "var(--space-2)",
              marginTop: "calc(var(--space-2) * -1)"
            }}>
              (The naive approach)
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
              {percentageRanked.map(post => (
                <Card key={post.id} post={post} showScore={true} scoreType="percentage" />
              ))}
            </div>
          </div>

          {/* Wilson Score (Correct Way) */}
          <div>
            <h3
              style={{
                fontSize: "var(--text-lg)",
                fontWeight: "600",
                marginBottom: "var(--space-4)",
                color: "var(--color-success)"
              }}
            >
              <a
                href="https://www.evanmiller.org/how-not-to-sort-by-average-rating.html"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "inherit",
                  textDecoration: "underline",
                  fontSize: "inherit"
                }}
              >
                Wilson Score ✓
              </a>
            </h3>
            <p style={{
              fontSize: "var(--text-xs)",
              color: "var(--color-secondary)",
              marginBottom: "var(--space-2)",
              marginTop: "calc(var(--space-2) * -1)"
            }}>
              (Statistical confidence)
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
              {correctOrder.map(post => (
                <Card key={post.id} post={post} showScore={true} scoreType="wilson" />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Educational Content - Personalized Insights */}
      <div style={{
        textAlign: "center",
        backgroundColor: score === 3 ? "var(--color-success-light)" : "var(--color-warning-light)",
        padding: "var(--space-6)",
        borderRadius: "var(--radius-lg)",
        border: `1px solid ${score === 3 ? "var(--color-success)" : "var(--color-warning)"}`,
        maxWidth: "700px",
        margin: "0 auto"
      }}>
        <p
          style={{
            fontSize: "var(--text-sm)",
            color: score === 3 ? "var(--color-success-dark)" : "var(--color-warning-dark)",
            lineHeight: "1.6",
            margin: 0,
            fontStyle: "italic"
          }}
        >
          {score === 3 ? "🎉 Perfect! " : "💡 "}{personalizedInsight}
        </p>
      </div>
    </div>
  );
};

export default ResultsDisplay;
