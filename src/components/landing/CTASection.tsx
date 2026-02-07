import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-24 px-4 gradient-ocean relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary-foreground/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-foreground/5 rounded-full translate-x-1/2 translate-y-1/2" />
      <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-primary-foreground/30 rounded-full" />
      <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-primary-foreground/20 rounded-full" />

      <div className="container mx-auto max-w-4xl relative z-10 text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
          Ready to transform your employee rewards?
        </h2>
        <p className="text-lg md:text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
          Join forward-thinking companies who are giving their teams unforgettable 
          experiences while supporting sustainable island tourism.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="xl" 
            className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-lg"
          >
            Start Rewarding Today
            <ArrowRight className="w-5 h-5" />
          </Button>
          <Button variant="heroOutline" size="xl">
            Talk to Sales
          </Button>
        </div>

        <p className="text-sm text-primary-foreground/60 mt-8">
          No minimum purchase required • Free setup • Cancel anytime
        </p>
      </div>
    </section>
  );
};

export default CTASection;
