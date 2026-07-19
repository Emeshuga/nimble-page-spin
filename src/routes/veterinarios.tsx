import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { PositioningBand } from "@/components/positioning-band";
import { SITE } from "@/lib/site";
import { submitLeadToHubSpot } from "@/lib/hubspot";
import {
  DollarSign,
  Plane,
  ShieldCheck,
  CheckCircle2,
  Zap,
  ArrowRight,
  MessageCircle,
  Plus,
  Minus,
  PawPrint,
  Dog,
  Cat,
  Rabbit,
  Bird,
  Home,
  Wallet,
  Building2,
  HeartHandshake,
  Globe,
} from "lucide-react";
import { HeroFlight, MonumentsBand } from "@/components/journey-art";

export const Route = createFileRoute("/veterinarios")({
  head: () => ({
    meta: [
      { title: "Trabaja como Veterinario en Estados Unidos | VetBridge USA" },
      {
        name: "description",
        content:
          "Ejerce como médico veterinario en EE.UU. Te acompañamos con la licencia, el examen NAVLE, la visa TN y la colocación en una clínica. Evalúa tu perfil en 2 minutos.",
      },
      { property: "og:title", content: "Trabaja como Veterinario en Estados Unidos" },
      {
        property: "og:description",
        content:
          "Licencia, examen NAVLE, visa TN y colocación en clínicas de EE.UU. Salarios de $100,000 a $140,000 USD. Evalúa tu perfil en 2 minutos.",
      },
    ],
  }),
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
  interes_ny: "" | "Sí" | "Tal vez" | "No";
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
  interes_ny: "",
};

// ————————————————————————————————————————————————————————————
// Bilingual copy. Spanish is the default (primary MX audience); a header
// toggle flips the whole page to English. IMPORTANT: form <option> VALUES stay
// the canonical Spanish strings (the DB / RLS validate them and the submit
// logic compares them) — only the labels shown to the user are translated.
// ————————————————————————————————————————————————————————————
type Lang = "es" | "en";

const LangCtx = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({
  lang: "es",
  setLang: () => {},
});
const useLang = () => useContext(LangCtx);

const COPY = {
  es: {
    header: { profile: "Evalúa tu Perfil", switchTo: "EN" },
    hero: {
      badge: "Programa para veterinarios de México y Canadá",
      titlePre: "Trabaja como Médico Veterinario en ",
      titleHi: "Estados Unidos",
      titlePost: ". Gestionamos tu licencia y tu visa con abogados migratorios especializados.",
      subA: "Multiplica tu salario ejerciendo tu pasión. Si eres egresado de la ",
      subStrong: "FMVZ-UNAM (2011-2025)",
      subB: ", tienes un proceso acelerado para comenzar este mismo año.",
      ctaPrimary: "Evalúa tu Perfil Gratis",
      ctaSecondary: "Conoce el programa",
      chips: ["Sin lotería H-1B", "Colocación en clínica", "Prep NAVLE incluido"],
    },
    band: {
      before: "¿Y si lo único entre tú y ejercer en EE. UU. fuera ",
      highlight: "el papeleo?",
      body: "Nosotros nos encargamos de la licencia, el NAVLE y la visa TN. Tú te concentras en tu carrera y en tu nueva vida.",
    },
    valueProps: {
      heading: "Todo lo que necesitas para ejercer en EE.UU.",
      sub: "Un programa completo diseñado por veterinarios y abogados migratorios.",
      items: [
        {
          title: "Ofertas negociadas para ti",
          body: "Ingresos de $100,000 a $140,000 USD al año. Entrevistamos clínicas y negociamos el mejor salario y prestaciones en tu nombre.",
        },
        {
          title: "Visa TN Directa",
          body: "Aprovecha el tratado T-MEC: visa profesional directa, sin lotería H-1B ni esperas de años.",
        },
        {
          title: "Contigo en cada paso",
          body: "Preparación NAVLE, licencia estatal, visa y colocación, y acompañamiento continuo incluso ya trabajando en la clínica.",
        },
      ],
    },
    salary: {
      heading: "Misma profesión, ingresos muy distintos",
      sub: "Compara lo que gana un veterinario en México vs. en Estados Unidos.",
      mxLabel: "México",
      mxValue: "$250,000 - $450,000 MXN",
      perYear: "al año",
      mxNote: "Promedio nacional MVZ.",
      usBadge: "Con VetBridge",
      usLabel: "Estados Unidos",
      usValue: "$100,000 - $140,000 USD",
      usNote: "Veterinario asociado.",
      footPre: "Hasta ",
      footHi: "8 veces más ingresos",
      footPost: " ejerciendo la misma profesión.",
    },
    lifestyle: {
      heading: "Más que un trabajo: una nueva vida",
      sub: "Ejercer en Estados Unidos abre puertas que van mucho más allá del salario.",
      items: [
        {
          title: "Ahorra en dólares",
          body: "Con un salario en dólares, cada mes construyes un patrimonio que en casa tomaría años.",
        },
        {
          title: "Cerca de casa",
          body: "Muchas clínicas están a un vuelo corto de casa: visita a tu familia los fines de semana.",
        },
        {
          title: "Tu propia práctica",
          body: "Gana experiencia, reputación y capital para algún día abrir tu propia clínica en EE.UU.",
        },
        {
          title: "Nunca solo",
          body: "Te acompañamos antes, durante y después de tu llegada. Tu éxito es nuestro trabajo.",
        },
      ],
    },
    pool: {
      badge: "Pool A, Fast Track UNAM",
      heading: "¿Eres egresado de la UNAM (2011 - 2025)?",
      bodyPre: "Tienes una ventaja única. Puedes ",
      bodyStrong: "saltarte el proceso ECFVG",
      bodyPost: ". Estás a un solo examen de distancia de ejercer en EE.UU.",
      cta: "Reserva tu evaluación prioritaria",
    },
    process: {
      eyebrow: "El Camino VetBridge\u2122",
      heading: "Tu camino a ejercer en EE.UU.",
      steps: [
        { t: "Evaluación de perfil", d: "Analizamos tu universidad, año y nivel de inglés." },
        {
          t: "Preparación NAVLE",
          d: "Preparación inmersiva con tutores que acompañan tu avance, no solo un curso.",
        },
        { t: "Licencia estatal", d: "Gestionamos toda la documentación con la junta veterinaria." },
        {
          t: "Visa TN + Clínica",
          d: "Entrevistas con clínicas patrocinadoras y apoyo con tu reubicación.",
        },
      ],
    },
    form: {
      heading: "Evalúa tu Perfil",
      sub: "Toma menos de 2 minutos. Un coordinador te contactará en 24 horas.",
      name: "Nombre Completo",
      email: "Correo Electrónico",
      phone: "Teléfono con WhatsApp",
      phonePlaceholder: "+52 55 1234 5678",
      university: "Universidad de Egreso",
      selectPlaceholder: "Selecciona…",
      otherUni: "Otra Universidad",
      gradYear: "Año de Graduación",
      englishLevel: "Nivel de Inglés",
      eng: { basic: "Básico", inter: "Intermedio", adv: "Avanzado", fluent: "Fluido/Nativo" },
      licenseQ: "¿Cuentas con licencia veterinaria vigente?",
      yes: "Sí",
      no: "No",
      navleQ: "¿Has presentado o estudiado para el NAVLE?",
      navle: { passed: "Aprobado", studying: "Estudiando", no: "No" },
      nyQ: "¿Te interesa trabajar en Nueva York? Es el camino más rápido.",
      maybe: "Tal vez",
      error:
        "Hubo un error al enviar tu perfil. Intenta de nuevo o escríbenos directamente por WhatsApp (botón verde).",
      submit: "Enviar mi Perfil",
      sending: "Enviando…",
      consent: "Al enviar aceptas ser contactado por WhatsApp o correo.",
    },
    footer: {
      desc: "Conectamos veterinarios de México y Canadá con clínicas en Estados Unidos. Coordinamos examen NAVLE, licencia estatal y visa TN junto con abogados migratorios especializados.",
      contact: "Contacto",
      profileLink: "Evalúa tu perfil",
      legal: "Legal",
      privacy: "Aviso de Privacidad",
      terms: "Términos y Condiciones",
      rights: "Todos los derechos reservados.",
      madeWith: "Hecho con cuidado para veterinarios internacionales",
      disclaimer:
        "VetBridge USA es un servicio de coordinación y reclutamiento. No es un despacho jurídico ni ofrece asesoría legal migratoria; los trámites de visa los realizan abogados migratorios independientes. No garantizamos la obtención de una visa, licencia o empleo; los resultados dependen del perfil de cada candidato y de las autoridades correspondientes.",
    },
    faq: {
      heading: "Preguntas frecuentes",
      sub: "Resolvemos las dudas más comunes.",
      items: [
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
          a: "Egresados de la FMVZ-UNAM (2011-2025): desde 9-15 meses. Egresados de otras universidades: de 2 a 4 años por el proceso de equivalencia (ECFVG/PAVE). En tu evaluación gratuita te damos un cronograma personalizado.",
        },
        {
          q: "¿Qué es la visa TN?",
          a: "Es una visa de trabajo del tratado T-MEC exclusiva para profesionistas mexicanos y canadienses. La profesión de veterinario está incluida. No tiene lotería ni cupo anual como la H-1B y se renueva indefinidamente en periodos de 3 años. Los mexicanos la tramitan en el consulado de EE.UU.; los canadienses la reciben en la frontera.",
        },
        {
          q: "¿Puedo llevar a mi familia?",
          a: "Sí. Tu cónyuge e hijos pueden acompañarte con la visa TD, derivada de tu visa TN.",
        },
      ],
    },
    about: {
      heading: "Quiénes somos",
      p1: "VetBridge USA conecta veterinarios de México y Canadá con clínicas en Estados Unidos que necesitan talento. Los trámites migratorios los realizan abogados especializados en visas TN; nosotros coordinamos todo el proceso junto con mentores veterinarios que ya aprobaron el NAVLE. No somos una bolsa de trabajo: te acompañamos en cada paso, examen, licencia estatal, visa y colocación.",
      p2a: "El proceso acelerado para egresados UNAM 2011-2025 se basa en la acreditación ",
      p2b: " que la FMVZ-UNAM mantuvo de 2011 a 2025 y en los requisitos oficiales del NAVLE publicados por el ",
      p2c: ".",
    },
    whatsapp: {
      aria: "Contactar por WhatsApp",
      text: "Hola, soy veterinario/a y quiero información sobre el programa VetBridge USA",
    },
  },
  en: {
    header: { profile: "Check Your Profile", switchTo: "ES" },
    hero: {
      badge: "A program for veterinarians from Mexico and Canada",
      titlePre: "Practice as a veterinarian in ",
      titleHi: "the United States",
      titlePost: ". We manage your license and visa with specialized immigration attorneys.",
      subA: "Multiply your income doing what you love. If you graduated from ",
      subStrong: "FMVZ-UNAM (2011-2025)",
      subB: ", you qualify for an accelerated path to start this year.",
      ctaPrimary: "Check Your Profile, Free",
      ctaSecondary: "Explore the program",
      chips: ["No H-1B lottery", "Clinic placement", "NAVLE prep included"],
    },
    band: {
      before: "What if the only thing between you and practicing in the U.S. was ",
      highlight: "the paperwork?",
      body: "We handle the license, the NAVLE, and the TN visa. You focus on your career and your new life.",
    },
    valueProps: {
      heading: "Everything you need to practice in the U.S.",
      sub: "A complete program designed by veterinarians and immigration attorneys.",
      items: [
        {
          title: "Offers negotiated for you",
          body: "Earn $100,000 to $140,000 USD a year. We interview clinics and negotiate the best salary and benefits on your behalf.",
        },
        {
          title: "Direct TN Visa",
          body: "Use the USMCA (T-MEC) treaty: a direct professional visa, with no H-1B lottery and no multi-year waits.",
        },
        {
          title: "With you every step",
          body: "NAVLE prep, state licensing, visa, and placement, plus ongoing support even once you're working at the clinic.",
        },
      ],
    },
    salary: {
      heading: "Same profession, very different income",
      sub: "Compare what a veterinarian earns at home vs. in the United States.",
      mxLabel: "Mexico",
      mxValue: "$250,000 - $450,000 MXN",
      perYear: "per year",
      mxNote: "National average for a vet.",
      usBadge: "With VetBridge",
      usLabel: "United States",
      usValue: "$100,000 - $140,000 USD",
      usNote: "Associate veterinarian.",
      footPre: "Up to ",
      footHi: "8x the income",
      footPost: " for the same profession.",
    },
    lifestyle: {
      heading: "More than a job: a new life",
      sub: "Practicing in the United States opens doors that go far beyond salary.",
      items: [
        {
          title: "Save in dollars",
          body: "With a salary in dollars, every month you build wealth that would take years back home.",
        },
        {
          title: "Close to home",
          body: "Many clinics are a short flight from home, visit your family on weekends.",
        },
        {
          title: "Your own practice",
          body: "Build the experience, reputation, and capital to one day open your own clinic in the U.S.",
        },
        {
          title: "Never on your own",
          body: "We support you before, during, and after your arrival. Your success is our job.",
        },
      ],
    },
    pool: {
      badge: "Pool A, UNAM Fast Track",
      heading: "Did you graduate from UNAM (2011-2025)?",
      bodyPre: "You have a unique advantage. You can ",
      bodyStrong: "skip the ECFVG process",
      bodyPost: ". You're just one exam away from practicing in the U.S.",
      cta: "Book your priority evaluation",
    },
    process: {
      eyebrow: "The VetBridge Path\u2122",
      heading: "Your path to practicing in the U.S.",
      steps: [
        {
          t: "Profile evaluation",
          d: "We review your university, graduation year, and English level.",
        },
        {
          t: "NAVLE prep",
          d: "Immersive prep with tutors who guide your progress, not just a course.",
        },
        { t: "State license", d: "We handle all the paperwork with the veterinary board." },
        {
          t: "TN visa + Clinic",
          d: "Interviews with sponsoring clinics and support with your relocation.",
        },
      ],
    },
    form: {
      heading: "Check Your Profile",
      sub: "Takes under 2 minutes. A coordinator will contact you within 24 hours.",
      name: "Full Name",
      email: "Email",
      phone: "Phone with WhatsApp",
      phonePlaceholder: "+1 555 123 4567",
      university: "University",
      selectPlaceholder: "Select…",
      otherUni: "Other university",
      gradYear: "Graduation Year",
      englishLevel: "English Level",
      eng: { basic: "Basic", inter: "Intermediate", adv: "Advanced", fluent: "Fluent/Native" },
      licenseQ: "Do you hold a current veterinary license?",
      yes: "Yes",
      no: "No",
      navleQ: "Have you taken or studied for the NAVLE?",
      navle: { passed: "Passed", studying: "Studying", no: "No" },
      nyQ: "Interested in working in New York? It's the fastest path.",
      maybe: "Maybe",
      error:
        "There was an error submitting your profile. Please try again or message us directly on WhatsApp (green button).",
      submit: "Submit my Profile",
      sending: "Sending…",
      consent: "By submitting, you agree to be contacted by WhatsApp or email.",
    },
    footer: {
      desc: "We connect veterinarians from Mexico and Canada with clinics in the United States. We coordinate the NAVLE exam, state license, and TN visa alongside specialized immigration attorneys.",
      contact: "Contact",
      profileLink: "Check your profile",
      legal: "Legal",
      privacy: "Privacy Policy",
      terms: "Terms & Conditions",
      rights: "All rights reserved.",
      madeWith: "Made with care for international veterinarians",
      disclaimer:
        "VetBridge USA is a coordination and recruiting service. It is not a law firm and does not provide legal immigration advice; visa filings are handled by independent immigration attorneys. We do not guarantee any visa, license, or job; outcomes depend on each candidate's profile and the relevant authorities.",
    },
    faq: {
      heading: "Frequently asked questions",
      sub: "Answers to the most common questions.",
      items: [
        {
          q: "How much does the program cost?",
          a: "Evaluating your profile is 100% free. There are options for sponsoring clinics to cover much of the cost, depending on your profile. A coordinator will explain your specific case with no obligation.",
        },
        {
          q: "Do I need perfect English?",
          a: "Not perfect, but functional. The NAVLE exam and client communication are in English. If your level is intermediate, we help you with a plan to reach the level you need.",
        },
        {
          q: "How long does the process take?",
          a: "FMVZ-UNAM graduates (2011-2025): from 9-15 months. Graduates from other universities: 2 to 4 years due to the equivalency process (ECFVG/PAVE). In your free evaluation we give you a personalized timeline.",
        },
        {
          q: "What is the TN visa?",
          a: "It's a USMCA (T-MEC) work visa exclusive to Mexican and Canadian professionals. Veterinarian is a listed profession. There's no lottery or annual cap like the H-1B, and it renews indefinitely in 3-year periods. Mexican nationals apply at a U.S. consulate; Canadians receive it at the border.",
        },
        {
          q: "Can I bring my family?",
          a: "Yes. Your spouse and children can join you on the TD visa, derived from your TN visa.",
        },
      ],
    },
    about: {
      heading: "Who we are",
      p1: "VetBridge USA connects veterinarians from Mexico and Canada with U.S. clinics that need talent. Immigration filings are handled by attorneys who specialize in TN visas; we coordinate the entire process alongside veterinarian mentors who have already passed the NAVLE. We're not a job board, we're with you at every step: exam, state license, visa, and placement.",
      p2a: "The accelerated path for UNAM graduates 2011-2025 is based on the ",
      p2b: " accreditation FMVZ-UNAM held from 2011 to 2025 and on the official NAVLE requirements published by the ",
      p2c: ".",
    },
    whatsapp: {
      aria: "Contact on WhatsApp",
      text: "Hi, I'm a veterinarian and I'd like information about the VetBridge USA program",
    },
  },
} as const;

