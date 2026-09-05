import { motion } from 'framer-motion';
import { useState } from 'react';
import { sushiiData } from '@/data/sushiiData';

const annotations = [
  'this one ♡',
  'pretty',
  'girl what',
  'how are you this cute',
  'okay miss main character',
  '10/10',
  'favorite',
];

const cutoutPhotos = sushiiData.photos.filter((p) => p.type === 'cutout' || p.type === 'circle' || p.type === 'tiny');

export default function CutoutWall() {
  const [messages, setMessages] = useState<Record<number, string>>({});

  const handleClick = (i: number) => {
    const annotation = annotations[i % annotations.length];
    setMessages((prev) => ({ ...prev, [i]: annotation }));
    setTimeout(() => {
      setMessages((prev) => {
        const next = { ...prev };
        delete next[i];
        return next;
      });
    }, 2000);
  };

  return (
    <section className="relative py-16 px-4 overflow-hidden" style={{ background: 'linear-gradient(180deg, #fff5f8 0%, #faf5ff 100%)' }}>
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 60, damping: 12 }}
      >
        <h2 className="font-hand text-4xl md:text-5xl text-wine-700 mb-2">
          sticker cutout wall ♡
        </h2>
        <p className="font-cute text-base text-purple-600">
          tap them. they bounce. it's fun.
        </p>
      </motion.div>

      <div className="relative max-w-4xl mx-auto bg-cream-100/60 p-6 sm:p-10 rounded-sm shadow-inner min-h-[300px]">
        {/* Doodle decorations */}
        <div className="absolute top-2 left-2 text-2xl opacity-40">✏️</div>
        <div className="absolute top-4 right-4 text-2xl opacity-40">✨</div>
        <div className="absolute bottom-4 left-4 text-xl opacity-40">♡</div>

        <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
          {cutoutPhotos.map((photo, i) => (
            <motion.div
              key={i}
              className="relative cursor-pointer"
              initial={{ opacity: 0, scale: 0.5, rotate: (i % 2 === 0 ? -8 : 8) }}
              whileInView={{ opacity: 1, scale: 1, rotate: i % 2 === 0 ? -3 : 3 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 80, damping: 10, delay: i * 0.1 }}
              whileHover={{ scale: 1.1, rotate: 0, zIndex: 10 }}
              whileTap={{ scale: 0.9, rotate: 15 }}
              onClick={() => handleClick(i)}
            >
              <div className="bg-white p-1.5 shadow-lg hover:shadow-2xl transition-shadow">
                <img
                  src={photo.src}
                  alt={photo.caption}
                  className="w-20 h-24 sm:w-24 sm:h-28 md:w-28 md:h-32 object-cover"
                  loading="lazy"
                />
              </div>
              {messages[i] && (
                <motion.div
                  className="absolute -bottom-7 left-0 right-0 text-center font-hand text-sm text-wine-600 whitespace-nowrap"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  {messages[i]}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
