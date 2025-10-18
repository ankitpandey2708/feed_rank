import React from 'react';

interface PostResult {
  id: number;
  upvotes: number;
  downvotes: number;
  wilsonScore: number;
  actualRank: number;
  userRank: number;
}

interface ResultsDisplayProps {
  score: number;
  resultsData: PostResult[];
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ score, resultsData }) => {
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
        border: "1px solid #e5e7eb",
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
          color: "#6b7280",
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
            color: "#3b82f6",
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
        border: "1px solid #e5e7eb",
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
        <p
          style={{
            fontSize: "var(--text-base)",
            color: "#6b7280",
            margin: 0,
            lineHeight: "1.6"
          }}
        >
          How well did your ranking match the mathematical truth?
        </p>
      </div>

      {/* Mathematical Explanation */}
      <div style={{
        marginBottom: "var(--space-8)",
        textAlign: "center"
      }}>
        <p
          style={{
            fontSize: "var(--text-base)",
            color: "#6b7280",
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
                  color: "#3b82f6",
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
          backgroundColor: "#fef3c7",
          padding: "var(--space-6)",
          borderRadius: "var(--radius-lg)",
          border: "1px solid #fbbf24",
          maxWidth: "600px",
          margin: "0 auto"
        }}>
          <h4
            style={{
              fontSize: "var(--text-lg)",
              fontWeight: "600",
              marginBottom: "var(--space-3)",
              color: "#92400e"
            }}
          >
            Why the Difference?
          </h4>
          <p
            style={{
              fontSize: "var(--text-base)",
              color: "#78350f",
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
              color: "#92400e",
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
