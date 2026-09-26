import React, { useState } from 'react';
import { Search, Mic, X, Sparkles, BookOpen } from 'lucide-react';
import { Story, UserProfile } from '../types/story';
import { StoryCard } from '../components/StoryCard';

interface SearchViewProps {
  stories: Story[];
  userProfile: UserProfile;
  onNavigate: (path: string) => void;
  onToggleFavorite: (storyId: string) => void;
}

export const SearchView: React.FC<SearchViewProps> = ({
  stories,
  userProfile,
  onNavigate,
  onToggleFavorite
}) => {
  const [query, setQuery] = useState('');
  const [isListeningMic, setIsListeningMic] = useState(false);

  const suggestedSearches = [
    { label: 'Dragons', emoji: '🐉' },
    { label: 'Animals', emoji: '🦊' },
    { label: 'Bedtime', emoji: '🌙' },
    { label: 'Adventure', emoji: '🚀' },
    { label: 'Funny', emoji: '😄' },
    { label: 'Space', emoji: '🪐' },
    { label: 'Friendship', emoji: '💛' }
  ];

  const handleMicClick = () => {
    setIsListeningMic(true);
    setTimeout(() => {
      setQuery('Forest friends');
      setIsListeningMic(false);
    }, 1400);
  };

  const results = stories.filter((story) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase().trim();
    return (
      story.title.toLowerCase().includes(q) ||
      story.description.toLowerCase().includes(q) ||
      story.category.toLowerCase().includes(q) ||
      story.characters.some((c) => c.toLowerCase().includes(q)) ||
      story.themeTag.toLowerCase().includes(q)
    );
  });

  return (
    <div className="flex flex-col w-full pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8 space-y-10">
        {/* Header */}
        <header className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#c8e6ff] text-[#001e2f] text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-[#006590]" />
            <span>Search Magic Shelves</span>
          </div>

          <h1 className="font-['Quicksand'] font-bold text-3xl sm:text-4xl text-[#006590]">
            Find Your Next Story
          </h1>
          <p className="text-sm text-[#607080]">
            Type a character name, bedtime topic, or animal friend.
          </p>
        </header>

        {/* Big Search Input */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#ffffff] rounded-full p-3 sm:p-4 shadow-[0_8px_24px_-4px_rgba(38,50,56,0.08)] flex items-center gap-3 border border-[#e3f0f8] transition-all focus-within:shadow-[0_16px_36px_-6px_rgba(139,124,246,0.18)]">
            <div className="w-12 h-12 rounded-full bg-[#c8e6ff] flex items-center justify-center shrink-0 text-[#006590]">
              <Search className="w-6 h-6" />
            </div>

            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="What story are you looking for?"
              className="w-full bg-transparent text-base sm:text-lg text-[#111d23] placeholder:text-[#607080] outline-none px-2"
              autoFocus
            />

            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="w-8 h-8 rounded-full bg-[#e9f6fd] text-[#607080] flex items-center justify-center hover:text-[#111d23] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            <button
              type="button"
              onClick={handleMicClick}
              title="Voice Search"
              className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-colors shadow-sm cursor-pointer ${
                isListeningMic
                  ? 'bg-[#ba1a1a] text-[#ffffff] animate-pulse'
                  : 'bg-[#FFF9EE] text-[#006590] hover:bg-[#FFD966] hover:text-[#111d23]'
              }`}
            >
              <Mic className="w-5 h-5" />
            </button>
          </div>

          {/* Suggested searches chips */}
          <div className="flex items-center justify-center flex-wrap gap-2.5 mt-5">
            <span className="text-xs font-semibold text-[#607080] mr-1">
              Suggested:
            </span>
            {suggestedSearches.map((sug) => (
              <button
                key={sug.label}
                type="button"
                onClick={() => setQuery(sug.label)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#ffffff] text-[#111d23] text-xs font-bold shadow-sm hover:bg-[#f4faff] border border-[#e3f0f8] hover:scale-105 transition-all cursor-pointer"
              >
                <span>{sug.emoji}</span>
                <span>{sug.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Results grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-['Quicksand'] font-bold text-xl text-[#111d23]">
              {query ? `Results for "${query}" (${results.length})` : `All Stories (${results.length})`}
            </h2>
          </div>

          {results.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {results.map((st) => (
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
              <span className="text-5xl mb-4 block">🔍</span>
              <h3 className="font-['Quicksand'] font-bold text-2xl text-[#111d23] mb-2">
                No matching stories
              </h3>
              <p className="text-sm text-[#607080] mb-6">
                Try searching for &quot;Dragons&quot;, &quot;Bear&quot;, &quot;Pip&quot;, or &quot;Bedtime&quot;!
              </p>
              <button
                onClick={() => setQuery('')}
                className="px-6 py-2.5 rounded-full bg-[#006590] text-[#ffffff] font-bold text-sm"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
