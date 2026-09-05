import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { sushiiData, type Envelope as EnvelopeType } from '@/data/sushiiData';

const colorMap: Record<string, { bg: string; flap: string; border: string; text: string }> = {
  pink: { bg: 'bg-pink-200', flap: 'bg-pink-300', border: 'border-pink-400', text: 'text-wine-700' },
  purple: { bg: 'bg-purple-200', flap: 'bg-purple-300', border: 'border-purple-400', text: 'text-purple-700' },
  wine: { bg: 'bg-wine-200', flap: 'bg-wine-300', border: 'border-wine-400', text: 'text-wine-800' },
  blue: { bg: 'bg-blue-200', flap: 'bg-blue-300', border: 'border-blue-400', text: 'text-blue-700' },
  green: { bg: 'bg-green-200', flap: 'bg-green-300', border: 'border-green-400', text: 'text-green-700' },
};

function EnvelopeCard({ envelope, index }: { envelope: EnvelopeType; index: number }) {
  const [open, setOpen] = useState(false);
  const colors = colorMap[envelope.color] || colorMap.pink;

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 40, rotate: index % 2 === 0 ? -2 : 2 }}
      whileInView={{ opacity: 1, y: 0, rotate: index % 2 === 0 ? -1 : 1 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ type: 'spring', stiffness: 70, damping: 12, delay: index * 0.1 }}
      whileHover={{ scale: 1.03, rotate: 0, zIndex: 10 }}
    >
      <button
        onClick={() => setOpen(true)}
        className={`relative w-full max-w-xs ${colors.bg} ${colors.border} border-2 shadow-lg rounded-sm overflow-hidden cursor-pointer`}
        style={{ aspectRatio: '3 / 2' }}
        aria-label={envelope.label}
      >
        {/* Envelope flap */}
        <div
          className={`absolute top-0 left-0 right-0 ${colors.flap}`}
          style={{
            clipPath: 'polygon(0 0, 100% 0, 50% 60%)',
            height: '50%',
          }}
        />
        {/* Envelope body */}
        <div className="absolute inset-0 flex items-center justify-center">
          <p className={`font-hand text-xl sm:text-2xl ${colors.text} text-center px-4`}>
            {envelope.label}
          </p>
        </div>
        {/* Heart seal */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 text-lg text-wine-500">♡</div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[9000] flex items-center justify-center p-4"
            style={{ background: 'rgba(50,20,40,0.6)', backdropFilter: 'blur(4px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              className="relative bg-cream-50 max-w-md w-full p-8 shadow-2xl"
              initial={{ scale: 0.5, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.5, y: 50, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                clipPath:
                  'polygon(2% 0%, 98% 2%, 100% 8%, 97% 15%, 100% 25%, 96% 35%, 99% 50%, 95% 65%, 98% 75%, 96% 85%, 100% 95%, 97% 100%, 3% 98%, 0% 92%, 2% 82%, 0% 70%, 3% 60%, 0% 50%, 2% 40%, 0% 30%, 3% 20%, 0% 10%)',
              }}
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-pink-200/70 rotate-2" />
              <h3 className="font-hand text-2xl text-wine-600 text-center mb-4">
                {envelope.label}
              </h3>
              <p className="font-cute text-base text-purple-700 leading-relaxed text-center">
                {envelope.message}
              </p>
              <div className="text-center mt-4 text-2xl">♡</div>
              <button
                onClick={() => setOpen(false)}
                className="absolute -top-3 -right-3 w-8 h-8 bg-wine-600 text-white rounded-full flex items-center justify-center shadow-lg text-sm"
                aria-label="Close letter"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function EnvelopesSection() {
  return (
    <section
      className="relative py-20 px-4 scrapbook-paper"
      style={{ background: 'linear-gradient(180deg, #4a1685 0%, #fff5f8 40%, #fff8ec 100%)' }}
    >
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 60, damping: 12 }}
      >
        <h2 className="font-hand text-5xl md:text-6xl text-wine-700 mb-3">
          Open when... ♡
        </h2>
        <p className="font-cute text-lg text-purple-600">
          little letters for whenever you need them
        </p>
      </motion.div>

      <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-6">
        {sushiiData.envelopes.map((env, i) => (
          <EnvelopeCard key={i} envelope={env} index={i} />
        ))}
      </div>

      {/* Decorative elements */}
      <div className="absolute top-10 left-4 text-3xl animate-sway opacity-40">🌿</div>
      <div className="absolute bottom-10 right-4 text-3xl animate-sway opacity-40" style={{ animationDelay: '1s' }}>
        🌿
      </div>
    </section>
  );
}