function Index() {
  const [lang, setLang] = useState<Lang>("es");

  // Keep the document language in sync so screen readers / SEO reflect the toggle.
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const c = COPY[lang];

  return (
    <LangCtx.Provider value={{ lang, setLang }}>
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <Hero />
        <ValueProps />
        <PositioningBand before={c.band.before} highlight={c.band.highlight} body={c.band.body} />
        <SalaryComparison />
        <Lifestyle />
        <PoolAlert />
        <Process />
        <LandmarksDivider />
        <FAQ />
        <FormSection />
        <About />
        <Footer />
        <WhatsAppFloat />
      </div>
    </LangCtx.Provider>
  );
}

function LangToggle({ className = "" }: { className?: string }) {
  const { lang, setLang } = useLang();
  return (
    <button
      type="button"
      onClick={() => setLang(lang === "es" ? "en" : "es")}
      aria-label={lang === "es" ? "Switch to English" : "Cambiar a Español"}
      className={`inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-2 text-sm font-semibold text-foreground transition hover:bg-secondary ${className}`}
    >
      <Globe className="h-4 w-4 text-primary" />
      {COPY[lang].header.switchTo}
    </button>
  );
}

function Header() {
  const c = COPY[useLang().lang];
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo-mark.png" alt="" className="h-8 w-auto" />
          <span className="text-lg font-semibold tracking-tight">VetBridge USA</span>
        </Link>
        <div className="flex items-center gap-2">
          <LangToggle />
          <a
            href="#formulario"
            className="hidden rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90 sm:inline-flex"
          >
            {c.header.profile}
          </a>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  const c = COPY[useLang().lang].hero;
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.93 0.042 264 / 0.85), transparent 78%), radial-gradient(1000px 500px at 80% -10%, oklch(0.72 0.15 55 / 0.15), transparent 60%), radial-gradient(900px 500px at -10% 10%, oklch(0.38 0.14 250 / 0.18), transparent 60%)",
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
            <Zap className="h-3.5 w-3.5 text-accent" />
            {c.badge}
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
            {c.titlePre}
            <span className="text-primary">{c.titleHi}</span>
            {c.titlePost}
          </h1>
          <p className="mt-6 text-lg text-muted-foreground sm:text-xl">
            {c.subA}
            <strong className="text-foreground">{c.subStrong}</strong>
            {c.subB}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#formulario"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-base font-semibold text-primary-foreground shadow-sm transition hover:opacity-90"
            >
              {c.ctaPrimary}
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#beneficios"
              className="inline-flex items-center rounded-full border border-border bg-card px-6 py-3 text-base font-medium text-foreground transition hover:bg-secondary"
            >
              {c.ctaSecondary}
            </a>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            {c.chips.map((chip) => (
              <div key={chip} className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" /> {chip}
              </div>
            ))}
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
  const c = COPY[useLang().lang].valueProps;
  const icons = [DollarSign, Plane, ShieldCheck];
  return (
    <section id="beneficios" className="border-y border-border bg-secondary/40">
      <div className="mx-auto max-w-6xl px-4 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{c.heading}</h2>
          <p className="mt-4 text-muted-foreground">{c.sub}</p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {c.items.map(({ title, body }, i) => {
            const Icon = icons[i];
            return (
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
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Lifestyle() {
  const c = COPY[useLang().lang].lifestyle;
  const icons = [Wallet, Home, Building2, HeartHandshake];
  return (
    <section className="border-y border-border bg-secondary/40">
      <div className="mx-auto max-w-6xl px-4 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{c.heading}</h2>
          <p className="mt-4 text-muted-foreground">{c.sub}</p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {c.items.map(({ title, body }, i) => {
            const Icon = icons[i];
            return (
              <div key={title} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-accent/15 text-accent">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function PoolAlert() {
  const c = COPY[useLang().lang].pool;
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
          <Zap className="h-3.5 w-3.5" />
          {c.badge}
        </div>
        <h3 className="max-w-3xl text-2xl font-bold tracking-tight sm:text-3xl">{c.heading}</h3>
        <p className="mt-3 max-w-3xl text-base text-foreground/80 sm:text-lg">
          {c.bodyPre}
          <strong>{c.bodyStrong}</strong>
          {c.bodyPost}
        </p>
        <a
          href="#formulario"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
        >
          {c.cta}
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}

function Process() {
  const c = COPY[useLang().lang].process;
  return (
    <section className="border-t border-border bg-secondary/40">
      <div className="mx-auto max-w-6xl px-4 py-20">
        <div className="text-xs font-bold uppercase tracking-widest text-accent">{c.eyebrow}</div>
        <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{c.heading}</h2>
        <div aria-hidden className="mt-4 flex items-center gap-4 text-primary/30">
          <PawPrint className="h-4 w-4 -rotate-12" />
          <PawPrint className="h-5 w-5 rotate-6" />
          <PawPrint className="h-4 w-4 -rotate-12" />
          <PawPrint className="h-5 w-5 rotate-6" />
          <PawPrint className="h-4 w-4 -rotate-12" />
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {c.steps.map((s, i) => (
            <div key={s.t} className="rounded-2xl border border-border bg-card p-6">
              <div className="text-sm font-mono font-semibold text-accent">
                {String(i + 1).padStart(2, "0")}
              </div>
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
  const c = COPY[useLang().lang].form;
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
    // rejected with "column not found", retry without UTM rather than losing the lead.
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
      setError(c.error);
      return;
    }

    // Push into HubSpot CRM alongside Supabase. Fire-and-forget: a HubSpot
    // failure must not block the lead (Supabase already has it) or the redirect.
    // NY interest rides only in the HubSpot details blob — the candidates
    // table has no column for it (avoids a schema migration).
    void submitLeadToHubSpot({ ...payload, interes_ny: form.interes_ny }, utm);
    navigate({ to: "/gracias", search: vip ? { vip: 1 } : {} });
  }

  return (
    <section id="formulario" className="mx-auto max-w-3xl px-4 py-24">
      <div className="mb-8 text-center">
        <div aria-hidden className="mb-4 flex items-center justify-center gap-4 text-primary/40">
          <Dog className="h-6 w-6" />
          <Cat className="h-5 w-5" />
          <Rabbit className="h-5 w-5" />
          <Bird className="h-5 w-5" />
        </div>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{c.heading}</h2>
        <p className="mt-3 text-muted-foreground">{c.sub}</p>
      </div>
      <form
        onSubmit={onSubmit}
        className="space-y-5 rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8"
      >
        <Field label={c.name}>
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
          <Field label={c.email}>
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
          <Field label={c.phone}>
            <input
              name="telefono"
              required
              type="tel"
              minLength={7}
              maxLength={30}
              placeholder={c.phonePlaceholder}
              value={form.telefono}
              onChange={(e) => update("telefono", e.target.value)}
              className={inputCls}
            />
          </Field>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label={c.university}>
            <select
              name="universidad"
              required
              value={form.universidad}
              onChange={(e) => update("universidad", e.target.value as FormState["universidad"])}
              className={inputCls}
            >
              <option value="">{c.selectPlaceholder}</option>
              <option value="FMVZ-UNAM">FMVZ-UNAM</option>
              <option value="Otra Universidad">{c.otherUni}</option>
            </select>
          </Field>
          <Field label={c.gradYear}>
            <select
              name="ano_graduacion"
              required
              value={form.ano_graduacion}
              onChange={(e) => update("ano_graduacion", e.target.value)}
              className={inputCls}
            >
              <option value="">{c.selectPlaceholder}</option>
              {YEARS.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <Field label={c.englishLevel}>
          <select
            name="nivel_ingles"
            required
            value={form.nivel_ingles}
            onChange={(e) => update("nivel_ingles", e.target.value as FormState["nivel_ingles"])}
            className={inputCls}
          >
            <option value="">{c.selectPlaceholder}</option>
            <option value="Básico">{c.eng.basic}</option>
            <option value="Intermedio">{c.eng.inter}</option>
            <option value="Avanzado">{c.eng.adv}</option>
            <option value="Fluido/Nativo">{c.eng.fluent}</option>
          </select>
        </Field>

        <Field label={c.licenseQ}>
          <div className="flex gap-3">
            {([
              { value: "Sí" as const, label: c.yes },
              { value: "No" as const, label: c.no },
            ]).map((opt) => (
              <label
                key={opt.value}
                className={`flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-md border px-4 py-2.5 text-sm font-medium transition ${
                  form.licencia_mexico === opt.value
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-border bg-background text-foreground hover:bg-secondary"
                }`}
              >
                <input
                  type="radio"
                  name="licencia"
                  className="sr-only"
                  checked={form.licencia_mexico === opt.value}
                  onChange={() => update("licencia_mexico", opt.value)}
                  required
                />
                {opt.label}
              </label>
            ))}
          </div>
        </Field>

        <Field label={c.navleQ}>
          <select
            name="navle_status"
            required
            value={form.navle_status}
            onChange={(e) => update("navle_status", e.target.value as FormState["navle_status"])}
            className={inputCls}
          >
            <option value="">{c.selectPlaceholder}</option>
            <option value="Aprobado">{c.navle.passed}</option>
            <option value="Estudiando">{c.navle.studying}</option>
            <option value="No">{c.navle.no}</option>
          </select>
        </Field>

        <Field label={c.nyQ}>
          <div className="flex gap-3">
            {([
              { value: "Sí" as const, label: c.yes },
              { value: "Tal vez" as const, label: c.maybe },
              { value: "No" as const, label: c.no },
            ]).map((opt) => (
              <label
                key={opt.value}
                className={`flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-md border px-4 py-2.5 text-sm font-medium transition ${
                  form.interes_ny === opt.value
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-border bg-background text-foreground hover:bg-secondary"
                }`}
              >
                <input
                  type="radio"
                  name="interes_ny"
                  className="sr-only"
                  checked={form.interes_ny === opt.value}
                  onChange={() => update("interes_ny", opt.value)}
                  required
                />
                {opt.label}
              </label>
            ))}
          </div>
        </Field>

        {error && (
          <p className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-base font-semibold text-primary-foreground shadow-sm transition hover:opacity-90 disabled:opacity-60"
        >
          {status === "loading" ? c.sending : c.submit}
          <ArrowRight className="h-4 w-4" />
        </button>
        <p className="text-center text-xs text-muted-foreground">{c.consent}</p>
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
  const c = COPY[useLang().lang].footer;
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2">
              <img src="/logo-mark.png" alt="" className="h-8 w-auto" />
              <span className="text-lg font-semibold tracking-tight">{SITE.name}</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">{c.desc}</p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">{c.contact}</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>
                <a href={`mailto:${SITE.email}`} className="hover:text-foreground">
                  {SITE.email}
                </a>
              </li>
              <li>
                <a
                  href={SITE.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-foreground"
                >
                  <MessageCircle className="h-4 w-4" /> WhatsApp
                </a>
              </li>
              <li>
                <a href="#formulario" className="hover:text-foreground">
                  {c.profileLink}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">{c.legal}</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/privacidad" className="hover:text-foreground">
                  {c.privacy}
                </Link>
              </li>
              <li>
                <Link to="/terminos" className="hover:text-foreground">
                  {c.terms}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 sm:flex-row">
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {SITE.name}. {c.rights}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            {c.madeWith}
            <PawPrint className="h-3.5 w-3.5 text-primary/50" />
          </div>
        </div>
        <p className="mt-6 text-xs leading-relaxed text-muted-foreground/80">{c.disclaimer}</p>
      </div>
    </footer>
  );
}

function SalaryComparison() {
  const c = COPY[useLang().lang].salary;
  return (
    <section className="mx-auto max-w-6xl px-4 py-20">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{c.heading}</h2>
        <p className="mt-4 text-muted-foreground">{c.sub}</p>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
          <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {c.mxLabel}
          </div>
          <div className="mt-3 text-3xl font-bold text-foreground">{c.mxValue}</div>
          <div className="mt-1 text-sm text-muted-foreground">{c.perYear}</div>
          <p className="mt-4 text-sm text-muted-foreground">{c.mxNote}</p>
        </div>
        <div className="relative rounded-2xl border-2 border-primary bg-card p-8 shadow-md">
          <div className="absolute -top-3 left-6 inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wide text-primary-foreground">
            <Zap className="h-3.5 w-3.5" /> {c.usBadge}
          </div>
          <div className="text-xs font-semibold uppercase tracking-wide text-primary">
            {c.usLabel}
          </div>
          <div className="mt-3 text-3xl font-bold text-foreground">{c.usValue}</div>
          <div className="mt-1 text-sm text-muted-foreground">{c.perYear}</div>
          <p className="mt-4 text-sm text-muted-foreground">{c.usNote}</p>
        </div>
      </div>
      <p className="mt-8 text-center text-lg font-semibold text-foreground">
        {c.footPre}
        <span className="text-primary">{c.footHi}</span>
        {c.footPost}
      </p>
    </section>
  );
}

function FAQ() {
  const c = COPY[useLang().lang].faq;
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="border-t border-border bg-secondary/40">
      <div className="mx-auto max-w-3xl px-4 py-20">
        <div className="text-center">
          <Cat aria-hidden className="mx-auto mb-3 h-6 w-6 text-primary/40" />
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{c.heading}</h2>
          <p className="mt-3 text-muted-foreground">{c.sub}</p>
        </div>
        <div className="mt-10 space-y-3">
          {c.items.map((it, i) => {
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
  const c = COPY[useLang().lang].about;
  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-4xl px-4 py-20 text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{c.heading}</h2>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{c.p1}</p>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          {c.p2a}
          <a
            href="https://www.avma.org"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-foreground"
          >
            AVMA
          </a>
          {c.p2b}
          <a
            href="https://www.icva.net"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-foreground"
          >
            ICVA
          </a>
          {c.p2c}
        </p>
      </div>
    </section>
  );
}

function WhatsAppFloat() {
  const c = COPY[useLang().lang].whatsapp;
  const href = `https://wa.me/13232503726?text=${encodeURIComponent(c.text)}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={c.aria}
      className="fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition hover:scale-105"
      style={{ backgroundColor: "#25D366" }}
    >
      <MessageCircle className="h-7 w-7 text-white" fill="white" />
    </a>
  );
}
