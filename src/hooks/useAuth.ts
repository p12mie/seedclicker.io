import { useState, useCallback } from 'react';
import { User, GameState } from '../types/game';
import { saveGameToServer, loadGameFromServer } from '../services/gameService';

export const useAuth = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('seedClickerCurrentUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = useCallback(async (username: string, password: string): Promise<boolean> => {
    try {
      // In a real app, this would be an API call
      const hashedPassword = btoa(password);
      const gameState = await loadGameFromServer(username);
      
      const user: User = {
        username,
        gameState
      };
      
      setCurrentUser(user);
      localStorage.setItem('seedClickerCurrentUser', JSON.stringify(user));
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  }, []);

  const register = useCallback(async (username: string, password: string): Promise<boolean> => {
    try {
      // In a real app, this would be an API call
      const hashedPassword = btoa(password);
      const user: User = {
        username,
        gameState: null
      };
      
      setCurrentUser(user);
      localStorage.setItem('seedClickerCurrentUser', JSON.stringify(user));
      return true;
    } catch (error) {
      console.error('Registration failed:', error);
      return false;
    }
  }, []);

  const logout = useCallback(() => {
    setCurrentUser(null);
    localStorage.removeItem('seedClickerCurrentUser');
  }, []);

  const saveUserGameState = useCallback(async (gameState: GameState) => {
    if (!currentUser) return;

    try {
      await saveGameToServer(currentUser.username, gameState);
      const updatedUser = { ...currentUser, gameState };
      setCurrentUser(updatedUser);
      localStorage.setItem('seedClickerCurrentUser', JSON.stringify(updatedUser));
    } catch (error) {
      console.error('Failed to save game state:', error);
      throw new Error('Failed to save game state');
    }
  }, [currentUser]);

  return {
    currentUser,
    login,
    register,
    logout,
    saveUserGameState
  };
};