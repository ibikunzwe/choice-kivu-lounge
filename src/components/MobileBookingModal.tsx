
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
import { CalendarIcon, ArrowLeft, ArrowRight, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MobileTouchButton } from './MobileOptimizedCard';
import { WhatsAppButton } from './WhatsAppButton';

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

interface MobileBookingModalProps {
  room: Room;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type BookingStep = 'dates' | 'details' | 'summary';

export const MobileBookingModal = ({ room, open, onOpenChange }: MobileBookingModalProps) => {
  const [currentStep, setCurrentStep] = useState<BookingStep>('dates');
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

  const getWhatsAppMessage = () => {
    const checkInStr = bookingData.checkIn ? format(bookingData.checkIn, 'PPP') : 'Not selected';
    const checkOutStr = bookingData.checkOut ? format(bookingData.checkOut, 'PPP') : 'Not selected';
    const total = calculateTotal();
    
    return `Hi! I'd like to book ${room.name}.
    
Details:
- Room: ${room.name}
- Check-in: ${checkInStr}
- Check-out: ${checkOutStr}
- Booking Type: ${bookingData.bookingType}
- Guest Name: ${bookingData.guestName || 'Not provided'}
- Email: ${bookingData.guestEmail || 'Not provided'}
- Phone: ${bookingData.guestPhone || 'Not provided'}
- Estimated Total: $${total} (negotiable)
- Special Requests: ${bookingData.specialRequests || 'None'}

Please confirm availability and final pricing. Thank you!`;
  };

  const renderDatesStep = () => (
    <div className="space-y-6">
      <div>
        <Label className="text-base font-medium">Booking Type</Label>
        <RadioGroup
          value={bookingData.bookingType}
          onValueChange={(value) => setBookingData({ ...bookingData, bookingType: value })}
          className="mt-3"
        >
          <div className="flex items-center space-x-3 p-3 border rounded-lg">
            <RadioGroupItem value="daily" id="daily" />
            <Label htmlFor="daily" className="text-sm">
              Daily (${room.daily_rate}/day - Negotiable)
            </Label>
          </div>
          <div className="flex items-center space-x-3 p-3 border rounded-lg">
            <RadioGroupItem value="hourly" id="hourly" />
            <Label htmlFor="hourly" className="text-sm">
              Hourly (${room.hourly_rate}/hour - Negotiable)
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-4">
        <div>
          <Label className="text-base font-medium">Check-in Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <MobileTouchButton
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal mt-2",
                  !bookingData.checkIn && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {bookingData.checkIn ? format(bookingData.checkIn, "PPP") : "Pick a date"}
              </MobileTouchButton>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={bookingData.checkIn}
                onSelect={(date) => setBookingData({ ...bookingData, checkIn: date })}
                disabled={(date) => date < new Date()}
                initialFocus
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>

        <div>
          <Label className="text-base font-medium">Check-out Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <MobileTouchButton
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal mt-2",
                  !bookingData.checkOut && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {bookingData.checkOut ? format(bookingData.checkOut, "PPP") : "Pick a date"}
              </MobileTouchButton>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={bookingData.checkOut}
                onSelect={(date) => setBookingData({ ...bookingData, checkOut: date })}
                disabled={(date) => date <= (bookingData.checkIn || new Date())}
                initialFocus
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );

  const renderDetailsStep = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="guestName" className="text-base font-medium">Guest Name *</Label>
        <Input
          id="guestName"
          value={bookingData.guestName}
          onChange={(e) => setBookingData({ ...bookingData, guestName: e.target.value })}
          className="mt-2 h-12 text-base"
          required
        />
      </div>
      
      <div>
        <Label htmlFor="guestEmail" className="text-base font-medium">Email *</Label>
        <Input
          id="guestEmail"
          type="email"
          value={bookingData.guestEmail}
          onChange={(e) => setBookingData({ ...bookingData, guestEmail: e.target.value })}
          className="mt-2 h-12 text-base"
          required
        />
      </div>

      <div>
        <Label htmlFor="guestPhone" className="text-base font-medium">Phone Number</Label>
        <Input
          id="guestPhone"
          value={bookingData.guestPhone}
          onChange={(e) => setBookingData({ ...bookingData, guestPhone: e.target.value })}
          className="mt-2 h-12 text-base"
        />
      </div>

      <div>
        <Label htmlFor="specialRequests" className="text-base font-medium">Special Requests</Label>
        <Textarea
          id="specialRequests"
          value={bookingData.specialRequests}
          onChange={(e) => setBookingData({ ...bookingData, specialRequests: e.target.value })}
          rows={3}
          className="mt-2 text-base"
        />
      </div>
    </div>
  );

