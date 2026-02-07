import { Link } from "react-router-dom";
import { Waves, Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-ocean-deep text-white py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center">
                <Waves className="w-5 h-5" />
              </div>
              <span className="font-bold text-lg">OffPeak Rewards</span>
            </Link>
            <p className="text-white/70 text-sm leading-relaxed mb-4">
              Connecting global employers with Maldivian island experiences. 
              Reward your team with unforgettable getaways.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* For Employers */}
          <div>
            <h4 className="font-semibold mb-4">For Employers</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-sm text-white/70 hover:text-white transition-colors">How It Works</Link></li>
              <li><Link to="/" className="text-sm text-white/70 hover:text-white transition-colors">Browse Deals</Link></li>
              <li><Link to="/" className="text-sm text-white/70 hover:text-white transition-colors">Bulk Pricing</Link></li>
              <li><Link to="/" className="text-sm text-white/70 hover:text-white transition-colors">Gift Card Builder</Link></li>
            </ul>
          </div>

          {/* For Guesthouses */}
          <div>
            <h4 className="font-semibold mb-4">For Guesthouses</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-sm text-white/70 hover:text-white transition-colors">List Your Property</Link></li>
              <li><Link to="/" className="text-sm text-white/70 hover:text-white transition-colors">AI Listing Tools</Link></li>
              <li><Link to="/" className="text-sm text-white/70 hover:text-white transition-colors">Revenue Insights</Link></li>
              <li><Link to="/" className="text-sm text-white/70 hover:text-white transition-colors">Success Stories</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-white/70">
                <MapPin className="w-4 h-4" />
                <span>Malé, Maldives</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-white/70">
                <Mail className="w-4 h-4" />
                <span>hello@offpeakrewards.com</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-white/70">
                <Phone className="w-4 h-4" />
                <span>+960 123 4567</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/50">
            © 2024 OffPeak Rewards. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/" className="text-sm text-white/50 hover:text-white/70 transition-colors">Privacy</Link>
            <Link to="/" className="text-sm text-white/50 hover:text-white/70 transition-colors">Terms</Link>
            <Link to="/" className="text-sm text-white/50 hover:text-white/70 transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
