import { Story, UserProfile, ParentSettings } from '../types/story';

export const INITIAL_USER_PROFILE: UserProfile = {
  name: 'Alex',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBscC-R5b1XGq3qJWFe1NqzgbHblbiZn4HZFyi9AZ7gtb2gEmb7QH3p-mkM4_g3K5Uq0OyrkLji_-xs5jxb6zu0x5H6-ZhBkeZmel1LPGx7DXEnuKQd3Qzs6mTQDlj2Xau602rfNNautN7gDpaR9qjL-_NHAJpkx_QWrxyP1ZqyqSbDmrTgA0Nr_nhf1PzzY-N6yaqsqq4Q0wAuo-mEpog3eAn7lsiEDLDWKXEhtW6AAseCmpHOsWk8aw',
  age: 6,
  storiesReadCount: 14,
  audioListenedCount: 8,
  totalReadingMinutes: 142,
  favoriteCategory: 'Bedtime',
  readingStreakDays: 5,
  favorites: ['dragon-fire', 'pips-adventure', 'cloudy-night'],
  currentReadingId: 'dragon-fire',
  achievements: [
    {
      id: 'first-story',
      name: 'First Story',
      description: 'Opened your very first magical tale in WonderTales!',
      icon: '📖',
      unlocked: true,
      dateUnlocked: 'Yesterday',
      category: 'Milestone'
    },
    {
      id: 'story-explorer',
      name: 'Story Explorer',
      description: 'Discovered stories from 3 different magical worlds.',
      icon: '🧭',
      unlocked: true,
      dateUnlocked: '3 days ago',
      category: 'Discovery'
    },
    {
      id: 'brave-reader',
      name: 'Brave Reader',
      description: 'Helped Ember make a brave choice in the Whispering Woods.',
      icon: '🛡️',
      unlocked: true,
      dateUnlocked: 'Today',
      category: 'Courage'
    },
    {
      id: 'bedtime-hero',
      name: 'Bedtime Hero',
      description: 'Fell asleep gently with a 15-minute sleep story.',
      icon: '🌙',
      unlocked: true,
      dateUnlocked: '2 days ago',
      category: 'Bedtime'
    },
    {
      id: 'curious-reader',
      name: 'Curious Reader',
      description: 'Completed 10 full pages without skipping a word.',
      icon: '⭐',
      unlocked: false,
      category: 'Reading'
    },
    {
      id: 'forest-guardian',
      name: 'Forest Guardian',
      description: 'Created your own magical woodland creature tale.',
      icon: '🌲',
      unlocked: false,
      category: 'Creativity'
    }
  ]
};

export const INITIAL_PARENT_SETTINGS: ParentSettings = {
  dailyScreenLimitMinutes: 45,
  bedtimeDimEnabled: true,
  bedtimeHour: '8:00 PM',
  soundEffectsEnabled: true,
  audioNarratorSpeed: 1.0,
  defaultSleepTimerMinutes: 15
};

