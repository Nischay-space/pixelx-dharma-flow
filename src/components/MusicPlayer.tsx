
import React, { useState, useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, Volume2 } from "lucide-react";

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState([0.5]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value);
    if (audioRef.current) {
      audioRef.current.volume = value[0];
    }
  };

  return (
    <Card className="w-full bg-dharma-purple bg-opacity-10 border-dharma-purple border-opacity-20">
      <CardContent className="p-6">
        <div className="flex flex-col items-center space-y-4">
          <audio
            ref={audioRef}
            src="https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3"
            loop
          />
          
          <h3 className="font-pixel text-xl mb-2 text-dharma-purple">Meditation Music</h3>
          
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={togglePlay}
              className="h-12 w-12"
            >
              {isPlaying ? (
                <Pause className="h-6 w-6" />
              ) : (
                <Play className="h-6 w-6" />
              )}
            </Button>
            
            <div className="flex items-center gap-2 min-w-[200px]">
              <Volume2 className="h-5 w-5 text-dharma-purple" />
              <Slider
                value={volume}
                onValueChange={handleVolumeChange}
                max={1}
                step={0.1}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MusicPlayer;
