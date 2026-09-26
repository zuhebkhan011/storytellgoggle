import React, { useState } from 'react';
import {
  ShieldCheck,
  Clock,
  BookOpen,
  Headphones,
  Sliders,
  Moon,
  Volume2,
  Calendar,
  Lock,
  Check,
  RotateCcw
} from 'lucide-react';
import { UserProfile, ParentSettings } from '../types/story';

interface ParentViewProps {
  userProfile: UserProfile;
  parentSettings: ParentSettings;
  onUpdateParentSettings: (newSettings: Partial<ParentSettings>) => void;
  onNavigate: (path: string) => void;
}

export const ParentView: React.FC<ParentViewProps> = ({
  userProfile,
  parentSettings,
  onUpdateParentSettings,
  onNavigate
}) => {
  const [screenLimit, setScreenLimit] = useState(parentSettings.dailyScreenLimitMinutes);
  const [bedtimeDim, setBedtimeDim] = useState(parentSettings.bedtimeDimEnabled);
  const [soundEffects, setSoundEffects] = useState(parentSettings.soundEffectsEnabled);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const weeklyDays = [
    { day: 'Mon', minutes: 25, stories: 1 },
    { day: 'Tue', minutes: 30, stories: 2 },
    { day: 'Wed', minutes: 15, stories: 1 },
    { day: 'Thu', minutes: 35, stories: 2 },
    { day: 'Fri', minutes: 40, stories: 3 },
    { day: 'Sat', minutes: 20, stories: 1 },
    { day: 'Sun', minutes: 10, stories: 1 }
  ];

  const maxMinutes = Math.max(...weeklyDays.map((d) => d.minutes));

  const handleSaveSettings = () => {
    onUpdateParentSettings({
      dailyScreenLimitMinutes: screenLimit,
      bedtimeDimEnabled: bedtimeDim,
      soundEffectsEnabled: soundEffects
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="flex flex-col w-full pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8 space-y-10">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#ffffff] p-6 sm:p-8 rounded-3xl shadow-sm border border-[#e3f0f8]">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e5deff] text-[#180065] text-xs font-bold">
              <Lock className="w-3.5 h-3.5 text-[#5c4bc3]" />
              <span>Verified Parent Zone</span>
            </div>
            <h1 className="font-['Quicksand'] font-bold text-3xl sm:text-4xl text-[#111d23]">
              Family Dashboard &amp; Controls
            </h1>
            <p className="text-sm text-[#607080]">
              Insights into {userProfile.name}&apos;s reading routines, bedtime sleep timers, and screen safety limits.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('/')}
              className="px-5 py-2.5 rounded-full bg-[#e9f6fd] hover:bg-[#ddeaf2] text-[#006590] text-sm font-bold transition-colors cursor-pointer"
            >
              Exit to Kids Mode 👶
            </button>
          </div>
        </header>

        {/* Weekly Reading Activity Summary */}
        <div className="bg-[#ffffff] rounded-3xl p-6 sm:p-8 shadow-sm border border-[#e3f0f8] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-bold text-[#5c4bc3] uppercase tracking-wider">
                Weekly Engagement
              </span>
              <h2 className="font-['Quicksand'] font-bold text-2xl text-[#111d23]">
                {userProfile.name} read 4 stories this week.
              </h2>
            </div>
            <span className="text-xs text-[#607080] font-semibold flex items-center gap-1">
              <Calendar className="w-4 h-4 text-[#006590]" /> Past 7 Days
            </span>
          </div>

          {/* Simple Visual Activity Bar Chart */}
          <div className="pt-4">
            <div className="grid grid-cols-7 gap-2 sm:gap-4 items-end h-44 border-b border-[#e3f0f8] pb-3">
              {weeklyDays.map((item) => {
                const heightPercent = Math.round((item.minutes / maxMinutes) * 100);
                const isToday = item.day === 'Sat';
                return (
                  <div key={item.day} className="flex flex-col items-center gap-2 h-full justify-end">
                    <span className="text-[11px] font-bold text-[#607080] hidden sm:block">
                      {item.minutes}m
                    </span>
                    <div
                      className={`w-full max-w-[42px] rounded-t-xl transition-all duration-500 ${
                        isToday
                          ? 'bg-[#006590] shadow-md'
                          : 'bg-[#6ec6ff] hover:bg-[#c8e6ff]'
                      }`}
                      style={{ height: `${heightPercent}%` }}
                      title={`${item.day}: ${item.minutes} minutes (${item.stories} stories)`}
                    />
                    <span className="text-xs font-bold text-[#111d23]">{item.day}</span>
                  </div>
                );
              })}
            </div>
            <div className="flex items-center justify-between pt-3 text-xs text-[#607080]">
              <span>Average: 25 mins / day</span>
              <span className="text-[#006590] font-bold">Goal: 20 mins &bull; 125% Achieved</span>
            </div>
          </div>

          {/* Breakdown KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            <div className="p-4 rounded-2xl bg-[#e9f6fd] space-y-1">
              <span className="text-xs font-bold text-[#607080]">Stories Completed</span>
              <p className="font-['Quicksand'] font-bold text-2xl text-[#006590]">
                {userProfile.storiesReadCount} Books
              </p>
              <p className="text-[11px] text-[#607080]">4 added this week</p>
            </div>

            <div className="p-4 rounded-2xl bg-[#e5deff] space-y-1">
              <span className="text-xs font-bold text-[#607080]">Audio vs Reading</span>
              <p className="font-['Quicksand'] font-bold text-2xl text-[#5c4bc3]">
                40% Audio &bull; 60% Read
              </p>
              <p className="text-[11px] text-[#607080]">Healthy multimodal mix</p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FFF9EE] space-y-1 border border-[#FFD966]/40">
              <span className="text-xs font-bold text-[#607080]">Favorite Themes</span>
              <p className="font-['Quicksand'] font-bold text-2xl text-[#111d23]">
                Bedtime &amp; Animals
              </p>
              <p className="text-[11px] text-[#607080]">High interest in bedtime lullabies</p>
            </div>
          </div>
        </div>

        {/* Parent Controls & Safety Guardrails */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Controls Form */}
          <div className="lg:col-span-7 bg-[#ffffff] rounded-3xl p-6 sm:p-8 shadow-sm border border-[#e3f0f8] space-y-6">
            <div className="flex items-center gap-2">
              <Sliders className="w-5 h-5 text-[#006590]" />
              <h3 className="font-['Quicksand'] font-bold text-xl text-[#111d23]">
                Safety &amp; Reading Guardrails
              </h3>
            </div>

            {/* Daily Screen Time Limit Slider */}
            <div className="space-y-3 p-4 rounded-2xl bg-[#f4faff] border border-[#e3f0f8]">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-bold text-[#111d23] block">
                    Daily Reading Screen Limit
                  </label>
                  <p className="text-xs text-[#607080]">
                    Gentle reminder notification when reached
                  </p>
                </div>
                <span className="font-['Quicksand'] font-bold text-xl text-[#006590]">
                  {screenLimit} mins
                </span>
              </div>
              <input
                type="range"
                min="15"
                max="90"
                step="5"
                value={screenLimit}
                onChange={(e) => setScreenLimit(parseInt(e.target.value, 10))}
                className="w-full accent-[#006590] cursor-pointer"
              />
            </div>

            {/* Bedtime Auto Dimming */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-[#f4faff] border border-[#e3f0f8]">
              <div className="flex items-center gap-3">
                <Moon className="w-5 h-5 text-[#5c4bc3]" />
                <div>
                  <p className="text-sm font-bold text-[#111d23]">
                    Bedtime Calm Dimming
                  </p>
                  <p className="text-xs text-[#607080]">
                    Softens blue light glare after 8:00 PM
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setBedtimeDim(!bedtimeDim)}
                className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                  bedtimeDim ? 'bg-[#5c4bc3]' : 'bg-[#ddeaf2]'
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-full bg-[#ffffff] absolute top-0.5 transition-transform ${
                    bedtimeDim ? 'left-6' : 'left-0.5'
                  }`}
                />
              </button>
            </div>

            {/* Ambient Soundscapes */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-[#f4faff] border border-[#e3f0f8]">
              <div className="flex items-center gap-3">
                <Volume2 className="w-5 h-5 text-[#006590]" />
                <div>
                  <p className="text-sm font-bold text-[#111d23]">
                    Interactive Ambient Soundscapes
                  </p>
                  <p className="text-xs text-[#607080]">
                    Forest crickets, soft rain, and fairy harp music
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSoundEffects(!soundEffects)}
                className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                  soundEffects ? 'bg-[#006590]' : 'bg-[#ddeaf2]'
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-full bg-[#ffffff] absolute top-0.5 transition-transform ${
                    soundEffects ? 'left-6' : 'left-0.5'
                  }`}
                />
              </button>
            </div>

            <button
              onClick={handleSaveSettings}
              className="w-full py-3.5 rounded-full bg-[#006590] text-[#ffffff] font-bold text-sm shadow-[0_4px_0_#004c6e] hover:brightness-105 active:translate-y-1 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-4 h-4 text-[#7DDCC8]" />
                  <span>Settings Saved!</span>
                </>
              ) : (
                <span>Save Parent Preferences</span>
              )}
            </button>
          </div>

          {/* Child-Safe Promise Card */}
          <div className="lg:col-span-5 bg-[#ffffff] rounded-3xl p-6 sm:p-8 shadow-sm border border-[#e3f0f8] space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[#006590]">
                <ShieldCheck className="w-6 h-6 text-[#006590]" />
                <h3 className="font-['Quicksand'] font-bold text-xl text-[#111d23]">
                  100% Kid-Safe &amp; Ad-Free
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-[#607080] leading-relaxed">
                WonderTales was built from the ground up for safe, peaceful exploration:
              </p>

              <ul className="space-y-3 text-xs sm:text-sm text-[#3f484f]">
                <li className="flex items-start gap-2.5">
                  <span className="text-[#7DDCC8] font-bold text-base">✓</span>
                  <span><strong>Zero Third-Party Ads:</strong> No promotional interruptions, banners, or popups.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#7DDCC8] font-bold text-base">✓</span>
                  <span><strong>COPPA Compliant:</strong> No child data collection, tracking cookies, or tracking pixels.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#7DDCC8] font-bold text-base">✓</span>
                  <span><strong>Walled Garden:</strong> No external links, public chats, or unmoderated spaces.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#7DDCC8] font-bold text-base">✓</span>
                  <span><strong>Parental Gate:</strong> Settings and account controls require adult math verification.</span>
                </li>
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-[#e9f6fd] border border-[#e3f0f8] text-xs text-[#607080]">
              WonderTales Studio certification ID: <strong>WT-COPPA-2026</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
