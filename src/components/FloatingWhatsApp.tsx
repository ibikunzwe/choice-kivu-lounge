
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const FloatingWhatsApp = () => {
  const handleWhatsAppClick = () => {
    const message = "Hi! I'd like to inquire about your rooms and services. I understand all prices are negotiable.";
    const phoneNumber = '+250788123456'; // Replace with actual WhatsApp number
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 left-6 z-50 h-14 w-14 rounded-full bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse"
      size="sm"
    >
      <MessageCircle className="h-6 w-6" />
      <span className="sr-only">Contact via WhatsApp</span>
    </Button>
  );
};
