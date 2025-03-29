import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export const FlipWords = ({
  words,
  className = "",
  duration = 2000,
}: {
  words: string[];
  className?: string;
  duration?: number;
}) => {
  const [index, setIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, duration);
    
    return () => clearInterval(interval);
  }, [words.length, duration]);

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ rotateX: 90, opacity: 0 }}
          animate={{ rotateX: 0, opacity: 1 }}
          exit={{ rotateX: -90, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="text-center"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-cyan-500">
            {words[index]}
          </span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};