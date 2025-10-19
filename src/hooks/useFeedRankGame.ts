import { useState, useEffect } from 'react';
import { Post } from '@/types';
import { calculateWilsonScore } from '../../utils/scoring';

export function useFeedRankGame() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);

  const generateRandomPosts = (): Post[] => {
    const posts = Array.from({ length: 5 }, (_, idx) => {
      const upvotes = Math.floor(Math.random() * 100);
      const downvotes = Math.floor(Math.random() * 100);
      return {
        id: idx + 1,
        upvotes,
        downvotes,
        wilsonScore: 0,
        actualRank: 0,
      };
    });

    // Calculate Wilson scores
    posts.forEach((post) => {
      post.wilsonScore = calculateWilsonScore(post.upvotes, post.downvotes);
    });

    // Rank posts by Wilson score (descending)
    const sorted = [...posts].sort((a, b) => b.wilsonScore - a.wilsonScore);
    sorted.forEach((post, idx) => {
      post.actualRank = idx + 1;
    });

    // Assign actualRank back to original posts
    posts.forEach((post) => {
      post.actualRank = sorted.find((p) => p.id === post.id)?.actualRank || 0;
    });

    return posts;
  };

  // Initialize posts on mount
  useEffect(() => {
    setPosts(generateRandomPosts());
  }, []);

  const isValidRanks = () => posts.length === 5;

  const handleSubmit = () => {
    let s = 0;
    posts.forEach((post, idx) => {
      if (idx + 1 === post.actualRank) s++;
    });
    setScore(s);
    setIsSubmitted(true);
  };

  const handleRestart = () => {
    setPosts(generateRandomPosts());
    setIsSubmitted(false);
    setScore(null);
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const reordered = Array.from(posts);
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);
    setPosts(reordered);
  };

  return {
    posts,
    isSubmitted,
    score,
    isValidRanks: isValidRanks(),
    handleSubmit,
    handleRestart,
    handleDragEnd,
  };
}
