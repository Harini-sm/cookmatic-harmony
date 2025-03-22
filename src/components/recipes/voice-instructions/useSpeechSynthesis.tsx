
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

interface UseSpeechSynthesisProps {
  instructions: string[];
  language?: string;
}

export const useSpeechSynthesis = ({ instructions, language = 'en-US' }: UseSpeechSynthesisProps) => {
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

  return {
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
  };
};
