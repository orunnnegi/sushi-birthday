import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface FinalMessageProps {
  visible: boolean;
}

export default function FinalMessage({ visible }: FinalMessageProps) {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center py-20 px-4 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #330d5e 0%, #152a63 30%, #0d1a40 60%, #420f19 100%)',
      }}
    >
      {/* Stars */}
      {[...Array(25)].map((_, i) => (
        <div
          key={i}
          className="absolute text-yellow-200 animate-twinkle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            fontSize: `${4 + Math.random() * 8}px`,
            animationDelay: `${Math.random() * 3}s`,
            opacity: 0.5,
          }}
        >
          ★
        </div>
      ))}

      {/* Moon */}
      <div
        className="absolute top-10 right-10 w-16 h-16 rounded-full"
        style={{
          background: 'radial-gradient(circle at 30% 30%, #fff8ec 0%, #fde68a 60%, #f3d3a0 100%)',
          boxShadow: '0 0 30px 8px rgba(253, 230, 138, 0.2)',
        }}
      />

      {/* Clouds */}
      <div className="absolute top-20 left-10 text-3xl opacity-20 animate-drift">☁️</div>
      <div className="absolute bottom-20 right-10 text-3xl opacity-20 animate-drift" style={{ animationDelay: '3s' }}>
        ☁️
      </div>

      {/* Fairy lights */}
      <div className="absolute top-0 left-0 right-0 h-20 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full animate-flicker"
            style={{
              left: `${(i / 12) * 100}%`,
              top: `${10 + Math.sin(i * 0.5) * 10}px`,
              background: ['#fde68a', '#ff9ec5', '#c899ff'][i % 3],
              boxShadow: `0 0 6px 2px ${['#fde68a', '#ff9ec5', '#c899ff'][i % 3]}`,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}
      </div>

      {/* Flowers and vines */}
      <div className="absolute top-10 left-4 text-3xl opacity-40 animate-sway">🌿</div>
      <div className="absolute bottom-10 right-4 text-3xl opacity-40 animate-sway" style={{ animationDelay: '1s' }}>
        🌿
      </div>
      <div className="absolute top-1/3 left-8 text-2xl opacity-30">🌸</div>
      <div className="absolute bottom-1/3 right-8 text-2xl opacity-30">🌷</div>

      <AnimatePresence>
        {visible && (
          <motion.div
            className="relative z-10 max-w-2xl"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 50, damping: 12, delay: 0.3 }}
          >
            <div
              className="relative bg-cream-50 px-6 py-12 sm:px-12 sm:py-16 shadow-2xl"
              style={{
                clipPath:
                  'polygon(2% 0%, 98% 2%, 100% 8%, 97% 15%, 100% 25%, 96% 35%, 99% 50%, 95% 65%, 98% 75%, 96% 85%, 100% 95%, 97% 100%, 3% 98%, 0% 92%, 2% 82%, 0% 70%, 3% 60%, 0% 50%, 2% 40%, 0% 30%, 3% 20%, 0% 10%)',
              }}
            >
              {/* Tape */}
              <div className="absolute -top-3 left-8 w-16 h-5 bg-pink-200/60 rotate-[-8deg]" />
              <div className="absolute -top-3 right-8 w-16 h-5 bg-purple-200/60 rotate-[8deg]" />

              <motion.h2
                className="font-hand text-4xl sm:text-5xl md:text-6xl text-wine-700 mb-6 text-center text-shadow-soft"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 80, damping: 12, delay: 0.6 }}
              >
                Happy Birthday, Sushii ♡
              </motion.h2>

              <div className="space-y-4 text-center">
                <motion.p
                  className="font-cute text-base sm:text-lg text-purple-700 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.6 }}
                >
                  I hope this year gives you more reasons to smile, more moments that make your heart happy, more adventures than you expect, and more people who remind you how wonderful you are.
                </motion.p>

                <motion.p
                  className="font-cute text-base sm:text-lg text-wine-600 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5, duration: 0.6 }}
                >
                  I hope you never forget how special you are, even on the days when you don't feel it yourself.
                </motion.p>

                <motion.p
                  className="font-cute text-base sm:text-lg text-pink-600 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2, duration: 0.6 }}
                >
                  Keep being your wonderfully chaotic, kind, beautiful, funny, completely-you self.
                </motion.p>

                <motion.p
                  className="font-cute text-base sm:text-lg text-purple-700 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.5, duration: 0.6 }}
                >
                  You deserve all the good things coming your way.
                </motion.p>

                <motion.h3
                  className="font-hand text-3xl sm:text-4xl text-wine-700 pt-4"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 80, damping: 12, delay: 3 }}
                >
                  Happy Birthday, Sushii. ♡
                </motion.h3>

                <motion.p
                  className="font-cute text-base text-purple-600"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 3.5, duration: 0.6 }}
                >
                  And here's to all the memories we haven't made yet.
                </motion.p>

                <motion.p
                  className="font-hand text-2xl sm:text-3xl text-wine-600"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 80, damping: 12, delay: 4 }}
                >
                  We'll create them together. ♡
                </motion.p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
