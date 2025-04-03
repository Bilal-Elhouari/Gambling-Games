import React, { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { HomeScreen } from './components/HomeScreen';
import { PlayerSelection } from './components/PlayerSelection';
import { GameBoard } from './components/GameBoard';
import { GameState, Player, CardValue, PlayedCard } from './types';

const CARD_VALUES: CardValue[] = [0, 2, 3, 5];

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

function generatePlayerCards(): number[] {
  const allCards = [...CARD_VALUES];
  allCards.push(5); // Add an extra 5 to make it 5 cards total
  return shuffleArray(allCards);
}

function App() {
  const [gameState, setGameState] = useState<GameState>({
    players: [],
    currentPlayer: 0,
    totalScore: 0,
    gameStarted: false,
    gameOver: false,
    winner: null,
    playerCount: 2,
    isSelectingPlayers: false,
    playedCards: [],
  });

  const startGame = useCallback((playerCount: number) => {
    const firstPlayer = Math.floor(Math.random() * playerCount);
    const players: Player[] = Array.from({ length: playerCount }, (_, i) => ({
      id: i,
      cards: generatePlayerCards(),
      isActive: i === firstPlayer,
      isEliminated: false,
      isRevealed: i === firstPlayer,
    }));

    setGameState({
      players,
      currentPlayer: firstPlayer,
      totalScore: 0,
      gameStarted: true,
      gameOver: false,
      winner: null,
      playerCount,
      isSelectingPlayers: false,
      playedCards: [],
    });
  }, []);

  const playCard = useCallback((playerId: number, cardIndex: number) => {
    setGameState((prev) => {
      const newState = { ...prev };
      const player = newState.players[playerId];
      const cardValue = player.cards[cardIndex];

      // Calculate card position for animation
      const playerElement = document.querySelector(`[data-player-id="${playerId}"]`);
      const cardElement = playerElement?.querySelector(`[data-card-index="${cardIndex}"]`);
      const rect = cardElement?.getBoundingClientRect() || { x: 0, y: 0 };

      // Add played card with position
      const playedCard: PlayedCard = {
        value: cardValue,
        playerId,
        x: rect.x,
        y: rect.y,
      };

      // Remove the played card
      player.cards = player.cards.filter((_, i) => i !== cardIndex);

      // Update total score
      const newTotalScore = prev.totalScore + cardValue;

      // Check if player is eliminated
      if (newTotalScore > 21) {
        player.isEliminated = true;
      }

      // Find next active player
      let nextPlayer = (playerId + 1) % newState.players.length;
      while (
        newState.players[nextPlayer].isEliminated &&
        nextPlayer !== playerId
      ) {
        nextPlayer = (nextPlayer + 1) % newState.players.length;
      }

      // Update revealed status
      newState.players.forEach(p => {
        p.isRevealed = p.id === nextPlayer;
      });

      // Check if game is over
      const activePlayers = newState.players.filter((p) => !p.isEliminated);
      const gameOver = activePlayers.length <= 1;

      return {
        ...newState,
        totalScore: newTotalScore,
        currentPlayer: nextPlayer,
        gameOver,
        winner: gameOver ? activePlayers[0]?.id ?? null : null,
        playedCards: [...prev.playedCards, playedCard],
      };
    });
  }, []);

  const onSelectGame = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      isSelectingPlayers: true,
    }));
  }, []);

  const onBack = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      isSelectingPlayers: false,
    }));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      <AnimatePresence mode="wait">
        {!gameState.gameStarted ? (
          gameState.isSelectingPlayers ? (
            <motion.div
              key="player-selection"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <PlayerSelection onSelectPlayers={startGame} onBack={onBack} />
            </motion.div>
          ) : (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <HomeScreen onSelectGame={onSelectGame} />
            </motion.div>
          )
        ) : (
          <motion.div
            key="game"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="container mx-auto py-8"
          >
            {gameState.gameOver ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-center text-white text-4xl font-bold"
              >
                {gameState.winner !== null
                  ? `Player ${gameState.winner + 1} Wins!`
                  : 'Game Over!'}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  className="mt-8 px-6 py-3 bg-white text-blue-600 rounded-lg text-xl"
                  onClick={() => setGameState(prev => ({
                    ...prev,
                    gameStarted: false,
                    isSelectingPlayers: false,
                  }))}
                >
                  Back to Menu
                </motion.button>
              </motion.div>
            ) : (
              <GameBoard
                players={gameState.players}
                currentPlayer={gameState.currentPlayer}
                totalScore={gameState.totalScore}
                onPlayCard={playCard}
                playedCards={gameState.playedCards}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;