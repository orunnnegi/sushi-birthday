import { useEffect, useState } from 'react';

interface CursorHeart {
  id: number;
  x: number;
  y: number;
}

let heartId = 0;

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hearts, setHearts] = useState<CursorHeart[]>([]);
  const [visible, setVisible] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const rm = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsDesktop(mq.matches);
    setReduced(rm.matches);

    if (!mq.matches || rm.matches) return;

    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };

    const leave = () => setVisible(false);

    const click = (e: MouseEvent) => {
      const newHearts: CursorHeart[] = [];
      for (let i = 0; i < 5; i++) {
        newHearts.push({
          id: heartId++,
          x: e.clientX + (Math.random() - 0.5) * 30,
          y: e.clientY + (Math.random() - 0.5) * 30,
        });
      }
      setHearts((prev) => [...prev, ...newHearts]);
      setTimeout(() => {
        setHearts((prev) => prev.filter((h) => !newHearts.find((nh) => nh.id === h.id)));
      }, 1000);
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseleave', leave);
    window.addEventListener('click', click);

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseleave', leave);
      window.removeEventListener('click', click);
    };
  }, []);

  if (!isDesktop || reduced) return null;

  return (
    <>
      <div
        className="fixed pointer-events-none z-[9999] transition-opacity duration-200"
        style={{
          left: pos.x,
          top: pos.y,
          opacity: visible ? 1 : 0,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <span
          className="text-pink-500 select-none"
          style={{ fontSize: '18px', filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.2))' }}
        >
          ♡
        </span>
      </div>
      {hearts.map((h) => (
        <div
          key={h.id}
          className="fixed pointer-events-none z-[9999]"
          style={{ left: h.x, top: h.y, animation: 'cursorHeart 1s ease-out forwards' }}
        >
          <span className="text-pink-400 select-none" style={{ fontSize: '14px' }}>
            ♡
          </span>
          <style>{`
            @keyframes cursorHeart {
              0% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
              100% { opacity: 0; transform: translate(-50%, -150%) scale(0.3); }
            }
          `}</style>
        </div>
      ))}
    </>
  );
}
