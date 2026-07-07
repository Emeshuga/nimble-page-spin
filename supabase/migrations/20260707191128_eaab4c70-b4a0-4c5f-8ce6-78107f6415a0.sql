
CREATE TABLE public.candidates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre_completo TEXT NOT NULL,
  correo_electronico TEXT NOT NULL,
  telefono TEXT NOT NULL,
  universidad TEXT NOT NULL,
  ano_graduacion INTEGER NOT NULL,
  nivel_ingles TEXT NOT NULL,
  licencia_mexico BOOLEAN NOT NULL,
  navle_status TEXT NOT NULL,
  vip_fast_track BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT INSERT ON public.candidates TO anon, authenticated;
GRANT ALL ON public.candidates TO service_role;

ALTER TABLE public.candidates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit application"
  ON public.candidates FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
