
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { Timer, PieChart, Utensils, Volume2, Apple } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Mock recipe data
const mockRecipe = {
  title: "High-Protein Quinoa Bowl",
  image: "https://images.unsplash.com/photo-1543362906-acfc16c67564?q=80&w=2091&auto=format&fit=crop",
  cookingTime: "25 minutes",
  servings: "1",
  macros: {
    carbs: 45,
    protein: 35,
    fats: 15
  },
  dietaryInfo: ["High-Protein", "Vegetarian", "Gluten-Free"],
  ingredients: [
    { name: "Quinoa", quantity: "100g" },
    { name: "Chicken Breast", quantity: "150g" },
    { name: "Broccoli", quantity: "80g" },
    { name: "Bell Peppers", quantity: "1/2 medium" },
    { name: "Olive Oil", quantity: "1 tbsp" },
    { name: "Lemon Juice", quantity: "1 tbsp" },
    { name: "Garlic", quantity: "2 cloves" },
    { name: "Salt", quantity: "to taste" },
    { name: "Black Pepper", quantity: "to taste" },
    { name: "Paprika", quantity: "1/2 tsp" },
    { name: "Pine Nuts", quantity: "10g" },
  ],
  instructions: [
    "Rinse quinoa under cold water until the water runs clear.",
    "In a medium pot, combine quinoa with 200ml of water. Bring to a boil, then reduce heat and simmer for 15 minutes until water is absorbed and quinoa is fluffy.",
    "While quinoa is cooking, cut chicken breast into small cubes and season with salt, pepper, and paprika.",
    "Heat 1/2 tbsp of olive oil in a pan over medium-high heat. Add chicken and cook for 6-8 minutes until cooked through. Remove from pan.",
    "In the same pan, add remaining olive oil. Add minced garlic and sauté for 30 seconds.",
    "Add chopped broccoli and bell peppers. Cook for 3-4 minutes until vegetables are tender-crisp.",
    "In a bowl, combine cooked quinoa, chicken, and vegetables.",
    "Drizzle with lemon juice and top with pine nuts.",
    "Serve warm, or refrigerate for a cold meal prep option."
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

// Meal type options
const mealTypeOptions = [
  { value: "breakfast", label: "Breakfast" },
  { value: "lunch", label: "Lunch" },
  { value: "dinner", label: "Dinner" },
  { value: "snack", label: "Snack" },
  { value: "dessert", label: "Dessert" },
];

const NutrientProdigy: React.FC = () => {
  const [macros, setMacros] = useState({
    carbs: 50,
    protein: 30,
    fats: 20
  });
  const [mealType, setMealType] = useState('');
  const [dietaryRequirements, setDietaryRequirements] = useState<string[]>([]);
  const [isGeneratingRecipe, setIsGeneratingRecipe] = useState(false);
  const [recipe, setRecipe] = useState<typeof mockRecipe | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleMacroChange = (type: keyof typeof macros, value: string) => {
    const newValue = parseInt(value) || 0;
    setMacros({
      ...macros,
      [type]: newValue
    });
  };

  const handleDietaryToggle = (value: string) => {
    if (dietaryRequirements.includes(value)) {
      setDietaryRequirements(dietaryRequirements.filter(item => item !== value));
    } else {
      setDietaryRequirements([...dietaryRequirements, value]);
    }
  };

  const handleGenerateRecipe = () => {
    // Validate form
    if (!mealType) {
      toast.error("Please select a meal type");
      return;
    }
    if (macros.carbs + macros.protein + macros.fats !== 100) {
      toast.error("Macronutrient percentages must add up to 100%");
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
              src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2053&auto=format&fit=crop" 
              alt="Healthy balanced meal" 
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
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Nutrient Prodigy</h1>
              <p className="text-xl text-gray-200 mb-6">Your Personalized Macronutrient Guide!</p>
              <p className="text-gray-300">
                Find recipes that match your specific macronutrient goals, perfect for fitness enthusiasts 
                and health-conscious individuals aiming for precise nutritional balance.
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
                  
                  {/* Macronutrient inputs */}
                  <div className="space-y-4 mb-6">
                    <Label className="text-base font-medium">Target Macronutrients</Label>
                    <p className="text-sm text-muted-foreground mb-3">
                      Adjust the percentages of carbs, protein, and fats (must add up to 100%)
                    </p>
                    
                    <div className="space-y-4">
                      {/* Carbs */}
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label htmlFor="carbs" className="flex items-center gap-1">
                            <div className="w-3 h-3 bg-blue-500 rounded-full"></div> Carbohydrates
                          </Label>
                          <span className="text-sm">{macros.carbs}%</span>
                        </div>
                        <Input 
                          id="carbs"
                          type="number"
                          value={macros.carbs}
                          onChange={(e) => handleMacroChange('carbs', e.target.value)}
                          min="0"
                          max="100"
                        />
                      </div>
                      
                      {/* Protein */}
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label htmlFor="protein" className="flex items-center gap-1">
                            <div className="w-3 h-3 bg-red-500 rounded-full"></div> Protein
                          </Label>
                          <span className="text-sm">{macros.protein}%</span>
                        </div>
                        <Input 
                          id="protein"
                          type="number"
                          value={macros.protein}
                          onChange={(e) => handleMacroChange('protein', e.target.value)}
                          min="0"
                          max="100"
                        />
                      </div>
                      
                      {/* Fats */}
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label htmlFor="fats" className="flex items-center gap-1">
                            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div> Fats
                          </Label>
                          <span className="text-sm">{macros.fats}%</span>
                        </div>
                        <Input 
                          id="fats"
                          type="number"
                          value={macros.fats}
                          onChange={(e) => handleMacroChange('fats', e.target.value)}
                          min="0"
                          max="100"
                        />
                      </div>
                    </div>
                    
                    {/* Total indicator */}
                    <div className={`flex justify-between items-center p-3 rounded-md border ${
                      macros.carbs + macros.protein + macros.fats === 100 
                        ? "bg-green-500/10 border-green-500 text-green-600" 
                        : "bg-yellow-500/10 border-yellow-500 text-yellow-600"
                    }`}>
                      <span>Total</span>
                      <span className="font-medium">{macros.carbs + macros.protein + macros.fats}%</span>
                    </div>
                  </div>
                  
                  {/* Meal type */}
                  <div className="space-y-2 mb-6">
                    <Label htmlFor="mealType">Select Meal Type</Label>
                    <div className="flex items-center gap-4">
                      <Apple className="h-4 w-4 text-muted-foreground" />
                      <Select 
                        value={mealType}
                        onValueChange={setMealType}
                        placeholder="Choose a meal type"
                        options={mealTypeOptions}
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
                            <PieChart className="h-3 w-3" />
                            C:{recipe.macros.carbs}% P:{recipe.macros.protein}% F:{recipe.macros.fats}%
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
                      <PieChart className="h-12 w-12 text-muted-foreground/60 mx-auto mb-4" />
                      <h3 className="text-xl font-medium mb-2">Ready to Create Your Recipe</h3>
                      <p className="text-muted-foreground">
                        Set your target macronutrient percentages and meal preferences to generate a nutritionally optimized recipe.
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

export default NutrientProdigy;
