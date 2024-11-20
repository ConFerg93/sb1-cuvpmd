import React from 'react';
import { Trophy, Target, TrendingUp, Users, Zap } from 'lucide-react';

interface AchievementBadgeProps {
  type: string;
  title: string;
  description: string;
  progress: number;
  target: number;
  unlocked: boolean;
}

export default function AchievementBadge({
  type,
  title,
  description,
  progress,
  target,
  unlocked,
}: AchievementBadgeProps) {
  const icons = {
    streak: Trophy,
    winRate: Target,
    profit: TrendingUp,
    social: Users,
    milestone: Zap,
  };

  const Icon = icons[type as keyof typeof icons] || Trophy;
  const progressPercentage = Math.min((progress / target) * 100, 100);

  return (
    <div className={`glass-card p-4 rounded-xl relative overflow-hidden ${
      unlocked ? 'border-[#3B82F6]' : 'border-gray-800'
    }`}>
      <div className="flex items-start space-x-4">
        <div className={`p-2 rounded-lg ${
          unlocked ? 'bg-[#3B82F6]/20 text-[#3B82F6]' : 'bg-gray-800/20 text-gray-400'
        }`}>
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <h3 className={`font-semibold ${unlocked ? 'text-white' : 'text-gray-400'}`}>
            {title}
          </h3>
          <p className="text-sm text-gray-400 mb-2">{description}</p>
          <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#3B82F6] transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <p className="text-xs text-gray-400 mt-1">
            {progress} / {target}
          </p>
        </div>
      </div>
      {unlocked && (
        <div className="absolute -right-6 -top-6 w-24 h-24 rotate-45">
          <div className="w-full h-full bg-[#3B82F6]/20" />
        </div>
      )}
    </div>
  );
}