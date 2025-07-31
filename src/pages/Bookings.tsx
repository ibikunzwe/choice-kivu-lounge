
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  DollarSign,
  Phone,
  Mail,
  FileText,
  AlertCircle
} from 'lucide-react';

interface Booking {
  id: string;
  room_id: string;
  booking_type: string;
  check_in: string;
  check_out: string;
  guest_name: string;
  guest_email: string;
  guest_phone: string;
  special_requests: string;
  total_cost: number;
  status: string;
  created_at: string;
  rooms: {
    name: string;
    description: string;
    capacity: number;
    image_url: string;
  };
}

const Bookings = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchBookings();
    }
  }, [user]);

  const fetchBookings = async () => {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          rooms (
            name,
            description,
            capacity,
            image_url
          )
        `)
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBookings(data || []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      toast({
        title: "Error loading bookings",
        description: "There was an error loading your bookings.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return '✓';
      case 'pending':
        return '⏳';
      case 'cancelled':
        return '✗';
      default:
        return '?';
    }
  };

  const handleCancelBooking = async (bookingId: string) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status: 'cancelled' })
        .eq('id', bookingId);

      if (error) throw error;

      setBookings(bookings.map(booking => 
        booking.id === bookingId 
          ? { ...booking, status: 'cancelled' }
          : booking
      ));

      toast({
        title: "Booking cancelled",
        description: "Your booking has been successfully cancelled.",
      });
    } catch (error) {
      toast({
        title: "Cancellation failed",
        description: "There was an error cancelling your booking.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen pt-16 bg-muted/30">
          <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="space-y-6">
              <Skeleton className="h-12 w-48" />
              <div className="grid gap-6">
                {[...Array(3)].map((_, i) => (
                  <Card key={i}>
                    <div className="p-6 space-y-4">
                      <div className="flex justify-between">
                        <Skeleton className="h-6 w-32" />
                        <Skeleton className="h-6 w-20" />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Skeleton className="h-32 w-full" />
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-2/3" />
                          <Skeleton className="h-4 w-1/2" />
                        </div>
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-2/3" />
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen pt-16 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="space-y-8">
            {/* Header */}
            <div className="space-y-4">
              <h1 className="text-3xl font-bold">My Bookings</h1>
              <p className="text-muted-foreground">
                View and manage all your hotel reservations
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{bookings.length}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Confirmed</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    {bookings.filter(b => b.status === 'confirmed').length}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-600">
                    {bookings.filter(b => b.status === 'pending').length}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    ${bookings.reduce((sum, booking) => sum + Number(booking.total_cost), 0)}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Bookings List */}
            {bookings.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No bookings yet</h3>
                  <p className="text-muted-foreground mb-4">
                    You haven't made any bookings yet. Browse our rooms to get started.
                  </p>
                  <Button>
                    <MapPin className="mr-2 h-4 w-4" />
                    Browse Rooms
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {bookings.map((booking) => (
                  <Card key={booking.id} className="overflow-hidden">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <CardTitle className="flex items-center gap-2">
                            {booking.rooms.name}
                            <Badge className={getStatusColor(booking.status)}>
                              {getStatusIcon(booking.status)} {booking.status}
                            </Badge>
                          </CardTitle>
                          <p className="text-sm text-muted-foreground">
                            Booking ID: {booking.id.substring(0, 8)}...
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold">${booking.total_cost}</div>
                          <div className="text-sm text-muted-foreground capitalize">
                            {booking.booking_type} booking
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        {/* Room Image */}
                        <div className="lg:col-span-1">
                          <img
                            src={booking.rooms.image_url || '/placeholder.svg'}
                            alt={booking.rooms.name}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                        </div>
                        
                        {/* Booking Details */}
                        <div className="lg:col-span-2 space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 text-sm">
                                <Calendar className="h-4 w-4" />
                                <span className="font-medium">Check-in</span>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {format(new Date(booking.check_in), 'PPP p')}
                              </p>
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 text-sm">
                                <Calendar className="h-4 w-4" />
                                <span className="font-medium">Check-out</span>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {format(new Date(booking.check_out), 'PPP p')}
                              </p>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 text-sm">
                                <Users className="h-4 w-4" />
                                <span className="font-medium">Capacity</span>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {booking.rooms.capacity} guests
                              </p>
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 text-sm">
                                <Clock className="h-4 w-4" />
                                <span className="font-medium">Booked</span>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {format(new Date(booking.created_at), 'PPP')}
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        {/* Guest Info & Actions */}
                        <div className="lg:col-span-1 space-y-4">
                          <div className="space-y-3">
                            <div>
                              <div className="flex items-center gap-2 text-sm font-medium mb-1">
                                <Users className="h-4 w-4" />
                                Guest Information
                              </div>
                              <p className="text-sm text-muted-foreground">{booking.guest_name}</p>
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Mail className="h-3 w-3" />
                                <span className="truncate">{booking.guest_email}</span>
                              </div>
                              {booking.guest_phone && (
                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                  <Phone className="h-3 w-3" />
                                  {booking.guest_phone}
                                </div>
                              )}
                            </div>
                            
                            {booking.special_requests && (
                              <div>
                                <div className="flex items-center gap-2 text-sm font-medium mb-1">
                                  <FileText className="h-4 w-4" />
                                  Special Requests
                                </div>
                                <p className="text-xs text-muted-foreground">
                                  {booking.special_requests}
                                </p>
                              </div>
                            )}
                          </div>
                          
                          {booking.status === 'pending' && (
                            <Button
                              variant="destructive"
                              size="sm"
                              className="w-full"
                              onClick={() => handleCancelBooking(booking.id)}
                            >
                              <AlertCircle className="mr-2 h-4 w-4" />
                              Cancel Booking
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Bookings;