  const renderSummaryStep = () => (
    <div className="space-y-6">
      <div className="bg-muted/50 p-4 rounded-lg space-y-3">
        <h3 className="font-semibold text-lg">{room.name}</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Check-in:</span>
            <p className="font-medium">
              {bookingData.checkIn ? format(bookingData.checkIn, "PPP") : 'Not selected'}
            </p>
          </div>
          <div>
            <span className="text-muted-foreground">Check-out:</span>
            <p className="font-medium">
              {bookingData.checkOut ? format(bookingData.checkOut, "PPP") : 'Not selected'}
            </p>
          </div>
          <div>
            <span className="text-muted-foreground">Booking Type:</span>
            <p className="font-medium capitalize">{bookingData.bookingType}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Guest:</span>
            <p className="font-medium">{bookingData.guestName}</p>
          </div>
        </div>
      </div>

      {bookingData.checkIn && bookingData.checkOut && (
        <div className="border-t pt-4">
          <div className="flex justify-between items-center text-xl font-bold">
            <span>Estimated Total:</span>
            <div className="text-right">
              <span>${calculateTotal()}</span>
              <p className="text-sm text-muted-foreground font-normal">Prices are negotiable</p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-green-50 p-4 rounded-lg">
        <p className="text-sm text-green-800 mb-3">
          Ready to book? Contact us via WhatsApp to confirm:
        </p>
        <WhatsAppButton 
          message={getWhatsAppMessage()}
          className="w-full bg-green-600 hover:bg-green-700"
        />
      </div>
    </div>
  );

  const canProceedToNext = () => {
    if (currentStep === 'dates') {
      return bookingData.checkIn && bookingData.checkOut;
    }
    if (currentStep === 'details') {
      return bookingData.guestName && bookingData.guestEmail;
    }
    return true;
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 'dates': return 'Select Dates';
      case 'details': return 'Guest Information';
      case 'summary': return 'Booking Summary';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-full h-[90vh] p-0 gap-0">
        {/* Header with step indicator */}
        <DialogHeader className="p-4 border-b bg-muted/50">
          <div className="flex items-center gap-4">
            {currentStep !== 'dates' && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  if (currentStep === 'details') setCurrentStep('dates');
                  if (currentStep === 'summary') setCurrentStep('details');
                }}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
            )}
            <div className="flex-1">
              <DialogTitle className="text-lg">{getStepTitle()}</DialogTitle>
              <div className="flex gap-2 mt-2">
                {['dates', 'details', 'summary'].map((step, index) => (
                  <div
                    key={step}
                    className={cn(
                      "h-1 flex-1 rounded-full transition-colors",
                      currentStep === step || 
                      (currentStep === 'details' && step === 'dates') ||
                      (currentStep === 'summary' && (step === 'dates' || step === 'details'))
                        ? "bg-primary" 
                        : "bg-muted"
                    )}
                  />
                ))}
              </div>
            </div>
          </div>
        </DialogHeader>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {currentStep === 'dates' && renderDatesStep()}
          {currentStep === 'details' && renderDetailsStep()}
          {currentStep === 'summary' && renderSummaryStep()}
        </div>

        {/* Footer with navigation */}
        {currentStep !== 'summary' && (
          <div className="p-4 border-t bg-background">
            <div className="flex gap-3">
              <MobileTouchButton
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="flex-1"
              >
                Cancel
              </MobileTouchButton>
              <MobileTouchButton
                onClick={() => {
                  if (currentStep === 'dates') setCurrentStep('details');
                  if (currentStep === 'details') setCurrentStep('summary');
                }}
                disabled={!canProceedToNext()}
                className="flex-1"
              >
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </MobileTouchButton>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
