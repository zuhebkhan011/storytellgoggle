import React, { useState } from 'react';
import { Headphones, Heart, Star, Clock, Sparkles } from 'lucide-react';
import { Story } from '../types/story';

interface StoryCardProps {
  story: Story;
  isFavorite: boolean;
  onToggleFavorite: (storyId: string) => void;
  onRead: (storyId: string) => void;
  onListen: (storyId: string) => void;
  onSelectStory?: (storyId: string) => void;
  variant?: 'standard' | 'compact' | 'featured';
}

export const StoryCard: React.FC<StoryCardProps> = ({
  story,
  isFavorite,
  onToggleFavorite,
  onRead,
  onListen,
  onSelectStory,
  variant = 'standard'
}) => {
  const [imageFailed, setImageFailed] = useState(false);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite(story.id);
  };

  const handleCardClick = () => {
    if (onSelectStory) {
      onSelectStory(story.id);
    } else {
      onRead(story.id);
    }
  };

  return (
    <article
      onClick={handleCardClick}
      className="group flex flex-col rounded-3xl bg-[#ffffff] overflow-hidden shadow-[0_8px_24px_-4px_rgba(38,50,56,0.08)] hover:shadow-[0_16px_36px_-6px_rgba(139,124,246,0.2)] hover:-translate-y-1 transition-all duration-300 border border-[#e3f0f8] cursor-pointer"
    >
      {/* Cover Image Container */}
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-gradient-to-br from-[#c8e6ff] to-[#e5deff]">
        {!imageFailed ? (
          <img
            alt={story.title}
            src={story.coverImage}
            referrerPolicy="no-referrer"
            onError={() => setImageFailed(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center">
            <span className="text-4xl mb-2">📚</span>
            <span className="font-['Quicksand'] font-bold text-[#006590] text-sm">
              {story.title}
            </span>
          </div>
        )}

        {/* Audio Available Badge */}
        {story.audioAvailable && (
          <div className="absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#ffffff]/90 backdrop-blur-sm text-xs font-bold text-[#111d23] shadow-sm">
            <Headphones className="w-3.5 h-3.5 text-[#FFD966]" />
            <span>Audio</span>
          </div>
        )}

        {/* Category Pill Tag */}
        {story.category === 'bedtime' && (
          <div className="absolute top-3 left-20 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#e5deff] text-[#180065] text-xs font-bold shadow-sm">
            <span>🌙 Calm</span>
          </div>
        )}

        {/* Favorite Heart Button */}
        <button
          onClick={handleFavoriteClick}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-[#ffffff]/90 backdrop-blur-sm flex items-center justify-center transition-all hover:scale-110 shadow-sm cursor-pointer"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isFavorite
                ? 'fill-[#9e4039] text-[#9e4039]'
                : 'text-[#607080] hover:text-[#9e4039]'
            }`}
          />
        </button>
      </div>

      {/* Card Details */}
      <div className="p-5 flex flex-col flex-1 justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#607080]">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-[#006590]" />
              {story.readingTime}
            </span>
            <span>•</span>
            <span>{story.ageRange}</span>
          </div>

          <h3 className="font-['Quicksand'] font-bold text-lg leading-snug text-[#111d23] group-hover:text-[#006590] transition-colors line-clamp-1">
            {story.title}
          </h3>

          <p className="text-xs text-[#607080] line-clamp-2 leading-relaxed">
            {story.description}
          </p>
        </div>

        {/* Rating and Action Button */}
        <div className="flex items-center justify-between pt-2 border-t border-[#f4faff]">
          <div className="flex items-center gap-1 text-[#FFD966]">
            <Star className="w-4 h-4 fill-[#FFD966]" />
            <span className="font-bold text-xs text-[#111d23]">
              {story.rating.toFixed(1)}
            </span>
            <span className="text-[11px] text-[#607080]">
              ({story.ratingCount})
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRead(story.id);
              }}
              className="px-3.5 py-1.5 rounded-full bg-[#c8e6ff] text-[#001e2f] text-xs font-bold hover:bg-[#6ec6ff] transition-all cursor-pointer shadow-sm"
            >
              Read Now
            </button>
            {story.audioAvailable && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onListen(story.id);
                }}
                className="w-7 h-7 rounded-full bg-[#FFD966]/40 text-[#006590] flex items-center justify-center hover:bg-[#FFD966] transition-all cursor-pointer shadow-sm"
                title="Listen Aloud"
              >
                <Headphones className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};
