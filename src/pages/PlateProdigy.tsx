
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { Timer, ChefHat, Utensils, Volume2, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

// Mock recipe data
const mockRecipe = {
  title: "Vegetarian Thai Green Curry",
  image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?q=80&w=2070&auto=format&fit=crop",
  cookingTime: "45 minutes",
  servings: "4",
  skillLevel: "Intermediate",
  dietaryInfo: ["Vegetarian", "Gluten-Free"],
  ingredients: [
    { name: "Thai Green Curry Paste", quantity: "3 tbsp" },
    { name: "Coconut Milk", quantity: "400ml" },
    { name: "Tofu", quantity: "300g" },
    { name: "Broccoli", quantity: "1 head" },
    { name: "Bell Peppers", quantity: "2" },
    { name: "Snow Peas", quantity: "100g" },
    { name: "Lime Leaves", quantity: "4" },
    { name: "Lemongrass", quantity: "1 stalk" },
    { name: "Thai Basil", quantity: "handful" },
    { name: "Jasmine Rice", quantity: "2 cups" },
    { name: "Vegetable Stock", quantity: "200ml" },
    { name: "Soy Sauce", quantity: "2 tbsp" },
  ],
  instructions: [
    "Prepare jasmine rice according to package instructions.",
    "Cut tofu into 1-inch cubes and press with paper towels to remove excess moisture.",
    "In a large pan or wok, heat 1 tablespoon of oil over medium-high heat. Add tofu and cook until golden on all sides, about 5-7 minutes. Remove from pan and set aside.",
    "In the same pan, add Thai green curry paste and stir for 1 minute until fragrant.",
    "Add coconut milk and vegetable stock, then bring to a simmer.",
    "Add lime leaves and lemongrass, then simmer for 5 minutes.",
    "Add broccoli florets and bell peppers. Cook for 3-4 minutes.",
    "Add snow peas and tofu. Cook for another 2-3 minutes until vegetables are tender-crisp.",
    "Remove lime leaves and lemongrass stalk. Stir in soy sauce.",
    "Serve the curry over jasmine rice, garnished with Thai basil leaves."
  ]
};

// Dietary requirement options
const dietaryOptions = [
  { value: "vegetarian", label: "Vegetarian" },
  { value: "pescatarian", label: "Pescatarian" },
  { value: "vegan", label: "Vegan" },
  { value: "gluten-free", label: "Gluten-Free" },
  { value: "dairy-free", label: "Dairy-Free" },
  { value: "keto", label: "Keto" },
  { value: "paleo", label: "Paleo" },
];

// Skill level options
const skillLevelOptions = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
];

