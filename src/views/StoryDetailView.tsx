import React from 'react';
import {
  ArrowLeft,
  BookOpen,
  Headphones,
  Heart,
  Star,
  Clock,
  Sparkles,
  Users,
  Compass,
  CheckCircle2,
  Volume2
} from 'lucide-react';
import { Story, UserProfile } from '../types/story';

interface StoryDetailViewProps {
  story: Story;
  allStories: Story[];
  userProfile: UserProfile;
  onNavigate: (path: string) => void;
  onToggleFavorite: (storyId: string) => void;
}

export const StoryDetailView: React.FC<StoryDetailViewProps> = ({
  story,
  allStories,
  userProfile,
  onNavigate,
  onToggleFavorite
}) => {
  const isFavorite = userProfile.favorites.includes(story.id);

  const relatedStories = allStories
    .filter((s) => s.id !== story.id && (s.category === story.category || s.ageRange === story.ageRange))
    .slice(0, 3);

  return (
    <div className="flex flex-col w-full pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8 space-y-10">
        {/* Back navigation */}
        <div>
          <button
            onClick={() => onNavigate('/stories')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#ffffff] hover:bg-[#e9f6fd] text-[#006590] text-sm font-bold shadow-sm transition-colors border border-[#e3f0f8] cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Discovery</span>
          </button>
        </div>

        {/* Hero Details Card */}
        <div className="bg-[#ffffff] rounded-3xl p-6 sm:p-10 shadow-[0_16px_36px_-6px_rgba(92,75,195,0.12)] border border-[#e3f0f8]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Cover */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative rounded-3xl overflow-hidden aspect-[4/3] w-full max-w-md shadow-xl bg-gradient-to-br from-[#c8e6ff] to-[#e5deff]">
                <img
                  alt={story.title}
                  src={story.coverImage}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => onToggleFavorite(story.id)}
                  aria-label="Toggle favorite"
                  className="absolute top-4 right-4 w-11 h-11 rounded-full bg-[#ffffff]/90 backdrop-blur-md flex items-center justify-center shadow-md cursor-pointer hover:scale-110 transition-transform"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      isFavorite ? 'fill-[#9e4039] text-[#9e4039]' : 'text-[#607080]'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Right Details */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e5deff] text-[#180065] text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-[#5c4bc3]" />
                <span>{story.category.toUpperCase()} &bull; {story.themeTag}</span>
              </div>

              <h1 className="font-['Quicksand'] font-bold text-3xl sm:text-4xl text-[#111d23]">
                {story.title}
              </h1>

              {story.subtitle && (
                <p className="text-base text-[#5c4bc3] font-bold -mt-2">
                  {story.subtitle}
                </p>
              )}

              <p className="text-base text-[#607080] leading-relaxed">
                {story.description}
              </p>

              {/* Meta Chips */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#e9f6fd] text-xs font-bold text-[#006590]">
                  <Clock className="w-4 h-4" />
                  <span>{story.readingTime}</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#e9f6fd] text-xs font-bold text-[#111d23]">
                  <span>👶 {story.ageRange}</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FFD966]/30 text-xs font-bold text-[#111d23]">
                  <Star className="w-4 h-4 fill-[#FFD966] text-[#FFD966]" />
                  <span>{story.rating.toFixed(1)} ({story.ratingCount} young readers)</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <button
                  onClick={() => onNavigate(`/read/${story.id}`)}
                  className="px-8 py-4 rounded-full bg-[#006590] text-[#ffffff] font-bold text-base shadow-[0_4px_0_#004c6e,0_8px_16px_rgba(0,101,144,0.25)] hover:translate-y-0.5 active:translate-y-1 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <BookOpen className="w-5 h-5" />
                  <span>Read Book ({story.pages.length} Pages)</span>
                </button>

                {story.audioAvailable && (
                  <button
                    onClick={() => onNavigate(`/listen/${story.id}`)}
                    className="px-7 py-4 rounded-full bg-[#FFD966] text-[#111d23] font-bold text-base shadow-[0_4px_0_#e6bc3a,0_8px_16px_rgba(255,217,102,0.35)] hover:translate-y-0.5 active:translate-y-1 transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <Headphones className="w-5 h-5 text-[#111d23]" />
                    <span>Listen Aloud ({story.audioDuration})</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Character Cast & Story Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Character Cast */}
          <div className="bg-[#ffffff] rounded-3xl p-6 sm:p-8 shadow-[0_8px_24px_-4px_rgba(38,50,56,0.06)] border border-[#e3f0f8] space-y-4">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-[#006590]" />
              <h3 className="font-['Quicksand'] font-bold text-xl text-[#111d23]">
                Story Characters
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {story.characters.map((char, i) => (
                <div
                  key={i}
                  className="p-3 rounded-2xl bg-[#e9f6fd] flex items-center gap-2.5 border border-[#cfdce4]/40"
                >
                  <span className="text-xl">🌟</span>
                  <span className="text-xs font-bold text-[#111d23]">{char}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Educational & Heartwarming Highlights */}
          <div className="bg-[#ffffff] rounded-3xl p-6 sm:p-8 shadow-[0_8px_24px_-4px_rgba(38,50,56,0.06)] border border-[#e3f0f8] space-y-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#7DDCC8]" />
              <h3 className="font-['Quicksand'] font-bold text-xl text-[#111d23]">
                What Kids Learn
              </h3>
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#3f484f]">
              <li className="flex items-start gap-2">
                <span className="text-[#006590] font-bold">&bull;</span>
                <span>Courage doesn&apos;t mean having no fear; it means doing the right thing with a gentle heart.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#006590] font-bold">&bull;</span>
                <span>Being kind to small creatures and helping friends in need always brings peaceful dreams.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#006590] font-bold">&bull;</span>
                <span>Calming sensory bedtime descriptions assist natural relaxation before sleep.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Related Tales */}
        {relatedStories.length > 0 && (
          <div className="space-y-6">
            <h3 className="font-['Quicksand'] font-bold text-2xl text-[#111d23]">
              More Tales Like This
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedStories.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => onNavigate(`/story/${rel.id}`)}
                  className="bg-[#ffffff] rounded-3xl p-4 shadow-sm hover:shadow-md transition-all border border-[#e3f0f8] cursor-pointer flex gap-4 items-center group"
                >
                  <img
                    alt={rel.title}
                    src={rel.coverImage}
                    referrerPolicy="no-referrer"
                    className="w-20 h-20 rounded-2xl object-cover shrink-0 group-hover:scale-105 transition-transform"
                  />
                  <div className="min-w-0">
                    <span className="text-[11px] font-bold text-[#5c4bc3]">
                      {rel.ageRange}
                    </span>
                    <h4 className="font-['Quicksand'] font-bold text-sm text-[#111d23] group-hover:text-[#006590] transition-colors truncate">
                      {rel.title}
                    </h4>
                    <p className="text-xs text-[#607080] line-clamp-1 mt-0.5">
                      {rel.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
