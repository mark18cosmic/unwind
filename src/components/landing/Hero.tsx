import { Button } from "@/components/ui/button";
import { ArrowRight, Building2, Users } from "lucide-react";
import heroImage from "@/assets/hero-maldives.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Maldivian island paradise"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ocean-deep/90 via-ocean-deep/70 to-ocean-deep/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-ocean-deep/60 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 text-primary-foreground text-sm mb-6 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-lagoon animate-pulse" />
            Now connecting employers with Maldivian guesthouses
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight animate-fade-in-up">
            Turn off-season stays into{" "}
            <span className="text-lagoon">unforgettable</span>{" "}
            employee rewards
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 leading-relaxed max-w-2xl animate-fade-in-up" style={{ animationDelay: "100ms" }}>
            A B2B platform that lets companies purchase bulk Maldivian guesthouse stays 
            as AI-generated digital gift cards — helping businesses reward employees 
            while guesthouses fill empty rooms.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
            <Button variant="hero" size="xl">
              Get Started
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 pt-8 border-t border-primary-foreground/20 animate-fade-in-up" style={{ animationDelay: "300ms" }}>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary-foreground">150+</div>
              <div className="text-sm text-primary-foreground/60">Guesthouses</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary-foreground">40%</div>
              <div className="text-sm text-primary-foreground/60">Avg. Savings</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary-foreground">5K+</div>
              <div className="text-sm text-primary-foreground/60">Gift Cards Sent</div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path 
            d="M0 50C240 80 480 20 720 50C960 80 1200 20 1440 50V100H0V50Z" 
            className="fill-background"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
