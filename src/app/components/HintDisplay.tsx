interface HintDisplayProps {
  hint: string | null;
  validationIssues: string[];
  onRequestHint: () => void;
  hintsEnabled: boolean;
}

const HintDisplay = ({ hint, validationIssues, onRequestHint, hintsEnabled }: HintDisplayProps) => {
  if (!hintsEnabled) return null;

  return (
    <div className="mt-6 space-y-4 animate-fade-in">
      {/* Validation Issues */}
      {validationIssues.length > 0 && (
        <div className="flex items-start gap-3 p-4 bg-warning/10 border border-warning/30 rounded-xl">
          <div className="flex-shrink-0 w-5 h-5 mt-0.5">
            <svg className="w-5 h-5 text-warning" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div className="flex-1">
            {validationIssues.map((issue, idx) => (
              <p key={idx} className="text-sm text-warning leading-relaxed">
                {issue}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Hint Request Button */}
      <button
        onClick={onRequestHint}
        className="group flex items-center gap-2 px-4 py-2.5 bg-surface-elevated border border-white/[0.08] rounded-lg hover:border-electric/30 hover:bg-surface-hover cursor-pointer text-sm font-medium text-stone hover:text-electric transition-all duration-250"
      >
        <svg
          className="w-4 h-4 text-electric group-hover:scale-110 transition-transform duration-250"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
        Need a hint?
      </button>

      {/* Display Hint */}
      {hint && (
        <div className="relative overflow-hidden rounded-xl">
          {/* Gradient border effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-electric/20 via-electric/10 to-electric/20 rounded-xl" />

          <div className="relative m-px p-4 bg-surface rounded-xl">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-electric/10 rounded-lg">
                <svg className="w-4 h-4 text-electric" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <p className="flex-1 text-sm text-mist leading-relaxed italic">
                {hint}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HintDisplay;
