import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { sushiiData } from '@/data/sushiiData';

export default function WishesSection() {
  const [activeWish, setActiveWish] = useState<number | null>(null);
  const [glowingStars, setGlowingStars] = useState<Set<number>>(new Set());

  const handleClick = (i: number) => {
    setActiveWish(i);
    setGlowingStars((prev) => new Set(prev).add(i));
  };

  return (
    <section
      className="relative py-20 px-4 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #0d1a40 0%, #152a63 30%, #330d5e 70%, #4a1685 100%)',
      }}
    >
      {/* Moon */}
      <div
        className="absolute top-10 right-10 w-20 h-20 rounded-full"
        style={{
          background: 'radial-gradient(circle at 30% 30%, #fff8ec 0%, #fde68a 60%, #f3d3a0 100%)',
          boxShadow: '0 0 40px 10px rgba(253, 230, 138, 0.3)',
        }}
      />

      {/* Clouds */}
      <div className="absolute top-20 left-10 text-4xl opacity-30 animate-drift">☁️</div>
      <div className="absolute top-40 right-1/4 text-3xl opacity-20 animate-drift" style={{ animationDelay: '3s' }}>
        ☁️
      </div>

      {/* Background stars */}
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className="absolute text-yellow-200 animate-twinkle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            fontSize: `${4 + Math.random() * 8}px`,
            animationDelay: `${Math.random() * 3}s`,
            opacity: 0.4,
          }}
        >
          ★
        </div>
      ))}

      <motion.div
        className="relative z-10 text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 60, damping: 12 }}
      >
        <h2 className="font-hand text-5xl md:text-6xl text-cream-100 mb-3 text-shadow-soft">
          Things I hope this year brings you ♡
        </h2>
        <p className="font-cute text-lg text-purple-200">
          tap a star to reveal a wish ✨
        </p>
      </motion.div>

      {/* Interactive stars */}
      <div className="relative z-10 max-w-3xl mx-auto flex flex-wrap justify-center gap-6 sm:gap-8 mb-8">
        {sushiiData.wishes.map((wish, i) => (
          <motion.button
            key={i}
            onClick={() => handleClick(i)}
            className="relative cursor-pointer"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 80, damping: 10, delay: i * 0.08 }}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.85 }}
            aria-label={`Wish: ${wish.title}`}
          >
            <span
              className="text-4xl sm:text-5xl"
              style={{
                filter: glowingStars.has(i)
                  ? `drop-shadow(0 0 12px #fde68a) drop-shadow(0 0 24px #ff9ec5)`
                  : 'drop-shadow(0 0 4px rgba(253,230,138,0.3))',
                color: glowingStars.has(i) ? '#fde68a' : '#fff8ec',
                transition: 'all 0.3s',
              }}
            >
              ★
            </span>
          </motion.button>
        ))}
      </div>

      {/* Wish reveal */}
      <AnimatePresence>
        {activeWish !== null && (
          <motion.div
            className="relative z-10 max-w-md mx-auto"
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 100, damping: 15 }}
          >
            <div className="bg-cream-50/95 p-6 rounded-sm shadow-2xl text-center">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-purple-200/70 rotate-2" />
              <h3 className="font-hand text-3xl text-wine-700 mb-3">
                {sushiiData.wishes[activeWish].title} ♡
              </h3>
              <p className="font-cute text-base text-purple-700">
                {sushiiData.wishes[activeWish].message}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Butterflies */}
      <div className="absolute bottom-10 left-10 text-3xl animate-drift opacity-60">🦋</div>
      <div className="absolute bottom-20 right-10 text-3xl animate-drift opacity-60" style={{ animationDelay: '2s' }}>
        🦋
      </div>
    </section>
  );
}
