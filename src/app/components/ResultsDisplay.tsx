import { PostResult } from '@/types';

interface ResultsDisplayProps {
  score: number;
  resultsData: PostResult[];
}

const ResultsDisplay = ({ score, resultsData }: ResultsDisplayProps) => {
  // Sort data for each column
  const userOrder = [...resultsData].sort((a, b) => a.userRank - b.userRank);
  const correctOrder = [...resultsData].sort((a, b) => a.actualRank - b.actualRank);

  // Consistent Card component
  const Card = ({
    post,
    showWilsonScore,
    forceShowWilson = false
  }: {
    post: PostResult;
    showWilsonScore: boolean;
    forceShowWilson?: boolean;
  }) => (
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
      {(showWilsonScore || forceShowWilson) && (
        <div
          style={{
            fontSize: "var(--text-xs)",
            color: "var(--color-primary-light)",
            fontWeight: "600",
            fontFamily: "monospace",
            textAlign: "right"
          }}
        >
          Wilson: {post.wilsonScore.toFixed(4)}
        </div>
      )}
    </div>
  );

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
          Your Score: {score} / 5
        </h2>
      </div>

      {/* Mathematical Explanation */}
      <div style={{
        marginBottom: "var(--space-8)",
        textAlign: "center"
      }}>
        <p
          style={{
            fontSize: "var(--text-base)",
            color: "var(--color-secondary)",
            lineHeight: "1.6",
            margin: 0,
            marginBottom: "var(--space-6)",
            maxWidth: "800px",
            marginLeft: "auto",
            marginRight: "auto"
          }}
        >
          Wilson scoring considers statistical certainty. Posts with similar approval rates but different vote totals rank differently due to confidence intervals.
        </p>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "var(--space-6)",
          maxWidth: "900px",
          margin: "0 auto",
          alignItems: "start"
        }}>
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
                <Card key={post.id} post={post} showWilsonScore={false} />
              ))}
            </div>
          </div>

          <div>
            <h3
              style={{
                fontSize: "var(--text-lg)",
                fontWeight: "600",
                marginBottom: "var(--space-4)",
                color: "var(--foreground)"
              }}
            >
              <a
                href="https://www.evanmiller.org/how-not-to-sort-by-average-rating.html"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "var(--color-primary-light)",
                  textDecoration: "underline",
                  fontSize: "inherit"
                }}
              >
                Correct Order (Wilson Score)
              </a>
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
              {correctOrder.map(post => (
                <Card key={post.id} post={post} showWilsonScore={true} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Educational Content */}
      {score < 5 && (
        <div style={{
          textAlign: "center",
          backgroundColor: "var(--color-warning-light)",
          padding: "var(--space-6)",
          borderRadius: "var(--radius-lg)",
          border: `1px solid var(--color-warning)`,
          maxWidth: "600px",
          margin: "0 auto"
        }}>
          <h4
            style={{
              fontSize: "var(--text-lg)",
              fontWeight: "600",
              marginBottom: "var(--space-3)",
              color: "var(--color-warning-dark)"
            }}
          >
            Why the Difference?
          </h4>
          <p
            style={{
              fontSize: "var(--text-base)",
              color: "var(--color-warning-dark)",
              lineHeight: "1.6",
              margin: 0,
              marginBottom: "var(--space-2)"
            }}
          >
            Wilson scoring prevents highly-rated posts from dominating purely due to having more votes.
          </p>
          <p
            style={{
              fontSize: "var(--text-sm)",
              color: "var(--color-warning-dark)",
              lineHeight: "1.6",
              margin: 0
            }}
          >
            <strong>Example:</strong> A post with 9 upvotes and 1 downvote (90% approval) often ranks below 99 upvotes and 1 downvote (99% approval) because of statistical certainty differences.
          </p>
        </div>
      )}
    </div>
  );
};

export default ResultsDisplay;
