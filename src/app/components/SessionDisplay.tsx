import { GameSession } from '@/types';

interface SessionDisplayProps {
  session: GameSession;
}

const SessionDisplay = ({ session }: SessionDisplayProps) => {
  if (session.roundsPlayed === 0) return null;

  const successRate = session.maxPossibleScore > 0
    ? Math.round((session.totalScore / session.maxPossibleScore) * 100)
    : 0;

  return (
    <div style={{
      backgroundColor: "var(--background)",
      border: "1px solid var(--color-gray-200)",
      borderRadius: "var(--radius-lg)",
      padding: "var(--space-4)",
      marginBottom: "var(--space-6)",
      boxShadow: "var(--shadow-sm)"
    }}>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
        gap: "var(--space-4)",
        textAlign: "center"
      }}>
        <div>
          <div style={{
            fontSize: "var(--text-2xl)",
            fontWeight: "700",
            color: "var(--color-primary)"
          }}>
            {session.roundsPlayed}
          </div>
          <div style={{
            fontSize: "var(--text-xs)",
            color: "var(--color-secondary)",
            marginTop: "var(--space-1)"
          }}>
            Rounds
          </div>
        </div>

        <div>
          <div style={{
            fontSize: "var(--text-2xl)",
            fontWeight: "700",
            color: "var(--color-success)"
          }}>
            {successRate}%
          </div>
          <div style={{
            fontSize: "var(--text-xs)",
            color: "var(--color-secondary)",
            marginTop: "var(--space-1)"
          }}>
            Success
          </div>
        </div>

        <div>
          <div style={{
            fontSize: "var(--text-2xl)",
            fontWeight: "700",
            color: "var(--color-warning)"
          }}>
            {session.streak}
          </div>
          <div style={{
            fontSize: "var(--text-xs)",
            color: "var(--color-secondary)",
            marginTop: "var(--space-1)"
          }}>
            Streak
          </div>
        </div>

        <div>
          <div style={{
            fontSize: "var(--text-2xl)",
            fontWeight: "700",
            color: "var(--foreground)"
          }}>
            {session.totalScore}/{session.maxPossibleScore}
          </div>
          <div style={{
            fontSize: "var(--text-xs)",
            color: "var(--color-secondary)",
            marginTop: "var(--space-1)"
          }}>
            Total Score
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionDisplay;
