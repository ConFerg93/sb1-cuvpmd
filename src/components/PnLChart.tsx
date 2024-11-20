import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Trade } from '../App';

interface PnLChartProps {
  trades: Trade[];
}

export default function PnLChart({ trades }: PnLChartProps) {
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
    }).replace(/\//g, '-');
  };

  const chartData = trades
    .sort((a, b) => a.timestamp - b.timestamp)
    .reduce((acc: { date: string; pnl: number }[], trade) => {
      const lastPnL = acc.length > 0 ? acc[acc.length - 1].pnl : 0;
      const pnl = lastPnL + (trade.outcome === 'win' ? trade.returnPercent : -trade.lossPercent);
      
      return [
        ...acc,
        {
          date: formatDate(trade.timestamp),
          pnl,
        },
      ];
    }, []);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-card p-4 rounded-lg shadow-lg">
          <p className="font-semibold mb-2 text-white">{label}</p>
          <p className="text-[#3B82F6]">
            P&L: {payload[0].value.toFixed(1)}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-white mb-6">Performance Chart</h2>
      <div className="w-full h-[400px]">
        <ResponsiveContainer>
          <LineChart 
            data={chartData}
            margin={{ top: 10, right: 30, left: 10, bottom: 10 }}
          >
            <XAxis
              dataKey="date"
              stroke="#9CA3AF"
              tick={{ fill: '#9CA3AF' }}
              padding={{ left: 30, right: 30 }}
            />
            <YAxis
              stroke="#9CA3AF"
              tick={{ fill: '#9CA3AF' }}
              tickFormatter={(value) => `${value.toFixed(1)}%`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="pnl"
              stroke="#3B82F6"
              strokeWidth={2}
              dot={false}
              filter="url(#glow)"
            />
            <defs>
              <filter id="glow" height="300%" width="300%" x="-100%" y="-100%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
                <feOffset in="blur" dx="0" dy="0" result="offsetBlur"/>
                <feMerge>
                  <feMergeNode in="offsetBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}