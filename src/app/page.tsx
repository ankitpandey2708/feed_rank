"use client";
import React, { useState } from "react";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import DraggablePostDisplay from "./components/DraggablePostDisplay"; // new drag component
import ResultsDisplay from "./components/ResultsDisplay";
import ThemeToggle from "./components/ThemeToggle";
import { useTheme } from "./ThemeContext";
import { calculateWilsonScore } from "../../utils/scoring";

interface Post {
  id: number;
  upvotes: number;
  downvotes: number;
  wilsonScore: number;
  actualRank: number;
}

function generateRandomPosts(): Post[] {
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
}

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [posts, setPosts] = useState<Post[]>([]);
  React.useEffect(() => {
    setPosts(generateRandomPosts());
  }, []);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);



  // Drag-and-drop always produces a valid order of 5 unique ranks
  const isValidRanks = () => posts.length === 5;

  const handleSubmit = () => {
    // User's ranking is the order of posts in the array
    let s = 0;
    posts.forEach((post, idx) => {
      if (idx + 1 === post.actualRank) s++;
    });
    setScore(s);
    setIsSubmitted(true);
    setError(null);
  };

  const handleRestart = () => {
    setPosts(generateRandomPosts());
    setIsSubmitted(false);
    setScore(null);
    setError(null);
  };


  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative" }}>
      <ThemeToggle theme={theme} setTheme={setTheme} />
      <h1 className="text-2xl font-bold mb-4">Rank your Feed</h1>
      {!isSubmitted ? (
        <>
          <div className="mb-6 w-full max-w-md">
            <p className="mb-2">Your users rate stuff on your site. You want to put the highest-rated stuff at the top and lowest-rated at the bottom. Drag the posts below on how you think your feed should look.</p>
            <DragDropContext
              onDragEnd={(result) => {
                if (!result.destination) return;
                const reordered = Array.from(posts);
                const [removed] = reordered.splice(result.source.index, 1);
                reordered.splice(result.destination.index, 0, removed);
                setPosts(reordered);
              }}
            >
              <Droppable droppableId="posts-droppable">
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {posts.map((post, idx) => (
                      <DraggablePostDisplay key={post.id} post={post} index={idx} />
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
            {error && (
              <div className="text-red-600 mt-2" role="alert">{error}</div>
            )}
          </div>
          <button
            className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
            onClick={handleSubmit}
            disabled={!isValidRanks()}
            aria-disabled={!isValidRanks()}
          >
            Submit
          </button>
        </>
      ) : (
        <>
          <ResultsDisplay
            score={score ?? 0}
            resultsData={posts.map((post, idx) => ({
              id: post.id,
              upvotes: post.upvotes,
              downvotes: post.downvotes,
              wilsonScore: post.wilsonScore,
              actualRank: post.actualRank,
              userRank: idx + 1,
            }))}
          />
          <button
            className="mt-6 bg-green-600 text-white px-4 py-2 rounded"
            onClick={handleRestart}
          >
            Play Again
          </button>
        </>
      )}
    </div>
  );
}
