/**
 * Pushes a lead into HubSpot via the Forms Submission API (EU data center).
 * No secret key needed — portal + form IDs are public by design. This runs
 * alongside the Supabase insert (Supabase stays the source of truth); a
 * HubSpot failure must never block the user, so callers fire-and-forget.
 */

import { getFirstTouch } from "./first-touch";

const PORTAL_ID = "148861188";
const FORM_ID = "15fcb15b-317f-4375-b2f3-fd4e8ce3b523";
// EU account -> api-eu1 endpoint (see HubSpot embed code region).
const ENDPOINT = `https://api-eu1.hsforms.com/submissions/v3/integration/submit/${PORTAL_ID}/${FORM_ID}`;

export type LeadForHubSpot = {
  nombre_completo: string;
  correo_electronico: string;
  telefono: string;
  universidad: string;
  ano_graduacion: number;
  nivel_ingles: string;
  navle_status: string;
  vip_fast_track: boolean;
  /** "Lo antes posible" | "Este año" | "Solo explorando" — urgency to start (HubSpot-only, no DB column). */
  urgencia?: string;
  /** "Mexicana" | "Canadiense" | "Otra" — TN eligibility gate (HubSpot-only, no DB column). */
  nacionalidad?: string;
  /** Free-text notes from the candidate, in their own words (may be Spanish, untranslated). */
  comentarios?: string;
};

/**
 * First-touch channel as a lead_source dropdown value (SEO/PPC/Referral/
 * Social Media/Email Campaign/Direct/WhatsApp/Job Board). Empty when the
 * visitor's first touch couldn't be recorded (SSR, blocked storage).
 */
function leadSourceFields(): { name: string; value: string }[] {
  const ft = getFirstTouch();
  return ft ? [{ name: "lead_source", value: ft.leadSource }] : [];
}

/** Human-readable source line for the details blob, e.g. "Source: facebook (/veterinarios)". */
function sourceLines(): string[] {
  const ft = getFirstTouch();
  return ft ? [`Source: ${ft.raw} (${ft.landing})`] : [];
}

// The /veterinarios form stores a fixed set of canonical SPANISH answers (kept
// Spanish so Supabase RLS + the submit logic can validate them). Eran reads
// English, so the HubSpot "Details" blob is translated to English here at write
// time. Every lookup falls back to the raw value if an unexpected option appears.
const EN_INGLES: Record<string, string> = {
  "Básico": "Basic",
  "Intermedio": "Intermediate",
  "Avanzado": "Advanced",
  "Fluido/Nativo": "Fluent/Native",
};
const EN_NAVLE: Record<string, string> = {
  "Aprobado": "Passed",
  "Estudiando": "Studying for it",
  "No": "Not yet",
};
const EN_NACIONALIDAD: Record<string, string> = {
  "Mexicana": "Mexican",
  "Canadiense": "Canadian",
  "Otra": "Other",
};
const EN_URGENCIA: Record<string, string> = {
  "Lo antes posible": "As soon as possible",
  "Este año": "This year",
  "Solo explorando": "Just exploring",
};
const EN_UNIVERSIDAD: Record<string, string> = {
  "Otra Universidad": "Other university",
};
const en = (map: Record<string, string>, v: string): string => map[v] ?? v;

/** Human-readable profile packed into the single "details" property in HubSpot. */
function buildDetails(lead: LeadForHubSpot, utm: Record<string, string>): string {
  const lines = [
    // A-lead = accredited-school advantage + open to the fastest state.
    ...(lead.nacionalidad === "Otra" ? ["⚠️ NOT TN-ELIGIBLE — nationality outside USMCA (not Mexican or Canadian)"] : []),
    ...(lead.vip_fast_track && lead.urgencia === "Lo antes posible" ? ["🔥 A-LEAD: VIP UNAM + READY TO START"] : []),
    lead.vip_fast_track ? "⭐ VIP — UNAM FAST TRACK (2011–2025)" : "Standard route (ECFVG/PAVE)",
    ...(lead.urgencia ? [`⏱️ Timeline: ${en(EN_URGENCIA, lead.urgencia)}`] : []),
    ...(lead.nacionalidad ? [`Nationality: ${en(EN_NACIONALIDAD, lead.nacionalidad)}`] : []),
    "🗣️ Language: Spanish — answers translated from the Spanish form",
    `University: ${en(EN_UNIVERSIDAD, lead.universidad)}`,
    `Graduation year: ${lead.ano_graduacion}`,
    `English level: ${en(EN_INGLES, lead.nivel_ingles)}`,
    `NAVLE: ${en(EN_NAVLE, lead.navle_status)}`,
    ...(lead.comentarios ? [`💬 Candidate's notes (own words, may be Spanish): ${lead.comentarios}`] : []),
  ];
  // Submit-time UTMs win; fall back to the first-touch UTMs (SPA navigation
  // strips query params, so the submit page usually no longer carries them).
  let utmParts = Object.entries(utm).map(([k, v]) => `${k}=${v}`);
  const ft = getFirstTouch();
  if (!utmParts.length && ft) {
    utmParts = Object.entries(ft.utm).map(([k, v]) => `${k}=${v}`);
  }
  if (utmParts.length) lines.push(`Campaign: ${utmParts.join(", ")}`);
  lines.push(...sourceLines());
  return lines.join("\n");
}

