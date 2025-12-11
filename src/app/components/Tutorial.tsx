import { useState } from 'react';

interface TutorialStep {
  title: string;
  content: string;
  example?: {
    post1: string;
    post2: string;
    explanation: string;
  };
}

const tutorialSteps: TutorialStep[] = [
  {
    title: "Welcome to Feed Rank!",
    content: "Learn how ranking algorithms work by comparing simple percentages vs. statistical confidence. This game will teach you why the Wilson Score algorithm is better than naive percentage-based sorting."
  },
  {
    title: "How Most Sites Rank Content",
    content: "Most sites use simple percentages: upvotes ÷ total votes. A post with 19/20 votes (95%) would rank higher than 178/200 (89%).",
    example: {
      post1: "Post A: 19 ↑ 1 ↓ = 95%",
      post2: "Post B: 178 ↑ 22 ↓ = 89%",
      explanation: "Using percentages alone, Post A ranks higher. But is that reliable?"
    }
  },
  {
    title: "The Problem",
    content: "But which rating is more trustworthy? The 95% with only 20 votes, or the 89% with 200 votes? Small samples can be misleading!",
    example: {
      post1: "95% with 20 votes",
      post2: "89% with 200 votes",
      explanation: "The second post has 10x more data points. Its rating is more reliable."
    }
  },
  {
    title: "Wilson Score Solution",
    content: "Wilson Score considers statistical confidence. It asks: 'How confident can we be that this rating is real?' More votes = more confidence.",
    example: {
      post1: "Small sample = High uncertainty",
      post2: "Large sample = Low uncertainty",
      explanation: "Wilson Score penalizes uncertainty, ranking more reliable posts higher."
    }
  },
  {
    title: "Your Challenge",
    content: "In each round, you'll see 3 posts with different vote counts. Drag them to rank from best (top) to worst (bottom). See if you can beat the Wilson Score algorithm!"
  }
];

interface TutorialProps {
  onComplete: () => void;
  onSkip: () => void;
}

const Tutorial = ({ onComplete, onSkip }: TutorialProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const step = tutorialSteps[currentStep];
  const isLastStep = currentStep === tutorialSteps.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      onComplete();
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-10 max-w-2xl w-full shadow-xl">
        {/* Premium Progress indicator */}
        <div className="flex gap-2 mb-8 justify-center">
          {tutorialSteps.map((_, idx) => (
            <div
              key={idx}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentStep
                  ? 'w-8 bg-primary-500'
                  : 'w-2 bg-neutral-300'
              }`}
            />
          ))}
        </div>

        {/* Premium Content */}
        <h2 className="text-3xl font-bold text-neutral-950 mb-4 text-center tracking-tight">
          {step.title}
        </h2>

        <p className={`text-base leading-relaxed text-neutral-700 ${step.example ? 'mb-6' : 'mb-8'}`}>
          {step.content}
        </p>

        {/* Premium Example */}
        {step.example && (
          <div className="bg-neutral-100 rounded-xl p-5 mb-6">
            <div className="flex flex-col gap-3 mb-4">
              <div className="p-3 bg-white rounded-lg text-sm font-mono shadow-sm">
                {step.example.post1}
              </div>
              <div className="p-3 bg-white rounded-lg text-sm font-mono shadow-sm">
                {step.example.post2}
              </div>
            </div>
            <p className="text-sm text-neutral-600 italic m-0">
              {step.example.explanation}
            </p>
          </div>
        )}

        {/* Premium Navigation buttons */}
        <div className="flex justify-between gap-4">
          <div className="flex gap-3">
            {currentStep > 0 && (
              <button
                onClick={handlePrev}
                className="px-5 py-3 bg-white text-neutral-900 border border-neutral-300 rounded-lg hover:bg-neutral-50 hover:border-neutral-400 cursor-pointer text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow-md"
              >
                ← Previous
              </button>
            )}
            {!isLastStep && (
              <button
                onClick={onSkip}
                className="px-5 py-3 bg-transparent text-neutral-600 hover:text-neutral-900 border-none cursor-pointer text-sm font-medium transition-colors"
              >
                Skip Tutorial
              </button>
            )}
          </div>
          <button
            onClick={handleNext}
            className="group relative px-8 py-3 bg-gradient-to-b from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white rounded-lg cursor-pointer text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-200"
          >
            <span className="relative z-10">{isLastStep ? "Start Playing!" : "Next →"}</span>
            <div className="absolute inset-0 rounded-lg bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tutorial;
