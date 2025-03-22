
import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { Slider } from '@/components/ui/slider';

interface VolumeControlProps {
  volume: number;
  setVolume: (volume: number) => void;
}

const VolumeControl: React.FC<VolumeControlProps> = ({ volume, setVolume }) => {
  return (
    <div className="flex items-center space-x-2">
      <VolumeX className="h-4 w-4" />
      <Slider 
        value={[volume * 100]} 
        onValueChange={(value) => setVolume(value[0] / 100)}
        max={100}
        step={1}
        className="w-40"
      />
      <Volume2 className="h-4 w-4" />
    </div>
  );
};

export default VolumeControl;
