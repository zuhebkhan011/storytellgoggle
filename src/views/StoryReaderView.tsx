import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Volume2,
  VolumeX,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Star,
  CheckCircle,
  Moon,
  Clock,
  AudioWaveform,
  BookOpen
} from 'lucide-react';
import { Story, UserProfile } from '../types/story';
import { ambientSound } from '../utils/audioSynthesizer';
import { saveStoryProgress } from '../utils/storage';

interface StoryReaderViewProps {
  story: Story;
  userProfile: UserProfile;
  onNavigate: (path: string) => void;
  onToggleFavorite: (storyId: string) => void;
  onOpenBedtimeTimer: () => void;
}

export const StoryReaderView: React.FC<StoryReaderViewProps> = ({
  story,
  userProfile,
  onNavigate,
  onToggleFavorite,
  onOpenBedtimeTimer
}) => {
  const [currentPageNum, setCurrentPageNum] = useState<number>(story.pages[3]?.pageNumber || 4);
  const [fontSizeIndex, setFontSizeIndex] = useState<number>(2); // 0=80%, 1=90%, 2=100%, 3=115%
  const [isNarrating, setIsNarrating] = useState<boolean>(true);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [activeAmbience, setActiveAmbience] = useState<boolean>(true);
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);

  const fontSizes = ['16px', '18px', '20px', '23px'];
  const fontPercentLabels = ['80%', '90%', '100%', '115%'];

  const currentPage =
    story.pages.find((p) => p.pageNumber === currentPageNum) ||
    story.pages[0];

  const totalPages = Math.max(story.pages.length, 10);
  const progressPercent = Math.round((currentPageNum / totalPages) * 100);

  // Play ambient audio when page changes
  useEffect(() => {
    saveStoryProgress(story.id, currentPageNum);

    if (activeAmbience) {
      if (currentPage.ambientSoundName?.toLowerCase().includes('cricket') || story.category === 'bedtime') {
        ambientSound.playAmbience('crickets', 0.15);
      } else if (currentPage.ambientSoundName?.toLowerCase().includes('rain') || currentPage.ambientSoundName?.toLowerCase().includes('brook')) {
        ambientSound.playAmbience('rain', 0.15);
      } else {
        ambientSound.playAmbience('harp', 0.15);
      }
    } else {
      ambientSound.stopAmbience();
    }

    return () => {
      ambientSound.stopAmbience();
    };
  }, [currentPageNum, activeAmbience, story.id, story.category, currentPage.ambientSoundName]);

  // Read aloud simulation or speech synthesis
  useEffect(() => {
    if (isNarrating && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
        const textToRead = currentPage.text.join(' ');
        const utterance = new SpeechSynthesisUtterance(textToRead);
        utterance.rate = 0.9;
        utterance.pitch = 1.1; // friendly warmer tone
        window.speechSynthesis.speak(utterance);
      } catch {
        // ignore
      }
    } else if (!isNarrating && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {
        // ignore
      }
    }

    return () => {
      if ('speechSynthesis' in window) {
        try {
          window.speechSynthesis.cancel();
        } catch {
          // ignore
        }
      }
    };
  }, [currentPageNum, isNarrating, currentPage]);

  const handlePrevPage = () => {
    if (currentPageNum > 1) {
      setCurrentPageNum(currentPageNum - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPageNum < totalPages) {
      setCurrentPageNum(currentPageNum + 1);
    }
  };

  const handleSelectChoice = (targetPage: number, choiceId: string) => {
    setSelectedChoiceId(choiceId);
    setTimeout(() => {
      if (story.pages.some((p) => p.pageNumber === targetPage)) {
        setCurrentPageNum(targetPage);
      } else {
        handleNextPage();
      }
    }, 400);
  };

  return (
    <div className="flex flex-col w-full pb-16">
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        {/* Top Reading Control Bar (Floating cloud style) */}
        <div className="w-full bg-[#ffffff]/90 backdrop-blur-md rounded-3xl shadow-[0_8px_24px_-4px_rgba(38,50,56,0.08)] p-3 sm:p-5 mb-6 border border-[#e3f0f8] transition-all duration-300">
          <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4">
            {/* Left: Back Navigation & Story Badge */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => onNavigate('/stories')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#e3f0f8] hover:bg-[#ddeaf2] text-[#006590] font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Back to Stories</span>
              </button>

              <div className="flex flex-col text-left">
                <span className="text-[11px] font-bold text-[#5c4bc3] uppercase tracking-wider">
                  {story.currentChapter || 'Chapter 2 • Whispering Woods'}
                </span>
                <h1 className="font-['Quicksand'] font-bold text-base sm:text-xl text-[#111d23] line-clamp-1">
                  {story.title}
                </h1>
              </div>
            </div>

            {/* Right: Reader Tooling & Sensory Controls */}
            <div className="flex items-center gap-2 sm:gap-3 ml-auto">
              {/* Font Size Adjuster Group */}
              <div className="flex items-center bg-[#e9f6fd] rounded-full p-1 shadow-inner border border-[#cfdce4]/50">
                <button
                  type="button"
                  onClick={() => setFontSizeIndex((prev) => Math.max(0, prev - 1))}
                  aria-label="Decrease text size"
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[#3f484f] hover:text-[#006590] hover:bg-[#ffffff] transition-colors cursor-pointer text-xs font-bold"
                >
                  A-
                </button>
                <span className="text-[11px] sm:text-xs font-bold px-2 text-[#607080] select-none">
                  {fontPercentLabels[fontSizeIndex]}
                </span>
                <button
                  type="button"
                  onClick={() => setFontSizeIndex((prev) => Math.min(fontSizes.length - 1, prev + 1))}
                  aria-label="Increase text size"
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[#3f484f] hover:text-[#006590] hover:bg-[#ffffff] transition-colors cursor-pointer text-xs font-bold"
                >
                  A+
                </button>
              </div>

              {/* Narration Audio Toggle Pill */}
              <button
                type="button"
                onClick={() => setIsNarrating(!isNarrating)}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full font-bold text-xs sm:text-sm shadow-sm transition-all transform active:scale-95 cursor-pointer ${
                  isNarrating
                    ? 'bg-[#FFD966] text-[#111d23] shadow-[0_2px_8px_rgba(255,217,102,0.4)]'
                    : 'bg-[#e3f0f8] text-[#607080]'
                }`}
              >
                {isNarrating ? (
                  <Volume2 className="w-4 h-4 text-[#006590]" />
                ) : (
                  <VolumeX className="w-4 h-4" />
                )}
                <span className="hidden md:inline">
                  Read to Me: <span className="text-[#5c4bc3]">{isNarrating ? 'ON' : 'OFF'}</span>
                </span>
              </button>

              {/* Bookmark Button */}
              <button
                type="button"
                onClick={() => setIsBookmarked(!isBookmarked)}
                aria-label="Save bookmark"
                className={`w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full transition-all duration-200 shadow-sm cursor-pointer ${
                  isBookmarked
                    ? 'bg-[#ffa69d]/40 text-[#9e4039]'
                    : 'bg-[#e3f0f8] text-[#607080] hover:text-[#9e4039]'
                }`}
              >
                <Bookmark className={`w-4 h-4 sm:w-5 sm:h-5 ${isBookmarked ? 'fill-[#9e4039]' : ''}`} />
              </button>
            </div>
          </div>

          {/* Playful Story Progress Bar with Draggable Dragon/Character Icon */}
          <div className="mt-4 pt-3 flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs font-bold text-[#607080]">
              <span className="flex items-center gap-1.5 text-[#006590]">
                <Star className="w-4 h-4 text-[#FFD966] fill-[#FFD966]" />
                Page {currentPageNum} of {totalPages}
              </span>
              <span className="text-[#5c4bc3]">
                {progressPercent}% Read &bull; ~{Math.max(1, Math.round((totalPages - currentPageNum) * 0.8))} mins left
              </span>
            </div>

            <div className="relative w-full h-3.5 bg-[#e3f0f8] rounded-full overflow-visible">
              {/* Filled bar */}
              <div
                className="h-full bg-gradient-to-r from-[#6ec6ff] via-[#7DDCC8] to-[#FFD966] rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />

              {/* Dragon / Character Progress Head Marker */}
              <div
                className="absolute top-1/2 -translate-y-1/2 -ml-3 flex items-center justify-center w-8 h-8 rounded-full bg-[#ffffff] shadow-[0_4px_10px_rgba(0,101,144,0.25)] border-2 border-[#7DDCC8] transform hover:scale-125 transition-transform cursor-pointer"
                style={{ left: `${progressPercent}%` }}
                title={`${story.characters[0] || 'Character'} is here!`}
              >
                <span className="text-sm select-none">🐉</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Story Presentation: Illustrated Book Split Canvas */}
        <div className="w-full bg-[#ffffff] rounded-3xl shadow-[0_16px_36px_-6px_rgba(92,75,195,0.12)] overflow-hidden border border-[#e3f0f8]">
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
            {/* Left Side: Rich Vibrant Illustration */}
            <div className="lg:col-span-6 relative bg-gradient-to-b from-[#112a45] via-[#153e5e] to-[#0c1f33] overflow-hidden flex flex-col items-center justify-center min-h-[380px] lg:min-h-[640px]">
              <img
                alt={currentPage.sceneTitle}
                src={currentPage.illustration || story.coverImage}
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#0c1f33]/80 via-transparent to-transparent pointer-events-none" />

              {/* Illustrated badge pill on the visual */}
              <div className="absolute bottom-5 left-5 right-5 sm:left-6 sm:right-auto flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-[#ffffff]/90 backdrop-blur-md shadow-md text-[#111d23]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#7DDCC8] animate-pulse" />
                <span className="font-bold text-xs sm:text-sm text-[#006590]">
                  {currentPage.locationTag || 'The Whispering Woods • Midnight'}
                </span>
              </div>

              {/* Sound Cue Button */}
              <button
                type="button"
                onClick={() => setActiveAmbience(!activeAmbience)}
                className="absolute top-5 right-5 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ffffff]/85 backdrop-blur-md text-[#3f484f] hover:text-[#006590] transition-all duration-200 shadow-sm hover:scale-105 cursor-pointer text-xs font-bold"
              >
                <AudioWaveform className="w-4 h-4 text-[#FFD966]" />
                <span>
                  {activeAmbience
                    ? currentPage.ambientSoundName || 'Forest Crickets'
                    : 'Ambience Muted'}
                </span>
              </button>
            </div>

            {/* Right Side: Story Text & Interactive Narrative */}
            <div className="lg:col-span-6 p-6 sm:p-10 lg:p-12 flex flex-col justify-between bg-[#F0F8FF]/30">
              <div className="space-y-6">
                {/* Chapter Metadata Header */}
                <div className="flex items-center justify-between pb-2">
                  <span className="px-3.5 py-1 rounded-full bg-[#e5deff] text-[#180065] text-xs font-bold uppercase tracking-wider">
                    {currentPage.sceneTitle}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-[#607080] font-semibold">
                    <BookOpen className="w-4 h-4 text-[#006590]" />
                    <span>Bedtime Mode</span>
                  </div>
                </div>

                {/* Story Body with Scalable Typography */}
                <div
                  className="space-y-5 text-[#111d23] transition-all duration-200"
                  style={{ fontSize: fontSizes[fontSizeIndex], lineHeight: 1.68 }}
                >
                  {currentPage.text.map((para, i) => (
                    <p
                      key={i}
                      className={
                        i === 0
                          ? "font-['Quicksand'] font-bold text-[#006590] leading-snug"
                          : 'leading-relaxed'
                      }
                    >
                      {para}
                    </p>
                  ))}

                  {/* Highlighted Story Callout */}
                  {currentPage.callout && (
                    <div className="relative p-5 sm:p-6 rounded-2xl bg-[#ffa69d]/30 shadow-[0_4px_16px_rgba(158,64,57,0.06)] flex items-start gap-4 border border-[#ffa69d]/50 my-4">
                      <div className="w-12 h-12 rounded-2xl bg-[#ffffff] flex items-center justify-center shrink-0 shadow-sm text-2xl">
                        {currentPage.callout.icon}
                      </div>
                      <div>
                        <p className="font-['Quicksand'] font-bold text-lg text-[#9e4039]">
                          {currentPage.callout.title}
                        </p>
                        <p className="text-xs sm:text-sm text-[#3f484f] mt-1">
                          {currentPage.callout.subtitle}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Interactive Choice Box (Branching Story Mechanic) */}
              {currentPage.choice && (
                <div className="mt-8 pt-6 border-t border-[#e3f0f8]">
                  <div className="p-6 rounded-3xl bg-[#ffffff] shadow-[0_8px_24px_rgba(92,75,195,0.08)] border border-[#e3f0f8]">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#FFD966] text-[#111d23] font-bold text-xs shadow-sm">
                        ✨
                      </span>
                      <h2 className="font-['Quicksand'] font-bold text-lg text-[#5c4bc3]">
                        {currentPage.choice.prompt}
                      </h2>
                    </div>

                    <p className="text-xs text-[#607080] mb-4">
                      {currentPage.choice.subtext}
                    </p>

                    {/* Choice Action Buttons */}
                    <div className="grid grid-cols-1 gap-3">
                      {currentPage.choice.options.map((opt, idx) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => handleSelectChoice(opt.targetPage, opt.id)}
                          className={`group text-left w-full p-4 rounded-2xl transition-all duration-200 cursor-pointer border ${
                            selectedChoiceId === opt.id
                              ? 'bg-[#c8e6ff] border-[#006590] scale-102 shadow-md'
                              : idx === 0
                              ? 'bg-[#6ec6ff] text-[#005176] hover:bg-[#c8e6ff] shadow-[0_4px_0_#006590] border-transparent'
                              : 'bg-[#e9f6fd] text-[#111d23] hover:bg-[#e5deff] border-[#e3f0f8]'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <span className="text-2xl shrink-0 group-hover:scale-125 transition-transform duration-200">
                              {opt.emoji}
                            </span>
                            <div className="min-w-0 flex-1">
                              <span className="block font-bold text-sm leading-snug">
                                {opt.title}
                              </span>
                              <span className="block text-xs opacity-90 mt-0.5">
                                {opt.description}
                              </span>
                            </div>
                            <ChevronRight className="w-5 h-5 ml-auto self-center shrink-0 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Reading Navigation Footer & Sensory Controls */}
        <div className="w-full mt-6 bg-[#ffffff]/90 backdrop-blur-md rounded-2xl p-4 shadow-[0_8px_24px_-4px_rgba(38,50,56,0.06)] flex flex-wrap items-center justify-between gap-4 border border-[#e3f0f8]">
          {/* Previous Page Pill */}
          <button
            type="button"
            onClick={handlePrevPage}
            disabled={currentPageNum <= 1}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm shadow-sm transition-all cursor-pointer ${
              currentPageNum <= 1
                ? 'opacity-40 cursor-not-allowed bg-[#ddeaf2] text-[#607080]'
                : 'bg-[#ddeaf2] hover:bg-[#e3f0f8] text-[#111d23] active:scale-95'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Previous Page</span>
          </button>

          {/* Center Page Badge and Star Marker */}
          <div className="flex items-center gap-3 bg-[#e9f6fd] px-5 py-2 rounded-full border border-[#cfdce4]/50">
            <Sparkles className="w-5 h-5 text-[#FFD966]" />
            <span className="font-['Quicksand'] font-bold text-lg text-[#006590]">
              Page {currentPageNum}{' '}
              <span className="text-[#607080] font-normal text-sm">/ {totalPages}</span>
            </span>
            <span className="w-2 h-2 rounded-full bg-[#7DDCC8]" />
          </div>

          {/* Next Page Pill (Primary Action) */}
          <button
            type="button"
            onClick={handleNextPage}
            disabled={currentPageNum >= totalPages}
            className={`flex items-center gap-2 px-8 py-3 rounded-full font-bold text-sm shadow-[0_4px_0_#004c6e,0_8px_16px_rgba(0,101,144,0.3)] transition-all cursor-pointer ${
              currentPageNum >= totalPages
                ? 'opacity-40 cursor-not-allowed bg-[#006590] text-[#ffffff]'
                : 'bg-[#006590] text-[#ffffff] hover:brightness-105 active:translate-y-1'
            }`}
          >
            <span>Next Page</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Child-Friendly Sleep / Auto-Scroll Mini Dock */}
        <div className="mt-4 flex flex-wrap items-center justify-between px-2 text-[#607080] text-xs font-semibold gap-2">
          <div className="flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-[#7DDCC8]" />
            <span>Child-Safe Mode active &bull; No distractions</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenBedtimeTimer}
              className="hover:text-[#006590] transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Moon className="w-3.5 h-3.5 text-[#5c4bc3]" />
              <span>Bedtime Timer: 15m</span>
            </button>
            <span>&bull;</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#006590]" />
              <span>Voice: Gentle Luna</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
