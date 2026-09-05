import { useState, useCallback } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSound } from './useSound';

export default function SoundToggle() {
  const { toggle, enabled } = useSound();
  const [on, setOn] = useState(false);

  const handleClick = useCallback(() => {
    const newState = toggle();
    setOn(newState);
  }, [toggle]);

  return (
    <motion.button
      onClick={handleClick}
      className="fixed bottom-4 right-4 z-50 w-11 h-11 flex items-center justify-center bg-cream-100/90 backdrop-blur-sm rounded-full shadow-lg border-2 border-pink-300"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label={on ? 'Mute sounds' : 'Enable sounds'}
      title={on ? 'Sound on ♡' : 'Sound off — click to enable'}
    >
      {on ? <Volume2 size={20} className="text-wine-600" /> : <VolumeX size={20} className="text-pink-400" />}
    </motion.button>
  );
}
