
import React from 'react';
import VoiceInstructionsComponent from './voice-instructions';

interface VoiceInstructionsProps {
  instructions: string[];
  language?: string;
}

const VoiceInstructions: React.FC<VoiceInstructionsProps> = ({ 
  instructions, 
  language = 'en-US' 
}) => {
  return <VoiceInstructionsComponent instructions={instructions} language={language} />;
};

export default VoiceInstructions;
