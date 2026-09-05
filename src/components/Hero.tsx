import { motion } from 'framer-motion';
import { useState, useCallback } from 'react';

interface HeroProps {
  onEnter: () => void;
}

export default function Hero({ onEnter }: HeroProps) {
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number; vx: number; vy: number }[]>([]);

  const burstHearts = useCallback(() => {
    const newHearts: { id: number; x: number; y: number; vx: number; vy: number }[] = [];
    for (let i = 0; i < 20; i++) {
      const angle = (Math.PI * 2 * i) / 20;
      newHearts.push({
        id: Math.random(),
        x: 50,
        y: 50,
        vx: Math.cos(angle) * (3 + Math.random() * 4),
        vy: Math.sin(angle) * (3 + Math.random() * 4) - 2,
      });
    }
    setHearts(newHearts);
    setTimeout(() => setHearts([]), 2000);
  }, []);

  const handleEnter = () => {
    burstHearts();
    setTimeout(onEnter, 300);
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background:
          'linear-gradient(180deg, #fff5f8 0%, #faf5ff 30%, #f0f5ff 60%, #fff8ec 100%)',
      }}
    >
      {/* Fairy lights */}
      <div className="absolute top-0 left-0 right-0 h-32 pointer-events-none">
        {[...Array(18)].map((_, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${(i / 18) * 100}%`,
              top: `${20 + Math.sin(i * 0.5) * 15}px`,
            }}
          >
            <div
              className="w-2 h-2 rounded-full animate-flicker"
              style={{
                background: ['#fde68a', '#ff9ec5', '#c899ff', '#8ab0ff'][i % 4],
                boxShadow: `0 0 8px 2px ${['#fde68a', '#ff9ec5', '#c899ff', '#8ab0ff'][i % 4]}`,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          </div>
        ))}
        {/* String */}
        <svg className="absolute top-0 left-0 w-full h-20" preserveAspectRatio="none">
          <path
            d="M0,10 Q50,40 100,10 T200,10 T300,10 T400,10 T500,10 T600,10 T700,10 T800,10 T900,10 T1000,10"
            stroke="#d4a574"
            strokeWidth="1"
            fill="none"
            opacity="0.4"
          />
        </svg>
      </div>

      {/* Decorative flowers and vines */}
      <div className="absolute top-20 left-4 sm:left-10 text-5xl animate-sway" style={{ animationDelay: '0.5s' }}>
        🌸
      </div>
      <div className="absolute top-32 right-4 sm:right-12 text-4xl animate-sway" style={{ animationDelay: '1s' }}>
        🌷
      </div>
      <div className="absolute bottom-20 left-8 text-4xl animate-sway" style={{ animationDelay: '1.5s' }}>
        🌺
      </div>
      <div className="absolute bottom-32 right-8 text-5xl animate-sway" style={{ animationDelay: '0.3s' }}>
        🌹
      </div>
      <div className="absolute top-40 left-1/4 text-3xl animate-drift">🦋</div>
      <div className="absolute top-60 right-1/4 text-3xl animate-drift" style={{ animationDelay: '2s' }}>
        🦋
      </div>
      <div className="absolute top-24 right-1/3 text-2xl animate-twinkle">★</div>
      <div className="absolute bottom-40 left-1/3 text-2xl animate-twinkle" style={{ animationDelay: '1s' }}>
        ✦
      </div>

      {/* Vines */}
      <div className="absolute top-0 left-0 text-6xl opacity-30 rotate-12">🌿</div>
      <div className="absolute top-0 right-0 text-6xl opacity-30 -rotate-12">🌿</div>
      <div className="absolute bottom-0 left-0 text-5xl opacity-30 rotate-45">🍃</div>
      <div className="absolute bottom-0 right-0 text-5xl opacity-30 -rotate-45">🍃</div>

      {/* Teddy bear */}
      <div className="absolute bottom-10 left-4 sm:left-16 text-5xl animate-breathe">🧸</div>

      {/* Central torn paper */}
      <motion.div
        className="relative z-10 flex flex-col items-center text-center px-4"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 60, damping: 12, delay: 0.3 }}
      >
        <div
          className="relative bg-cream-50 px-6 py-10 sm:px-12 sm:py-14 md:px-20 md:py-16 shadow-2xl"
          style={{
            clipPath:
              'polygon(2% 0%, 98% 2%, 100% 8%, 97% 15%, 100% 25%, 96% 35%, 99% 50%, 95% 65%, 98% 75%, 96% 85%, 100% 95%, 97% 100%, 3% 98%, 0% 92%, 2% 82%, 0% 70%, 3% 60%, 0% 50%, 2% 40%, 0% 30%, 3% 20%, 0% 10%)',
            backgroundImage:
              'radial-gradient(circle at 20% 30%, rgba(255,200,220,0.2) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(200,180,255,0.15) 0%, transparent 50%)',
          }}
        >
          {/* Tape pieces */}
          <div className="absolute -top-3 left-8 w-16 h-6 bg-pink-200/60 rotate-[-8deg] shadow-sm" />
          <div className="absolute -top-3 right-8 w-16 h-6 bg-purple-200/60 rotate-[8deg] shadow-sm" />

          <motion.h1
            className="font-hand text-5xl sm:text-6xl md:text-7xl text-wine-700 mb-3 text-shadow-soft"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 100, damping: 10, delay: 0.6 }}
          >
            Happy Birthday,
            <br />
            Sushii ♡
          </motion.h1>

          <p className="font-cute text-lg sm:text-xl text-purple-600 mb-2">
            a tiny corner of the internet made just for you
          </p>
          <p className="font-cute text-base sm:text-lg text-pink-500 mb-6">
            because one birthday message was obviously not enough ♡
          </p>

          <motion.button
            onClick={handleEnter}
            className="relative px-8 py-4 font-hand text-2xl text-white bg-gradient-to-r from-pink-500 to-wine-500 rounded-full shadow-lg hover:shadow-xl transition-shadow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.88 }}
          >
            COME INSIDE ♡
          </motion.button>
        </div>
      </motion.div>

      {/* Heart burst */}
      {hearts.map((h) => (
        <motion.div
          key={h.id}
          className="absolute top-1/2 left-1/2 text-4xl pointer-events-none z-20"
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{
            x: h.vx * 60,
            y: h.vy * 60,
            opacity: 0,
            scale: 0.3,
            rotate: Math.random() * 360,
          }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        >
          <span style={{ color: ['#f95a9c', '#e6407f', '#ff9ec5', '#c92e64', '#ff7ab3'][Math.floor(Math.random() * 5)] }}>
            ♡
          </span>
        </motion.div>
      ))}

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 text-wine-400 font-cute text-sm"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        scroll down ♡
      </motion.div>
    </section>
  );
}
