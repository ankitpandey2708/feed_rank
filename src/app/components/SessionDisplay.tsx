import { GameSession } from '@/types';

interface SessionDisplayProps {
  session: GameSession;
}

const SessionDisplay = ({ session }: SessionDisplayProps) => {
  if (session.roundsPlayed === 0) return null;

  const successRate = session.maxPossibleScore > 0
    ? Math.round((session.totalScore / session.maxPossibleScore) * 100)
    : 0;

  const stats = [
    {
      label: 'Rounds',
      value: session.roundsPlayed,
      color: 'text-electric',
    },
    {
      label: 'Success',
      value: `${successRate}%`,
      color: 'text-success',
    },
    {
      label: 'Streak',
      value: session.streak,
      color: session.streak > 0 ? 'text-warning' : 'text-stone',
    },
    {
      label: 'Score',
      value: `${session.totalScore}/${session.maxPossibleScore}`,
      color: 'text-ivory',
    },
  ];

  return (
    <div className="mb-8 sm:mb-10 animate-fade-in">
      <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
        {stats.map((stat, idx) => (
          <div
            key={stat.label}
            className="group relative"
            style={{ animationDelay: `${idx * 50}ms` }}
          >
            {/* Hover glow */}
            <div className="absolute -inset-px rounded-xl bg-electric/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md" />

            <div className="relative flex items-center gap-3 px-4 sm:px-5 py-3 bg-surface border border-white/[0.08] rounded-xl hover:border-white/[0.15] transition-colors duration-250">
              {/* Value */}
              <span className={`font-mono text-xl sm:text-2xl font-bold ${stat.color}`}>
                {stat.value}
              </span>

              {/* Divider */}
              <div className="w-px h-6 bg-white/10" />

              {/* Label */}
              <span className="text-xs font-medium text-stone uppercase tracking-wider">
                {stat.label}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Streak fire indicator */}
      {session.streak >= 3 && (
        <div className="mt-4 flex justify-center animate-float">
          <div className="flex items-center gap-2 px-4 py-2 bg-warning/10 border border-warning/30 rounded-full">
            <span className="text-warning text-lg">🔥</span>
            <span className="text-sm font-medium text-warning">
              {session.streak} in a row!
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SessionDisplay;
