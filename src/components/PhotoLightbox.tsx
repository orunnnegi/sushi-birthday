import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useState, useCallback } from 'react';
import type { SushiiPhoto } from '@/data/sushiiData';

interface PhotoLightboxProps {
  photo: SushiiPhoto | null;
  onClose: () => void;
}

export default function PhotoLightbox({ photo, onClose }: PhotoLightboxProps) {
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number; vx: number; vy: number }[]>([]);
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number }[]>([]);

  const burstHearts = useCallback(() => {
    const newHearts: { id: number; x: number; y: number; vx: number; vy: number }[] = [];
    for (let i = 0; i < 12; i++) {
      const angle = (Math.PI * 2 * i) / 12;
      newHearts.push({
        id: Math.random(),
        x: 50,
        y: 50,
        vx: Math.cos(angle) * (2 + Math.random() * 3),
        vy: Math.sin(angle) * (2 + Math.random() * 3) - 1,
      });
    }
    setHearts(newHearts);
    setTimeout(() => setHearts([]), 2000);
  }, []);

  const burstSparkles = useCallback(() => {
    const newSparkles: { id: number; x: number; y: number }[] = [];
    for (let i = 0; i < 15; i++) {
      newSparkles.push({
        id: Math.random(),
        x: 20 + Math.random() * 60,
        y: 20 + Math.random() * 60,
      });
    }
    setSparkles(newSparkles);
    setTimeout(() => setSparkles([]), 2000);
  }, []);

  return (
    <AnimatePresence>
      {photo && (
        <motion.div
          className="fixed inset-0 z-[9000] flex items-center justify-center p-4"
          style={{ background: 'rgba(50, 20, 40, 0.6)', backdropFilter: 'blur(4px)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          onAnimationComplete={burstHearts}
        >
          {/* Hearts */}
          {hearts.map((h) => (
            <motion.div
              key={h.id}
              className="absolute text-3xl pointer-events-none"
              style={{ left: '50%', top: '50%' }}
              initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
              animate={{
                x: h.vx * 80,
                y: h.vy * 80,
                opacity: 0,
                scale: 0.5,
                rotate: Math.random() * 360,
              }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            >
              <span style={{ color: ['#f95a9c', '#e6407f', '#ff9ec5', '#c92e64'][Math.floor(Math.random() * 4)] }}>
                ♡
              </span>
            </motion.div>
          ))}

          {/* Sparkles */}
          {sparkles.map((s) => (
            <motion.div
              key={s.id}
              className="absolute text-2xl pointer-events-none"
              style={{ left: `${s.x}%`, top: `${s.y}%` }}
              initial={{ opacity: 0, scale: 0, rotate: 0 }}
              animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0], rotate: 180 }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            >
              <span style={{ color: '#fde68a' }}>✦</span>
            </motion.div>
          ))}

          {/* Polaroid */}
          <motion.div
            className="relative bg-white p-4 pb-20 shadow-2xl"
            style={{ maxWidth: 'min(90vw, 420px)' }}
            initial={{ scale: 0.3, y: 50, rotate: photo.rotation || 0, opacity: 0 }}
            animate={{ scale: 1, y: 0, rotate: 0, opacity: 1 }}
            exit={{ scale: 0.3, y: 50, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            onClick={(e) => {
              e.stopPropagation();
              burstSparkles();
            }}
          >
            {/* Tape */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-pink-200/70 rotate-2 shadow-sm" />

            <img
              src={photo.src}
              alt={photo.caption}
              className="w-full aspect-square object-cover"
              style={{ filter: 'sepia(0.05) saturate(1.1)' }}
              loading="lazy"
            />
            <p className="absolute bottom-4 left-0 right-0 text-center font-hand text-2xl text-wine-600">
              {photo.caption}
            </p>
            {photo.longMessage && (
              <motion.p
                className="absolute -bottom-16 left-0 right-0 text-center font-cute text-sm text-pink-500"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {photo.longMessage}
              </motion.p>
            )}

            {/* Close button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="absolute -top-4 -right-4 w-10 h-10 bg-wine-600 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
              aria-label="Close photo"
            >
              <X size={20} />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
