import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeartIcon, SparklesIcon } from '@heroicons/react/24/solid';

interface Quote {
  text: string;
  author?: string;
}

interface LoveCardProps {
  quote: Quote | null;
  isLoading: boolean;
  onRefresh: () => void;
}

export const LoveCard = ({ quote, isLoading, onRefresh }: LoveCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="w-full max-w-[280px] mx-auto px-2">
      <motion.div
        className="relative perspective-1000"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div
          className="cursor-pointer transform-style-3d"
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loading"
                className="bg-[#FFC0CB] rounded-xl p-5 shadow-[0_4px_12px_rgba(0,0,0,0.1)] min-h-[160px] flex items-center justify-center transform hover:scale-102 transition-transform duration-300"
                initial={{ rotateY: 0, opacity: 0 }}
                animate={{ rotateY: 360, opacity: 1 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              >
                <div className="relative">
                  <SparklesIcon className="w-6 h-6 text-white animate-pulse" />
                  <motion.div
                    className="absolute inset-0"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <SparklesIcon className="w-3 h-3 text-white/80" />
                  </motion.div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="content"
                className={`${isFlipped ? 'bg-white/95' : 'bg-[#FFC0CB]'} rounded-xl p-5 shadow-[0_4px_12px_rgba(0,0,0,0.1)] min-h-[160px] transform hover:scale-102 transition-all duration-300`}
                initial={{ rotateY: isFlipped ? 180 : 0 }}
                animate={{ rotateY: isFlipped ? 0 : 180 }}
                transition={{ duration: 0.6 }}
                style={{
                  transformStyle: 'preserve-3d'
                }}
              >
                <div className={`text-center relative ${isFlipped ? '' : 'rotate-y-180'}`} style={{ backfaceVisibility: 'hidden' }}>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <p className={`font-pacifico text-lg leading-relaxed mb-3 ${isFlipped ? 'text-[#FF69B4]' : 'text-white'}`}>
                      {!isFlipped ? '💝 Tap to reveal' : quote?.text}
                    </p>
                    {isFlipped && quote?.author && (
                      <p className="font-poppins text-xs text-gray-600/80 mt-2 italic">
                        — {quote.author}
                      </p>
                    )}
                  </motion.div>
                  
                  {/* Decorative elements */}
                  <motion.div
                    className="absolute -top-1 -left-1"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <SparklesIcon className={`w-4 h-4 ${isFlipped ? 'text-[#FF69B4]/30' : 'text-white/30'}`} />
                  </motion.div>
                  <motion.div
                    className="absolute -bottom-1 -right-1"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <SparklesIcon className={`w-4 h-4 ${isFlipped ? 'text-[#FF69B4]/30' : 'text-white/30'}`} />
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Floating hearts */}
        {isFlipped && !isLoading && (
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.5 }}
              animate={{ opacity: [0, 1, 0], y: -20, scale: 0.4 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="flex space-x-1"
            >
              {[...Array(3)].map((_, i) => (
                <HeartIcon
                  key={i}
                  className="w-2 h-2 text-[#FF69B4]"
                  style={{
                    filter: "drop-shadow(0 0 4px rgba(255,105,180,0.3))",
                  }}
                />
              ))}
            </motion.div>
          </div>
        )}
      </motion.div>

      <motion.button
        className="mt-5 px-5 py-2 bg-[#FF69B4] hover:bg-[#FF1493] text-white rounded-full font-poppins text-xs shadow-md flex items-center justify-center mx-auto group transition-all duration-300"
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={onRefresh}
      >
        <SparklesIcon className="w-3.5 h-3.5 mr-1.5 group-hover:rotate-180 transition-transform duration-500" />
        <span className="relative">
          New Love Note
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white/30 scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
        </span>
      </motion.button>
    </div>
  );
};