-- Create rooms table with 16 different rooms
CREATE TABLE public.rooms (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  capacity INTEGER NOT NULL,
  hourly_rate DECIMAL(10,2) NOT NULL,
  daily_rate DECIMAL(10,2) NOT NULL,
  amenities TEXT[],
  image_url TEXT,
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create bookings table
CREATE TABLE public.bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  room_id UUID REFERENCES public.rooms(id) ON DELETE CASCADE NOT NULL,
  guest_name TEXT NOT NULL,
  guest_email TEXT NOT NULL,
  guest_phone TEXT,
  check_in TIMESTAMP WITH TIME ZONE NOT NULL,
  check_out TIMESTAMP WITH TIME ZONE NOT NULL,
  booking_type TEXT CHECK (booking_type IN ('hourly', 'daily')) NOT NULL,
  total_cost DECIMAL(10,2) NOT NULL,
  status TEXT CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')) DEFAULT 'pending',
  special_requests TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create chat messages table
CREATE TABLE public.chat_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  guest_name TEXT,
  guest_email TEXT,
  message TEXT NOT NULL,
  is_from_support BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create profiles table for user management
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  full_name TEXT,
  email TEXT,
  phone TEXT,
  role TEXT CHECK (role IN ('guest', 'admin', 'support')) DEFAULT 'guest',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies for rooms (public read access)
CREATE POLICY "Anyone can view rooms" 
ON public.rooms 
FOR SELECT 
USING (true);

CREATE POLICY "Only admins can modify rooms" 
ON public.rooms 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

-- RLS Policies for bookings
CREATE POLICY "Users can view their own bookings" 
ON public.bookings 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own bookings" 
ON public.bookings 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own bookings" 
ON public.bookings 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all bookings" 
ON public.bookings 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() AND role IN ('admin', 'support')
  )
);

-- RLS Policies for chat messages
CREATE POLICY "Users can view messages they sent or received" 
ON public.chat_messages 
FOR SELECT 
USING (
  auth.uid() = user_id OR 
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() AND role IN ('admin', 'support')
  )
);

CREATE POLICY "Users can send messages" 
ON public.chat_messages 
FOR INSERT 
WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Support can send messages" 
ON public.chat_messages 
FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() AND role IN ('admin', 'support')
  )
);

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create trigger function for updating timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_rooms_updated_at
    BEFORE UPDATE ON public.rooms
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at
    BEFORE UPDATE ON public.bookings
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Function to check room availability
CREATE OR REPLACE FUNCTION public.check_room_availability(
  room_id_param UUID,
  check_in_param TIMESTAMP WITH TIME ZONE,
  check_out_param TIMESTAMP WITH TIME ZONE
)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN NOT EXISTS (
    SELECT 1 
    FROM public.bookings 
    WHERE room_id = room_id_param 
    AND status IN ('confirmed', 'pending')
    AND (
      (check_in_param >= check_in AND check_in_param < check_out) OR
      (check_out_param > check_in AND check_out_param <= check_out) OR
      (check_in_param <= check_in AND check_out_param >= check_out)
    )
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Insert 16 sample rooms
INSERT INTO public.rooms (name, description, capacity, hourly_rate, daily_rate, amenities, image_url) VALUES
('Executive Suite', 'Luxury suite with lake view, perfect for business meetings or intimate gatherings', 8, 25.00, 180.00, '{"WiFi", "Air Conditioning", "Lake View", "Mini Bar", "Coffee Machine"}', '/images/lake-kivu-balcony-view.png'),
('Garden Lounge', 'Peaceful outdoor space surrounded by lush gardens, ideal for relaxation', 6, 20.00, 140.00, '{"Garden View", "Outdoor Seating", "WiFi", "Natural Lighting"}', '/images/garden-lounge.jpg'),
('Conference Room A', 'Professional meeting space with modern amenities and presentation equipment', 12, 35.00, 250.00, '{"Projector", "Whiteboard", "WiFi", "Air Conditioning", "Conference Table"}', '/images/reception-interior.jpg'),
('Lakeside Terrace', 'Open-air terrace with stunning Lake Kivu views, perfect for events', 15, 30.00, 220.00, '{"Lake View", "Outdoor Seating", "Event Setup", "WiFi", "Bar Service"}', '/images/lake-kivu-balcony-view.png'),
('Private Office', 'Quiet workspace for focused meetings or individual work sessions', 4, 18.00, 120.00, '{"WiFi", "Desk", "Air Conditioning", "Privacy", "Power Outlets"}', '/images/modern-room.jpg'),
('Boardroom Elite', 'Premium boardroom for executive meetings and important discussions', 10, 40.00, 300.00, '{"Large Conference Table", "Video Conferencing", "WiFi", "Premium Seating", "Catering Service"}', '/images/reception-desk.png'),
('Casual Lounge', 'Relaxed seating area perfect for informal meetings and social gatherings', 8, 22.00, 160.00, '{"Comfortable Seating", "WiFi", "Coffee Table", "Ambient Lighting"}', '/images/choice-lounge-exterior.jpg'),
('Study Room', 'Quiet space designed for studying, reading, or small group discussions', 6, 15.00, 100.00, '{"Study Desks", "WiFi", "Quiet Environment", "Good Lighting", "Power Outlets"}', '/images/modern-room.jpg'),
('Event Hall', 'Large multipurpose hall suitable for parties, workshops, and events', 25, 50.00, 400.00, '{"Stage", "Sound System", "Lighting", "WiFi", "Catering Space", "Large Capacity"}', '/images/exterior-wide-view.png'),
('Rooftop Lounge', 'Elevated space with panoramic views, perfect for evening gatherings', 12, 28.00, 200.00, '{"Panoramic View", "Outdoor Seating", "Bar Setup", "WiFi", "Evening Ambiance"}', '/images/building-exterior-stairs.png'),
('Creative Studio', 'Inspiring space for brainstorming sessions and creative workshops', 10, 25.00, 180.00, '{"Whiteboards", "Flexible Seating", "WiFi", "Natural Light", "Creative Tools"}', '/images/area-overview.png'),
('VIP Lounge', 'Exclusive premium space for distinguished guests and special occasions', 6, 45.00, 350.00, '{"Premium Furnishing", "Exclusive Access", "Concierge Service", "WiFi", "Bar Service"}', '/images/choice-lounge-buildings.jpg'),
('Meeting Pod A', 'Intimate meeting space for small team discussions and one-on-ones', 4, 20.00, 140.00, '{"Round Table", "WiFi", "Privacy", "Video Calling", "Comfortable Seating"}', '/images/reception-interior.jpg'),
('Meeting Pod B', 'Cozy discussion area perfect for client meetings and consultations', 4, 20.00, 140.00, '{"Round Table", "WiFi", "Privacy", "Video Calling", "Comfortable Seating"}', '/images/modern-room.jpg'),
('Outdoor Pavilion', 'Covered outdoor space ideal for nature-inspired meetings and events', 20, 35.00, 280.00, '{"Covered Outdoor", "Nature View", "Event Setup", "WiFi", "Weather Protection"}', '/images/buildings-complex.png'),
('Innovation Lab', 'Modern tech-enabled space for workshops, training, and collaborative work', 15, 32.00, 240.00, '{"Smart Board", "High-Speed WiFi", "Collaboration Tools", "Flexible Layout", "Tech Support"}', '/images/building-exterior.jpg');

-- Enable realtime for tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.bookings;
ALTER PUBLICATION supabase_realtime ADD TABLE public.chat_messages;
ALTER PUBLICATION supabase_realtime ADD TABLE public.rooms;