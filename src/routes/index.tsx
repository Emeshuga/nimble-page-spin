import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  Stethoscope,
  DollarSign,
  Plane,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  MessageCircle,
  Plus,
  Minus,
} from "lucide-react";
import { HeroFlight, MonumentsBand } from "@/components/journey-art";

export const Route = createFileRoute("/")({
  component: Index,
});

const YEARS = Array.from({ length: 17 }, (_, i) => 2010 + i);

type FormState = {
  nombre_completo: string;
  correo_electronico: string;
  telefono: string;
  universidad: "" | "FMVZ-UNAM" | "Otra Universidad";
  ano_graduacion: string;
  nivel_ingles: "" | "Básico" | "Intermedio" | "Avanzado" | "Fluido/Nativo";
  licencia_mexico: "" | "Sí" | "No";
  navle_status: "" | "Aprobado" | "Estudiando" | "No";
};

const EMPTY: FormState = {
  nombre_completo: "",
  correo_electronico: "",
  telefono: "",
  universidad: "",
  ano_graduacion: "",
  nivel_ingles: "",
  licencia_mexico: "",
  navle_status: "",
};

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero />
      <ValueProps />
      <SalaryComparison />
      <PoolAlert />
      <Process />
      <LandmarksDivider />
      <FAQ />
      <FormSection />
      <About />
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <div className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground">
            <Stethoscope className="h-5 w-5" />
          </div>
          <span className="text-lg font-semibold tracking-tight">VetBridge USA</span>
        </div>
        <a
          href="#formulario"
          className="hidden rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90 sm:inline-flex"
        >
          Evalúa tu Perfil
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(1000px 500px at 80% -10%, oklch(0.72 0.15 55 / 0.15), transparent 60%), radial-gradient(900px 500px at -10% 10%, oklch(0.38 0.14 250 / 0.18), transparent 60%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 mx-auto hidden max-w-[1600px] lg:block"
      >
        <HeroFlight className="w-full" />
      </div>
      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:py-28 lg:pb-40">
        <div className="max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            Programa especializado para MVZs mexicanos
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
            Trabaja como Médico Veterinario en <span className="text-primary">Estados Unidos</span>.
            Gestionamos tu licencia y tu visa con abogados migratorios especializados.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground sm:text-xl">
            Multiplica tu salario ejerciendo tu pasión. Si eres egresado de la{" "}
            <strong className="text-foreground">FMVZ-UNAM (2011–2025)</strong>, tienes un proceso
            acelerado para comenzar este mismo año.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#formulario"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-base font-semibold text-primary-foreground shadow-sm transition hover:opacity-90"
            >
              Evalúa tu Perfil Gratis
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#beneficios"
              className="inline-flex items-center rounded-md border border-border bg-card px-6 py-3 text-base font-medium text-foreground transition hover:bg-secondary"
            >
              Conoce el programa
            </a>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary" /> Sin lotería H-1B
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary" /> Colocación en clínica
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary" /> Prep NAVLE incluido
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function LandmarksDivider() {
  return (
    <div aria-hidden className="bg-secondary/40">
      <div className="mx-auto max-w-6xl overflow-hidden px-4 pt-10">
        <MonumentsBand className="w-full opacity-20" />
      </div>
    </div>
  );
}

function ValueProps() {
  const items = [
    {
      icon: DollarSign,
      title: "Salarios de Primer Nivel",
      body: "Ingresos entre $100,000 y $140,000 USD anuales desde tu primer contrato como veterinario clínico en EE.UU.",
    },
    {
      icon: Plane,
      title: "Visa TN Directa",
      body: "Aprovecha el tratado T-MEC: visa profesional directa, sin lotería H-1B ni esperas de años.",
    },
    {
      icon: ShieldCheck,
      title: "Acompañamiento 360°",
      body: "Preparación para el NAVLE, trámite de licencia estatal, colocación en clínica y soporte migratorio.",
    },
  ];
  return (
    <section id="beneficios" className="border-y border-border bg-secondary/40">
      <div className="mx-auto max-w-6xl px-4 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Todo lo que necesitas para ejercer en EE.UU.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Un programa completo diseñado por veterinarios y abogados migratorios.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {items.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="rounded-2xl border border-border bg-card p-8 shadow-sm transition hover:shadow-md"
            >
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-xl font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PoolAlert() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <div
        className="relative overflow-hidden rounded-3xl border border-accent/40 p-8 sm:p-12"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.72 0.15 55 / 0.15), oklch(0.38 0.14 250 / 0.12))",
        }}
      >
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-bold uppercase tracking-wide text-accent-foreground">
          <Sparkles className="h-3.5 w-3.5" />
          Pool A — Fast Track UNAM
        </div>
        <h3 className="max-w-3xl text-2xl font-bold tracking-tight sm:text-3xl">
          ¿Eres egresado de la UNAM (2011 – 2025)?
        </h3>
        <p className="mt-3 max-w-3xl text-base text-foreground/80 sm:text-lg">
          Tienes una ventaja única. Puedes <strong>saltarte el proceso ECFVG</strong>. Estás a un
          solo examen de distancia de ejercer en EE.UU.
        </p>
        <a
          href="#formulario"
          className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
        >
          Reserva tu evaluación prioritaria
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}

