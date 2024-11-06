import React, { useState, useEffect } from 'react';
import { LeaderboardEntry } from '../types/game';
import { Trophy } from 'lucide-react';

const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  { name: "SeedMaster", seeds: 1000000, timestamp: Date.now() },
  { name: "GreenThumb", seeds: 750000, timestamp: Date.now() },
  { name: "PlantWhisperer", seeds: 500000, timestamp: Date.now() },
];

export const Leaderboard: React.FC = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(MOCK_LEADERBOARD);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <Trophy className="w-6 h-6 text-yellow-500" />
        <h2 className="text-xl font-bold">Leaderboard</h2>
      </div>
      <div className="space-y-4">
        {leaderboard.map((entry, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center gap-3">
              <span className="font-bold text-lg w-8">{index + 1}</span>
              <span className="font-medium">{entry.name}</span>
            </div>
            <span className="font-bold text-green-600">
              {entry.seeds.toLocaleString()} seeds
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};