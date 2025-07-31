
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

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

interface BookingModalProps {
  room: Room;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const BookingModal = ({ room, open, onOpenChange }: BookingModalProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  const [bookingData, setBookingData] = useState({
    bookingType: 'daily',
    checkIn: undefined as Date | undefined,
    checkOut: undefined as Date | undefined,
    guestName: '',
    guestEmail: '',
    guestPhone: '',
    specialRequests: '',
  });

  const calculateTotal = () => {
    if (!bookingData.checkIn || !bookingData.checkOut) return 0;
    
    const diffTime = Math.abs(bookingData.checkOut.getTime() - bookingData.checkIn.getTime());
    const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (bookingData.bookingType === 'hourly') {
      return diffHours * room.hourly_rate;
    } else {
      return diffDays * room.daily_rate;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setLoading(true);
    
    try {
      // Check room availability
      const { data: isAvailable } = await supabase
        .rpc('check_room_availability', {
          room_id_param: room.id,
          check_in_param: bookingData.checkIn?.toISOString(),
          check_out_param: bookingData.checkOut?.toISOString(),
        });

      if (!isAvailable) {
        toast({
          title: "Room Unavailable",
          description: "This room is not available for the selected dates.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      // Create booking
      const { error } = await supabase.from('bookings').insert({
        user_id: user.id,
        room_id: room.id,
        booking_type: bookingData.bookingType,
        check_in: bookingData.checkIn?.toISOString(),
        check_out: bookingData.checkOut?.toISOString(),
        guest_name: bookingData.guestName,
        guest_email: bookingData.guestEmail,
        guest_phone: bookingData.guestPhone,
        special_requests: bookingData.specialRequests,
        total_cost: calculateTotal(),
        status: 'pending',
      });

      if (error) throw error;

      toast({
        title: "Booking Created!",
        description: "Your booking has been successfully created and is pending confirmation.",
      });

      onOpenChange(false);
      setBookingData({
        bookingType: 'daily',
        checkIn: undefined,
        checkOut: undefined,
        guestName: '',
        guestEmail: '',
        guestPhone: '',
        specialRequests: '',
      });
    } catch (error) {
      toast({
        title: "Booking Failed",
        description: "There was an error creating your booking. Please try again.",
        variant: "destructive",
      });
    }
    
    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Book {room.name}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label>Booking Type</Label>
              <RadioGroup
                value={bookingData.bookingType}
                onValueChange={(value) => setBookingData({ ...bookingData, bookingType: value })}
                className="flex gap-6 mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="daily" id="daily" />
                  <Label htmlFor="daily">Daily (${room.daily_rate}/day)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="hourly" id="hourly" />
                  <Label htmlFor="hourly">Hourly (${room.hourly_rate}/hour)</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Check-in Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !bookingData.checkIn && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {bookingData.checkIn ? format(bookingData.checkIn, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={bookingData.checkIn}
                      onSelect={(date) => setBookingData({ ...bookingData, checkIn: date })}
                      disabled={(date) => date < new Date()}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <Label>Check-out Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !bookingData.checkOut && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {bookingData.checkOut ? format(bookingData.checkOut, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={bookingData.checkOut}
                      onSelect={(date) => setBookingData({ ...bookingData, checkOut: date })}
                      disabled={(date) => date <= (bookingData.checkIn || new Date())}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="guestName">Guest Name *</Label>
                <Input
                  id="guestName"
                  value={bookingData.guestName}
                  onChange={(e) => setBookingData({ ...bookingData, guestName: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="guestEmail">Email *</Label>
                <Input
                  id="guestEmail"
                  type="email"
                  value={bookingData.guestEmail}
                  onChange={(e) => setBookingData({ ...bookingData, guestEmail: e.target.value })}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="guestPhone">Phone Number</Label>
              <Input
                id="guestPhone"
                value={bookingData.guestPhone}
                onChange={(e) => setBookingData({ ...bookingData, guestPhone: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="specialRequests">Special Requests</Label>
              <Textarea
                id="specialRequests"
                value={bookingData.specialRequests}
                onChange={(e) => setBookingData({ ...bookingData, specialRequests: e.target.value })}
                rows={3}
              />
            </div>
          </div>

          {bookingData.checkIn && bookingData.checkOut && (
            <div className="border-t pt-4">
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>Total Cost:</span>
                <span>${calculateTotal()}</span>
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading || !bookingData.checkIn || !bookingData.checkOut}
              className="flex-1"
            >
              {loading ? "Creating Booking..." : "Create Booking"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
