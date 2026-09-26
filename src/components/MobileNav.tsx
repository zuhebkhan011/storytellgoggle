import React from 'react';
import { Home, BookOpen, Headphones, Heart, User, Sparkles } from 'lucide-react';

interface MobileNavProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ currentPath, onNavigate }) => {
  const tabs = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'Stories', path: '/stories', icon: BookOpen },
    { label: 'Listen', path: '/listen/cloudy-night', icon: Headphones },
    { label: 'Create', path: '/create', icon: Sparkles },
    { label: 'Shelf', path: '/favorites', icon: Heart },
    { label: 'Me', path: '/profile', icon: User }
  ];

  const isCurrentActive = (itemPath: string) => {
    if (itemPath === '/' && currentPath === '/') return true;
    if (itemPath !== '/' && currentPath.startsWith(itemPath)) return true;
    return false;
  };

  return (
    <nav className="xl:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#ffffff]/95 backdrop-blur-md border-t border-[#006590]/10 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] px-2 py-2">
      <div className="flex items-center justify-around max-w-lg mx-auto">
        {tabs.map((tab) => {
          const active = isCurrentActive(tab.path);
          const Icon = tab.icon;
          return (
            <button
              key={tab.path}
              onClick={() => onNavigate(tab.path)}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-2xl transition-all cursor-pointer ${
                active
                  ? 'text-[#006590] scale-105 font-bold'
                  : 'text-[#607080] hover:text-[#006590]'
              }`}
            >
              <div
                className={`p-1.5 rounded-full transition-all ${
                  active ? 'bg-[#6ec6ff]/30 text-[#006590]' : ''
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-[11px] mt-0.5 leading-none">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
