
import React from 'react';
import VoiceOptions from './VoiceOptions';
import VolumeControl from './VolumeControl';
import PlaybackControls from './PlaybackControls';
import InstructionsList from './InstructionsList';
import { useSpeechSynthesis } from './useSpeechSynthesis';

interface VoiceInstructionsComponentProps {
  instructions: string[];
  language?: string;
}

const VoiceInstructionsComponent: React.FC<VoiceInstructionsComponentProps> = ({
  instructions,
  language = 'en-US',
}) => {
  const {
    isPlaying,
    volume,
    setVolume,
    currentStep,
    availableVoices,
    selectedVoice,
    handleVoiceChange,
    speakInstructions,
    pauseSpeech,
    resumeSpeech,
    stopSpeech,
  } = useSpeechSynthesis({ instructions, language });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Voice Instructions</h3>
        <PlaybackControls 
          isPlaying={isPlaying}
          onPause={pauseSpeech}
          onResume={resumeSpeech}
          onStart={() => speakInstructions()}
          onStop={stopSpeech}
        />
      </div>
      
      <div className="space-y-2">
        <VoiceOptions 
          selectedVoice={selectedVoice}
          onVoiceChange={handleVoiceChange}
          availableVoices={availableVoices}
        />
        
        <VolumeControl 
          volume={volume}
          setVolume={setVolume}
        />
      </div>
      
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Instructions:</h4>
        <InstructionsList 
          instructions={instructions}
          currentStep={currentStep}
          onStartFromStep={(index) => speakInstructions(index)}
        />
      </div>
    </div>
  );
};

export default VoiceInstructionsComponent;
