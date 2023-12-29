import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const CYCLES_PER_LETTER = 2;
const SHUFFLE_TIME = 50;
const ANIMATION_INTERVAL = 5000; // 5 seconds

const CHARS = "!@#$%^&*():{};|,.<>/?";

interface EncryptButtonProps {
  targetText: string;
  handleClick: () => void;
  logo: React.ReactElement; // Change this line
}

const EncryptButton: React.FC<EncryptButtonProps> = ({ targetText, handleClick, logo }) => {
  const [text, setText] = useState<string>(targetText);
  const scrambleIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const scramble = () => {
    let pos = 0;
    scrambleIntervalRef.current = setInterval(() => {
      if (pos >= targetText.length * CYCLES_PER_LETTER) {
        if (scrambleIntervalRef.current) {
          clearInterval(scrambleIntervalRef.current);
        }
        setText(targetText);
        return;
      }

      const scrambled = targetText.split("")
        .map((char, index) => {
          if (pos / CYCLES_PER_LETTER > index) {
            return char;
          }
          const randomCharIndex = Math.floor(Math.random() * CHARS.length);
          return CHARS[randomCharIndex];
        })
        .join("");

      setText(scrambled);
      pos++;
    }, SHUFFLE_TIME);
  };

  useEffect(() => {
    const animationInterval = setInterval(scramble, ANIMATION_INTERVAL);

    return () => {
      clearInterval(animationInterval);
      if (scrambleIntervalRef.current) {
        clearInterval(scrambleIntervalRef.current);
      }
    };
  }, []);

  return (
    <motion.button
      onClick={handleClick} // Add this line
      whileHover={{ scale: 1.025 }}
      whileTap={{ scale: 0.975 }}
      className="group relative overflow-hidden rounded-lg border-[1px] border-slate-500 px-4 py-2 font-mono font-medium text-slate-300 transition-colors bg-indigo-500 hover:bg-indigo-500"
    >
      <div className="relative z-10 flex items-center gap-2">
      {logo} 
      <span>{text}</span>
      </div>
      <motion.span
        initial={{ y: "100%" }}
        animate={{ y: "-100%" }}
        transition={{
          repeat: Infinity,
          repeatType: "mirror",
          duration: 1,
          ease: "linear",
        }}
        className="duration-300 absolute inset-0 z-0 scale-125 bg-gradient-to-t from-indigo-400/0 from-40% via-indigo-400/100 to-indigo-400/0 to-60% opacity-0 transition-opacity group-hover:opacity-100"
      />
    </motion.button>
  );
};

export default EncryptButton;
