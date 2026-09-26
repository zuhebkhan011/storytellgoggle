import React, { useState } from 'react';
import { Moon, Sparkles, Volume2, X, Sun, Check } from 'lucide-react';
import { ambientSound } from '../utils/audioSynthesizer';

interface BedtimeTimerModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeTimer: number | null; // in minutes
  onSetTimer: (minutes: number | null) => void;
  isDimmed: boolean;
  onToggleDim: () => void;
}

export const BedtimeTimerModal: React.FC<BedtimeTimerModalProps> = ({
  isOpen,
  onClose,
  activeTimer,
  onSetTimer,
  isDimmed,
  onToggleDim
}) => {
  const [selectedAmbience, setSelectedAmbience] = useState<string>('crickets');

  if (!isOpen) return null;

  const handleSelectAmbience = (sound: string) => {
    setSelectedAmbience(sound);
    ambientSound.playAmbience(sound, 0.2);
  };

  const timerOptions = [
    { label: '15 Minutes', minutes: 15, icon: '🌙' },
    { label: '30 Minutes', minutes: 30, icon: '⭐' },
    { label: '45 Minutes', minutes: 45, icon: '☁️' },
    { label: 'Until Story Ends', minutes: 0, icon: '📖' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#5c4bc3] text-[#ffffff] rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative overflow-hidden border border-[#9485ff]/30">
        {/* Soft background glow */}
        <div className="absolute -top-16 -left-16 w-48 h-48 rounded-full bg-[#FFD966]/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -right-16 w-56 h-56 rounded-full bg-[#6ec6ff]/20 blur-3xl pointer-events-none" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#ffffff]/10 hover:bg-[#ffffff]/20 text-[#ffffff] flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-[#FFD966] text-[#111d23] flex items-center justify-center shadow-md">
            <Moon className="w-6 h-6 fill-[#111d23]" />
          </div>
          <div>
            <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#9485ff]/40 text-xs font-bold text-[#FFD966] mb-0.5">
              Gentle Sleep Mode
            </span>
            <h3 className="font-['Quicksand'] font-bold text-2xl text-[#ffffff]">
              Bedtime Timer &amp; Sleepy Haven
            </h3>
          </div>
        </div>

        <p className="text-sm text-[#e5deff] leading-relaxed mb-6">
          Set our magical sleep timer to softly fade out narration, ease screen brightness, and guide your little adventurer into sweet dreamland.
        </p>

        {/* Timer Selection */}
        <div className="space-y-2 mb-6">
          <label className="text-xs font-bold text-[#FFD966] uppercase tracking-wider block">
            Choose Sleep Timer
          </label>
          <div className="grid grid-cols-2 gap-2.5">
            {timerOptions.map((opt) => {
              const isSelected = activeTimer === opt.minutes;
              return (
                <button
                  key={opt.label}
                  onClick={() => onSetTimer(opt.minutes)}
                  className={`flex items-center gap-2 p-3 rounded-2xl font-bold text-sm transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#ffffff] text-[#5c4bc3] shadow-md scale-102'
                      : 'bg-[#ffffff]/10 hover:bg-[#ffffff]/20 text-[#ffffff]'
                  }`}
                >
                  <span className="text-lg">{opt.icon}</span>
                  <span>{opt.label}</span>
                  {isSelected && <Check className="w-4 h-4 ml-auto text-[#5c4bc3]" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Ambient Sleep Soundscapes */}
        <div className="space-y-2 mb-6">
          <label className="text-xs font-bold text-[#FFD966] uppercase tracking-wider block flex items-center gap-1.5">
            <Volume2 className="w-4 h-4" />
            <span>Bedtime Background Soundscape</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { id: 'crickets', label: 'Crickets', emoji: '🌙' },
              { id: 'rain', label: 'Soft Rain', emoji: '🌧️' },
              { id: 'harp', label: 'Fairy Harp', emoji: '🎶' },
              { id: 'none', label: 'Mute', emoji: '🔇' }
            ].map((snd) => (
              <button
                key={snd.id}
                onClick={() => handleSelectAmbience(snd.id)}
                className={`flex items-center gap-1.5 p-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedAmbience === snd.id
                    ? 'bg-[#FFD966] text-[#111d23] shadow-sm'
                    : 'bg-[#ffffff]/10 hover:bg-[#ffffff]/20 text-[#ffffff]'
                }`}
              >
                <span>{snd.emoji}</span>
                <span className="truncate">{snd.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Cozy Screen Warmth / Dimming */}
        <div className="p-3.5 rounded-2xl bg-[#ffffff]/10 flex items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-2.5">
            <Sun className="w-5 h-5 text-[#FFD966]" />
            <div>
              <p className="text-xs font-bold text-[#ffffff]">Night Light Dimming</p>
              <p className="text-[11px] text-[#e5deff]">
                Soft amber tone to reduce blue light glare before sleep
              </p>
            </div>
          </div>
          <button
            onClick={onToggleDim}
            className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
              isDimmed ? 'bg-[#FFD966]' : 'bg-[#ffffff]/30'
            }`}
          >
            <span
              className={`w-5 h-5 rounded-full bg-[#ffffff] absolute top-0.5 transition-transform ${
                isDimmed ? 'left-6 bg-[#5c4bc3]' : 'left-0.5'
              }`}
            />
          </button>
        </div>

        {/* Confirm / Close Button */}
        <button
          onClick={onClose}
          className="w-full py-3.5 rounded-full bg-[#FFD966] text-[#111d23] font-['Quicksand'] font-bold text-base shadow-[0_4px_0_#e6bc3a] hover:brightness-105 active:translate-y-1 transition-all cursor-pointer flex items-center justify-center gap-2"
        >
          <Sparkles className="w-5 h-5" />
          <span>Start Bedtime Routine</span>
        </button>
      </div>
    </div>
  );
};
