
-- Create admin role enum if it doesn't exist
DO $$ BEGIN
    CREATE TYPE app_role AS ENUM ('admin', 'support', 'guest');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Update profiles table to use the enum if not already done
ALTER TABLE profiles ALTER COLUMN role TYPE app_role USING role::app_role;
ALTER TABLE profiles ALTER COLUMN role SET DEFAULT 'guest'::app_role;

-- Create storage bucket for room images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('room-images', 'room-images', true, 52428800, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/avif'])
ON CONFLICT (id) DO NOTHING;

-- Create storage policies for room images
CREATE POLICY "Anyone can view room images"
ON storage.objects FOR SELECT
USING (bucket_id = 'room-images');

CREATE POLICY "Admins can upload room images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'room-images' AND
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

CREATE POLICY "Admins can update room images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'room-images' AND
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

CREATE POLICY "Admins can delete room images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'room-images' AND
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

-- Enable realtime for rooms table
ALTER TABLE rooms REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE rooms;

-- Enable realtime for bookings table  
ALTER TABLE bookings REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE bookings;

-- Update services data to remove restaurant references
UPDATE rooms SET amenities = array_remove(amenities, 'Restaurant') WHERE 'Restaurant' = ANY(amenities);
UPDATE rooms SET amenities = array_append(amenities, 'Beverage Service') WHERE NOT 'Beverage Service' = ANY(amenities);
