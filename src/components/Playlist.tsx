import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react';
import { sushiiData } from '@/data/sushiiData';

export default function Playlist() {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [muted, setMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const song = sushiiData.playlist[currentTrack];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = song.src;
      if (playing) {
        audioRef.current.play().catch(() => {
          // Silent catch — no audio file exists yet
        });
      }
    }
  }, [currentTrack]);

  useEffect(() => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.play().catch(() => {});
      intervalRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            handleNext();
            return 0;
          }
          return prev + 0.5;
        });
      }, 200);
    } else {
      audioRef.current.pause();
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [playing]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = muted;
    }
  }, [muted]);

  const handlePlayPause = () => {
    setPlaying((prev) => !prev);
    if (!playing) setProgress(0);
  };

  const handleNext = () => {
    setCurrentTrack((prev) => (prev + 1) % sushiiData.playlist.length);
    setProgress(0);
  };

  const handlePrev = () => {
    setCurrentTrack((prev) => (prev - 1 + sushiiData.playlist.length) % sushiiData.playlist.length);
    setProgress(0);
  };

  return (
    <section
      className="relative py-20 px-4"
      style={{ background: 'linear-gradient(180deg, #faf5ff 0%, #fff5f8 100%)' }}
    >
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 60, damping: 12 }}
      >
        <h2 className="font-hand text-5xl md:text-6xl text-wine-700 mb-3">
          Sushii's little playlist ♡
        </h2>
        <p className="font-cute text-base text-purple-600">
          press play when you're ready for some tunes ♡
        </p>
      </motion.div>

      <motion.div
        className="max-w-md mx-auto bg-cream-100 p-6 shadow-xl rounded-sm"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 70, damping: 12 }}
      >
        <div className="flex items-center gap-4">
          {/* Vinyl record */}
          <motion.div
            className="relative flex-shrink-0"
            animate={playing ? { rotate: 360 } : { rotate: 0 }}
            transition={playing ? { duration: 8, repeat: Infinity, ease: 'linear' } : {}}
          >
            <div
              className="w-24 h-24 rounded-full"
              style={{
                background: 'radial-gradient(circle, #1a1a1a 30%, #2a2a2a 31%, #1a1a1a 32%, #2a2a2a 50%, #1a1a1a 51%, #2a2a2a 70%, #1a1a1a 71%)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
              }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-pink-400 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-cream-100" />
              </div>
            </div>
          </motion.div>

          {/* Track info */}
          <div className="flex-1 min-w-0">
            <p className="font-hand text-xl text-wine-700 truncate">{song.title}</p>
            <p className="font-cute text-sm text-purple-600 truncate">{song.artist}</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-4 h-2 bg-pink-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-pink-400 to-purple-400 rounded-full transition-all duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mt-4">
          <button
            onClick={handlePrev}
            className="text-wine-600 hover:text-wine-800 transition-colors"
            aria-label="Previous song"
          >
            <SkipBack size={24} />
          </button>
          <motion.button
            onClick={handlePlayPause}
            className="w-14 h-14 flex items-center justify-center bg-gradient-to-r from-pink-500 to-wine-500 text-white rounded-full shadow-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label={playing ? 'Pause' : 'Play'}
          >
            {playing ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
          </motion.button>
          <button
            onClick={handleNext}
            className="text-wine-600 hover:text-wine-800 transition-colors"
            aria-label="Next song"
          >
            <SkipForward size={24} />
          </button>
          <button
            onClick={() => setMuted(!muted)}
            className="text-wine-600 hover:text-wine-800 transition-colors ml-2"
            aria-label={muted ? 'Unmute' : 'Mute'}
          >
            {muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>
        </div>

        <audio ref={audioRef} preload="none" />
      </motion.div>
    </section>
  );
}
