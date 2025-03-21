
import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface RecipeFavoriteProps {
  recipeId: string;
  recipeTitle: string;
  recipeImage: string;
}

const RecipeFavorite: React.FC<RecipeFavoriteProps> = ({ recipeId, recipeTitle, recipeImage }) => {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  
  // Check favorite status on mount and when recipeId changes
  useEffect(() => {
    checkFavoriteStatus();
  }, [recipeId]);
  
  const checkFavoriteStatus = () => {
    try {
      // Check if user is logged in
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      
      if (isLoggedIn) {
        // Check if recipe is in favorites
        const userData = localStorage.getItem('userData');
        
        if (userData) {
          const parsedUserData = JSON.parse(userData);
          const favorites = parsedUserData.favorites || [];
          
          const exists = favorites.some((recipe: { id: string }) => recipe.id === recipeId);
          setIsFavorite(exists);
        }
      }
    } catch (error) {
      console.error("Error checking favorite status:", error);
    }
  };
  
  const toggleFavorite = () => {
    try {
      // Check if user is logged in
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      
      if (!isLoggedIn) {
        toast.error("Please log in to add recipes to favorites");
        navigate('/login');
        return;
      }
      
      // Get user data from localStorage
      let userData = localStorage.getItem('userData');
      
      if (!userData) {
        // Initialize user data if it doesn't exist
        userData = JSON.stringify({ favorites: [] });
        localStorage.setItem('userData', userData);
      }
      
      const parsedUserData = JSON.parse(userData);
      let favorites = parsedUserData.favorites || [];
      
      if (isFavorite) {
        // Remove from favorites
        favorites = favorites.filter((recipe: { id: string }) => recipe.id !== recipeId);
        toast.success("Recipe removed from favorites");
      } else {
        // Add to favorites
        favorites.push({
          id: recipeId,
          title: recipeTitle,
          image: recipeImage,
        });
        toast.success("Recipe added to favorites");
      }
      
      // Update user data in localStorage
      parsedUserData.favorites = favorites;
      localStorage.setItem('userData', JSON.stringify(parsedUserData));
      
      // Update state
      setIsFavorite(!isFavorite);
      
      // Dispatch event for Profile page to update
      const event = new CustomEvent('favoritesUpdated', { 
        detail: { favorites: parsedUserData.favorites } 
      });
      window.dispatchEvent(event);
    } catch (error) {
      console.error("Error toggling favorite:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };
  
  return (
    <Button
      variant={isFavorite ? "default" : "outline"}
      size="sm"
      onClick={toggleFavorite}
      className={isFavorite ? "bg-red-500 hover:bg-red-600" : ""}
    >
      <Heart className={`h-4 w-4 mr-2 ${isFavorite ? "fill-current" : ""}`} />
      {isFavorite ? "Favorited" : "Add to Favorites"}
    </Button>
  );
};

export default RecipeFavorite;
