import React, { useState } from 'react';
import {
  Sparkles,
  BookOpen,
  Headphones,
  Clock,
  Heart,
  Award,
  Flame,
  CheckCircle,
  Star,
  Compass
} from 'lucide-react';
import { UserProfile } from '../types/story';

interface ProfileViewProps {
  userProfile: UserProfile;
  onUpdateProfile: (updated: Partial<UserProfile>) => void;
  onNavigate: (path: string) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  userProfile,
  onUpdateProfile,
  onNavigate
}) => {
  const [selectedAvatar, setSelectedAvatar] = useState(userProfile.avatar);
  const [isEditingAvatar, setIsEditingAvatar] = useState(false);

  const availableAvatars = [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBscC-R5b1XGq3qJWFe1NqzgbHblbiZn4HZFyi9AZ7gtb2gEmb7QH3p-mkM4_g3K5Uq0OyrkLji_-xs5jxb6zu0x5H6-ZhBkeZmel1LPGx7DXEnuKQd3Qzs6mTQDlj2Xau602rfNNautN7gDpaR9qjL-_NHAJpkx_QWrxyP1ZqyqSbDmrTgA0Nr_nhf1PzzY-N6yaqsqq4Q0wAuo-mEpog3eAn7lsiEDLDWKXEhtW6AAseCmpHOsWk8aw',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAvnYug9T9XuuOrXfkBFLoP5Edu9i-uzsUrk439j5ow6Q0wNuScyQujdBSgVMBpLM_jlFKmOKIpKcq6M7zYH7ozTnhwyXkjnJn6HQnh4GQBeWKTtpav4Gtu0Ypn2WiN3-cPZwplDhvxdmfjzNTQXhjNAP08DUZM6fBG0MJKFX7w4m-To0tpWfkqo4JaczcZ7hn-ndchFgA2WFD9OcsTQ2Cdkr3nvtjJwJl7AyVN5lLw3rO-dirLUzFZvQ',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAIBlp-8BKqbD1gIQRU3aGOplNa6Wd6vGMMd389Qm0jGtF8tCTOA1SpFSot4EBpXxaKfhAGMkhS0H2XER7OJZNCYSdM66YZ7yT-0jI4O4I26BolWavKEp-8nbCkwZXGg1NqoS9pNy-o7FHeJMA7keB08iz12Qi6MkaMEh8Edj8Yx1ELBu0KMFXkY_2llCw0LDiNFsQ4tDtfR7cmRxOzHtaVesksmBDbrNl4qfMQCi_aCs9aJg5k4ujaLQ',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBqyTu53bB8BXwuHSPQQ3fgrxgWKUSVDibThK4w6bi83LeXPwRblUKQt0DPuJHGxorvRcX2U6dcYmjq50284imiTSt5NR_I6w0lMto4reqa9Op_14H3-u9pUnSPTQltFLP9FdRJtfEmDzrDCaWjg6qzc2CkpiXoKMnxDZjgpgUUeyjp1kzRtDykwMbVDRxbD6R08sMJdA53haz8N9ZABDUwBJQ9_aNkhXi5vTi38GLlknnrZKPypx82vQ'
  ];

  const handleSaveAvatar = (newAvatar: string) => {
    setSelectedAvatar(newAvatar);
    onUpdateProfile({ avatar: newAvatar });
    setIsEditingAvatar(false);
  };

  return (
    <div className="flex flex-col w-full pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8 space-y-10">
        {/* Child Profile Welcome Header */}
        <div className="bg-gradient-to-r from-[#F5F1FF] via-[#ffffff] to-[#e9f6fd] rounded-3xl p-6 sm:p-10 shadow-sm border border-[#e3f0f8] flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8">
          {/* Avatar with edit prompt */}
          <div className="relative group shrink-0">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden shadow-lg ring-4 ring-[#6ec6ff]/50 bg-[#e3f0f8]">
              <img
                alt={userProfile.name}
                src={selectedAvatar}
                className="w-full h-full object-cover"
              />
            </div>
            <button
              onClick={() => setIsEditingAvatar(!isEditingAvatar)}
              className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-[#FFD966] text-[#111d23] shadow-md flex items-center justify-center text-xs font-bold hover:scale-110 transition-transform cursor-pointer"
              title="Change Picture"
            >
              ✏️
            </button>
          </div>

          {/* Child Greetings */}
          <div className="space-y-3 text-center sm:text-left flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c8e6ff] text-[#001e2f] text-xs font-bold">
              <span>🌟 Wonder Explorer</span>
              <span>&bull;</span>
              <span>Age {userProfile.age}</span>
            </div>

            <h1 className="font-['Quicksand'] font-bold text-3xl sm:text-4xl text-[#111d23]">
              Hi, {userProfile.name}! 👋
            </h1>

            <p className="text-sm sm:text-base text-[#607080] max-w-xl">
              You&apos;re doing fantastic on your reading journey! Here are your magical badges and adventures so far.
            </p>

            {/* Avatar selector modal/drawer */}
            {isEditingAvatar && (
              <div className="p-4 rounded-2xl bg-[#ffffff] border border-[#e3f0f8] shadow-md mt-4 max-w-md">
                <span className="text-xs font-bold text-[#607080] block mb-2">
                  Pick your favorite story character avatar:
                </span>
                <div className="flex gap-3">
                  {availableAvatars.map((av, i) => (
                    <button
                      key={i}
                      onClick={() => handleSaveAvatar(av)}
                      className={`w-12 h-12 rounded-full overflow-hidden border-2 transition-all cursor-pointer ${
                        selectedAvatar === av ? 'border-[#006590] scale-110 shadow-md' : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img alt="Option" src={av} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Quick Streak Card */}
          <div className="bg-[#ffffff] p-4 sm:p-5 rounded-2xl shadow-sm border border-[#e3f0f8] flex items-center gap-3 shrink-0">
            <div className="w-12 h-12 rounded-2xl bg-[#FFD966]/30 flex items-center justify-center text-2xl">
              🔥
            </div>
            <div>
              <span className="text-[11px] font-bold text-[#607080] uppercase">
                Reading Streak
              </span>
              <p className="font-['Quicksand'] font-bold text-xl text-[#006590]">
                {userProfile.readingStreakDays} Days in a Row!
              </p>
            </div>
          </div>
        </div>

        {/* Reading Statistics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-[#ffffff] p-5 sm:p-6 rounded-3xl shadow-sm border border-[#e3f0f8] space-y-2">
            <div className="w-10 h-10 rounded-2xl bg-[#c8e6ff] flex items-center justify-center text-[#006590]">
              <BookOpen className="w-5 h-5 text-[#006590]" />
            </div>
            <span className="text-xs font-bold text-[#607080] block">Stories Read</span>
            <p className="font-['Quicksand'] font-bold text-3xl text-[#111d23]">
              {userProfile.storiesReadCount}
            </p>
            <p className="text-[11px] text-[#7DDCC8] font-bold">Awesome job! 🌟</p>
          </div>

          <div className="bg-[#ffffff] p-5 sm:p-6 rounded-3xl shadow-sm border border-[#e3f0f8] space-y-2">
            <div className="w-10 h-10 rounded-2xl bg-[#e5deff] flex items-center justify-center text-[#5c4bc3]">
              <Headphones className="w-5 h-5 text-[#5c4bc3]" />
            </div>
            <span className="text-xs font-bold text-[#607080] block">Listened To</span>
            <p className="font-['Quicksand'] font-bold text-3xl text-[#111d23]">
              {userProfile.audioListenedCount}
            </p>
            <p className="text-[11px] text-[#5c4bc3] font-bold">Dreamy voices 🎧</p>
          </div>

          <div className="bg-[#ffffff] p-5 sm:p-6 rounded-3xl shadow-sm border border-[#e3f0f8] space-y-2">
            <div className="w-10 h-10 rounded-2xl bg-[#FFD966]/30 flex items-center justify-center text-[#111d23]">
              <Clock className="w-5 h-5 text-[#006590]" />
            </div>
            <span className="text-xs font-bold text-[#607080] block">Reading Time</span>
            <p className="font-['Quicksand'] font-bold text-3xl text-[#111d23]">
              {userProfile.totalReadingMinutes}m
            </p>
            <p className="text-[11px] text-[#006590] font-bold">Cozy minutes 📖</p>
          </div>

          <div className="bg-[#ffffff] p-5 sm:p-6 rounded-3xl shadow-sm border border-[#e3f0f8] space-y-2">
            <div className="w-10 h-10 rounded-2xl bg-[#ffa69d]/30 flex items-center justify-center text-[#9e4039]">
              <Heart className="w-5 h-5 text-[#9e4039]" />
            </div>
            <span className="text-xs font-bold text-[#607080] block">Favorite World</span>
            <p className="font-['Quicksand'] font-bold text-2xl text-[#111d23] truncate">
              {userProfile.favoriteCategory}
            </p>
            <p className="text-[11px] text-[#9e4039] font-bold">Moon &amp; stars 🌙</p>
          </div>
        </div>

        {/* Non-competitive Achievements Shelf */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFD966]/30 text-[#111d23] text-xs font-bold mb-1">
                <Award className="w-3.5 h-3.5" />
                <span>Encouragement &amp; Badges</span>
              </div>
              <h2 className="font-['Quicksand'] font-bold text-2xl text-[#111d23]">
                Your Story Badges
              </h2>
            </div>
            <p className="text-xs text-[#607080]">
              Every badge is celebrated at your own pace &bull; No pressure, just joy
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {userProfile.achievements.map((badge) => (
              <div
                key={badge.id}
                className={`p-6 rounded-3xl border transition-all duration-300 flex items-start gap-4 ${
                  badge.unlocked
                    ? 'bg-[#ffffff] border-[#7DDCC8]/40 shadow-sm hover:shadow-md'
                    : 'bg-[#f4faff]/60 border-[#e3f0f8] opacity-60'
                }`}
              >
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shrink-0 shadow-sm ${
                    badge.unlocked ? 'bg-[#FFD966]/40 scale-105' : 'bg-[#ddeaf2]'
                  }`}
                >
                  {badge.icon}
                </div>

                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-['Quicksand'] font-bold text-base text-[#111d23]">
                      {badge.name}
                    </h3>
                    {badge.unlocked && (
                      <CheckCircle className="w-4 h-4 text-[#7DDCC8] shrink-0 fill-[#7DDCC8] text-[#ffffff]" />
                    )}
                  </div>
                  <p className="text-xs text-[#607080] leading-relaxed">
                    {badge.description}
                  </p>
                  {badge.unlocked && badge.dateUnlocked && (
                    <span className="inline-block text-[10px] font-bold text-[#5c4bc3] bg-[#e5deff] px-2 py-0.5 rounded-full mt-1">
                      Unlocked {badge.dateUnlocked}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Jump back into reading CTA */}
        <div className="bg-[#006590] text-[#ffffff] rounded-3xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg">
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="font-['Quicksand'] font-bold text-2xl text-[#ffffff]">
              Ready for tonight&apos;s bedtime tale?
            </h3>
            <p className="text-sm text-[#c8e6ff]">
              Continue exploring with Ember, Pip, or listen to the soft rain lullaby.
            </p>
          </div>

          <button
            onClick={() => onNavigate('/stories')}
            className="px-8 py-3.5 rounded-full bg-[#FFD966] text-[#111d23] font-bold text-sm shadow-[0_4px_0_#e6bc3a] hover:brightness-105 active:translate-y-1 transition-all cursor-pointer whitespace-nowrap"
          >
            Open Story Shelf 📖
          </button>
        </div>
      </div>
    </div>
  );
};
