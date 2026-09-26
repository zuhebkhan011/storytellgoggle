import React, { useState, useMemo } from 'react';
import {
  Search,
  Mic,
  BookOpen,
  Headphones,
  Star,
  Clock,
  Sparkles,
  ArrowRight,
  Moon,
  Baby
} from 'lucide-react';
import { Story, UserProfile } from '../types/story';
import { StoryCard } from '../components/StoryCard';

interface StoriesViewProps {
  stories: Story[];
  userProfile: UserProfile;
  onNavigate: (path: string) => void;
  onToggleFavorite: (storyId: string) => void;
  onOpenBedtimeTimer: () => void;
  initialCategory?: string;
}

export const StoriesView: React.FC<StoriesViewProps> = ({
  stories,
  userProfile,
  onNavigate,
  onToggleFavorite,
  onOpenBedtimeTimer,
  initialCategory
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedQuickPick, setSelectedQuickPick] = useState<string>(initialCategory || 'all');
  const [selectedAge, setSelectedAge] = useState<string>('all');
  const [activeModes, setActiveModes] = useState<string[]>([]);
  const [isListeningMic, setIsListeningMic] = useState(false);
  const [loadedCount, setLoadedCount] = useState(6);
  const [loadBtnFeedback, setLoadBtnFeedback] = useState(false);

  const quickPicks = [
    { id: 'all', label: 'All Tales', emoji: '📚' },
    { id: 'dragons', label: 'Dragons', emoji: '🐉' },
    { id: 'animals', label: 'Animals', emoji: '🦊' },
    { id: 'bedtime', label: 'Bedtime', emoji: '🌙' },
    { id: 'adventure', label: 'Adventure', emoji: '🚀' },
    { id: 'magic', label: 'Magic', emoji: '✨' },
    { id: 'friendship', label: 'Friendship', emoji: '💛' }
  ];

  const ageFilters = [
    { id: 'all', label: 'All Ages' },
    { id: '3-5', label: 'Ages 3–5' },
    { id: '5-7', label: 'Ages 5–7' },
    { id: '8-10', label: 'Ages 8–10' }
  ];

  const modeFilters = [
    { id: 'read-aloud', label: 'Read Aloud', emoji: '🎧', hasDot: true },
    { id: 'favorites', label: 'Favorites', emoji: '⭐' },
    { id: 'quick', label: 'Quick (<5m)', emoji: '⏱️' },
    { id: 'interactive', label: 'Choices', emoji: '📖' }
  ];

  const handleToggleMode = (modeId: string) => {
    setActiveModes((prev) =>
      prev.includes(modeId) ? prev.filter((m) => m !== modeId) : [...prev, modeId]
    );
  };

  const handleMicClick = () => {
    setIsListeningMic(true);
    // Simulate speech-to-text for kids
    setTimeout(() => {
      setSearchQuery('dragon');
      setIsListeningMic(false);
    }, 1500);
  };

  // Filtered stories logic
  const filteredStories = useMemo(() => {
    return stories.filter((story) => {
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = story.title.toLowerCase().includes(query);
        const matchesDesc = story.description.toLowerCase().includes(query);
        const matchesChar = story.characters.some((c) => c.toLowerCase().includes(query));
        const matchesTag = story.themeTag.toLowerCase().includes(query);
        if (!matchesTitle && !matchesDesc && !matchesChar && !matchesTag) return false;
      }

      // Quick pick / category
      if (selectedQuickPick !== 'all') {
        if (selectedQuickPick === 'dragons') {
          if (!story.title.toLowerCase().includes('dragon') && !story.characters.some(c => c.toLowerCase().includes('dragon'))) return false;
        } else if (selectedQuickPick === 'magic') {
          if (story.category !== 'fantasy' && !story.title.toLowerCase().includes('magic')) return false;
        } else if (selectedQuickPick === 'bedtime') {
          if (story.category !== 'bedtime') return false;
        } else if (selectedQuickPick === 'animals') {
          if (story.category !== 'animals' && !story.characters.some(c => ['fox', 'bear', 'owl', 'hedgehog'].some(a => c.toLowerCase().includes(a)))) return false;
        } else if (selectedQuickPick === 'adventure') {
          if (story.category !== 'adventure') return false;
        } else if (selectedQuickPick === 'friendship') {
          if (story.category !== 'friendship') return false;
        }
      }

      // Age filter
      if (selectedAge !== 'all') {
        if (selectedAge === '3-5' && !story.ageRange.includes('3') && !story.ageRange.includes('4') && !story.ageRange.includes('5')) return false;
        if (selectedAge === '5-7' && !story.ageRange.includes('5') && !story.ageRange.includes('6') && !story.ageRange.includes('7')) return false;
        if (selectedAge === '8-10' && !story.ageRange.includes('7') && !story.ageRange.includes('8') && !story.ageRange.includes('9') && !story.ageRange.includes('10')) return false;
      }

      // Modes
      if (activeModes.includes('read-aloud') && !story.audioAvailable) return false;
      if (activeModes.includes('favorites') && !userProfile.favorites.includes(story.id)) return false;
      if (activeModes.includes('quick') && story.readingTimeMinutes > 5) return false;
      if (activeModes.includes('interactive') && !story.hasInteractiveChoices) return false;

      return true;
    });
  }, [stories, searchQuery, selectedQuickPick, selectedAge, activeModes, userProfile.favorites]);

  const displayedStories = filteredStories.slice(0, loadedCount);

  const handleLoadMore = () => {
    setLoadBtnFeedback(true);
    setTimeout(() => {
      setLoadedCount((prev) => Math.min(filteredStories.length, prev + 6));
      setLoadBtnFeedback(false);
    }, 600);
  };

  return (
    <div className="flex flex-col w-full">
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8 overflow-hidden">
        {/* Soft Decorative Floating Blobs */}
        <div className="absolute -top-16 right-8 w-96 h-96 bg-[#6ec6ff]/20 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-80 -left-20 w-80 h-80 bg-[#e5deff]/50 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-[#FFD966]/20 rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Page Header Section */}
        <header className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ffffff] shadow-sm mb-4 border border-[#e3f0f8]">
            <Sparkles className="w-4 h-4 text-[#FFD966]" />
            <span className="text-xs font-bold text-[#006590] tracking-wide uppercase">
              Over 350+ Illustrated Tales
            </span>
          </div>

          <h1 className="font-['Quicksand'] font-bold text-4xl sm:text-5xl text-[#006590] tracking-tight mb-3">
            Explore Magical Stories 📚
          </h1>

          <p className="text-base sm:text-lg text-[#607080]">
            Find fairy tales, animal friends, bedtime lullabies, and thrilling quests crafted for cozy beds &amp; big smiles.
          </p>
        </header>

        {/* Search & Quick Tags Island */}
        <section aria-label="Story search" className="max-w-4xl mx-auto mb-10">
          <div className="bg-[#ffffff] rounded-full p-2.5 shadow-[0_8px_24px_-4px_rgba(38,50,56,0.08)] flex items-center gap-3 border border-[#e3f0f8] transition-all duration-300 focus-within:shadow-[0_16px_36px_-6px_rgba(139,124,246,0.18)]">
            <div className="w-12 h-12 rounded-full bg-[#c8e6ff]/60 flex items-center justify-center shrink-0 text-[#006590]">
              <Search className="w-6 h-6" />
            </div>

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="What story are you looking for? (e.g. Dragons, Animals, Bedtime...)"
              className="w-full bg-transparent text-sm sm:text-base text-[#111d23] placeholder:text-[#607080] outline-none px-2"
            />

            <button
              type="button"
              onClick={handleMicClick}
              title="Voice Search"
              className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 transition-colors shadow-sm cursor-pointer ${
                isListeningMic
                  ? 'bg-[#ba1a1a] text-[#ffffff] animate-pulse'
                  : 'bg-[#FFF9EE] text-[#006590] hover:bg-[#FFD966] hover:text-[#111d23]'
              }`}
            >
              <Mic className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={() => {}}
              className="hidden sm:inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#6ec6ff] text-[#005176] font-bold text-sm shadow-[0_4px_0_#4ea8e0,0_8px_16px_rgba(110,198,255,0.3)] active:translate-y-1 active:shadow-none transition-all cursor-pointer whitespace-nowrap"
            >
              <span>Find Tale</span>
              <BookOpen className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Topic Chips */}
          <div className="flex items-center justify-center flex-wrap gap-2.5 mt-5">
            <span className="text-xs font-semibold text-[#607080] mr-1 flex items-center gap-1">
              <Sparkles className="w-4 h-4 text-[#FFD966]" /> Quick Pick:
            </span>

            {quickPicks.map((chip) => {
              const isSelected = selectedQuickPick === chip.id;
              return (
                <button
                  key={chip.id}
                  type="button"
                  onClick={() => setSelectedQuickPick(chip.id)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer hover:scale-105 active:scale-95 ${
                    isSelected
                      ? 'bg-[#9485ff] text-[#ffffff] shadow-sm'
                      : 'bg-[#ffffff] text-[#111d23] shadow-[0_2px_8px_rgba(38,50,56,0.06)] hover:bg-[#f4faff] border border-[#e3f0f8]'
                  }`}
                >
                  <span>{chip.emoji}</span>
                  <span>{chip.label}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Child-Friendly Visual Filters Bar */}
        <section aria-label="Story filters" className="max-w-7xl mx-auto mb-10 bg-[#ffffff]/80 backdrop-blur-md rounded-3xl p-5 lg:p-6 shadow-[0_8px_24px_-4px_rgba(38,50,56,0.06)] border border-[#e3f0f8]">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6">
            {/* Age Selector Segmented Pill */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-[#607080] flex items-center gap-1">
                <Baby className="w-4 h-4 text-[#006590]" />
                Select Reading Age:
              </label>

              <div className="inline-flex p-1.5 bg-[#e9f6fd] rounded-full gap-1 shadow-inner overflow-x-auto">
                {ageFilters.map((age) => {
                  const isSelected = selectedAge === age.id;
                  return (
                    <button
                      key={age.id}
                      type="button"
                      onClick={() => setSelectedAge(age.id)}
                      className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                        isSelected
                          ? 'bg-[#6ec6ff] text-[#005176] shadow-sm'
                          : 'text-[#3f484f] hover:text-[#111d23]'
                      }`}
                    >
                      {age.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Filter Toggles (Pill Pods) */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold text-[#607080] flex items-center gap-1">
                <Sparkles className="w-4 h-4 text-[#5c4bc3]" />
                Story Modes:
              </span>

              <div className="flex items-center flex-wrap gap-2">
                {modeFilters.map((mode) => {
                  const isToggled = activeModes.includes(mode.id);
                  return (
                    <button
                      key={mode.id}
                      type="button"
                      onClick={() => handleToggleMode(mode.id)}
                      className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer active:scale-95 border border-[#e3f0f8] ${
                        isToggled
                          ? 'bg-[#e5deff] text-[#180065] shadow-sm'
                          : 'bg-[#e3f0f8] text-[#111d23] hover:bg-[#ddeaf2]'
                      }`}
                    >
                      <span>{mode.emoji}</span>
                      <span>{mode.label}</span>
                      {mode.hasDot && <span className="w-2 h-2 rounded-full bg-[#7DDCC8]" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Reading Progress Ribbon */}
        <div className="max-w-7xl mx-auto mb-8 flex items-center justify-between px-2">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#006590]" />
            <span className="font-['Quicksand'] font-bold text-xl text-[#111d23]">
              Curated Tales Collection
            </span>
            <span className="ml-2 text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#e5deff] text-[#180065]">
              Showing {displayedStories.length} of {filteredStories.length} magical books
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-[#607080] text-xs font-semibold">
            <Moon className="w-4 h-4 text-[#FFD966] fill-[#FFD966]" />
            Night Mode Ready &amp; Audio Narration enabled
          </div>
        </div>

        {/* Rich Storybook Grid */}
        {displayedStories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {displayedStories.map((st) => (
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
          <div className="bg-[#ffffff] rounded-3xl p-12 text-center max-w-md mx-auto my-12 shadow-sm border border-[#e3f0f8]">
            <span className="text-5xl mb-4 block">🔍</span>
            <h3 className="font-['Quicksand'] font-bold text-2xl text-[#111d23] mb-2">
              No magical tales found
            </h3>
            <p className="text-sm text-[#607080] mb-6">
              Try picking a different keyword like Dragons, Bedtime, or Animal Friends!
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedQuickPick('all');
                setSelectedAge('all');
                setActiveModes([]);
              }}
              className="px-6 py-2.5 rounded-full bg-[#006590] text-[#ffffff] font-bold text-sm"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Playful Load More Section */}
        {displayedStories.length < filteredStories.length && (
          <div className="flex flex-col items-center justify-center text-center gap-4 py-8 mb-6">
            <button
              type="button"
              onClick={handleLoadMore}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#FFD966] text-[#111d23] font-['Quicksand'] font-bold text-lg shadow-[0_4px_0_#e6b800,0_12px_24px_rgba(255,217,102,0.4)] hover:brightness-105 active:translate-y-1 active:shadow-none transition-all cursor-pointer"
            >
              <span>{loadBtnFeedback ? 'Gathering More Magic...' : 'Load More Magical Stories'}</span>
              <span className="text-2xl">🌈</span>
            </button>

            <p className="text-xs text-[#607080]">
              Showing {displayedStories.length} of {filteredStories.length} tales &bull; Fresh adventures added every Saturday morning!
            </p>
          </div>
        )}

        {/* Whimsical Interactive Parent-Child Cozy Corner Banner */}
        <div className="bg-gradient-to-r from-[#F5F1FF] via-[#e9f6fd] to-[#c8e6ff]/40 rounded-3xl p-8 lg:p-10 shadow-[0_8px_24px_-4px_rgba(38,50,56,0.06)] flex flex-col md:flex-row items-center justify-between gap-8 border border-[#e3f0f8]">
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ffffff] text-[#5c4bc3] text-xs font-bold shadow-sm">
              <Moon className="w-4 h-4 text-[#5c4bc3]" />
              Bedtime Timer &amp; Cozy Mode
            </div>

            <h3 className="font-['Quicksand'] font-bold text-3xl text-[#006590]">
              Need a gentle bedtime wind-down?
            </h3>

            <p className="text-sm sm:text-base text-[#3f484f] leading-relaxed">
              Set our magical sleep timer to softly fade narration, soften screen warmth, and guide little listeners into dreamland gently.
            </p>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <button
              onClick={onOpenBedtimeTimer}
              className="px-6 py-3.5 rounded-full bg-[#ffffff] text-[#5c4bc3] font-bold text-sm shadow-[0_2px_8px_rgba(38,50,56,0.08)] hover:bg-[#e5deff] transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              <Moon className="w-5 h-5 text-[#5c4bc3] fill-[#5c4bc3]" />
              <span>Start Sleep Mode</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
