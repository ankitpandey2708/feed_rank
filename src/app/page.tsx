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
    <div className="flex flex-col items-center animate-fade-in">
      {/* Tutorial Modal */}
      {showTutorial && (
        <Tutorial onComplete={handleTutorialComplete} onSkip={handleTutorialSkip} />
      )}

      {/* Hero Header */}
      <header className="w-full max-w-4xl mb-10 sm:mb-14">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          {/* Title Block */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-2 h-8 bg-electric rounded-full" />
              <span className="text-xs font-mono uppercase tracking-wider text-stone">
                Algorithm Challenge
              </span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-ivory tracking-editorial">
              Feed<span className="text-electric">Rank</span>
            </h1>
            <p className="mt-3 text-base sm:text-lg text-stone max-w-md">
              Prove you understand ranking better than simple percentages.
            </p>
          </div>

          {/* Tutorial Button */}
          {tutorialCompleted && (
            <button
              onClick={handleShowTutorialAgain}
              className="group flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-ivory bg-transparent border border-white/10 rounded-lg hover:border-electric/50 hover:text-electric transition-all duration-250 cursor-pointer"
            >
              <span className="w-5 h-5 flex items-center justify-center rounded-full border border-current text-xs group-hover:border-electric group-hover:bg-electric/10 transition-all">
                ?
              </span>
              Tutorial
            </button>
          )}
        </div>
      </header>

      {/* Session Stats */}
      <div className="w-full max-w-4xl">
        <SessionDisplay session={session} />
      </div>

      {!isSubmitted ? (
        <div className="w-full max-w-2xl">
          {/* Game Card */}
          <div className="relative group">
            {/* Glow effect on hover */}
            <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-electric/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 blur-xl pointer-events-none" />

            <div className="relative bg-surface border border-white/[0.08] rounded-2xl shadow-xl">
              {/* Card Header */}
              <div className="px-6 sm:px-8 pt-8 pb-6 border-b border-white/[0.06]">
                <h2 className="font-display text-xl sm:text-2xl font-semibold text-ivory mb-2">
                  Rank These Posts
                </h2>
                <p className="text-sm sm:text-base text-stone leading-relaxed">
                  Drag to reorder from highest-rated (top) to lowest-rated (bottom).
                  Consider both approval rate and sample size.
                </p>
              </div>

              {/* Draggable Posts */}
              <div className="p-4 sm:p-6">
                <DragDropContext onDragEnd={handleDragEnd}>
                  <Droppable droppableId="posts-droppable">
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="space-y-3"
                      >
                        {posts.map((post, idx) => (
                          <DraggablePostDisplay key={post.id} post={post} index={idx} />
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>

                {/* Hint Display */}
                <HintDisplay
                  hint={currentHint}
                  validationIssues={validationIssues}
                  onRequestHint={handleRequestHint}
                  hintsEnabled={hintsEnabled}
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col items-center gap-4">
            <button
              className={`
                group relative px-10 py-4 rounded-xl font-semibold text-base
                transition-all duration-250 outline-none overflow-hidden
                ${isValidRanks
                  ? "bg-electric text-ink shadow-electric hover:shadow-electric-lg hover:-translate-y-0.5 cursor-pointer"
                  : "bg-charcoal text-slate cursor-not-allowed"
                }
              `}
              onClick={handleSubmit}
              disabled={!isValidRanks}
              aria-disabled={!isValidRanks}
            >
              <span className="relative z-10 flex items-center gap-2">
                Submit Ranking
                <svg
                  className={`w-4 h-4 transition-transform duration-250 ${isValidRanks ? 'group-hover:translate-x-1' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              {isValidRanks && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              )}
            </button>

            <button
              onClick={toggleHints}
              className="text-sm font-medium text-stone hover:text-electric bg-transparent border-none cursor-pointer transition-colors duration-150"
            >
              {hintsEnabled ? "Hide Hints" : "Show Hints"}
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-6xl animate-fade-in-up">
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

          <div className="text-center mt-10">
            <button
              className="group relative px-10 py-4 bg-electric text-ink font-semibold text-base rounded-xl shadow-electric hover:shadow-electric-lg hover:-translate-y-0.5 transition-all duration-250 cursor-pointer outline-none overflow-hidden"
              onClick={handleRestart}
            >
              <span className="relative z-10 flex items-center gap-2">
                <svg
                  className="w-4 h-4 group-hover:-rotate-180 transition-transform duration-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Play Again
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
