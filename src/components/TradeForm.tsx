import React, { useState, useRef, useEffect } from 'react';
import { ArrowUpDown, Target, Compass, Check, X, Calendar } from 'lucide-react';

interface TradeFormProps {
  onAddTrade: (trade: {
    pair: string;
    date: string;
    strategy: string;
    returnPercent: number;
    lossPercent: number;
    direction: 'Long' | 'Short';
    outcome: 'win' | 'loss' | 'breakeven';
  }) => void;
}

export default function TradeForm({ onAddTrade }: TradeFormProps) {
  const [formData, setFormData] = useState({
    pair: '',
    date: new Date().toISOString().split('T')[0],
    strategy: 'RT-1',
    returnPercent: '',
    lossPercent: '',
    direction: 'Long' as 'Long' | 'Short',
    outcome: 'win' as 'win' | 'loss' | 'breakeven',
  });

  const [showPairDropdown, setShowPairDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const tradingPairs = [
    'AUD/CAD', 'AUD/CHF', 'AUD/JPY', 'AUD/NZD', 'AUD/USD', 'AUS200',
    'BCOUSD', 'CAD/CHF', 'CHF/JPY', 'COPPER', 'CORN', 'DAX30', 'DJI',
    'EUR/AUD', 'EUR/CAD', 'EUR/CHF', 'EUR/GBP', 'EUR/JPY', 'EUR/NZD', 'EUR/USD',
    'GBP/AUD', 'GBP/CAD', 'GBP/CHF', 'GBP/JPY', 'GBP/NZD', 'GBP/USD',
    'GOLD', 'JP225', 'NAS100', 'NATGAS', 'NI225', 'NZD/CAD', 'NZD/CHF', 'NZD/JPY', 'NZD/USD',
    'SILVER', 'SOYBN', 'SPX', 'SUGAR', 'UK100', 'US30', 'USD/CAD', 'USD/CHF',
    'USD/CNH', 'USD/JPY', 'USD/MXN', 'USD/SGD', 'WHEAT', 'WTI'
  ];

  const filteredPairs = tradingPairs.filter(pair =>
    pair.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowPairDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handlePairSelect = (pair: string) => {
    setFormData(prev => ({ ...prev, pair }));
    setSearchTerm(pair);
    setShowPairDropdown(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.pair) return;
    
    const returnPercent = formData.returnPercent === '' ? 0 : Number(formData.returnPercent);
    const lossPercent = formData.lossPercent === '' ? 0 : Number(formData.lossPercent);
    
    onAddTrade({
      ...formData,
      returnPercent,
      lossPercent,
    });
    
    setFormData({
      pair: '',
      date: new Date().toISOString().split('T')[0],
      strategy: 'RT-1',
      returnPercent: '',
      lossPercent: '',
      direction: 'Long',
      outcome: 'win',
    });
    setSearchTerm('');
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-white mb-6">Add New Trade</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-2" ref={dropdownRef}>
            <label className="flex items-center text-sm font-medium text-gray-300">
              <ArrowUpDown className="w-4 h-4 mr-2 text-[#3B82F6]" />
              Trading Pair
            </label>
            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setShowPairDropdown(true);
                }}
                onFocus={() => setShowPairDropdown(true)}
                className="w-full px-4 py-2 rounded-lg bg-[#111827] border-gray-800 text-white focus:ring-2 focus:ring-[#3B82F6] focus:border-[#3B82F6]"
                placeholder="Search pair..."
                required
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm('');
                    setFormData(prev => ({ ...prev, pair: '' }));
                    inputRef.current?.focus();
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              {showPairDropdown && (
                <div className="absolute z-50 w-full mt-1 max-h-60 overflow-auto rounded-lg bg-[#1F2937] border border-gray-800 shadow-lg">
                  {filteredPairs.map((pair) => (
                    <button
                      key={pair}
                      type="button"
                      onClick={() => handlePairSelect(pair)}
                      className="w-full px-4 py-2 text-left text-white hover:bg-[#374151] focus:bg-[#374151] focus:outline-none"
                    >
                      {pair}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="flex items-center text-sm font-medium text-gray-300">
              <Calendar className="w-4 h-4 mr-2 text-[#3B82F6]" />
              Date
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  date: e.target.value,
                }))
              }
              className="w-full px-4 py-2 rounded-lg bg-[#111827] border-gray-800 text-white focus:ring-2 focus:ring-[#3B82F6] focus:border-[#3B82F6]"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center text-sm font-medium text-gray-300">
              <Target className="w-4 h-4 mr-2 text-[#3B82F6]" />
              Strategy
            </label>
            <select
              value={formData.strategy}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  strategy: e.target.value,
                }))
              }
              className="w-full px-4 py-2 rounded-lg bg-[#111827] border-gray-800 text-white focus:ring-2 focus:ring-[#3B82F6] focus:border-[#3B82F6]"
              required
            >
              <option value="RT-1">RT-1</option>
              <option value="RT-2">RT-2</option>
              <option value="Reversal">Reversal</option>
              <option value="Swing">Swing</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="flex items-center text-sm font-medium text-gray-300">
              <Target className="w-4 h-4 mr-2 text-[#3B82F6]" />
              Win %
            </label>
            <div className="relative">
              <input
                type="number"
                step="0.01"
                value={formData.returnPercent}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    returnPercent: e.target.value,
                  }))
                }
                className="w-full pl-4 pr-8 py-2 rounded-lg bg-[#111827] border-gray-800 focus:ring-2 focus:ring-[#3B82F6] focus:border-[#3B82F6] text-white"
                min="0"
                placeholder="0"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="flex items-center text-sm font-medium text-gray-300">
              <Target className="w-4 h-4 mr-2 text-[#3B82F6]" />
              Loss %
            </label>
            <div className="relative">
              <input
                type="number"
                step="0.01"
                value={formData.lossPercent}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    lossPercent: e.target.value,
                  }))
                }
                className="w-full pl-4 pr-8 py-2 rounded-lg bg-[#111827] border-gray-800 focus:ring-2 focus:ring-[#3B82F6] focus:border-[#3B82F6] text-white"
                min="0"
                placeholder="0"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="flex items-center text-sm font-medium text-gray-300">
              <Compass className="w-4 h-4 mr-2 text-[#3B82F6]" />
              Direction
            </label>
            <select
              value={formData.direction}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  direction: e.target.value as 'Long' | 'Short',
                }))
              }
              className="w-full px-4 py-2 rounded-lg bg-[#111827] border-gray-800 text-white focus:ring-2 focus:ring-[#3B82F6] focus:border-[#3B82F6]"
              required
            >
              <option value="Long">Long</option>
              <option value="Short">Short</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="flex items-center text-sm font-medium text-gray-300">
              <Check className="w-4 h-4 mr-2 text-[#3B82F6]" />
              Outcome
            </label>
            <select
              value={formData.outcome}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  outcome: e.target.value as 'win' | 'loss' | 'breakeven',
                }))
              }
              className="w-full px-4 py-2 rounded-lg bg-[#111827] border-gray-800 text-white focus:ring-2 focus:ring-[#3B82F6] focus:border-[#3B82F6]"
              required
            >
              <option value="win">Win</option>
              <option value="loss">Loss</option>
              <option value="breakeven">Breakeven</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-[#3B82F6] text-white rounded-lg hover:bg-[#2563eb] transition-colors"
          >
            Add Trade
          </button>
        </div>
      </form>
    </div>
  );
}