const PlateProdigy: React.FC = () => {
  const [recipeType, setRecipeType] = useState<'taste' | 'specific'>('taste');
  const [recipeInput, setRecipeInput] = useState('');
  const [servings, setServings] = useState<number>(2);
  const [timeAvailable, setTimeAvailable] = useState<number>(45);
  const [skillLevel, setSkillLevel] = useState('');
  const [dietaryRequirements, setDietaryRequirements] = useState<string[]>([]);
  const [isGeneratingRecipe, setIsGeneratingRecipe] = useState(false);
  const [recipe, setRecipe] = useState<typeof mockRecipe | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleDietaryToggle = (value: string) => {
    if (dietaryRequirements.includes(value)) {
      setDietaryRequirements(dietaryRequirements.filter(item => item !== value));
    } else {
      setDietaryRequirements([...dietaryRequirements, value]);
    }
  };

  const handleGenerateRecipe = () => {
    // Validate form
    if (recipeType === 'specific' && recipeInput.trim() === '') {
      toast.error("Please enter a specific dish or flavor profile");
      return;
    }
    if (recipeType === 'taste' && recipeInput.trim() === '') {
      toast.error("Please enter your taste preferences");
      return;
    }
    if (!skillLevel) {
      toast.error("Please select your skill level");
      return;
    }

    // Show loading state
    setIsGeneratingRecipe(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      setRecipe(mockRecipe);
      setIsGeneratingRecipe(false);
      toast.success("Recipe generated successfully!");
    }, 2000);
  };

  const handleVoiceInstructions = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      toast.success("Voice instructions started in English and Tamil");
      // In a real implementation, we would use a text-to-speech API here
    } else {
      toast.info("Voice instructions stopped");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Header section */}
        <section className="relative bg-gradient-to-b from-black/70 to-background py-24">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1611171711791-b34fa42c9d4a?q=80&w=2071&auto=format&fit=crop" 
              alt="Delicious plated food" 
              className="w-full h-full object-cover opacity-50"
            />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Plate Prodigy</h1>
              <p className="text-xl text-gray-200 mb-6">Inspire MasterChef with Your Taste!</p>
              <p className="text-gray-300">
                Discover recipes tailored to your taste preferences and dietary requirements, 
                creating personalized culinary experiences that satisfy your cravings.
              </p>
            </motion.div>
          </div>
        </section>
        
        {/* Main content */}
        <section className="py-12 md:py-16 px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Form container */}
              <div className="lg:col-span-5 space-y-8">
                <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
                  <h2 className="text-2xl font-semibold mb-6">Create Your Recipe</h2>
                  
                  {/* Recipe type selection */}
                  <div className="space-y-3 mb-6">
                    <Label>Recipe Generation Type</Label>
                    <RadioGroup value={recipeType} onValueChange={(value) => setRecipeType(value as 'taste' | 'specific')}>
                      <div className="flex items-center space-x-2 mb-2">
                        <RadioGroupItem value="taste" id="taste" />
                        <Label htmlFor="taste">Based on taste preferences</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="specific" id="specific" />
                        <Label htmlFor="specific">Specific dish or recipe</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  {/* Recipe input */}
                  <div className="space-y-2 mb-6">
                    <Label htmlFor="recipeInput">
                      {recipeType === 'taste' ? 'Your Taste Preferences' : 'Specific Dish or Recipe'}
                    </Label>
                    <Input 
                      id="recipeInput"
                      value={recipeInput}
                      onChange={(e) => setRecipeInput(e.target.value)}
                      placeholder={recipeType === 'taste' ? 
                        "e.g., Spicy, sweet and sour, with aromatic herbs" : 
                        "e.g., Spaghetti Carbonara, Vegetable Biryani"
                      }
                    />
                  </div>
                  
                  {/* Servings slider */}
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <Label htmlFor="servings">Number of Servings</Label>
                      <span className="text-sm text-muted-foreground">{servings} {servings === 1 ? 'serving' : 'servings'}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <Slider
                        id="servings"
                        value={[servings]}
                        onValueChange={(value) => setServings(value[0])}
                        min={1}
                        max={8}
                        step={1}
                        className="flex-1"
                      />
                    </div>
                  </div>
                  
                  {/* Time available */}
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <Label htmlFor="timeAvailable">Time Available</Label>
                      <span className="text-sm text-muted-foreground">{timeAvailable} minutes</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <Timer className="h-4 w-4 text-muted-foreground" />
                      <Slider
                        id="timeAvailable"
                        value={[timeAvailable]}
                        onValueChange={(value) => setTimeAvailable(value[0])}
                        min={15}
                        max={120}
                        step={5}
                        className="flex-1"
                      />
                    </div>
                  </div>
                  
                  {/* Skill level */}
                  <div className="space-y-2 mb-6">
                    <Label htmlFor="skillLevel">Your Cooking Skill Level</Label>
                    <div className="flex items-center gap-4">
                      <ChefHat className="h-4 w-4 text-muted-foreground" />
                      <Select 
                        value={skillLevel}
                        onValueChange={setSkillLevel}
                        placeholder="Select your skill level"
                        options={skillLevelOptions}
                      />
                    </div>
                  </div>
                  
                  {/* Dietary requirements */}
                  <div className="space-y-3 mb-8">
                    <Label>Dietary Requirements (optional)</Label>
                    <div className="flex flex-wrap gap-2">
                      {dietaryOptions.map((option) => (
                        <Badge 
                          key={option.value}
                          variant={dietaryRequirements.includes(option.value) ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => handleDietaryToggle(option.value)}
                        >
                          {option.label}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  {/* Generate button */}
                  <Button 
                    onClick={handleGenerateRecipe} 
                    className="w-full"
                    disabled={isGeneratingRecipe}
                  >
                    {isGeneratingRecipe ? 
                      "Generating Recipe..." : 
                      "Generate Your Recipe"
                    }
                  </Button>
                </div>
              </div>
              
              {/* Recipe result container */}
              <div className="lg:col-span-7">
                {recipe ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-card rounded-xl border border-border shadow-sm overflow-hidden"
                  >
                    {/* Recipe image */}
                    <div className="aspect-video w-full relative">
                      <img 
                        src={recipe.image} 
                        alt={recipe.title} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h2 className="text-3xl font-bold text-white">{recipe.title}</h2>
                        <div className="flex flex-wrap gap-3 mt-2">
                          <div className="bg-black/40 backdrop-blur-sm text-white text-sm px-3 py-1 rounded-full flex items-center gap-1">
                            <Timer className="h-3 w-3" />
                            {recipe.cookingTime}
                          </div>
                          <div className="bg-black/40 backdrop-blur-sm text-white text-sm px-3 py-1 rounded-full flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {recipe.servings} servings
                          </div>
                          <div className="bg-black/40 backdrop-blur-sm text-white text-sm px-3 py-1 rounded-full flex items-center gap-1">
                            <ChefHat className="h-3 w-3" />
                            {recipe.skillLevel}
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-3">
                          {recipe.dietaryInfo.map((info, index) => (
                            <Badge key={index} variant="secondary" className="bg-white/10 text-white border-none">
                              {info}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    {/* Recipe content */}
                    <div className="p-6">
                      <Tabs defaultValue="ingredients">
                        <TabsList className="w-full mb-6">
                          <TabsTrigger value="ingredients" className="flex-1">Ingredients</TabsTrigger>
                          <TabsTrigger value="instructions" className="flex-1">Instructions</TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="ingredients" className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {recipe.ingredients.map((ingredient, index) => (
                              <div 
                                key={index}
                                className="flex justify-between p-3 bg-muted/50 rounded-md"
                              >
                                <span>{ingredient.name}</span>
                                <span className="font-medium">{ingredient.quantity}</span>
                              </div>
                            ))}
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="instructions" className="space-y-6">
                          <div className="flex justify-between items-center">
                            <h3 className="text-lg font-medium">Cooking Steps</h3>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={handleVoiceInstructions}
                              className={isPlaying ? "bg-primary text-primary-foreground" : ""}
                            >
                              <Volume2 className="h-4 w-4 mr-2" />
                              {isPlaying ? "Stop Voice" : "Play Instructions"}
                            </Button>
                          </div>
                          
                          <ol className="space-y-4">
                            {recipe.instructions.map((instruction, index) => (
                              <li key={index} className="pl-2 border-l-2 border-primary">
                                <div className="flex gap-3">
                                  <div className="bg-primary/10 text-primary font-medium h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0">
                                    {index + 1}
                                  </div>
                                  <p>{instruction}</p>
                                </div>
                              </li>
                            ))}
                          </ol>
                        </TabsContent>
                      </Tabs>
                    </div>
                  </motion.div>
                ) : (
                  <div className="h-full flex items-center justify-center bg-muted/30 rounded-xl border border-dashed border-muted-foreground/30 p-12">
                    <div className="text-center max-w-md">
                      <Utensils className="h-12 w-12 text-muted-foreground/60 mx-auto mb-4" />
                      <h3 className="text-xl font-medium mb-2">Ready to Create Your Recipe</h3>
                      <p className="text-muted-foreground">
                        Tell us your taste preferences or a specific dish, and we'll create a personalized recipe tailored to your requirements.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default PlateProdigy;
