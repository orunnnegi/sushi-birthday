import { useState, useCallback } from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import CustomCursor from '@/components/CustomCursor';
import AmbientLayer from '@/components/AmbientLayer';
import FloatingNav from '@/components/FloatingNav';
import Hero from '@/components/Hero';
import PhotoGallery from '@/components/PhotoGallery';
import CutoutWall from '@/components/CutoutWall';
import NotesSection from '@/components/NotesSection';
import ReasonsSection from '@/components/ReasonsSection';
import WishesSection from '@/components/WishesSection';
import EnvelopesSection from '@/components/EnvelopesSection';
import FutureMemoriesSection from '@/components/FutureMemoriesSection';
import BucketListSection from '@/components/BucketListSection';
import CameraInteraction from '@/components/CameraInteraction';
import BirthdayCake from '@/components/BirthdayCake';
import TeddyInteraction from '@/components/TeddyInteraction';
import Playlist from '@/components/Playlist';
import SecretStickers from '@/components/SecretStickers';
import GiftBox from '@/components/GiftBox';
import FinalMessage from '@/components/FinalMessage';
import FinalInteraction from '@/components/FinalInteraction';
import SoundToggle from '@/components/SoundToggle';

function App() {
  const [loaded, setLoaded] = useState(false);
  const [giftOpened, setGiftOpened] = useState(false);

  const handleEnter = useCallback(() => {
    const notesSection = document.getElementById('notes');
    if (notesSection) {
      notesSection.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <>
      <LoadingScreen onDone={() => setLoaded(true)} />

      {loaded && (
        <>
          <CustomCursor />
          <AmbientLayer />
          <FloatingNav />
          <SoundToggle />
          <SecretStickers />

          <main className="relative">
            {/* HERO */}
            <Hero onEnter={handleEnter} />

            {/* NOTES — A little something for you */}
            <NotesSection />

            {/* PHOTOS — Gallery with filters */}
            <PhotoGallery />

            {/* Cutout wall */}
            <CutoutWall />

            {/* YOU — Reasons you're amazing */}
            <ReasonsSection />

            {/* Wishes — Night sky */}
            <WishesSection />

            {/* Envelopes */}
            <EnvelopesSection />

            {/* FUTURE — Pictures we haven't taken yet */}
            <FutureMemoriesSection />

            {/* Bucket list */}
            <BucketListSection />

            {/* Interactive playful section: camera, cake, teddy */}
            <section
              className="relative py-20 px-4"
              style={{ background: 'linear-gradient(180deg, #fff5f8 0%, #faf5ff 50%, #fff8ec 100%)' }}
            >
              <div className="max-w-4xl mx-auto">
                <h2 className="font-hand text-4xl md:text-5xl text-wine-700 text-center mb-12">
                  some cute little things ♡
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start justify-items-center">
                  <div className="flex flex-col items-center">
                    <CameraInteraction />
                  </div>
                  <div className="flex flex-col items-center">
                    <BirthdayCake />
                  </div>
                  <div className="flex flex-col items-center">
                    <TeddyInteraction />
                  </div>
                </div>
              </div>
            </section>

            {/* Playlist */}
            <Playlist />

            {/* SURPRISE — Gift box */}
            <GiftBox onOpen={() => setGiftOpened(true)} />

            {/* Final message */}
            <FinalMessage visible={giftOpened} />

            {/* Final interaction — One more hug */}
            <FinalInteraction />
          </main>
        </>
      )}
    </>
  );
}

export default App;
