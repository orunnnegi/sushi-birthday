import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { sushiiData, type FutureMemory } from '@/data/sushiiData';

const sceneEmojis: Record<string, string> = {
  sunset: '🌅',
  picnic: '🧺',
  flowers: '🌷',
  coffee: '☕',
  roadtrip: '🚗',
  adventure: '🗺️',
  scenery: '🏔️',
  celebration: '🎉',
};

function FuturePolaroid({ memory, index }: { memory: FutureMemory; index: number }) {
  const [open, setOpen] = useState(false);
  const [flash, setFlash] = useState(false);

  const handleClick = () => {
    setFlash(true);
    setTimeout(() => setFlash(false), 200);
    setTimeout(() => setOpen(true), 150);
  };

  return (
    <>
      <motion.div
        className="relative cursor-pointer bg-white p-3 pb-12 shadow-lg hover:shadow-2xl transition-shadow"
        initial={{ opacity: 0, y: 50, rotate: memory.rotation * 2 }}
        whileInView={{ opacity: 1, y: 0, rotate: memory.rotation }}
        viewport={{ once: true, margin: '-30px' }}
        transition={{ type: 'spring', stiffness: 70, damping: 12, delay: index * 0.08 }}
        whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleClick}
      >
        {/* Tape */}
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-12 h-4 bg-purple-200/60 rotate-2" />

        {/* Empty frame with illustrated placeholder */}
        <div className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 bg-cream-100 border-2 border-dashed border-pink-300 flex items-center justify-center relative overflow-hidden">
          <span className="text-5xl opacity-50">{sceneEmojis[memory.scene] || '📷'}</span>
          {/* Dashed border corner accents */}
          <div className="absolute top-1 left-1 text-xs text-pink-300">✧</div>
          <div className="absolute top-1 right-1 text-xs text-pink-300">✧</div>
          <div className="absolute bottom-1 left-1 text-xs text-pink-300">✧</div>
          <div className="absolute bottom-1 right-1 text-xs text-pink-300">✧</div>
        </div>

        <p className="absolute bottom-2 left-0 right-0 text-center font-hand text-lg text-wine-600">
          {memory.caption}
        </p>

        {/* Flash overlay */}
        {flash && (
          <motion.div
            className="absolute inset-0 bg-white"
            initial={{ opacity: 0.9 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[9000] flex items-center justify-center p-4"
            style={{ background: 'rgba(50,20,40,0.6)', backdropFilter: 'blur(4px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              className="relative bg-white p-6 pb-16 shadow-2xl max-w-sm"
              initial={{ scale: 0.3, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.3, y: 50, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-purple-200/70 rotate-2" />
              <div className="w-56 h-56 bg-cream-100 border-2 border-dashed border-pink-300 flex items-center justify-center">
                <span className="text-7xl opacity-50">{sceneEmojis[memory.scene] || '📷'}</span>
              </div>
              <p className="absolute bottom-3 left-0 right-0 text-center font-hand text-xl text-wine-600">
                {memory.clickMessage}
              </p>
              {/* Hearts */}
              {[...Array(6)].map((_, j) => (
                <motion.div
                  key={j}
                  className="absolute text-xl pointer-events-none"
                  style={{ left: '50%', top: '50%', color: '#f95a9c' }}
                  initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                  animate={{
                    opacity: 0,
                    x: (Math.random() - 0.5) * 120,
                    y: (Math.random() - 0.5) * 120 - 30,
                    scale: 0.3,
                    rotate: Math.random() * 360,
                  }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                >
                  ♡
                </motion.div>
              ))}
              <button
                onClick={() => setOpen(false)}
                className="absolute -top-3 -right-3 w-8 h-8 bg-wine-600 text-white rounded-full flex items-center justify-center shadow-lg text-sm"
                aria-label="Close"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function FutureMemoriesSection() {
  return (
    <section
      id="future"
      className="relative py-20 px-4 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #fff8ec 0%, #faf5ff 50%, #fff5f8 100%)' }}
    >
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 60, damping: 12 }}
      >
        <h2 className="font-hand text-5xl md:text-6xl text-wine-700 mb-3">
          Pictures we haven't taken yet ♡
        </h2>
        <p className="font-cute text-lg text-purple-600 mb-2">
          We don't have these pictures yet...
        </p>
        <motion.p
          className="font-hand text-3xl md:text-4xl text-wine-600"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 80, damping: 12, delay: 0.3 }}
        >
          We'll create these together. ♡
        </motion.p>
        <p className="font-cute text-base text-pink-500 mt-3">
          Some of the best memories haven't happened yet.
        </p>
      </motion.div>

      {/* Empty Polaroids */}
      <div className="max-w-4xl mx-auto mb-16">
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
          {sushiiData.futureMemories.map((mem, i) => (
            <FuturePolaroid key={i} memory={mem} index={i} />
          ))}
        </div>
      </div>

      {/* TO BE FILLED page */}
      <motion.div
        className="relative max-w-3xl mx-auto bg-cream-100/80 p-8 sm:p-12 shadow-inner"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 60, damping: 12 }}
      >
        {/* Blank photo corners */}
        <div className="absolute top-4 left-4 w-12 h-12 border-l-2 border-t-2 border-dashed border-pink-300" />
        <div className="absolute top-4 right-4 w-12 h-12 border-r-2 border-t-2 border-dashed border-pink-300" />
        <div className="absolute bottom-4 left-4 w-12 h-12 border-l-2 border-b-2 border-dashed border-pink-300" />
        <div className="absolute bottom-4 right-4 w-12 h-12 border-r-2 border-b-2 border-dashed border-pink-300" />

        {/* Empty frames */}
        <div className="flex justify-center gap-4 mb-6">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-20 h-24 sm:w-24 sm:h-28 border-2 border-dashed border-purple-300 bg-cream-50/50 flex items-center justify-center"
              style={{ rotate: `${i % 2 === 0 ? -3 : 3}deg` }}
            >
              <span className="text-2xl opacity-30">📷</span>
            </div>
          ))}
        </div>

        {/* Camera doodles and decorations */}
        <div className="absolute top-8 right-12 text-2xl opacity-40">✏️</div>
        <div className="absolute bottom-12 left-8 text-xl opacity-40">♡</div>
        <div className="absolute top-12 left-1/4 text-lg opacity-30">✦</div>

        <div className="text-center">
          <h3 className="font-hand text-4xl md:text-5xl text-wine-700 mb-3">
            TO BE FILLED ♡
          </h3>
          <p className="font-cute text-base text-purple-600 mb-6">
            Some of the best parts haven't happened yet.
          </p>
          <motion.p
            className="font-hand text-3xl md:text-4xl text-wine-600"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 80, damping: 12, delay: 0.5 }}
          >
            We'll create these together.
          </motion.p>
        </div>

        {/* Handwritten arrows */}
        <div className="text-center mt-6 text-3xl text-pink-400 animate-wiggle">↓</div>
      </motion.div>

      {/* Decorative flowers */}
      <div className="absolute top-10 left-4 text-3xl animate-sway opacity-50">🌸</div>
      <div className="absolute top-20 right-4 text-3xl animate-sway opacity-50" style={{ animationDelay: '1s' }}>
        🌷
      </div>
    </section>
  );
}
