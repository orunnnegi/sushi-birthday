import { motion } from 'framer-motion';
import { useState } from 'react';
import { sushiiData, type Reason } from '@/data/sushiiData';

const colorMap: Record<string, { bg: string; text: string; border: string; heart: string }> = {
  pink: { bg: 'bg-pink-200', text: 'text-wine-700', border: 'border-pink-400', heart: '#f95a9c' },
  wine: { bg: 'bg-wine-200', text: 'text-wine-800', border: 'border-wine-400', heart: '#b83d5c' },
  purple: { bg: 'bg-purple-200', text: 'text-purple-700', border: 'border-purple-400', heart: '#9a4fff' },
  green: { bg: 'bg-green-200', text: 'text-green-700', border: 'border-green-400', heart: '#3e8a3e' },
  blue: { bg: 'bg-blue-200', text: 'text-blue-700', border: 'border-blue-400', heart: '#3a6af0' },
};

export default function ReasonsSection() {
  const [flipped, setFlipped] = useState<Set<number>>(new Set());
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>([]);

  const handleClick = (reason: Reason, i: number, e: React.MouseEvent) => {
    const newFlipped = new Set(flipped);
    if (newFlipped.has(i)) {
      newFlipped.delete(i);
    } else {
      newFlipped.add(i);
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      const newHearts: { id: number; x: number; y: number }[] = [];
      for (let j = 0; j < 8; j++) {
        newHearts.push({
          id: Math.random(),
          x: rect.left + rect.width / 2 + (Math.random() - 0.5) * 80,
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
      id="you"
      className="relative py-20 px-4"
      style={{ background: 'linear-gradient(180deg, #fff5f8 0%, #fff8ec 50%, #faf5ff 100%)' }}
    >
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 60, damping: 12 }}
      >
        <h2 className="font-hand text-5xl md:text-6xl text-wine-700 mb-3">
          Reasons you're amazing ♡
        </h2>
        <p className="font-cute text-lg text-purple-600 max-w-md mx-auto">
          I could keep going, but we'd be here until your next birthday.
        </p>
      </motion.div>

      <div className="max-w-4xl mx-auto">
        <div className="flex flex-wrap justify-center gap-4 sm:gap-5">
          {sushiiData.reasons.map((reason, i) => {
            const colors = colorMap[reason.color] || colorMap.pink;
            const isFlipped = flipped.has(i);
            return (
              <motion.div
                key={i}
                className="perspective-1000 cursor-pointer"
                initial={{ opacity: 0, scale: 0.5, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ type: 'spring', stiffness: 70, damping: 12, delay: i * 0.05 }}
                whileHover={{ scale: 1.05, zIndex: 10 }}
                onClick={(e) => handleClick(reason, i, e)}
              >
                <div
                  className="relative preserve-3d transition-transform duration-600"
                  style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
                >
                  {/* Front — heart-shaped card */}
                  <div
                    className={`backface-hidden ${colors.bg} ${colors.border} border-2 shadow-lg flex items-center justify-center px-6 py-8`}
                    style={{
                      clipPath:
                        'path("M60,110 C35,80 0,55 0,28 C0,12 12,0 28,0 C40,0 52,6 60,18 C68,6 80,0 92,0 C108,0 120,12 120,28 C120,55 85,80 60,110 Z")',
                      width: '120px',
                      height: '110px',
                    }}
                  >
                    <p className={`font-hand text-lg ${colors.text} text-center leading-tight`}>
                      {reason.title}
                    </p>
                  </div>
                  {/* Back */}
                  <div
                    className={`backface-hidden rotate-y-180 absolute inset-0 ${colors.bg} ${colors.border} border-2 shadow-lg flex items-center justify-center p-4`}
                    style={{
                      clipPath:
                        'path("M60,110 C35,80 0,55 0,28 C0,12 12,0 28,0 C40,0 52,6 60,18 C68,6 80,0 92,0 C108,0 120,12 120,28 C120,55 85,80 60,110 Z")',
                    }}
                  >
                    <p className={`font-cute text-xs ${colors.text} text-center leading-snug`}>
                      {reason.message}
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
          style={{ left: h.x, top: h.y, color: '#f95a9c' }}
          initial={{ opacity: 1, y: 0, scale: 1 }}
          animate={{ opacity: 0, y: -100, scale: 0.3, rotate: Math.random() * 360 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        >
          ♡
        </motion.div>
      ))}
    </section>
  );
}
