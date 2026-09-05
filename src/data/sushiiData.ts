// ============================================================
// SUSHII'S BIRTHDAY SCRAPBOOK — CENTRAL DATA FILE
// ============================================================
// Edit everything here! No need to dig through components.
// Replace photo paths, captions, messages, playlist, etc.
// ============================================================

import image1 from '../images/1.jpeg';
import image2 from '../images/2.jpeg';
import image3 from '../images/3.jpeg';
import image4 from '../images/4.jpeg';
import image9 from '../images/9.jpeg';
import image5 from '../images/5.jpeg';
import image6 from '../images/6.jpeg';
import image7 from '../images/7.jpeg';

import song1 from '../music/My POV of you.mp3';
import song2 from '../music/company.mp3';
import song3 from '../music/agar tum kaho.mp3';



export type PhotoType =
  | 'polaroid'
  | 'cutout'
  | 'heart'
  | 'circle'
  | 'taped'
  | 'strip'
  | 'tiny'
  | 'feature';

export type PhotoCategory = 'cutie' | 'pretty' | 'chaos' | 'aesthetic' | 'favorites';

export interface SushiiPhoto {
  src: string;
  caption: string;
  type: PhotoType;
  category: PhotoCategory[];
  rotation?: number;
  longMessage?: string;
}

export interface Reason {
  title: string;
  message: string;
  color: string;
}

export interface Note {
  title: string;
  message: string;
  color: string;
  rotation: number;
}

export interface Wish {
  title: string;
  message: string;
}

export interface FutureMemory {
  scene: string;
  caption: string;
  clickMessage: string;
  rotation: number;
}

export interface BucketItem {
  text: string;
}

export interface Envelope {
  label: string;
  message: string;
  color: string;
}

export interface PlaylistSong {
  title: string;
  artist: string;
  src: string;
}

export interface SecretMessage {
  id: string;
  label: string;
  message: string;
}

