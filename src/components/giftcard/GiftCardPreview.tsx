import { Card, CardContent } from "@/components/ui/card";
import { Gift, Calendar, MapPin, Sparkles } from "lucide-react";

interface GiftCardPreviewProps {
  senderName: string;
  recipientName: string;
  guesthouseName: string;
  island: string;
  nights: number;
  validFrom: string;
  validTo: string;
  message?: string;
}

const GiftCardPreview = ({
  senderName,
  recipientName,
  guesthouseName,
  island,
  nights,
  validFrom,
  validTo,
  message,
}: GiftCardPreviewProps) => {
  return (
    <Card variant="gift" className="max-w-md mx-auto overflow-hidden">
      {/* Header with gradient */}
      <div className="gradient-ocean p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <Gift className="w-5 h-5" />
            <span className="text-sm font-medium opacity-90">Unwind</span>
          </div>
          <h3 className="text-2xl font-bold mb-1">
            You've received a gift!
          </h3>
          <p className="text-white/80 text-sm">
            An island escape awaits you
          </p>
        </div>
      </div>

      <CardContent className="p-6 space-y-6">
        {/* Recipient info */}
        <div className="text-center pb-4 border-b border-border">
          <p className="text-muted-foreground text-sm mb-1">Dear</p>
          <p className="text-xl font-semibold">{recipientName}</p>
        </div>

        {/* AI Message */}
        {message && (
          <div className="relative p-4 rounded-xl bg-muted/50 border border-border">
            <Sparkles className="absolute -top-2 -left-2 w-5 h-5 text-coral" />
            <p className="text-sm text-muted-foreground italic leading-relaxed">
              "{message}"
            </p>
            <p className="text-xs text-muted-foreground mt-2 text-right">
              — {senderName}
            </p>
          </div>
        )}

        {/* Stay details */}
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/5">
            <MapPin className="w-5 h-5 text-primary" />
            <div>
              <p className="font-medium">{guesthouseName}</p>
              <p className="text-sm text-muted-foreground">{island}, Maldives</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-secondary/10 text-center">
              <p className="text-2xl font-bold text-secondary">{nights}</p>
              <p className="text-xs text-muted-foreground">Nights Included</p>
            </div>
            <div className="p-3 rounded-lg bg-coral/10 text-center">
              <Calendar className="w-5 h-5 mx-auto mb-1 text-coral" />
              <p className="text-xs text-muted-foreground">Valid Period</p>
            </div>
          </div>

          <div className="text-center p-3 rounded-lg border border-dashed border-border">
            <p className="text-xs text-muted-foreground mb-1">Redeem between</p>
            <p className="font-medium text-sm">
              {validFrom} — {validTo}
            </p>
          </div>
        </div>

        {/* CTA hint */}
        <div className="text-center pt-4">
          <p className="text-xs text-muted-foreground">
            Click "Redeem Your Stay" to choose your dates
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default GiftCardPreview;
