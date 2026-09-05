import { motion } from 'framer-motion';
import { useState } from 'react';
import type { SushiiPhoto } from '@/data/sushiiData';

interface ScrapbookPhotoProps {
  photo: SushiiPhoto;
  index: number;
  onOpen: (photo: SushiiPhoto) => void;
}

export default function ScrapbookPhoto({ photo, index, onOpen }: ScrapbookPhotoProps) {
  const [hover, setHover] = useState(false);

  const rotation = photo.rotation ?? 0;
  const baseAnim = {
    initial: { opacity: 0, y: 60, rotate: rotation * 2 },
    whileInView: { opacity: 1, y: 0, rotate: rotation },
    viewport: { once: true, margin: '-50px' },
    transition: { type: 'spring' as const, stiffness: 80, damping: 12, delay: index * 0.08 },
  };

  const handleClick = () => onOpen(photo);

  // ---- POLAROID ----
  if (photo.type === 'polaroid') {
    return (
      <motion.div
        {...baseAnim}
        whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
        onHoverStart={() => setHover(true)}
        onHoverEnd={() => setHover(false)}
        onClick={handleClick}
        className="relative cursor-pointer bg-white p-3 pb-12 shadow-lg hover:shadow-2xl transition-shadow"
        style={{ width: 'fit-content' }}
      >
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-16 h-5 bg-pink-200/60 rotate-3" />
        <img
          src={photo.src}
          alt={photo.caption}
          className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 object-cover"
          loading="lazy"
        />
        <p className="absolute bottom-2 left-0 right-0 text-center font-hand text-xl text-wine-600">
          {photo.caption}
        </p>
        {hover && <span className="absolute top-2 right-2 text-pink-400 text-sm">♡</span>}
      </motion.div>
    );
  }

  // ---- CUTOUT ----
  if (photo.type === 'cutout') {
    return (
      <motion.div
        {...baseAnim}
        whileHover={{ scale: 1.08, rotate: 0, zIndex: 10 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleClick}
        className="relative cursor-pointer"
      >
        <div className="bg-white p-1.5 shadow-lg hover:shadow-2xl transition-shadow">
          <img
            src={photo.src}
            alt={photo.caption}
            className="w-28 h-32 sm:w-32 sm:h-36 md:w-36 md:h-40 object-cover"
            loading="lazy"
          />
        </div>
        <p className="mt-1.5 font-hand text-lg text-wine-600 text-center">{photo.caption}</p>
      </motion.div>
    );
  }

  // ---- HEART FRAME ----
  if (photo.type === 'heart') {
    return (
      <motion.div
        {...baseAnim}
        whileHover={{ scale: 1.08, zIndex: 10 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleClick}
        className="relative cursor-pointer"
      >
        <div className="relative w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40">
          <div
            className="absolute inset-0 bg-pink-200"
            style={{
              clipPath:
                'path("M50,90 C30,70 0,50 0,25 C0,10 10,0 25,0 C35,0 45,5 50,15 C55,5 65,0 75,0 C90,0 100,10 100,25 C100,50 70,70 50,90 Z")',
            }}
          />
          <img
            src={photo.src}
            alt={photo.caption}
            className="absolute inset-1.5 w-[calc(100%-12px)] h-[calc(100%-12px)] object-cover"
            style={{
              clipPath:
                'path("M50,85 C32,67 5,48 5,26 C5,13 13,5 26,5 C35,5 43,9 50,18 C57,9 65,5 74,5 C87,5 95,13 95,26 C95,48 68,67 50,85 Z")',
            }}
            loading="lazy"
          />
        </div>
        <p className="mt-1 font-hand text-lg text-wine-600 text-center">{photo.caption}</p>
      </motion.div>
    );
  }

  // ---- CIRCLE ----
  if (photo.type === 'circle') {
    return (
      <motion.div
        {...baseAnim}
        whileHover={{ scale: 1.1, zIndex: 10 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleClick}
        className="relative cursor-pointer"
      >
        <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white shadow-lg hover:shadow-2xl transition-shadow">
          <img src={photo.src} alt={photo.caption} className="w-full h-full object-cover" loading="lazy" />
        </div>
        <p className="mt-1 font-hand text-base text-wine-600 text-center">{photo.caption}</p>
      </motion.div>
    );
  }

  // ---- TAPED ----
  if (photo.type === 'taped') {
    return (
      <motion.div
        {...baseAnim}
        whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleClick}
        className="relative cursor-pointer"
      >
        <div className="absolute -top-2 -left-2 w-12 h-6 bg-purple-200/70 rotate-[-20deg] shadow-sm" />
        <div className="absolute -top-2 -right-2 w-12 h-6 bg-pink-200/70 rotate-[20deg] shadow-sm" />
        <div className="bg-white p-2 shadow-lg hover:shadow-2xl transition-shadow">
          <img
            src={photo.src}
            alt={photo.caption}
            className="w-32 h-24 sm:w-36 sm:h-28 md:w-40 md:h-32 object-cover"
            loading="lazy"
          />
        </div>
        <p className="mt-1.5 font-hand text-lg text-wine-600 text-center">{photo.caption}</p>
      </motion.div>
    );
  }

  // ---- PHOTO STRIP ----
  if (photo.type === 'strip') {
    return (
      <motion.div
        {...baseAnim}
        whileHover={{ scale: 1.05, zIndex: 10 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleClick}
        className="relative cursor-pointer bg-white p-2 shadow-lg hover:shadow-2xl transition-shadow"
      >
        <div className="flex flex-col gap-1">
          {[0, 1, 2].map((i) => (
            <img
              key={i}
              src={photo.src}
              alt={`${photo.caption} ${i + 1}`}
              className="w-20 h-16 sm:w-24 sm:h-20 object-cover"
              loading="lazy"
              style={{ filter: `sepia(${0.05 + i * 0.03})` }}
            />
          ))}
        </div>
        <p className="mt-1 font-hand text-base text-wine-600 text-center">{photo.caption}</p>
      </motion.div>
    );
  }

  // ---- TINY ----
  if (photo.type === 'tiny') {
    return (
      <motion.div
        {...baseAnim}
        whileHover={{ scale: 1.15, zIndex: 10 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleClick}
        className="relative cursor-pointer"
      >
        <div className="bg-white p-1 shadow-md hover:shadow-xl transition-shadow">
          <img
            src={photo.src}
            alt={photo.caption}
            className="w-16 h-20 sm:w-20 sm:h-24 object-cover"
            loading="lazy"
          />
        </div>
        <p className="mt-0.5 font-hand text-sm text-wine-600 text-center">{photo.caption}</p>
      </motion.div>
    );
  }

  // ---- FEATURE ----
  if (photo.type === 'feature') {
    return (
      <motion.div
        {...baseAnim}
        whileHover={{ scale: 1.03, zIndex: 10 }}
        whileTap={{ scale: 0.97 }}
        onClick={handleClick}
        className="relative cursor-pointer"
      >
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-7 bg-pink-200/70 rotate-2 shadow-sm" />
        <div className="bg-white p-3 pb-10 shadow-xl hover:shadow-2xl transition-shadow">
          <img
            src={photo.src}
            alt={photo.caption}
            className="w-48 h-56 sm:w-56 sm:h-64 md:w-64 md:h-72 object-cover"
            loading="lazy"
          />
          <p className="absolute bottom-3 left-0 right-0 text-center font-hand text-2xl text-wine-600">
            {photo.caption}
          </p>
        </div>
      </motion.div>
    );
  }

  return null;
}
