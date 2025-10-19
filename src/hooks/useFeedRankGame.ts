import { useState, useEffect } from 'react';
import { Post } from '@/types';
import { getRandomExampleSet, generatePostsFromExample } from '../../utils/curatedExamples';

export function useFeedRankGame() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [currentKeyInsight, setCurrentKeyInsight] = useState<string>("");

  const generateCuratedPosts = (): Post[] => {
    const exampleSet = getRandomExampleSet();
    setCurrentKeyInsight(exampleSet.keyInsight);
    return generatePostsFromExample(exampleSet);
  };

  // Initialize posts on mount
  useEffect(() => {
    setPosts(generateCuratedPosts());
  }, []);

  const isValidRanks = () => posts.length === 3;

  const handleSubmit = () => {
    let s = 0;
    posts.forEach((post, idx) => {
      if (idx + 1 === post.actualRank) s++;
    });
    setScore(s);
    setIsSubmitted(true);
  };

  const handleRestart = () => {
    setPosts(generateCuratedPosts());
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
    currentKeyInsight,
    handleSubmit,
    handleRestart,
    handleDragEnd,
  };
}
