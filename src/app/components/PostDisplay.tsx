import React from 'react';

interface PostDisplayProps {
  id: number;
  upvotes: number;
  downvotes: number;
}

const PostDisplay: React.FC<PostDisplayProps> = ({ id, upvotes, downvotes }) => {
  return (
    <div className={"border rounded bg-white shadow-sm transition-shadow text-black flex flex-col items-center justify-center text-center p-1 sm:p-2 md:p-2"} style={{ color: '#111', backgroundColor: '#fff', minHeight: 36 }}>
      <div className="font-bold text-black leading-tight text-base sm:text-lg">Post #{id}</div>
      <div className="text-black text-xs sm:text-sm leading-tight mt-1">Upvotes: {upvotes} | Downvotes: {downvotes}</div>
    </div>
  );
};

export default PostDisplay;
