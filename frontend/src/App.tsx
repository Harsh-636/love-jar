import { useState, useEffect } from 'react';
import { LoveCard } from './components/LoveCard';
import '@fontsource/poppins';
import '@fontsource/pacifico';
import { motion } from 'framer-motion';

interface Quote {
  text: string;
  author?: string;
}

function App() {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchQuote = async () => {
    setIsLoading(true);
    try {
      // This will be replaced with your actual API endpoint
      const response = await fetch('/api/quote');
      const data = await response.json();
      setQuote(data);
    } catch (error) {
      // Fallback quote if API is not ready
      setQuote({
        text: "You make my heart smile every single day! 💖",
        author: "Harsh"
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#FFB6C1] via-[#FFE4E1] to-[#E6E6FA] flex items-center justify-center">
      {/* Decorative background elements - smaller and more subtle */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-5%] left-[-5%] w-[30%] h-[30%] rounded-full bg-pink-200/20 blur-2xl animate-float" />
        <div className="absolute bottom-[-5%] right-[-5%] w-[30%] h-[30%] rounded-full bg-purple-200/20 blur-2xl animate-float-delayed" />
        <div className="absolute top-[30%] right-[10%] w-[15%] h-[15%] rounded-full bg-blue-200/20 blur-2xl animate-float" />
      </div>

      {/* Content - more compact for mobile */}
      <div className="w-full max-w-lg mx-auto px-4 py-8 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full text-center mb-8 relative"
        >
          <div className="absolute inset-x-0 -inset-y-4 bg-[#FFDAB9]/40 rounded-2xl transform rotate-1" />
          <div className="absolute inset-x-0 -inset-y-4 bg-[#FFDAB9]/40 rounded-2xl transform -rotate-1" />
          <div className="relative py-4">
            <h1 className="font-pacifico text-3xl sm:text-4xl text-[#FF1493] mb-3">
              💌 A Little Love Note
            </h1>
            <p className="font-poppins text-sm sm:text-base text-gray-600 italic">
              for the one who makes my heart flutter
            </p>
          </div>
        </motion.div>
        
        <LoveCard
          quote={quote}
          isLoading={isLoading}
          onRefresh={fetchQuote}
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-4 text-center text-xs sm:text-sm text-gray-500/80 font-poppins"
        >
          Tap the card to reveal your love note 💝
        </motion.div>
      </div>
    </div>
  );
}

export default App;