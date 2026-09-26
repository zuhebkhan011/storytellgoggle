import React, { useState, useEffect } from 'react';
import { Story, StoryCategory, UserProfile, ParentSettings } from './types/story';
import {
  getStoredProfile,
  saveStoredProfile,
  getStoredParentSettings,
  saveStoredParentSettings,
  getAllStories,
  saveCustomStory
} from './utils/storage';
import { Navbar } from './components/Navbar';
import { MobileNav } from './components/MobileNav';
import { Footer } from './components/Footer';
import { ParentGateModal } from './components/ParentGateModal';
import { BedtimeTimerModal } from './components/BedtimeTimerModal';

// Views
import { HomeView } from './views/HomeView';
import { StoriesView } from './views/StoriesView';
import { StoryDetailView } from './views/StoryDetailView';
import { StoryReaderView } from './views/StoryReaderView';
import { ReadAloudView } from './views/ReadAloudView';
import { CategoryView } from './views/CategoryView';
import { FavoritesView } from './views/FavoritesView';
import { ProfileView } from './views/ProfileView';
import { CreateStoryView } from './views/CreateStoryView';
import { ParentView } from './views/ParentView';
import { SearchView } from './views/SearchView';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>('/');
  const [allStories, setAllStories] = useState<Story[]>(() => getAllStories());
  const [userProfile, setUserProfile] = useState<UserProfile>(() => getStoredProfile());
  const [parentSettings, setParentSettings] = useState<ParentSettings>(() => getStoredParentSettings());

  // Modals & Dimmer
  const [isParentGateOpen, setIsParentGateOpen] = useState(false);
  const [isBedtimeTimerOpen, setIsBedtimeTimerOpen] = useState(false);
  const [activeBedtimeTimer, setActiveBedtimeTimer] = useState<number | null>(15);
  const [isDimmed, setIsDimmed] = useState(false);

  // URL Routing Sync
  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname || '/';
      setCurrentPath(path);
    };

    handleLocationChange();
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Toggle story in user favorites
  const handleToggleFavorite = (storyId: string) => {
    const isFav = userProfile.favorites.includes(storyId);
    const updatedFavorites = isFav
      ? userProfile.favorites.filter((id) => id !== storyId)
      : [...userProfile.favorites, storyId];

    const updatedProfile: UserProfile = {
      ...userProfile,
      favorites: updatedFavorites
    };

    setUserProfile(updatedProfile);
    saveStoredProfile(updatedProfile);
  };

  // Update profile
  const handleUpdateProfile = (updated: Partial<UserProfile>) => {
    const newProfile = { ...userProfile, ...updated };
    setUserProfile(newProfile);
    saveStoredProfile(newProfile);
  };

  // Update parent settings
  const handleUpdateParentSettings = (newSettings: Partial<ParentSettings>) => {
    const updated = { ...parentSettings, ...newSettings };
    setParentSettings(updated);
    saveStoredParentSettings(updated);
  };

  // Save custom story
  const handleStoryCreated = (newStory: Story) => {
    saveCustomStory(newStory);
    const updated = getAllStories();
    setAllStories(updated);
  };

  // Determine current active story for reader or detail
  const getStoryFromPath = (prefix: string) => {
    const storyId = currentPath.replace(prefix, '').split('/')[0];
    return allStories.find((s) => s.id === storyId) || allStories[0];
  };

  // Parse category from path
  const getCategoryFromPath = (): StoryCategory => {
    const cat = currentPath.replace('/stories/', '') as StoryCategory;
    const valid: StoryCategory[] = ['bedtime', 'adventure', 'animals', 'fantasy', 'friendship', 'learning'];
    return valid.includes(cat) ? cat : 'bedtime';
  };

  // Check which view to render
  const renderCurrentView = () => {
    if (currentPath === '/') {
      return (
        <HomeView
          stories={allStories}
          userProfile={userProfile}
          onNavigate={navigate}
          onToggleFavorite={handleToggleFavorite}
          onOpenBedtimeTimer={() => setIsBedtimeTimerOpen(true)}
        />
      );
    }

    if (currentPath === '/stories') {
      return (
        <StoriesView
          stories={allStories}
          userProfile={userProfile}
          onNavigate={navigate}
          onToggleFavorite={handleToggleFavorite}
          onOpenBedtimeTimer={() => setIsBedtimeTimerOpen(true)}
        />
      );
    }

    if (currentPath === '/categories') {
      return (
        <CategoryView
          category="bedtime"
          stories={allStories}
          userProfile={userProfile}
          onNavigate={navigate}
          onToggleFavorite={handleToggleFavorite}
        />
      );
    }

    if (currentPath.startsWith('/stories/')) {
      const cat = getCategoryFromPath();
      return (
        <CategoryView
          category={cat}
          stories={allStories}
          userProfile={userProfile}
          onNavigate={navigate}
          onToggleFavorite={handleToggleFavorite}
        />
      );
    }

    if (currentPath.startsWith('/story/')) {
      const story = getStoryFromPath('/story/');
      return (
        <StoryDetailView
          story={story}
          allStories={allStories}
          userProfile={userProfile}
          onNavigate={navigate}
          onToggleFavorite={handleToggleFavorite}
        />
      );
    }

    if (currentPath.startsWith('/read/')) {
      const story = getStoryFromPath('/read/');
      return (
        <StoryReaderView
          story={story}
          userProfile={userProfile}
          onNavigate={navigate}
          onToggleFavorite={handleToggleFavorite}
          onOpenBedtimeTimer={() => setIsBedtimeTimerOpen(true)}
        />
      );
    }

    if (currentPath.startsWith('/listen')) {
      const story = currentPath.startsWith('/listen/')
        ? getStoryFromPath('/listen/')
        : allStories[2]; // Cloudy's Confused Night by default
      return (
        <ReadAloudView
          currentStory={story}
          allStories={allStories}
          userProfile={userProfile}
          onNavigate={navigate}
          onSelectStory={(id) => navigate(`/listen/${id}`)}
          isDimmed={isDimmed}
          onToggleDim={() => setIsDimmed(!isDimmed)}
        />
      );
    }

    if (currentPath === '/search') {
      return (
        <SearchView
          stories={allStories}
          userProfile={userProfile}
          onNavigate={navigate}
          onToggleFavorite={handleToggleFavorite}
        />
      );
    }

    if (currentPath === '/favorites') {
      return (
        <FavoritesView
          stories={allStories}
          userProfile={userProfile}
          onNavigate={navigate}
          onToggleFavorite={handleToggleFavorite}
        />
      );
    }

    if (currentPath === '/profile') {
      return (
        <ProfileView
          userProfile={userProfile}
          onUpdateProfile={handleUpdateProfile}
          onNavigate={navigate}
        />
      );
    }

    if (currentPath === '/create') {
      return (
        <CreateStoryView
          onStoryCreated={handleStoryCreated}
          onNavigate={navigate}
        />
      );
    }

    if (currentPath === '/parent') {
      return (
        <ParentView
          userProfile={userProfile}
          parentSettings={parentSettings}
          onUpdateParentSettings={handleUpdateParentSettings}
          onNavigate={navigate}
        />
      );
    }

    // Default Fallback
    return (
      <HomeView
        stories={allStories}
        userProfile={userProfile}
        onNavigate={navigate}
        onToggleFavorite={handleToggleFavorite}
        onOpenBedtimeTimer={() => setIsBedtimeTimerOpen(true)}
      />
    );
  };

  return (
    <div className={`min-h-screen flex flex-col bg-[#FFF9EE] relative ${isDimmed ? 'filter brightness-90 sepia-[0.15]' : ''}`}>
      {/* Top Navbar */}
      <Navbar
        currentPath={currentPath}
        onNavigate={navigate}
        userProfile={userProfile}
        onOpenParentArea={() => setIsParentGateOpen(true)}
      />

      {/* Main View Area with top padding for fixed header */}
      <main className="flex-1 w-full pt-20">
        {renderCurrentView()}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={navigate}
        onOpenParentArea={() => setIsParentGateOpen(true)}
      />

      {/* Mobile Bottom Navigation */}
      <MobileNav
        currentPath={currentPath}
        onNavigate={navigate}
      />

      {/* Parent Area Access Gate Modal */}
      <ParentGateModal
        isOpen={isParentGateOpen}
        onClose={() => setIsParentGateOpen(false)}
        onSuccess={() => navigate('/parent')}
      />

      {/* Bedtime Sleep Timer Modal */}
      <BedtimeTimerModal
        isOpen={isBedtimeTimerOpen}
        onClose={() => setIsBedtimeTimerOpen(false)}
        activeTimer={activeBedtimeTimer}
        onSetTimer={(min) => setActiveBedtimeTimer(min)}
        isDimmed={isDimmed}
        onToggleDim={() => setIsDimmed(!isDimmed)}
      />
    </div>
  );
}
