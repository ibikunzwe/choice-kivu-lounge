-- Fix function search path issues by setting secure search_path
DROP FUNCTION IF EXISTS public.update_updated_at_column();
DROP FUNCTION IF EXISTS public.check_room_availability(UUID, TIMESTAMP WITH TIME ZONE, TIMESTAMP WITH TIME ZONE);

-- Recreate functions with secure search_path
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.check_room_availability(
  room_id_param UUID,
  check_in_param TIMESTAMP WITH TIME ZONE,
  check_out_param TIMESTAMP WITH TIME ZONE
)
RETURNS BOOLEAN 
LANGUAGE plpgsql 
SECURITY DEFINER
SET search_path = public
AS $$
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
$$;