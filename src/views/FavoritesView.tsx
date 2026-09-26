import React from 'react';
import { Heart, Sparkles, BookOpen, Trash2 } from 'lucide-react';
import { Story, UserProfile } from '../types/story';
import { StoryCard } from '../components/StoryCard';

interface FavoritesViewProps {
  stories: Story[];
  userProfile: UserProfile;
  onNavigate: (path: string) => void;
  onToggleFavorite: (storyId: string) => void;
}

export const FavoritesView: React.FC<FavoritesViewProps> = ({
  stories,
  userProfile,
  onNavigate,
  onToggleFavorite
}) => {
  const favoriteStories = stories.filter((s) => userProfile.favorites.includes(s.id));

  return (
    <div className="flex flex-col w-full pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8 space-y-10">
        {/* Header */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffa69d]/30 text-[#872e29] text-xs font-bold mb-2">
              <Heart className="w-3.5 h-3.5 fill-[#9e4039] text-[#9e4039]" />
              <span>{userProfile.name}&apos;s Favorite Bookshelf</span>
            </div>
            <h1 className="font-['Quicksand'] font-bold text-3xl sm:text-4xl text-[#111d23]">
              My Saved Storybooks 📚
            </h1>
            <p className="text-sm text-[#607080] mt-1">
              Your very own shelf of adventures, bedtime lullabies, and magical characters.
            </p>
          </div>

          <button
            onClick={() => onNavigate('/stories')}
            className="px-6 py-3 rounded-full bg-[#006590] text-[#ffffff] font-bold text-sm shadow-[0_4px_0_#004c6e] hover:brightness-105 active:translate-y-1 transition-all cursor-pointer w-fit"
          >
            + Add More Stories
          </button>
        </header>

        {/* Story Shelf Grid or Magical Empty State */}
        {favoriteStories.length > 0 ? (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {favoriteStories.map((st) => (
                <StoryCard
                  key={st.id}
                  story={st}
                  isFavorite={true}
                  onToggleFavorite={onToggleFavorite}
                  onRead={(id) => onNavigate(`/read/${id}`)}
                  onListen={(id) => onNavigate(`/listen/${id}`)}
                  onSelectStory={(id) => onNavigate(`/story/${id}`)}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-[#ffffff] rounded-3xl p-8 sm:p-14 text-center max-w-xl mx-auto my-8 shadow-sm border border-[#e3f0f8] space-y-6">
            {/* Whimsical Empty Bookshelf Illustration */}
            <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#FFD966]/20 to-[#c8e6ff]/30 rounded-full blur-2xl pointer-events-none" />
              <div className="w-40 h-40 rounded-3xl bg-[#FFF9EE] border-4 border-[#FFD966] flex flex-col items-center justify-center p-4 relative shadow-inner">
                {/* Cute empty shelf graphic */}
                <div className="w-28 h-2 bg-[#d7e4ec] rounded-full mb-3" />
                <span className="text-5xl animate-bounce" style={{ animationDuration: '3s' }}>
                  📖
                </span>
                <div className="w-32 h-2.5 bg-[#FFD966] rounded-full mt-4 shadow-sm" />
                <span className="text-xl absolute top-3 right-4">✨</span>
                <span className="text-xl absolute bottom-3 left-4">🌙</span>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-['Quicksand'] font-bold text-2xl text-[#111d23]">
                Your story shelf is waiting for an adventure!
              </h3>
              <p className="text-sm text-[#607080] max-w-md mx-auto leading-relaxed">
                Whenever you find a story you love, tap the heart button to place it safely here on your magical shelf.
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onNavigate('/stories')}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#006590] text-[#ffffff] font-bold text-sm shadow-[0_4px_0_#004c6e,0_8px_16px_rgba(0,101,144,0.2)] hover:translate-y-0.5 active:translate-y-1 transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Explore Stories to Save</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
