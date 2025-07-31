
import { useState, useEffect } from 'react';
import { RoomCard } from '@/components/RoomCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Search, Filter, Users, DollarSign } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
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

const Rooms = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [filteredRooms, setFilteredRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [capacityFilter, setCapacityFilter] = useState<string>('all');
  const [priceFilter, setPriceFilter] = useState<string>('all');
  const [availabilityFilter, setAvailabilityFilter] = useState<string>('all');
  const { toast } = useToast();

  useEffect(() => {
    fetchRooms();
  }, []);

  useEffect(() => {
    filterRooms();
  }, [rooms, searchQuery, capacityFilter, priceFilter, availabilityFilter]);

  const fetchRooms = async () => {
    try {
      const { data, error } = await supabase
        .from('rooms')
        .select('*')
        .order('name');

      if (error) throw error;
      setRooms(data || []);
    } catch (error) {
      toast({
        title: "Error loading rooms",
        description: "There was an error loading the rooms. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filterRooms = () => {
    let filtered = [...rooms];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(room =>
        room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        room.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Capacity filter
    if (capacityFilter !== 'all') {
      const capacity = parseInt(capacityFilter);
      filtered = filtered.filter(room => room.capacity >= capacity);
    }

    // Price filter
    if (priceFilter !== 'all') {
      filtered = filtered.sort((a, b) => {
        if (priceFilter === 'low-to-high') {
          return a.daily_rate - b.daily_rate;
        } else {
          return b.daily_rate - a.daily_rate;
        }
      });
    }

    // Availability filter
    if (availabilityFilter !== 'all') {
      filtered = filtered.filter(room => 
        availabilityFilter === 'available' ? room.is_available : !room.is_available
      );
    }

    setFilteredRooms(filtered);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setCapacityFilter('all');
    setPriceFilter('all');
    setAvailabilityFilter('all');
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-16 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-6">
            <Skeleton className="h-12 w-64" />
            <div className="flex gap-4">
              <Skeleton className="h-10 w-64" />
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-10 w-32" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <Card key={i}>
                  <Skeleton className="h-48 w-full" />
                  <div className="p-4 space-y-3">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-8 w-full" />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">Our Rooms & Suites</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover comfort and luxury in our carefully designed accommodations.
              Each room offers modern amenities and stunning views.
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filter Rooms
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search rooms..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={capacityFilter} onValueChange={setCapacityFilter}>
                <SelectTrigger>
                  <Users className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Capacity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Capacities</SelectItem>
                  <SelectItem value="1">1+ Guests</SelectItem>
                  <SelectItem value="2">2+ Guests</SelectItem>
                  <SelectItem value="4">4+ Guests</SelectItem>
                  <SelectItem value="6">6+ Guests</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={priceFilter} onValueChange={setPriceFilter}>
                <SelectTrigger>
                  <DollarSign className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Price" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="low-to-high">Low to High</SelectItem>
                  <SelectItem value="high-to-low">High to Low</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Availability" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Rooms</SelectItem>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="unavailable">Unavailable</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex justify-between items-center mt-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {filteredRooms.length} of {rooms.length} rooms
                </span>
                {(searchQuery || capacityFilter !== 'all' || priceFilter !== 'all' || availabilityFilter !== 'all') && (
                  <Badge variant="secondary">Filtered</Badge>
                )}
              </div>
              <Button variant="outline" size="sm" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Room Grid */}
        {filteredRooms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredRooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-2xl font-semibold mb-2">No rooms found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search criteria or clearing the filters.
            </p>
            <Button onClick={clearFilters}>Clear All Filters</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Rooms;
