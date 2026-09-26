import React from 'react';
import { BookOpen, Star, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string) => void;
  onOpenParentArea: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenParentArea }) => {
  return (
    <footer className="w-full bg-[#e9f6fd] mt-20 pt-16 pb-20 xl:pb-12 shadow-[0_-8px_24px_-4px_rgba(38,50,56,0.04)] border-t border-[#006590]/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12">
          {/* Brand Column */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <BookOpen className="w-7 h-7 text-[#006590]" />
              <span className="font-['Quicksand'] font-bold text-2xl text-[#006590]">WonderTales</span>
            </div>
            <p className="text-sm text-[#607080] leading-relaxed">
              Crafted with wonder, warmth, and bedtime magic for curious minds aged 4 to 10.
            </p>
            <div className="flex items-center gap-1.5 text-[#FFD966] pt-1">
              <Star className="w-5 h-5 fill-[#FFD966]" />
              <Star className="w-5 h-5 fill-[#FFD966]" />
              <Star className="w-5 h-5 fill-[#FFD966]" />
              <Star className="w-5 h-5 fill-[#FFD966]" />
              <span className="text-xl">✨</span>
            </div>
          </div>

          {/* Magical Shelves */}
          <div className="space-y-3">
            <h3 className="font-bold text-base text-[#111d23]">Magical Shelves</h3>
            <ul className="space-y-2 text-sm text-[#3f484f]">
              <li>
                <button
                  onClick={() => onNavigate('/stories/bedtime')}
                  className="hover:text-[#006590] transition-colors cursor-pointer text-left"
                >
                  Bedtime Tales
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/stories/adventure')}
                  className="hover:text-[#006590] transition-colors cursor-pointer text-left"
                >
                  Space &amp; Mountain Quests
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/stories/animals')}
                  className="hover:text-[#006590] transition-colors cursor-pointer text-left"
                >
                  Animal Friends
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/stories/fantasy')}
                  className="hover:text-[#006590] transition-colors cursor-pointer text-left"
                >
                  Fairy Forest Stories
                </button>
              </li>
            </ul>
          </div>

          {/* For Parents & Schools */}
          <div className="space-y-3">
            <h3 className="font-bold text-base text-[#111d23]">For Parents &amp; Schools</h3>
            <ul className="space-y-2 text-sm text-[#3f484f]">
              <li>
                <button
                  onClick={onOpenParentArea}
                  className="hover:text-[#006590] transition-colors cursor-pointer text-left"
                >
                  Parent Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/profile')}
                  className="hover:text-[#006590] transition-colors cursor-pointer text-left"
                >
                  Reading Achievements
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/listen/cloudy-night')}
                  className="hover:text-[#006590] transition-colors cursor-pointer text-left"
                >
                  Bedtime Timer Mode
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/create')}
                  className="hover:text-[#006590] transition-colors cursor-pointer text-left"
                >
                  Story Creator Workshop
                </button>
              </li>
            </ul>
          </div>

          {/* Child-Safe Promise */}
          <div className="space-y-3">
            <div className="p-4 rounded-2xl bg-[#ffffff] shadow-[0_4px_16px_rgba(38,50,56,0.04)] border border-[#e3f0f8]">
              <div className="flex items-center gap-2 text-[#006590] mb-2">
                <ShieldCheck className="w-5 h-5 text-[#006590]" />
                <h4 className="font-bold text-sm">Child-Safe Promise</h4>
              </div>
              <p className="text-xs text-[#607080] leading-relaxed">
                100% ad-free, COPPA-certified, with no tracking, external social feeds, or in-app purchases without parent verification.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Copyright bar */}
        <div className="pt-8 border-t border-[#006590]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-xs text-[#607080]">
            &copy; 2026 WonderTales Studio. Sprinkled with bedtime dreams &amp; starry wonders.
          </p>
          <div className="flex items-center gap-6 text-xs text-[#607080]">
            <span className="hover:text-[#006590] cursor-pointer">Privacy Policy</span>
            <span className="hover:text-[#006590] cursor-pointer">Terms of Magic</span>
            <span className="hover:text-[#006590] cursor-pointer">Support Haven</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
