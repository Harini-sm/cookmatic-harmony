
import React from 'react';
import { Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface InstructionsListProps {
  instructions: string[];
  currentStep: number;
  onStartFromStep: (index: number) => void;
}

const InstructionsList: React.FC<InstructionsListProps> = ({
  instructions,
  currentStep,
  onStartFromStep
}) => {
  return (
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
              onClick={() => onStartFromStep(index)}
            >
              <Play className="h-3 w-3 mr-1" />
              Start from here
            </Button>
          )}
        </div>
      ))}
    </div>
  );
};

export default InstructionsList;
