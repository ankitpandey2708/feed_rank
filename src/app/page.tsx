"use client";
import { useState, useEffect } from "react";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import DraggablePostDisplay from "./components/DraggablePostDisplay";
import ResultsDisplay from "./components/ResultsDisplay";
import HintDisplay from "./components/HintDisplay";
import SessionDisplay from "./components/SessionDisplay";
import Tutorial from "./components/Tutorial";
import { useFeedRankGame } from "@/hooks/useFeedRankGame";

export default function Home() {
  const [showTutorial, setShowTutorial] = useState(false);
  const [tutorialCompleted, setTutorialCompleted] = useState(false);

  const {
    posts,
    isSubmitted,
    score,
    scoreResult,
    isValidRanks,
    currentKeyInsight,
    session,
    hintsEnabled,
    currentHint,
    validationIssues,
    handleSubmit,
    handleRestart,
    handleDragEnd,
    handleRequestHint,
    toggleHints,
  } = useFeedRankGame();

  // Check if user has completed tutorial before
  useEffect(() => {
    const completed = localStorage.getItem('feedRankTutorialCompleted');
    if (!completed) {
      setShowTutorial(true);
    } else {
      setTutorialCompleted(true);
    }
  }, []);

  const handleTutorialComplete = () => {
    setShowTutorial(false);
    setTutorialCompleted(true);
    localStorage.setItem('feedRankTutorialCompleted', 'true');
  };

  const handleTutorialSkip = () => {
    setShowTutorial(false);
    setTutorialCompleted(true);
    localStorage.setItem('feedRankTutorialCompleted', 'true');
  };

  const handleShowTutorialAgain = () => {
    setShowTutorial(true);
  };

  return (
    <div className="flex flex-col items-center pt-8 px-4 pb-12">
      {/* Tutorial Modal */}
      {showTutorial && (
        <Tutorial onComplete={handleTutorialComplete} onSkip={handleTutorialSkip} />
      )}

      {/* Header with Tutorial Link */}
      <div className="w-full max-w-4xl mb-4 flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-center flex-1">
          Rank your Feed
        </h1>
        {tutorialCompleted && (
          <button
            onClick={handleShowTutorialAgain}
            style={{
              padding: "var(--space-2) var(--space-3)",
              fontSize: "var(--text-sm)",
              color: "var(--color-primary)",
              backgroundColor: "transparent",
              border: "1px solid var(--color-primary)",
              borderRadius: "var(--radius-md)",
              cursor: "pointer"
            }}
          >
            ? Tutorial
          </button>
        )}
      </div>

      {/* Session Display */}
      <div className="w-full max-w-4xl">
        <SessionDisplay session={session} />
      </div>

      {!isSubmitted ? (
        <div className="w-full max-w-2xl">
          <div className="mb-6 p-6 bg-white border border-gray-300 rounded-lg shadow-sm">
            <div className="mb-4 flex justify-center">
              <p className="text-base text-gray-900 leading-relaxed text-center">
                Your users rate stuff on your site. You want to put the highest-rated stuff at the top and lowest-rated at the bottom. Drag the posts below to show how you think your feed should look.
              </p>
            </div>

            <div className="mb-4">
              <DragDropContext onDragEnd={handleDragEnd}>
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

            {/* Hint Display */}
            <HintDisplay
              hint={currentHint}
              validationIssues={validationIssues}
              onRequestHint={handleRequestHint}
              hintsEnabled={hintsEnabled}
            />
          </div>

          {/* Submit Button and Hint Toggle */}
          <div className="text-center space-y-3">
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

            <div>
              <button
                onClick={toggleHints}
                style={{
                  padding: "var(--space-2) var(--space-4)",
                  fontSize: "var(--text-xs)",
                  color: "var(--color-secondary)",
                  backgroundColor: "transparent",
                  border: "none",
                  cursor: "pointer",
                  textDecoration: "underline"
                }}
              >
                {hintsEnabled ? "Disable Hints" : "Enable Hints"}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-6xl">
          <ResultsDisplay
            score={score ?? 0}
            scoreResult={scoreResult}
            resultsData={posts.map((post, idx) => ({
              id: post.id,
              upvotes: post.upvotes,
              downvotes: post.downvotes,
              wilsonScore: post.wilsonScore,
              actualRank: post.actualRank,
              userRank: idx + 1,
            }))}
            keyInsight={currentKeyInsight}
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
