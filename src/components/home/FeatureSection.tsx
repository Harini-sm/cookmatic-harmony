
import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { Package, Utensils, HeartPulse, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  buttonText: string;
  link: string;
  delay: number;
  backgroundImage: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  icon, 
  title, 
  description, 
  buttonText, 
  link, 
  delay,
  backgroundImage
}) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0 });
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
      transition={{ duration: 0.7, delay: delay }}
      className="glass rounded-xl overflow-hidden relative h-[200px] md:h-[220px]"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.4)), url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="p-6 md:p-8 h-full flex flex-col justify-between">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-primary/30 text-primary backdrop-blur-sm">
            {icon}
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
            <p className="text-gray-200 text-sm mb-4">{description}</p>
          </div>
        </div>
        <Button 
          variant="outline" 
          className="group justify-between w-fit ml-auto text-white border-white/30 bg-black/30 backdrop-blur-sm hover:bg-white/10"
          onClick={() => window.location.href = link}
        >
          <span>{buttonText}</span>
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </motion.div>
  );
};

const FeatureSection: React.FC = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0 });
    }
  }, [controls, inView]);

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="container mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Tailored Features</h2>
          <p className="text-muted-foreground">
            Discover, Cook, Savor
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:gap-8">
          <FeatureCard
            icon={<Package className="w-6 h-6" />}
            title="Pantry Prodigy"
            description="Generate recipes using ingredients available in your pantry. Simply input what you have, and let our AI do the rest."
            buttonText="Explore Pantry Prodigy"
            link="/pantry-prodigy"
            delay={0.2}
            backgroundImage="https://images.unsplash.com/photo-1606787366850-de6330128bfc?q=80&w=2070&auto=format&fit=crop"
          />
          <FeatureCard
            icon={<Utensils className="w-6 h-6" />}
            title="Plate Prodigy"
            description="Discover recipes tailored to your taste preferences and dietary requirements, creating personalized culinary experiences."
            buttonText="Explore Plate Prodigy"
            link="/plate-prodigy"
            delay={0.4}
            backgroundImage="https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=2070&auto=format&fit=crop"
          />
          <FeatureCard
            icon={<HeartPulse className="w-6 h-6" />}
            title="Nutrient Prodigy"
            description="Find recipes that match your specific macronutrient goals, perfect for fitness enthusiasts and health-conscious individuals."
            buttonText="Explore Nutrient Prodigy"
            link="/nutrient-prodigy"
            delay={0.6}
            backgroundImage="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2069&auto=format&fit=crop"
          />
        </div>
      </div>

      {/* Decorative background element */}
      <div className="absolute -top-96 -right-96 w-[800px] h-[800px] rounded-full bg-primary/5 blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-96 -left-96 w-[800px] h-[800px] rounded-full bg-primary/5 blur-3xl pointer-events-none"></div>
    </section>
  );
};

export default FeatureSection;
