import React, { useState } from 'react';
import { Leaf, Save, LogOut } from 'lucide-react';
import { useGame } from './hooks/useGame';
import { useAuth } from './hooks/useAuth';
import { Auth } from './components/Auth';
import { Upgrades } from './components/Upgrades';
import { Leaderboard } from './components/Leaderboard';

function App() {
  const { currentUser, login, register, logout, saveUserGameState } = useAuth();
  const { gameState, clickSeed, purchaseUpgrade, saveGame } = useGame(
    currentUser?.gameState || null,
    saveUserGameState
  );
  const [isSaving, setIsSaving] = useState(false);

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
        <Auth onLogin={login} onRegister={register} />
      </div>
    );
  }

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await saveGame();
      // Show success state briefly
      setTimeout(() => setIsSaving(false), 1000);
    } catch (error) {
      console.error('Save failed:', error);
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Game Area */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-4xl font-bold text-green-600">Seed Clicker</h1>
                <div className="flex items-center gap-4">
                  <span className="text-gray-600">Welcome, {currentUser.username}!</span>
                  <button
                    onClick={logout}
                    className="flex items-center gap-2 px-3 py-1 text-gray-600 hover:text-gray-800"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              </div>
              <div className="text-center">
                <div className="space-y-2">
                  <p className="text-2xl font-bold">{Math.floor(gameState.seeds)} seeds</p>
                  <p className="text-gray-600">
                    per click: {gameState.seedsPerClick.toFixed(1)} | per second: {gameState.seedsPerSecond.toFixed(1)}
                  </p>
                </div>
              </div>
            </div>

            {/* Clicker Button */}
            <div className="flex justify-center">
              <button
                onClick={clickSeed}
                className="transform transition-all duration-100 active:scale-95 hover:scale-105"
              >
                <Leaf className="w-32 h-32 text-green-500 hover:text-green-600" />
              </button>
            </div>

            {/* Save Controls */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-center">
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    isSaving
                      ? 'bg-green-500 text-white'
                      : 'bg-blue-500 hover:bg-blue-600 text-white'
                  }`}
                >
                  <Save className={`w-5 h-5 ${isSaving ? 'animate-spin' : ''}`} />
                  {isSaving ? 'Saving...' : 'Save to Server'}
                </button>
              </div>
            </div>

            {/* Upgrades */}
            <div className="bg-white rounded-lg shadow-lg">
              <h2 className="text-xl font-bold p-4 border-b">Upgrades</h2>
              <Upgrades
                upgrades={gameState.upgrades}
                seeds={gameState.seeds}
                onPurchase={purchaseUpgrade}
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Leaderboard />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;