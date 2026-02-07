import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Star, Waves, Wifi, UtensilsCrossed } from "lucide-react";

interface GuesthouseCardProps {
  name: string;
  island: string;
  image: string;
  rating: number;
  pricePerNight: number;
  amenities: string[];
  offpeakDiscount?: number;
}

const amenityIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "Beach Access": Waves,
  "WiFi": Wifi,
  "Restaurant": UtensilsCrossed,
};

const GuesthouseCard = ({
  name,
  island,
  image,
  rating,
  pricePerNight,
  amenities,
  offpeakDiscount,
}: GuesthouseCardProps) => {
  return (
    <Card variant="guesthouse" className="overflow-hidden group">
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {offpeakDiscount && (
          <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-coral text-primary-foreground text-sm font-semibold shadow-md">
            {offpeakDiscount}% Off
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
              {name}
            </h3>
            <div className="flex items-center gap-1 text-muted-foreground text-sm">
              <MapPin className="w-3.5 h-3.5" />
              <span>{island}</span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-sunset">
            <Star className="w-4 h-4 fill-current" />
            <span className="font-medium text-sm">{rating}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-4">
          {amenities.slice(0, 3).map((amenity) => {
            const Icon = amenityIcons[amenity] || Waves;
            return (
              <div
                key={amenity}
                className="flex items-center gap-1 px-2 py-1 rounded-md bg-muted text-muted-foreground text-xs"
              >
                <Icon className="w-3 h-3" />
                <span>{amenity}</span>
              </div>
            );
          })}
        </div>

        <div className="flex items-end justify-between pt-3 border-t border-border">
          <div>
            <span className="text-xs text-muted-foreground">From</span>
            <div className="text-xl font-bold text-foreground">
              <span className="text-primary">${pricePerNight}</span>
              <span className="text-sm font-normal text-muted-foreground">/night</span>
            </div>
          </div>
          <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
            Off-peak rate
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default GuesthouseCard;
