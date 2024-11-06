import React from 'react';
import { Upgrade as UpgradeType } from '../types/game';
import { Leaf, Home, Droplets } from 'lucide-react';

const upgradeIcons = {
  fertilizer: Leaf,
  greenhouse: Home,
  magicWater: Droplets,
};

interface UpgradeProps {
  upgrades: UpgradeType[];
  seeds: number;
  onPurchase: (id: string) => void;
}

export const Upgrades: React.FC<UpgradeProps> = ({ upgrades, seeds, onPurchase }) => {
  return (
    <div className="grid grid-cols-1 gap-4 p-4">
      {upgrades.map((upgrade) => {
        const Icon = upgradeIcons[upgrade.id as keyof typeof upgradeIcons];
        const canAfford = seeds >= upgrade.cost;
        
        return (
          <button
            key={upgrade.id}
            onClick={() => onPurchase(upgrade.id)}
            disabled={!canAfford}
            className={`flex items-center justify-between p-4 rounded-lg transition-all transform hover:scale-105 ${
              canAfford
                ? 'bg-green-500 hover:bg-green-600 text-white'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            <div className="flex items-center gap-3">
              <Icon className="w-6 h-6" />
              <div className="text-left">
                <h3 className="font-bold">{upgrade.name}</h3>
                <p className="text-sm opacity-90">{upgrade.description}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold">Cost: {upgrade.cost}</p>
              <p className="text-sm">Owned: {upgrade.owned}</p>
            </div>
          </button>
        );
      })}
    </div>
  );
};