/**
 * Push a general contact-form message into HubSpot as a contact, marked as an
 * inbound contact-form inquiry. Fire-and-forget; never throws.
 */
export async function submitContactToHubSpot(msg: {
  name: string;
  email: string;
  message: string;
}): Promise<boolean> {
  try {
    const [firstName, ...rest] = msg.name.trim().split(/\s+/);
    const body = {
      fields: [
        { name: "email", value: msg.email },
        { name: "firstname", value: firstName || msg.name },
        { name: "lastname", value: rest.join(" ") },
        { name: "brand", value: "VetBridge USA" },
        { name: "audience_type", value: "Contact form" },
        ...leadSourceFields(),
        { name: "details", value: `✉️ CONTACT FORM MESSAGE\n\n${msg.message}` },
      ],
      context: {
        pageUri: typeof window !== "undefined" ? window.location.href : "",
        pageName: "VetBridge USA — Contact",
      },
    };
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      console.error("HubSpot contact submission failed:", res.status, await res.text());
      return false;
    }
    return true;
  } catch (err) {
    console.error("HubSpot contact submission error:", err);
    return false;
  }
}

/**
 * Push a report-download lead into HubSpot, tagged so downloads can be
 * segmented (and clinic-side downloads spotted) in the CRM. Same form/portal
 * as the other site forms. Fire-and-forget; never throws.
 */
export async function submitReportDownloadToHubSpot(dl: {
  name: string;
  email: string;
  role: string;
  report: string;
}): Promise<boolean> {
  try {
    const [firstName, ...rest] = dl.name.trim().split(/\s+/);
    const body = {
      fields: [
        { name: "email", value: dl.email },
        { name: "firstname", value: firstName || dl.name },
        { name: "lastname", value: rest.join(" ") },
        { name: "brand", value: "VetBridge USA" },
        { name: "audience_type", value: "Report download" },
        ...leadSourceFields(),
        {
          name: "details",
          value: `📊 REPORT DOWNLOAD\nReport: ${dl.report}\nRole: ${dl.role}`,
        },
      ],
      context: {
        pageUri: typeof window !== "undefined" ? window.location.href : "",
        pageName: `VetBridge USA — ${dl.report}`,
      },
    };
    // keepalive so the request survives if the browser navigates to the PDF.
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      keepalive: true,
    });
    if (!res.ok) {
      console.error("HubSpot report download submission failed:", res.status, await res.text());
      return false;
    }
    return true;
  } catch (err) {
    console.error("HubSpot report download submission error:", err);
    return false;
  }
}

export type ClinicRequestForHubSpot = {
  clinic_name: string;
  state: string;
  role_type: string;
  species_focus: string;
  urgency: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
};

/**
 * Push a clinic hiring request into HubSpot as a contact, distinctly marked as
 * a CLINIC (buyer side) vs a veterinarian candidate. Same form/portal, so it
 * reuses the existing property mapping; the details blob carries the request.
 * Fire-and-forget; never throws.
 */
export async function submitClinicToHubSpot(req: ClinicRequestForHubSpot): Promise<boolean> {
  try {
    const [firstName, ...rest] = req.contact_name.trim().split(/\s+/);
    const details = [
      "🏥 CLÍNICA — SOLICITUD DE CONTRATACIÓN (CLINIC HIRING REQUEST)",
      `Clinic: ${req.clinic_name}`,
      `State: ${req.state}`,
      `Role: ${req.role_type}`,
      req.species_focus ? `Species focus: ${req.species_focus}` : null,
      `Urgency: ${req.urgency}`,
    ]
      .filter(Boolean)
      .join("\n");

    const body = {
      fields: [
        { name: "email", value: req.contact_email },
        { name: "firstname", value: firstName || req.contact_name },
        { name: "lastname", value: rest.join(" ") },
        { name: "phone", value: req.contact_phone },
        { name: "brand", value: "VetBridge USA" },
        { name: "audience_type", value: "Clínica" },
        ...leadSourceFields(),
        { name: "details", value: details },
      ],
      context: {
        pageUri: typeof window !== "undefined" ? window.location.href : "",
        pageName: "VetBridge USA — Clinic Request",
      },
    };

    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      console.error("HubSpot clinic submission failed:", res.status, await res.text());
      return false;
    }
    return true;
  } catch (err) {
    console.error("HubSpot clinic submission error:", err);
    return false;
  }
}

