import { motion } from 'framer-motion';
import { useState } from 'react';
import { sushiiData, type Note } from '@/data/sushiiData';

const colorMap: Record<string, { bg: string; text: string; border: string }> = {
  pink: { bg: 'bg-pink-100', text: 'text-wine-700', border: 'border-pink-300' },
  purple: { bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-300' },
  green: { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-300' },
  wine: { bg: 'bg-wine-100', text: 'text-wine-700', border: 'border-wine-300' },
  blue: { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-300' },
};

export default function NotesSection() {
  const [flipped, setFlipped] = useState<Set<number>>(new Set());
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>([]);

  const handleClick = (note: Note, i: number, e: React.MouseEvent) => {
    const newFlipped = new Set(flipped);
    if (newFlipped.has(i)) {
      newFlipped.delete(i);
    } else {
      newFlipped.add(i);
      // Spawn hearts
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      const newHearts: { id: number; x: number; y: number }[] = [];
      for (let j = 0; j < 6; j++) {
        newHearts.push({
          id: Math.random(),
          x: rect.left + rect.width / 2 + (Math.random() - 0.5) * 60,
          y: rect.top + rect.height / 2,
        });
      }
      setHearts((prev) => [...prev, ...newHearts]);
      setTimeout(() => {
        setHearts((prev) => prev.filter((h) => !newHearts.find((nh) => nh.id === h.id)));
      }, 1500);
    }
    setFlipped(newFlipped);
  };

  return (
    <section
      id="notes"
      className="relative py-20 px-4 scrapbook-paper"
      style={{ background: 'linear-gradient(180deg, #faf5ff 0%, #fff5f8 100%)' }}
    >
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 60, damping: 12 }}
      >
        <h2 className="font-hand text-5xl md:text-6xl text-wine-700 mb-3">
          A little something for you ♡
        </h2>
        <p className="font-cute text-lg text-purple-600 max-w-md mx-auto">
          Because you're the kind of person who deserves more than a boring birthday paragraph.
        </p>
      </motion.div>

      <div className="relative max-w-4xl mx-auto">
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
          {sushiiData.notes.map((note, i) => {
            const colors = colorMap[note.color] || colorMap.pink;
            const isFlipped = flipped.has(i);
            return (
              <motion.div
                key={i}
                className="perspective-1000 cursor-pointer"
                initial={{ opacity: 0, y: 40, rotate: note.rotation }}
                whileInView={{ opacity: 1, y: 0, rotate: note.rotation }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ type: 'spring', stiffness: 70, damping: 12, delay: i * 0.06 }}
                whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
                onClick={(e) => handleClick(note, i, e)}
              >
                <div
                  className="relative preserve-3d transition-transform duration-500"
                  style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
                >
                  {/* Front */}
                  <div
                    className={`backface-hidden ${colors.bg} ${colors.border} border-2 px-5 py-4 shadow-lg w-40 sm:w-44`}
                  >
                    {/* Tape */}
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-10 h-4 bg-white/50 rotate-2" />
                    <p className={`font-hand text-xl ${colors.text} text-center`}>
                      {note.title}
                    </p>
                    <p className="font-cute text-xs text-center text-gray-500 mt-2">click to flip ♡</p>
                  </div>
                  {/* Back */}
                  <div
                    className={`backface-hidden rotate-y-180 absolute inset-0 ${colors.bg} ${colors.border} border-2 px-5 py-4 shadow-lg w-40 sm:w-44`}
                  >
                    <p className={`font-cute text-sm ${colors.text} text-center`}>
                      {note.message}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Floating hearts */}
      {hearts.map((h) => (
        <motion.div
          key={h.id}
          className="fixed text-2xl pointer-events-none z-50"
          style={{ left: h.x, top: h.y }}
          initial={{ opacity: 1, y: 0, scale: 1 }}
          animate={{ opacity: 0, y: -80, scale: 0.5 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        >
          ♡
        </motion.div>
      ))}

      {/* Decorative flowers */}
      <div className="absolute top-10 left-4 text-3xl animate-sway opacity-60">🌷</div>
      <div className="absolute bottom-10 right-4 text-3xl animate-sway opacity-60" style={{ animationDelay: '1s' }}>
        🌸
      </div>
    </section>
  );
}
