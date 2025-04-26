import React, { useState } from 'react';
import Navbar from "@/components/Navbar";
import QuoteCard from "@/components/QuoteCard";
import MeditationTimer from "@/components/MeditationTimer";
import PixelVisualization from "@/components/PixelVisualization";
import { Button } from "@/components/ui/button";
import { ArrowDown, RefreshCw } from "lucide-react";

const dailyQuotes = [
  {
    quote: "Peace comes from within. Do not seek it without.",
    author: "Buddha"
  },
  {
    quote: "The mind is everything. What you think you become.",
    author: "Buddha"
  },
  {
    quote: "Holding on to anger is like grasping a hot coal with the intent of throwing it at someone else; you are the one who gets burned.",
    author: "Buddha"
  },
  {
    quote: "Three things cannot be long hidden: the sun, the moon, and the truth.",
    author: "Buddha"
  },
  {
    quote: "Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.",
    author: "Buddha"
  }
];

const Index = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(
    Math.floor(Math.random() * dailyQuotes.length)
  );
  
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };
  
  const handleNewQuote = () => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * dailyQuotes.length);
    } while (newIndex === currentQuoteIndex);
    setCurrentQuoteIndex(newIndex);
  };

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'dark' : ''}`}>
      <Navbar toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
      
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center px-6 py-16 md:py-24 bg-gradient-to-b from-dharma-light-purple to-white dark:from-dharma-dark dark:to-dharma-dark/80 breathing-bg">
        <div className="container max-w-4xl">
          <div className="text-center mb-16">
            <h1 className="font-pixel text-4xl md:text-6xl mb-4 text-dharma-purple animate-float">
              Pixel<span className="text-dharma-dark dark:text-white">Dharma</span>
            </h1>
            <p className="text-lg md:text-xl text-dharma-dark/80 dark:text-white/80 max-w-xl mx-auto">
              Find inner peace and mindfulness through pixel art meditation and dharma wisdom
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="flex flex-col space-y-6">
              <h2 className="font-pixel text-2xl text-dharma-dark dark:text-white">Today's Wisdom</h2>
              <QuoteCard quote={dailyQuotes[currentQuoteIndex].quote} author={dailyQuotes[currentQuoteIndex].author} />
              <div className="flex justify-center mt-4">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleNewQuote}
                  className="flex items-center gap-2"
                >
                  <RefreshCw size={16} />
                  New Quote
                </Button>
              </div>
            </div>
            
            <div className="flex flex-col space-y-6">
              <h2 className="font-pixel text-2xl text-dharma-dark dark:text-white">Meditation</h2>
              <MeditationTimer />
            </div>
          </div>
          
          <div className="mt-12 mb-6 text-center">
            <h2 className="font-pixel text-2xl mb-6 text-dharma-dark dark:text-white">Visual Dharma</h2>
            <PixelVisualization isActive={isTimerActive} />
            <p className="mt-4 text-sm text-dharma-dark/60 dark:text-white/60">
              A pixel art lotus flower, symbolizing purity and enlightenment
            </p>
          </div>
          
          <div className="flex justify-center mt-16">
            <Button variant="ghost" size="lg" className="animate-pulse-gentle">
              <ArrowDown size={20} className="mr-2" />
              Explore More
            </Button>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-dharma-peach/20 dark:bg-dharma-dark/90">
        <div className="container max-w-4xl px-6">
          <h2 className="font-pixel text-3xl text-center mb-12 text-dharma-dark dark:text-white">Begin Your Journey</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white dark:bg-dharma-dark/50 p-6 rounded-lg shadow-sm">
              <div className="font-pixel text-2xl mb-2 text-dharma-purple">Learn</div>
              <p className="text-dharma-dark/80 dark:text-white/80">
                Discover ancient wisdom and contemporary dharma teachings
              </p>
            </div>
            
            <div className="bg-white dark:bg-dharma-dark/50 p-6 rounded-lg shadow-sm">
              <div className="font-pixel text-2xl mb-2 text-dharma-purple">Practice</div>
              <p className="text-dharma-dark/80 dark:text-white/80">
                Build a daily meditation habit with guided sessions
              </p>
            </div>
            
            <div className="bg-white dark:bg-dharma-dark/50 p-6 rounded-lg shadow-sm">
              <div className="font-pixel text-2xl mb-2 text-dharma-purple">Transform</div>
              <p className="text-dharma-dark/80 dark:text-white/80">
                Apply mindfulness principles to everyday life
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 bg-white dark:bg-dharma-dark text-center">
        <div className="container">
          <p className="text-dharma-dark/60 dark:text-white/60 text-sm">
            PixelX Dharma Flow • A Mindfulness Journey
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
