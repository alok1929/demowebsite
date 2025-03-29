import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

export const BackgroundGradient = ({
  children,
  className,
  containerClassName,
  animate = true,
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  animate?: boolean;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState<number>(0);
  const [scale, setScale] = useState<number>(1);

  useEffect(() => {
    if (!animate) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      setPosition({ x, y });
      setOpacity(1);
    };

    const handleMouseLeave = () => {
      setOpacity(0);
      setScale(1);
    };

    const handleMouseDown = () => {
      setScale(0.98);
    };

    const handleMouseUp = () => {
      setScale(1);
    };

    const currentRef = containerRef.current;
    
    if (currentRef) {
      currentRef.addEventListener("mousemove", handleMouseMove);
      currentRef.addEventListener("mouseleave", handleMouseLeave);
      currentRef.addEventListener("mousedown", handleMouseDown);
      currentRef.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener("mousemove", handleMouseMove);
        currentRef.removeEventListener("mouseleave", handleMouseLeave);
        currentRef.removeEventListener("mousedown", handleMouseDown);
        currentRef.removeEventListener("mouseup", handleMouseUp);
      }
    };
  }, [animate]);

  const Background = () => {
    return (
      <div
        className={cn(
          "absolute inset-0 transform-gpu bg-gradient-to-br from-indigo-500 to-violet-500 blur-2xl transition-opacity duration-500",
          containerClassName
        )}
        style={{
          opacity: opacity * 0.4,
          transform: `translate(${position.x * 0.1}px, ${position.y * 0.1}px)`,
        }}
      />
    );
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full h-full rounded-lg p-[1px] overflow-hidden",
        className
      )}
    >
      <Background />
      <div
        className="relative flex w-full h-full flex-col overflow-hidden rounded-lg bg-gradient-to-b from-zinc-900/80 to-zinc-900/80 backdrop-blur-3xl"
        style={{
          transform: `scale(${scale})`,
          transition: "transform 0.2s",
        }}
      >
        {children}
      </div>
    </div>
  );
};