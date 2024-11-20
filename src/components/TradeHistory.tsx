import React from 'react';
import { Trash2 } from 'lucide-react';
import { Trade } from '../App';

interface TradeHistoryProps {
  trades: Trade[];
  onRemoveTrade: (id: string) => void;
}

export default function TradeHistory({ trades, onRemoveTrade }: TradeHistoryProps) {
  const formatDate = (dateStr: string) => {
    const [year, month, day] = dateStr.split('-');
    return `${day}-${month}-${year.slice(2)}`;
  };

  if (trades.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-400">No trades recorded yet</p>
      </div>
    );
  }

  const getOutcomeStyle = (outcome: string) => {
    switch (outcome) {
      case 'win':
        return 'bg-[#22c55e]/20 text-[#22c55e]';
      case 'loss':
        return 'bg-[#ef4444]/20 text-[#ef4444]';
      case 'breakeven':
        return 'bg-[#eab308]/20 text-[#eab308]';
      default:
        return '';
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-white mb-6">Trade History</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b border-gray-800">
              <th className="pb-4 text-gray-400 font-medium">Date</th>
              <th className="pb-4 text-gray-400 font-medium">Pair</th>
              <th className="pb-4 text-gray-400 font-medium">Strategy</th>
              <th className="pb-4 text-gray-400 font-medium">Direction</th>
              <th className="pb-4 text-gray-400 font-medium">Return %</th>
              <th className="pb-4 text-gray-400 font-medium">Loss %</th>
              <th className="pb-4 text-gray-400 font-medium">Outcome</th>
              <th className="pb-4 text-gray-400 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {trades.map((trade) => (
              <tr key={trade.id} className="border-b border-gray-800">
                <td className="py-4">{formatDate(trade.date)}</td>
                <td className="py-4">{trade.pair}</td>
                <td className="py-4">{trade.strategy}</td>
                <td className="py-4">{trade.direction}</td>
                <td className="py-4">{trade.returnPercent}%</td>
                <td className="py-4">{trade.lossPercent}%</td>
                <td className="py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getOutcomeStyle(trade.outcome)}`}
                  >
                    {trade.outcome.toUpperCase()}
                  </span>
                </td>
                <td className="py-4">
                  <button
                    onClick={() => onRemoveTrade(trade.id)}
                    className="text-gray-400 hover:text-[#ef4444] transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}