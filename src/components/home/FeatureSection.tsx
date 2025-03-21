
import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { Fridge, Utensils, HeartPulse, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  buttonText: string;
  link: string;
  delay: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, buttonText, link, delay }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, threshold: 0.1 });

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
      className="glass rounded-xl overflow-hidden"
    >
      <div className="p-6 md:p-8 h-full flex flex-col">
        <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-primary/10 text-primary mb-6">
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="text-muted-foreground mb-6 flex-grow">{description}</p>
        <Button variant="outline" className="group justify-between">
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
  const inView = useInView(ref, { once: true, threshold: 0.1 });

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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">AI-Powered Recipe Features</h2>
          <p className="text-muted-foreground">
            Explore our advanced AI features designed to make your cooking experience personalized and effortless.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <FeatureCard
            icon={<Fridge className="w-6 h-6" />}
            title="Pantry Prodigy"
            description="Generate recipes using ingredients available in your pantry. Simply input what you have, and let our AI do the rest."
            buttonText="Explore Pantry Prodigy"
            link="/pantry-prodigy"
            delay={0.2}
          />
          <FeatureCard
            icon={<Utensils className="w-6 h-6" />}
            title="Plate Prodigy"
            description="Discover recipes tailored to your taste preferences and dietary requirements, creating personalized culinary experiences."
            buttonText="Explore Plate Prodigy"
            link="/plate-prodigy"
            delay={0.4}
          />
          <FeatureCard
            icon={<HeartPulse className="w-6 h-6" />}
            title="Nutrient Prodigy"
            description="Find recipes that match your specific macronutrient goals, perfect for fitness enthusiasts and health-conscious individuals."
            buttonText="Explore Nutrient Prodigy"
            link="/nutrient-prodigy"
            delay={0.6}
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
