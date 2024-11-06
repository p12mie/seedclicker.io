import { useState, useEffect, useCallback } from 'react';
import { GameState, Upgrade } from '../types/game';

const INITIAL_UPGRADES: Upgrade[] = [
  {
    id: 'fertilizer',
    name: 'Fertilizer',
    cost: 10,
    multiplier: 0.1,
    owned: 0,
    description: 'Increases seeds per second',
  },
  {
    id: 'greenhouse',
    name: 'Greenhouse',
    cost: 50,
    multiplier: 0.5,
    owned: 0,
    description: 'Significantly boosts seed production',
  },
  {
    id: 'magicWater',
    name: 'Magic Water',
    cost: 100,
    multiplier: 2,
    owned: 0,
    description: 'Doubles your clicking power',
  },
];

const INITIAL_STATE: GameState = {
  seeds: 0,
  seedsPerClick: 1,
  seedsPerSecond: 0,
  upgrades: INITIAL_UPGRADES,
  lastSaved: Date.now(),
};

export const useGame = (initialState: GameState | null = null, onSave?: (state: GameState) => void) => {
  const [gameState, setGameState] = useState<GameState>(initialState || INITIAL_STATE);

  const saveGame = useCallback(() => {
    onSave?.(gameState);
  }, [gameState, onSave]);

  const clickSeed = () => {
    setGameState(prev => ({
      ...prev,
      seeds: prev.seeds + prev.seedsPerClick,
    }));
  };

  const purchaseUpgrade = (upgradeId: string) => {
    setGameState(prev => {
      const upgrade = prev.upgrades.find(u => u.id === upgradeId);
      if (!upgrade || prev.seeds < upgrade.cost) return prev;

      const newCost = Math.floor(upgrade.cost * 1.15);
      const newUpgrades = prev.upgrades.map(u =>
        u.id === upgradeId
          ? { ...u, owned: u.owned + 1, cost: newCost }
          : u
      );

      return {
        ...prev,
        seeds: prev.seeds - upgrade.cost,
        seedsPerSecond: upgradeId === 'fertilizer' || upgradeId === 'greenhouse'
          ? prev.seedsPerSecond + upgrade.multiplier
          : prev.seedsPerSecond,
        seedsPerClick: upgradeId === 'magicWater'
          ? prev.seedsPerClick + upgrade.multiplier
          : prev.seedsPerClick,
        upgrades: newUpgrades,
      };
    });
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setGameState(prev => ({
        ...prev,
        seeds: prev.seeds + prev.seedsPerSecond,
      }));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const saveTimer = setInterval(saveGame, 30000);
    return () => clearInterval(saveTimer);
  }, [saveGame]);

  return {
    gameState,
    clickSeed,
    purchaseUpgrade,
    saveGame,
  };
};