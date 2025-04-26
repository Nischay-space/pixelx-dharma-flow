
import React, { useState, useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, Volume2, Music2, Upload } from "lucide-react";
import { defaultTracks, type MeditationTrack } from '@/data/meditationTracks';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState([0.5]);
  const [currentTrack, setCurrentTrack] = useState<MeditationTrack>(defaultTracks[0]);
  const [customTracks, setCustomTracks] = useState<MeditationTrack[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleTrackChange = (track: MeditationTrack) => {
    setIsPlaying(false);
    setCurrentTrack(track);
    if (audioRef.current) {
      audioRef.current.load();
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'audio/mpeg') {
      const url = URL.createObjectURL(file);
      const newTrack: MeditationTrack = {
        id: `custom-${Date.now()}`,
        title: file.name.replace('.mp3', ''),
        url,
        type: 'custom'
      };
      setCustomTracks(prev => [...prev, newTrack]);
      handleTrackChange(newTrack);
    }
  };

  return (
    <Card className="w-full bg-dharma-purple bg-opacity-10 border-dharma-purple border-opacity-20">
      <CardContent className="p-6">
        <div className="flex flex-col items-center space-y-4">
          <audio
            ref={audioRef}
            src={currentTrack.url}
            loop
          />
          
          <div className="w-full">
            <h3 className="font-pixel text-xl mb-4 text-dharma-purple">Meditation Music</h3>
            
            <div className="grid grid-cols-2 gap-2 mb-4 max-h-32 overflow-y-auto">
              {defaultTracks.map((track) => (
                <Button
                  key={track.id}
                  variant={currentTrack.id === track.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleTrackChange(track)}
                  className="justify-start"
                >
                  <Music2 className="mr-2 h-4 w-4" />
                  {track.title}
                </Button>
              ))}
              {customTracks.map((track) => (
                <Button
                  key={track.id}
                  variant={currentTrack.id === track.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleTrackChange(track)}
                  className="justify-start"
                >
                  <Music2 className="mr-2 h-4 w-4" />
                  {track.title}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="flex items-center gap-4 w-full">
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
            
            <div className="flex items-center gap-2 flex-1">
              <Volume2 className="h-5 w-5 text-dharma-purple" />
              <Slider
                value={volume}
                onValueChange={handleVolumeChange}
                max={1}
                step={0.1}
                className="w-full"
              />
            </div>
            
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="audio/mpeg"
              className="hidden"
            />
            
            <Button
              variant="outline"
              size="icon"
              onClick={() => fileInputRef.current?.click()}
              className="h-12 w-12"
            >
              <Upload className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MusicPlayer;
