import { motion } from "framer-motion";
import { FlipWords } from "./flip-words";

export function GlowingStarsTitle() {
  const words = "Build Intelligent AI Agents".split(" ");
  const flipWords = [
    "Autonomous",
    "Intelligent",
    "Scalable",
    "Secure",
    "Powerful"
  ];
  
  return (
    <motion.div 
      className="text-center max-w-4xl mx-auto px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Logo Section */}
      <motion.div
        className="mb-8"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <img 
          src="https://raw.githubusercontent.com/yourusername/yourrepo/main/framewise-logo.png" 
          alt="Framewise.ai" 
          className="h-16 mx-auto mb-4"
        />
        <h2 className="text-2xl font-semibold text-emerald-400 mb-2">Framewise.ai</h2>
      </motion.div>

      {/* Title Section */}
      <div className="relative mb-6">
        <div className="absolute -inset-2 blur-lg bg-gradient-to-r from-emerald-600 to-cyan-600 opacity-30 rounded-lg" />
        <h1 className="relative text-4xl md:text-6xl lg:text-7xl font-bold pb-4">
          {words.map((word, i) => (
            <motion.span
              key={i}
              className="inline-block mr-3"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                delay: i * 0.1,
                duration: 0.5,
                type: "spring",
                stiffness: 100
              }}
            >
              {word}
            </motion.span>
          ))}
        </h1>
      </div>

      <FlipWords 
        words={flipWords}
        className="text-xl md:text-2xl font-bold h-[2em] mb-4"
      />

      <motion.p
        className="text-neutral-300 text-xl md:text-2xl mt-4 max-w-2xl mx-auto"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        Enterprise-ready infrastructure for autonomous AI systems
      </motion.p>

      <motion.div
        className="mt-8 flex gap-4 justify-center"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        <button className="px-6 py-3 bg-emerald-500 text-white rounded-lg font-semibold hover:bg-emerald-600 transition-colors">
          Get Started
        </button>
        <button className="px-6 py-3 bg-transparent border border-emerald-500 text-emerald-500 rounded-lg font-semibold hover:bg-emerald-500/10 transition-colors">
          Documentation
        </button>
      </motion.div>
    </motion.div>
  );
}