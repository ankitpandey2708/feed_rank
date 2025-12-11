interface HintDisplayProps {
  hint: string | null;
  validationIssues: string[];
  onRequestHint: () => void;
  hintsEnabled: boolean;
}

const HintDisplay = ({ hint, validationIssues, onRequestHint, hintsEnabled }: HintDisplayProps) => {
  if (!hintsEnabled) return null;

  return (
    <div className="mt-4 space-y-3">
      {/* Validation Issues */}
      {validationIssues.length > 0 && (
        <div className="bg-warning-50 border border-warning-500/60 rounded-lg p-4">
          {validationIssues.map((issue, idx) => (
            <p key={idx} className="m-0 text-sm text-warning-800 leading-relaxed">
              ⚠️ {issue}
            </p>
          ))}
        </div>
      )}

      {/* Hint Button */}
      <button
        onClick={onRequestHint}
        className="px-4 py-2.5 bg-white text-primary-600 border border-primary-500/60 rounded-lg hover:bg-primary-50 hover:border-primary-500 cursor-pointer text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md"
      >
        💡 Need a Hint?
      </button>

      {/* Display Hint */}
      {hint && (
        <div className="bg-primary-50 border border-primary-500/60 rounded-lg p-4 shadow-sm">
          <p className="m-0 text-sm text-neutral-800 leading-relaxed italic">
            💭 {hint}
          </p>
        </div>
      )}
    </div>
  );
};

export default HintDisplay;
