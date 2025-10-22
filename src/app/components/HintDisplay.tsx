interface HintDisplayProps {
  hint: string | null;
  validationIssues: string[];
  onRequestHint: () => void;
  hintsEnabled: boolean;
}

const HintDisplay = ({ hint, validationIssues, onRequestHint, hintsEnabled }: HintDisplayProps) => {
  if (!hintsEnabled) return null;

  return (
    <div style={{ marginTop: "var(--space-4)" }}>
      {/* Validation Issues */}
      {validationIssues.length > 0 && (
        <div style={{
          backgroundColor: "var(--color-warning-light)",
          border: "1px solid var(--color-warning)",
          borderRadius: "var(--radius-md)",
          padding: "var(--space-3)",
          marginBottom: "var(--space-3)"
        }}>
          {validationIssues.map((issue, idx) => (
            <p key={idx} style={{
              margin: 0,
              fontSize: "var(--text-sm)",
              color: "var(--color-warning-dark)",
              lineHeight: "1.5"
            }}>
              ⚠️ {issue}
            </p>
          ))}
        </div>
      )}

      {/* Hint Button */}
      <button
        onClick={onRequestHint}
        className="text-sm"
        style={{
          padding: "var(--space-2) var(--space-4)",
          backgroundColor: "var(--background)",
          color: "var(--color-primary)",
          border: "1px solid var(--color-primary)",
          borderRadius: "var(--radius-md)",
          cursor: "pointer",
          fontSize: "var(--text-sm)",
          fontWeight: "500",
          transition: "all 0.2s ease"
        }}
      >
        💡 Need a Hint?
      </button>

      {/* Display Hint */}
      {hint && (
        <div style={{
          marginTop: "var(--space-3)",
          backgroundColor: "var(--color-primary-light)",
          border: "1px solid var(--color-primary)",
          borderRadius: "var(--radius-md)",
          padding: "var(--space-4)"
        }}>
          <p style={{
            margin: 0,
            fontSize: "var(--text-sm)",
            color: "var(--foreground)",
            lineHeight: "1.6",
            fontStyle: "italic"
          }}>
            💭 {hint}
          </p>
        </div>
      )}
    </div>
  );
};

export default HintDisplay;
