import React from 'react';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';

interface PlayerSelectionProps {
  onSelectPlayers: (count: number) => void;
  onBack: () => void;
}

export const PlayerSelection: React.FC<PlayerSelectionProps> = ({ onSelectPlayers, onBack }) => {
  const playerCounts = [2, 3, 4];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex flex-col items-center justify-center p-4">
      <motion.h1
        className="text-4xl font-bold text-white mb-8"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Select Players
      </motion.h1>

      <div className="flex flex-col gap-4 w-full max-w-md">
        {playerCounts.map((count) => (
          <motion.button
            key={count}
            className="flex items-center justify-between p-6 bg-white/20 hover:bg-white/30 rounded-xl backdrop-blur-lg transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectPlayers(count)}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <span className="text-2xl font-semibold text-white">{count} Players</span>
            <Users className="w-6 h-6 text-white" />
          </motion.button>
        ))}

        <motion.button
          className="mt-4 p-4 bg-white/10 hover:bg-white/20 rounded-xl text-white font-medium"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onBack}
        >
          Back to Games
        </motion.button>
      </div>
    </div>
  );
};