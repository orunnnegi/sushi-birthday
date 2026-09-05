import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function BirthdayCake() {
  const [blown, setBlown] = useState(false);
  const [smoke, setSmoke] = useState<{ id: number; x: number }[]>([]);
  const [hearts, setHearts] = useState<{ id: number; x: number }[]>([]);
  const [stars, setStars] = useState<{ id: number; x: number }[]>([]);

  const handleClick = () => {
    if (!blown) {
      setBlown(true);
      // Smoke
      const newSmoke = [...Array(5)].map((_, i) => ({
        id: Math.random(),
        x: 20 + i * 15,
      }));
      setSmoke(newSmoke);
      setTimeout(() => setSmoke([]), 3000);

      // Hearts
      const newHearts = [...Array(8)].map((_, i) => ({
        id: Math.random(),
        x: 10 + i * 10,
      }));
      setHearts(newHearts);
      setTimeout(() => setHearts([]), 2500);

      // Stars
      const newStars = [...Array(6)].map((_, i) => ({
        id: Math.random(),
        x: 15 + i * 12,
      }));
      setStars(newStars);
      setTimeout(() => setStars([]), 2500);
    } else {
      // Reset
      setBlown(false);
    }
  };

  return (
    <div className="relative flex flex-col items-center">
      <motion.button
        onClick={handleClick}
        className="relative cursor-pointer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Birthday cake"
      >
        <svg width="120" height="130" viewBox="0 0 120 130" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Plate */}
          <ellipse cx="60" cy="125" rx="50" ry="5" fill="#d4a574" opacity="0.5" />

          {/* Bottom layer */}
          <rect x="15" y="80" width="90" height="40" rx="4" fill="#f95a9c" stroke="#e6407f" strokeWidth="2" />
          {/* Frosting drips */}
          <path d="M15,82 Q20,90 25,82 Q30,92 35,82 Q40,90 45,82 Q50,92 55,82 Q60,90 65,82 Q70,92 75,82 Q80,90 85,82 Q90,92 95,82 Q100,90 105,82" stroke="#fff8ec" strokeWidth="3" fill="none" />

          {/* Middle layer */}
          <rect x="25" y="55" width="70" height="28" rx="3" fill="#fff8ec" stroke="#f3d3a0" strokeWidth="2" />
          <path d="M25,57 Q30,65 35,57 Q40,67 45,57 Q50,65 55,57 Q60,67 65,57 Q70,65 75,57 Q80,67 85,57 Q90,65 95,57" stroke="#ff9ec5" strokeWidth="2.5" fill="none" />

          {/* Top layer */}
          <rect x="35" y="35" width="50" height="22" rx="3" fill="#c899ff" stroke="#9a4fff" strokeWidth="2" />
          <path d="M35,37 Q40,45 45,37 Q50,47 55,37 Q60,45 65,37 Q70,47 75,37 Q80,45 85,37" stroke="#fff8ec" strokeWidth="2" fill="none" />

          {/* Candles */}
          {[40, 55, 70].map((cx, i) => (
            <g key={i}>
              <rect x={cx - 2} y={15} width={4} height={22} fill="#fff8ec" stroke="#f3d3a0" strokeWidth="1" />
              {/* Flame */}
              {!blown && (
                <g className="animate-flicker" style={{ animationDelay: `${i * 0.3}s` }}>
                  <ellipse cx={cx} cy={10} rx={3} ry={6} fill="#fde68a" />
                  <ellipse cx={cx} cy={8} rx={2} ry={4} fill="#fbbf24" />
                  <ellipse cx={cx} cy={7} rx={1} ry={2} fill="#fff8ec" />
                </g>
              )}
              {/* Smoke when blown */}
              {blown && (
                <g>
                  <circle cx={cx} cy={10} r={2} fill="#ccc" opacity="0.5" />
                </g>
              )}
            </g>
          ))}

          {/* Decorations */}
          <circle cx="30" cy="95" r="2" fill="#fff8ec" />
          <circle cx="60" cy="100" r="2" fill="#fff8ec" />
          <circle cx="90" cy="95" r="2" fill="#fff8ec" />
          <circle cx="45" cy="68" r="1.5" fill="#f95a9c" />
          <circle cx="75" cy="68" r="1.5" fill="#f95a9c" />
        </svg>
      </motion.button>

      <p className="font-hand text-lg text-wine-600 mt-1 text-center">
        {blown ? 'make a wish, birthday girl ♡' : 'click to blow out the candles ♡'}
      </p>

      {/* Smoke */}
      <AnimatePresence>
        {smoke.map((s) => (
          <motion.div
            key={s.id}
            className="absolute text-2xl pointer-events-none"
            style={{ left: `${s.x}%`, top: '30%' }}
            initial={{ opacity: 0.5, y: 0, scale: 0.5 }}
            animate={{ opacity: 0, y: -80, scale: 1.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.5, ease: 'easeOut' }}
          >
            💨
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Hearts */}
      <AnimatePresence>
        {hearts.map((h) => (
          <motion.div
            key={h.id}
            className="absolute text-xl pointer-events-none"
            style={{ left: `${h.x}%`, bottom: '40%' }}
            initial={{ opacity: 1, y: 0, scale: 1 }}
            animate={{ opacity: 0, y: -100, scale: 0.3, rotate: Math.random() * 360 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: 'easeOut' }}
          >
            <span style={{ color: '#f95a9c' }}>♡</span>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Stars */}
      <AnimatePresence>
        {stars.map((s) => (
          <motion.div
            key={s.id}
            className="absolute text-lg pointer-events-none"
            style={{ left: `${s.x}%`, top: '20%' }}
            initial={{ opacity: 0, scale: 0, rotate: 0 }}
            animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0], rotate: 180 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: 'easeOut' }}
          >
            <span style={{ color: '#fde68a' }}>★</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
