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
    <div className="flex flex-col items-center" style={{ gap: "var(--space-6)", paddingTop: "var(--space-8)" }}>
      <div style={{ position: "absolute", top: "var(--space-4)", right: "var(--space-4)" }}>
        <ThemeToggle theme={theme} setTheme={setTheme} />
      </div>

      <h1
        style={{
          fontSize: "var(--text-2xl)",
          fontWeight: "600",
          margin: 0,
          marginBottom: "var(--space-6)",
          textAlign: "center"
        }}
      >
        Rank your Feed
      </h1>

      {!isSubmitted ? (
        <div className="w-full max-w-2xl">
          <div style={{
            marginBottom: "var(--space-6)",
            padding: "var(--space-6)",
            borderRadius: "var(--radius-md)",
            background: "var(--background)",
            border: "1px solid #e5e7eb",
            boxShadow: "var(--shadow-sm)"
          }}>
            <p style={{
              margin: 0,
              marginBottom: "var(--space-4)",
              fontSize: "var(--text-base)",
              lineHeight: "1.6",
              color: "var(--foreground)"
            }}>
              Your users rate stuff on your site. You want to put the highest-rated stuff at the top and lowest-rated at the bottom. Drag the posts below to show how you think your feed should look.
            </p>

            <div style={{ marginBottom: "var(--space-4)" }}>
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
                    <div ref={provided.innerRef} {...provided.droppableProps} style={{ gap: "var(--space-2)" }}>
                      {posts.map((post, idx) => (
                        <DraggablePostDisplay key={post.id} post={post} index={idx} />
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </div>

            {error && (
              <div
                style={{
                  color: "#dc2626",
                  fontSize: "var(--text-sm)",
                  marginTop: "var(--space-2)"
                }}
                role="alert"
              >
                {error}
              </div>
            )}
          </div>

          <div style={{ textAlign: "center" }}>
            <button
              style={{
                backgroundColor: "#16a34a",
                color: "white",
                padding: "var(--space-3) var(--space-6)",
                borderRadius: "var(--radius-md)",
                border: "2px solid transparent",
                fontSize: "var(--text-base)",
                fontWeight: "500",
                cursor: isValidRanks() ? "pointer" : "not-allowed",
                opacity: isValidRanks() ? 1 : 0.5,
                transition: "all 0.2s ease",
                outline: "none",
              }}
              onFocus={(e) => {
                if (isValidRanks()) {
                  e.target.style.borderColor = "#ffffff";
                }
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "transparent";
              }}
              onClick={handleSubmit}
              disabled={!isValidRanks()}
              aria-disabled={!isValidRanks()}
            >
              Submit Ranking
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-4xl">
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

          <div style={{ textAlign: "center", marginTop: "var(--space-6)" }}>
            <button
              style={{
                backgroundColor: "#16a34a",
                color: "white",
                padding: "var(--space-3) var(--space-6)",
                borderRadius: "var(--radius-md)",
                border: "2px solid transparent",
                fontSize: "var(--text-base)",
                fontWeight: "500",
                cursor: "pointer",
                transition: "all 0.2s ease",
                outline: "none",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#ffffff";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "transparent";
              }}
              onClick={handleRestart}
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
