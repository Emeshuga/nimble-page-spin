-- Candidate portal: document uploads + per-candidate task list.
-- Follows the same RLS conventions as profiles/clinic_requests (auth.uid() scoping).

-- ————————————————————————————————————————————————
-- 1. Documents metadata (files themselves live in Storage)
-- ————————————————————————————————————————————————
CREATE TABLE public.candidate_documents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  doc_type TEXT NOT NULL CHECK (char_length(doc_type) BETWEEN 2 AND 60),
  file_path TEXT NOT NULL,
  original_name TEXT NOT NULL CHECK (char_length(original_name) BETWEEN 1 AND 200),
  -- pendiente = uploaded, awaiting review; aprobado / rechazado set by coordinator (service_role)
  status TEXT NOT NULL DEFAULT 'pendiente' CHECK (status IN ('pendiente','aprobado','rechazado')),
  review_note TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.candidate_documents TO authenticated;
GRANT DELETE ON public.candidate_documents TO authenticated;
GRANT ALL ON public.candidate_documents TO service_role;
ALTER TABLE public.candidate_documents ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users view own documents" ON public.candidate_documents
  FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users add own documents" ON public.candidate_documents
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
-- Users may remove a doc only while it's still pending review.
CREATE POLICY "Users delete own pending documents" ON public.candidate_documents
  FOR DELETE TO authenticated USING (auth.uid() = user_id AND status = 'pendiente');

-- ————————————————————————————————————————————————
-- 2. Task list (seeded client-side with defaults; users can add their own,
--    coordinator can add via service_role)
-- ————————————————————————————————————————————————
CREATE TABLE public.candidate_tasks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL CHECK (char_length(title) BETWEEN 2 AND 200),
  done BOOLEAN NOT NULL DEFAULT false,
  done_at TIMESTAMPTZ,
  sort_order INT NOT NULL DEFAULT 100,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.candidate_tasks TO authenticated;
-- Column-level grant: users can only flip completion, not rewrite titles.
GRANT UPDATE (done, done_at) ON public.candidate_tasks TO authenticated;
GRANT ALL ON public.candidate_tasks TO service_role;
ALTER TABLE public.candidate_tasks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users view own tasks" ON public.candidate_tasks
  FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users add own tasks" ON public.candidate_tasks
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own tasks" ON public.candidate_tasks
  FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- ————————————————————————————————————————————————
-- 3. Private storage bucket for candidate documents
--    Path convention: {auth.uid()}/{timestamp}_{filename}
-- ————————————————————————————————————————————————
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'candidate-docs',
  'candidate-docs',
  false,
  10485760, -- 10 MB
  ARRAY['application/pdf','image/jpeg','image/png','image/webp']
)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Users upload to own folder" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'candidate-docs' AND (storage.foldername(name))[1] = auth.uid()::text);
CREATE POLICY "Users read own folder" ON storage.objects
  FOR SELECT TO authenticated
  USING (bucket_id = 'candidate-docs' AND (storage.foldername(name))[1] = auth.uid()::text);
CREATE POLICY "Users delete own files" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'candidate-docs' AND (storage.foldername(name))[1] = auth.uid()::text);
