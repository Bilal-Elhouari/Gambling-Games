export interface Player {
  id: number;
  cards: number[];
  isActive: boolean;
  isEliminated: boolean;
  isRevealed: boolean;
}

export interface GameState {
  players: Player[];
  currentPlayer: number;
  totalScore: number;
  gameStarted: boolean;
  gameOver: boolean;
  winner: number | null;
  playerCount: number;
  isSelectingPlayers: boolean;
  playedCards: PlayedCard[]; // Utilisez le type PlayedCard[]
}

export type CardValue = 0 | 2 | 3 | 5;

export interface PlayedCard {
  value: number;
  playerId: number;
  x: number;
  y: number;
}