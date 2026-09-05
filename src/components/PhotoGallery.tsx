import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo } from 'react';
import { sushiiData, type SushiiPhoto, type PhotoCategory } from '@/data/sushiiData';
import ScrapbookPhoto from './ScrapbookPhoto';
import PhotoLightbox from './PhotoLightbox';

const filters: { label: string; value: 'all' | PhotoCategory }[] = [
  { label: 'ALL', value: 'all' },
  { label: 'CUTIE', value: 'cutie' },
  { label: 'PRETTY', value: 'pretty' },
  { label: 'CHAOS', value: 'chaos' },
  { label: 'AESTHETIC', value: 'aesthetic' },
  { label: 'FAVORITES', value: 'favorites' },
];

export default function PhotoGallery() {
  const [activeFilter, setActiveFilter] = useState<'all' | PhotoCategory>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<SushiiPhoto | null>(null);

  const filteredPhotos = useMemo(() => {
    if (activeFilter === 'all') return sushiiData.photos;
    return sushiiData.photos.filter((p) => p.category.includes(activeFilter));
  }, [activeFilter]);

  return (
    <section
      id="photos"
      className="relative py-20 px-4 scrapbook-paper"
      style={{ background: 'linear-gradient(180deg, #fff8ec 0%, #fff5f8 100%)' }}
    >
      {/* Section heading */}
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 60, damping: 12 }}
      >
        <h2 className="font-hand text-5xl md:text-6xl text-wine-700 mb-3">
          okay but LOOK at you ♡
        </h2>
        <p className="font-cute text-lg text-purple-600 max-w-md mx-auto">
          This section exists because apparently one photo of you was not enough.
        </p>
      </motion.div>

      {/* Filter tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {filters.map((filter, i) => (
          <motion.button
            key={filter.value}
            onClick={() => setActiveFilter(filter.value)}
            className={`px-4 py-2 font-cute text-sm rounded-lg shadow-md border-2 transition-all ${
              activeFilter === filter.value
                ? 'bg-wine-600 text-white border-wine-700'
                : 'bg-cream-100 text-wine-600 border-pink-200 hover:bg-pink-100'
            }`}
            style={{ rotate: `${i % 2 === 0 ? -1.5 : 1.5}deg` }}
            whileHover={{ rotate: 0, scale: 1.05 }}
            whileTap={{ scale: 0.92 }}
          >
            {filter.label}
          </motion.button>
        ))}
      </div>

      {/* Gallery grid — chaotic scrapbook layout */}
      <div className="relative max-w-5xl mx-auto min-h-[400px]">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeFilter}
            className="flex flex-wrap justify-center items-start gap-4 sm:gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {filteredPhotos.map((photo, i) => (
              <ScrapbookPhoto
                key={`${activeFilter}-${photo.src}-${i}`}
                photo={photo}
                index={i}
                onOpen={setSelectedPhoto}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-10 right-4 text-3xl animate-sway opacity-50">🌿</div>
      <div className="absolute bottom-10 left-4 text-3xl animate-sway opacity-50" style={{ animationDelay: '1s' }}>
        🌿
      </div>

      <PhotoLightbox photo={selectedPhoto} onClose={() => setSelectedPhoto(null)} />
    </section>
  );
}
