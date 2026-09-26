import React from 'react';
import { Search, Lock } from 'lucide-react';
import { UserProfile } from '../types/story';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  userProfile: UserProfile;
  onOpenParentArea: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPath,
  onNavigate,
  userProfile,
  onOpenParentArea
}) => {
  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Stories', path: '/stories' },
    { label: 'Categories', path: '/categories' },
    { label: 'Read Aloud', path: '/listen/cloudy-night' },
    { label: 'My Stories', path: '/favorites' },
    { label: 'Create Story', path: '/create' }
  ];

  const isCurrentActive = (itemPath: string) => {
    if (itemPath === '/' && currentPath === '/') return true;
    if (itemPath !== '/' && currentPath.startsWith(itemPath)) return true;
    if (itemPath.startsWith('/listen') && currentPath.startsWith('/listen')) return true;
    return false;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#FFF9EE]/90 backdrop-blur-md shadow-[0_8px_24px_-4px_rgba(38,50,56,0.08)] border-b border-[#006590]/5">
      <div className="h-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between gap-4">
        {/* Brand Logo & Name */}
        <button
          onClick={() => onNavigate('/')}
          className="flex items-center gap-3 shrink-0 text-left cursor-pointer group"
          aria-label="WonderTales Home"
        >
          <img
            alt="WonderTales Storybook Logo"
            className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBFKc1Hq6fJBS8WypgiuuPCaaQz6o9S19kIcrDqd34qj5z4MpB0mFVQkdVh8uLzKF4gN96o9qTaBssqnGfpbHbpuv1JagT_COG6N6d_e6sjUcG3hB8W6Gxph2TyHbn_Vd4XiPTWBZp6vaniTL4BE7-cZ2K4379xBgkOPStpCpDgmHI1vSWF67AmG3aZyV4U0U8jbhcv48MrZI9I7rKuJVFCLVS9TDK5BEpVl0SItfJHyuju9CJVL6HvmA"
          />
          <span className="font-['Quicksand'] font-bold text-2xl text-[#006590] tracking-tight hidden sm:inline">
            WonderTales
          </span>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1.5 bg-[#ffffff]/80 px-3 py-1.5 rounded-full shadow-[0_2px_8px_rgba(38,50,56,0.04)] border border-[#e3f0f8]">
          {navItems.map((item) => {
            const active = isCurrentActive(item.path);
            return (
              <button
                key={item.path}
                onClick={() => onNavigate(item.path)}
                className={`px-3.5 py-1.5 rounded-full text-sm font-bold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                  active
                    ? 'bg-[#6ec6ff] text-[#005176] shadow-sm'
                    : 'text-[#3f484f] hover:text-[#006590] hover:bg-[#e9f6fd]/60'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Action Controls & Profile */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          {/* Search Button */}
          <button
            onClick={() => onNavigate('/search')}
            aria-label="Search tales"
            className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-full bg-[#ffffff] text-[#006590] shadow-[0_2px_8px_rgba(38,50,56,0.06)] hover:bg-[#e9f6fd] transition-all cursor-pointer"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Parent Area Button */}
          <button
            onClick={onOpenParentArea}
            className="flex items-center gap-1.5 px-3 sm:px-3.5 py-2 rounded-full bg-[#e5deff] text-[#180065] hover:bg-[#c7bfff] transition-all duration-200 shadow-[0_2px_6px_rgba(92,75,195,0.12)] cursor-pointer text-xs sm:text-sm font-bold whitespace-nowrap"
          >
            <Lock className="w-4 h-4 text-[#5c4bc3]" />
            <span>Parent Area 🛡️</span>
          </button>

          {/* Child Profile Button */}
          <button
            onClick={() => onNavigate('/profile')}
            className="flex items-center gap-2 pl-1 py-1 pr-3 rounded-full bg-[#ffffff] shadow-[0_4px_12px_rgba(38,50,56,0.06)] ring-2 ring-[#6ec6ff]/40 hover:ring-[#6ec6ff] transition-all cursor-pointer"
            aria-label="Alex's Profile"
          >
            <img
              alt="Alex Profile"
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover"
              src={userProfile.avatar}
            />
            <span className="font-bold text-xs sm:text-sm text-[#006590]">
              {userProfile.name}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
