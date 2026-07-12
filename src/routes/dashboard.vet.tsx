import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Stethoscope, LogOut, MessageCircle, CheckCircle2, Circle } from "lucide-react";

export const Route = createFileRoute("/dashboard/vet")({
  head: () => ({
    meta: [
      { title: "Panel del Veterinario — VetBridge USA" },
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

type Profile = {
  id: string;
  full_name: string | null;
  phone: string | null;
  email: string | null;
  application_stage: string;
  account_type: string;
};

function VetDashboard() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<number | null>(null);

  useEffect(() => {
    (async () => {
      const { data: sess } = await supabase.auth.getSession();
      if (!sess.session) {
        navigate({ to: "/auth" });
        return;
      }
      const { data } = await supabase
        .from("profiles")
        .select("id, full_name, phone, email, application_stage, account_type")
        .eq("id", sess.session.user.id)
        .maybeSingle();
      if (data?.account_type === "clinic") {
        navigate({ to: "/dashboard/clinic" });
        return;
      }
      setProfile(data as Profile | null);
      setLoading(false);
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

  if (loading) {
    return <div className="p-8 text-sm text-muted-foreground">Cargando…</div>;
  }
  if (!profile) return null;

  const currentIdx = STAGES.findIndex((s) => s === profile.application_stage);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <DashHeader label="Panel del Veterinario" onSignOut={signOut} />
      <main className="mx-auto max-w-4xl space-y-8 px-4 py-10">
        <section>
          <h1 className="text-3xl font-bold tracking-tight">
            Hola, {profile.full_name?.split(" ")[0] || "Doctor(a)"}
          </h1>
          <p className="mt-2 text-muted-foreground">
            Sigue tu proceso y actualiza tu información aquí.
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
              className="inline-flex rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-60"
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
            className="mt-4 inline-flex items-center gap-2 rounded-md px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
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
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground">
            <Stethoscope className="h-5 w-5" />
          </div>
          <span className="text-sm font-semibold tracking-tight text-muted-foreground">
            VetBridge USA · <span className="text-foreground">{label}</span>
          </span>
        </Link>
        <button
          onClick={onSignOut}
          className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-3 py-1.5 text-sm text-foreground hover:bg-secondary"
        >
          <LogOut className="h-4 w-4" /> Salir
        </button>
      </div>
    </header>
  );
}

const inputCls =
  "w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm text-foreground shadow-sm outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/30";
