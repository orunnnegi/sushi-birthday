import { motion } from 'framer-motion';
import { useState } from 'react';
import { sushiiData } from '@/data/sushiiData';

export default function BucketListSection() {
  const [checked, setChecked] = useState<Set<number>>(new Set());
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>([]);

  const handleClick = (i: number, e: React.MouseEvent) => {
    const newChecked = new Set(checked);
    if (newChecked.has(i)) {
      newChecked.delete(i);
    } else {
      newChecked.add(i);
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      const newHearts: { id: number; x: number; y: number }[] = [];
      for (let j = 0; j < 4; j++) {
        newHearts.push({
          id: Math.random(),
          x: rect.left + rect.width / 2 + (Math.random() - 0.5) * 40,
          y: rect.top + rect.height / 2,
        });
      }
      setHearts((prev) => [...prev, ...newHearts]);
      setTimeout(() => {
        setHearts((prev) => prev.filter((h) => !newHearts.find((nh) => nh.id === h.id)));
      }, 1500);
    }
    setChecked(newChecked);
  };

  return (
    <section
      className="relative py-20 px-4"
      style={{ background: 'linear-gradient(180deg, #fff5f8 0%, #faf5ff 100%)' }}
    >
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 60, damping: 12 }}
      >
        <h2 className="font-hand text-5xl md:text-6xl text-wine-700 mb-3">
          Things we should do someday ♡
        </h2>
        <p className="font-cute text-base text-purple-600">
          tap to check them off (even though we haven't done them yet)
        </p>
      </motion.div>

      <div className="max-w-2xl mx-auto bg-cream-100/70 p-6 sm:p-8 shadow-inner">
        <div className="space-y-3">
          {sushiiData.bucketList.map((item, i) => {
            const isChecked = checked.has(i);
            return (
              <motion.button
                key={i}
                onClick={(e) => handleClick(i, e)}
                className="w-full flex items-center gap-3 text-left cursor-pointer"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 60, damping: 12, delay: i * 0.05 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div
                  className={`flex-shrink-0 w-7 h-7 border-2 rounded flex items-center justify-center transition-all ${
                    isChecked ? 'bg-pink-400 border-pink-500' : 'border-wine-400 bg-white'
                  }`}
                >
                  {isChecked && (
                    <motion.span
                      initial={{ scale: 0, rotate: -45 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                      className="text-white text-sm"
                    >
                      ✓
                    </motion.span>
                  )}
                </div>
                <span
                  className={`font-cute text-base sm:text-lg transition-all ${
                    isChecked
                      ? 'text-gray-400 line-through'
                      : 'text-wine-700'
                  }`}
                >
                  {item.text}
                </span>
                {isChecked && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="ml-auto font-hand text-sm text-pink-500"
                  >
                    DONE ♡
                  </motion.span>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Floating hearts */}
      {hearts.map((h) => (
        <motion.div
          key={h.id}
          className="fixed text-xl pointer-events-none z-50"
          style={{ left: h.x, top: h.y, color: '#f95a9c' }}
          initial={{ opacity: 1, y: 0, scale: 1 }}
          animate={{ opacity: 0, y: -60, scale: 0.3 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        >
          ♡
        </motion.div>
      ))}
    </section>
  );
}
