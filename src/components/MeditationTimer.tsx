
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw, Maximize2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";

const MeditationTimer: React.FC = () => {
  const [duration, setDuration] = useState(300); // 5 minutes in seconds
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isActive, setIsActive] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft]);
  
  const toggleTimer = () => {
    setIsActive(!isActive);
  };
  
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(duration);
  };
  
  const handleDurationChange = (value: number[]) => {
    const newDuration = value[0] * 60;
    setDuration(newDuration);
    if (!isActive) {
      setTimeLeft(newDuration);
    }
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const containerClass = isFullscreen 
    ? "fixed inset-0 z-50 flex items-center justify-center bg-background"
    : "";
  
  return (
    <Card className={`w-full bg-dharma-purple bg-opacity-10 border-dharma-purple border-opacity-20 ${containerClass}`}>
      <CardContent className="p-6">
        <div className="flex flex-col items-center">
          <h3 className="font-pixel text-xl mb-6 text-dharma-purple">Meditation Timer</h3>
          
          <div className="font-pixel text-4xl font-bold text-dharma-dark mb-8">
            {formatTime(timeLeft)}
          </div>
          
          <div className="w-full max-w-xs mb-8">
            <p className="text-sm text-dharma-dark opacity-70 mb-2">Duration (minutes):</p>
            <Slider
              disabled={isActive}
              value={[duration / 60]}
              max={60}
              min={1}
              step={1}
              onValueChange={handleDurationChange}
              className="mb-2"
            />
            <div className="flex justify-between text-xs text-dharma-dark opacity-50">
              <span>1m</span>
              <span>30m</span>
              <span>60m</span>
            </div>
          </div>
          
          <div className="flex gap-4">
            <Button
              onClick={toggleTimer}
              variant="default"
              className="bg-dharma-purple hover:bg-dharma-purple/90"
              size="lg"
            >
              {isActive ? <Pause size={20} /> : <Play size={20} />}
              <span className="ml-2">{isActive ? 'Pause' : 'Start'}</span>
            </Button>
            
            <Button
              onClick={resetTimer}
              variant="outline"
              size="lg"
            >
              <RotateCcw size={18} />
              <span className="ml-2">Reset</span>
            </Button>

            <Button
              onClick={toggleFullscreen}
              variant="outline"
              size="lg"
            >
              <Maximize2 size={18} />
              <span className="ml-2">Fullscreen</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MeditationTimer;
