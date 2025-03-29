import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const TextGenerateEffect = ({ words }: { words: string }) => {
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setComplete(true);
    }, 1500);
    return () => clearTimeout(timeout);
  }, []);

  const characters = words.split("").map((char, index) => (
    <motion.span
      key={index}
      initial={{ opacity: 0, y: 50 }}
      animate={complete ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.3,
        delay: index * 0.05,
        type: "spring",
        damping: 10,
        stiffness: 100,
      }}
      className="inline-block"
    >
      {char}
    </motion.span>
  ));

  return (
    <h2 className="text-2xl font-bold text-white tracking-tight">
      {characters}
    </h2>
  );
};