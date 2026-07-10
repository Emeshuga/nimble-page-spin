
-- Profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  account_type TEXT NOT NULL CHECK (account_type IN ('vet','clinic')),
  full_name TEXT,
  clinic_name TEXT,
  phone TEXT,
  email TEXT,
  application_stage TEXT NOT NULL DEFAULT 'Perfil recibido',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users view own profile" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "Users insert own profile" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);
CREATE POLICY "Users update own profile" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- Clinic requests
CREATE TABLE public.clinic_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  clinic_name TEXT NOT NULL,
  state TEXT NOT NULL,
  role_type TEXT NOT NULL,
  species_focus TEXT,
  urgency TEXT,
  contact_name TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  contact_phone TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT INSERT ON public.clinic_requests TO anon, authenticated;
GRANT SELECT ON public.clinic_requests TO authenticated;
GRANT ALL ON public.clinic_requests TO service_role;
ALTER TABLE public.clinic_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit clinic request" ON public.clinic_requests FOR INSERT TO anon, authenticated
  WITH CHECK (
    char_length(clinic_name) BETWEEN 2 AND 200
    AND char_length(state) BETWEEN 2 AND 60
    AND char_length(contact_name) BETWEEN 2 AND 120
    AND contact_email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    AND char_length(contact_phone) BETWEEN 7 AND 30
  );
CREATE POLICY "Owners view own clinic requests" ON public.clinic_requests FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

-- updated_at trigger for profiles
CREATE OR REPLACE FUNCTION public.tg_touch_updated_at() RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$ LANGUAGE plpgsql SET search_path = public;
CREATE TRIGGER profiles_touch BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.tg_touch_updated_at();
