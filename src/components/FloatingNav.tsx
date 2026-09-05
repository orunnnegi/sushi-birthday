import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface NavItem {
  label: string;
  target: string;
}

const navItems: NavItem[] = [
  { label: 'HOME ♡', target: 'hero' },
  { label: 'NOTES', target: 'notes' },
  { label: 'PHOTOS', target: 'photos' },
  { label: 'YOU', target: 'you' },
  { label: 'FUTURE', target: 'future' },
  { label: 'SURPRISE', target: 'surprise' },
];

export default function FloatingNav() {
  const [open, setOpen] = useState(false);

  const scrollTo = (target: string) => {
    const el = document.getElementById(target);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setOpen(false);
  };

  return (
    <>
      {/* Desktop nav */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 hidden md:flex gap-1">
        {navItems.map((item, i) => (
          <motion.button
            key={item.label}
            onClick={() => scrollTo(item.target)}
            className="px-3 py-1.5 font-cute text-sm text-wine-700 bg-cream-100/90 backdrop-blur-sm rounded-lg shadow-md border border-pink-200 hover:bg-pink-100 hover:scale-105 transition-all"
            style={{ rotate: `${i % 2 === 0 ? -1.5 : 1.5}deg` }}
            whileHover={{ rotate: 0, scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
          >
            {item.label}
          </motion.button>
        ))}
      </div>

      {/* Mobile nav */}
      <div className="fixed top-3 right-3 z-50 md:hidden">
        <motion.button
          onClick={() => setOpen(!open)}
          className="w-11 h-11 flex items-center justify-center bg-cream-100/95 rounded-full shadow-lg border-2 border-pink-300"
          whileTap={{ scale: 0.9 }}
        >
          <span className="font-hand text-xl text-wine-600">{open ? '✕' : '♡'}</span>
        </motion.button>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -10 }}
              className="absolute top-14 right-0 flex flex-col gap-1.5 bg-cream-100/95 backdrop-blur-sm p-2 rounded-xl shadow-xl border border-pink-200"
            >
              {navItems.map((item, i) => (
                <button
                  key={item.label}
                  onClick={() => scrollTo(item.target)}
                  className="px-4 py-2 font-cute text-sm text-wine-700 text-right rounded-lg hover:bg-pink-100 transition-colors"
                  style={{ rotate: `${i % 2 === 0 ? -1 : 1}deg` }}
                >
                  {item.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
