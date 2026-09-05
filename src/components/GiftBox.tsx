import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface GiftBoxProps {
  onOpen: () => void;
}

export default function GiftBox({ onOpen }: GiftBoxProps) {
  const [opening, setOpening] = useState(false);
  const [opened, setOpened] = useState(false);
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number; vx: number; vy: number; color: string }[]>([]);
  const [flowers, setFlowers] = useState<{ id: number; x: number; y: number; vx: number; vy: number }[]>([]);
  const [stars, setStars] = useState<{ id: number; x: number; y: number }[]>([]);
  const [butterflies, setButterflies] = useState<{ id: number; x: number; y: number; vx: number; vy: number }[]>([]);
  const [teddyUp, setTeddyUp] = useState(false);

  const handleOpen = () => {
    setOpening(true);

    // Shake phase
    setTimeout(() => {
      // Lid opens
      setOpened(true);
      setTeddyUp(true);

      // Hearts explosion
      const newHearts: { id: number; x: number; y: number; vx: number; vy: number; color: string }[] = [];
      const heartColors = ['#f95a9c', '#e6407f', '#ff9ec5', '#c92e64', '#ff7ab3', '#b83d5c'];
      for (let i = 0; i < 25; i++) {
        const angle = (Math.PI * 2 * i) / 25;
        newHearts.push({
          id: Math.random(),
          x: 50,
          y: 50,
          vx: Math.cos(angle) * (3 + Math.random() * 5),
          vy: Math.sin(angle) * (3 + Math.random() * 5) - 2,
          color: heartColors[Math.floor(Math.random() * heartColors.length)],
        });
      }
      setHearts(newHearts);
      setTimeout(() => setHearts([]), 2500);

      // Flowers scatter
      const newFlowers: { id: number; x: number; y: number; vx: number; vy: number }[] = [];
      for (let i = 0; i < 12; i++) {
        const angle = (Math.PI * 2 * i) / 12;
        newFlowers.push({
          id: Math.random(),
          x: 50,
          y: 50,
          vx: Math.cos(angle) * (2 + Math.random() * 3),
          vy: Math.sin(angle) * (2 + Math.random() * 3) - 1,
        });
      }
      setFlowers(newFlowers);
      setTimeout(() => setFlowers([]), 2500);

      // Stars burst
      const newStars: { id: number; x: number; y: number }[] = [];
      for (let i = 0; i < 15; i++) {
        newStars.push({
          id: Math.random(),
          x: 20 + Math.random() * 60,
          y: 20 + Math.random() * 60,
        });
      }
      setStars(newStars);
      setTimeout(() => setStars([]), 2500);

      // Butterflies fly away
      const newButterflies: { id: number; x: number; y: number; vx: number; vy: number }[] = [];
      for (let i = 0; i < 6; i++) {
        newButterflies.push({
          id: Math.random(),
          x: 50,
          y: 50,
          vx: (Math.random() - 0.5) * 8,
          vy: -Math.random() * 6 - 2,
        });
      }
      setButterflies(newButterflies);
      setTimeout(() => setButterflies([]), 2500);

      // Transition to final message
      setTimeout(onOpen, 2500);
    }, 1200);
  };

  return (
    <section
      id="surprise"
      className="relative min-h-screen flex items-center justify-center py-20 px-4 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #fff5f8 0%, #faf5ff 50%, #330d5e 100%)' }}
    >
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 60, damping: 12 }}
      >
        <h2 className="font-hand text-5xl md:text-6xl text-wine-700 mb-3">
          okay... one last thing.
        </h2>
        <p className="font-cute text-lg text-purple-600">
          I saved the cutest part for the end.
        </p>
      </motion.div>

      {/* Gift box */}
      <div className="relative flex flex-col items-center">
        <motion.div
          animate={opening && !opened ? { rotate: [-2, 2, -2, 2, 0], x: [-3, 3, -3, 3, 0] } : {} }
          transition={opening && !opened ? { duration: 0.15, repeat: 5 } : {}}
          className="relative"
        >
          {/* Gift box SVG */}
          <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Box body */}
            <rect x="40" y="80" width="120" height="100" rx="4" fill="#ff9ec5" stroke="#e6407f" strokeWidth="3" />
            {/* Box pattern */}
            <circle cx="60" cy="100" r="3" fill="#fff8ec" opacity="0.6" />
            <circle cx="80" cy="130" r="3" fill="#fff8ec" opacity="0.6" />
            <circle cx="120" cy="110" r="3" fill="#fff8ec" opacity="0.6" />
            <circle cx="140" cy="150" r="3" fill="#fff8ec" opacity="0.6" />
            <circle cx="100" cy="160" r="3" fill="#fff8ec" opacity="0.6" />

            {/* Vertical ribbon */}
            <rect x="92" y="80" width="16" height="100" fill="#9a2a45" />
            {/* Horizontal ribbon */}
            <rect x="40" y="120" width="120" height="16" fill="#9a2a45" />

            {/* Lid */}
            <motion.g
              animate={opened ? { y: -60, rotate: -15, opacity: 0.8 } : { y: 0, rotate: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 100, damping: 15 }}
              style={{ transformOrigin: '100px 80px' }}
            >
              <rect x="30" y="60" width="140" height="25" rx="3" fill="#ff7ab3" stroke="#e6407f" strokeWidth="3" />
              <rect x="92" y="60" width="16" height="25" fill="#9a2a45" />
              {/* Bow */}
              <path d="M100,55 C85,35 70,40 75,55 C80,65 90,60 100,55 C110,60 120,65 125,55 C130,40 115,35 100,55 Z" fill="#9a4fff" stroke="#7c2fe0" strokeWidth="2" />
              <circle cx="100" cy="55" r="5" fill="#7c2fe0" />
              <path d="M100,55 Q95,50 90,48" stroke="#7c2fe0" strokeWidth="2" fill="none" />
              <path d="M100,55 Q105,50 110,48" stroke="#7c2fe0" strokeWidth="2" fill="none" />
            </motion.g>

            {/* Bright light from inside when opened */}
            {opened && (
              <motion.circle
                cx="100"
                cy="100"
                r="10"
                fill="#fff8ec"
                initial={{ opacity: 0, r: 5 }}
                animate={{ opacity: [0, 1, 0.8], r: 60 }}
                transition={{ duration: 0.8 }}
              />
            )}
          </svg>

          {/* Teddy popping up */}
          <AnimatePresence>
            {teddyUp && (
              <motion.div
                className="absolute left-1/2 -translate-x-1/2 text-5xl"
                style={{ top: '20%' }}
                initial={{ y: 40, opacity: 0, scale: 0.5 }}
                animate={{ y: -20, opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 100, damping: 12, delay: 0.3 }}
              >
                🧸
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Open button */}
        <AnimatePresence>
          {!opening && (
            <motion.button
              onClick={handleOpen}
              className="mt-8 px-10 py-4 font-hand text-2xl text-white bg-gradient-to-r from-pink-500 to-wine-500 rounded-full shadow-lg"
              initial={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.88 }}
            >
              OPEN YOUR PRESENT ♡
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Hearts explosion */}
      {hearts.map((h) => (
        <motion.div
          key={h.id}
          className="fixed text-3xl pointer-events-none z-[9500]"
          style={{ left: '50%', top: '50%', color: h.color }}
          initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
          animate={{
            opacity: 0,
            x: h.vx * 50,
            y: h.vy * 50,
            scale: 0.3,
            rotate: Math.random() * 360,
          }}
          transition={{ duration: 2, ease: 'easeOut' }}
        >
          ♡
        </motion.div>
      ))}

      {/* Flowers scatter */}
      {flowers.map((f) => (
        <motion.div
          key={f.id}
          className="fixed text-2xl pointer-events-none z-[9500]"
          style={{ left: '50%', top: '50%' }}
          initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
          animate={{
            opacity: 0,
            x: f.vx * 60,
            y: f.vy * 60,
            scale: 0.3,
            rotate: Math.random() * 360,
          }}
          transition={{ duration: 2, ease: 'easeOut' }}
        >
          {['🌸', '🌷', '🌹', '🌺'][Math.floor(Math.random() * 4)]}
        </motion.div>
      ))}

      {/* Stars burst */}
      {stars.map((s) => (
        <motion.div
          key={s.id}
          className="fixed text-2xl pointer-events-none z-[9500]"
          style={{ left: `${s.x}%`, top: `${s.y}%` }}
          initial={{ opacity: 0, scale: 0, rotate: 0 }}
          animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0], rotate: 180 }}
          transition={{ duration: 2, ease: 'easeOut' }}
        >
          <span style={{ color: '#fde68a' }}>★</span>
        </motion.div>
      ))}

      {/* Butterflies fly */}
      {butterflies.map((b) => (
        <motion.div
          key={b.id}
          className="fixed text-2xl pointer-events-none z-[9500]"
          style={{ left: '50%', top: '50%' }}
          initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
          animate={{
            opacity: 0,
            x: b.vx * 60,
            y: b.vy * 60,
            scale: 0.5,
            rotate: Math.random() * 360,
          }}
          transition={{ duration: 2, ease: 'easeOut' }}
        >
          🦋
        </motion.div>
      ))}
    </section>
  );
}