export const sushiiData = {
  name: 'Sushii',

  // ---- PHOTOS ----
  // Replace src paths with real photos in /public/images/
  // Categories determine which gallery filter shows them
  photos: [
    {
      src: image1,
      caption: 'pretty girl ♡',
      type: 'polaroid' as PhotoType,
      category: ['cutie', 'pretty', 'favorites'] as PhotoCategory[],
      rotation: -3,
      longMessage: 'look at this cutie. main character energy honestly.',
    },
    {
      // src: '/images/sushii-02.jpg',
      src: image2,
      caption: 'okay miss pretty',
      type: 'cutout' as PhotoType,
      category: ['pretty', 'aesthetic'] as PhotoCategory[],
      rotation: 4,
      longMessage: 'she doesn\'t even know how cute she is.',
    },
    {
      // src: '/images/sushii-03.jpg',
      src: image9,
      caption: 'just Sushii being Sushii ♡',
      type: 'heart' as PhotoType,
      category: ['cutie', 'favorites'] as PhotoCategory[],
      rotation: -2,
      longMessage: 'certified sweetheart. no notes.',
    },
    {
      // src: '/images/sushii-04.jpg',
      // src: '/src/images/3.jpeg',
      src: image3,
      caption: 'this one >>>',
      type: 'circle' as PhotoType,
      category: ['chaos', 'cutie'] as PhotoCategory[],
      rotation: 5,
      longMessage: 'how are you this cute? genuinely asking.',
    },
    {
      // src: '/images/sushii-05.jpg',
      // src: '/src/images/4.jpeg',
      src: image4,
      caption: '10/10 human',
      type: 'taped' as PhotoType,
      category: ['pretty', 'aesthetic', 'favorites'] as PhotoCategory[],
      rotation: -4,
      longMessage: 'the kind of person who makes everything brighter.',
    },
    {
      // src: '/images/sushii-06.jpg',
      // src: '/src/images/5.jpeg',
      src: image5,
      caption: 'girl what',
      type: 'strip' as PhotoType,
      category: ['chaos'] as PhotoCategory[],
      rotation: 2,
      longMessage: 'too cute, slightly chaotic. perfect combo.',
    },
    {
      // src: '/images/sushii-07.jpg',
      // src: '/src/images/6.jpeg',
      src: image6,
      caption: 'main character energy',
      type: 'tiny' as PhotoType,
      category: ['cutie', 'pretty'] as PhotoCategory[],
      rotation: -5,
      longMessage: 'she walks in and everything just gets better.',
    },
    {
      // src: '/images/sushii-08.jpg',
      // src: '/src/images/7.jpeg',
      src: image7,
      caption: 'favorite ♡',
      type: 'feature' as PhotoType,
      category: ['favorites', 'aesthetic', 'pretty'] as PhotoCategory[],
      rotation: 1,
      longMessage: 'this one lives rent-free in my head.',
    },
  ] as SushiiPhoto[],

  // ---- REASONS YOU'RE AMAZING ----
  reasons: [
    {
      title: 'Your kindness ♡',
      message:
        'You have this beautiful way of making people feel seen and cared for. Never underestimate how much that means.',
      color: 'pink',
    },
    {
      title: 'Your smile ♡',
      message:
        'The kind of smile that makes everyone around you feel like everything is going to be okay.',
      color: 'wine',
    },
    {
      title: 'Your energy ♡',
      message:
        'You walk into a room and the whole vibe shifts. It\'s genuinely magnetic.',
      color: 'purple',
    },
    {
      title: 'Your sense of humor ♡',
      message:
        'Life would honestly be considerably less entertaining without your wonderfully chaotic energy.',
      color: 'green',
    },
    {
      title: 'Your heart ♡',
      message:
        'You care so deeply and so genuinely. That\'s rare, and it\'s one of the most beautiful things about you.',
      color: 'blue',
    },
    {
      title: 'Your strength ♡',
      message:
        'You\'ve been through things people don\'t even know about, and you\'re still here, still glowing.',
      color: 'pink',
    },
    {
      title: 'Your beautiful mind ♡',
      message:
        'The way you think about things, the way you see the world — it\'s uniquely you and it\'s wonderful.',
      color: 'wine',
    },
    {
      title: 'The way you care ♡',
      message:
        'You don\'t just say you care. You show it. In a hundred tiny ways, every single day.',
      color: 'purple',
    },
    {
      title: 'Your chaos ♡',
      message:
        'Life would honestly be considerably less entertaining without your wonderfully chaotic personality.',
      color: 'green',
    },
    {
      title: 'Simply being you ♡',
      message:
        'You don\'t need to try to be special. You just are. Being yourself is more than enough.',
      color: 'blue',
    },
  ] as Reason[],

  // ---- HANDWRITTEN NOTES ----
  notes: [
    {
      title: 'you\'re genuinely so lovely',
      message:
        'Not in a generic way. In a way that makes people feel lucky they crossed paths with you.',
      color: 'pink',
      rotation: -3,
    },
    {
      title: 'you make things brighter',
      message:
        'Literally everything is better when you\'re around. That\'s not an exaggeration.',
      color: 'purple',
      rotation: 4,
    },
    {
      title: 'never stop being you',
      message:
        'The world needs exactly one of you, and you\'re doing a perfect job at being it.',
      color: 'green',
      rotation: -2,
    },
    {
      title: 'you\'re way more special than you realize',
      message:
        'I mean it. You genuinely don\'t see yourself the way other people see you.',
      color: 'wine',
      rotation: 5,
    },
    {
      title: 'your existence is a pretty good thing ♡',
      message:
        'The universe did something right when it put you here. Just so you know.',
      color: 'blue',
      rotation: -4,
    },
    {
      title: 'certified sweetheart',
      message:
        'Official. Certified. No expiration date. You\'re stuck with this title.',
      color: 'pink',
      rotation: 3,
    },
    {
      title: '10/10 human',
      message:
        'Would recommend. No notes. Five stars. Would definitely befriend again.',
      color: 'purple',
      rotation: -5,
    },
    {
      title: 'too cute, slightly chaotic',
      message:
        'The best combination honestly. Never change. Or do, but only if you want to.',
      color: 'green',
      rotation: 2,
    },
    {
      title: 'please remain this wonderful forever',
      message:
        'I\'m putting in a formal request. Noted and submitted to the universe.',
      color: 'wine',
      rotation: -3,
    },
  ] as Note[],

  // ---- WISHES (night sky stars) ----
  wishes: [
    {
      title: 'Happiness',
      message: 'The real kind. The kind that sneaks up on you on a random Tuesday.',
    },
    {
      title: 'Peace',
      message: 'Quiet moments where everything feels okay. You deserve lots of those.',
    },
    {
      title: 'Confidence',
      message: 'To know what everyone else already sees when they look at you.',
    },
    {
      title: 'Adventure',
      message: 'New places, new experiences, new stories to tell with that big smile.',
    },
    {
      title: 'Good people',
      message: 'The kind who show up, stay, and remind you that you matter.',
    },
    {
      title: 'Beautiful surprises',
      message: 'The kind that make you stop and think, "wow, life is actually good."',
    },
    {
      title: 'Success',
      message: 'In whatever form means the most to you. You\'re going to get there.',
    },
    {
      title: 'Laughter',
      message: 'The kind that makes your stomach hurt and your eyes water.',
    },
    {
      title: 'Unforgettable moments',
      message: 'The ones you\'ll think about years from now and still smile.',
    },
    {
      title: 'Dreams coming true',
      message: 'Every single one. Especially the ones you\'re afraid to say out loud.',
    },
  ] as Wish[],

  // ---- FUTURE MEMORIES (empty polaroids) ----
  futureMemories: [
    {
      scene: 'sunset',
      caption: 'this one is waiting for us ♡',
      clickMessage: 'This space is officially reserved for a sunset we haven\'t watched yet.',
      rotation: -3,
    },
    {
      scene: 'picnic',
      caption: 'future memory',
      clickMessage: 'Blankets on grass, too much food, zero complaints. Coming soon.',
      rotation: 4,
    },
    {
      scene: 'flowers',
      caption: 'we\'ll take this one someday',
      clickMessage: 'No idea where, no idea when. But flowers will be involved.',
      rotation: -2,
    },
    {
      scene: 'coffee',
      caption: 'reserved for a very good day ♡',
      clickMessage: 'A morning that starts slow and stays good the whole way through.',
      rotation: 5,
    },
    {
      scene: 'roadtrip',
      caption: 'coming soon ♡',
      clickMessage: 'Windows down, music too loud, no real destination. Can\'t wait.',
      rotation: -4,
    },
    {
      scene: 'adventure',
      caption: 'to be continued...',
      clickMessage: 'No idea where we\'ll be when this happens, but I\'m keeping a spot for it.',
      rotation: 2,
    },
    {
      scene: 'scenery',
      caption: 'photo pending...',
      clickMessage: 'We\'ll have to fill this one ourselves.',
      rotation: -5,
    },
    {
      scene: 'celebration',
      caption: 'one day. ♡',
      clickMessage: 'One day we\'ll look at this and say, "remember when this was just an empty frame?"',
      rotation: 3,
    },
  ] as FutureMemory[],

  // ---- BUCKET LIST ----
  bucketList: [
    { text: 'Take an unnecessarily large number of pictures' },
    { text: 'Have a completely chaotic day' },
    { text: 'Find somewhere ridiculously pretty' },
    { text: 'Get food and regret ordering too much' },
    { text: 'Take a terrible photo and keep it anyway' },
    { text: 'Watch the sunset' },
    { text: 'Make a memory worth putting in one of these Polaroids' },
    { text: 'Add approximately 700 more things to this list' },
  ] as BucketItem[],

  // ---- ENVELOPES ----
  envelopes: [
    {
      label: 'Open when you\'re happy ♡',
      message:
        'Your happiness is contagious. Keep it close, hold onto it, and let it spill onto everyone around you. You deserve every second of it.',
      color: 'pink',
    },
    {
      label: 'Open when you need a smile ♡',
      message:
        'Think about the version of you that just got told she\'s wonderful. Because she is. Because you are. Smile. It looks good on you.',
      color: 'purple',
    },
    {
      label: 'Open when you need a hug ♡',
      message:
        'Consider this a hug from across the screen. A big one. The kind where someone just holds on for an extra second because they mean it.',
      color: 'wine',
    },
    {
      label: 'Open when you\'re doubting yourself ♡',
      message:
        'Just a reminder that you\'re doing better than you think you are. Be gentle with yourself. You deserve kindness too.',
      color: 'blue',
    },
    {
      label: 'Open when you need a reminder ♡',
      message:
        'You are kind. You are wonderful. You are loved. You are enough. You always have been. You always will be.',
      color: 'green',
    },
  ] as Envelope[],

  // ---- PLAYLIST ----
  // Replace src paths with real songs in /public/music/
  playlist: [
    {
      title: 'My POV of you',
      artist: 'Hahahaha',
      // src: '/music/song-02.mp3',
      // src: '/src/music/My POV of you.mp3',
      src: song3,
    },
    {
      title: 'Company',
      artist: 'just for you',
      // src: '/src/music/Company.mp3',
      src: song2,
    },
    
    {
      title: 'one more',
      artist: 'always for you',
      // src: '/music/song-03.mp3',
      // src: '/src/music/agar tum kaho.mp3',
      src: song1,
    },
  ] as PlaylistSong[],

  // ---- SECRET STICKER MESSAGES ----
  secrets: [
    { id: 'heart1', label: 'tiny heart', message: 'you found me ♡' },
    { id: 'butterfly1', label: 'butterfly', message: 'pssst... Sushii is objectively very cute.' },
    { id: 'teddy1', label: 'teddy', message: 'classified birthday secret 🤫' },
    { id: 'sticker1', label: 'sticker', message: 'I knew you\'d click it.' },
    { id: 'star1', label: 'star', message: 'make a wish ✨' },
    { id: 'flower1', label: 'flower', message: 'flowers for the birthday girl 🌷' },
  ] as SecretMessage[],

  // ---- EASTER EGGS ----
  easterEggs: {
    heartClick5: 'okay you\'re definitely clicking everything.',
    teddyClick3: 'the teddy has officially adopted you.',
    flowerSecret: 'You found a secret flower 🌷',
    randomSticker: 'there was absolutely no reason for this to be clickable.',
  },
};

export type SushiiData = typeof sushiiData;