export const MOCK_STORIES: Story[] = [
  {
    id: 'dragon-fire',
    title: 'The Dragon Who Was Afraid of Fire',
    subtitle: "Ember's Brave Heart",
    description: 'Meet Ember, a sweet little dragon who discovers that being truly brave does not mean never feeling afraid. Packed with cozy bedtime illustrations, lyrical rhymes, and heartwarming lessons.',
    category: 'fantasy',
    ageRange: 'Ages 5–8',
    readingTime: '8 min read',
    readingTimeMinutes: 8,
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAIBlp-8BKqbD1gIQRU3aGOplNa6Wd6vGMMd389Qm0jGtF8tCTOA1SpFSot4EBpXxaKfhAGMkhS0H2XER7OJZNCYSdM66YZ7yT-0jI4O4I26BolWavKEp-8nbCkwZXGg1NqoS9pNy-o7FHeJMA7keB08iz12Qi6MkaMEh8Edj8Yx1ELBu0KMFXkY_2llCw0LDiNFsQ4tDtfR7cmRxOzHtaVesksmBDbrNl4qfMQCi_aCs9aJg5k4ujaLQ',
    author: 'Lily Windemere',
    illustrator: 'Mia Chen',
    narrator: 'Sarah & Forest Melodies',
    characters: ['Ember the Dragon', 'Pip the Firefly', 'Elder Mushroom', 'Barnaby'],
    audioAvailable: true,
    audioDuration: '8:30',
    rating: 4.8,
    ratingCount: 890,
    themeTag: 'Kindness & Courage',
    featured: true,
    progressPercent: 40,
    currentChapter: 'Chapter 2 • Whispering Woods',
    hasInteractiveChoices: true,
    pages: [
      {
        pageNumber: 1,
        sceneTitle: 'Scene 1: The Mountain Nest',
        locationTag: 'High Dragon Peak • Dawn',
        illustration: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAIBlp-8BKqbD1gIQRU3aGOplNa6Wd6vGMMd389Qm0jGtF8tCTOA1SpFSot4EBpXxaKfhAGMkhS0H2XER7OJZNCYSdM66YZ7yT-0jI4O4I26BolWavKEp-8nbCkwZXGg1NqoS9pNy-o7FHeJMA7keB08iz12Qi6MkaMEh8Edj8Yx1ELBu0KMFXkY_2llCw0LDiNFsQ4tDtfR7cmRxOzHtaVesksmBDbrNl4qfMQCi_aCs9aJg5k4ujaLQ',
        text: [
          'High atop the sunlit peaks of Dragon Mountain, all the young dragons practiced blowing giant smoke rings.',
          'They blew rings shaped like hearts, hoops, and swirling clouds. But Ember sat quietly tucked behind a mossy rock, holding a dandelion flower.',
          'While his brothers roared with crackling embers, Ember whispered sweet melodies to the humming mountain birds.'
        ],
        audioSentence: 'High atop the sunlit peaks of Dragon Mountain, all the young dragons practiced blowing giant smoke rings.',
        nextAudioSentence: 'They blew rings shaped like hearts, hoops, and swirling clouds.',
        ambientSoundName: 'Morning Breeze'
      },
      {
        pageNumber: 2,
        sceneTitle: 'Scene 2: Into the Green Valley',
        locationTag: 'Emerald Valley Gate • Afternoon',
        illustration: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCstVnqWfGATBCmtYtWzoJea-y-BEz14nVqlFolCNpZobjuLA2SQYKGFehY0sPepFQ6SoJMBKr3LzX9GqIZdiRo-CqTabHLTniKF2QPAbkXxK_pLjeXeoR9VNntnWJ-U80wPiBfKlqv_SlcX6wSlewIxWerW5S-EvLeNgoMDAgZohfJZIvYUPiTXSiCkaUBlqu_9c0nnXp6dKGOyNMG_NYP05mMNr1tveRTAI4LjF_zQI3F8eFvNgW2rA',
        text: [
          'Ember decided to explore the quiet forest path below, where the ancient oak trees formed warm wooden umbrellas.',
          'He skipped over silver cobblestones and collected polished pinecones to make musical instruments.',
          'Every creature in the valley greeted him warmly. "Good day, Ember!" chirped the robins. "Thank you for walking so gently!"'
        ],
        audioSentence: 'Ember decided to explore the quiet forest path below, where ancient oak trees formed warm umbrellas.',
        nextAudioSentence: 'He skipped over silver cobblestones and collected polished pinecones.',
        ambientSoundName: 'Birds Singing'
      },
      {
        pageNumber: 3,
        sceneTitle: 'Scene 3: The Starfall Glow',
        locationTag: 'Twilight Glade • Dusk',
        illustration: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAvnYug9T9XuuOrXfkBFLoP5Edu9i-uzsUrk439j5ow6Q0wNuScyQujdBSgVMBpLM_jlFKmOKIpKcq6M7zYH7ozTnhwyXkjnJn6HQnh4GQBeWKTtpav4Gtu0Ypn2WiN3-cPZwplDhvxdmfjzNTQXhjNAP08DUZM6fBG0MJKFX7w4m-To0tpWfkqo4JaczcZ7hn-ndchFgA2WFD9OcsTQ2Cdkr3nvtjJwJl7AyVN5lLw3rO-dirLUzFZvQ',
        text: [
          'As twilight fell, the forest floor began to sparkle with azure fairy mushrooms.',
          'Ember sat with his squirrel companions, munching crunchy moon-nuts and watching twilight settle like a soft purple blanket.',
          'Yet in his chest, a quiet anxiety stirred whenever the night grew deep and dark.'
        ],
        audioSentence: 'As twilight fell, the forest floor began to sparkle with azure fairy mushrooms.',
        nextAudioSentence: 'Ember sat with his squirrel companions, munching crunchy moon-nuts.',
        ambientSoundName: 'Night Crickets'
      },
      {
        pageNumber: 4,
        sceneTitle: 'Scene 4: The Shy Spark',
        locationTag: 'The Whispering Woods • Midnight',
        illustration: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmgkoDEHx7Xj4LsCX6Z0DSso7XVoXnltFSdYAABE6NvlonKIaQaPogtppaxL4jXIc4h7wiAmgxIypYw8HZG-ESm7zeNN75vWOhJvo84x0EVwajEFl8LLYLageIqamHG3HuPw2iAK8yqQNmDQ8fpqpfsmzFv2M9PlT01EfnebZWMILjb1bk8dS_Z31M3etFDL9in2yjDLuR8wHHJrN7oFlZ1ztM9RW7_DN8VQVXSfx8QGhmZbDXBPxT9A',
        text: [
          'Once upon a time, deep in the Whispering Woods where the mushrooms glowed blue and the crickets hummed bedtime songs, there lived a tiny dragon named Ember.',
          'Ember had soft emerald scales, friendly yellow eyes, and wings that buzzed like a bumblebee. When he scampered over the velvet moss, he loved sharing crunchy moon-nuts with the squirrels. But Ember held a giant secret tucked under his belly scales...',
          'Suddenly, a frantic little firefly named Pip tumbled out of the ferns. "Ember! My lantern went cold, and I cannot find my nursery tree in the dark! Can you warm my lantern with your breath?"'
        ],
        callout: {
          icon: '🔥',
          title: 'He was terribly, awfully afraid of fire!',
          subtitle: 'Even a tiny candle flicker made his tail tremble into a pretzel knot.'
        },
        choice: {
          prompt: 'What should Ember do next?',
          subtext: "Alex, choose Ember's courage path to shape the rest of tonight's story!",
          options: [
            {
              id: 'bubble',
              emoji: '🔥',
              title: 'Gently blow a warm golden bubble',
              description: 'Overcome the shiver and spark a warm, safe glow for lost Pip',
              targetPage: 5
            },
            {
              id: 'mushroom',
              emoji: '🍃',
              title: 'Hide behind the giant singing blue mushroom',
              description: 'Ask the wise elder mushroom for musical advice first',
              targetPage: 6
            }
          ]
        },
        audioSentence: '“Little Cloudy looked down at the slumbering rooftops and whispered to the silver moon, Where do dreams go when the sun wakes up?”',
        nextAudioSentence: 'The moon smiled with sleepy eyes and sprinkled sparkling stardust across the evening breeze.',
        ambientSoundName: 'Forest Crickets'
      },
      {
        pageNumber: 5,
        sceneTitle: 'Scene 5: The Golden Glow',
        locationTag: 'Pip’s Nursery Tree • Midnight',
        illustration: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmgkoDEHx7Xj4LsCX6Z0DSso7XVoXnltFSdYAABE6NvlonKIaQaPogtppaxL4jXIc4h7wiAmgxIypYw8HZG-ESm7zeNN75vWOhJvo84x0EVwajEFl8LLYLageIqamHG3HuPw2iAK8yqQNmDQ8fpqpfsmzFv2M9PlT01EfnebZWMILjb1bk8dS_Z31M3etFDL9in2yjDLuR8wHHJrN7oFlZ1ztM9RW7_DN8VQVXSfx8QGhmZbDXBPxT9A',
        text: [
          'Ember closed his eyes, took a deep breath of fresh peppermint air, and thought about how much little Pip needed a friend.',
          'Instead of a roaring flame, he puffed out a gentle, shimmering orb of golden warmth that settled softly into Pip’s lantern.',
          'Pip squealed with joy! "You did it, Ember! Your spark is not scary at all—it is as warm and gentle as a summer hug!"'
        ],
        audioSentence: 'Instead of a roaring flame, he puffed out a gentle, shimmering orb of golden warmth.',
        nextAudioSentence: 'Pip squealed with joy! You did it, Ember!',
        ambientSoundName: 'Fairy Chimes'
      },
      {
        pageNumber: 6,
        sceneTitle: 'Scene 6: The Lullaby of the Elder Tree',
        locationTag: 'Heart of the Forest • Late Night',
        illustration: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCstVnqWfGATBCmtYtWzoJea-y-BEz14nVqlFolCNpZobjuLA2SQYKGFehY0sPepFQ6SoJMBKr3LzX9GqIZdiRo-CqTabHLTniKF2QPAbkXxK_pLjeXeoR9VNntnWJ-U80wPiBfKlqv_SlcX6wSlewIxWerW5S-EvLeNgoMDAgZohfJZIvYUPiTXSiCkaUBlqu_9c0nnXp6dKGOyNMG_NYP05mMNr1tveRTAI4LjF_zQI3F8eFvNgW2rA',
        text: [
          'Together, Ember and Pip guided all the little woodland creatures back to their cozy hollows and mossy beds.',
          'Ember realized he did not have to breathe wild fiery tempests like the mountain dragons. A kind and gentle dragon had a different kind of strength.',
          'He curled his tail around his toes, leaned against the warm roots of the elder tree, and drifted off into sweet, starry dreams.'
        ],
        audioSentence: 'He curled his tail around his toes, leaned against the warm roots, and drifted into sweet dreams.',
        nextAudioSentence: 'Goodnight little Ember, goodnight magical forest.',
        ambientSoundName: 'Gentle Harp'
      }
    ]
  },
  {
    id: 'pips-adventure',
    title: "Pip's Enchanted Adventure",
    subtitle: 'A Forest Journey',
    description: 'Join a curious red fox through ancient glowing mushrooms and kind forest creatures into the Whispering Canopy.',
    category: 'adventure',
    ageRange: 'Ages 4–7',
    readingTime: '6 min read',
    readingTimeMinutes: 6,
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAvnYug9T9XuuOrXfkBFLoP5Edu9i-uzsUrk439j5ow6Q0wNuScyQujdBSgVMBpLM_jlFKmOKIpKcq6M7zYH7ozTnhwyXkjnJn6HQnh4GQBeWKTtpav4Gtu0Ypn2WiN3-cPZwplDhvxdmfjzNTQXhjNAP08DUZM6fBG0MJKFX7w4m-To0tpWfkqo4JaczcZ7hn-ndchFgA2WFD9OcsTQ2Cdkr3nvtjJwJl7AyVN5lLw3rO-dirLUzFZvQ',
    author: 'Emily Rosewood',
    illustrator: 'Emily Rosewood',
    narrator: 'Emily Rosewood',
    characters: ['Pip the Fox', 'Barnaby the Owl', 'Luna the Hare'],
    audioAvailable: true,
    audioDuration: '6:15',
    rating: 4.8,
    ratingCount: 850,
    themeTag: 'Curiosity & Exploration',
    progressPercent: 72,
    currentChapter: 'Chapter 4 • The Whispering Canopy',
    hasInteractiveChoices: true,
    pages: [
      {
        pageNumber: 1,
        sceneTitle: 'Scene 1: The Mossy Archway',
        locationTag: 'Wonderwood Entrance • Morning',
        illustration: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAvnYug9T9XuuOrXfkBFLoP5Edu9i-uzsUrk439j5ow6Q0wNuScyQujdBSgVMBpLM_jlFKmOKIpKcq6M7zYH7ozTnhwyXkjnJn6HQnh4GQBeWKTtpav4Gtu0Ypn2WiN3-cPZwplDhvxdmfjzNTQXhjNAP08DUZM6fBG0MJKFX7w4m-To0tpWfkqo4JaczcZ7hn-ndchFgA2WFD9OcsTQ2Cdkr3nvtjJwJl7AyVN5lLw3rO-dirLUzFZvQ',
        text: [
          'Pip was not like the other little foxes who stayed near their sunny burrow. Pip had two bright amber eyes that always searched for mysteries.',
          'Early one dewy morning, he found an archway woven completely out of braided honeysuckle and glowing fairy moss.',
          'A soft hum echoed from inside. "Who dares enter the Secret Canopy?" asked a tiny voice.'
        ],
        audioSentence: 'Pip was not like the other little foxes who stayed near their sunny burrow.',
        nextAudioSentence: 'Pip had two bright amber eyes that always searched for mysteries.',
        ambientSoundName: 'Birds & Leaves'
      },
      {
        pageNumber: 2,
        sceneTitle: 'Scene 2: The Firefly Bridge',
        locationTag: 'Crystalline Brook • Twilight',
        illustration: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCstVnqWfGATBCmtYtWzoJea-y-BEz14nVqlFolCNpZobjuLA2SQYKGFehY0sPepFQ6SoJMBKr3LzX9GqIZdiRo-CqTabHLTniKF2QPAbkXxK_pLjeXeoR9VNntnWJ-U80wPiBfKlqv_SlcX6wSlewIxWerW5S-EvLeNgoMDAgZohfJZIvYUPiTXSiCkaUBlqu_9c0nnXp6dKGOyNMG_NYP05mMNr1tveRTAI4LjF_zQI3F8eFvNgW2rA',
        text: [
          'Pip stepped past the mossy lantern archway into the Whispering Canopy to meet the forest council.',
          'Ahead lay a sparkling brook with no stones to cross. But hundreds of green fireflies formed a glowing aerial bridge!',
          '"Trust your paws, little fox," whispered the oldest firefly. "One step at a time."'
        ],
        choice: {
          prompt: 'Which way should Pip step across the brook?',
          subtext: 'Choose Pip’s path across the glowing water!',
          options: [
            {
              id: 'firefly-bridge',
              emoji: '✨',
              title: 'Cross the glowing Firefly Bridge',
              description: 'Follow the gentle light of the friendly glowing bugs',
              targetPage: 3
            },
            {
              id: 'lily-pad',
              emoji: '🌸',
              title: 'Hop on the giant floating water lilies',
              description: 'Bounce playfully like a river frog',
              targetPage: 3
            }
          ]
        },
        audioSentence: 'Ahead lay a sparkling brook with no stones to cross.',
        nextAudioSentence: 'Trust your paws, little fox, whispered the oldest firefly.',
        ambientSoundName: 'Babbling Brook'
      },
      {
        pageNumber: 3,
        sceneTitle: 'Scene 3: The Forest Council',
        locationTag: 'Great Elder Grove • Night',
        illustration: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAvnYug9T9XuuOrXfkBFLoP5Edu9i-uzsUrk439j5ow6Q0wNuScyQujdBSgVMBpLM_jlFKmOKIpKcq6M7zYH7ozTnhwyXkjnJn6HQnh4GQBeWKTtpav4Gtu0Ypn2WiN3-cPZwplDhvxdmfjzNTQXhjNAP08DUZM6fBG0MJKFX7w4m-To0tpWfkqo4JaczcZ7hn-ndchFgA2WFD9OcsTQ2Cdkr3nvtjJwJl7AyVN5lLw3rO-dirLUzFZvQ',
        text: [
          'Pip reached the council circle where the wisest animals of the forest held council.',
          'They presented Pip with a golden acorn badge for his courage and curiosity.',
          'With a heart full of wonder, Pip curled up in a nest of soft fern leaves, dreaming of tomorrow’s adventures.'
        ],
        audioSentence: 'With a heart full of wonder, Pip curled up in a nest of soft fern leaves.',
        nextAudioSentence: 'Tomorrow would bring even more wonders to discover.',
        ambientSoundName: 'Night Wind'
      }
    ]
  },
  {
    id: 'cloudy-night',
    title: "Cloudy's Confused Night",
    subtitle: 'The Cloud That Lost Its Way',
    description: 'A soothing lullaby tale of a fluffy cloud drifting softly into dreamland among smiling stars and silver crescent moons.',
    category: 'bedtime',
    ageRange: 'Ages 3–6',
    readingTime: '5 min read',
    readingTimeMinutes: 5,
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBqyTu53bB8BXwuHSPQQ3fgrxgWKUSVDibThK4w6bi83LeXPwRblUKQt0DPuJHGxorvRcX2U6dcYmjq50284imiTSt5NR_I6w0lMto4reqa9Op_14H3-u9pUnSPTQltFLP9FdRJtfEmDzrDCaWjg6qzc2CkpiXoKMnxDZjgpgUUeyjp1kzRtDykwMbVDRxbD6R08sMJdA53haz8N9ZABDUwBJQ9_aNkhXi5vTi38GLlknnrZKPypx82vQ',
    author: 'Elara Moon',
    illustrator: 'Mia Chen',
    narrator: 'Auntie Lily & Forest Melody',
    characters: ['Cloudy', 'The Silver Moon', 'Stella the Star'],
    audioAvailable: true,
    audioDuration: '8:30',
    rating: 5.0,
    ratingCount: 2400,
    themeTag: 'Sleep & Sweet Dreams',
    progressPercent: 35,
    currentChapter: 'Chapter 2 • The Silver Moon Nest',
    hasInteractiveChoices: false,
    pages: [
      {
        pageNumber: 1,
        sceneTitle: 'Scene 1: High in the Violet Sky',
        locationTag: 'Twilight Atmosphere • Evening',
        illustration: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBqyTu53bB8BXwuHSPQQ3fgrxgWKUSVDibThK4w6bi83LeXPwRblUKQt0DPuJHGxorvRcX2U6dcYmjq50284imiTSt5NR_I6w0lMto4reqa9Op_14H3-u9pUnSPTQltFLP9FdRJtfEmDzrDCaWjg6qzc2CkpiXoKMnxDZjgpgUUeyjp1kzRtDykwMbVDRxbD6R08sMJdA53haz8N9ZABDUwBJQ9_aNkhXi5vTi38GLlknnrZKPypx82vQ',
        text: [
          'High above the sleeping rooftops, where the sky turned the color of ripe blueberries, lived Cloudy.',
          'Cloudy was made of vanilla-fluff and spun sugar. Usually, he floated right beside his mama cloud at night.',
          'But tonight, a playful gust of lavender wind blew Cloudy all the way into the starry constellation meadow!'
        ],
        audioSentence: 'High above the sleeping rooftops, where the sky turned blueberry blue, lived Cloudy.',
        nextAudioSentence: 'Cloudy was made of vanilla-fluff and spun sugar.',
        ambientSoundName: 'Gentle Rain'
      },
      {
        pageNumber: 2,
        sceneTitle: 'Scene 2: Meeting the Constellations',
        locationTag: 'Stardust Meadow • Night',
        illustration: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAuiw8uRvkWKtrynuZuQFqp2Eyp1dCFVuMolIPdu4T6Irz4U9ZjYnAZDpy-YhzPRiwNlCY1KJhY68-Kson3S7VeVVXUN5I2APdVQiZJ0jVoPlhc3dqC3ElhnaZvRUeLdrQr7i32IAkXOYdco16j34AJWKpFqV95i2Msr_iTZGWm67ZQzgMRgQtUMAUZEfgG6gcVRN9f_pRXvVta-yNhH3BOIdf50pJ9c9pE5hZqhsZ5RUo1W96nJtCsfQ',
        text: [
          'Little Cloudy looked down at the slumbering rooftops and whispered to the silver moon, "Where do dreams go when the sun wakes up?"',
          'The moon smiled with sleepy eyes and sprinkled sparkling stardust across the evening breeze.',
          '"They wait right here in your soft cloud pillows, little one," whispered the moon softly.'
        ],
        audioSentence: '“Little Cloudy looked down at the slumbering rooftops and whispered to the silver moon, ‘Where do dreams go when the sun wakes up?’ ”',
        nextAudioSentence: 'The moon smiled with sleepy eyes and sprinkled sparkling stardust across the evening breeze.',
        ambientSoundName: 'Night Crickets'
      },
      {
        pageNumber: 3,
        sceneTitle: 'Scene 3: The Silver Moon Nest',
        locationTag: 'The Moon’s Cradle • Bedtime',
        illustration: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBqyTu53bB8BXwuHSPQQ3fgrxgWKUSVDibThK4w6bi83LeXPwRblUKQt0DPuJHGxorvRcX2U6dcYmjq50284imiTSt5NR_I6w0lMto4reqa9Op_14H3-u9pUnSPTQltFLP9FdRJtfEmDzrDCaWjg6qzc2CkpiXoKMnxDZjgpgUUeyjp1kzRtDykwMbVDRxbD6R08sMJdA53haz8N9ZABDUwBJQ9_aNkhXi5vTi38GLlknnrZKPypx82vQ',
        text: [
          'The silver crescent moon leaned down and cradled Cloudy in its gentle curve.',
          'Cloudy let out a cozy yawn that sounded like a summer rain shower.',
          'Close your eyes, sweet dreamers everywhere. The sky is watching over you tonight.'
        ],
        audioSentence: 'The silver crescent moon leaned down and cradled Cloudy in its gentle curve.',
        nextAudioSentence: 'Close your eyes, sweet dreamers everywhere. The sky is watching over you tonight.',
        ambientSoundName: 'Fairy Harp'
      }
    ]
  },
  {
    id: 'leo-magic-forest',
    title: 'Leo & the Magic Forest',
    subtitle: 'The Book of Kindness',
    description: 'Leo unearths a book beneath the giant elder tree whose words magically glow whenever kindness is shown.',
    category: 'friendship',
    ageRange: 'Ages 6–9',
    readingTime: '7 min read',
    readingTimeMinutes: 7,
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCstVnqWfGATBCmtYtWzoJea-y-BEz14nVqlFolCNpZobjuLA2SQYKGFehY0sPepFQ6SoJMBKr3LzX9GqIZdiRo-CqTabHLTniKF2QPAbkXxK_pLjeXeoR9VNntnWJ-U80wPiBfKlqv_SlcX6wSlewIxWerW5S-EvLeNgoMDAgZohfJZIvYUPiTXSiCkaUBlqu_9c0nnXp6dKGOyNMG_NYP05mMNr1tveRTAI4LjF_zQI3F8eFvNgW2rA',
    author: 'Emily Rosewood',
    illustrator: 'Mia Chen',
    narrator: 'Papa Bear & Sarah',
    characters: ['Leo', 'Rusty the Fox', 'Elder Oak'],
    audioAvailable: true,
    audioDuration: '7:40',
    rating: 4.9,
    ratingCount: 940,
    themeTag: 'Sharing & Caring',
    pages: [
      {
        pageNumber: 1,
        sceneTitle: 'Scene 1: Beneath the Elder Tree',
        locationTag: 'Ancient Grove • Sunset',
        illustration: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCstVnqWfGATBCmtYtWzoJea-y-BEz14nVqlFolCNpZobjuLA2SQYKGFehY0sPepFQ6SoJMBKr3LzX9GqIZdiRo-CqTabHLTniKF2QPAbkXxK_pLjeXeoR9VNntnWJ-U80wPiBfKlqv_SlcX6wSlewIxWerW5S-EvLeNgoMDAgZohfJZIvYUPiTXSiCkaUBlqu_9c0nnXp6dKGOyNMG_NYP05mMNr1tveRTAI4LjF_zQI3F8eFvNgW2rA',
        text: [
          'Under the glowing roots of the oldest oak in the world, Leo and his fox companion Rusty sat side by side.',
          'Between their paws lay a weathered storybook wrapped in ivy and gold thread.',
          'Every time Leo shared his apples or patted Rusty’s head, a new sentence wrote itself in shining golden script.'
        ],
        audioSentence: 'Under the glowing roots of the oldest oak, Leo and Rusty sat side by side.',
        nextAudioSentence: 'Every time Leo shared, a new sentence wrote itself in gold.',
        ambientSoundName: 'Gentle Harp'
      }
    ]
  },
  {
    id: 'moons-missing-star',
    title: "The Moon's Missing Star",
    subtitle: 'A Constellation Treasure Map',
    description: 'When Stella the littlest twinkling star plays hide-and-seek, the midnight sky turns into a constellation treasure map.',
    category: 'bedtime',
    ageRange: 'Ages 4–8',
    readingTime: '7 min read',
    readingTimeMinutes: 7,
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuABFBihBgL03_ycOlWweJg5RT-9ui-fm_dHOCNe23tOQyYBP_hucIlKFe7x8LSs9YjWfaRjIKHJvbvs3E0PHF5jL_Jvka5X9PUP727EMg_TYh050JdzD4ipbS3qgPD8FIooG4GgARhLmyhq50dHMBc4P2jM9zxKVicwFvgu5DMHUOEHqkLMt_WxLUs4ye7_InaZ9NStH_7LtX3OW_ViNfenXc-4px1wCKN4IgvUuuWOQWgxkIVvLEPo7g',
    author: 'Celeste Quill',
    illustrator: 'Celeste Quill',
    narrator: 'Celeste Quill',
    characters: ['Stella', 'The Sleepy Owl', 'The Big Dipper Bear'],
    audioAvailable: true,
    audioDuration: '7:10',
    rating: 4.9,
    ratingCount: 730,
    themeTag: 'Wonder & Night Skies',
    pages: [
      {
        pageNumber: 1,
        sceneTitle: 'Scene 1: The Silver Crescent',
        locationTag: 'Night Cloud Basin • 9:00 PM',
        illustration: 'https://lh3.googleusercontent.com/aida-public/AB6AXuABFBihBgL03_ycOlWweJg5RT-9ui-fm_dHOCNe23tOQyYBP_hucIlKFe7x8LSs9YjWfaRjIKHJvbvs3E0PHF5jL_Jvka5X9PUP727EMg_TYh050JdzD4ipbS3qgPD8FIooG4GgARhLmyhq50dHMBc4P2jM9zxKVicwFvgu5DMHUOEHqkLMt_WxLUs4ye7_InaZ9NStH_7LtX3OW_ViNfenXc-4px1wCKN4IgvUuuWOQWgxkIVvLEPo7g',
        text: [
          'High in the periwinkle sky, a sleepy blue owl perched on a stardust cloud beside the crescent moon.',
          '"Has anyone seen Stella?" asked the moon. "The constellation puzzle is missing its sparkling center!"',
          'With a sleepy flutter of wings, the wise owl pointed his wing toward the Milky Way river.'
        ],
        audioSentence: 'High in the periwinkle sky, a sleepy blue owl perched on a stardust cloud.',
        nextAudioSentence: 'Has anyone seen Stella? asked the moon with a smile.',
        ambientSoundName: 'Night Crickets'
      }
    ]
  },
  {
    id: 'barnaby-bear',
    title: "Barnaby Bear's Honey Quest",
    subtitle: 'The Sweetest Lesson in the Meadow',
    description: 'Barnaby promises to make Grandma Bear a surprise honeycomb pie, learning how to be polite to the forest bees along the way.',
    category: 'animals',
    ageRange: 'Ages 3–6',
    readingTime: '6 min read',
    readingTimeMinutes: 6,
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7zYjf-YmpULHaKdqkVi2SX9xT3PRzSaltf-839qAdN45H3wf84gt7-36ojddvslD7e4Z1cITiBCwY5Yi9H1SVQtaDvoV15tH_MVhjiK29DkIgC688tkT8SuwsL13qvVn75MA8SbLR7a_cvofplCFmKrb0hUcbYVRTsLhqG_LszbYj-iMmSFDrjofc7Zx_FkIIECmTQnrjvJAbXcWmIiYh2VbIoddSz0yylFN0BxZjqZFxyvWWDmOASA',
    author: 'Arthur Paws',
    illustrator: 'Mia Chen',
    narrator: 'Uncle Julian',
    characters: ['Barnaby Bear', 'Grandma Bear', 'Queen Honeybee'],
    audioAvailable: true,
    audioDuration: '6:30',
    rating: 4.7,
    ratingCount: 610,
    themeTag: 'Politeness & Family',
    pages: [
      {
        pageNumber: 1,
        sceneTitle: 'Scene 1: The Wildflower Stepping Stones',
        locationTag: 'Sunny Meadow • Midday',
        illustration: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7zYjf-YmpULHaKdqkVi2SX9xT3PRzSaltf-839qAdN45H3wf84gt7-36ojddvslD7e4Z1cITiBCwY5Yi9H1SVQtaDvoV15tH_MVhjiK29DkIgC688tkT8SuwsL13qvVn75MA8SbLR7a_cvofplCFmKrb0hUcbYVRTsLhqG_LszbYj-iMmSFDrjofc7Zx_FkIIECmTQnrjvJAbXcWmIiYh2VbIoddSz0yylFN0BxZjqZFxyvWWDmOASA',
        text: [
          'Barnaby, with his cozy yellow woven scarf, balanced across the smooth stepping stones of the creek.',
          'Friendly bumblebees zipped past carrying miniature honey jars, humming cheerful polkas.',
          '"Please, kind bees," Barnaby said with a polite bow, "may I trade these fresh sweet raspberries for a cup of your golden clover honey?"'
        ],
        audioSentence: 'Barnaby, with his cozy yellow scarf, balanced across the smooth stepping stones.',
        nextAudioSentence: 'Friendly bumblebees zipped past carrying miniature honey jars.',
        ambientSoundName: 'Birds & Leaves'
      }
    ]
  },
  {
    id: 'girl-talked-windmills',
    title: 'The Girl Who Talked to Windmills',
    subtitle: 'Breezes of the World',
    description: 'Maya uncovers how breezes travel the planet to carry seeds, weather changes, and old folktales from distant valleys.',
    category: 'learning',
    ageRange: 'Ages 7–10',
    readingTime: '9 min read',
    readingTimeMinutes: 9,
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCsjXPUVLO7cl3vzWCXq6tk3wVt_4jRMjE-6sp6qNRChnZcJ-mihAmq3odsLTwEi20n4ipuDD9zkS3ZDQTOXFi0KZrAUb5IDUOYMTlphI7kqSa9-uguqVDwhMev_sVOJbHfYC6tnkfeG-fLFGAgpBNWhOI7Ncz8vTiXmJKjU2C_BpyXkJS07Uk3f0YtVC1bbq_N5q-zLe6KTuO5DumxFjFTBfAruPc3ppcM_v67vOoOv7cjpSnlFaIwaw',
    author: 'Thomas Van Horn',
    illustrator: 'Thomas Van Horn',
    narrator: 'Mama Willow',
    characters: ['Maya', 'Zephyr the Windmill', 'The North Wind'],
    audioAvailable: true,
    audioDuration: '9:15',
    rating: 4.9,
    ratingCount: 420,
    themeTag: 'Nature & Science',
    pages: [
      {
        pageNumber: 1,
        sceneTitle: 'Scene 1: Whispers in the Sails',
        locationTag: 'Tulip Fields • Sunrise',
        illustration: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCsjXPUVLO7cl3vzWCXq6tk3wVt_4jRMjE-6sp6qNRChnZcJ-mihAmq3odsLTwEi20n4ipuDD9zkS3ZDQTOXFi0KZrAUb5IDUOYMTlphI7kqSa9-uguqVDwhMev_sVOJbHfYC6tnkfeG-fLFGAgpBNWhOI7Ncz8vTiXmJKjU2C_BpyXkJS07Uk3f0YtVC1bbq_N5q-zLe6KTuO5DumxFjFTBfAruPc3ppcM_v67vOoOv7cjpSnlFaIwaw',
        text: [
          'Maya stood in her denim overalls looking up at the friendly smiling wooden windmill on the hill.',
          'As the giant sails spun in the mint-green morning breeze, they began to chant ancient stories.',
          '"Listen closely, Maya," creaked the windmill. "Today’s wind started as an ocean wave three oceans away!"'
        ],
        audioSentence: 'Maya stood in her denim overalls looking up at the friendly windmill.',
        nextAudioSentence: 'As the giant sails spun, they began to chant ancient stories of the sea.',
        ambientSoundName: 'Morning Breeze'
      }
    ]
  },
  {
    id: 'sleepy-starboat',
    title: 'The Sleepy Little Starboat',
    subtitle: 'Captain Hoot’s Dream Cruise',
    description: 'Sail across the Milky Way with Captain Hoot to collect sweet dreams before tucking into bed.',
    category: 'bedtime',
    ageRange: 'Ages 3–6',
    readingTime: '12 min read',
    readingTimeMinutes: 12,
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDU5MPypWPW2bOhyZfGOZwdm8a1XrkXYs9KZJrX_VxycW-15aqDlyfkVPtqxF-DvQoutk2DQj1l11t5fha9cB6qJ5ZpIae-hj1DA5GeR-LRIineYwT2iDeubRZKID0YEX-eGbVFyywgabC2OXoRuQzSG4i8Ipb1hFpbmWLrusfYhIF_sWWt9APhQKOjSckiZ88ls1ruRlc2auwluhpMH9Zdk4E3NYX6VY3NAtMLxAhXExZVZQq8Zdb-ug',
    author: 'Elara Moon',
    illustrator: 'Mia Chen',
    narrator: 'Papa Bear Voicework',
    characters: ['Captain Hoot', 'Starfish Sammy'],
    audioAvailable: true,
    audioDuration: '12:00',
    rating: 5.0,
    ratingCount: 1100,
    themeTag: 'Deep Sleep & Lullaby',
    pages: [
      {
        pageNumber: 1,
        sceneTitle: 'Scene 1: Casting Off the Cloud Mooring',
        locationTag: 'The Milky Way Harbor • 8:30 PM',
        illustration: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDU5MPypWPW2bOhyZfGOZwdm8a1XrkXYs9KZJrX_VxycW-15aqDlyfkVPtqxF-DvQoutk2DQj1l11t5fha9cB6qJ5ZpIae-hj1DA5GeR-LRIineYwT2iDeubRZKID0YEX-eGbVFyywgabC2OXoRuQzSG4i8Ipb1hFpbmWLrusfYhIF_sWWt9APhQKOjSckiZ88ls1ruRlc2auwluhpMH9Zdk4E3NYX6VY3NAtMLxAhXExZVZQq8Zdb-ug',
        text: [
          'Captain Hoot adjusted his nightcap and unfurled the sails woven from spun moonlight.',
          'The little wooden boat dipped into the lavender starlight ocean with a gentle splash.',
          '"All aboard for Slumberland," hooted the captain, as sleepy eyelids everywhere began to flutter closed.'
        ],
        audioSentence: 'Captain Hoot adjusted his nightcap and unfurled the sails of spun moonlight.',
        nextAudioSentence: 'The little boat dipped into the starlight ocean with a gentle splash.',
        ambientSoundName: 'Gentle Rain'
      }
    ]
  },
  {
    id: 'olivers-moonlit-garden',
    title: "Oliver's Moonlit Garden",
    subtitle: 'Night-blooming Jasmine',
    description: 'A sleepy hedgehog waters night-blooming jasmine flowers and listens to the gentle murmuring brook.',
    category: 'animals',
    ageRange: 'Ages 4–7',
    readingTime: '9 min read',
    readingTimeMinutes: 9,
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCWMsS_k14vZQgYjp7zTXkq_q7GLmuwEHp2t9t4821JAas_AWzdadzbQDHFEXumQVQnOtFs0ooFsg8nP_otLYogY3uw88HQ1cifjKmgRzs-1leTLWzba9q6WrTKwbH_WbByh4TbSfq-9SqQ6DMc_HMchvHo951AcAwuFsaXw_a1yVlKKemNauMrAacMMGBX8MbhasDUtFhMYMRV5jOJlFZ_M_ogtsf0wix0N8obj2AYIr7qlc1JWIm3gA',
    author: 'Lily Windemere',
    illustrator: 'Mia Chen',
    narrator: 'Mama Willow',
    characters: ['Oliver the Hedgehog', 'Barnaby'],
    audioAvailable: true,
    audioDuration: '9:00',
    rating: 4.8,
    ratingCount: 520,
    themeTag: 'Soothing Nature',
    pages: [
      {
        pageNumber: 1,
        sceneTitle: 'Scene 1: The Dewdrops on the Petals',
        locationTag: 'Garden of Sleep • 9:15 PM',
        illustration: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCWMsS_k14vZQgYjp7zTXkq_q7GLmuwEHp2t9t4821JAas_AWzdadzbQDHFEXumQVQnOtFs0ooFsg8nP_otLYogY3uw88HQ1cifjKmgRzs-1leTLWzba9q6WrTKwbH_WbByh4TbSfq-9SqQ6DMc_HMchvHo951AcAwuFsaXw_a1yVlKKemNauMrAacMMGBX8MbhasDUtFhMYMRV5jOJlFZ_M_ogtsf0wix0N8obj2AYIr7qlc1JWIm3gA',
        text: [
          'Oliver the hedgehog had tiny paws and a soft round nose that smelled rain before it even arrived.',
          'With his silver watering can, he sprinkled drops over sleeping jasmine blossoms.',
          'Each blossom opened with a faint sigh of lavender perfume, filling the midnight forest with peaceful rest.'
        ],
        audioSentence: 'Oliver the hedgehog had tiny paws and a soft round nose.',
        nextAudioSentence: 'With his silver watering can, he sprinkled drops over sleeping jasmine blossoms.',
        ambientSoundName: 'Night Crickets'
      }
    ]
  },
  {
    id: 'blanket-fort-kingdom',
    title: 'The Blanket Fort Kingdom',
    subtitle: 'Sir Fluffington’s Vigil',
    description: 'King Theodore and Sir Fluffington guard the fortress of pillows against ticklish night shadows.',
    category: 'adventure',
    ageRange: 'Ages 4–8',
    readingTime: '14 min read',
    readingTimeMinutes: 14,
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBVr1Z0mcB0wk710f4TzmwWz-MD9q5J8l3oa54OAXaiDEFmNRXVb_1YfA-8LmDunIB1d4umcSUx9LlJ_-79iEJgbPoiStQ98psBEnBKjeOLM9nUgXzSssBdbwFD4CBUdtzq4Wqxyp7_mCvJDgYgiZn_lW-aOmD4x2W1Qag8fQDcVaqwMMPCO7OqJC-HWJ7Nf5Dr-Iv50sKTK-DCtL8zOPUwe5dOjDoGl5gDTRLCvn40pfIo1RM3c4BniA',
    author: 'Thomas Van Horn',
    illustrator: 'Mia Chen',
    narrator: 'Uncle Julian',
    characters: ['King Theodore', 'Sir Fluffington the Bear'],
    audioAvailable: true,
    audioDuration: '14:00',
    rating: 4.9,
    ratingCount: 880,
    themeTag: 'Cozy Comfort',
    pages: [
      {
        pageNumber: 1,
        sceneTitle: 'Scene 1: Fortress of Feathers',
        locationTag: 'Bedroom Kingdom • 8:45 PM',
        illustration: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBVr1Z0mcB0wk710f4TzmwWz-MD9q5J8l3oa54OAXaiDEFmNRXVb_1YfA-8LmDunIB1d4umcSUx9LlJ_-79iEJgbPoiStQ98psBEnBKjeOLM9nUgXzSssBdbwFD4CBUdtzq4Wqxyp7_mCvJDgYgiZn_lW-aOmD4x2W1Qag8fQDcVaqwMMPCO7OqJC-HWJ7Nf5Dr-Iv50sKTK-DCtL8zOPUwe5dOjDoGl5gDTRLCvn40pfIo1RM3c4BniA',
        text: [
          'Inside the fortress of quilts and velvet pillows, golden fairy lights twinkled warmly.',
          'King Theodore laid his sword of cardboard aside and opened the big leather storybook.',
          '"Tonight, Sir Fluffington," whispered Theodore, "we declare peace across all four corners of the bedroom."'
        ],
        audioSentence: 'Inside the fortress of quilts and velvet pillows, fairy lights twinkled warmly.',
        nextAudioSentence: 'King Theodore laid his cardboard sword aside and opened the storybook.',
        ambientSoundName: 'Fairy Harp'
      }
    ]
  }
];

