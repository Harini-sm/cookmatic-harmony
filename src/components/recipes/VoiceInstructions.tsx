
import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Pause, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Select } from '@/components/ui/select';
import { toast } from 'sonner';

interface VoiceInstructionsProps {
  instructions: string[];
  language?: string;
}

const VoiceInstructions: React.FC<VoiceInstructionsProps> = ({ 
  instructions, 
  language = 'en-US' 
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentStep, setCurrentStep] = useState(0);
  const [speechSynthesis, setSpeechSynthesis] = useState<SpeechSynthesis | null>(null);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState('');
  
  // Initialize speech synthesis
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setSpeechSynthesis(window.speechSynthesis);
      
      // Load available voices
      const loadVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        setAvailableVoices(voices);
        
        // Set default voice
        if (voices.length > 0) {
          const defaultVoice = voices.find(voice => voice.lang.includes('en')) || voices[0];
          setSelectedVoice(defaultVoice.name);
        }
      };
      
      // Chrome loads voices asynchronously
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = loadVoices;
      }
      
      loadVoices();
    }
    
    // Cleanup
    return () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);
  
  // Handle voice change
  const handleVoiceChange = (voiceName: string) => {
    setSelectedVoice(voiceName);
  };
  
  // Speak instructions
  const speakInstructions = (startIndex: number = 0) => {
    if (!speechSynthesis) return;
    
    speechSynthesis.cancel(); // Cancel any ongoing speech
    
    // Speak instructions in English
    const speakEnglish = (index: number) => {
      if (index >= instructions.length) {
        setIsPlaying(false);
        setCurrentStep(0);
        return;
      }
      
      const utterance = new SpeechSynthesisUtterance(instructions[index]);
      utterance.volume = volume;
      
      // Set selected voice if available
      if (selectedVoice) {
        const voice = availableVoices.find(v => v.name === selectedVoice);
        if (voice) {
          utterance.voice = voice;
        }
      }
      
      utterance.onend = () => {
        // After English instruction, speak Tamil if requested
        if (language === 'ta-IN') {
          speakTamil(index);
        } else {
          speakEnglish(index + 1);
        }
      };
      
      setCurrentStep(index);
      speechSynthesis.speak(utterance);
    };
    
    // Speak instructions in Tamil
    const speakTamil = (index: number) => {
      const tamilVoice = availableVoices.find(voice => voice.lang.includes('ta'));
      
      if (tamilVoice) {
        const utterance = new SpeechSynthesisUtterance(instructions[index]);
        utterance.voice = tamilVoice;
        utterance.volume = volume;
        
        utterance.onend = () => {
          speakEnglish(index + 1);
        };
        
        speechSynthesis.speak(utterance);
      } else {
        // If Tamil voice is not available, just continue with next English instruction
        toast.warning("Tamil voice not available on your device. Check browser speech settings.");
        speakEnglish(index + 1);
      }
    };
    
    setIsPlaying(true);
    speakEnglish(startIndex);
  };
  
  // Pause speech
  const pauseSpeech = () => {
    if (speechSynthesis) {
      speechSynthesis.pause();
      setIsPlaying(false);
    }
  };
  
  // Resume speech
  const resumeSpeech = () => {
    if (speechSynthesis) {
      speechSynthesis.resume();
      setIsPlaying(true);
    }
  };
  
  // Stop speech
  const stopSpeech = () => {
    if (speechSynthesis) {
      speechSynthesis.cancel();
      setIsPlaying(false);
      setCurrentStep(0);
    }
  };
  
  // Voice options for select component
  const voiceOptions = availableVoices.map(voice => ({
    value: voice.name,
    label: `${voice.name} (${voice.lang})`,
  }));
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Voice Instructions</h3>
        <div className="flex items-center space-x-2">
          {isPlaying ? (
            <Button variant="outline" size="sm" onClick={pauseSpeech}>
              <Pause className="h-4 w-4 mr-2" />
              Pause
            </Button>
          ) : (
            <Button variant="outline" size="sm" onClick={resumeSpeech}>
              <Play className="h-4 w-4 mr-2" />
              Resume
            </Button>
          )}
          <Button variant="default" size="sm" onClick={() => speakInstructions()}>
            <Volume2 className="h-4 w-4 mr-2" />
            Start
          </Button>
          <Button variant="ghost" size="sm" onClick={stopSpeech}>
            <VolumeX className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <span className="text-sm">Voice:</span>
          <Select
            value={selectedVoice}
            onValueChange={handleVoiceChange}
            placeholder="Select voice"
            options={voiceOptions}
            className="w-60"
          />
        </div>
        
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
      </div>
      
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Instructions:</h4>
        <div className="space-y-3">
          {instructions.map((instruction, index) => (
            <div 
              key={index}
              className={`p-3 rounded-lg border ${currentStep === index ? 'bg-primary/10 border-primary' : 'bg-card border-input'}`}
            >
              <div className="flex">
                <span className="mr-2 font-medium">{index + 1}.</span>
                <p>{instruction}</p>
              </div>
              {currentStep !== index && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="mt-2"
                  onClick={() => speakInstructions(index)}
                >
                  <Play className="h-3 w-3 mr-1" />
                  Start from here
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VoiceInstructions;
