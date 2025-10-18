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

  // Enhanced Card with always visible Wilson score for explanation section
  const Card = ({
    post,
    showWilsonScore,
    forceShowWilson = false
  }: {
    post: PostResult;
    showWilsonScore: boolean;
    forceShowWilson?: boolean;
  }) => (
    <div className={"border rounded bg-white shadow-sm transition-shadow text-black flex flex-col items-center justify-center text-center p-1 sm:p-2 md:p-2 relative"} style={{ color: '#111', backgroundColor: '#fff', height: 80 }}>
      <div className="font-bold text-black leading-tight text-base sm:text-lg">Post #{post.id}</div>
      <div className="text-black text-xs sm:text-sm leading-tight mt-1">Upvotes: {post.upvotes} | Downvotes: {post.downvotes}</div>
      <div className="text-blue-600 text-xs mt-1 font-semibold min-h-4">
        {(showWilsonScore || forceShowWilson) ? `Wilson: ${post.wilsonScore.toFixed(4)}` : ''}
      </div>
    </div>
  );

  return (
    <div className="mt-4">
      {/* Step 1: User's Order */}
      

      {/* Step 2: Mathematical Reality Check */}
      <div className="mb-6">
        <div className="text-center mb-4 text-sm text-gray-600 max-w-2xl mx-auto">
          Wilson scoring accounts for statistical uncertainty. Posts with similar upvote ratios but different total votes can rank differently because of confidence intervals.
        </div>
        <div className="flex flex-col md:flex-row gap-2 md:gap-4 justify-center">
          <div className="flex-1 max-w-xs md:max-w-sm mx-auto md:mx-0">
            <h4 className="font-semibold mb-2 text-center text-sm">Your Order</h4>
            {userOrder.map(post => (
              <Card key={post.id} post={post} showWilsonScore={false} />
            ))}
          </div>
          <div className="flex-1 max-w-xs md:max-w-sm mx-auto md:mx-0">
            <h4 className="font-semibold mb-2 text-center text-sm">
              <a href='https://www.evanmiller.org/how-not-to-sort-by-average-rating.html' className="text-blue-600 underline">
                Mathematically Correct Order
              </a>
            </h4>
            {correctOrder.map(post => (
              <Card key={post.id} post={post} showWilsonScore={true} />
            ))}
          </div>
        </div>
      </div>

      {/* Score and Explanation */}
      <div className="flex flex-col items-center mt-6">
        <h2 className="text-xl font-bold mb-4">Your score: {score} / 5</h2>
        {score < 5 && (
          <div className="text-center text-sm text-gray-600 max-w-lg">
            <p className="mb-2">
              Why the difference? Wilson scoring prevents highly-rated posts from dominating just because they have more votes.
            </p>
            <p>
              Example: A post with 9 upvotes, 1 downvote ranks below 99 upvotes, 1 downvote because of statistical uncertainty.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultsDisplay;
