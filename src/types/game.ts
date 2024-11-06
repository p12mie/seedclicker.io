export interface Upgrade {
  id: string;
  name: string;
  cost: number;
  multiplier: number;
  owned: number;
  description: string;
}

export interface GameState {
  seeds: number;
  seedsPerClick: number;
  seedsPerSecond: number;
  upgrades: Upgrade[];
  lastSaved: number;
}

export interface LeaderboardEntry {
  name: string;
  seeds: number;
  timestamp: number;
}

export interface User {
  username: string;
  gameState: GameState | null;
}