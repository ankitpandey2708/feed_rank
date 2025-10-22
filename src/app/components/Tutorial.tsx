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
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
      padding: "var(--space-4)"
    }}>
      <div style={{
        backgroundColor: "var(--background)",
        borderRadius: "var(--radius-lg)",
        padding: "var(--space-8)",
        maxWidth: "600px",
        width: "100%",
        boxShadow: "var(--shadow-lg)"
      }}>
        {/* Progress indicator */}
        <div style={{
          display: "flex",
          gap: "var(--space-2)",
          marginBottom: "var(--space-6)",
          justifyContent: "center"
        }}>
          {tutorialSteps.map((_, idx) => (
            <div
              key={idx}
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                backgroundColor: idx === currentStep
                  ? "var(--color-primary)"
                  : "var(--color-gray-300)",
                transition: "all 0.3s ease"
              }}
            />
          ))}
        </div>

        {/* Content */}
        <h2 style={{
          fontSize: "var(--text-2xl)",
          fontWeight: "700",
          marginBottom: "var(--space-4)",
          color: "var(--foreground)",
          textAlign: "center"
        }}>
          {step.title}
        </h2>

        <p style={{
          fontSize: "var(--text-base)",
          lineHeight: "1.6",
          color: "var(--color-secondary)",
          marginBottom: step.example ? "var(--space-6)" : "var(--space-8)"
        }}>
          {step.content}
        </p>

        {/* Example */}
        {step.example && (
          <div style={{
            backgroundColor: "var(--color-gray-100)",
            borderRadius: "var(--radius-md)",
            padding: "var(--space-4)",
            marginBottom: "var(--space-6)"
          }}>
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-2)",
              marginBottom: "var(--space-3)"
            }}>
              <div style={{
                padding: "var(--space-2)",
                backgroundColor: "var(--background)",
                borderRadius: "var(--radius-sm)",
                fontSize: "var(--text-sm)",
                fontFamily: "monospace"
              }}>
                {step.example.post1}
              </div>
              <div style={{
                padding: "var(--space-2)",
                backgroundColor: "var(--background)",
                borderRadius: "var(--radius-sm)",
                fontSize: "var(--text-sm)",
                fontFamily: "monospace"
              }}>
                {step.example.post2}
              </div>
            </div>
            <p style={{
              fontSize: "var(--text-sm)",
              color: "var(--color-secondary)",
              fontStyle: "italic",
              margin: 0
            }}>
              {step.example.explanation}
            </p>
          </div>
        )}

        {/* Navigation buttons */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "var(--space-4)"
        }}>
          <div style={{ display: "flex", gap: "var(--space-2)" }}>
            {currentStep > 0 && (
              <button
                onClick={handlePrev}
                style={{
                  padding: "var(--space-3) var(--space-5)",
                  backgroundColor: "var(--background)",
                  color: "var(--foreground)",
                  border: "1px solid var(--color-gray-300)",
                  borderRadius: "var(--radius-md)",
                  cursor: "pointer",
                  fontSize: "var(--text-sm)",
                  fontWeight: "600"
                }}
              >
                ← Previous
              </button>
            )}
            {!isLastStep && (
              <button
                onClick={onSkip}
                style={{
                  padding: "var(--space-3) var(--space-5)",
                  backgroundColor: "transparent",
                  color: "var(--color-secondary)",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "var(--text-sm)",
                  fontWeight: "500"
                }}
              >
                Skip Tutorial
              </button>
            )}
          </div>
          <button
            onClick={handleNext}
            style={{
              padding: "var(--space-3) var(--space-6)",
              backgroundColor: "var(--color-primary)",
              color: "white",
              border: "none",
              borderRadius: "var(--radius-md)",
              cursor: "pointer",
              fontSize: "var(--text-sm)",
              fontWeight: "600"
            }}
          >
            {isLastStep ? "Start Playing!" : "Next →"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tutorial;
