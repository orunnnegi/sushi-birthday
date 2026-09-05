import { useCallback, useRef } from 'react';

export type ParticleType = 'heart' | 'sparkle' | 'flower' | 'star' | 'butterfly';

export interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  vr: number;
  scale: number;
  type: ParticleType;
  color: string;
  life: number;
  maxLife: number;
}

const colors: Record<ParticleType, string[]> = {
  heart: ['#f95a9c', '#e6407f', '#ff9ec5', '#c92e64'],
  sparkle: ['#fde68a', '#fbbf24', '#fff8ec', '#fcd34d'],
  flower: ['#ff9ec5', '#c899ff', '#ff7ab3', '#88c888'],
  star: ['#fde68a', '#fff8ec', '#fbbf24', '#8ab0ff'],
  butterfly: ['#c899ff', '#ff9ec5', '#8ab0ff', '#b073ff'],
};

let particleId = 0;

export function useParticles() {
  const particlesRef = useRef<Particle[]>([]);
  const frameRef = useRef<number>(0);
  const rafRef = useRef<number | null>(null);

  const spawn = useCallback(
    (
      x: number,
      y: number,
      type: ParticleType,
      count: number = 12,
      opts?: { spread?: number; speed?: number }
    ) => {
      const spread = opts?.spread ?? Math.PI * 2;
      const speed = opts?.speed ?? 1;
      const baseAngle = -Math.PI / 2;
      for (let i = 0; i < count; i++) {
        const angle = baseAngle + (Math.random() - 0.5) * spread;
        const v = (1 + Math.random() * 3) * speed;
        const colorList = colors[type];
        particlesRef.current.push({
          id: particleId++,
          x,
          y,
          vx: Math.cos(angle) * v * 2,
          vy: Math.sin(angle) * v * 2 - 1,
          rotation: Math.random() * 360,
          vr: (Math.random() - 0.5) * 10,
          scale: 0.5 + Math.random() * 0.8,
          type,
          color: colorList[Math.floor(Math.random() * colorList.length)],
          life: 0,
          maxLife: 60 + Math.random() * 40,
        });
      }
    },
    []
  );

  return { particlesRef, frameRef, rafRef, spawn };
}

export const particleEmoji: Record<ParticleType, string> = {
  heart: '♡',
  sparkle: '✦',
  flower: '✿',
  star: '★',
  butterfly: '🦋',
};
