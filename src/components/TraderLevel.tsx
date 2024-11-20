import React from 'react';
import { Award } from 'lucide-react';

interface TraderLevelProps {
  level: number;
  experience: number;
  nextLevelExp: number;
}

export default function TraderLevel({ level, experience, nextLevelExp }: TraderLevelProps) {
  const progressPercentage = (experience / nextLevelExp) * 100;

  return (
    <div className="glass-card p-6 rounded-xl mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="bg-[#3B82F6]/20 p-3 rounded-lg">
            <Award className="w-8 h-8 text-[#3B82F6]" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Level {level}</h2>
            <p className="text-gray-400">Trading Master</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-400">Next Level</p>
          <p className="text-lg font-semibold text-white">
            {experience} / {nextLevelExp} XP
          </p>
        </div>
      </div>
      <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#3B82F6] transition-all duration-500"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </div>
  );
}