import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback } from 'react';
import { sushiiData } from '@/data/sushiiData';

export default function TeddyInteraction() {
  const [hugCount, setHugCount] = useState(0);
  const [squeezing, setSqueezing] = useState(false);
  const [blink, setBlink] = useState(false);
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number; vx: number; vy: number }[]>([]);

  const handleHug = useCallback(() => {
    setSqueezing(true);
    setBlink(true);
    setHugCount((prev) => prev + 1);

    // Spawn hearts
    const newHearts: { id: number; x: number; y: number; vx: number; vy: number }[] = [];
    for (let i = 0; i < 15; i++) {
      newHearts.push({
        id: Math.random(),
        x: 50,
        y: 50,
        vx: (Math.random() - 0.5) * 8,
        vy: -Math.random() * 6 - 2,
      });
    }
    setHearts(newHearts);
    setTimeout(() => setHearts([]), 2000);

    setTimeout(() => setSqueezing(false), 400);
    setTimeout(() => setBlink(false), 200);
  }, []);

  // Easter egg: 3 clicks
  const easterEgg = hugCount >= 3;

  return (
    <div className="relative flex flex-col items-center">
      <motion.button
        onClick={handleHug}
        className="relative cursor-pointer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Teddy bear hug"
      >
        <motion.div
          animate={squeezing ? { scale: 0.9 } : { scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 15 }}
          className="relative"
        >
          <svg width="120" height="130" viewBox="0 0 120 130" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Ears */}
            <circle cx="25" cy="25" r="15" fill="#a05a2c" stroke="#7a4018" strokeWidth="2" />
            <circle cx="95" cy="25" r="15" fill="#a05a2c" stroke="#7a4018" strokeWidth="2" />
            <circle cx="25" cy="25" r="8" fill="#d4a574" />
            <circle cx="95" cy="25" r="8" fill="#d4a574" />
            {/* Head */}
            <circle cx="60" cy="40" r="28" fill="#a05a2c" stroke="#7a4018" strokeWidth="2" />
            {/* Snout */}
            <ellipse cx="60" cy="48" rx="14" ry="11" fill="#d4a574" />
            {/* Nose */}
            <ellipse cx="60" cy="45" rx="4" ry="3" fill="#3a2010" />
            {/* Eyes */}
            <circle cx="50" cy="38" r="3" fill="#3a2010" />
            <circle cx="70" cy="38" r="3" fill="#3a2010" />
            {blink && (
              <>
                <rect x="47" y="36" width="6" height="1" fill="#3a2010" />
                <rect x="67" y="36" width="6" height="1" fill="#3a2010" />
              </>
            )}
            {/* Body */}
            <ellipse cx="60" cy="90" rx="30" ry="32" fill="#a05a2c" stroke="#7a4018" strokeWidth="2" />
            {/* Arms */}
            <ellipse cx="28" cy="85" rx="10" ry="18" fill="#a05a2c" stroke="#7a4018" strokeWidth="2" transform="rotate(-20 28 85)" />
            <ellipse cx="92" cy="85" rx="10" ry="18" fill="#a05a2c" stroke="#7a4018" strokeWidth="2" transform="rotate(20 92 85)" />
            {/* Heart in arms */}
            <motion.g
              animate={squeezing ? { scale: 1.3 } : { scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              style={{ transformOrigin: '60px 85px' }}
            >
              <path
                d="M60,95 C50,80 35,75 35,65 C35,58 40,53 47,53 C53,53 57,57 60,62 C63,57 67,53 73,53 C80,53 85,58 85,65 C85,75 70,80 60,95 Z"
                fill="#f95a9c"
                stroke="#e6407f"
                strokeWidth="2"
              />
              <text x="60" y="70" textAnchor="middle" fontSize="9" fill="#fff" fontFamily="cursive" fontWeight="bold">
                for Sushii
              </text>
            </motion.g>
            {/* Feet */}
            <ellipse cx="42" cy="118" rx="10" ry="7" fill="#a05a2c" stroke="#7a4018" strokeWidth="2" />
            <ellipse cx="78" cy="118" rx="10" ry="7" fill="#a05a2c" stroke="#7a4018" strokeWidth="2" />
          </svg>
        </motion.div>
      </motion.button>

      <p className="font-hand text-lg text-wine-600 mt-1 text-center">
        {easterEgg ? sushiiData.easterEggs.teddyClick3 : 'sending you a giant birthday hug ♡'}
      </p>

      <motion.button
        onClick={handleHug}
        className="mt-3 px-6 py-2 font-hand text-xl text-white bg-gradient-to-r from-pink-500 to-wine-500 rounded-full shadow-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
      >
        ONE MORE HUG?
      </motion.button>

      {/* Floating hearts */}
      <AnimatePresence>
        {hearts.map((h) => (
          <motion.div
            key={h.id}
            className="absolute text-2xl pointer-events-none"
            style={{ left: '50%', top: '50%', color: ['#f95a9c', '#e6407f', '#ff9ec5'][Math.floor(Math.random() * 3)] }}
            initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            animate={{
              opacity: 0,
              x: h.vx * 30,
              y: h.vy * 30,
              scale: 0.3,
              rotate: Math.random() * 360,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          >
            ♡
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Sparkles */}
      {squeezing &&
        [...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-lg pointer-events-none"
            style={{ left: `${30 + i * 10}%`, top: '20%' }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0], rotate: 180 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <span style={{ color: '#fde68a' }}>✦</span>
          </motion.div>
        ))}
    </div>
  );
}
