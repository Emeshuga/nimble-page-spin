-- The "do you have a current license" question was removed from the
-- /veterinarios form (contradicted the "we handle your license" pitch).
-- Free-text candidate comments replace it.
ALTER TABLE public.candidates
  ALTER COLUMN licencia_mexico DROP NOT NULL,
  ADD COLUMN IF NOT EXISTS comentarios TEXT;
