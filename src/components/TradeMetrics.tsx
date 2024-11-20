import React from 'react';
import { Target, TrendingUp, Scale, Percent } from 'lucide-react';
import { Trade } from '../App';

interface TradeMetricsProps {
  trades: Trade[];
}

export default function TradeMetrics({ trades }: TradeMetricsProps) {
  const calculateMetrics = () => {
    if (trades.length === 0) {
      return {
        strikeRate: 0,
        averageRR: 0,
        winLossRatio: 0,
        totalReturn: 0,
      };
    }

    const wins = trades.filter((trade) => trade.outcome === 'win').length;
    const losses = trades.filter((trade) => trade.outcome === 'loss').length;
    const totalTrades = trades.filter((trade) => trade.outcome !== 'breakeven').length;
    const strikeRate = totalTrades > 0 ? (wins / totalTrades) * 100 : 0;

    // Calculate average win % and average loss %
    const winningTrades = trades.filter((trade) => trade.outcome === 'win');
    const losingTrades = trades.filter((trade) => trade.outcome === 'loss');

    const avgWinPercent = winningTrades.length > 0
      ? winningTrades.reduce((acc, trade) => acc + trade.returnPercent, 0) / winningTrades.length
      : 0;

    const avgLossPercent = losingTrades.length > 0
      ? losingTrades.reduce((acc, trade) => acc + trade.lossPercent, 0) / losingTrades.length
      : 0;

    // Calculate R:R ratio (average win % / average loss %)
    const averageRR = avgLossPercent > 0 ? avgWinPercent / avgLossPercent : avgWinPercent;

    const winLossRatio = losses > 0 ? wins / losses : wins || 0;

    const totalReturn = trades.reduce((acc, trade) => {
      if (trade.outcome === 'breakeven') return acc;
      return acc + (trade.outcome === 'win' ? trade.returnPercent : -trade.lossPercent);
    }, 0);

    return {
      strikeRate,
      averageRR,
      winLossRatio,
      totalReturn,
    };
  };

  const metrics = calculateMetrics();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="glass-card p-6 rounded-xl">
        <div className="flex flex-col items-center text-center">
          <div className="bg-[#3B82F6]/20 p-2 rounded-lg mb-3">
            <Target className="w-6 h-6 text-[#3B82F6]" />
          </div>
          <p className="text-sm text-[#3B82F6] font-medium mb-1">Strike Rate</p>
          <p className="text-2xl font-bold text-white">
            {metrics.strikeRate.toFixed(1)}%
          </p>
        </div>
      </div>

      <div className="glass-card p-6 rounded-xl">
        <div className="flex flex-col items-center text-center">
          <div className="bg-[#22c55e]/20 p-2 rounded-lg mb-3">
            <TrendingUp className="w-6 h-6 text-[#22c55e]" />
          </div>
          <p className="text-sm text-[#22c55e] font-medium mb-1">Avg R:R</p>
          <p className="text-2xl font-bold text-white">
            {metrics.averageRR.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="glass-card p-6 rounded-xl">
        <div className="flex flex-col items-center text-center">
          <div className="bg-[#a855f7]/20 p-2 rounded-lg mb-3">
            <Scale className="w-6 h-6 text-[#a855f7]" />
          </div>
          <p className="text-sm text-[#a855f7] font-medium mb-1">W/L Ratio</p>
          <p className="text-2xl font-bold text-white">
            {metrics.winLossRatio.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="glass-card p-6 rounded-xl">
        <div className="flex flex-col items-center text-center">
          <div className="bg-[#eab308]/20 p-2 rounded-lg mb-3">
            <Percent className="w-6 h-6 text-[#eab308]" />
          </div>
          <p className="text-sm text-[#eab308] font-medium mb-1">Total Return</p>
          <p className="text-2xl font-bold text-white">
            {metrics.totalReturn.toFixed(2)}%
          </p>
        </div>
      </div>
    </div>
  );
}