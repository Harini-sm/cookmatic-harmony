
import { useState, useEffect, useCallback } from 'react';

interface UseSpeechSynthesisProps {
  instructions: string[];
  language?: string;
}

export const useSpeechSynthesis = ({ instructions, language = 'en-US' }: UseSpeechSynthesisProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState<number | null>(null);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState('');
  const [volume, setVolume] = useState(1.0);
  const [speechSynthesis, setSpeechSynthesis] = useState<SpeechSynthesis | null>(null);

  // Initialize speech synthesis when component mounts
  useEffect(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      setSpeechSynthesis(window.speechSynthesis);
      
      // Get available voices
      const loadVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        setAvailableVoices(voices);
        
        // Set default voice (preferably matching the language)
        const defaultVoice = voices.find(voice => voice.lang.includes(language.substring(0, 2)));
        if (defaultVoice) {
          setSelectedVoice(defaultVoice.name);
        } else if (voices.length > 0) {
          setSelectedVoice(voices[0].name);
        }
      };
      
      // Chrome loads voices asynchronously
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = loadVoices;
      }
      
      loadVoices();
      
      // Cleanup on unmount
      return () => {
        if (window.speechSynthesis) {
          window.speechSynthesis.cancel();
        }
      };
    }
  }, [language]);

  // Handle voice change
  const handleVoiceChange = useCallback((voiceName: string) => {
    setSelectedVoice(voiceName);
  }, []);

  // Stop speech
  const stopSpeech = useCallback(() => {
    if (speechSynthesis) {
      speechSynthesis.cancel();
      setIsPlaying(false);
      setCurrentStep(null);
    }
  }, [speechSynthesis]);

  // Pause speech
  const pauseSpeech = useCallback(() => {
    if (speechSynthesis) {
      speechSynthesis.pause();
      setIsPlaying(false);
    }
  }, [speechSynthesis]);

  // Resume speech
  const resumeSpeech = useCallback(() => {
    if (speechSynthesis) {
      speechSynthesis.resume();
      setIsPlaying(true);
    }
  }, [speechSynthesis]);

  // Speak instructions
  const speakInstructions = useCallback((startIndex: number = 0) => {
    if (!speechSynthesis) return;
    
    // Cancel any ongoing speech
    stopSpeech();
    
    // Start new speech
    setIsPlaying(true);
    
    const speakNextInstruction = (index: number) => {
      if (index < instructions.length) {
        setCurrentStep(index);
        
        const utterance = new SpeechSynthesisUtterance(instructions[index]);
        
        // Set selected voice
        if (selectedVoice) {
          const voice = availableVoices.find(v => v.name === selectedVoice);
          if (voice) utterance.voice = voice;
        }
        
        // Set volume
        utterance.volume = volume;
        
        // When finished speaking current instruction, move to next
        utterance.onend = () => {
          speakNextInstruction(index + 1);
        };
        
        speechSynthesis.speak(utterance);
      } else {
        // All instructions finished
        setIsPlaying(false);
        setCurrentStep(null);
      }
    };
    
    speakNextInstruction(startIndex);
  }, [speechSynthesis, instructions, selectedVoice, availableVoices, volume, stopSpeech]);

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
