import React from 'react';
import { motion } from 'framer-motion';
import { PlayIcon, Clock3Icon } from 'lucide-react';

interface HomeScreenProps {
  onSelectGame: (gameId: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onSelectGame }) => {
  const games = [
    { id: 'croissant-lose', name: 'Croissant Lose', available: true },
    { id: 'card-battle', name: 'Card Battle', available: false },
    { id: 'memory-match', name: 'Memory Match', available: false },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex flex-col items-center justify-center p-4">
      <motion.h1
        className="text-5xl font-bold text-white mb-12"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Card Games
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl">
        {games.map((game) => (
          <motion.div
            key={game.id}
            className={`p-6 rounded-xl backdrop-blur-lg ${
              game.available
                ? 'bg-white/20 hover:bg-white/30 cursor-pointer'
                : 'bg-white/10'
            } transition-colors`}
            whileHover={game.available ? { scale: 1.05 } : {}}
            onClick={() => game.available && onSelectGame(game.id)}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold text-white">
                {game.name}
              </h2>
              {game.available ? (
                <PlayIcon className="w-6 h-6 text-white" />
              ) : (
                <Clock3Icon className="w-6 h-6 text-white/60" />
              )}
            </div>
            <p className="text-white/80">
              {game.available
                ? 'Click to play now!'
                : 'Coming soon...'}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}