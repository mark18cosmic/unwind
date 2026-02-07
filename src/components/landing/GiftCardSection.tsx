import { Button } from "@/components/ui/button";
import GiftCardPreview from "@/components/giftcard/GiftCardPreview";
import { Sparkles } from "lucide-react";

const GiftCardSection = () => {
  return (
    <section className="py-24 px-4 bg-muted/50 overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 text-sm font-medium text-secondary bg-secondary/10 rounded-full">
              <Sparkles className="w-4 h-4" />
              AI-Powered Personalization
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Beautiful gift cards that{" "}
              <span className="text-gradient-ocean">inspire</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Our AI generates personalized messages that make each gift card special. 
              Employees receive beautiful, meaningful rewards that communicate real appreciation — 
              not just another generic bonus.
            </p>

            <ul className="space-y-4 mb-8">
              {[
                "AI-generated personalized messages",
                "Secure, shareable links",
                "Individual redemption flexibility",
                "Track delivery and redemption status",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full gradient-ocean flex items-center justify-center">
                    <svg className="w-3 h-3 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>

            <Button variant="hero" size="lg">
              Try the Gift Card Builder
            </Button>
          </div>

          {/* Gift Card Preview */}
          <div className="relative">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-lagoon/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-coral/20 rounded-full blur-3xl" />
            <div className="relative animate-float">
              <GiftCardPreview
                senderName="Sarah from HR"
                recipientName="Alex"
                guesthouseName="Ocean Breeze Villa"
                island="Thulusdhoo"
                nights={3}
                validFrom="May 1, 2024"
                validTo="Sep 30, 2024"
                message="Thank you for your incredible dedication this year! You've earned a peaceful escape to recharge. Enjoy the crystal-clear waters and warm hospitality of the Maldives."
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GiftCardSection;
