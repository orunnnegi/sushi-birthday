import { useEffect, useRef, useState } from 'react';

interface AmbientItem {
  id: number;
  type: 'petal' | 'heart' | 'butterfly' | 'star' | 'sparkle' | 'leaf';
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  rotation: number;
  color: string;
  drift: number;
}

const petalColors = ['#ff9ec5', '#ffc1dd', '#f95a9c', '#c899ff', '#ff7ab3'];
const heartColors = ['#f95a9c', '#e6407f', '#ff9ec5', '#c92e64'];
const butterflyColors = ['#c899ff', '#ff9ec5', '#8ab0ff', '#b073ff'];
const starColors = ['#fde68a', '#fff8ec', '#fbbf24'];
const sparkleColors = ['#fde68a', '#fff8ec', '#fcd34d', '#ffc1dd'];
const leafColors = ['#88c888', '#5aab5a', '#3e8a3e'];

let ambientId = 0;

export default function AmbientLayer() {
  const [items, setItems] = useState<AmbientItem[]>([]);
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion.current) {
      // Minimal: a few static twinkling stars
      const stars: AmbientItem[] = Array.from({ length: 8 }, () => ({
        id: ambientId++,
        type: 'star' as const,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 8 + Math.random() * 8,
        duration: 3,
        delay: Math.random() * 2,
        rotation: 0,
        color: starColors[Math.floor(Math.random() * starColors.length)],
        drift: 0,
      }));
      setItems(stars);
      return;
    }

    const types: AmbientItem['type'][] = ['petal', 'heart', 'butterfly', 'star', 'sparkle', 'leaf'];
    const generated: AmbientItem[] = [];

    for (let i = 0; i < 28; i++) {
      const type = types[Math.floor(Math.random() * types.length)];
      let colorList: string[] = petalColors;
      if (type === 'heart') colorList = heartColors;
      else if (type === 'butterfly') colorList = butterflyColors;
      else if (type === 'star') colorList = starColors;
      else if (type === 'sparkle') colorList = sparkleColors;
      else if (type === 'leaf') colorList = leafColors;

      generated.push({
        id: ambientId++,
        type,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 10 + Math.random() * 20,
        duration: 6 + Math.random() * 10,
        delay: Math.random() * 8,
        rotation: Math.random() * 360,
        color: colorList[Math.floor(Math.random() * colorList.length)],
        drift: (Math.random() - 0.5) * 40,
      });
    }

    setItems(generated);
  }, []);

  const renderItem = (item: AmbientItem) => {
    const baseStyle: React.CSSProperties = {
      position: 'absolute',
      left: `${item.x}%`,
      top: `${item.y}%`,
      fontSize: `${item.size}px`,
      color: item.color,
      pointerEvents: 'none',
      opacity: 0,
      willChange: 'transform, opacity',
    };

    if (item.type === 'petal') {
      return (
        <div key={item.id} style={baseStyle} className="animate-float-up" >
          <span
            style={{
              display: 'inline-block',
              animation: `fallPetal ${item.duration}s ease-in-out ${item.delay}s infinite`,
            }}
          >
            ❀
          </span>
          <style>{`
            @keyframes fallPetal {
              0% { opacity: 0; transform: translateY(-20px) rotate(0deg); }
              10% { opacity: 0.7; }
              90% { opacity: 0.7; }
              100% { opacity: 0; transform: translateY(100vh) rotate(${item.rotation}deg) translateX(${item.drift}px); }
            }
          `}</style>
        </div>
      );
    }

    if (item.type === 'heart') {
      return (
        <div key={item.id} style={baseStyle}>
          <span
            style={{
              display: 'inline-block',
              animation: `floatHeart ${item.duration}s ease-in-out ${item.delay}s infinite`,
            }}
          >
            ♡
          </span>
          <style>{`
            @keyframes floatHeart {
              0%, 100% { opacity: 0; transform: translateY(0) scale(0.8); }
              50% { opacity: 0.6; transform: translateY(-30px) scale(1); }
            }
          `}</style>
        </div>
      );
    }

    if (item.type === 'butterfly') {
      return (
        <div key={item.id} style={baseStyle}>
          <span
            style={{
              display: 'inline-block',
              animation: `flyButterfly ${item.duration}s ease-in-out ${item.delay}s infinite`,
            }}
          >
            🦋
          </span>
          <style>{`
            @keyframes flyButterfly {
              0% { opacity: 0; transform: translate(0, 0) rotate(0deg); }
              25% { opacity: 0.7; transform: translate(${item.drift}px, -40px) rotate(15deg); }
              50% { opacity: 0.7; transform: translate(${item.drift * 2}px, -80px) rotate(-10deg); }
              75% { opacity: 0.7; transform: translate(${item.drift}px, -120px) rotate(10deg); }
              100% { opacity: 0; transform: translate(0, -160px) rotate(0deg); }
            }
          `}</style>
        </div>
      );
    }

    if (item.type === 'star') {
      return (
        <div key={item.id} style={baseStyle}>
          <span
            style={{
              display: 'inline-block',
              animation: `twinkleStar ${item.duration}s ease-in-out ${item.delay}s infinite`,
            }}
          >
            ★
          </span>
          <style>{`
            @keyframes twinkleStar {
              0%, 100% { opacity: 0.2; transform: scale(0.6) rotate(0deg); }
              50% { opacity: 0.9; transform: scale(1.1) rotate(180deg); }
            }
          `}</style>
        </div>
      );
    }

    if (item.type === 'sparkle') {
      return (
        <div key={item.id} style={baseStyle}>
          <span
            style={{
              display: 'inline-block',
              animation: `sparkleAnim ${item.duration}s ease-in-out ${item.delay}s infinite`,
            }}
          >
            ✦
          </span>
          <style>{`
            @keyframes sparkleAnim {
              0%, 100% { opacity: 0; transform: scale(0); }
              50% { opacity: 0.8; transform: scale(1) rotate(90deg); }
            }
          `}</style>
        </div>
      );
    }

    // leaf
    return (
      <div key={item.id} style={baseStyle}>
        <span
          style={{
            display: 'inline-block',
            animation: `swayLeaf ${item.duration}s ease-in-out ${item.delay}s infinite`,
          }}
        >
          🍃
        </span>
        <style>{`
          @keyframes swayLeaf {
            0%, 100% { opacity: 0.4; transform: rotate(-15deg) translateX(0); }
            50% { opacity: 0.6; transform: rotate(15deg) translateX(${item.drift}px); }
          }
        `}</style>
      </div>
    );
  };

  return (
    <div
      className="fixed inset-0 pointer-events-none z-30 overflow-hidden"
      aria-hidden="true"
    >
      {items.map(renderItem)}
    </div>
  );
}
