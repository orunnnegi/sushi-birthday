import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { sushiiData } from '@/data/sushiiData';

export default function CameraInteraction() {
  const [flash, setFlash] = useState(false);
  const [developedPhoto, setDevelopedPhoto] = useState<string | null>(null);
  const [developedCaption, setDevelopedCaption] = useState<string>('');
  const [photoId, setPhotoId] = useState(0);

  const handleClick = () => {
    setFlash(true);
    setTimeout(() => setFlash(false), 300);

    const randomPhoto = sushiiData.photos[Math.floor(Math.random() * sushiiData.photos.length)];
    setDevelopedCaption(randomPhoto.caption);
    setPhotoId((prev) => prev + 1);
    setTimeout(() => {
      setDevelopedPhoto(randomPhoto.src);
    }, 400);
  };

  const closePhoto = () => setDevelopedPhoto(null);

  return (
    <div className="relative flex flex-col items-center">
      <motion.button
        onClick={handleClick}
        className="relative cursor-pointer"
        whileHover={{ scale: 1.05, rotate: -5 }}
        whileTap={{ scale: 0.92 }}
        aria-label="Take a photo"
      >
        {/* Vintage camera SVG */}
        <svg width="100" height="80" viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Camera body */}
          <rect x="10" y="20" width="80" height="50" rx="6" fill="#5e1726" stroke="#420f19" strokeWidth="2" />
          {/* Top */}
          <rect x="30" y="10" width="40" height="12" rx="3" fill="#7c1f33" stroke="#420f19" strokeWidth="1.5" />
          {/* Lens */}
          <circle cx="50" cy="45" r="18" fill="#1a1a1a" stroke="#420f19" strokeWidth="2" />
          <circle cx="50" cy="45" r="12" fill="#2a2a2a" />
          <circle cx="50" cy="45" r="7" fill="#1a1a1a" />
          <circle cx="46" cy="41" r="3" fill="#5aab5a" opacity="0.6" />
          {/* Flash */}
          <circle cx="78" cy="30" r="5" fill="#fde68a" stroke="#420f19" strokeWidth="1" />
          {/* Viewfinder */}
          <rect x="18" y="28" width="10" height="6" rx="1" fill="#420f19" />
          {/* Strap mount */}
          <circle cx="15" cy="25" r="2" fill="#420f19" />
          <circle cx="85" cy="25" r="2" fill="#420f19" />
        </svg>
      </motion.button>

      <p className="font-hand text-lg text-wine-600 mt-2 text-center">click to develop ♡</p>

      {/* Flash overlay */}
      <AnimatePresence>
        {flash && (
          <motion.div
            className="fixed inset-0 z-[9500] bg-white pointer-events-none"
            initial={{ opacity: 0.9 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>

      {/* Developed Polaroid */}
      <AnimatePresence>
        {developedPhoto && (
          <motion.div
            className="fixed bottom-4 left-4 z-[8000] bg-white p-3 pb-12 shadow-2xl"
            initial={{ x: -200, y: 100, rotate: -15, opacity: 0 }}
            animate={{ x: 0, y: 0, rotate: -3, opacity: 1 }}
            exit={{ x: -200, y: 100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 15 }}
            onClick={closePhoto}
          >
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-12 h-4 bg-pink-200/60 rotate-2" />
            <img
              key={photoId}
              src={developedPhoto}
              alt={developedCaption}
              className="w-28 h-28 object-cover"
              style={{ filter: 'sepia(0.1) contrast(1.05)' }}
              loading="lazy"
            />
            <p className="absolute bottom-2 left-0 right-0 text-center font-hand text-base text-wine-600">
              developed another cutie ♡
            </p>
            <button
              onClick={closePhoto}
              className="absolute -top-2 -right-2 w-6 h-6 bg-wine-600 text-white rounded-full flex items-center justify-center text-xs shadow-lg"
              aria-label="Close"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
