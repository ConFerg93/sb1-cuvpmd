import React from 'react';
import { Trade } from '../App';

interface StrategyPerformanceProps {
  trades: Trade[];
}

interface StrategyMetrics {
  totalTrades: number;
  winRate: number;
  averageReturn: number;
  totalReturn: number;
}

export default function StrategyPerformance({ trades }: StrategyPerformanceProps) {
  const calculateStrategyMetrics = () => {
    const strategies = ['RT-1', 'RT-2', 'Reversal', 'Swing'];
    const metrics: Record<string, StrategyMetrics> = {};

    strategies.forEach((strategy) => {
      const strategyTrades = trades.filter((trade) => trade.strategy === strategy);
      const wins = strategyTrades.filter((trade) => trade.outcome === 'win').length;

      const totalReturn = strategyTrades.reduce((acc, trade) => {
        if (trade.outcome === 'breakeven') return acc;
        return acc + (trade.outcome === 'win' ? trade.returnPercent : -trade.lossPercent);
      }, 0);

      const validTrades = strategyTrades.filter(trade => trade.outcome !== 'breakeven');

      metrics[strategy] = {
        totalTrades: strategyTrades.length,
        winRate: validTrades.length > 0 ? (wins / validTrades.length) * 100 : 0,
        averageReturn: validTrades.length > 0 ? totalReturn / validTrades.length : 0,
        totalReturn: totalReturn
      };
    });

    return metrics;
  };

  const strategyMetrics = calculateStrategyMetrics();

  return (
    <div>
      <h2 className="text-2xl font-semibold text-white mb-6">Strategy Performance</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.entries(strategyMetrics).map(([strategy, metrics]) => (
          <div key={strategy} className="glass-card p-6 rounded-xl">
            <h3 className="text-lg font-semibold text-[#3B82F6] mb-4">{strategy}</h3>
            <div className="space-y-2">
              <div>
                <p className="text-sm text-gray-400">Total Trades</p>
                <p className="text-xl font-bold text-white">{metrics.totalTrades}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Win Rate</p>
                <p className="text-xl font-bold text-white">
                  {metrics.winRate.toFixed(1)}%
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Avg R:R</p>
                <p className="text-xl font-bold text-white">
                  {metrics.averageReturn.toFixed(2)}%
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Total Return</p>
                <p className="text-xl font-bold text-white">
                  {metrics.totalReturn.toFixed(2)}%
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}