function Process() {
  const steps = [
    { n: "01", t: "Evaluación de perfil", d: "Analizamos tu universidad, año y nivel de inglés." },
    { n: "02", t: "Preparación NAVLE", d: "Curso intensivo con mentores que ya aprobaron." },
    {
      n: "03",
      t: "Licencia estatal",
      d: "Gestionamos toda la documentación con la junta veterinaria.",
    },
    { n: "04", t: "Visa TN + Clínica", d: "Colocación con clínicas patrocinadoras en EE.UU." },
  ];
  return (
    <section className="border-t border-border bg-secondary/40">
      <div className="mx-auto max-w-6xl px-4 py-20">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Tu camino a ejercer en EE.UU.
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <div key={s.n} className="rounded-2xl border border-border bg-card p-6">
              <div className="text-sm font-mono font-semibold text-accent">{s.n}</div>
              <div className="mt-2 text-lg font-semibold">{s.t}</div>
              <p className="mt-1 text-sm text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign"] as const;

function FormSection() {
  const navigate = useNavigate();
  const [form, setForm] = useState<FormState>(EMPTY);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof FormState>(k: K, v: FormState[K]) {
    setForm((p) => ({ ...p, [k]: v }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError(null);

    const year = Number(form.ano_graduacion);
    const vip = form.universidad === "FMVZ-UNAM" && year >= 2011 && year <= 2025;

    const payload = {
      nombre_completo: form.nombre_completo.trim(),
      correo_electronico: form.correo_electronico.trim(),
      telefono: form.telefono.trim(),
      universidad: form.universidad,
      ano_graduacion: year,
      nivel_ingles: form.nivel_ingles,
      licencia_mexico: form.licencia_mexico === "Sí",
      navle_status: form.navle_status,
      vip_fast_track: vip,
    };

    const params = new URLSearchParams(window.location.search);
    const utm: Record<string, string> = {};
    for (const key of UTM_KEYS) {
      const value = params.get(key);
      if (value) utm[key] = value.slice(0, 120);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let { error: err } = await (supabase as any).from("candidates").insert({ ...payload, ...utm });

    // Until the utm_* columns exist in the DB, an insert that includes them is
    // rejected with "column not found" — retry without UTM rather than losing the lead.
    if (
      err &&
      Object.keys(utm).length > 0 &&
      (err.code === "PGRST204" || /utm/i.test(err.message ?? ""))
    ) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ({ error: err } = await (supabase as any).from("candidates").insert(payload));
    }

    if (err) {
      console.error("Lead submission failed:", err);
      setStatus("error");
      setError(
        "Hubo un error al enviar tu perfil. Intenta de nuevo o escríbenos directamente por WhatsApp (botón verde).",
      );
      return;
    }
    navigate({ to: "/gracias", search: vip ? { vip: 1 } : {} });
  }

  return (
    <section id="formulario" className="mx-auto max-w-3xl px-4 py-24">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Evalúa tu Perfil</h2>
        <p className="mt-3 text-muted-foreground">
          Toma menos de 2 minutos. Un coordinador te contactará en 24 horas.
        </p>
      </div>
      <form
        onSubmit={onSubmit}
        className="space-y-5 rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8"
      >
        <Field label="Nombre Completo">
          <input
            name="nombre_completo"
            required
            minLength={2}
            maxLength={120}
            type="text"
            value={form.nombre_completo}
            onChange={(e) => update("nombre_completo", e.target.value)}
            className={inputCls}
          />
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Correo Electrónico">
            <input
              name="correo_electronico"
              required
              type="email"
              maxLength={254}
              value={form.correo_electronico}
              onChange={(e) => update("correo_electronico", e.target.value)}
              className={inputCls}
            />
          </Field>
          <Field label="Teléfono con WhatsApp">
            <input
              name="telefono"
              required
              type="tel"
              minLength={7}
              maxLength={30}
              placeholder="+52 55 1234 5678"
              value={form.telefono}
              onChange={(e) => update("telefono", e.target.value)}
              className={inputCls}
            />
          </Field>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Universidad de Egreso">
            <select
              name="universidad"
              required
              value={form.universidad}
              onChange={(e) => update("universidad", e.target.value as FormState["universidad"])}
              className={inputCls}
            >
              <option value="">Selecciona…</option>
              <option value="FMVZ-UNAM">FMVZ-UNAM</option>
              <option value="Otra Universidad">Otra Universidad</option>
            </select>
          </Field>
          <Field label="Año de Graduación">
            <select
              name="ano_graduacion"
              required
              value={form.ano_graduacion}
              onChange={(e) => update("ano_graduacion", e.target.value)}
              className={inputCls}
            >
              <option value="">Selecciona…</option>
              {YEARS.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <Field label="Nivel de Inglés">
          <select
            name="nivel_ingles"
            required
            value={form.nivel_ingles}
            onChange={(e) => update("nivel_ingles", e.target.value as FormState["nivel_ingles"])}
            className={inputCls}
          >
            <option value="">Selecciona…</option>
            <option value="Básico">Básico</option>
            <option value="Intermedio">Intermedio</option>
            <option value="Avanzado">Avanzado</option>
            <option value="Fluido/Nativo">Fluido/Nativo</option>
          </select>
        </Field>

        <Field label="¿Cuentas con licencia vigente en México?">
          <div className="flex gap-3">
            {(["Sí", "No"] as const).map((opt) => (
              <label
                key={opt}
                className={`flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-md border px-4 py-2.5 text-sm font-medium transition ${
                  form.licencia_mexico === opt
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-border bg-background text-foreground hover:bg-secondary"
                }`}
              >
                <input
                  type="radio"
                  name="licencia"
                  className="sr-only"
                  checked={form.licencia_mexico === opt}
                  onChange={() => update("licencia_mexico", opt)}
                  required
                />
                {opt}
              </label>
            ))}
          </div>
        </Field>

        <Field label="¿Has presentado o estudiado para el NAVLE?">
          <select
            name="navle_status"
            required
            value={form.navle_status}
            onChange={(e) => update("navle_status", e.target.value as FormState["navle_status"])}
            className={inputCls}
          >
            <option value="">Selecciona…</option>
            <option value="Aprobado">Aprobado</option>
            <option value="Estudiando">Estudiando</option>
            <option value="No">No</option>
          </select>
        </Field>

        {error && (
          <p className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 text-base font-semibold text-primary-foreground shadow-sm transition hover:opacity-90 disabled:opacity-60"
        >
          {status === "loading" ? "Enviando…" : "Enviar mi Perfil"}
          <ArrowRight className="h-4 w-4" />
        </button>
        <p className="text-center text-xs text-muted-foreground">
          Al enviar aceptas ser contactado por WhatsApp o correo.
        </p>
      </form>
    </section>
  );
}

const inputCls =
  "w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm text-foreground shadow-sm outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/30";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-foreground">{label}</span>
      {children}
    </label>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Stethoscope className="h-4 w-4 text-primary" />© {new Date().getFullYear()} VetBridge
          USA. Todos los derechos reservados.
        </div>
        <div className="text-xs text-muted-foreground">Hecho con cuidado para MVZs mexicanos.</div>
      </div>
    </footer>
  );
}

function SalaryComparison() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Misma profesión, ingresos muy distintos
        </h2>
        <p className="mt-4 text-muted-foreground">
          Compara lo que gana un MVZ en México vs. en Estados Unidos.
        </p>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
          <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            México
          </div>
          <div className="mt-3 text-3xl font-bold text-foreground">$250,000 – $450,000 MXN</div>
          <div className="mt-1 text-sm text-muted-foreground">al año</div>
          <p className="mt-4 text-sm text-muted-foreground">Promedio nacional MVZ.</p>
        </div>
        <div className="relative rounded-2xl border-2 border-primary bg-card p-8 shadow-md">
          <div className="absolute -top-3 left-6 inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wide text-primary-foreground">
            <Sparkles className="h-3.5 w-3.5" /> Con VetBridge
          </div>
          <div className="text-xs font-semibold uppercase tracking-wide text-primary">
            Estados Unidos
          </div>
          <div className="mt-3 text-3xl font-bold text-foreground">$100,000 – $140,000 USD</div>
          <div className="mt-1 text-sm text-muted-foreground">al año</div>
          <p className="mt-4 text-sm text-muted-foreground">Veterinario asociado.</p>
        </div>
      </div>
      <p className="mt-8 text-center text-lg font-semibold text-foreground">
        Hasta <span className="text-primary">8 veces más ingresos</span> ejerciendo la misma
        profesión.
      </p>
    </section>
  );
}

function FAQ() {
  const items = [
    {
      q: "¿Cuánto cuesta el programa?",
      a: "La evaluación de tu perfil es 100% gratuita. Existen opciones para que las clínicas patrocinadoras cubran gran parte de los costos, según tu perfil. Un coordinador te explicará tu caso específico sin ningún compromiso.",
    },
    {
      q: "¿Necesito hablar inglés perfecto?",
      a: "No perfecto, pero sí funcional. El examen NAVLE y la comunicación con clientes son en inglés. Si tu nivel es intermedio, te orientamos con un plan para alcanzar el nivel necesario.",
    },
    {
      q: "¿Cuánto tarda el proceso?",
      a: "Egresados de la FMVZ-UNAM (2011–2025): desde 9–15 meses. Egresados de otras universidades: de 2 a 4 años por el proceso de equivalencia (ECFVG/PAVE). En tu evaluación gratuita te damos un cronograma personalizado.",
    },
    {
      q: "¿Qué es la visa TN?",
      a: "Es una visa de trabajo del tratado T-MEC exclusiva para profesionistas mexicanos y canadienses. La profesión de veterinario está incluida. No tiene lotería ni cupo anual como la H-1B, se renueva indefinidamente en periodos de 3 años, y se tramita directamente en el consulado de EE.UU. en México.",
    },
    {
      q: "¿Puedo llevar a mi familia?",
      a: "Sí. Tu cónyuge e hijos pueden acompañarte con la visa TD, derivada de tu visa TN.",
    },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="border-t border-border bg-secondary/40">
      <div className="mx-auto max-w-3xl px-4 py-20">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Preguntas frecuentes</h2>
          <p className="mt-3 text-muted-foreground">Resolvemos las dudas más comunes.</p>
        </div>
        <div className="mt-10 space-y-3">
          {items.map((it, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="rounded-xl border border-border bg-card">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-base font-semibold text-foreground">{it.q}</span>
                  {isOpen ? (
                    <Minus className="h-5 w-5 shrink-0 text-primary" />
                  ) : (
                    <Plus className="h-5 w-5 shrink-0 text-primary" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">
                    {it.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-4xl px-4 py-20 text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Quiénes somos</h2>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          VetBridge USA conecta veterinarios mexicanos con clínicas en Estados Unidos que necesitan
          talento. Los trámites migratorios los realizan abogados especializados en visas TN;
          nosotros coordinamos todo el proceso junto con mentores veterinarios que ya aprobaron el
          NAVLE. No somos una bolsa de trabajo: te acompañamos en cada paso — examen, licencia
          estatal, visa y colocación.
        </p>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          El proceso acelerado para egresados UNAM 2011–2025 se basa en la acreditación{" "}
          <a
            href="https://www.avma.org"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-foreground"
          >
            AVMA
          </a>{" "}
          que la FMVZ-UNAM mantuvo de 2011 a 2025 y en los requisitos oficiales del NAVLE publicados
          por el{" "}
          <a
            href="https://www.icva.net"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-foreground"
          >
            ICVA
          </a>
          .
        </p>
        {/*
          PLACEHOLDER — ABOGADO MIGRATORIO ALIADO (pendiente de convenio firmado).
          Cuando se firme el convenio, descomentar y completar:

          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Asesoría migratoria a cargo de [NOMBRE DEL ABOGADO/DESPACHO],
            [CREDENCIALES — p.ej. miembro de AILA, admitido en la barra de X].
          </p>
        */}
      </div>
    </section>
  );
}

function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/13232503726?text=Hola%2C%20soy%20veterinario%2Fa%20y%20quiero%20información%20sobre%20el%20programa%20VetBridge%20USA"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition hover:scale-105"
      style={{ backgroundColor: "#25D366" }}
    >
      <MessageCircle className="h-7 w-7 text-white" fill="white" />
    </a>
  );
}
