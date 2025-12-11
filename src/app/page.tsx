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
    <div className="flex flex-col items-center">
      {/* Tutorial Modal */}
      {showTutorial && (
        <Tutorial onComplete={handleTutorialComplete} onSkip={handleTutorialSkip} />
      )}

      {/* Header with Tutorial Link */}
      <div className="w-full max-w-4xl mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-neutral-950 tracking-tight flex-1 text-center">
          Rank your Feed
        </h1>
        {tutorialCompleted && (
          <button
            onClick={handleShowTutorialAgain}
            className="px-4 py-2 text-sm font-medium text-primary-600 bg-transparent border border-primary-500/60 rounded-lg hover:bg-primary-50 hover:border-primary-500 transition-all duration-200 cursor-pointer"
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
          <div className="mb-6 p-8 bg-white border border-neutral-200/60 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
            <div className="mb-6 flex justify-center">
              <p className="text-base text-neutral-700 leading-relaxed text-center max-w-prose">
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
          <div className="text-center space-y-4">
            <button
              className={`group relative px-8 py-3.5 rounded-lg font-semibold text-base transition-all duration-200 outline-none ${
                isValidRanks
                  ? "bg-gradient-to-b from-success-500 to-success-600 text-white shadow-md hover:shadow-lg hover:from-success-600 hover:to-success-700 cursor-pointer focus:ring-4 focus:ring-success-500/20"
                  : "bg-neutral-300 text-neutral-500 cursor-not-allowed opacity-60"
              }`}
              onClick={handleSubmit}
              disabled={!isValidRanks}
              aria-disabled={!isValidRanks}
            >
              <span className="relative z-10">Submit Ranking</span>
              {isValidRanks && (
                <div className="absolute inset-0 rounded-lg bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
              )}
            </button>

            <div>
              <button
                onClick={toggleHints}
                className="px-4 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 bg-transparent border-none cursor-pointer underline hover:no-underline transition-all duration-150"
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

          <div className="text-center mt-8">
            <button
              className="group relative px-8 py-3.5 bg-gradient-to-b from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold text-base rounded-lg shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer focus:ring-4 focus:ring-primary-500/20 outline-none"
              onClick={handleRestart}
            >
              <span className="relative z-10">Play Again</span>
              <div className="absolute inset-0 rounded-lg bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
