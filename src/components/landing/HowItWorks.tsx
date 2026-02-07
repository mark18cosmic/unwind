import { Building2, ShoppingCart, Gift, Calendar } from "lucide-react";

const steps = [
  {
    icon: Building2,
    step: "01",
    title: "Guesthouses List",
    description: "Maldivian guesthouses create AI-optimized listings showcasing their off-season availability.",
    color: "bg-primary",
  },
  {
    icon: ShoppingCart,
    step: "02",
    title: "Employers Purchase",
    description: "Companies buy bulk room-night packages at exclusive off-peak rates for their team.",
    color: "bg-secondary",
  },
  {
    icon: Gift,
    step: "03",
    title: "Gift Cards Sent",
    description: "HR creates personalized AI-generated gift cards and shares secure links with employees.",
    color: "bg-coral",
  },
  {
    icon: Calendar,
    step: "04",
    title: "Employees Redeem",
    description: "Each employee books their stay at their preferred time during the off-season window.",
    color: "bg-lagoon",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24 px-4 gradient-sand relative">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-secondary bg-secondary/10 rounded-full">
            Simple Process
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            How it works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From listing to redemption, our streamlined process makes 
            rewarding employees with island escapes effortless.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={step.title} className="relative">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[60%] w-full h-0.5 bg-gradient-to-r from-border to-transparent" />
              )}
              
              <div className="text-center">
                <div className="relative inline-flex mb-6">
                  <div className={`w-24 h-24 rounded-2xl ${step.color} flex items-center justify-center shadow-medium`}>
                    <step.icon className="w-10 h-10 text-white" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-background border-2 border-border flex items-center justify-center text-xs font-bold text-muted-foreground">
                    {step.step}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
