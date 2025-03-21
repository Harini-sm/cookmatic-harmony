
import React from 'react';
import { Link } from 'react-router-dom';
import { UtensilsCrossed } from 'lucide-react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <Link 
      to="/" 
      className={`flex items-center gap-2 transition-opacity hover:opacity-90 ${className}`}
    >
      <UtensilsCrossed className="w-7 h-7 text-primary" strokeWidth={2} />
      <span className="font-display text-xl font-bold tracking-tight">
        <span className="text-primary">Cook</span>
        <span>AI</span>
      </span>
    </Link>
  );
};

export default Logo;
