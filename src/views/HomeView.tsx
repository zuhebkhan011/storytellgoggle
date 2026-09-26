import React, { useState } from 'react';
import {
  Sparkles,
  Headphones,
  BookmarkCheck,
  ArrowRight,
  Clock,
  BookOpen,
  Volume2,
  ChevronLeft,
  ChevronRight,
  Moon,
  Star,
  Play
} from 'lucide-react';
import { Story, UserProfile } from '../types/story';
import { StoryCard } from '../components/StoryCard';
import { CategoryCard } from '../components/CategoryCard';
import { CATEGORIES_DATA } from '../data/mockStories';

interface HomeViewProps {
  stories: Story[];
  userProfile: UserProfile;
  onNavigate: (path: string) => void;
  onToggleFavorite: (storyId: string) => void;
  onOpenBedtimeTimer: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  stories,
  userProfile,
  onNavigate,
  onToggleFavorite,
  onOpenBedtimeTimer
}) => {
  const [selectedTimerOption, setSelectedTimerOption] = useState<'15m' | '30m' | 'end-story'>('15m');
  const [popularIndex, setPopularIndex] = useState(0);

  // Get specific stories for progress cards
  const pipsStory = stories.find((s) => s.id === 'pips-adventure') || stories[1];
  const cloudStory = stories.find((s) => s.id === 'cloudy-night') || stories[2];
  const featuredStory = stories.find((s) => s.id === 'dragon-fire') || stories[0];

  const popularStories = stories.slice(0, 4);

  return (
    <div className="flex flex-col w-full">
      {/* HERO SECTION */}
      <section className="relative w-full overflow-hidden px-4 sm:px-6 lg:px-12 py-8 sm:py-12 lg:py-16">
        {/* Whimsical ambient circles */}
        <div className="absolute -top-16 left-1/4 w-80 h-80 rounded-full bg-[#FFD966]/20 blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 -right-20 w-96 h-96 rounded-full bg-[#e5deff]/50 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-72 h-72 rounded-full bg-[#c8e6ff]/40 blur-2xl pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
          {/* Left Hero Text & CTA */}
          <div className="lg:col-span-6 flex flex-col items-start gap-6">
            {/* Floating Kid-Friendly Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#e5deff] text-[#180065] shadow-[0_4px_16px_rgba(92,75,195,0.12)]">
              <Sparkles className="w-4 h-4 text-[#5c4bc3]" />
              <span className="text-xs sm:text-sm font-bold tracking-wide">
                Magical Audio &amp; Picture Books
              </span>
            </div>

            <h1 className="font-['Quicksand'] font-bold text-4xl sm:text-5xl lg:text-[54px] lg:leading-[62px] text-[#111d23] text-balance">
              Every Story Opens a{' '}
              <span className="text-[#006590] underline decoration-[#FFD966] decoration-wavy decoration-4">
                New Adventure
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-[#607080] max-w-xl leading-relaxed">
              Read, listen, and explore magical stories crafted for curious little minds. Gentle bedtime journeys, lively adventures, and lovable characters.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => onNavigate('/stories')}
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#006590] text-[#ffffff] font-bold text-base shadow-[0_4px_0_#004c6e,0_8px_16px_rgba(0,101,144,0.25)] hover:translate-y-0.5 active:translate-y-1 transition-transform cursor-pointer"
              >
                <span>✨ Explore Stories</span>
              </button>

              <button
                onClick={() => onNavigate('/listen/cloudy-night')}
                className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full bg-[#ffffff] text-[#5c4bc3] font-bold text-base shadow-[0_4px_14px_rgba(92,75,195,0.12)] hover:bg-[#e5deff] transition-colors cursor-pointer"
              >
                <Headphones className="w-5 h-5 text-[#5c4bc3]" />
                <span>Read Me a Story</span>
              </button>
            </div>

            {/* Trust Badges Pill Bar */}
            <div className="flex flex-wrap items-center gap-3 pt-4">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#ffffff]/90 shadow-[0_2px_8px_rgba(38,50,56,0.05)] text-xs font-semibold text-[#3f484f] border border-[#e3f0f8]">
                <span>🌟</span>
                <span className="font-bold text-[#111d23]">500+</span> Illustrated Tales
              </div>
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#ffffff]/90 shadow-[0_2px_8px_rgba(38,50,56,0.05)] text-xs font-semibold text-[#3f484f] border border-[#e3f0f8]">
                <span>🎙️</span>
                Voice Narration
              </div>
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#7DDCC8]/25 text-[#111d23] shadow-[0_2px_8px_rgba(125,220,200,0.15)] text-xs font-bold border border-[#7DDCC8]/40">
                <span>🔒</span>
                100% Kid-Safe &amp; Ad-Free
              </div>
            </div>
          </div>

          {/* Right Hero Artwork */}
          <div className="lg:col-span-6 relative flex justify-center items-center">
            {/* Floating Story Badges around main illustration */}
            <div className="absolute -top-4 -left-4 z-20 hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#ffffff] shadow-[0_8px_24px_-4px_rgba(38,50,56,0.12)] border border-[#e3f0f8] animate-bounce" style={{ animationDuration: '4s' }}>
              <Star className="w-5 h-5 text-[#FFD966] fill-[#FFD966]" />
              <span className="text-xs font-bold text-[#111d23]">Bedtime Calm Mode</span>
            </div>

            <div
              onClick={() => onNavigate('/listen/pips-adventure')}
              className="absolute bottom-6 -right-2 z-20 hidden sm:flex items-center gap-3 px-4 py-2 rounded-full bg-[#ffffff] shadow-[0_8px_24px_-4px_rgba(38,50,56,0.14)] border border-[#e3f0f8] cursor-pointer hover:scale-105 transition-transform"
            >
              <div className="w-8 h-8 rounded-full bg-[#FFD966] flex items-center justify-center text-[#111d23] shadow-sm">
                <Play className="w-4 h-4 fill-[#111d23]" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold text-[#006590]">Pip &amp; Ember</span>
                <span className="text-[11px] text-[#607080]">Audio playing</span>
              </div>
            </div>

            {/* Glowing Card Outer Frame */}
            <div className="relative w-full rounded-3xl p-3 bg-[#ffffff]/80 shadow-[0_16px_36px_-6px_rgba(139,124,246,0.22)] backdrop-blur-sm border border-[#e3f0f8]">
              <div className="overflow-hidden rounded-2xl aspect-[16/10] relative group">
                <img
                  alt="Boy and little red fox sitting warmly beneath a glowing magical tree reading a storybook"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCstVnqWfGATBCmtYtWzoJea-y-BEz14nVqlFolCNpZobjuLA2SQYKGFehY0sPepFQ6SoJMBKr3LzX9GqIZdiRo-CqTabHLTniKF2QPAbkXxK_pLjeXeoR9VNntnWJ-U80wPiBfKlqv_SlcX6wSlewIxWerW5S-EvLeNgoMDAgZohfJZIvYUPiTXSiCkaUBlqu_9c0nnXp6dKGOyNMG_NYP05mMNr1tveRTAI4LjF_zQI3F8eFvNgW2rA"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#006590]/30 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTINUE YOUR ADVENTURE (Reading Progress) */}
      <section className="w-full px-4 sm:px-6 lg:px-12 py-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#c8e6ff] flex items-center justify-center text-[#006590]">
                <BookmarkCheck className="w-5 h-5 text-[#006590]" />
              </div>
              <div>
                <h2 className="font-['Quicksand'] font-bold text-2xl text-[#111d23]">
                  Continue Your Adventure
                </h2>
                <p className="text-xs sm:text-sm text-[#607080]">
                  Jump right back into {userProfile.name}&apos;s open storybooks
                </p>
              </div>
            </div>

            <button
              onClick={() => onNavigate('/favorites')}
              className="text-sm font-bold text-[#006590] hover:text-[#005176] flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>View {userProfile.name}&apos;s Bookshelf</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Progress Card 1: Pip's Enchanted Adventure */}
            <div
              onClick={() => onNavigate(`/read/${pipsStory.id}`)}
              className="flex flex-col sm:flex-row gap-5 p-5 rounded-3xl bg-[#ffffff] shadow-[0_8px_24px_-4px_rgba(38,50,56,0.08)] hover:shadow-[0_16px_36px_-6px_rgba(139,124,246,0.18)] transition-all group border border-[#e3f0f8] cursor-pointer"
            >
              <div className="w-full sm:w-44 h-48 rounded-2xl overflow-hidden shrink-0 relative bg-gradient-to-br from-[#c8e6ff] to-[#e5deff]">
                <img
                  alt="Pip's Enchanted Adventure Book Cover"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src={pipsStory.coverImage}
                />
                <span className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-[#e5deff]/90 text-[#180065] text-xs font-bold shadow-sm">
                  Chapter 4
                </span>
              </div>

              <div className="flex flex-col justify-between flex-1 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-[#607080]">By {pipsStory.author}</span>
                    <span className="text-[#006590]">72% Completed</span>
                  </div>

                  <h3 className="font-['Quicksand'] font-bold text-xl text-[#111d23] group-hover:text-[#006590] transition-colors line-clamp-1">
                    {pipsStory.title}
                  </h3>

                  <p className="text-xs text-[#607080] line-clamp-2 leading-relaxed">
                    Pip steps past the mossy lantern archway into the Whispering Canopy to meet the forest council.
                  </p>

                  {/* Progress Bar (Coral Accent) */}
                  <div className="w-full h-2.5 rounded-full bg-[#ddeaf2] overflow-hidden mt-3">
                    <div
                      className="h-full rounded-full bg-[#ffa69d] transition-all duration-500"
                      style={{ width: '72%' }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs text-[#607080] font-semibold flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#006590]" /> 4 min left
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onNavigate(`/read/${pipsStory.id}`);
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#6ec6ff] text-[#005176] text-xs font-bold hover:bg-[#006590] hover:text-[#ffffff] shadow-sm transition-all cursor-pointer"
                  >
                    <span>Continue Reading 📖</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Progress Card 2: The Cloud That Lost Its Way */}
            <div
              onClick={() => onNavigate(`/read/${cloudStory.id}`)}
              className="flex flex-col sm:flex-row gap-5 p-5 rounded-3xl bg-[#ffffff] shadow-[0_8px_24px_-4px_rgba(38,50,56,0.08)] hover:shadow-[0_16px_36px_-6px_rgba(139,124,246,0.18)] transition-all group border border-[#e3f0f8] cursor-pointer"
            >
              <div className="w-full sm:w-44 h-48 rounded-2xl overflow-hidden shrink-0 relative bg-gradient-to-br from-[#c8e6ff] to-[#e5deff]">
                <img
                  alt="The Cloud That Lost Its Way Book Cover"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src={cloudStory.coverImage}
                />
                <span className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-[#FFD966] text-[#111d23] text-xs font-bold shadow-sm">
                  Chapter 2
                </span>
              </div>

              <div className="flex flex-col justify-between flex-1 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-[#607080]">Bedtime Wonder Series</span>
                    <span className="text-[#5c4bc3]">35% Completed</span>
                  </div>

                  <h3 className="font-['Quicksand'] font-bold text-xl text-[#111d23] group-hover:text-[#006590] transition-colors line-clamp-1">
                    {cloudStory.title}
                  </h3>

                  <p className="text-xs text-[#607080] line-clamp-2 leading-relaxed">
                    A fluffy, sleepy little cloud drifts past the purple twilight stars in search of the silver moon nest.
                  </p>

                  {/* Progress Bar (Primary Blue Accent) */}
                  <div className="w-full h-2.5 rounded-full bg-[#ddeaf2] overflow-hidden mt-3">
                    <div
                      className="h-full rounded-full bg-[#006590] transition-all duration-500"
                      style={{ width: '35%' }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs text-[#607080] font-semibold flex items-center gap-1">
                    <Moon className="w-3.5 h-3.5 text-[#5c4bc3]" /> 8 min left
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onNavigate(`/read/${cloudStory.id}`);
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#e5deff] text-[#180065] text-xs font-bold hover:bg-[#c7bfff] transition-all cursor-pointer"
                  >
                    <span>Continue Reading 📖</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED STORY SPOTLIGHT (The Dragon Who Was Afraid of Fire) */}
      <section className="w-full px-4 sm:px-6 lg:px-12 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#F5F1FF] via-[#ffffff] to-[#F0F8FF] p-6 lg:p-10 shadow-[0_16px_36px_-6px_rgba(92,75,195,0.14)] border border-[#e3f0f8]">
            {/* Whimsical backdrop sparkles */}
            <div className="absolute -top-10 -right-10 w-64 h-64 rounded-full bg-[#FFD966]/30 blur-2xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              {/* Spotlight Artwork */}
              <div className="lg:col-span-6 relative">
                <div className="relative rounded-2xl overflow-hidden shadow-[0_12px_28px_-4px_rgba(38,50,56,0.16)] group">
                  <img
                    alt="Ember's Brave Heart - Cute baby green dragon crying softly by a glowing campfire under moonlit starry canopy"
                    className="w-full h-auto max-h-[380px] object-cover group-hover:scale-102 transition-transform duration-500"
                    src={featuredStory.coverImage}
                  />
                  <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#ffffff]/90 backdrop-blur-md shadow-md text-[#111d23]">
                    <Volume2 className="w-4 h-4 text-[#FFD966]" />
                    <span className="text-xs font-bold">Full Audio Story Included</span>
                  </div>
                </div>
              </div>

              {/* Spotlight Details */}
              <div className="lg:col-span-6 flex flex-col items-start gap-4">
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FFD966] text-[#111d23] text-xs font-bold shadow-sm">
                  <Sparkles className="w-4 h-4" />
                  <span>Story of the Week</span>
                </div>

                <h2 className="font-['Quicksand'] font-bold text-3xl sm:text-4xl text-[#111d23]">
                  {featuredStory.title}
                </h2>

                <p className="text-base sm:text-lg text-[#607080] leading-relaxed">
                  {featuredStory.description}
                </p>

                {/* Pill Badges */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#e3f0f8] text-xs font-bold text-[#006590]">
                    <Clock className="w-3.5 h-3.5" /> 8 min read
                  </span>
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#e3f0f8] text-xs font-bold text-[#111d23]">
                    👶 Ages 5–8
                  </span>
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#e3f0f8] text-xs font-bold text-[#5c4bc3]">
                    🎙️ Narrated by Sarah
                  </span>
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#ffa69d]/40 text-xs font-bold text-[#872e29]">
                    ❤️ Kindness &amp; Courage
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-3.5 pt-3">
                  <button
                    onClick={() => onNavigate(`/read/${featuredStory.id}`)}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#006590] text-[#ffffff] font-bold text-base shadow-[0_4px_0_#004c6e,0_8px_16px_rgba(0,101,144,0.2)] hover:translate-y-0.5 active:translate-y-1 transition-all cursor-pointer"
                  >
                    <BookOpen className="w-5 h-5" />
                    <span>Read Story Now</span>
                  </button>

                  <button
                    onClick={() => onNavigate(`/listen/${featuredStory.id}`)}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#FFD966] text-[#111d23] font-bold text-base shadow-[0_4px_0_#e6bc3a,0_8px_16px_rgba(255,217,102,0.35)] hover:translate-y-0.5 active:translate-y-1 transition-all cursor-pointer"
                  >
                    <Play className="w-5 h-5 fill-[#111d23]" />
                    <span>Listen to Audio</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STORY CATEGORIES SECTION */}
      <section className="w-full px-4 sm:px-6 lg:px-12 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-bold text-[#5c4bc3] uppercase tracking-wider">
              Discover By Theme
            </span>
            <h2 className="font-['Quicksand'] font-bold text-3xl sm:text-4xl text-[#111d23] mt-1">
              Explore Whimsical Worlds
            </h2>
            <p className="text-sm sm:text-base text-[#607080] mt-2">
              Every genre is crafted with love to spark curiosity, empathy, and dreams.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {CATEGORIES_DATA.map((cat) => (
              <CategoryCard
                key={cat.id}
                id={cat.id}
                name={cat.name}
                subtitle={cat.subtitle}
                emoji={cat.emoji}
                bgClass={cat.bgClass}
                hoverClass={cat.hoverClass}
                iconName={cat.iconName}
                onClick={() => onNavigate(`/stories/${cat.id}`)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* STORIES EVERYONE LOVES (Popular Stories Shelf) */}
      <section className="w-full px-4 sm:px-6 lg:px-12 py-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFD966]/30 text-[#111d23] text-xs font-bold mb-2">
                <span>✨ Most Loved by Young Readers</span>
              </div>
              <h2 className="font-['Quicksand'] font-bold text-3xl sm:text-4xl text-[#111d23]">
                Stories Everyone Loves
              </h2>
            </div>

            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={() => setPopularIndex((prev) => Math.max(0, prev - 1))}
                aria-label="Previous stories"
                className="w-11 h-11 rounded-full bg-[#ffffff] flex items-center justify-center text-[#111d23] shadow-[0_2px_8px_rgba(38,50,56,0.06)] hover:bg-[#e3f0f8] transition-colors cursor-pointer border border-[#e3f0f8]"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setPopularIndex((prev) => Math.min(stories.length - 4, prev + 1))}
                aria-label="Next stories"
                className="w-11 h-11 rounded-full bg-[#ffffff] flex items-center justify-center text-[#111d23] shadow-[0_2px_8px_rgba(38,50,56,0.06)] hover:bg-[#e3f0f8] transition-colors cursor-pointer border border-[#e3f0f8]"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularStories.map((st) => (
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
        </div>
      </section>

      {/* BEDTIME TIMER & INTERACTIVE NARRATOR PREVIEW BANNER */}
      <section className="w-full px-4 sm:px-6 lg:px-12 py-10">
        <div className="max-w-7xl mx-auto rounded-3xl bg-[#5c4bc3] p-8 lg:p-12 text-[#ffffff] relative overflow-hidden shadow-[0_16px_36px_-6px_rgba(92,75,195,0.35)]">
          {/* Ambient light blobs */}
          <div className="absolute -top-12 -left-12 w-64 h-64 rounded-full bg-[#FFD966]/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -right-10 w-72 h-72 rounded-full bg-[#6ec6ff]/30 blur-2xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#9485ff]/60 text-[#f4faff] text-xs font-bold">
                <Moon className="w-4 h-4 text-[#FFD966] fill-[#FFD966]" />
                <span>Gentle Sleep Mode</span>
              </div>

              <h2 className="font-['Quicksand'] font-bold text-3xl sm:text-4xl text-[#ffffff]">
                Set the Bedtime Timer &amp; Drift into Slumber
              </h2>

              <p className="text-base sm:text-lg text-[#e5deff] max-w-2xl leading-relaxed">
                Choose a soothing story, dim the screen brightness automatically, and let soft narration slowly fade out as your child falls peacefully asleep.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => setSelectedTimerOption('15m')}
                  className={`px-4 py-2 rounded-full font-bold text-sm transition-all cursor-pointer ${
                    selectedTimerOption === '15m'
                      ? 'bg-[#ffffff] text-[#5c4bc3] shadow-sm'
                      : 'bg-[#9485ff]/50 text-[#ffffff] hover:bg-[#ffffff] hover:text-[#5c4bc3]'
                  }`}
                >
                  🌙 15 Minutes
                </button>
                <button
                  onClick={() => setSelectedTimerOption('30m')}
                  className={`px-4 py-2 rounded-full font-bold text-sm transition-all cursor-pointer ${
                    selectedTimerOption === '30m'
                      ? 'bg-[#ffffff] text-[#5c4bc3] shadow-sm'
                      : 'bg-[#9485ff]/50 text-[#ffffff] hover:bg-[#ffffff] hover:text-[#5c4bc3]'
                  }`}
                >
                  ⭐ 30 Minutes
                </button>
                <button
                  onClick={() => setSelectedTimerOption('end-story')}
                  className={`px-4 py-2 rounded-full font-bold text-sm transition-all cursor-pointer ${
                    selectedTimerOption === 'end-story'
                      ? 'bg-[#ffffff] text-[#5c4bc3] shadow-sm'
                      : 'bg-[#9485ff]/50 text-[#ffffff] hover:bg-[#ffffff] hover:text-[#5c4bc3]'
                  }`}
                >
                  📖 Until Story Ends
                </button>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <div className="p-6 rounded-3xl bg-[#ffffff]/10 backdrop-blur-md text-center flex flex-col items-center gap-3 max-w-xs w-full border border-[#ffffff]/15">
                <div className="w-16 h-16 rounded-full bg-[#FFD966] flex items-center justify-center text-[#111d23] shadow-md">
                  <Moon className="w-8 h-8 fill-[#111d23]" />
                </div>
                <span className="font-['Quicksand'] font-bold text-xl text-[#ffffff]">
                  Sleepy Haven
                </span>
                <span className="text-xs text-[#e5deff]">
                  Soft ambient rain &amp; harp music ready
                </span>
                <button
                  onClick={onOpenBedtimeTimer}
                  className="w-full mt-2 py-3 rounded-full bg-[#FFD966] text-[#111d23] font-bold text-sm shadow-[0_4px_0_#e6bc3a] hover:translate-y-0.5 active:translate-y-1 transition-transform cursor-pointer"
                >
                  Start Bedtime Routine
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
