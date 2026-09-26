import React, { useState, useEffect } from 'react';
import {
  Headphones,
  Moon,
  Sparkles,
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Star,
  Mic,
  Volume2,
  VolumeX,
  Clock,
  AudioWaveform,
  CheckCircle,
  Lightbulb,
  Check
} from 'lucide-react';
import { Story, UserProfile } from '../types/story';
import { ambientSound } from '../utils/audioSynthesizer';

interface ReadAloudViewProps {
  currentStory: Story;
  allStories: Story[];
  userProfile: UserProfile;
  onNavigate: (path: string) => void;
  onSelectStory: (storyId: string) => void;
  isDimmed: boolean;
  onToggleDim: () => void;
}

export const ReadAloudView: React.FC<ReadAloudViewProps> = ({
  currentStory,
  allStories,
  userProfile,
  onNavigate,
  onSelectStory,
  isDimmed,
  onToggleDim
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [sleepTimer, setSleepTimer] = useState<number | 'end'>(30);
  const [activeAmbience, setActiveAmbience] = useState<string>('crickets');
  const [currentProgressSec, setCurrentProgressSec] = useState<number>(134); // 2:14
  const totalDurationSec = 510; // 8:30
  const [textSizeIndex, setTextSizeIndex] = useState<number>(1); // 0=normal, 1=large, 2=xl

  const queueStories = allStories
    .filter((s) => s.id !== currentStory.id)
    .slice(0, 3);

  // Sync ambient soundscape
  useEffect(() => {
    ambientSound.playAmbience(activeAmbience, 0.2);
    return () => {
      ambientSound.stopAmbience();
    };
  }, [activeAmbience]);

  // Audio timer ticker simulation
  useEffect(() => {
    let interval: number;
    if (isPlaying) {
      interval = window.setInterval(() => {
        setCurrentProgressSec((prev) => {
          if (prev >= totalDurationSec) {
            setIsPlaying(false);
            return totalDurationSec;
          }
          return prev + 1;
        });
      }, 1000 / playbackSpeed);
    }
    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleRewind15 = () => {
    setCurrentProgressSec((prev) => Math.max(0, prev - 15));
  };

  const handleForward15 = () => {
    setCurrentProgressSec((prev) => Math.min(totalDurationSec, prev + 15));
  };

  const handleScrubberClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    setCurrentProgressSec(Math.round(ratio * totalDurationSec));
  };

  const progressPercent = (currentProgressSec / totalDurationSec) * 100;
  const remainingSec = Math.max(0, totalDurationSec - currentProgressSec);

  return (
    <div className="flex flex-col w-full pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full py-8 space-y-10">
        {/* Top Breadcrumb & Page Introduction Banner */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e5deff] text-[#180065] text-xs font-bold shadow-sm">
              <Headphones className="w-4 h-4 text-[#5c4bc3]" />
              <span>WonderTales Audio Theatre</span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#5c4bc3] animate-ping" />
              <span className="text-[#5c4bc3] font-bold">Now Playing</span>
            </div>

            <h1 className="font-['Quicksand'] font-bold text-3xl sm:text-4xl lg:text-5xl text-[#006590] tracking-tight">
              Read Aloud Story Theater 🎧
            </h1>

            <p className="text-base sm:text-lg text-[#607080] max-w-2xl leading-relaxed">
              Sit back, relax, and let the magical voices bring the tale alive. Perfect for tuck-in bedtime adventures.
            </p>
          </div>

          {/* Quick Session Indicator / Bedtime Routine Badge */}
          <div className="flex items-center gap-3 bg-[#ffffff] px-4 py-3 rounded-2xl shadow-[0_4px_16px_rgba(38,50,56,0.06)] border border-[#e3f0f8] shrink-0">
            <div className="w-10 h-10 rounded-full bg-[#FFD966]/30 flex items-center justify-center text-[#006590]">
              <Moon className="w-5 h-5 text-[#5c4bc3]" />
            </div>
            <div>
              <span className="block text-[11px] font-bold text-[#607080] uppercase tracking-wider">
                Bedtime Mode
              </span>
              <span className="font-['Quicksand'] font-bold text-base text-[#111d23]">
                Calm &amp; Dreamy
              </span>
            </div>
          </div>
        </div>

        {/* Main Stage Bento Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Story Book Art & Floating Narrator (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            {/* Floating Cover Container with Cloud Shadows */}
            <div className="relative w-full max-w-[420px] group">
              <div className="absolute -inset-4 bg-gradient-to-tr from-[#9485ff]/30 via-[#FFD966]/25 to-[#7DDCC8]/30 rounded-3xl blur-2xl opacity-75 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              <div className="relative rounded-3xl overflow-hidden bg-[#ffffff] p-3 shadow-[0_16px_36px_-6px_rgba(92,75,195,0.2)] border border-[#e3f0f8] transition-transform duration-500 ease-out hover:scale-[1.015]">
                <div className="relative rounded-2xl overflow-hidden aspect-square bg-[#e3f0f8]">
                  <img
                    alt={currentStory.title}
                    src={currentStory.coverImage}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />

                  {/* Floating Age & Duration Tags on Cover */}
                  <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-full bg-[#ffffff]/90 backdrop-blur-md text-xs font-bold text-[#006590] shadow-sm flex items-center gap-1">
                      👶 {currentStory.ageRange}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-[#ffffff]/90 backdrop-blur-md text-xs font-bold text-[#111d23] shadow-sm flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#006590]" /> {currentStory.readingTime}
                    </span>
                  </div>

                  <div className="absolute bottom-3 right-3 bg-[#e5deff]/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 text-[#180065] text-xs font-bold shadow-sm">
                    <Sparkles className="w-3.5 h-3.5 text-[#5c4bc3]" />
                    <span>Story #14</span>
                  </div>
                </div>

                {/* Narrator Floating Badge */}
                <div className="mt-3 p-3.5 rounded-2xl bg-[#F0F8FF] flex items-center gap-3 border border-[#e3f0f8]">
                  <div className="w-10 h-10 rounded-full bg-[#c8e6ff] flex items-center justify-center text-[#006590] shrink-0 shadow-sm">
                    <Mic className="w-5 h-5 text-[#006590]" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-bold text-[#607080] uppercase">
                      Narrated with warmth by
                    </p>
                    <p className="font-['Quicksand'] font-bold text-sm text-[#006590] truncate">
                      {currentStory.narrator}
                    </p>
                  </div>
                  <CheckCircle className="w-4 h-4 text-[#FFD966] ml-auto shrink-0 fill-[#FFD966]" />
                </div>
              </div>
            </div>

            {/* Audio Waveform Quick Visualizer */}
            <div className="w-full max-w-[420px] mt-6 bg-[#ffffff] p-4 rounded-2xl shadow-[0_8px_24px_-4px_rgba(38,50,56,0.06)] flex items-center justify-between border border-[#e3f0f8]">
              <div className="flex items-center gap-2">
                <AudioWaveform className="w-5 h-5 text-[#5c4bc3]" />
                <span className="text-xs sm:text-sm font-bold text-[#111d23]">
                  Audio Waveform
                </span>
              </div>

              {/* Animated equalizer wave bars */}
              <div className="flex items-end gap-1.5 h-7 px-2">
                {[
                  { color: 'bg-[#7DDCC8]', h: isPlaying ? 'h-3' : 'h-2' },
                  { color: 'bg-[#9485ff]', h: isPlaying ? 'h-6' : 'h-3' },
                  { color: 'bg-[#6ec6ff]', h: isPlaying ? 'h-4' : 'h-2' },
                  { color: 'bg-[#FFD966]', h: isPlaying ? 'h-7' : 'h-4' },
                  { color: 'bg-[#5c4bc3]', h: isPlaying ? 'h-5' : 'h-3' },
                  { color: 'bg-[#7DDCC8]', h: isPlaying ? 'h-3' : 'h-2' },
                  { color: 'bg-[#6ec6ff]', h: isPlaying ? 'h-6' : 'h-3' },
                  { color: 'bg-[#9485ff]', h: isPlaying ? 'h-4' : 'h-2' }
                ].map((bar, i) => (
                  <span
                    key={i}
                    className={`w-1.5 rounded-full transition-all duration-300 ${bar.color} ${
                      bar.h
                    } ${isPlaying ? 'animate-pulse' : ''}`}
                    style={{ animationDelay: `${i * 120}ms` }}
                  />
                ))}
              </div>

              <span className="text-xs font-bold text-[#607080]">
                {formatTime(currentProgressSec)} / {formatTime(totalDurationSec)}
              </span>
            </div>
          </div>

          {/* Right Column: Karaoke Teleprompter & Large Controls (7 cols) */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            {/* Live Narrated Sentence Highlighting (Karaoke Display Card) */}
            <div className="bg-[#ffffff] p-6 sm:p-8 rounded-3xl shadow-[0_8px_28px_-4px_rgba(38,50,56,0.08)] relative overflow-hidden border border-[#e3f0f8]">
              <div className="flex items-center justify-between pb-4">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#7DDCC8] animate-ping" />
                  <span className="text-xs sm:text-sm font-bold text-[#006590]">
                    Live Storybook Narration
                  </span>
                </div>
                <span className="text-xs font-bold text-[#607080] bg-[#e3f0f8] px-3 py-1 rounded-full">
                  Page 3 of 12
                </span>
              </div>

              {/* Highlighted Text Display */}
              <div className="space-y-4 py-2">
                {/* Active Karaoke Sentence with Golden Luminous Pulse */}
                <div className="relative p-5 rounded-2xl bg-[#FFD966]/20 shadow-[0_0_20px_4px_rgba(255,217,102,0.45)] transition-all duration-300 border border-[#FFD966]/40">
                  <div className="flex items-start gap-2.5">
                    <Star className="w-5 h-5 text-[#FFD966] fill-[#FFD966] shrink-0 mt-1" />
                    <p
                      className="font-['Quicksand'] font-bold text-[#111d23] leading-relaxed"
                      style={{ fontSize: textSizeIndex === 0 ? '18px' : textSizeIndex === 1 ? '22px' : '26px' }}
                    >
                      “Little Cloudy looked down at the slumbering rooftops and whispered to the silver moon,{' '}
                      <span className="bg-[#FFD966]/60 px-1 py-0.5 rounded-lg text-[#006590]">
                        ‘Where do dreams go when the sun wakes up?’
                      </span>”
                    </p>
                  </div>
                </div>

                {/* Up Next Sentence in Softer Gentle Contrast */}
                <div className="p-4 rounded-2xl bg-[#F5F1FF]/50 opacity-80 hover:opacity-100 transition-opacity border border-[#e5deff]/40">
                  <p
                    className="text-[#607080] leading-relaxed"
                    style={{ fontSize: textSizeIndex === 0 ? '15px' : textSizeIndex === 1 ? '18px' : '21px' }}
                  >
                    The moon smiled with sleepy eyes and sprinkled sparkling stardust across the evening breeze.
                  </p>
                </div>
              </div>

              {/* Text Size & Read Along Speed Prompt */}
              <div className="flex items-center justify-between pt-4 text-[#607080] text-xs font-semibold">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#FFD966]" />
                  <span>Karaoke Highlight Active</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>Text size:</span>
                  <button
                    onClick={() => setTextSizeIndex((prev) => Math.max(0, prev - 1))}
                    className="w-7 h-7 rounded-full bg-[#e3f0f8] flex items-center justify-center font-bold text-[#111d23] hover:bg-[#ddeaf2] cursor-pointer"
                  >
                    A-
                  </button>
                  <button
                    onClick={() => setTextSizeIndex((prev) => Math.min(2, prev + 1))}
                    className="w-7 h-7 rounded-full bg-[#e3f0f8] flex items-center justify-center font-bold text-[#111d23] hover:bg-[#ddeaf2] cursor-pointer"
                  >
                    A+
                  </button>
                </div>
              </div>
            </div>

            {/* Primary Large Audio Player Console */}
            <div className="bg-[#ffffff] p-6 sm:p-8 rounded-3xl shadow-[0_8px_24px_-4px_rgba(38,50,56,0.08)] space-y-6 border border-[#e3f0f8]">
              {/* Scrubbing Progress Bar with Playful Star Scrubber Thumb */}
              <div className="space-y-2">
                <div
                  onClick={handleScrubberClick}
                  className="relative w-full h-4 bg-[#e3f0f8] rounded-full cursor-pointer flex items-center"
                >
                  <div
                    className="h-full bg-gradient-to-r from-[#6ec6ff] via-[#7DDCC8] to-[#9485ff] rounded-full transition-all duration-200"
                    style={{ width: `${progressPercent}%` }}
                  />
                  <div
                    className="absolute w-8 h-8 rounded-full bg-[#FFD966] shadow-[0_2px_8px_rgba(0,0,0,0.18)] flex items-center justify-center text-[#111d23] transition-transform hover:scale-125"
                    style={{ left: `calc(${progressPercent}% - 16px)` }}
                  >
                    <Star className="w-4 h-4 fill-[#111d23]" />
                  </div>
                </div>

                <div className="flex justify-between items-center text-xs font-bold text-[#607080]">
                  <span>{formatTime(currentProgressSec)}</span>
                  <span className="text-[#006590]">Chapter 2: The Moon&apos;s Secret</span>
                  <span>-{formatTime(remainingSec)}</span>
                </div>
              </div>

              {/* Main Touch Controls (Play/Pause, Rewind, Fast Forward) */}
              <div className="flex items-center justify-center gap-6 sm:gap-10 pt-2">
                {/* 15s Rewind */}
                <button
                  type="button"
                  onClick={handleRewind15}
                  title="Rewind 15 seconds"
                  className="w-14 h-14 rounded-full bg-[#e3f0f8] text-[#006590] hover:bg-[#ddeaf2] active:translate-y-1 transition-all flex flex-col items-center justify-center shadow-sm cursor-pointer"
                >
                  <RotateCcw className="w-5 h-5" />
                  <span className="text-[10px] font-bold">15s</span>
                </button>

                {/* Large Round Primary Play/Pause Button (#5C4BC3) */}
                <button
                  type="button"
                  onClick={() => setIsPlaying(!isPlaying)}
                  aria-label={isPlaying ? 'Pause Story' : 'Play Story'}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#5c4bc3] text-[#ffffff] hover:bg-[#5c4bc3]/90 active:translate-y-1.5 transition-all duration-200 flex items-center justify-center shadow-[0_8px_20px_rgba(92,75,195,0.4)] group cursor-pointer"
                >
                  {isPlaying ? (
                    <Pause className="w-10 h-10 sm:w-12 sm:h-12 group-hover:scale-110 transition-transform" />
                  ) : (
                    <Play className="w-10 h-10 sm:w-12 sm:h-12 ml-1 fill-[#ffffff] group-hover:scale-110 transition-transform" />
                  )}
                </button>

                {/* 15s Forward */}
                <button
                  type="button"
                  onClick={handleForward15}
                  title="Skip forward 15 seconds"
                  className="w-14 h-14 rounded-full bg-[#e3f0f8] text-[#006590] hover:bg-[#ddeaf2] active:translate-y-1 transition-all flex flex-col items-center justify-center shadow-sm cursor-pointer"
                >
                  <RotateCw className="w-5 h-5" />
                  <span className="text-[10px] font-bold">15s</span>
                </button>
              </div>

              {/* Controls Sub-Row: Speed & Sleep Timer */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                {/* Playback Speed Picker */}
                <div className="bg-[#e9f6fd] p-4 rounded-2xl space-y-2 border border-[#cfdce4]/40">
                  <label className="text-xs font-bold text-[#607080] flex items-center gap-1">
                    <Clock className="w-4 h-4 text-[#006590]" />
                    Reading Pace
                  </label>

                  <div className="grid grid-cols-3 gap-1.5 bg-[#ffffff] p-1 rounded-full shadow-inner">
                    {[
                      { speed: 0.8, label: '0.8x 😴' },
                      { speed: 1.0, label: '1.0x ✨' },
                      { speed: 1.2, label: '1.2x 🏃' }
                    ].map((sp) => (
                      <button
                        key={sp.speed}
                        type="button"
                        onClick={() => setPlaybackSpeed(sp.speed)}
                        className={`px-2 py-1.5 rounded-full text-xs font-bold transition-all text-center cursor-pointer ${
                          playbackSpeed === sp.speed
                            ? 'bg-[#6ec6ff] text-[#005176] shadow-sm'
                            : 'text-[#3f484f] hover:text-[#111d23]'
                        }`}
                      >
                        {sp.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sleep Timer for Parents */}
                <div className="bg-[#e9f6fd] p-4 rounded-2xl space-y-2 border border-[#cfdce4]/40">
                  <label className="text-xs font-bold text-[#607080] flex items-center gap-1">
                    <Moon className="w-4 h-4 text-[#5c4bc3]" />
                    Parent Bedtime Sleep Timer
                  </label>

                  <div className="grid grid-cols-3 gap-1.5 bg-[#ffffff] p-1 rounded-full shadow-inner">
                    {[
                      { val: 15, label: '15 min' },
                      { val: 30, label: '30 min' },
                      { val: 'end' as const, label: 'Story End' }
                    ].map((tm) => (
                      <button
                        key={tm.label}
                        type="button"
                        onClick={() => setSleepTimer(tm.val)}
                        className={`px-2 py-1.5 rounded-full text-xs font-bold transition-all text-center cursor-pointer ${
                          sleepTimer === tm.val
                            ? 'bg-[#e5deff] text-[#180065] shadow-sm'
                            : 'text-[#3f484f] hover:text-[#111d23]'
                        }`}
                      >
                        {tm.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Background Ambience Selector Bar */}
              <div className="pt-2">
                <span className="block text-xs font-bold text-[#607080] mb-2.5 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#5c4bc3]" />
                  Bedtime Ambience Background Sound
                </span>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'crickets', label: 'Night Crickets', emoji: '🌙' },
                    { id: 'rain', label: 'Gentle Rain', emoji: '🌧️' },
                    { id: 'harp', label: 'Fairy Harp', emoji: '🎶' },
                    { id: 'none', label: 'Mute Ambience', emoji: '🔇' }
                  ].map((amb) => (
                    <button
                      key={amb.id}
                      type="button"
                      onClick={() => setActiveAmbience(amb.id)}
                      className={`px-3 py-2.5 rounded-2xl text-xs font-bold text-left flex items-center gap-2 shadow-sm transition-all hover:scale-[1.02] cursor-pointer ${
                        activeAmbience === amb.id
                          ? 'bg-[#e5deff] text-[#180065] border border-[#5c4bc3]/30'
                          : 'bg-[#e9f6fd] text-[#111d23] hover:bg-[#ddeaf2]'
                      }`}
                    >
                      <span className="text-base">{amb.emoji}</span>
                      <span className="truncate">{amb.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Bedtime Audio Queue Shelf */}
        <div className="pt-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#FFD966]/40 flex items-center justify-center text-[#111d23]">
                <AudioWaveform className="w-5 h-5 text-[#006590]" />
              </div>
              <div>
                <h2 className="font-['Quicksand'] font-bold text-2xl text-[#006590]">
                  Up Next in Dreamland Queue
                </h2>
                <p className="text-xs sm:text-sm text-[#607080]">
                  Handpicked gentle narrations for a peaceful night
                </p>
              </div>
            </div>

            <button
              onClick={() => onNavigate('/stories/bedtime')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#e3f0f8] text-xs font-bold text-[#006590] hover:bg-[#ddeaf2] transition-colors cursor-pointer w-fit"
            >
              <Sparkles className="w-4 h-4" />
              <span>Explore All Bedtime Stories</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {queueStories.map((qStory, idx) => (
              <div
                key={qStory.id}
                onClick={() => onSelectStory(qStory.id)}
                className="group bg-[#ffffff] p-4 rounded-3xl shadow-[0_8px_24px_-4px_rgba(38,50,56,0.06)] hover:shadow-[0_16px_36px_-6px_rgba(92,75,195,0.18)] transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 border border-[#e3f0f8] cursor-pointer"
              >
                <div className="space-y-3">
                  <div className="relative w-full h-44 rounded-2xl overflow-hidden bg-[#e3f0f8]">
                    <img
                      alt={qStory.title}
                      src={qStory.coverImage}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-[#e5deff]/90 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-[#180065]">
                      💤 {qStory.themeTag}
                    </span>
                    <span className="absolute bottom-3 right-3 bg-[#ffffff]/90 px-2.5 py-1 rounded-full text-xs font-bold text-[#111d23]">
                      {qStory.readingTime}
                    </span>
                  </div>

                  <div>
                    <span className="text-[11px] font-bold text-[#607080]">
                      Episode {idx + 2}
                    </span>
                    <h3 className="font-['Quicksand'] font-bold text-lg leading-snug text-[#111d23] group-hover:text-[#006590] transition-colors line-clamp-1">
                      {qStory.title}
                    </h3>
                    <p className="text-xs text-[#607080] mt-1 line-clamp-2 leading-relaxed">
                      {qStory.description}
                    </p>
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between mt-2 border-t border-[#f4faff]">
                  <span className="text-xs font-semibold text-[#5c4bc3] flex items-center gap-1">
                    <Mic className="w-3.5 h-3.5" /> {qStory.narrator}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectStory(qStory.id);
                    }}
                    className="w-9 h-9 rounded-full bg-[#6ec6ff] text-[#005176] flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-sm cursor-pointer"
                  >
                    <Play className="w-4 h-4 fill-[#005176]" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bedtime Tips & Audio Routine Card */}
        <div className="p-6 rounded-3xl bg-[#e9f6fd] flex flex-col md:flex-row items-center gap-6 shadow-[0_4px_16px_rgba(38,50,56,0.04)] border border-[#e3f0f8]">
          <div className="w-14 h-14 rounded-2xl bg-[#FFD966] flex items-center justify-center text-[#111d23] shrink-0 shadow-sm">
            <Lightbulb className="w-7 h-7 text-[#111d23]" />
          </div>

          <div className="space-y-1 text-center md:text-left">
            <h4 className="font-['Quicksand'] font-bold text-lg text-[#111d23]">
              WonderTales Bedtime Tip
            </h4>
            <p className="text-xs sm:text-sm text-[#607080] max-w-3xl leading-relaxed">
              Listening to audio stories with warm yellow highlights helps young minds develop descriptive vocabulary while keeping screen glare to a minimum before sleep.
            </p>
          </div>

          <div className="md:ml-auto shrink-0">
            <button
              onClick={onToggleDim}
              className="px-5 py-2.5 rounded-full bg-[#ffffff] text-[#006590] font-bold text-xs sm:text-sm hover:bg-[#e3f0f8] transition-colors shadow-sm cursor-pointer border border-[#e3f0f8]"
            >
              {isDimmed ? 'Restore Brightness ☀️' : 'Dim Screen Mode 🌙'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
