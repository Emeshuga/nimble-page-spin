import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  LogOut,
  MessageCircle,
  CheckCircle2,
  Circle,
  FileText,
  Upload,
  Trash2,
  Download,
  Plus,
  ListChecks,
} from "lucide-react";

export const Route = createFileRoute("/dashboard/vet")({
  head: () => ({
    meta: [
      { title: "Panel del Veterinario | VetBridge USA" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: VetDashboard,
});

const STAGES = [
  "Perfil recibido",
  "Evaluación",
  "Preparación NAVLE",
  "Licencia",
  "Visa",
  "Colocación",
] as const;

const DOC_TYPES = [
  "Título profesional",
  "Cédula profesional",
  "Kardex / Historial académico",
  "Pasaporte",
  "CV",
  "Certificado de inglés",
  "Constancia NAVLE",
  "Otro",
] as const;

// Seeded once per candidate on first visit; they can add their own after.
const DEFAULT_TASKS = [
  "Completa tu información de contacto",
  "Sube tu título profesional",
  "Sube tu cédula profesional",
  "Sube tu kardex / historial académico",
  "Sube tu pasaporte vigente",
  "Sube tu CV actualizado",
  "Agenda tu llamada de evaluación",
];

const DOC_STATUS_STYLE: Record<string, string> = {
  pendiente: "bg-secondary text-muted-foreground",
  aprobado: "bg-[#2f9e6f]/15 text-[#2f9e6f]",
  rechazado: "bg-destructive/10 text-destructive",
};
const DOC_STATUS_LABEL: Record<string, string> = {
  pendiente: "En revisión",
  aprobado: "Aprobado",
  rechazado: "Rechazado",
};

type Profile = {
  id: string;
  full_name: string | null;
  phone: string | null;
  email: string | null;
  application_stage: string;
  account_type: string;
};

type Doc = {
  id: string;
  doc_type: string;
  file_path: string;
  original_name: string;
  status: string;
  review_note: string | null;
  created_at: string;
};

type Task = {
  id: string;
  title: string;
  done: boolean;
  sort_order: number;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const db = supabase as any;

function VetDashboard() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<number | null>(null);
  const [portalReady, setPortalReady] = useState(true);

  const [docs, setDocs] = useState<Doc[]>([]);
  const [docType, setDocType] = useState<string>(DOC_TYPES[0]);
  const [uploading, setUploading] = useState(false);
  const [docError, setDocError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    (async () => {
      const { data: sess } = await supabase.auth.getSession();
      if (!sess.session) {
        navigate({ to: "/auth" });
        return;
      }
      const uid = sess.session.user.id;
      const { data } = await supabase
        .from("profiles")
        .select("id, full_name, phone, email, application_stage, account_type")
        .eq("id", uid)
        .maybeSingle();
      if (data?.account_type === "clinic") {
        navigate({ to: "/dashboard/clinic" });
        return;
      }
      setProfile(data as Profile | null);
      setLoading(false);

      // Portal data. If the migration hasn't been applied yet these queries
      // fail with "relation does not exist" — hide the sections gracefully.
      const [dRes, tRes] = await Promise.all([
        db.from("candidate_documents").select("*").order("created_at", { ascending: false }),
        db.from("candidate_tasks").select("id, title, done, sort_order").order("sort_order"),
      ]);
      if (dRes.error || tRes.error) {
        setPortalReady(false);
        return;
      }
      setDocs(dRes.data ?? []);
      let taskRows: Task[] = tRes.data ?? [];
      if (taskRows.length === 0) {
        // First visit: seed the default checklist.
        const seed = DEFAULT_TASKS.map((title, i) => ({
          user_id: uid,
          title,
          sort_order: (i + 1) * 10,
        }));
        const { data: seeded } = await db
          .from("candidate_tasks")
          .insert(seed)
          .select("id, title, done, sort_order");
        taskRows = seeded ?? [];
      }
      setTasks(taskRows);
    })();
  }, [navigate]);

  async function save() {
    if (!profile) return;
    setSaving(true);
    await supabase
      .from("profiles")
      .update({
        full_name: profile.full_name,
        phone: profile.phone,
      })
      .eq("id", profile.id);
    setSaving(false);
    setSavedAt(Date.now());
  }

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/auth" });
  }

  async function uploadDoc() {
    const file = fileRef.current?.files?.[0];
    if (!file || !profile) return;
    setDocError(null);
    if (file.size > 10 * 1024 * 1024) {
      setDocError("El archivo supera 10 MB. Comprime el PDF o usa una imagen más ligera.");
      return;
    }
    setUploading(true);
    const safeName = file.name.replace(/[^\w.\-]+/g, "_").slice(-90);
    const path = `${profile.id}/${Date.now()}_${safeName}`;
    const { error: upErr } = await supabase.storage.from("candidate-docs").upload(path, file);
    if (upErr) {
      setUploading(false);
      setDocError("No se pudo subir el archivo. Usa PDF, JPG o PNG (máx. 10 MB).");
      return;
    }
    const { data: row, error: insErr } = await db
      .from("candidate_documents")
      .insert({
        user_id: profile.id,
        doc_type: docType,
        file_path: path,
        original_name: file.name.slice(0, 200),
      })
      .select("*")
      .single();
    setUploading(false);
    if (insErr) {
      setDocError("El archivo subió pero no se registró. Intenta de nuevo.");
      return;
    }
    setDocs((prev) => [row as Doc, ...prev]);
    if (fileRef.current) fileRef.current.value = "";
  }

  async function removeDoc(doc: Doc) {
    await db.from("candidate_documents").delete().eq("id", doc.id);
    await supabase.storage.from("candidate-docs").remove([doc.file_path]);
    setDocs((prev) => prev.filter((d) => d.id !== doc.id));
  }

  async function openDoc(doc: Doc) {
    const { data } = await supabase.storage
      .from("candidate-docs")
      .createSignedUrl(doc.file_path, 60);
    if (data?.signedUrl) window.open(data.signedUrl, "_blank", "noopener");
  }

  async function toggleTask(task: Task) {
    const done = !task.done;
    setTasks((prev) => prev.map((t) => (t.id === task.id ? { ...t, done } : t)));
    await db
      .from("candidate_tasks")
      .update({ done, done_at: done ? new Date().toISOString() : null })
      .eq("id", task.id);
  }

  async function addTask() {
    const title = newTask.trim();
    if (title.length < 2 || !profile) return;
    setNewTask("");
    const { data: row } = await db
      .from("candidate_tasks")
      .insert({ user_id: profile.id, title, sort_order: 1000 + tasks.length })
      .select("id, title, done, sort_order")
      .single();
    if (row) setTasks((prev) => [...prev, row as Task]);
  }

  if (loading) {
    return <div className="p-8 text-sm text-muted-foreground">Cargando…</div>;
  }
  if (!profile) return null;

  const currentIdx = STAGES.findIndex((s) => s === profile.application_stage);
  const doneTasks = tasks.filter((t) => t.done).length;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <DashHeader label="Panel del Veterinario" onSignOut={signOut} />
      <main className="mx-auto max-w-4xl space-y-8 px-4 py-10">
        <section>
          <h1 className="text-3xl font-bold tracking-tight">
            Hola, {profile.full_name?.split(" ")[0] || "Doctor(a)"}
          </h1>
          <p className="mt-2 text-muted-foreground">
            Sigue tu proceso, sube tus documentos y completa tus pendientes aquí.
          </p>
        </section>

        <section className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
          <h2 className="text-xl font-semibold">Etapa de tu aplicación</h2>
          <div className="mt-6 space-y-3">
            {STAGES.map((stage, i) => {
              const done = i < currentIdx;
              const current = i === currentIdx;
              return (
                <div
                  key={stage}
                  className={`flex items-center gap-3 rounded-xl border p-3 ${
                    current
                      ? "border-primary bg-primary/5"
                      : done
                        ? "border-border bg-secondary/40"
                        : "border-border bg-background"
                  }`}
                >
                  {done ? (
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  ) : current ? (
                    <div className="grid h-5 w-5 place-items-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                      {i + 1}
                    </div>
                  ) : (
                    <Circle className="h-5 w-5 text-muted-foreground" />
                  )}
                  <span
                    className={`text-sm font-medium ${
                      current ? "text-primary" : done ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {stage}
                  </span>
                  {current && (
                    <span className="ml-auto rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary-foreground">
                      Actual
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {portalReady && (
          <section className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="flex items-center gap-2 text-xl font-semibold">
                <ListChecks className="h-5 w-5 text-primary" /> Tu lista de pendientes
              </h2>
              {tasks.length > 0 && (
                <span className="text-xs font-medium text-muted-foreground">
                  {doneTasks} de {tasks.length} completados
                </span>
              )}
            </div>
            {tasks.length > 0 && (
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full rounded-full bg-primary transition-all"
                  style={{ width: `${(doneTasks / tasks.length) * 100}%` }}
                />
              </div>
            )}
            <div className="mt-5 space-y-2">
              {tasks.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => toggleTask(t)}
                  className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left transition ${
                    t.done
                      ? "border-border bg-secondary/40"
                      : "border-border bg-background hover:bg-secondary/30"
                  }`}
                >
                  {t.done ? (
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
                  ) : (
                    <Circle className="h-5 w-5 shrink-0 text-muted-foreground" />
                  )}
                  <span
                    className={`text-sm font-medium ${
                      t.done ? "text-muted-foreground line-through" : "text-foreground"
                    }`}
                  >
                    {t.title}
                  </span>
                </button>
              ))}
            </div>
            <div className="mt-4 flex gap-2">
              <input
                className={inputCls}
                placeholder="Agregar un pendiente propio…"
                value={newTask}
                maxLength={200}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addTask()}
              />
              <button
                type="button"
                onClick={addTask}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
              >
                <Plus className="h-4 w-4" /> Agregar
              </button>
            </div>
          </section>
        )}

        {portalReady && (
          <section className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
            <h2 className="flex items-center gap-2 text-xl font-semibold">
              <FileText className="h-5 w-5 text-primary" /> Tus documentos
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Sube PDF, JPG o PNG (máx. 10 MB). Tu coordinador los revisa y marca cada documento
              como aprobado.
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
              <select
                className={inputCls}
                value={docType}
                onChange={(e) => setDocType(e.target.value)}
              >
                {DOC_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              <input
                ref={fileRef}
                type="file"
                accept=".pdf,.jpg,.jpeg,.png,.webp"
                className={inputCls + " file:mr-3 file:rounded file:border-0 file:bg-secondary file:px-3 file:py-1 file:text-xs file:font-semibold"}
              />
              <button
                type="button"
                onClick={uploadDoc}
                disabled={uploading}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-60"
              >
                <Upload className="h-4 w-4" /> {uploading ? "Subiendo…" : "Subir"}
              </button>
            </div>
            {docError && (
              <p className="mt-3 rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {docError}
              </p>
            )}

            <div className="mt-5 space-y-2">
              {docs.length === 0 ? (
                <p className="text-sm text-muted-foreground">Aún no has subido documentos.</p>
              ) : (
                docs.map((d) => (
                  <div
                    key={d.id}
                    className="flex flex-wrap items-center gap-3 rounded-xl border border-border bg-background p-3"
                  >
                    <FileText className="h-5 w-5 shrink-0 text-muted-foreground" />
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-medium">{d.doc_type}</div>
                      <div className="truncate text-xs text-muted-foreground">
                        {d.original_name} · {new Date(d.created_at).toLocaleDateString()}
                      </div>
                      {d.status === "rechazado" && d.review_note && (
                        <div className="mt-1 text-xs text-destructive">{d.review_note}</div>
                      )}
                    </div>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${DOC_STATUS_STYLE[d.status] ?? DOC_STATUS_STYLE.pendiente}`}
                    >
                      {DOC_STATUS_LABEL[d.status] ?? d.status}
                    </span>
                    <button
                      type="button"
                      onClick={() => openDoc(d)}
                      aria-label="Ver documento"
                      className="grid h-8 w-8 place-items-center rounded-md border border-border text-muted-foreground transition hover:text-primary"
                    >
                      <Download className="h-4 w-4" />
                    </button>
                    {d.status === "pendiente" && (
                      <button
                        type="button"
                        onClick={() => removeDoc(d)}
                        aria-label="Eliminar documento"
                        className="grid h-8 w-8 place-items-center rounded-md border border-border text-muted-foreground transition hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
          </section>
        )}

        <section className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
          <h2 className="text-xl font-semibold">Tu información</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium">Nombre completo</span>
              <input
                className={inputCls}
                value={profile.full_name ?? ""}
                onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium">Teléfono / WhatsApp</span>
              <input
                className={inputCls}
                value={profile.phone ?? ""}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              />
            </label>
            <label className="block sm:col-span-2">
              <span className="mb-1.5 block text-sm font-medium">Correo</span>
              <input disabled className={inputCls + " opacity-60"} value={profile.email ?? ""} />
            </label>
          </div>
          <div className="mt-5 flex items-center gap-3">
            <button
              onClick={save}
              disabled={saving}
              className="inline-flex rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-60"
            >
              {saving ? "Guardando…" : "Guardar cambios"}
            </button>
            {savedAt && <span className="text-xs text-muted-foreground">Cambios guardados.</span>}
          </div>
        </section>

        <section className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
          <h2 className="text-xl font-semibold">Contacta a tu coordinador</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            ¿Tienes preguntas? Escríbenos por WhatsApp.
          </p>
          <a
            href="https://wa.me/13232503726?text=Hola%2C%20soy%20candidato%20VetBridge%20USA"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
            style={{ backgroundColor: "#25D366" }}
          >
            <MessageCircle className="h-4 w-4" fill="white" /> Abrir WhatsApp
          </a>
        </section>
      </main>
    </div>
  );
}

function DashHeader({ label, onSignOut }: { label: string; onSignOut: () => void }) {
  return (
    <header className="border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo-mark.png" alt="" className="h-8 w-auto" />
          <span className="text-sm font-semibold tracking-tight text-muted-foreground">
            VetBridge USA · <span className="text-foreground">{label}</span>
          </span>
        </Link>
        <button
          onClick={onSignOut}
          className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-sm text-foreground hover:bg-secondary"
        >
          <LogOut className="h-4 w-4" /> Salir
        </button>
      </div>
    </header>
  );
}

const inputCls =
  "w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm text-foreground shadow-sm outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/30";
