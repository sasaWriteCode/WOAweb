import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 2;
      });
    }, 30);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-cream"
    >
      <div className="relative w-32 h-32">
        {/* Seed to Sprout Animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-terracotta rounded-full"
        />
        <motion.svg
          viewBox="0 0 100 100"
          className="absolute inset-0 w-full h-full"
        >
          <motion.path
            d="M50 80 Q50 40 50 20"
            fill="none"
            stroke="#4A6741"
            strokeWidth="4"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: progress / 100 }}
          />
          {progress > 50 && (
            <motion.path
              d="M50 40 Q70 30 80 40"
              fill="none"
              stroke="#6B8F5E"
              strokeWidth="4"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: (progress - 50) / 50 }}
            />
          )}
          {progress > 70 && (
            <motion.path
              d="M50 30 Q30 20 20 30"
              fill="none"
              stroke="#6B8F5E"
              strokeWidth="4"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: (progress - 70) / 30 }}
            />
          )}
        </motion.svg>
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-8 font-mono text-xs uppercase tracking-widest text-forest-deep"
      >
        Whispering to the soil... {progress}%
      </motion.p>
    </motion.div>
  );
}
