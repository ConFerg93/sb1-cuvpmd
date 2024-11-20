import React from 'react';
import { Award } from 'lucide-react';
import AchievementBadge from './AchievementBadge';
import { Trade } from '../App';

interface AchievementsProps {
  trades: Trade[];
  level: number;
  experience: number;
  nextLevelExp: number;
  traderBadge: string;
}

export default function Achievements({ 
  trades, 
  level, 
  experience, 
  nextLevelExp,
  traderBadge 
}: AchievementsProps) {
  const calculateAchievements = () => {
    const winningTrades = trades.filter((trade) => trade.outcome === 'win').length;
    const totalTrades = trades.length;
    const winRate = totalTrades > 0 ? (winningTrades / totalTrades) * 100 : 0;
    
    const totalReturn = trades.reduce((acc, trade) => {
      if (trade.outcome === 'breakeven') return acc;
      return acc + (trade.outcome === 'win' ? trade.returnPercent : -trade.lossPercent);
    }, 0);

    const consecutiveWins = trades.reduce((acc, trade, i) => {
      if (i === 0) return trade.outcome === 'win' ? 1 : 0;
      if (trade.outcome !== 'win') return 0;
      return trades[i - 1].outcome === 'win' ? acc + 1 : 1;
    }, 0);

    return [
      {
        type: 'streak',
        title: 'Win Streak Master',
        description: 'Achieve a streak of winning trades',
        progress: consecutiveWins,
        target: 5,
        unlocked: consecutiveWins >= 5,
      },
      {
        type: 'winRate',
        title: 'Consistent Trader',
        description: 'Maintain a high win rate',
        progress: Math.round(winRate),
        target: 65,
        unlocked: winRate >= 65,
      },
      {
        type: 'profit',
        title: 'Profit Hunter',
        description: 'Achieve significant total returns',
        progress: Math.round(totalReturn),
        target: 100,
        unlocked: totalReturn >= 100,
      },
      {
        type: 'milestone',
        title: 'Century Club',
        description: 'Complete 100 trades',
        progress: totalTrades,
        target: 100,
        unlocked: totalTrades >= 100,
      },
    ];
  };

  const achievements = calculateAchievements();
  const progressPercentage = (experience / nextLevelExp) * 100;

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold text-white mb-6">Achievements</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {achievements.map((achievement) => (
          <AchievementBadge
            key={achievement.title}
            {...achievement}
          />
        ))}
      </div>

      <div className="flex items-center justify-center mb-2">
        <div className="flex items-center space-x-2">
          <Award className="w-6 h-6 text-[#3B82F6]" />
          <span className="text-lg font-semibold text-white">{traderBadge}</span>
        </div>
      </div>
      
      <div className="flex items-center justify-center text-sm text-gray-400 mb-4">
        {experience} / {nextLevelExp} XP
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="h-4 rounded-full overflow-hidden bg-gradient-to-r from-black to-gray-800">
          <div
            className="h-full transition-all duration-500 relative overflow-hidden"
            style={{ width: `${progressPercentage}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a] to-[#3B82F6] animate-pulse shadow-[0_0_15px_rgba(59,130,246,0.5)]">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImEiIHgxPSIwIiB5MT0iMCIgeDI9IjEwMCUiIHkyPSIwIj48c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojM0I4MkY2O3N0b3Atb3BhY2l0eTouMyIvPjxzdG9wIG9mZnNldD0iNTAlIiBzdHlsZT0ic3RvcC1jb2xvcjojM0I4MkY2O3N0b3Atb3BhY2l0eTouNSIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3R5bGU9InN0b3AtY29sb3I6IzNCODJGNjtzdG9wLW9wYWNpdHk6LjMiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cGF0aCBkPSJNMCAwaDIwMHYyMDBIMHoiIGZpbGw9InVybCgjYSkiLz48L3N2Zz4=')]"
                style={{
                  backgroundSize: '200% 100%',
                  animation: 'flame 2s linear infinite',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}