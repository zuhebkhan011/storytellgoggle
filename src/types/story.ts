export type StoryCategory = 'bedtime' | 'adventure' | 'animals' | 'fantasy' | 'friendship' | 'learning';

export interface StoryChoiceOption {
  id: string;
  emoji: string;
  title: string;
  description: string;
  targetPage: number;
}

export interface StoryChoice {
  prompt: string;
  subtext: string;
  options: StoryChoiceOption[];
}

export interface StoryPage {
  pageNumber: number;
  sceneTitle: string;
  locationTag: string;
  illustration: string;
  text: string[];
  callout?: {
    icon: string;
    title: string;
    subtitle: string;
  };
  choice?: StoryChoice;
  audioSentence: string;
  nextAudioSentence?: string;
  ambientSoundName?: string;
}

export interface Story {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  category: StoryCategory;
  ageRange: string;
  readingTime: string;
  readingTimeMinutes: number;
  coverImage: string;
  author: string;
  illustrator?: string;
  narrator: string;
  characters: string[];
  audioAvailable: boolean;
  audioDuration: string;
  rating: number;
  ratingCount: number;
  themeTag: string;
  featured?: boolean;
  pages: StoryPage[];
  progressPercent?: number;
  currentChapter?: string;
  hasInteractiveChoices?: boolean;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  dateUnlocked?: string;
  category: string;
}

export interface UserProfile {
  name: string;
  avatar: string;
  age: number;
  storiesReadCount: number;
  audioListenedCount: number;
  totalReadingMinutes: number;
  favoriteCategory: string;
  readingStreakDays: number;
  favorites: string[];
  currentReadingId?: string;
  achievements: Achievement[];
}

export interface ParentSettings {
  dailyScreenLimitMinutes: number;
  bedtimeDimEnabled: boolean;
  bedtimeHour: string;
  soundEffectsEnabled: boolean;
  audioNarratorSpeed: number;
  defaultSleepTimerMinutes: number;
}
