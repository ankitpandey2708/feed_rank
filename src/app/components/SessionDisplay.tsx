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
    <div className="bg-white border border-neutral-200/60 rounded-xl p-6 mb-8 shadow-md hover:shadow-lg transition-all duration-300">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        <div>
          <div className="text-4xl font-bold text-primary-500 mb-1">
            {session.roundsPlayed}
          </div>
          <div className="text-xs font-medium text-neutral-500 uppercase tracking-wide">
            Rounds
          </div>
        </div>

        <div>
          <div className="text-4xl font-bold text-success-500 mb-1">
            {successRate}%
          </div>
          <div className="text-xs font-medium text-neutral-500 uppercase tracking-wide">
            Success
          </div>
        </div>

        <div>
          <div className="text-4xl font-bold text-warning-500 mb-1">
            {session.streak}
          </div>
          <div className="text-xs font-medium text-neutral-500 uppercase tracking-wide">
            Streak
          </div>
        </div>

        <div>
          <div className="text-4xl font-bold text-neutral-900 mb-1">
            {session.totalScore}/{session.maxPossibleScore}
          </div>
          <div className="text-xs font-medium text-neutral-500 uppercase tracking-wide">
            Total Score
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionDisplay;
