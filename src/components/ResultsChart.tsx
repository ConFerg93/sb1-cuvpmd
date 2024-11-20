import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface DataPoint {
  year: number;
  balance: number;
  contributions: number;
  interest: number;
}

interface ResultsChartProps {
  data: DataPoint[];
}

export default function ResultsChart({ data }: ResultsChartProps) {
  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`;
    }
    return `$${value}`;
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-card p-4 rounded-lg shadow-lg">
          <p className="font-semibold mb-2 text-white">Year {label}</p>
          <p className="text-[#3B82F6]">
            Total: {formatCurrency(payload[0].value)}
          </p>
          <p className="text-[#22c55e]">
            Contributions: {formatCurrency(payload[1].value)}
          </p>
          <p className="text-[#a855f7]">
            Interest: {formatCurrency(payload[2].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <XAxis 
            dataKey="year"
            tickFormatter={(value) => `Year ${value}`}
            stroke="#9CA3AF"
          />
          <YAxis
            tickFormatter={(value) => formatCurrency(value)}
            stroke="#9CA3AF"
            width={80}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="balance"
            stackId="1"
            stroke="#3B82F6"
            fill="#3B82F6"
            fillOpacity={0.6}
          />
          <Area
            type="monotone"
            dataKey="contributions"
            stackId="2"
            stroke="#22c55e"
            fill="#22c55e"
            fillOpacity={0.6}
          />
          <Area
            type="monotone"
            dataKey="interest"
            stackId="3"
            stroke="#a855f7"
            fill="#a855f7"
            fillOpacity={0.6}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}