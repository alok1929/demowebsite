import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export const SparklesCore = (props: {
  id?: string;
  background?: string;
  minSize?: number;
  maxSize?: number;
  particleDensity?: number;
  className?: string;
  particleColor?: string;
}) => {
  const {
    id = "tsparticles",
    background = "transparent",
    minSize = 0.6,
    maxSize = 1.4,
    particleDensity = 100,
    className = "",
    particleColor = "#FFFFFF"
  } = props;
  
  const [particles, setParticles] = useState<Array<{ x: number; y: number; size: number }>>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const createParticles = () => {
      if (!containerRef.current) return;

      const { width, height } = containerRef.current.getBoundingClientRect();
      const particleCount = Math.floor((width * height) / (10000 / particleDensity));
      
      const newParticles = Array.from({ length: particleCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * (maxSize - minSize) + minSize
      }));

      setParticles(newParticles);
    };

    createParticles();
    window.addEventListener('resize', createParticles);

    return () => window.removeEventListener('resize', createParticles);
  }, [maxSize, minSize, particleDensity]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        position: "relative",
        background,
        overflow: "hidden"
      }}
    >
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          animate={{
            x: [particle.x - 10, particle.x + 10],
            y: [particle.y - 10, particle.y + 10],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: Math.random() * 2 + 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            width: particle.size,
            height: particle.size,
            borderRadius: "50%",
            backgroundColor: particleColor,
            left: particle.x,
            top: particle.y,
          }}
        />
      ))}
    </div>
  );
};