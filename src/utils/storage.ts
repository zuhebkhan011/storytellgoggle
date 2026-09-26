import { UserProfile, ParentSettings, Story } from '../types/story';
import { INITIAL_USER_PROFILE, INITIAL_PARENT_SETTINGS, MOCK_STORIES } from '../data/mockStories';

const STORAGE_KEYS = {
  USER_PROFILE: 'wondertales_user_profile',
  PARENT_SETTINGS: 'wondertales_parent_settings',
  CUSTOM_STORIES: 'wondertales_custom_stories',
  STORY_PROGRESS: 'wondertales_story_progress',
  BEDTIME_DIM: 'wondertales_bedtime_dim'
};

export const getStoredProfile = (): UserProfile => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
    if (raw) return JSON.parse(raw);
  } catch {
    // fallback
  }
  return INITIAL_USER_PROFILE;
};

export const saveStoredProfile = (profile: UserProfile): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
  } catch {
    // fallback
  }
};

export const getStoredParentSettings = (): ParentSettings => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PARENT_SETTINGS);
    if (raw) return JSON.parse(raw);
  } catch {
    // fallback
  }
  return INITIAL_PARENT_SETTINGS;
};

export const saveStoredParentSettings = (settings: ParentSettings): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.PARENT_SETTINGS, JSON.stringify(settings));
  } catch {
    // fallback
  }
};

export const getCustomStories = (): Story[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CUSTOM_STORIES);
    if (raw) return JSON.parse(raw);
  } catch {
    // fallback
  }
  return [];
};

export const saveCustomStory = (story: Story): void => {
  const current = getCustomStories();
  const updated = [story, ...current];
  try {
    localStorage.setItem(STORAGE_KEYS.CUSTOM_STORIES, JSON.stringify(updated));
  } catch {
    // fallback
  }
};

export const getAllStories = (): Story[] => {
  const custom = getCustomStories();
  return [...custom, ...MOCK_STORIES];
};

export const getStoryProgress = (storyId: string): number => {
  try {
    const raw = localStorage.getItem(`${STORAGE_KEYS.STORY_PROGRESS}_${storyId}`);
    if (raw) return parseInt(raw, 10);
  } catch {
    // fallback
  }
  return 1;
};

export const saveStoryProgress = (storyId: string, pageNumber: number): void => {
  try {
    localStorage.setItem(`${STORAGE_KEYS.STORY_PROGRESS}_${storyId}`, pageNumber.toString());
  } catch {
    // fallback
  }
};
