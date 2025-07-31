
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';

interface WhatsAppButtonProps {
  message?: string;
  phoneNumber?: string;
  className?: string;
  variant?: 'default' | 'outline' | 'ghost' | 'secondary';
  size?: 'default' | 'sm' | 'lg';
}

export const WhatsAppButton = ({ 
  message = "Hi! I'd like to inquire about your services.",
  phoneNumber = '+250788123456', // Replace with actual WhatsApp number
  className = '',
  variant = 'default',
  size = 'default'
}: WhatsAppButtonProps) => {
  const handleWhatsAppClick = () => {
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Button 
      onClick={handleWhatsAppClick}
      variant={variant}
      size={size}
      className={`bg-green-600 hover:bg-green-700 text-white ${className}`}
    >
      <MessageCircle className="h-4 w-4 mr-2" />
      WhatsApp
    </Button>
  );
};