export const CATEGORIES_DATA = [
  {
    id: 'bedtime',
    name: 'Bedtime',
    subtitle: 'Moon & stars',
    iconName: 'bedtime',
    emoji: '🌙',
    bgClass: 'bg-[#F5F1FF]',
    hoverClass: 'hover:bg-[#e5deff]',
    iconColor: 'text-[#5c4bc3]',
    description: 'Gentle, soothing stories crafted to calm active minds and guide little dreamers into deep, restful sleep.'
  },
  {
    id: 'adventure',
    name: 'Adventure',
    subtitle: 'Compass & quests',
    iconName: 'explore',
    emoji: '🧭',
    bgClass: 'bg-[#FFD966]/20',
    hoverClass: 'hover:bg-[#FFD966]/40',
    iconColor: 'text-[#111d23]',
    description: 'Exciting expeditions through whispering canopies, misty hills, and starry skies with brave animal companions.'
  },
  {
    id: 'animals',
    name: 'Animals',
    subtitle: 'Forest friends',
    iconName: 'pets',
    emoji: '🐾',
    bgClass: 'bg-[#7DDCC8]/25',
    hoverClass: 'hover:bg-[#7DDCC8]/45',
    iconColor: 'text-[#006590]',
    description: 'Charming woodland creatures, fluffy bears, and clever foxes learning how to cooperate, share, and love.'
  },
  {
    id: 'fantasy',
    name: 'Fantasy',
    subtitle: 'Magic & dragons',
    iconName: 'castle',
    emoji: '🏰',
    bgClass: 'bg-[#c8e6ff]/40',
    hoverClass: 'hover:bg-[#c8e6ff]',
    iconColor: 'text-[#006590]',
    description: 'Enchanted forests with bioluminescent mushrooms, gentle baby dragons, floating cloud castles, and friendly wizards.'
  },
  {
    id: 'friendship',
    name: 'Friendship',
    subtitle: 'Caring & sharing',
    iconName: 'favorite',
    emoji: '❤️',
    bgClass: 'bg-[#ffa69d]/30',
    hoverClass: 'hover:bg-[#ffa69d]/50',
    iconColor: 'text-[#9e4039]',
    description: 'Warm tales celebrating empathy, resolving misunderstandings, kindness to smaller creatures, and true camaraderie.'
  },
  {
    id: 'learning',
    name: 'Learning',
    subtitle: 'Growth & ideas',
    iconName: 'lightbulb',
    emoji: '💡',
    bgClass: 'bg-[#e3f0f8]',
    hoverClass: 'hover:bg-[#ddeaf2]',
    iconColor: 'text-[#5c4bc3]',
    description: 'Fun, curious science and nature explorations answering big questions like where wind comes from and how flowers drink rain.'
  }
];
