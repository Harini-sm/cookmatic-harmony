
import React from 'react';
import { Volume2, VolumeX, Pause, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PlaybackControlsProps {
  isPlaying: boolean;
  onPause: () => void;
  onResume: () => void;
  onStart: () => void;
  onStop: () => void;
}

const PlaybackControls: React.FC<PlaybackControlsProps> = ({
  isPlaying,
  onPause,
  onResume,
  onStart,
  onStop
}) => {
  return (
    <div className="flex items-center space-x-2">
      {isPlaying ? (
        <Button variant="outline" size="sm" onClick={onPause}>
          <Pause className="h-4 w-4 mr-2" />
          Pause
        </Button>
      ) : (
        <Button variant="outline" size="sm" onClick={onResume}>
          <Play className="h-4 w-4 mr-2" />
          Resume
        </Button>
      )}
      <Button variant="default" size="sm" onClick={onStart}>
        <Volume2 className="h-4 w-4 mr-2" />
        Start
      </Button>
      <Button variant="ghost" size="sm" onClick={onStop}>
        <VolumeX className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default PlaybackControls;
