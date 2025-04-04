import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from './Card';
import { Player, PlayedCard } from '../types';
import { Crown } from 'lucide-react';

interface GameBoardProps {
  players: Player[];
  currentPlayer: number;
  totalScore: number;
  onPlayCard: (playerId: number, cardIndex: number) => void;
  playedCards: PlayedCard[];
}

export const GameBoard: React.FC<GameBoardProps> = ({
  players,
  currentPlayer,
  totalScore,
  onPlayCard,
  playedCards,
}) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4">
      <motion.div
        className="mb-8 text-4xl font-bold text-white flex items-center gap-3"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
      >
        <Crown className="w-8 h-8" />
        <span>Total Score: {totalScore}</span>
      </motion.div>

      <div className="relative">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <AnimatePresence>
            {playedCards.map((card, index) => (
              <motion.div
                key={`played-${card.playerId}-${index}`}
                className="absolute"
                initial={{ x: card.x, y: card.y, opacity: 0 }}
                animate={{ x: 0, y: 0, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                <Card
                  value={card.value}
                  isPlayable={false}
                  isHidden={false}
                  onClick={() => {}}
                  layoutId={`card-${card.playerId}-${card.value}-${index}`}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl mt-8">
        {players.map((player, playerIndex) => (
          <motion.div
            key={player.id}
            className={`p-6 rounded-xl backdrop-blur-lg ${
              currentPlayer === playerIndex
                ? 'bg-white/30 ring-2 ring-white/50'
                : 'bg-white/10'
            } ${player.isEliminated ? 'opacity-50' : ''}`}
            animate={{
              scale: currentPlayer === playerIndex ? 1.05 : 1,
            }}
          >
            <h3 className="text-xl font-semibold mb-4 text-white flex items-center gap-2">
              Player {player.id + 1}
              {currentPlayer === playerIndex && (
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="inline-block w-3 h-3 bg-green-400 rounded-full"
                />
              )}
              {player.isEliminated && ' (Eliminated)'}
            </h3>
            <div className="flex flex-wrap gap-4 justify-center">
              <AnimatePresence>
                {player.cards.map((card, cardIndex) => (
                  <Card
                    key={`${player.id}-${cardIndex}`}
                    value={card}
                    isPlayable={
                      currentPlayer === playerIndex &&
                      !player.isEliminated
                    }
                    isHidden={!player.isRevealed}
                    onClick={() => onPlayCard(playerIndex, cardIndex)}
                    layoutId={`card-${player.id}-${card}-${cardIndex}`}
                  />
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}