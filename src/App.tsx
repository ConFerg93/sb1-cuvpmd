import React, { useState, useEffect } from 'react';
import { LineChart } from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';
import Confetti from 'react-confetti';
import TradeForm from './components/TradeForm';
import TradeMetrics from './components/TradeMetrics';
import TradeHistory from './components/TradeHistory';
import StrategyPerformance from './components/StrategyPerformance';
import PnLChart from './components/PnLChart';
import Achievements from './components/Achievements';

export interface Trade {
  id: string;
  pair: string;
  strategy: string;
  returnPercent: number;
  lossPercent: number;
  direction: 'Long' | 'Short';
  outcome: 'win' | 'loss' | 'breakeven';
  timestamp: number;
  date: string;
}

export default function App() {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [level, setLevel] = useState(1);
  const [experience, setExperience] = useState(0);

  const getTraderBadge = (level: number) => {
    if (level >= 5) return 'Grand Trading Master';
    if (level >= 4) return 'Expert';
    if (level >= 3) return 'Skilled';
    if (level >= 2) return 'Intermediate';
    return 'Novice';
  };

  const calculateNextLevelExp = (currentLevel: number) => currentLevel * 500;

  const addExperience = (amount: number) => {
    setExperience((prev) => {
      const newExp = prev + amount;
      const nextLevelExp = calculateNextLevelExp(level);
      
      if (newExp >= nextLevelExp) {
        setLevel((prevLevel) => {
          const newLevel = prevLevel + 1;
          const newBadge = getTraderBadge(newLevel);
          toast.success(`Level Up! You're now a ${newBadge}! 🎉`);
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 5000);
          return newLevel;
        });
        return newExp - nextLevelExp;
      }
      return newExp;
    });
  };

  const addTrade = (trade: Omit<Trade, 'id' | 'timestamp'>) => {
    const newTrade: Trade = {
      id: Date.now().toString(),
      timestamp: new Date(trade.date).getTime(),
      ...trade,
    };

    setTrades((prev) => [...prev, newTrade]);

    // Award experience points
    const baseXP = 100;
    let bonusXP = 0;

    if (trade.outcome === 'win') {
      bonusXP += 50;
      toast.success('Trade won! +150 XP 🎯');
    } else if (trade.outcome === 'breakeven') {
      bonusXP += 25;
      toast.success('Breakeven trade! +125 XP 🎯');
    } else {
      toast.success('Trade recorded! +100 XP 📝');
    }

    addExperience(baseXP + bonusXP);
  };

  const removeTrade = (id: string) => {
    setTrades((prev) => prev.filter((trade) => trade.id !== id));
  };

  return (
    <div className="min-h-screen">
      <Toaster position="top-right" />
      {showConfetti && <Confetti recycle={false} numberOfPieces={500} />}
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <LineChart className="w-12 h-12 text-[#3B82F6]" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">
            Trading Performance Journal
          </h1>
          <p className="text-lg text-gray-400">
            Track and analyze your trading performance metrics
          </p>
        </div>

        <div className="glass-card rounded-2xl shadow-xl p-6 mb-8">
          <TradeMetrics trades={trades} />
        </div>

        <div className="glass-card rounded-2xl shadow-xl p-6 mb-8">
          <TradeForm onAddTrade={addTrade} />
        </div>

        <Achievements 
          trades={trades}
          level={level}
          experience={experience}
          nextLevelExp={calculateNextLevelExp(level)}
          traderBadge={getTraderBadge(level)}
        />

        <div className="glass-card rounded-2xl shadow-xl p-6 mb-8">
          <StrategyPerformance trades={trades} />
        </div>

        <div className="glass-card rounded-2xl shadow-xl p-6 mb-8">
          <PnLChart trades={trades} />
        </div>

        <div className="glass-card rounded-2xl shadow-xl p-6">
          <TradeHistory trades={trades} onRemoveTrade={removeTrade} />
        </div>
      </div>
    </div>
  );
}