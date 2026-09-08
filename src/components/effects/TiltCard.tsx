import React, { useRef, useState, useCallback, type ReactNode } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from 'motion/react';
import { cn } from '@/src/lib/utils';
import { prefersReducedMotion } from '@/src/lib/motion';

export interface TiltCardProps {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  tiltIntensity?: number;
  glowIntensity?: number;
  perspective?: number;
  scaleOnHover?: number;
  borderRadius?: string;
  onClick?: () => void;
}

export function TiltCard({
  children,
  className,
  containerClassName,
  tiltIntensity = 12,
  glowIntensity = 0.18,
  perspective = 1000,
  scaleOnHover = 1.02,
  borderRadius = '1.5rem',
  onClick,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Normalized cursor coordinates (-0.5 to 0.5)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Position for radial glow in percentage (0% to 100%)
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);

  // Spring physics for natural smooth rotation & reset
  const springConfig = { damping: 25, stiffness: 260, mass: 0.45 };
  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [tiltIntensity, -tiltIntensity]),
    springConfig
  );
  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-tiltIntensity, tiltIntensity]),
    springConfig
  );
  const scale = useSpring(1, springConfig);

  // Dynamic glow brightness spring
  const glowOpacity = useSpring(0, { damping: 20, stiffness: 200 });

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (prefersReducedMotion() || !cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();

      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      // Update normalized values centered at 0
      mouseX.set(x - 0.5);
      mouseY.set(y - 0.5);

      // Update glare coordinates
      glareX.set(x * 100);
      glareY.set(y * 100);
    },
    [mouseX, mouseY, glareX, glareY]
  );

  const handlePointerEnter = useCallback(() => {
    if (prefersReducedMotion()) return;
    setIsHovered(true);
    glowOpacity.set(glowIntensity);
    scale.set(scaleOnHover);
  }, [glowOpacity, scale, glowIntensity, scaleOnHover]);

  const handlePointerLeave = useCallback(() => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
    glareX.set(50);
    glareY.set(50);
    glowOpacity.set(0);
    scale.set(1);
  }, [mouseX, mouseY, glareX, glareY, glowOpacity, scale]);

  // Dynamic motion template for radial spotlight reflection
  const radialGlare = useMotionTemplate`radial-gradient(650px circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, ${glowOpacity}), transparent 65%)`;

  // Dynamic linear sheen based on tilt angle
  const sheenGradient = useMotionTemplate`linear-gradient(${useTransform(
    rotateY,
    [-tiltIntensity, tiltIntensity],
    [105, 145]
  )}deg, rgba(255, 255, 255, ${useTransform(
    glowOpacity,
    (v) => v * 0.6
  )}) 0%, transparent 60%)`;

  return (
    <div
      className={cn('relative w-full h-full select-none', containerClassName)}
      style={{ perspective: `${perspective}px` }}
      onClick={onClick}
    >
      <motion.div
        ref={cardRef}
        onPointerMove={handlePointerMove}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        style={{
          rotateX,
          rotateY,
          scale,
          transformStyle: 'preserve-3d',
          transformPerspective: perspective,
          borderRadius,
        }}
        className={cn(
          'relative w-full h-full overflow-hidden transition-shadow duration-500 will-change-transform',
          isHovered
            ? 'shadow-[0_24px_50px_-12px_rgba(0,0,0,0.8),0_0_25px_rgba(255,255,255,0.06)]'
            : 'shadow-[0_10px_30px_-15px_rgba(0,0,0,0.5)]',
          className
        )}
      >
        {/* Dynamic Light Reflection & Spotlight Overlays */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-30 transition-opacity duration-300"
          style={{
            background: radialGlare,
            borderRadius,
          }}
          aria-hidden="true"
        />

        <motion.div
          className="pointer-events-none absolute inset-0 z-30 transition-opacity duration-300"
          style={{
            background: sheenGradient,
            borderRadius,
          }}
          aria-hidden="true"
        />

        {/* Dynamic Border Glow on Hover */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] border transition-colors duration-300"
          style={{
            borderColor: isHovered
              ? 'rgba(255, 255, 255, 0.28)'
              : 'rgba(255, 255, 255, 0.1)',
          }}
          aria-hidden="true"
        />

        {/* Card Content with 3D Depth support */}
        <div className="relative z-10 w-full h-full [transform-style:preserve-3d]">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
