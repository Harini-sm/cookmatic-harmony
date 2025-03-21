
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { PlusCircle, Trash2, Timer, ChefHat, Utensils, Volume2 } from 'lucide-react';

// Mock recipe data
const mockRecipe = {
  title: "Spicy Garlic Tomato Pasta",
  image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?q=80&w=2070&auto=format&fit=crop",
  cookingTime: "30 minutes",
  servings: "2",
  skillLevel: "Intermediate",
  ingredients: [
    { name: "Pasta", quantity: "200g" },
    { name: "Garlic", quantity: "4 cloves" },
    { name: "Cherry Tomatoes", quantity: "200g" },
    { name: "Olive Oil", quantity: "2 tbsp" },
    { name: "Red Chili Flakes", quantity: "1 tsp" },
    { name: "Salt", quantity: "to taste" },
    { name: "Black Pepper", quantity: "to taste" },
    { name: "Fresh Basil", quantity: "a handful" },
  ],
  instructions: [
    "Boil water in a large pot. Add salt and pasta. Cook according to package instructions until al dente.",
    "Meanwhile, heat olive oil in a large pan over medium heat. Add minced garlic and sauté until fragrant, about 1 minute.",
    "Add halved cherry tomatoes and red chili flakes. Cook until tomatoes soften and release their juices, about 5-7 minutes.",
    "Drain pasta, reserving 1/4 cup of pasta water. Add pasta to the tomato mixture.",
    "Add the reserved pasta water and toss to coat. Season with salt and black pepper.",
    "Tear fresh basil leaves and sprinkle over the pasta. Serve hot."
  ]
};

// Utensil options
const utensilOptions = [
  { id: "stove", label: "Stove" },
  { id: "oven", label: "Oven" },
  { id: "blender", label: "Blender" },
  { id: "mixer", label: "Mixer" },
  { id: "foodProcessor", label: "Food Processor" },
  { id: "slowCooker", label: "Slow Cooker" },
  { id: "microwave", label: "Microwave" },
  { id: "grill", label: "Grill" },
];

// Skill level options
const skillLevelOptions = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
];

// Meal type options
const mealTypeOptions = [
  { value: "breakfast", label: "Breakfast" },
  { value: "lunch", label: "Lunch" },
  { value: "dinner", label: "Dinner" },
  { value: "snack", label: "Snack" },
  { value: "dessert", label: "Dessert" },
];

const PantryProdigy: React.FC = () => {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [currentIngredient, setCurrentIngredient] = useState('');
  const [mealType, setMealType] = useState('');
  const [selectedUtensils, setSelectedUtensils] = useState<string[]>([]);
  const [timeAvailable, setTimeAvailable] = useState<number>(30);
  const [skillLevel, setSkillLevel] = useState('');
  const [isGeneratingRecipe, setIsGeneratingRecipe] = useState(false);
  const [recipe, setRecipe] = useState<typeof mockRecipe | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleAddIngredient = () => {
    if (currentIngredient.trim() !== '') {
      setIngredients([...ingredients, currentIngredient.trim()]);
      setCurrentIngredient('');
    }
  };

  const handleRemoveIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleUtensilToggle = (id: string) => {
    if (selectedUtensils.includes(id)) {
      setSelectedUtensils(selectedUtensils.filter(item => item !== id));
    } else {
      setSelectedUtensils([...selectedUtensils, id]);
    }
  };

  const handleGenerateRecipe = () => {
    // Validate form
    if (ingredients.length === 0) {
      toast.error("Please add at least one ingredient");
      return;
    }
    if (!mealType) {
      toast.error("Please select a meal type");
      return;
    }
    if (selectedUtensils.length === 0) {
      toast.error("Please select at least one kitchen utensil");
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
              src="https://images.unsplash.com/photo-1543353071-873f17a7a088?q=80&w=2070&auto=format&fit=crop" 
              alt="Pantry ingredients" 
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
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Pantry Prodigy</h1>
              <p className="text-xl text-gray-200 mb-6">Smart Cooking with What You Have!</p>
              <p className="text-gray-300">
                Turn your available ingredients into delicious meals. Simply tell us what you have,
                and we'll create custom recipes just for you.
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
                  
                  {/* Ingredients input */}
                  <div className="space-y-4 mb-6">
                    <Label htmlFor="ingredients">Add Ingredients You Have</Label>
                    <div className="flex gap-2">
                      <Input 
                        id="ingredients"
                        value={currentIngredient}
                        onChange={(e) => setCurrentIngredient(e.target.value)}
                        placeholder="e.g., Tomatoes, Pasta, Cheese"
                        onKeyDown={(e) => e.key === 'Enter' && handleAddIngredient()}
                      />
                      <Button onClick={handleAddIngredient} size="icon">
                        <PlusCircle className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    {/* Ingredients list */}
                    {ingredients.length > 0 && (
                      <div className="bg-muted p-3 rounded-md">
                        <p className="text-sm font-medium mb-2">Your ingredients:</p>
                        <div className="flex flex-wrap gap-2">
                          {ingredients.map((ingredient, index) => (
                            <div 
                              key={index}
                              className="bg-background text-foreground px-3 py-1 rounded-full flex items-center gap-1 text-sm"
                            >
                              {ingredient}
                              <button 
                                onClick={() => handleRemoveIngredient(index)}
                                className="text-muted-foreground hover:text-destructive"
                              >
                                <Trash2 className="h-3 w-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Meal type */}
                  <div className="space-y-2 mb-6">
                    <Label htmlFor="mealType">Select Meal Type</Label>
                    <Select 
                      value={mealType}
                      onValueChange={setMealType}
                      placeholder="Choose a meal type"
                      options={mealTypeOptions}
                    />
                  </div>
                  
                  {/* Kitchen utensils */}
                  <div className="space-y-3 mb-6">
                    <Label>Kitchen Utensils Available</Label>
                    <div className="grid grid-cols-2 gap-3">
                      {utensilOptions.map((utensil) => (
                        <div 
                          key={utensil.id} 
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={utensil.id}
                            checked={selectedUtensils.includes(utensil.id)}
                            onCheckedChange={() => handleUtensilToggle(utensil.id)}
                          />
                          <Label htmlFor={utensil.id} className="cursor-pointer">{utensil.label}</Label>
                        </div>
                      ))}
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
                        min={10}
                        max={120}
                        step={5}
                        className="flex-1"
                      />
                    </div>
                  </div>
                  
                  {/* Skill level */}
                  <div className="space-y-2 mb-8">
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
                            <Utensils className="h-3 w-3" />
                            {recipe.servings} servings
                          </div>
                          <div className="bg-black/40 backdrop-blur-sm text-white text-sm px-3 py-1 rounded-full flex items-center gap-1">
                            <ChefHat className="h-3 w-3" />
                            {recipe.skillLevel}
                          </div>
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
                        Fill out the form with your available ingredients and preferences, then click "Generate Your Recipe" to see what you can cook.
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

export default PantryProdigy;
