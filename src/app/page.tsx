"use client";
import React from "react";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import DraggablePostDisplay from "./components/DraggablePostDisplay";
import ResultsDisplay from "./components/ResultsDisplay";
import { useFeedRankGame } from "@/hooks/useFeedRankGame";

export default function Home() {
  const {
    posts,
    isSubmitted,
    score,
    isValidRanks,
    handleSubmit,
    handleRestart,
    handleDragEnd
  } = useFeedRankGame();

  return (
    <div className="flex flex-col items-center pt-8 px-4">
      <h1 className="text-2xl font-semibold mb-6 text-center">
        Rank your Feed
      </h1>

      {!isSubmitted ? (
        <div className="w-full max-w-2xl">
          <div className="mb-6 p-6 bg-white border border-gray-300 rounded-lg shadow-sm">
            <p className="mb-4 text-base text-gray-900 leading-relaxed">
              Your users rate stuff on your site. You want to put the highest-rated stuff at the top and lowest-rated at the bottom. Drag the posts below to show how you think your feed should look.
            </p>

            <div className="mb-4">
              <DragDropContext onDragEnd={handleDragEnd}
              >
                <Droppable droppableId="posts-droppable">
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-2">
                      {posts.map((post, idx) => (
                        <DraggablePostDisplay key={post.id} post={post} index={idx} />
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </div>
          </div>

          <div className="text-center">
            <button
              className={`px-6 py-3 rounded-lg border-2 font-medium transition-all outline-none ${
                isValidRanks
                  ? "bg-[var(--color-success)] text-white border-transparent hover:border-white cursor-pointer hover:bg-[var(--color-success-dark, #047857)] focus:ring-2 focus:ring-[var(--color-success-light)] focus:ring-offset-2"
                  : "bg-[var(--color-gray-300)] text-[var(--color-gray-500)] border-transparent cursor-not-allowed opacity-60"
              }`}
              onClick={handleSubmit}
              disabled={!isValidRanks}
              aria-disabled={!isValidRanks}
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

          <div className="text-center mt-6">
            <button
              className="bg-[var(--color-primary)] text-white rounded-lg border-2 border-transparent font-medium cursor-pointer transition-all outline-none hover:bg-[var(--color-primary-dark)] hover:border-white focus:ring-2 focus:ring-[var(--color-primary-light)] focus:ring-offset-2"
              onClick={handleRestart}
              style={{
                padding: "var(--button-padding-y) var(--button-padding-x)",
                height: "var(--button-height)",
                borderRadius: "var(--button-border-radius)",
                fontWeight: "var(--button-font-weight)",
                transition: "var(--transition-normal)"
              }}
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
