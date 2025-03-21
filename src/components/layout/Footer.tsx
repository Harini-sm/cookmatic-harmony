
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '@/components/ui/Logo';
import { Github, Twitter, Instagram, Facebook } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-muted/30 border-t border-muted">
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Logo className="mb-4" />
            <p className="text-muted-foreground max-w-sm">
              CookAI is an AI-driven recipe recommendation platform that provides personalized cooking assistance with voice integration.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">Features</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/pantry-prodigy" className="text-muted-foreground hover:text-primary transition-colors">
                  Pantry Prodigy
                </Link>
              </li>
              <li>
                <Link to="/plate-prodigy" className="text-muted-foreground hover:text-primary transition-colors">
                  Plate Prodigy
                </Link>
              </li>
              <li>
                <Link to="/nutrient-prodigy" className="text-muted-foreground hover:text-primary transition-colors">
                  Nutrient Prodigy
                </Link>
              </li>
              <li>
                <Link to="/substitutions" className="text-muted-foreground hover:text-primary transition-colors">
                  Ingredient Substitutions
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-muted-foreground hover:text-primary transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/signup" className="text-muted-foreground hover:text-primary transition-colors">
                  Sign Up
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-muted mt-12 pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} CookAI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
