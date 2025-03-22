
import React from 'react';
import { Select } from '@/components/ui/select';

interface VoiceOptionsProps {
  selectedVoice: string;
  onVoiceChange: (voiceName: string) => void;
  availableVoices: SpeechSynthesisVoice[];
}

const VoiceOptions: React.FC<VoiceOptionsProps> = ({ 
  selectedVoice, 
  onVoiceChange, 
  availableVoices 
}) => {
  // Voice options for select component
  const voiceOptions = availableVoices.map(voice => ({
    value: voice.name,
    label: `${voice.name} (${voice.lang})`,
  }));

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm">Voice:</span>
      <Select
        value={selectedVoice}
        onValueChange={onVoiceChange}
        placeholder="Select voice"
        options={voiceOptions}
        className="w-60"
      />
    </div>
  );
};

export default VoiceOptions;