export type CanadianVetForHubSpot = {
  name: string;
  email: string;
  phone: string;
  province: string;
  /** Licensed to practice in a Canadian province (proxy for NAVLE passed). */
  licensed: boolean;
  /** "Passed" | "Not yet" | "Not sure" */
  navle: string;
  school: string;
  /** Free-text desired U.S. location, or "Open to anywhere". */
  us_location: string;
  /** "ASAP" | "3-6 months" | "Just exploring" */
  timeline: string;
};

/**
 * Push a Canadian veterinarian candidate into HubSpot. Distinct from the Mexico
 * funnel: Canadians are TN-at-the-border, AVMA-accredited (no ECFVG), and a
 * Canadian license means the NAVLE is already passed — so these are the fastest
 * (T1) candidates. Tagged 🍁 in the details blob and nationality Canadian so they
 * segment cleanly from the UNAM pipeline. Same audience_type ("Veterinario") so
 * they land in the candidate view. Fire-and-forget; never throws.
 */
export async function submitCanadianVetToHubSpot(lead: CanadianVetForHubSpot): Promise<boolean> {
  try {
    const [firstName, ...rest] = lead.name.trim().split(/\s+/);
    // A-lead = licensed (NAVLE already done) + ready to move now → placeable in weeks.
    const aLead = lead.licensed && lead.navle === "Passed" && lead.timeline === "ASAP";
    const details = [
      "🍁 CANADIAN VET — TN FAST TRACK (T1)",
      ...(aLead ? ["🔥 A-LEAD: licensed + NAVLE-passed + ready now"] : []),
      `Licensed in Canada: ${lead.licensed ? "Yes" : "Not yet"}`,
      `NAVLE: ${lead.navle}`,
      `Vet school: ${lead.school}`,
      `Province: ${lead.province}`,
      `Desired U.S. location: ${lead.us_location || "Open to anywhere"}`,
      `Timeline: ${lead.timeline}`,
      "Nationality: Canadian (TN-eligible at the border)",
    ].join("\n");

    const body = {
      fields: [
        { name: "email", value: lead.email },
        { name: "firstname", value: firstName || lead.name },
        { name: "lastname", value: rest.join(" ") },
        { name: "phone", value: lead.phone },
        { name: "brand", value: "VetBridge USA" },
        { name: "audience_type", value: "Veterinario" },
        { name: "hot_lead", value: aLead ? "true" : "false" },
        ...leadSourceFields(),
        { name: "details", value: details },
      ],
      context: {
        pageUri: typeof window !== "undefined" ? window.location.href : "",
        pageName: "VetBridge USA — Canada",
      },
    };

    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      console.error("HubSpot Canadian vet submission failed:", res.status, await res.text());
      return false;
    }
    return true;
  } catch (err) {
    console.error("HubSpot Canadian vet submission error:", err);
    return false;
  }
}

/**
 * Submit a lead to HubSpot. Resolves true on success, false on any failure.
 * Never throws — safe to call without awaiting.
 */
export async function submitLeadToHubSpot(
  lead: LeadForHubSpot,
  utm: Record<string, string>,
): Promise<boolean> {
  try {
    const [firstName, ...rest] = lead.nombre_completo.trim().split(/\s+/);
    const lastName = rest.join(" ");
    // Same bar as the 🔥 A-LEAD tag in the details blob: accredited-school
    // advantage (UNAM 2011-2025) + ready to start immediately.
    const hot = lead.vip_fast_track && lead.urgencia === "Lo antes posible";

    const body = {
      fields: [
        { name: "email", value: lead.correo_electronico },
        { name: "firstname", value: firstName || lead.nombre_completo },
        { name: "lastname", value: lastName },
        { name: "phone", value: lead.telefono },
        { name: "brand", value: "VetBridge USA" },
        { name: "audience_type", value: "Veterinario" },
        { name: "hot_lead", value: hot ? "true" : "false" },
        ...leadSourceFields(),
        { name: "details", value: buildDetails(lead, utm) },
      ],
      context: {
        pageUri: typeof window !== "undefined" ? window.location.href : "",
        pageName: "VetBridge USA — Evalúa tu Perfil",
      },
    };

    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      console.error("HubSpot submission failed:", res.status, await res.text());
      return false;
    }
    return true;
  } catch (err) {
    console.error("HubSpot submission error:", err);
    return false;
  }
}
