import { Button } from "@/components/ui/button";
import GuesthouseCard from "@/components/guesthouse/GuesthouseCard";
import { ArrowRight } from "lucide-react";
import guesthouse1 from "@/assets/guesthouse-1.jpg";
import guesthouse2 from "@/assets/guesthouse-2.jpg";
import guesthouse3 from "@/assets/guesthouse-3.jpg";

const sampleGuesthouses = [
  {
    name: "Ocean Breeze Villa",
    island: "Thulusdhoo",
    image: guesthouse1,
    rating: 4.9,
    pricePerNight: 85,
    amenities: ["Beach Access", "WiFi", "Restaurant"],
    offpeakDiscount: 35,
  },
  {
    name: "Coral Garden Retreat",
    island: "Maafushi",
    image: guesthouse2,
    rating: 4.8,
    pricePerNight: 72,
    amenities: ["Beach Access", "WiFi", "Restaurant"],
    offpeakDiscount: 40,
  },
  {
    name: "Palm Shore Stay",
    island: "Guraidhoo",
    image: guesthouse3,
    rating: 4.7,
    pricePerNight: 65,
    amenities: ["Beach Access", "WiFi"],
    offpeakDiscount: 30,
  },
];

const FeaturedGuesthouses = () => {
  return (
    <section className="py-24 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-coral bg-coral/10 rounded-full">
              Featured Properties
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              Off-peak paradise awaits
            </h2>
          </div>
          <Button variant="outline" className="self-start md:self-auto">
            View All Deals
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleGuesthouses.map((guesthouse) => (
            <GuesthouseCard key={guesthouse.name} {...guesthouse} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedGuesthouses;
