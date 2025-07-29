import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Facebook, Instagram, Star } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 hero-gradient rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">CL</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">Choice Lounge</h3>
                <p className="text-sm opacity-80">Experience Comfort & Nature</p>
              </div>
            </div>
            <p className="text-sm opacity-80 leading-relaxed">
              A modern, welcoming lounge and guesthouse located just steps away from the shores of Lake Kivu, offering comfort, elegance & nature in perfect harmony.
            </p>
            <div className="flex space-x-4">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-sm opacity-80">5.0 Guest Rating</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { path: "/", label: "Home" },
                { path: "/about", label: "About Us" },
                { path: "/rooms", label: "Rooms & Apartments" },
                { path: "/gallery", label: "Gallery" },
                { path: "/services", label: "Services" },
                { path: "/contact", label: "Contact" },
              ].map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-sm opacity-80 hover:opacity-100 smooth-transition hover:text-primary-glow"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Our Services</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li>• Modern Rooms & Apartments</li>
              <li>• Lake Kivu View</li>
              <li>• Garden Lounge Area</li>
              <li>• Room Services</li>
              <li>• 24/7 Reception</li>
              <li>• Event Hosting</li>
              <li>• Laundry Service</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary-glow mt-0.5" />
                <div className="text-sm opacity-80">
                  <p>Nyamyumba, Rubavu District</p>
                  <p>Near Brasserie, Lake Kivu</p>
                  <p>Rwanda</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary-glow" />
                <span className="text-sm opacity-80">+250 796 359 524</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary-glow" />
                <span className="text-sm opacity-80">info@choicelounge.rw</span>
              </div>
            </div>
            
            {/* Social Links */}
            <div className="pt-4">
              <h5 className="text-sm font-medium mb-3">Follow Us</h5>
              <div className="flex space-x-3">
                <a href="#" className="w-8 h-8 bg-primary-glow/20 rounded-full flex items-center justify-center hover:bg-primary-glow/30 smooth-transition">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 bg-primary-glow/20 rounded-full flex items-center justify-center hover:bg-primary-glow/30 smooth-transition">
                  <Instagram className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm opacity-80">
            © 2024 Choice Lounge. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm opacity-80">
            <a href="#" className="hover:opacity-100 smooth-transition">Privacy Policy</a>
            <a href="#" className="hover:opacity-100 smooth-transition">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;