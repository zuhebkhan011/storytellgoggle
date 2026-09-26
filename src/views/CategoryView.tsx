import React from 'react';
import { ArrowLeft, Sparkles, BookOpen, Clock } from 'lucide-react';
import { Story, StoryCategory, UserProfile } from '../types/story';
import { StoryCard } from '../components/StoryCard';
import { CATEGORIES_DATA } from '../data/mockStories';

interface CategoryViewProps {
  category: StoryCategory;
  stories: Story[];
  userProfile: UserProfile;
  onNavigate: (path: string) => void;
  onToggleFavorite: (storyId: string) => void;
}

export const CategoryView: React.FC<CategoryViewProps> = ({
  category,
  stories,
  userProfile,
  onNavigate,
  onToggleFavorite
}) => {
  const currentCategoryData =
    CATEGORIES_DATA.find((c) => c.id === category) || CATEGORIES_DATA[0];

  const categoryStories = stories.filter((s) => s.category === category);

  return (
    <div className="flex flex-col w-full pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8 space-y-10">
        {/* Back and category switch tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <button
            onClick={() => onNavigate('/stories')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#ffffff] hover:bg-[#e9f6fd] text-[#006590] text-sm font-bold shadow-sm transition-colors border border-[#e3f0f8] cursor-pointer w-fit"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>All Stories</span>
          </button>

          {/* Quick Category Switcher */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
            {CATEGORIES_DATA.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onNavigate(`/stories/${cat.id}`)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  cat.id === category
                    ? 'bg-[#006590] text-[#ffffff] shadow-sm'
                    : 'bg-[#ffffff] text-[#607080] hover:text-[#111d23] border border-[#e3f0f8]'
                }`}
              >
                <span>{cat.emoji} {cat.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Themed Category Banner */}
        <div
          className={`rounded-3xl p-8 sm:p-12 shadow-sm border border-[#e3f0f8] relative overflow-hidden ${currentCategoryData.bgClass}`}
        >
          <div className="relative z-10 max-w-2xl space-y-3">
            <span className="text-3xl sm:text-4xl block mb-2">{currentCategoryData.emoji}</span>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ffffff]/90 text-xs font-bold text-[#006590]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>WonderTales Shelf</span>
            </div>
            <h1 className="font-['Quicksand'] font-bold text-3xl sm:text-4xl text-[#111d23]">
              {currentCategoryData.name} Adventures
            </h1>
            <p className="text-base text-[#3f484f] leading-relaxed">
              {currentCategoryData.description}
            </p>
          </div>
        </div>

        {/* Stories in this category */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-['Quicksand'] font-bold text-2xl text-[#111d23]">
              Tales in this World ({categoryStories.length})
            </h2>
          </div>

          {categoryStories.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {categoryStories.map((st) => (
                <StoryCard
                  key={st.id}
                  story={st}
                  isFavorite={userProfile.favorites.includes(st.id)}
                  onToggleFavorite={onToggleFavorite}
                  onRead={(id) => onNavigate(`/read/${id}`)}
                  onListen={(id) => onNavigate(`/listen/${id}`)}
                  onSelectStory={(id) => onNavigate(`/story/${id}`)}
                />
              ))}
            </div>
          ) : (
            <div className="bg-[#ffffff] rounded-3xl p-12 text-center max-w-md mx-auto my-8 shadow-sm border border-[#e3f0f8]">
              <span className="text-5xl mb-4 block">✨</span>
              <h3 className="font-['Quicksand'] font-bold text-xl text-[#111d23] mb-2">
                More tales arriving soon!
              </h3>
              <p className="text-sm text-[#607080] mb-6">
                Our storytellers are writing new {currentCategoryData.name} adventures every week.
              </p>
              <button
                onClick={() => onNavigate('/create')}
                className="px-6 py-2.5 rounded-full bg-[#006590] text-[#ffffff] font-bold text-sm"
              >
                Create your own in this category ✨
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
