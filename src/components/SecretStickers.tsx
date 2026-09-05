import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { sushiiData } from '@/data/sushiiData';

const stickerConfigs = [
  { id: 'heart1', emoji: '♡', className: 'text-pink-500 text-2xl', position: 'top-4 right-8', rotation: -10 },
  { id: 'butterfly1', emoji: '🦋', className: 'text-2xl', position: 'top-20 left-4', rotation: 15 },
  { id: 'teddy1', emoji: '🧸', className: 'text-2xl', position: 'bottom-20 right-12', rotation: -5 },
  { id: 'sticker1', emoji: '⭐', className: 'text-2xl', position: 'bottom-10 left-8', rotation: 8 },
  { id: 'star1', emoji: '✦', className: 'text-purple-400 text-xl', position: 'top-1/2 right-4', rotation: 0 },
  { id: 'flower1', emoji: '🌸', className: 'text-2xl', position: 'top-32 right-1/4', rotation: -8 },
];

export default function SecretStickers() {
  const [revealed, setRevealed] = useState<string | null>(null);
  const [heartClicks, setHeartClicks] = useState(0);
  const [heartMessage, setHeartMessage] = useState<string | null>(null);

  const handleStickerClick = (id: string) => {
    if (id === 'heart1') {
      const newCount = heartClicks + 1;
      setHeartClicks(newCount);
      if (newCount >= 5) {
        setHeartMessage(sushiiData.easterEggs.heartClick5);
        setTimeout(() => setHeartMessage(null), 3000);
        setHeartClicks(0);
        return;
      }
    }
    const secret = sushiiData.secrets.find((s) => s.id === id);
    if (secret) {
      setRevealed(secret.message);
      setTimeout(() => setRevealed(null), 2500);
    }
  };

  return (
    <>
      {/* These stickers are positioned absolutely within their parent sections */}
      {/* Rendered as fixed-position hidden secrets across the page */}
      <div className="fixed inset-0 pointer-events-none z-40">
        {stickerConfigs.map((sticker) => (
          <button
            key={sticker.id}
            onClick={() => handleStickerClick(sticker.id)}
            className={`absolute pointer-events-auto cursor-pointer hover:scale-125 transition-transform ${sticker.className}`}
            style={{
              [sticker.position.split(' ')[0] as string]: sticker.position.split(' ')[1],
              [sticker.position.split(' ')[2] as string]: sticker.position.split(' ')[3],
              rotate: `${sticker.rotation}deg`,
            }}
            aria-label={sticker.id}
          >
            {sticker.emoji}
          </button>
        ))}
      </div>

      {/* Secret message popup */}
      <AnimatePresence>
        {revealed && (
          <motion.div
            className="fixed bottom-20 left-1/2 -translate-x-1/2 z-[9600] bg-cream-50 px-6 py-3 shadow-2xl rounded-sm border-2 border-pink-200"
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          >
            <p className="font-hand text-xl text-wine-600 text-center whitespace-nowrap">
              {revealed}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Heart easter egg */}
      <AnimatePresence>
        {heartMessage && (
          <motion.div
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[9700] bg-cream-50 px-8 py-4 shadow-2xl rounded-sm border-2 border-pink-300"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          >
            <p className="font-hand text-2xl text-wine-600 text-center">
              {heartMessage}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
