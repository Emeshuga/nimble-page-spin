/**
 * Blog content. Add a new post by appending an object here, the index and
 * the /blog/$slug route render from this array. `body` is an array of
 * paragraphs (and optional H2 headings prefixed with "## ").
 */
export const CATEGORIES = ["Research", "For clinics", "For veterinarians"] as const;
export type BlogCategory = (typeof CATEGORIES)[number];

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO
  readMinutes: number;
  category: BlogCategory;
  /** Optional thumbnail image path (public/). Falls back to a branded gradient tile. */
  thumb?: string;
  body: string[];
  /** Optional in-article CTA rendered as a button after the body. */
  cta?: { href: string; label: string };
};

export const POSTS: BlogPost[] = [
  {
    slug: "doj-antitrust-veterinary-shortage",
    title: "The DOJ just weighed in on veterinary gatekeeping. Clinic owners should pay attention",
    excerpt:
      "In a rare move, the Justice Department told a federal court that veterinary accreditation is subject to antitrust law, and pointed at the numbers behind the profession's supply problem. Here's what it means for clinics that can't hire.",
    date: "2026-07-19",
    readMinutes: 5,
    category: "Research",
    cta: {
      href: "/clinics",
      label: "See how clinics hire across the border",
    },
    body: [
      "On December 15, 2025, the Department of Justice did something it almost never does in veterinary medicine: its Antitrust Division filed a statement of interest in a private federal lawsuit against the American Veterinary Medical Association, the body that accredits every veterinary school in the United States.",
      "The suit was brought by an AVMA-accredited veterinary school, Lincoln Memorial University, which alleges that the AVMA effectively reinterpreted its research accreditation standard in a way that forces schools into a high-cost model with an on-site teaching hospital. According to the complaint, that policy threatens the school's accreditation, discourages new veterinary colleges from opening, and drives up the cost of veterinary education.",
      "## What the DOJ actually said",
      "The Justice Department took no position on who should win the case. What it told the court is broader, and arguably more important: professional accreditation bodies are not exempt from antitrust law. In the DOJ's words, accreditors \"cannot erect anticompetitive hurdles that reduce competition by restricting the number of veterinary providers entering the profession.\"",
      "The filing also put numbers on the problem. Despite decades of population growth and surging pet ownership, the United States has had only around 34 accredited veterinary colleges, all accredited by a single organization. The DOJ tied that bottleneck directly to the rising cost of veterinary care for pet owners and livestock farmers.",
      "## Why this matters if you're trying to hire",
      "If your clinic has had a DVM posting open for months, this filing names the structural cause. The shortage most owners experience as a hiring problem is, upstream, a supply problem. US schools graduate roughly 3,200 to 4,000 veterinarians a year, and seat growth has come nowhere close to matching demand for care.",
      "The bottleneck is even tighter for veterinarians trained outside the accredited system. More than 2,000 foreign-trained veterinarians are currently enrolled in the AVMA's equivalency program, the ECFVG. Its final hurdle, the hands-on Clinical Proficiency Examination, is offered at exactly two sites in the world, with about 250 full-exam seats a year. Waits run past a year, and most candidates fail at least one section and must requeue for a retake. The net result: on average, only 282 foreign-trained veterinarians pass the NAVLE licensing exam each year, in a market where the projected shortfall is measured in the thousands.",
      "Whether the lawsuit succeeds or not, litigation moves slowly. No court ruling will put a doctor in your exam room this year.",
      "## The pathway that already exists",
      "Here's what most clinic owners don't realize: for veterinarians from Mexico and Canada, a faster lane already exists, and it doesn't depend on this case. Veterinarian is a covered profession under the USMCA trade agreement, so licensed candidates qualify for the TN visa, which has no lottery and no annual cap. Graduates of UNAM's veterinary school from its AVMA accreditation window, along with Canada's AVMA-accredited graduates, can skip the equivalency backlog entirely and go straight to the NAVLE. Some states go further: New York, for example, issues a limited permit that lets qualified international veterinarians practice under supervision while they complete licensure.",
      "The DOJ filing matters because it says, in effect, that the scarcity was never inevitable. Clinics don't have to wait for the courts to catch up. The doctors exist today, on the other side of a border, and the legal pathway to hire them is already open.",
    ],
  },
  {
    slug: "2026-state-of-the-veterinary-workforce-report",
    title: "Announcing the 2026 State of the Veterinary Workforce Report",
    excerpt:
      "Our first annual report compiles the latest BLS, AVMA, AAVMC, ICVA, APPA, Mars, and Merck data on veterinary demand, pay, burnout, the education pipeline, and the overlooked cross-border talent supply.",
    date: "2026-07-13",
    readMinutes: 3,
    category: "Research",
    thumb: "/blog/2026-state-of-the-veterinary-workforce-report.jpg",
    cta: {
      href: "/reports/state-of-the-veterinary-workforce-2026",
      label: "Read the full report",
    },
    body: [
      "Today we're publishing VetBridge USA's first annual research report: the 2026 State of the Veterinary Workforce. It pulls together the most current public data on the profession into one cited, linkable page, so clinic owners, veterinarians, and journalists don't have to reconcile a dozen sources themselves.",
      "## Three findings stand out",
      "First, demand keeps compounding. 95 million U.S. households now own a pet, industry spending reached $158 billion in 2025, and veterinary care takes 32.4% of the pet-owner wallet. Demand for pet healthcare services has been growing about 6.1% per year, roughly four times faster than the number of pet-owning households.",
      "Second, whether there is a long-term shortage is genuinely contested, and we cover both sides. The Mars Veterinary Health analysis projects a shortfall of 14,000 to 24,000 companion-animal veterinarians by 2030, while a newer AVMA-commissioned study projects supply keeping pace through 2035. What is not contested: the 2026 hiring market is severely supply-constrained today.",
      "Third, the international pipeline is running at a rounding error. An average of just 282 foreign-trained veterinarians pass the NAVLE each year, against a projected gap measured in the tens of thousands, even though the TN visa gives licensed veterinarians from Mexico and Canada a direct, uncapped path to U.S. practice.",
      "## Why we built it",
      "Every number in the report is cited to its primary source: the Bureau of Labor Statistics, the AVMA, the AAVMC, the ICVA, the APPA, Mars Veterinary Health, and Merck Animal Health. Where sources disagree, both positions are presented. You're welcome to cite the report with attribution and a link, and we'll update it annually with VetBridge USA's own placement data as our marketplace grows.",
    ],
  },
  {
    slug: "cant-find-a-veterinarian-to-hire",
    title: "Can't find a veterinarian to hire? Look across the border",
    excerpt:
      "Your job posting has been up for months and the few applicants you get are fielding multiple offers. Here's the hiring channel most US clinics haven't tried: licensed DVMs from Mexico and Canada on TN visas.",
    date: "2026-07-12",
    readMinutes: 6,
    category: "For clinics",
    thumb: "/blog/cant-find-a-veterinarian-to-hire.jpg",
    body: [
      "If you run a veterinary practice, you already know the problem. The job posting has been up for months. The recruiters keep calling with the same short list of candidates, and every one of them is fielding multiple offers. Meanwhile appointments back up, your existing doctors absorb the overflow, and burnout compounds the very shortage you're trying to hire your way out of.",
      "Most practices respond by bidding higher on the same small pool: bigger signing bonuses, higher salaries, more recruiter fees. That can work, but it's expensive, and it doesn't change the underlying math. There simply aren't enough US-trained veterinarians entering the workforce to fill the open roles.",
      "## The pool nobody is recruiting from",
      "Here's what most clinic owners don't know: the talent shortage is largely a US problem, not a North American one. Mexico graduates far more veterinarians than its market can absorb, and many of them trained at a school that held full AVMA accreditation. Canada's veterinary schools are all AVMA-accredited, and many Canadian veterinarians have already passed the NAVLE, the same licensing exam American graduates take.",
      "These are qualified doctors, examined to the same standard as US graduates, who want to practice in the United States. The reason your recruiter never mentions them is that placing them requires coordinating licensing and immigration steps that traditional recruiting firms don't handle.",
      "## The visa is simpler than you think",
      "Veterinarian is one of the professions covered by the TN visa under the USMCA trade agreement. Unlike the H-1B most employers associate with foreign hiring, the TN has no annual lottery and no cap. It's issued in three-year increments and is renewable. Canadian citizens can be approved directly at the border or airport preclearance; Mexican citizens apply at a US consulate.",
      "For the hiring clinic, this means no lottery gamble and no multi-year uncertainty. What it does require is a qualifying job offer and a candidate with the right credentials, which is why the licensing and visa steps have to move together, in the right order.",
      "## What the timeline actually looks like",
      "It depends on the candidate. A licensed Canadian veterinarian who has already passed the NAVLE can be placeable remarkably quickly, since the remaining steps are state licensing and a border-issued visa. A graduate of UNAM's veterinary school from its AVMA accreditation window follows an accelerated path. Other internationally trained veterinarians take longer because they complete an equivalency process first.",
      "The practical takeaway: this is not a same-week solution like relief staffing, but it is a real pipeline of full-time doctors, and some candidates are much closer to ready than most clinic owners assume.",
      "## What to look for in a placement partner",
      "If you explore this route, the whole value is in execution. Ask who manages the NAVLE and state-licensing steps, who handles the visa work (it should be independent immigration attorneys, not the recruiter), and what happens if the placement doesn't work out. At VetBridge USA, placements are backed by a three-year replacement guarantee, because a hire like this should be a long-term answer, not another turnover cycle.",
      "The veterinarians exist. They're trained, examined, and motivated. What's been missing is the bridge.",
    ],
  },
  {
    slug: "how-mexican-veterinarians-practice-in-the-us",
    title: "How Mexican veterinarians can practice in the United States",
    excerpt:
      "A clear overview of the pathway from a Mexican veterinary degree to practicing as a licensed DVM in the U.S., including the UNAM accelerated route.",
    date: "2026-07-10",
    readMinutes: 5,
    category: "For veterinarians",
    thumb: "/blog/how-mexican-veterinarians-practice-in-the-us.jpg",
    body: [
      "The United States is facing a significant shortage of veterinarians, and skilled DVMs trained in Mexico are increasingly part of the solution. But moving from a Mexican veterinary degree to practicing legally in the U.S. requires following a specific, well-defined pathway.",
      "## The two starting points",
      "Graduates of the FMVZ-UNAM during its AVMA accreditation period (2011-2025) are recognized as graduates of an accredited school. This means they can skip the ECFVG equivalency process and move directly toward the NAVLE and state licensing, a meaningfully faster route.",
      "Graduates of other Mexican universities typically complete the ECFVG (Educational Commission for Foreign Veterinary Graduates) certification first, which verifies their education and clinical skills before they sit for the NAVLE.",
      "## The NAVLE",
      "The North American Veterinary Licensing Examination (NAVLE), administered by the ICVA, is the standardized exam required for licensure across the U.S. and Canada. Preparation matters, and structured, mentor-supported preparation dramatically improves outcomes.",
      "## The visa",
      "Veterinarian is a profession covered under the USMCA (formerly NAFTA) TN visa category. For Mexican citizens, this is a direct professional work visa, no H-1B lottery, applied for at a U.S. consulate with a job offer and the required credentials.",
      "## Putting it together",
      "Evaluation of your profile, NAVLE preparation, state licensing, the TN visa, and relocation each have their own timeline. For UNAM-accredited graduates, the accelerated path can run in roughly 9-15 months. VetBridge USA coordinates each of these steps end-to-end, including the visa work through independent immigration attorneys.",
    ],
  },
  {
    slug: "what-is-a-tn-visa-for-veterinarians",
    title: "What is a TN visa for veterinarians?",
    excerpt:
      "The TN visa is one of the most direct ways for Mexican and Canadian veterinarians to work in the U.S. Here's how it works and why it's different from the H-1B.",
    date: "2026-07-10",
    readMinutes: 4,
    category: "For veterinarians",
    thumb: "/blog/what-is-a-tn-visa-for-veterinarians.jpg",
    body: [
      "For veterinarians from Mexico and Canada, the TN visa is often the most direct route to working legally in the United States, and it's very different from the more familiar H-1B.",
      "## What the TN visa is",
      "The TN (Trade NAFTA / USMCA) visa is a professional work visa created under the North American free trade agreement. It's available to citizens of Mexico and Canada in specific professional categories, and veterinarian is on that list.",
      "## Why it's better than the H-1B for this path",
      "Unlike the H-1B, the TN visa has no annual lottery and no numerical cap. It's granted in three-year increments and can be renewed indefinitely as long as you continue to qualify. That removes the single biggest source of uncertainty in U.S. work-visa immigration.",
      "## The key difference between Canada and Mexico",
      "Canadian citizens can apply for TN status directly at a U.S. port of entry or airport preclearance, often approved on the spot. Mexican citizens apply at a U.S. consulate in Mexico. Both are far more direct than the H-1B process.",
      "## What you need",
      "A TN application requires a qualifying job offer from a U.S. employer and proof that you meet the professional requirements, for veterinarians, that means the appropriate license or credentials to practice. This is why licensing and the visa are handled together.",
      "VetBridge USA coordinates the visa process through independent immigration attorneys who specialize in TN cases, alongside the licensing steps, so the pieces move in the right order.",
    ],
  },
  {
    slug: "visa-tn-para-veterinarios-mexicanos",
    title: "Visa TN para veterinarios mexicanos: guía completa 2026",
    excerpt:
      "La medicina veterinaria es una de las profesiones que califica para la visa TN del T-MEC. Sin lotería, renovable, y con un camino claro para ejercer en Estados Unidos. Aquí te explicamos cómo funciona.",
    date: "2026-07-14",
    readMinutes: 6,
    category: "For veterinarians",
    cta: { href: "/veterinarios", label: "Evalúa tu perfil en 2 minutos" },
    body: [
      "Si eres médico veterinario zootecnista en México, tienes acceso a una de las visas de trabajo más directas que existen para Estados Unidos: la visa TN. Fue creada por el tratado comercial entre México, Estados Unidos y Canadá (el T-MEC, antes TLCAN), y la medicina veterinaria está en su lista de profesiones elegibles.",
      "## Qué hace diferente a la visa TN",
      "A diferencia de la visa H-1B, que la mayoría de la gente asocia con trabajar en EE.UU., la visa TN no tiene lotería ni cupo anual. Se otorga por periodos de tres años y se puede renovar de forma indefinida mientras sigas calificando. Eso elimina la mayor fuente de incertidumbre de la migración laboral a Estados Unidos.",
      "## Qué necesitas",
      "En términos generales, una solicitud TN para veterinarios requiere dos cosas: una oferta de trabajo de un empleador estadounidense y la licencia o credenciales para ejercer la profesión. Por eso la licencia y la visa se gestionan juntas y en el orden correcto: primero las credenciales, luego la oferta, luego el consulado.",
      "Los ciudadanos mexicanos aplican en un consulado de EE.UU. en México. El trámite consular tiene sus propios tiempos de espera, por lo que conviene iniciarlo con anticipación y con el expediente completo.",
      "## El camino completo, paso a paso",
      "1. Evaluación de tu perfil: universidad, año de egreso y nivel de inglés definen tu ruta exacta.",
      "2. Examen NAVLE: el examen de licenciatura veterinaria de América del Norte, requerido en todos los estados.",
      "3. Licencia estatal: cada estado tiene su propia junta veterinaria y su papeleo.",
      "4. Oferta de trabajo: entrevistas con clínicas que patrocinan candidatos internacionales.",
      "5. Visa TN en el consulado y reubicación.",
      "El proceso completo típicamente toma de 9 a 15 meses. Si ya aprobaste el NAVLE, tu caso puede avanzar mucho más rápido, porque el paso más largo ya está resuelto.",
      "## Cuánto gana un veterinario en Estados Unidos",
      "Un veterinario asociado en EE.UU. gana típicamente entre $100,000 y $140,000 dólares al año, con demanda alta en prácticamente todo el país.",
      "En VetBridge USA acompañamos a veterinarios mexicanos en todo el proceso: preparación del NAVLE, licencia estatal, visa TN (con abogados migratorios independientes) y colocación en una clínica. No garantizamos visas ni empleos, ningún servicio serio puede hacerlo, pero coordinamos cada paso para que avances con claridad.",
    ],
  },
  {
    slug: "que-es-el-navle-guia-para-veterinarios-mexicanos",
    title: "¿Qué es el NAVLE? Guía para veterinarios mexicanos",
    excerpt:
      "El NAVLE es el examen que todo veterinario necesita aprobar para ejercer en Estados Unidos o Canadá. Qué evalúa, cuándo se presenta y cómo prepararte desde México.",
    date: "2026-07-14",
    readMinutes: 5,
    category: "For veterinarians",
    cta: { href: "/veterinarios", label: "Evalúa tu perfil en 2 minutos" },
    body: [
      "El NAVLE (North American Veterinary Licensing Examination) es el examen de licenciatura que administra el ICVA y que se exige para ejercer la medicina veterinaria en Estados Unidos y Canadá. No importa de qué universidad vengas: todo veterinario, estadounidense o extranjero, tiene que aprobarlo.",
      "## Qué evalúa",
      "Es un examen de opción múltiple, en inglés, orientado a la práctica clínica general: pequeñas especies, grandes especies, salud pública y farmacología, entre otras áreas. Se presenta por computadora en centros autorizados durante ventanas de aplicación específicas cada año, así que la fecha en que decides presentarlo define buena parte de tu calendario.",
      "## Quién puede presentarlo",
      "Aquí es donde tu universidad importa. Si egresaste de una escuela acreditada por la AVMA, calificas para presentar el NAVLE por la vía directa. La FMVZ de la UNAM estuvo acreditada por la AVMA de 2011 a 2025, así que los egresados de esas generaciones tienen esa ventaja. Egresados de otras universidades mexicanas normalmente completan primero una certificación de equivalencia (ECFVG o PAVE), que añade tiempo y costo al camino.",
      "## Qué tan difícil es",
      "Seamos honestos: es un examen exigente, en inglés técnico, y las tasas de aprobación han venido bajando en años recientes para todos los sustentantes. La diferencia entre aprobar y no aprobar suele estar en la preparación estructurada: un plan de estudio serio, bancos de preguntas, simulacros y apoyo de mentores que ya lo aprobaron.",
      "## Cómo encaja en el camino completo",
      "El NAVLE es el paso más largo del proceso para ejercer en EE.UU., por eso conviene empezar por ahí. Después vienen la licencia estatal, la oferta de trabajo y la visa TN. En conjunto, el camino típico toma de 9 a 15 meses.",
      "En VetBridge USA acompañamos tu preparación con tutores y mentores veterinarios que ya pasaron por esto, y coordinamos el resto del proceso: licencia, visa y colocación en una clínica de Estados Unidos.",
    ],
  },
  {
    slug: "unam-fmvz-acreditacion-avma-2011-2025",
    title: "Egresados de la UNAM 2011–2025: la ventaja que las nuevas generaciones ya no tienen",
    excerpt:
      "La FMVZ-UNAM estuvo acreditada por la AVMA de 2011 a 2025. Si egresaste en ese periodo, puedes ejercer en Estados Unidos sin la certificación ECFVG. Esa ventana ya cerró para las generaciones siguientes.",
    date: "2026-07-14",
    readMinutes: 5,
    category: "For veterinarians",
    cta: { href: "/veterinarios", label: "Checa si calificas" },
    body: [
      "Hay un dato que la mayoría de los egresados de la Facultad de Medicina Veterinaria y Zootecnia de la UNAM no conoce: durante los años en que la facultad estuvo acreditada por la AVMA (el Consejo de Educación de la Asociación Americana de Medicina Veterinaria), sus egresados quedaron reconocidos como graduados de una escuela acreditada en Estados Unidos.",
      "## Qué significa en la práctica",
      "Un veterinario extranjero normalmente tiene que completar una certificación de equivalencia, ECFVG o PAVE, antes de poder aspirar a la licencia en EE.UU. Ese proceso cuesta alrededor de dos mil dólares y suele añadir entre uno y varios años al camino.",
      "Si egresaste de la FMVZ-UNAM dentro de la ventana de acreditación (generaciones tituladas entre 2011 y 2025), te saltas ese paso por completo. Tu ruta es la misma que la de un egresado de una universidad estadounidense: aprobar el NAVLE y tramitar la licencia del estado donde vayas a trabajar.",
      "## Una ventana que ya cerró",
      "La UNAM retiró voluntariamente su acreditación AVMA con efecto a finales de 2025. Las generaciones que se titulen después ya no tienen esta vía directa. Para quienes sí entran en el rango, la ventaja es permanente: la acreditación se evalúa según tu fecha de egreso, no según el estatus actual de la escuela.",
      "Históricamente, solo una fracción mínima de los egresados aprovechó este camino. No por falta de interés, sino porque casi nadie sabía que existía.",
      "## Qué sigue si calificas",
      "El camino desde ahí: preparar y aprobar el NAVLE, tramitar la licencia estatal, conseguir una oferta de una clínica que patrocine tu visa TN, y hacer el trámite consular. El proceso típico completo toma de 9 a 15 meses, y la profesión veterinaria califica directamente para la visa TN del T-MEC, sin lotería.",
      "En VetBridge USA nos especializamos en este perfil. Evaluamos tu caso, te acompañamos en el NAVLE con mentores, y coordinamos licencia, visa y colocación con clínicas en Estados Unidos.",
    ],
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return POSTS.find((p) => p.slug === slug);
}

export function formatDate(iso: string): string {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
