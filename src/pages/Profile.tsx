
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Settings, Heart, LogOut, Lock, Mail, Briefcase, Globe } from 'lucide-react';
import { Select } from '@/components/ui/select';
import { toast } from 'sonner';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const cuisineOptions = [
  { value: 'italian', label: 'Italian' },
  { value: 'indian', label: 'Indian' },
  { value: 'mexican', label: 'Mexican' },
  { value: 'chinese', label: 'Chinese' },
  { value: 'japanese', label: 'Japanese' },
  { value: 'thai', label: 'Thai' },
  { value: 'french', label: 'French' },
  { value: 'spanish', label: 'Spanish' },
  { value: 'middle-eastern', label: 'Middle Eastern' },
  { value: 'american', label: 'American' },
];

interface UserData {
  username: string;
  email: string;
  fullName: string;
  favoriteCuisine: string;
  favorites: {
    id: string;
    title: string;
    image: string;
  }[];
}

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const [profileData, setProfileData] = useState({
    fullName: '',
    favoriteCuisine: '',
  });
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    
    // Get user data from localStorage
    const storedUserData = localStorage.getItem('userData');
    
    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      setUserData(parsedUserData);
      setProfileData({
        fullName: parsedUserData.fullName || '',
        favoriteCuisine: parsedUserData.favoriteCuisine || '',
      });
    }
    
    setIsLoading(false);
  }, [navigate]);
  
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleCuisineChange = (value: string) => {
    setProfileData(prev => ({
      ...prev,
      favoriteCuisine: value
    }));
  };
  
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (userData) {
      const updatedUserData = {
        ...userData,
        fullName: profileData.fullName,
        favoriteCuisine: profileData.favoriteCuisine,
      };
      
      localStorage.setItem('userData', JSON.stringify(updatedUserData));
      setUserData(updatedUserData);
      
      toast.success("Profile updated successfully!");
    }
  };
  
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate passwords
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords don't match");
      return;
    }
    
    if (passwordData.newPassword.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }
    
    // In a real app, we would validate the current password against stored password
    // and then update the password in the database
    
    toast.success("Password updated successfully!");
    
    // Reset form
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  };
  
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    toast.success("Logged out successfully!");
    navigate('/login');
  };
  
  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto py-8 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 gap-8 md:grid-cols-[250px_1fr]"
        >
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src="" alt={userData?.username || 'User'} />
                  <AvatarFallback className="text-2xl">
                    {userData?.username?.charAt(0).toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-bold">{userData?.username}</h2>
                <p className="text-muted-foreground">{userData?.email}</p>
              </CardContent>
            </Card>
            
            <div className="flex flex-col space-y-2">
              <Button variant="ghost" className="justify-start" onClick={() => navigate('/profile')}>
                <User className="mr-2 h-4 w-4" />
                My Profile
              </Button>
              <Button variant="ghost" className="justify-start" onClick={() => navigate('/profile/favorites')}>
                <Heart className="mr-2 h-4 w-4" />
                Favorites
              </Button>
              <Button variant="ghost" className="justify-start" onClick={() => navigate('/profile')}>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
              <Button variant="ghost" className="justify-start text-destructive" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
          
          <div>
            <Tabs defaultValue="profile">
              <TabsList className="mb-4">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="favorites">Favorites</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile">
                <Card>
                  <CardHeader>
                    <CardTitle>My Profile</CardTitle>
                    <CardDescription>
                      Update your personal information and preferences.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleProfileSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <Input 
                          id="username" 
                          value={userData?.username || ''} 
                          disabled 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          value={userData?.email || ''} 
                          disabled 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="fullName"
                            name="fullName"
                            placeholder="John Doe"
                            value={profileData.fullName}
                            onChange={handleProfileChange}
                            className="pl-10"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="favoriteCuisine">Favorite Cuisine</Label>
                        <div className="relative">
                          <Globe className="absolute left-3 top-3 h-4 w-4 text-muted-foreground z-10" />
                          <Select
                            value={profileData.favoriteCuisine}
                            onValueChange={handleCuisineChange}
                            placeholder="Select your favorite cuisine"
                            options={cuisineOptions}
                            className="pl-10"
                          />
                        </div>
                      </div>
                      
                      <Button type="submit">Save Changes</Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="favorites">
                <Card>
                  <CardHeader>
                    <CardTitle>My Favorite Recipes</CardTitle>
                    <CardDescription>
                      View and manage your saved recipes.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {userData?.favorites && userData.favorites.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {userData.favorites.map((recipe) => (
                          <Card key={recipe.id}>
                            <div className="aspect-video overflow-hidden rounded-t-lg">
                              <img 
                                src={recipe.image || '/placeholder.svg'} 
                                alt={recipe.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <CardContent className="p-4">
                              <h3 className="font-medium text-lg">{recipe.title}</h3>
                              <div className="flex justify-between mt-2">
                                <Button variant="outline" size="sm">
                                  View Recipe
                                </Button>
                                <Button variant="ghost" size="sm" className="text-destructive">
                                  <Heart className="h-4 w-4 fill-current" />
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Heart className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                        <h3 className="text-lg font-medium">No favorites yet</h3>
                        <p className="text-muted-foreground">
                          Save your favorite recipes to access them quickly.
                        </p>
                        <Button className="mt-4" onClick={() => navigate('/')}>
                          Explore Recipes
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="settings">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                    <CardDescription>
                      Update your account settings and password.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handlePasswordSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword">Current Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="currentPassword"
                            name="currentPassword"
                            type="password"
                            placeholder="••••••••"
                            value={passwordData.currentPassword}
                            onChange={handlePasswordChange}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="newPassword">New Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="newPassword"
                            name="newPassword"
                            type="password"
                            placeholder="••••••••"
                            value={passwordData.newPassword}
                            onChange={handlePasswordChange}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm New Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            placeholder="••••••••"
                            value={passwordData.confirmPassword}
                            onChange={handlePasswordChange}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>
                      
                      <Button type="submit">Update Password</Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
