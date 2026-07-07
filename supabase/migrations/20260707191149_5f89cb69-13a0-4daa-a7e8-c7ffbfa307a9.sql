
DROP POLICY IF EXISTS "Anyone can submit application" ON public.candidates;

CREATE POLICY "Anyone can submit valid application"
  ON public.candidates FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    char_length(nombre_completo) BETWEEN 2 AND 120
    AND char_length(correo_electronico) BETWEEN 5 AND 254
    AND correo_electronico ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    AND char_length(telefono) BETWEEN 7 AND 30
    AND universidad IN ('FMVZ-UNAM','Otra Universidad')
    AND ano_graduacion BETWEEN 2010 AND 2026
    AND nivel_ingles IN ('Básico','Intermedio','Avanzado','Fluido/Nativo')
    AND navle_status IN ('Aprobado','Estudiando','No')
  );
