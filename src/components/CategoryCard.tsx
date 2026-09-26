import React from 'react';
import { Moon, Compass, PawPrint, Castle, Heart, Lightbulb } from 'lucide-react';

interface CategoryCardProps {
  id: string;
  name: string;
  subtitle: string;
  emoji: string;
  bgClass: string;
  hoverClass: string;
  iconName: string;
  onClick: () => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  name,
  subtitle,
  emoji,
  bgClass,
  hoverClass,
  iconName,
  onClick
}) => {
  const renderIcon = () => {
    switch (iconName) {
      case 'bedtime':
        return <Moon className="w-6 h-6 text-[#5c4bc3]" />;
      case 'explore':
        return <Compass className="w-6 h-6 text-[#111d23]" />;
      case 'pets':
        return <PawPrint className="w-6 h-6 text-[#006590]" />;
      case 'castle':
        return <Castle className="w-6 h-6 text-[#006590]" />;
      case 'favorite':
        return <Heart className="w-6 h-6 text-[#9e4039]" />;
      case 'lightbulb':
        return <Lightbulb className="w-6 h-6 text-[#5c4bc3]" />;
      default:
        return <span className="text-2xl">{emoji}</span>;
    }
  };

  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center text-center p-5 rounded-3xl ${bgClass} ${hoverClass} transition-all duration-300 shadow-[0_4px_16px_rgba(38,50,56,0.04)] hover:-translate-y-1.5 cursor-pointer border border-[#e3f0f8]/50 group w-full`}
    >
      <div className="w-14 h-14 rounded-2xl bg-[#ffffff] flex items-center justify-center shadow-sm mb-3 group-hover:scale-110 transition-transform">
        {renderIcon()}
      </div>
      <h3 className="font-['Quicksand'] font-bold text-base text-[#111d23]">
        {name}
      </h3>
      <p className="text-xs text-[#607080] mt-0.5">
        {subtitle}
      </p>
    </button>
  );
};
