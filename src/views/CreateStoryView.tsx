import React, { useState } from 'react';
import { Sparkles, Wand2, BookOpen, Check, ArrowRight, Heart } from 'lucide-react';
import { Story, StoryPage } from '../types/story';

interface CreateStoryViewProps {
  onStoryCreated: (newStory: Story) => void;
  onNavigate: (path: string) => void;
}

export const CreateStoryView: React.FC<CreateStoryViewProps> = ({
  onStoryCreated,
  onNavigate
}) => {
  const [title, setTitle] = useState('');
  const [character, setCharacter] = useState('Milo the Fox');
  const [setting, setSetting] = useState('Whispering Canopy');
  const [theme, setTheme] = useState('Kindness & Courage');
  const [mood, setMood] = useState('Magical & Playful');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedStory, setGeneratedStory] = useState<Story | null>(null);

  const characterOptions = [
    { name: 'Milo the Fox', emoji: '🦊', desc: 'A curious red fox with bright inquisitive eyes' },
    { name: 'Sparky the Baby Dragon', emoji: '🐉', desc: 'A cuddly little dragon who blows warm bubbles' },
    { name: 'Lily the Rabbit', emoji: '🐰', desc: 'A swift jumper who collects silver clover leaves' },
    { name: 'Barnaby the Bear', emoji: '🐻', desc: 'A gentle fluffy bear who loves honeycomb tea' },
    { name: 'Stella the Star', emoji: '⭐', desc: 'A tiny twinkling star who loves hide-and-seek' }
  ];

  const settingOptions = [
    { name: 'Whispering Canopy', emoji: '🌲', desc: 'Ancient mossy trees with lantern vines' },
    { name: 'Floating Cloud Castle', emoji: '☁️', desc: 'Pastel clouds drifting in lavender skies' },
    { name: 'Starlight Ocean', emoji: '🌊', desc: 'Deep blue waters reflecting glittering constellations' },
    { name: 'Cozy Blanket Fort', emoji: '🧸', desc: 'A fortress of quilts and twinkling fairy lights' },
    { name: 'Wildflower Rainbow Meadow', emoji: '🌸', desc: 'Sunny glades filled with friendly bumblebees' }
  ];

  const themeOptions = [
    { name: 'Kindness & Courage', emoji: '❤️' },
    { name: 'Curiosity & Exploration', emoji: '🧭' },
    { name: 'Bedtime Calm & Sleep', emoji: '🌙' },
    { name: 'Teamwork & Sharing', emoji: '🤝' },
    { name: 'Nature & Wonders', emoji: '🌿' }
  ];

  const moodOptions = [
    { name: 'Magical & Playful', emoji: '✨' },
    { name: 'Gentle & Sleepy', emoji: '💤' },
    { name: 'Exciting & Bold', emoji: '🚀' },
    { name: 'Warm & Cozy', emoji: '☕' }
  ];

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    const effectiveTitle = title.trim() || `${character}'s Journey to the ${setting}`;

    setTimeout(() => {
      // Create local mock story
      const newStoryId = `custom-${Date.now()}`;
      const pages: StoryPage[] = [
        {
          pageNumber: 1,
          sceneTitle: 'Scene 1: The Adventure Begins',
          locationTag: `${setting} • Morning`,
          illustration: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAvnYug9T9XuuOrXfkBFLoP5Edu9i-uzsUrk439j5ow6Q0wNuScyQujdBSgVMBpLM_jlFKmOKIpKcq6M7zYH7ozTnhwyXkjnJn6HQnh4GQBeWKTtpav4Gtu0Ypn2WiN3-cPZwplDhvxdmfjzNTQXhjNAP08DUZM6fBG0MJKFX7w4m-To0tpWfkqo4JaczcZ7hn-ndchFgA2WFD9OcsTQ2Cdkr3nvtjJwJl7AyVN5lLw3rO-dirLUzFZvQ',
          text: [
            `Once upon a time in the enchanted ${setting}, lived ${character}.`,
            `The air was sweet and smelled like fresh summer berries. Today was no ordinary day—a mysterious sparkling trail of blue stardust led deeper into the woods!`,
            `"${character}!" called a little singing bird from above. "The magic council needs your help to bring back the missing glow!"`
          ],
          audioSentence: `Once upon a time in the enchanted ${setting}, lived ${character}.`,
          nextAudioSentence: `The air was sweet and smelled like fresh summer berries.`,
          ambientSoundName: 'Birds & Leaves'
        },
        {
          pageNumber: 2,
          sceneTitle: 'Scene 2: The Mysterious Door',
          locationTag: 'Ancient Grove • Twilight',
          illustration: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmgkoDEHx7Xj4LsCX6Z0DSso7XVoXnltFSdYAABE6NvlonKIaQaPogtppaxL4jXIc4h7wiAmgxIypYw8HZG-ESm7zeNN75vWOhJvo84x0EVwajEFl8LLYLageIqamHG3HuPw2iAK8yqQNmDQ8fpqpfsmzFv2M9PlT01EfnebZWMILjb1bk8dS_Z31M3etFDL9in2yjDLuR8wHHJrN7oFlZ1ztM9RW7_DN8VQVXSfx8QGhmZbDXBPxT9A',
          text: [
            `${character} walked with gentle steps past the bioluminescent mushrooms.`,
            `At the end of the trail stood a carved wooden door decorated with glowing golden stars and moon runes.`,
            `Beside the door were soft footprints leading toward a singing stream.`
          ],
          callout: {
            icon: '🚪',
            title: `What should ${character.split(' ')[0]} do?`,
            subtitle: 'Choose the courage path for tonight!'
          },
          choice: {
            prompt: `What should ${character.split(' ')[0]} do?`,
            subtext: 'Pick a path to discover the secret!',
            options: [
              {
                id: 'open-door',
                emoji: '🗝️',
                title: 'Open the Mysterious Door',
                description: 'Step inside and uncover the glowing secret library',
                targetPage: 3
              },
              {
                id: 'follow-footprints',
                emoji: '🐾',
                title: 'Follow the Footprints',
                description: 'Trace the soft tracks down to the musical river bank',
                targetPage: 3
              }
            ]
          },
          audioSentence: `At the end of the trail stood a carved wooden door with glowing stars.`,
          nextAudioSentence: `Beside the door were soft footprints leading toward a singing stream.`,
          ambientSoundName: 'Night Crickets'
        },
        {
          pageNumber: 3,
          sceneTitle: 'Scene 3: A Heartwarming Resolution',
          locationTag: 'Starlit Haven • Bedtime',
          illustration: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAIBlp-8BKqbD1gIQRU3aGOplNa6Wd6vGMMd389Qm0jGtF8tCTOA1SpFSot4EBpXxaKfhAGMkhS0H2XER7OJZNCYSdM66YZ7yT-0jI4O4I26BolWavKEp-8nbCkwZXGg1NqoS9pNy-o7FHeJMA7keB08iz12Qi6MkaMEh8Edj8Yx1ELBu0KMFXkY_2llCw0LDiNFsQ4tDtfR7cmRxOzHtaVesksmBDbrNl4qfMQCi_aCs9aJg5k4ujaLQ',
          text: [
            `With bravery and a gentle smile, ${character} brought warmth and joy to all the woodland creatures.`,
            `The wise owls sang lullabies, and the entire ${setting} glowed in peaceful harmony.`,
            `Curled up under a cozy leaf quilt, ${character} closed their eyes and dreamed happy, magical dreams.`
          ],
          audioSentence: `With bravery and a gentle smile, ${character} brought warmth to the forest.`,
          nextAudioSentence: `Goodnight brave friend, sweet dreams tonight.`,
          ambientSoundName: 'Fairy Harp'
        }
      ];

      const created: Story = {
        id: newStoryId,
        title: effectiveTitle,
        subtitle: `A WonderTales Original by Alex`,
        description: `An enchanting story about ${character} in the ${setting}, celebrating ${theme} with a ${mood} heart.`,
        category: 'adventure',
        ageRange: 'Ages 4–9',
        readingTime: '5 min read',
        readingTimeMinutes: 5,
        coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAvnYug9T9XuuOrXfkBFLoP5Edu9i-uzsUrk439j5ow6Q0wNuScyQujdBSgVMBpLM_jlFKmOKIpKcq6M7zYH7ozTnhwyXkjnJn6HQnh4GQBeWKTtpav4Gtu0Ypn2WiN3-cPZwplDhvxdmfjzNTQXhjNAP08DUZM6fBG0MJKFX7w4m-To0tpWfkqo4JaczcZ7hn-ndchFgA2WFD9OcsTQ2Cdkr3nvtjJwJl7AyVN5lLw3rO-dirLUzFZvQ',
        author: 'Alex & WonderTales Studio',
        illustrator: 'WonderTales Studio',
        narrator: 'WonderTales Storyteller',
        characters: [character, 'Singing Bird', 'Wise Owl'],
        audioAvailable: true,
        audioDuration: '5:30',
        rating: 5.0,
        ratingCount: 1,
        themeTag: theme,
        hasInteractiveChoices: true,
        pages
      };

      setGeneratedStory(created);
      onStoryCreated(created);
      setIsGenerating(false);
    }, 1200);
  };

  return (
    <div className="flex flex-col w-full pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* Header */}
        <header className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#e5deff] text-[#180065] text-xs font-bold shadow-sm">
            <Sparkles className="w-4 h-4 text-[#5c4bc3]" />
            <span>Story Maker Workshop</span>
          </div>

          <h1 className="font-['Quicksand'] font-bold text-3xl sm:text-5xl text-[#006590]">
            Create Your Own Story ✨
          </h1>

          <p className="text-base text-[#607080] max-w-xl mx-auto">
            Choose your character, magical world, and theme. WonderTales will weave your bedtime tale together!
          </p>
        </header>

        {generatedStory ? (
          /* Preview Success Card */
          <div className="bg-[#ffffff] rounded-3xl p-6 sm:p-10 shadow-[0_16px_36px_-6px_rgba(92,75,195,0.15)] border border-[#e3f0f8] space-y-6 text-center animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-[#7DDCC8]/30 text-3xl flex items-center justify-center mx-auto">
              🎉
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-[#5c4bc3] uppercase tracking-wider">
                Story Created Successfully!
              </span>
              <h2 className="font-['Quicksand'] font-bold text-3xl text-[#111d23]">
                {generatedStory.title}
              </h2>
              <p className="text-sm text-[#607080] max-w-lg mx-auto">
                {generatedStory.description}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FFF9EE] border border-[#FFD966] max-w-md mx-auto flex items-center gap-4 text-left">
              <span className="text-4xl">📖</span>
              <div>
                <p className="font-bold text-sm text-[#111d23]">
                  Interactive Choice Included!
                </p>
                <p className="text-xs text-[#607080]">
                  You can decide whether {character.split(' ')[0]} opens the mysterious door or follows the footprints.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <button
                onClick={() => onNavigate(`/read/${generatedStory.id}`)}
                className="px-8 py-4 rounded-full bg-[#006590] text-[#ffffff] font-bold text-base shadow-[0_4px_0_#004c6e,0_8px_16px_rgba(0,101,144,0.25)] hover:translate-y-0.5 active:translate-y-1 transition-all cursor-pointer flex items-center gap-2"
              >
                <BookOpen className="w-5 h-5" />
                <span>Read My Story Now! 📖</span>
              </button>

              <button
                onClick={() => setGeneratedStory(null)}
                className="px-6 py-4 rounded-full bg-[#e3f0f8] text-[#006590] font-bold text-base hover:bg-[#ddeaf2] transition-colors cursor-pointer"
              >
                Create Another Tale
              </button>
            </div>
          </div>
        ) : (
          /* Form */
          <form
            onSubmit={handleGenerate}
            className="bg-[#ffffff] rounded-3xl p-6 sm:p-10 shadow-[0_8px_24px_-4px_rgba(38,50,56,0.06)] border border-[#e3f0f8] space-y-8"
          >
            {/* Title field */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-[#111d23] block">
                Story Title (or leave blank for magic suggestion)
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Milo and the Secret of the Singing Stones"
                className="w-full px-5 py-3.5 rounded-2xl bg-[#f4faff] border border-[#cfdce4] focus:outline-none focus:ring-2 focus:ring-[#006590] text-sm sm:text-base text-[#111d23]"
              />
            </div>

            {/* Main Character Picker */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-[#111d23] block">
                1. Choose Your Main Character 🐾
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {characterOptions.map((c) => {
                  const isSelected = character === c.name;
                  return (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => setCharacter(c.name)}
                      className={`p-3.5 rounded-2xl text-left transition-all cursor-pointer border flex items-center gap-3 ${
                        isSelected
                          ? 'bg-[#c8e6ff] border-[#006590] shadow-sm'
                          : 'bg-[#f4faff] border-[#e3f0f8] hover:bg-[#e9f6fd]'
                      }`}
                    >
                      <span className="text-3xl shrink-0">{c.emoji}</span>
                      <div className="min-w-0">
                        <span className="font-bold text-xs sm:text-sm text-[#111d23] block truncate">
                          {c.name}
                        </span>
                        <span className="text-[11px] text-[#607080] line-clamp-1">
                          {c.desc}
                        </span>
                      </div>
                      {isSelected && <Check className="w-4 h-4 ml-auto text-[#006590] shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Setting Picker */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-[#111d23] block">
                2. Choose The Magical Setting 🏞️
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {settingOptions.map((s) => {
                  const isSelected = setting === s.name;
                  return (
                    <button
                      key={s.name}
                      type="button"
                      onClick={() => setSetting(s.name)}
                      className={`p-3.5 rounded-2xl text-left transition-all cursor-pointer border flex items-center gap-3 ${
                        isSelected
                          ? 'bg-[#FFD966]/40 border-[#FFD966] shadow-sm'
                          : 'bg-[#f4faff] border-[#e3f0f8] hover:bg-[#e9f6fd]'
                      }`}
                    >
                      <span className="text-2xl shrink-0">{s.emoji}</span>
                      <div className="min-w-0">
                        <span className="font-bold text-xs sm:text-sm text-[#111d23] block">
                          {s.name}
                        </span>
                        <span className="text-[11px] text-[#607080] line-clamp-1">
                          {s.desc}
                        </span>
                      </div>
                      {isSelected && <Check className="w-4 h-4 ml-auto text-[#006590] shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Theme Picker */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-[#111d23] block">
                3. Story Theme &amp; Heart 💛
              </label>
              <div className="flex flex-wrap gap-2.5">
                {themeOptions.map((t) => {
                  const isSelected = theme === t.name;
                  return (
                    <button
                      key={t.name}
                      type="button"
                      onClick={() => setTheme(t.name)}
                      className={`px-4 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-2 border ${
                        isSelected
                          ? 'bg-[#e5deff] text-[#180065] border-[#5c4bc3] shadow-sm'
                          : 'bg-[#f4faff] text-[#3f484f] border-[#e3f0f8] hover:bg-[#e9f6fd]'
                      }`}
                    >
                      <span>{t.emoji}</span>
                      <span>{t.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Mood Picker */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-[#111d23] block">
                4. Bedtime Mood 🌙
              </label>
              <div className="flex flex-wrap gap-2.5">
                {moodOptions.map((m) => {
                  const isSelected = mood === m.name;
                  return (
                    <button
                      key={m.name}
                      type="button"
                      onClick={() => setMood(m.name)}
                      className={`px-4 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-2 border ${
                        isSelected
                          ? 'bg-[#7DDCC8]/30 text-[#001e2f] border-[#7DDCC8] shadow-sm'
                          : 'bg-[#f4faff] text-[#3f484f] border-[#e3f0f8] hover:bg-[#e9f6fd]'
                      }`}
                    >
                      <span>{m.emoji}</span>
                      <span>{m.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-[#f4faff]">
              <button
                type="submit"
                disabled={isGenerating}
                className="w-full py-4 rounded-full bg-[#006590] text-[#ffffff] font-['Quicksand'] font-bold text-lg shadow-[0_4px_0_#004c6e,0_8px_16px_rgba(0,101,144,0.25)] hover:brightness-105 active:translate-y-1 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                {isGenerating ? (
                  <>
                    <Sparkles className="w-5 h-5 animate-spin" />
                    <span>Spinning Magic Words...</span>
                  </>
                ) : (
                  <>
                    <Wand2 className="w-5 h-5" />
                    <span>Create Story ✨</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
