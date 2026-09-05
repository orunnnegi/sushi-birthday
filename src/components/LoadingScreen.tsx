import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const steps = [
  { emoji: '🌷', text: 'collecting flowers...' },
  { emoji: '📸', text: 'finding the cutest pictures...' },
  { emoji: '📔', text: 'sticking everything into the scrapbook...' },
  { emoji: '🎁', text: 'wrapping the present...' },
  { emoji: '♡', text: "okay... she's ready ♡" },
];

export default function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const interval = reduced ? 300 : 900;

    const timers: ReturnType<typeof setTimeout>[] = [];
    steps.forEach((_, i) => {
      timers.push(
        setTimeout(() => {
          setStep(i);
        }, i * interval)
      );
    });

    timers.push(
      setTimeout(() => {
        setShow(false);
        setTimeout(onDone, 600);
      }, steps.length * interval)
    );

    return () => timers.forEach(clearTimeout);
  }, [onDone]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, #fff5f8 0%, #faf5ff 50%, #f0f5ff 100%)',
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            key={step}
            initial={{ scale: 0.5, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: -20 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="flex flex-col items-center gap-4"
          >
            <span className="text-6xl" style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))' }}>
              {steps[step].emoji}
            </span>
            <p className="font-hand text-3xl text-wine-600 text-shadow-soft">
              {steps[step].text}
            </p>
          </motion.div>
          <div className="mt-8 w-48 h-2 bg-pink-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-pink-400 to-purple-400 rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
