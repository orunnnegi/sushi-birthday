import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function FinalInteraction() {
  const [active, setActive] = useState(false);
  const [showFinal, setShowFinal] = useState(false);
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number; vx: number; vy: number; color: string }[]>([]);
  const [flowers, setFlowers] = useState<{ id: number; x: number; y: number }[]>([]);
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number }[]>([]);
  const [butterflies, setButterflies] = useState<{ id: number; x: number; y: number; vx: number; vy: number }[]>([]);
  const [notes, setNotes] = useState<{ id: number; x: number; y: number; text: string; rotate: number }[]>([]);
  const [teddy, setTeddy] = useState(false);

  const noteTexts = ['♡', 'happy birthday!', 'you\'re wonderful', 'keep shining', 'stay cute', '♡ ♡ ♡'];

  const handleHug = () => {
    setActive(true);
    setTeddy(true);

    // Hearts fill screen
    const newHearts: { id: number; x: number; y: number; vx: number; vy: number; color: string }[] = [];
    const heartColors = ['#f95a9c', '#e6407f', '#ff9ec5', '#c92e64', '#ff7ab3', '#b83d5c'];
    for (let i = 0; i < 30; i++) {
      newHearts.push({
        id: Math.random(),
        x: 50 + (Math.random() - 0.5) * 80,
        y: 50 + (Math.random() - 0.5) * 80,
        vx: (Math.random() - 0.5) * 6,
        vy: -Math.random() * 5 - 1,
        color: heartColors[Math.floor(Math.random() * heartColors.length)],
      });
    }
    setHearts(newHearts);

    // Flowers bloom
    const newFlowers: { id: number; x: number; y: number }[] = [];
    for (let i = 0; i < 15; i++) {
      newFlowers.push({
        id: Math.random(),
        x: Math.random() * 100,
        y: Math.random() * 100,
      });
    }
    setFlowers(newFlowers);

    // Sparkles
    const newSparkles: { id: number; x: number; y: number }[] = [];
    for (let i = 0; i < 20; i++) {
      newSparkles.push({
        id: Math.random(),
        x: Math.random() * 100,
        y: Math.random() * 100,
      });
    }
    setSparkles(newSparkles);

    // Butterflies
    const newButterflies: { id: number; x: number; y: number; vx: number; vy: number }[] = [];
    for (let i = 0; i < 8; i++) {
      newButterflies.push({
        id: Math.random(),
        x: 50,
        y: 50,
        vx: (Math.random() - 0.5) * 10,
        vy: -Math.random() * 8 - 2,
      });
    }
    setButterflies(newButterflies);

    // Floating notes
    const newNotes: { id: number; x: number; y: number; text: string; rotate: number }[] = [];
    for (let i = 0; i < 8; i++) {
      newNotes.push({
        id: Math.random(),
        x: 10 + Math.random() * 80,
        y: 60 + Math.random() * 30,
        text: noteTexts[Math.floor(Math.random() * noteTexts.length)],
        rotate: (Math.random() - 0.5) * 30,
      });
    }
    setNotes(newNotes);

    // Show "okay fine. one more."
    setTimeout(() => setShowFinal(true), 1500);

    // Show final birthday message
    setTimeout(() => {
      setShowFinal(false);
    }, 4000);

    // Clear everything
    setTimeout(() => {
      setHearts([]);
      setFlowers([]);
      setSparkles([]);
      setButterflies([]);
      setNotes([]);
      setTeddy(false);
      setActive(false);
    }, 5000);
  };

  return (
    <section
      className="relative min-h-[60vh] flex items-center justify-center py-20 px-4 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #420f19 0%, #7c1f33 50%, #c92e64 100%)' }}
    >
      <div className="relative z-10 text-center">
        <AnimatePresence>
          {!active && (
            <motion.button
              onClick={handleHug}
              className="px-10 py-5 font-hand text-3xl text-white bg-gradient-to-r from-pink-500 via-wine-500 to-purple-500 rounded-full shadow-2xl"
              initial={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.88 }}
            >
              ONE MORE HUG? ♡
            </motion.button>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {teddy && (
            <motion.div
              className="text-6xl mt-4"
              initial={{ scale: 0, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0, y: 40 }}
              transition={{ type: 'spring', stiffness: 100, damping: 12 }}
            >
              🧸
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showFinal && (
            <motion.p
              className="font-hand text-3xl text-cream-100 mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: 'spring', stiffness: 100, damping: 12 }}
            >
              Okay fine. One more. ♡
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Hearts */}
      {hearts.map((h) => (
        <motion.div
          key={h.id}
          className="fixed text-3xl pointer-events-none z-[9500]"
          style={{ left: `${h.x}%`, top: `${h.y}%`, color: h.color }}
          initial={{ opacity: 1, y: 0, scale: 1 }}
          animate={{ opacity: 0, y: -120, scale: 0.3, rotate: Math.random() * 360 }}
          transition={{ duration: 3, ease: 'easeOut' }}
        >
          ♡
        </motion.div>
      ))}

      {/* Flowers */}
      {flowers.map((f) => (
        <motion.div
          key={f.id}
          className="fixed text-2xl pointer-events-none z-[9500]"
          style={{ left: `${f.x}%`, top: `${f.y}%` }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0], rotate: 180 }}
          transition={{ duration: 3, ease: 'easeOut' }}
        >
          {['🌸', '🌷', '🌹', '🌺'][Math.floor(Math.random() * 4)]}
        </motion.div>
      ))}

      {/* Sparkles */}
      {sparkles.map((s) => (
        <motion.div
          key={s.id}
          className="fixed text-xl pointer-events-none z-[9500]"
          style={{ left: `${s.x}%`, top: `${s.y}%` }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0], rotate: 180 }}
          transition={{ duration: 2.5, ease: 'easeOut' }}
        >
          <span style={{ color: '#fde68a' }}>✦</span>
        </motion.div>
      ))}

      {/* Butterflies */}
      {butterflies.map((b) => (
        <motion.div
          key={b.id}
          className="fixed text-2xl pointer-events-none z-[9500]"
          style={{ left: `${b.x}%`, top: `${b.y}%` }}
          initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
          animate={{ opacity: 0, x: b.vx * 50, y: b.vy * 50, scale: 0.5, rotate: Math.random() * 360 }}
          transition={{ duration: 3, ease: 'easeOut' }}
        >
          🦋
        </motion.div>
      ))}

      {/* Floating notes */}
      {notes.map((n) => (
        <motion.div
          key={n.id}
          className="fixed bg-cream-50 px-3 py-1 shadow-lg pointer-events-none z-[9500]"
          style={{ left: `${n.x}%`, top: `${n.y}%`, rotate: `${n.rotate}deg` }}
          initial={{ opacity: 0, y: 0, scale: 0.5 }}
          animate={{ opacity: [0, 1, 0], y: -100, scale: 1 }}
          transition={{ duration: 3, ease: 'easeOut' }}
        >
          <span className="font-hand text-sm text-wine-600">{n.text}</span>
        </motion.div>
      ))}

      {/* Final message */}
      <AnimatePresence>
        {!showFinal && active && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 2.5, duration: 0.8 }}
          >
            <h2 className="font-hand text-4xl md:text-5xl text-cream-100 text-center text-shadow-soft">
              Happy Birthday, Sushii 🌷
            </h2>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
