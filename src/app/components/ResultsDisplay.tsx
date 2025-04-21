import React from 'react';
import PostDisplay from './PostDisplay';

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


  // Card wrapper using original PostDisplay styling
  const Card = ({ post, showWilsonScore }: { post: PostResult; showWilsonScore: boolean }) => (
    <div className={"border rounded bg-white shadow-sm transition-shadow text-black flex flex-col items-center justify-center text-center p-1 sm:p-2 md:p-2 relative"} style={{ color: '#111', backgroundColor: '#fff', minHeight: 36 }}>
      <div className="font-bold text-black leading-tight text-base sm:text-lg">Post #{post.id}</div>
      <div className="text-black text-xs sm:text-sm leading-tight mt-1">Upvotes: {post.upvotes} | Downvotes: {post.downvotes}</div>
      {showWilsonScore && (
        <div className="absolute top-2 right-4 flex items-center group">
          <span className="ml-2 cursor-pointer text-blue-500" tabIndex={0}>
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <circle cx="8" cy="8" r="8" fill="#e0e7ef" />
              <text x="8" y="12" textAnchor="middle" fontSize="12" fill="#2563eb" fontFamily="Arial">i</text>
            </svg>
          </span>
          <span className="opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity bg-gray-800 text-white text-xs rounded px-2 py-1 absolute z-10 left-full ml-2 whitespace-nowrap pointer-events-none">
            Wilson Score: {post.wilsonScore.toFixed(4)}
          </span>
        </div>
      )}
    </div>
  );

  return (
    <div className="mt-4">
      <div className="flex flex-col md:flex-row gap-2 md:gap-4">
        <div className="flex-1">
          <h3 className="font-bold mb-2 text-center">Your Order</h3>
          {userOrder.map(post => (
            <Card key={post.id} post={post} showWilsonScore={false} />
          ))}
        </div>
        <div className="flex-1">
          <h3 className="font-bold mb-2 text-center"><a href='https://www.evanmiller.org/how-not-to-sort-by-average-rating.html'>Correct Order</a></h3>
          {correctOrder.map(post => (
            <Card key={post.id} post={post} showWilsonScore={true} />
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-8">
        <h2 className="text-xl font-bold mb-4">Your score: {score} / 5</h2>
      </div>
    </div>
  );
};

export default ResultsDisplay;
