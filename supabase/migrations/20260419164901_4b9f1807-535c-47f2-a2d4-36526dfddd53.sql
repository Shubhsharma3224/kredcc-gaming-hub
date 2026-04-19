-- Create table for game ID verifications
CREATE TABLE public.verifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  game TEXT NOT NULL,
  game_id TEXT NOT NULL,
  in_game_name TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.verifications ENABLE ROW LEVEL SECURITY;

-- Allow anyone (anonymous visitors) to submit a verification
CREATE POLICY "Anyone can insert verifications"
ON public.verifications
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- No SELECT/UPDATE/DELETE policies => data not readable from client (admin-only via dashboard)

-- Index for lookups
CREATE INDEX idx_verifications_game ON public.verifications(game);
CREATE INDEX idx_verifications_created_at ON public.verifications(created_at DESC);