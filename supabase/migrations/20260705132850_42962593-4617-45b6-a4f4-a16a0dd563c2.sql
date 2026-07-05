
ALTER TABLE public.verifications
  ADD COLUMN IF NOT EXISTS plan_title TEXT,
  ADD COLUMN IF NOT EXISTS plan_price NUMERIC,
  ADD COLUMN IF NOT EXISTS action TEXT NOT NULL DEFAULT 'verify';

GRANT SELECT ON public.verifications TO anon, authenticated;

DROP POLICY IF EXISTS "Anyone can read verifications" ON public.verifications;
CREATE POLICY "Anyone can read verifications"
  ON public.verifications
  FOR SELECT
  TO anon, authenticated
  USING (true);
