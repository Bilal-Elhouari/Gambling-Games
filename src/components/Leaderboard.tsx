import React from 'react';

interface LeaderboardProps {
  leaderboard: { name: string; score: number }[];
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ leaderboard }) => {
  return (
    <div className="mt-8 p-6 bg-white/20 rounded-xl backdrop-blur-lg">
      <h2 className="text-3xl font-bold text-white mb-4">Leaderboard</h2>
      <ul className="space-y-2">
        {leaderboard.map((entry, index) => (
          <li key={index} className="text-white text-xl">
            {entry.name}: {entry.score} points
          </li>
        ))}
      </ul>
    </div>
  );
};