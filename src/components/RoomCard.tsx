
import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Wifi, Car, Coffee, Bath, MessageCircle } from 'lucide-react';
import { MobileBookingModal } from './MobileBookingModal';
import { ProgressiveImage } from './ProgressiveImage';
import { MobileTouchButton } from './MobileOptimizedCard';

interface Room {
  id: string;
  name: string;
  description: string;
  capacity: number;
  daily_rate: number;
  hourly_rate: number;
  image_url: string;
  amenities: string[];
  is_available: boolean;
}

interface RoomCardProps {
  room: Room;
}

export const RoomCard = ({ room }: RoomCardProps) => {
  const [showBooking, setShowBooking] = useState(false);

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case 'wifi':
      case 'wi-fi':
        return <Wifi className="h-4 w-4" />;
      case 'parking':
        return <Car className="h-4 w-4" />;
      case 'coffee':
      case 'room service':
        return <Coffee className="h-4 w-4" />;
      case 'private bathroom':
        return <Bath className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const handleWhatsAppContact = () => {
    const message = `Hi! I'm interested in booking ${room.name}. Can we discuss pricing?`;
    const phoneNumber = '+250788123456'; // Replace with actual WhatsApp number
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 touch-manipulation">
        <div className="aspect-video relative">
          <ProgressiveImage
            src={room.image_url || '/placeholder.svg'}
            alt={room.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 right-2">
            <Badge variant={room.is_available ? 'default' : 'secondary'}>
              {room.is_available ? 'Available' : 'Unavailable'}
            </Badge>
          </div>
        </div>
        
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between text-lg">
            {room.name}
            <div className="flex items-center text-sm text-muted-foreground">
              <Users className="h-4 w-4 mr-1" />
              {room.capacity}
            </div>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4 pb-4">
          <p className="text-sm text-muted-foreground line-clamp-2">{room.description}</p>
          
          <div className="flex flex-wrap gap-2">
            {room.amenities.map((amenity) => (
              <div key={amenity} className="flex items-center gap-1 text-xs bg-muted px-2 py-1 rounded-full">
                {getAmenityIcon(amenity)}
                {amenity}
              </div>
            ))}
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Daily Rate:</span>
              <div className="text-right">
                <span className="font-bold text-lg">RWF {room.daily_rate}</span>
                <Badge variant="outline" className="ml-2 text-xs">Negotiable</Badge>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Hourly Rate:</span>
              <div className="text-right">
                <span className="font-bold text-lg">RWF {room.hourly_rate}</span>
                <Badge variant="outline" className="ml-2 text-xs">Negotiable</Badge>
              </div>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex gap-2 pt-0">
          <MobileTouchButton 
            className="flex-1" 
            disabled={!room.is_available}
            onClick={() => setShowBooking(true)}
          >
            {room.is_available ? 'Book Now' : 'Unavailable'}
          </MobileTouchButton>
          <MobileTouchButton 
            variant="outline" 
            size="sm"
            onClick={handleWhatsAppContact}
            className="flex items-center gap-1 bg-green-50 hover:bg-green-100 text-green-700 border-green-200"
          >
            <MessageCircle className="h-4 w-4" />
            <span className="hidden sm:inline">WhatsApp</span>
          </MobileTouchButton>
        </CardFooter>
      </Card>

      <MobileBookingModal 
        room={room}
        open={showBooking}
        onOpenChange={setShowBooking}
      />
    </>
  );
};
