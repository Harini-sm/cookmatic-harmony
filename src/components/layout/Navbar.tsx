import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronDown, 
  Menu, 
  X, 
  Package, 
  Utensils, 
  HeartPulse, 
  LogIn, 
  User 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Logo from '@/components/ui/Logo';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { Button } from '@/components/ui/button';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-4 transition-all duration-300",
        isScrolled ? "bg-background/80 backdrop-blur-lg shadow-sm" : "bg-transparent"
      )}
    >
      <div className="container mx-auto flex items-center justify-between">
        <Logo />
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          <Link to="/" className="px-3 py-2 text-sm font-medium rounded-md hover:bg-secondary transition-all">
            Home
          </Link>
          
          {/* Features Dropdown */}
          <div className="relative">
            <button 
              className="px-3 py-2 text-sm font-medium rounded-md hover:bg-secondary transition-all flex items-center"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              Features <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isDropdownOpen && (
              <div className="absolute top-full mt-1 w-60 rounded-lg bg-card shadow-lg border border-border overflow-hidden animate-scale-in">
                <div className="p-2 space-y-1">
                  <Link 
                    to="/pantry-prodigy" 
                    className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-secondary transition-all"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <Package className="w-4 h-4" />
                    <div>
                      <span className="font-medium">Pantry Prodigy</span>
                      <p className="text-xs text-muted-foreground">Cook with what you have</p>
                    </div>
                  </Link>
                  
                  <Link 
                    to="/plate-prodigy" 
                    className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-secondary transition-all"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <Utensils className="w-4 h-4" />
                    <div>
                      <span className="font-medium">Plate Prodigy</span>
                      <p className="text-xs text-muted-foreground">Recipes by taste & diet</p>
                    </div>
                  </Link>
                  
                  <Link 
                    to="/nutrient-prodigy" 
                    className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-secondary transition-all"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <HeartPulse className="w-4 h-4" />
                    <div>
                      <span className="font-medium">Nutrient Prodigy</span>
                      <p className="text-xs text-muted-foreground">Recipes by macronutrients</p>
                    </div>
                  </Link>
                </div>
              </div>
            )}
          </div>
          
          <Link to="/about" className="px-3 py-2 text-sm font-medium rounded-md hover:bg-secondary transition-all">
            About
          </Link>
        </div>
        
        <div className="hidden md:flex items-center space-x-2">
          <ThemeToggle />
          <Link to="/login">
            <Button size="sm" variant="outline" className="gap-2">
              <LogIn className="w-4 h-4" /> Login
            </Button>
          </Link>
          <Link to="/signup">
            <Button size="sm" className="gap-2">
              <User className="w-4 h-4" /> Sign Up
            </Button>
          </Link>
        </div>
        
        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-background/95 backdrop-blur-lg border-b border-border animate-slide-in">
          <div className="container mx-auto py-4 px-4 flex flex-col space-y-4">
            <Link to="/" className="px-3 py-2 rounded-md hover:bg-secondary transition-all" onClick={() => setIsMobileMenuOpen(false)}>
              Home
            </Link>
            
            <div className="px-3 py-2 font-medium">Features</div>
            <div className="pl-6 space-y-2">
              <Link 
                to="/pantry-prodigy" 
                className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-secondary transition-all"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Package className="w-4 h-4" />
                <div>
                  <span>Pantry Prodigy</span>
                  <p className="text-xs text-muted-foreground">Cook with what you have</p>
                </div>
              </Link>
              
              <Link 
                to="/plate-prodigy" 
                className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-secondary transition-all"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Utensils className="w-4 h-4" />
                <div>
                  <span>Plate Prodigy</span>
                  <p className="text-xs text-muted-foreground">Recipes by taste & diet</p>
                </div>
              </Link>
              
              <Link 
                to="/nutrient-prodigy" 
                className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-secondary transition-all"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <HeartPulse className="w-4 h-4" />
                <div>
                  <span>Nutrient Prodigy</span>
                  <p className="text-xs text-muted-foreground">Recipes by macronutrients</p>
                </div>
              </Link>
            </div>
            
            <Link to="/about" className="px-3 py-2 rounded-md hover:bg-secondary transition-all" onClick={() => setIsMobileMenuOpen(false)}>
              About
            </Link>
            
            <div className="flex flex-col space-y-2 pt-2">
              <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full justify-center gap-2">
                  <LogIn className="w-4 h-4" /> Login
                </Button>
              </Link>
              <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                <Button className="w-full justify-center gap-2">
                  <User className="w-4 h-4" /> Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
