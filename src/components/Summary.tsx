import React from 'react';
import { TrendingUp, PiggyBank, Coins } from 'lucide-react';

interface SummaryProps {
  finalBalance: number;
  totalContributions: number;
  totalInterest: number;
}

export default function Summary({
  finalBalance,
  totalContributions,
  totalInterest,
}: SummaryProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="glass-card p-6 rounded-xl">
        <div className="flex items-center space-x-3">
          <div className="bg-[#3B82F6]/20 p-2 rounded-lg">
            <TrendingUp className="w-6 h-6 text-[#3B82F6]" />
          </div>
          <div>
            <p className="text-sm text-[#3B82F6] font-medium">Final Balance</p>
            <p className="text-2xl font-bold text-white">
              {formatCurrency(finalBalance)}
            </p>
          </div>
        </div>
      </div>

      <div className="glass-card p-6 rounded-xl">
        <div className="flex items-center space-x-3">
          <div className="bg-[#22c55e]/20 p-2 rounded-lg">
            <PiggyBank className="w-6 h-6 text-[#22c55e]" />
          </div>
          <div>
            <p className="text-sm text-[#22c55e] font-medium">Total Contributions</p>
            <p className="text-2xl font-bold text-white">
              {formatCurrency(totalContributions)}
            </p>
          </div>
        </div>
      </div>

      <div className="glass-card p-6 rounded-xl">
        <div className="flex items-center space-x-3">
          <div className="bg-[#a855f7]/20 p-2 rounded-lg">
            <Coins className="w-6 h-6 text-[#a855f7]" />
          </div>
          <div>
            <p className="text-sm text-[#a855f7] font-medium">Total Interest</p>
            <p className="text-2xl font-bold text-white">
              {formatCurrency(totalInterest)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}