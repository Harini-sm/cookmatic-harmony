
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ChevronDown, 
  Menu, 
  X, 
  Package, 
  Utensils, 
  HeartPulse, 
  LogIn, 
  User,
  Settings,
  Heart,
  LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Logo from '@/components/ui/Logo';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);

    // Check login status
    const loggedInStatus = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedInStatus);

    // Get user data if logged in
    if (loggedInStatus) {
      const storedUserData = localStorage.getItem('userData');
      if (storedUserData) {
        setUserData(JSON.parse(storedUserData));
      }
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    setUserData(null);
    toast.success("Logged out successfully!");
    navigate('/login');
  };

  const handleNavigateToProfile = (section: string = '') => {
    // Close mobile menu if open
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
    
    // Navigate to the profile page with the appropriate tab
    if (section) {
      navigate(`/profile?tab=${section}`);
    } else {
      navigate('/profile');
    }
  };

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
          
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full" size="icon">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-xs font-medium">
                      {userData?.username?.charAt(0).toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-0.5">
                    <p className="text-sm font-medium">{userData?.username || 'User'}</p>
                    <p className="text-xs text-muted-foreground">{userData?.email || ''}</p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleNavigateToProfile('profile')}>
                  <User className="mr-2 h-4 w-4" />
                  My Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleNavigateToProfile('favorites')}>
                  <Heart className="mr-2 h-4 w-4" />
                  Favorites
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleNavigateToProfile('settings')}>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
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
            </>
          )}
        </div>
        
        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          
          {isLoggedIn && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="mr-1"
              onClick={() => handleNavigateToProfile()}
            >
              <Avatar className="h-8 w-8">
                <AvatarFallback className="text-xs font-medium">
                  {userData?.username?.charAt(0).toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
            </Button>
          )}
          
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
            
            {isLoggedIn ? (
              <div className="space-y-2 pt-2">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => handleNavigateToProfile('profile')}
                >
                  <User className="mr-2 w-4 h-4" /> My Profile
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => handleNavigateToProfile('favorites')}
                >
                  <Heart className="mr-2 w-4 h-4" /> Favorites
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => handleNavigateToProfile('settings')}
                >
                  <Settings className="mr-2 w-4 h-4" /> Settings
                </Button>
                <Button 
                  variant="destructive" 
                  className="w-full justify-start" 
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 w-4 h-4" /> Logout
                </Button>
              </div>
            ) : (
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
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
