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
    title: "Welcome to FeedRank",
    content: "Learn how ranking algorithms work by comparing simple percentages vs. statistical confidence. This game will teach you why the Wilson Score algorithm is better than naive percentage-based sorting."
  },
  {
    title: "How Most Sites Rank",
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-ink/90 backdrop-blur-md"
        onClick={onSkip}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl animate-scale-in">
        {/* Glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-electric/30 via-electric/10 to-electric/30 rounded-3xl blur-xl" />

        <div className="relative bg-surface border border-white/[0.08] rounded-2xl shadow-2xl overflow-hidden">
          {/* Header with progress */}
          <div className="px-8 pt-8 pb-6">
            {/* Progress dots */}
            <div className="flex items-center justify-center gap-2 mb-8">
              {tutorialSteps.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentStep(idx)}
                  className={`
                    h-1.5 rounded-full transition-all duration-300 cursor-pointer
                    ${idx === currentStep
                      ? 'w-8 bg-electric'
                      : idx < currentStep
                        ? 'w-1.5 bg-electric/50'
                        : 'w-1.5 bg-white/20'
                    }
                  `}
                  aria-label={`Go to step ${idx + 1}`}
                />
              ))}
            </div>

            {/* Step counter */}
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-xs font-mono text-stone uppercase tracking-wider">
                Step {currentStep + 1} of {tutorialSteps.length}
              </span>
            </div>

            {/* Title */}
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-ivory text-center tracking-editorial">
              {step.title}
            </h2>
          </div>

          {/* Content */}
          <div className="px-8 pb-8">
            <p className="text-base sm:text-lg text-mist leading-relaxed text-center mb-8">
              {step.content}
            </p>

            {/* Example */}
            {step.example && (
              <div className="bg-ink-muted border border-white/[0.06] rounded-xl p-6 mb-8">
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-3 p-3 bg-surface rounded-lg">
                    <div className="w-2 h-2 bg-success rounded-full" />
                    <span className="font-mono text-sm text-ivory">{step.example.post1}</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-surface rounded-lg">
                    <div className="w-2 h-2 bg-warning rounded-full" />
                    <span className="font-mono text-sm text-ivory">{step.example.post2}</span>
                  </div>
                </div>
                <p className="text-sm text-stone italic text-center">
                  {step.example.explanation}
                </p>
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                {currentStep > 0 && (
                  <button
                    onClick={handlePrev}
                    className="group flex items-center gap-2 px-5 py-3 bg-surface border border-white/[0.08] rounded-xl hover:border-white/[0.15] cursor-pointer text-sm font-semibold text-ivory transition-all duration-250"
                  >
                    <svg
                      className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-250"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                    </svg>
                    Back
                  </button>
                )}
                {!isLastStep && (
                  <button
                    onClick={onSkip}
                    className="px-4 py-3 text-sm font-medium text-stone hover:text-ivory transition-colors cursor-pointer"
                  >
                    Skip tutorial
                  </button>
                )}
              </div>

              <button
                onClick={handleNext}
                className="group relative flex items-center gap-2 px-8 py-3 bg-electric text-ink rounded-xl font-semibold shadow-electric hover:shadow-electric-lg hover:-translate-y-0.5 cursor-pointer transition-all duration-250 overflow-hidden"
              >
                <span className="relative z-10">
                  {isLastStep ? "Start Playing" : "Next"}
                </span>
                <svg
                  className={`relative z-10 w-4 h-4 transition-transform duration-250 ${isLastStep ? '' : 'group-hover:translate-x-1'}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </button>
            </div>
          </div>

          {/* Decorative corner */}
          <div className="absolute top-0 right-0 w-32 h-32 pointer-events-none">
            <div className="absolute top-4 right-4 w-16 h-16 border border-electric/20 rounded-full" />
            <div className="absolute top-8 right-8 w-8 h-8 border border-electric/30 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tutorial;
