
import { Home, Bed, Image, Phone, MessageCircle } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

export const MobileBottomNav = () => {
  const location = useLocation();

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Bed, label: 'Rooms', path: '/rooms' },
    { icon: Image, label: 'Gallery', path: '/gallery' },
    { icon: Phone, label: 'Contact', path: '/contact' },
    { icon: MessageCircle, label: 'WhatsApp', path: '/whatsapp', isExternal: true },
  ];

  const handleWhatsAppClick = () => {
    const message = "Hi! I'd like to inquire about your rooms and services.";
    const phoneNumber = '+250788123456';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-t border-border md:hidden">
      <div className="grid grid-cols-5 h-16">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          if (item.isExternal) {
            return (
              <button
                key={item.label}
                onClick={handleWhatsAppClick}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 p-2 transition-colors",
                  "text-xs font-medium text-muted-foreground hover:text-green-600"
                )}
              >
                <Icon className="h-5 w-5" />
                <span className="text-[10px]">{item.label}</span>
              </button>
            );
          }

          return (
            <Link
              key={item.label}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center gap-1 p-2 transition-colors",
                "text-xs font-medium",
                isActive
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="text-[10px]">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
