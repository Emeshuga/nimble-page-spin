import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Stethoscope, LogOut, ArrowRight, MapPin, Sparkles } from "lucide-react";

export const Route = createFileRoute("/dashboard/clinic")({
  head: () => ({
    meta: [{ title: "Clinic Dashboard — VetBridge USA" }, { name: "robots", content: "noindex" }],
  }),
  component: ClinicDashboard,
});

type Profile = {
  id: string;
  full_name: string | null;
  clinic_name: string | null;
  email: string | null;
  account_type: string;
};

type Req = {
  id: string;
  clinic_name: string;
  state: string;
  role_type: string;
  urgency: string;
  status: string;
  created_at: string;
};

const SAMPLES = [
  {
    tag: "🇲🇽 UNAM 2016",
    line: "DVM · Advanced English · NAVLE in progress · available Q1",
  },
  {
    tag: "🇨🇦 Ontario",
    line: "DVM · NAVLE-passed · TN-eligible · 8 yrs SA experience · available in 6 weeks",
  },
  {
    tag: "🇲🇽 UNAM 2019",
    line: "DVM · Fluent English · exotics focus · available Q2",
  },
  {
    tag: "🇨🇦 Quebec",
    line: "DVM · NAVLE-passed · 12 yrs mixed practice · hospital director experience",
  },
];

function ClinicDashboard() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [requests, setRequests] = useState<Req[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data: sess } = await supabase.auth.getSession();
      if (!sess.session) {
        navigate({ to: "/auth" });
        return;
      }
      const uid = sess.session.user.id;
      const [{ data: p }, { data: r }] = await Promise.all([
        supabase
          .from("profiles")
          .select("id, full_name, clinic_name, email, account_type")
          .eq("id", uid)
          .maybeSingle(),
        supabase
          .from("clinic_requests")
          .select("id, clinic_name, state, role_type, urgency, status, created_at")
          .eq("user_id", uid)
          .order("created_at", { ascending: false }),
      ]);
      if (p?.account_type === "vet") {
        navigate({ to: "/dashboard/vet" });
        return;
      }
      setProfile(p as Profile | null);
      setRequests((r as Req[]) ?? []);
      setLoading(false);
    })();
  }, [navigate]);

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/auth" });
  }

  if (loading) return <div className="p-8 text-sm text-muted-foreground">Loading…</div>;
  if (!profile) return null;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/60 bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground">
              <Stethoscope className="h-5 w-5" />
            </div>
            <span className="text-sm font-semibold tracking-tight text-muted-foreground">
              VetBridge USA · <span className="text-foreground">Clinic Dashboard</span>
            </span>
          </Link>
          <button
            onClick={signOut}
            className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-3 py-1.5 text-sm hover:bg-secondary"
          >
            <LogOut className="h-4 w-4" /> Log out
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-5xl space-y-8 px-4 py-10">
        <section className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {profile.clinic_name || "Your clinic"}
            </h1>
            <p className="mt-2 text-muted-foreground">
              {profile.full_name} · {profile.email}
            </p>
          </div>
          <Link
            to="/clinics"
            hash="request"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
          >
            Request Candidates <ArrowRight className="h-4 w-4" />
          </Link>
        </section>

        <section className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
          <h2 className="text-xl font-semibold">Your hiring requests</h2>
          {requests.length === 0 ? (
            <p className="mt-3 text-sm text-muted-foreground">
              You haven't submitted a request yet. Click "Request Candidates" above to start.
            </p>
          ) : (
            <div className="mt-5 space-y-3">
              {requests.map((r) => (
                <div
                  key={r.id}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-background p-4"
                >
                  <div>
                    <div className="text-sm font-semibold">{r.role_type}</div>
                    <div className="text-xs text-muted-foreground">
                      <MapPin className="mr-1 inline h-3 w-3" />
                      {r.state} · {r.urgency} · submitted{" "}
                      {new Date(r.created_at).toLocaleDateString()}
                    </div>
                  </div>
                  <span className="rounded-full border border-border bg-secondary px-2.5 py-0.5 text-xs font-medium capitalize">
                    {r.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-xl font-semibold">Sample candidate profiles</h2>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-accent/15 px-2.5 py-1 text-xs font-medium text-accent">
              <Sparkles className="h-3.5 w-3.5" /> Illustrative — request candidates to see current
              availability
            </div>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {SAMPLES.map((s, i) => (
              <div key={i} className="rounded-2xl border border-border bg-background p-5">
                <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {s.tag}
                </div>
                <div className="mt-2 text-sm font-medium text-foreground">{s.line}</div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Sample profiles — no real names or contact details are ever shown here. Submit a
            request to review current, matched candidates.
          </p>
        </section>
      </main>
    </div>
  );
}
