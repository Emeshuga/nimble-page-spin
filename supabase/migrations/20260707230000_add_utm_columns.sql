-- UTM attribution for paid/social traffic. Nullable: organic leads have none.
ALTER TABLE public.candidates
  ADD COLUMN IF NOT EXISTS utm_source TEXT,
  ADD COLUMN IF NOT EXISTS utm_medium TEXT,
  ADD COLUMN IF NOT EXISTS utm_campaign TEXT;
