
import React, { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'framer-motion';
import { 
  Brain, 
  ChefHat, 
  Sparkles, 
  Utensils, 
  Package, 
  Heart,
  HeartPulse
} from 'lucide-react';

const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}> = ({ icon, title, description, delay }) => {
  const controls = useAnimation();
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
      initial="hidden"
      animate={controls}
      transition={{ duration: 0.6, delay }}
      className="bg-card border border-border rounded-lg p-6 shadow-sm"
    >
      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </motion.div>
  );
};

const About: React.FC = () => {
  const mainControls = useAnimation();
  const mainRef = React.useRef(null);
  const mainInView = useInView(mainRef, { once: true });

  useEffect(() => {
    if (mainInView) {
      mainControls.start('visible');
    }
  }, [mainControls, mainInView]);

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero section */}
        <section className="relative bg-gradient-to-b from-black/70 to-background py-24">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1556911220-bda9f7b9e463?q=80&w=2070&auto=format&fit=crop" 
              alt="Cooking innovation" 
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
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">About CookAI</h1>
              <p className="text-xl text-gray-200 mb-6">The Story Behind Our Culinary Innovation</p>
            </motion.div>
          </div>
        </section>
        
        {/* About content */}
        <section className="py-16 px-4" ref={mainRef}>
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Left column - Story */}
              <motion.div
                variants={fadeInUpVariants}
                initial="hidden"
                animate={mainControls}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <h2 className="text-3xl font-bold">Our Mission</h2>
                <p className="text-lg text-muted-foreground">
                  CookAI was born from a simple question: What if technology could transform the way we cook at home?
                </p>
                <p>
                  Our mission is to make cooking accessible, enjoyable, and personalized for everyone. 
                  We believe that delicious, healthy meals shouldn't require professional chef skills or 
                  extensive recipe hunting.
                </p>
                <p>
                  By combining artificial intelligence with culinary expertise, we've created a platform 
                  that adapts to your unique situation – whether you're trying to use up ingredients in your 
                  pantry, following specific dietary requirements, or aiming for particular macronutrient goals.
                </p>
                
                <div className="border-l-4 border-primary pl-4 my-8">
                  <p className="text-xl italic">
                    "We're not just about recipes – we're about making cooking an accessible joy for everyone."
                  </p>
                </div>
                
                <p>
                  CookAI features voice integration in both English and Tamil, making the cooking experience
                  more accessible and convenient. Our step-by-step instructions guide you through each recipe,
                  ensuring success regardless of your cooking skill level.
                </p>
              </motion.div>
              
              {/* Right column - Animated image */}
              <motion.div
                variants={fadeInUpVariants}
                initial="hidden"
                animate={mainControls}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <div className="aspect-video w-full rounded-xl overflow-hidden shadow-xl">
                  <img 
                    src="https://images.unsplash.com/photo-1542010589005-d1eacc3918f2?q=80&w=2092&auto=format&fit=crop" 
                    alt="Team cooking together" 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1, duration: 0.6, type: 'spring' }}
                  className="absolute -bottom-6 -right-6 bg-card border border-border p-3 rounded-lg shadow-lg"
                >
                  <div className="flex items-center gap-3">
                    <Sparkles className="text-primary h-8 w-8" />
                    <div>
                      <p className="text-sm font-medium">AI-Powered Cooking</p>
                      <p className="text-xs text-muted-foreground">Making every meal special</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Features */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-2xl mx-auto mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">CookAI Features</h2>
              <p className="text-muted-foreground">
                Discover the powerful tools that make CookAI a revolutionary cooking companion
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FeatureCard 
                icon={<Package className="h-6 w-6" />}
                title="Pantry Prodigy"
                description="Generate recipes using ingredients you already have at home, reducing waste and grocery trips."
                delay={0.2}
              />
              <FeatureCard 
                icon={<Utensils className="h-6 w-6" />}
                title="Plate Prodigy"
                description="Create recipes tailored to your taste preferences and dietary requirements."
                delay={0.3}
              />
              <FeatureCard 
                icon={<HeartPulse className="h-6 w-6" />}
                title="Nutrient Prodigy"
                description="Find recipes matching your specific macronutrient goals for optimal nutrition."
                delay={0.4}
              />
              <FeatureCard 
                icon={<Brain className="h-6 w-6" />}
                title="Smart Substitutions"
                description="AI-powered ingredient alternatives when you're missing something from a recipe."
                delay={0.5}
              />
              <FeatureCard 
                icon={<ChefHat className="h-6 w-6" />}
                title="Multilingual Voice"
                description="Voice instructions in both English and Tamil for a hands-free cooking experience."
                delay={0.6}
              />
              <FeatureCard 
                icon={<Heart className="h-6 w-6" />}
                title="Personalization"
                description="Save favorite recipes, rate dishes, and share your culinary creations with friends."
                delay={0.7}
              />
            </div>
          </div>
        </section>
        
        {/* Timeline */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-2xl mx-auto mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Our Journey</h2>
              <p className="text-muted-foreground">
                The evolution of CookAI from idea to innovative cooking platform
              </p>
            </motion.div>
            
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-border"></div>
              
              {/* Timeline items */}
              <div className="space-y-12">
                <TimelineItem 
                  year="2022"
                  title="The Idea"
                  description="CookAI began as a simple concept: using AI to help people cook with what they already have."
                  position="left"
                  delay={0.2}
                />
                <TimelineItem 
                  year="2023"
                  title="Development Begins"
                  description="We assembled a team of AI experts and culinary professionals to bring the vision to life."
                  position="right"
                  delay={0.4}
                />
                <TimelineItem 
                  year="2023"
                  title="Voice Integration"
                  description="Added multilingual voice instructions to make cooking more accessible and hands-free."
                  position="left"
                  delay={0.6}
                />
                <TimelineItem 
                  year="2024"
                  title="Launch"
                  description="CookAI launches, bringing intelligent recipe generation to home cooks everywhere."
                  position="right"
                  delay={0.8}
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

const TimelineItem: React.FC<{
  year: string;
  title: string;
  description: string;
  position: 'left' | 'right';
  delay: number;
}> = ({ year, title, description, position, delay }) => {
  const controls = useAnimation();
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <div className="relative flex items-center justify-center">
      <motion.div
        ref={ref}
        variants={{
          hidden: { 
            opacity: 0, 
            x: position === 'left' ? -50 : 50 
          },
          visible: { 
            opacity: 1, 
            x: 0 
          }
        }}
        initial="hidden"
        animate={controls}
        transition={{ duration: 0.6, delay }}
        className={`w-5/12 ${position === 'right' ? 'ml-auto' : 'mr-auto'}`}
      >
        <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
          <div className="text-primary font-bold text-xl mb-2">{year}</div>
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </motion.div>
      
      <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full"></div>
    </div>
  );
};

export default About;
