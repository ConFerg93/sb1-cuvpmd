import React from 'react';
import { DollarSign, Percent, CalendarClock, PiggyBank } from 'lucide-react';

interface InvestmentFormProps {
  initialInvestment: number;
  monthlyContribution: number;
  annualInterest: number;
  investmentDuration: number;
  onInputChange: (name: string, value: number) => void;
}

export default function InvestmentForm({
  initialInvestment,
  monthlyContribution,
  annualInterest,
  investmentDuration,
  onInputChange,
}: InvestmentFormProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <label className="flex items-center text-sm font-medium text-gray-300">
          <DollarSign className="w-4 h-4 mr-2 text-[#3B82F6]" />
          Initial Investment
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
          <input
            type="number"
            value={initialInvestment}
            onChange={(e) => onInputChange('initialInvestment', Number(e.target.value))}
            className="w-full pl-8 pr-4 py-2 rounded-lg focus:ring-2 focus:ring-[#3B82F6] focus:border-[#3B82F6] text-white"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="flex items-center text-sm font-medium text-gray-300">
          <PiggyBank className="w-4 h-4 mr-2 text-[#3B82F6]" />
          Monthly Contribution
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
          <input
            type="number"
            value={monthlyContribution}
            onChange={(e) => onInputChange('monthlyContribution', Number(e.target.value))}
            className="w-full pl-8 pr-4 py-2 rounded-lg focus:ring-2 focus:ring-[#3B82F6] focus:border-[#3B82F6] text-white"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="flex items-center text-sm font-medium text-gray-300">
          <Percent className="w-4 h-4 mr-2 text-[#3B82F6]" />
          Annual Interest Rate
        </label>
        <div className="relative">
          <input
            type="number"
            value={annualInterest}
            onChange={(e) => onInputChange('annualInterest', Number(e.target.value))}
            step="0.1"
            className="w-full pl-4 pr-8 py-2 rounded-lg focus:ring-2 focus:ring-[#3B82F6] focus:border-[#3B82F6] text-white"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
        </div>
      </div>

      <div className="space-y-2">
        <label className="flex items-center text-sm font-medium text-gray-300">
          <CalendarClock className="w-4 h-4 mr-2 text-[#3B82F6]" />
          Kids Age
        </label>
        <div className="relative">
          <input
            type="number"
            value={investmentDuration}
            onChange={(e) => onInputChange('investmentDuration', Number(e.target.value))}
            className="w-full pl-4 pr-12 py-2 rounded-lg focus:ring-2 focus:ring-[#3B82F6] focus:border-[#3B82F6] text-white"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">years</span>
        </div>
      </div>
    </div>
  );
}