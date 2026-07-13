import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Stethoscope, Building2, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Log in | VetBridge USA" },
      { name: "description", content: "Log in or create an account: veterinarian or clinic." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

type Mode = "login" | "signup";
type AccountType = "vet" | "clinic";

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<Mode>("login");
  const [accountType, setAccountType] = useState<AccountType>("vet");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [clinicName, setClinicName] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "loading">("idle");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) redirectByType(data.session.user.id);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function redirectByType(userId: string) {
    const { data } = await supabase
      .from("profiles")
      .select("account_type")
      .eq("id", userId)
      .maybeSingle();
    if (data?.account_type === "clinic") navigate({ to: "/dashboard/clinic" });
    else navigate({ to: "/dashboard/vet" });
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError(null);
    try {
      if (mode === "signup") {
        const { data, error: err } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin + "/auth" },
        });
        if (err) throw err;
        const user = data.user;
        if (user) {
          const { error: pErr } = await supabase.from("profiles").insert({
            id: user.id,
            account_type: accountType,
            full_name: fullName || null,
            clinic_name: accountType === "clinic" ? clinicName : null,
            phone: phone || null,
            email,
          });
          if (pErr) console.error(pErr);
        }
        if (data.session) {
          navigate({
            to: accountType === "clinic" ? "/dashboard/clinic" : "/dashboard/vet",
          });
        } else {
          setError("Check your email to confirm your account, then log in.");
          setMode("login");
        }
      } else {
        const { data, error: err } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (err) throw err;
        if (data.user) await redirectByType(data.user.id);
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong.";
      setError(msg);
    } finally {
      setStatus("idle");
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/60">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo-mark.png" alt="" className="h-8 w-auto" />
            <span className="text-lg font-semibold tracking-tight">VetBridge USA</span>
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-md px-4 py-16">
        <h1 className="text-3xl font-bold tracking-tight">
          {mode === "login" ? "Log in" : "Create your account"}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {mode === "login"
            ? "Access your VetBridge dashboard."
            : "Choose your account type to get started."}
        </p>

        {mode === "signup" && (
          <div className="mt-6 grid grid-cols-2 gap-3">
            {(
              [
                { key: "vet", label: "Veterinarian", icon: Stethoscope },
                { key: "clinic", label: "Clinic", icon: Building2 },
              ] as const
            ).map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                type="button"
                onClick={() => setAccountType(key)}
                className={`flex flex-col items-center gap-2 rounded-xl border p-4 text-sm font-medium transition ${
                  accountType === key
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-border bg-card hover:bg-secondary"
                }`}
              >
                <Icon className="h-6 w-6" />
                {label}
              </button>
            ))}
          </div>
        )}

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          {mode === "signup" && (
            <>
              <FieldLabel label={accountType === "clinic" ? "Contact name" : "Full name"}>
                <input
                  required
                  className={inputCls}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </FieldLabel>
              {accountType === "clinic" && (
                <FieldLabel label="Clinic name">
                  <input
                    required
                    className={inputCls}
                    value={clinicName}
                    onChange={(e) => setClinicName(e.target.value)}
                  />
                </FieldLabel>
              )}
              <FieldLabel label="Phone">
                <input
                  className={inputCls}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </FieldLabel>
            </>
          )}
          <FieldLabel label="Email">
            <input
              required
              type="email"
              className={inputCls}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FieldLabel>
          <FieldLabel label="Password">
            <input
              required
              type="password"
              minLength={8}
              className={inputCls}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FieldLabel>
          {error && (
            <p className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={status === "loading"}
            className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-60"
          >
            {status === "loading" ? "Please wait…" : mode === "login" ? "Log in" : "Sign up"}
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            type="button"
            onClick={() => setMode(mode === "login" ? "signup" : "login")}
            className="font-semibold text-primary underline"
          >
            {mode === "login" ? "Sign up" : "Log in"}
          </button>
        </p>
      </div>
    </div>
  );
}

const inputCls =
  "w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm text-foreground shadow-sm outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/30";

function FieldLabel({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-foreground">{label}</span>
      {children}
    </label>
  );
}
