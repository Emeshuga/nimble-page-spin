/**
 * Pushes a lead into HubSpot via the Forms Submission API (EU data center).
 * No secret key needed — portal + form IDs are public by design. This runs
 * alongside the Supabase insert (Supabase stays the source of truth); a
 * HubSpot failure must never block the user, so callers fire-and-forget.
 */

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
  licencia_mexico: boolean;
  navle_status: string;
  vip_fast_track: boolean;
  /** "Sí" | "Tal vez" | "No" — NY fast-track interest (HubSpot-only, no DB column). */
  interes_ny?: string;
};

/** Human-readable profile packed into the single "details" property in HubSpot. */
function buildDetails(lead: LeadForHubSpot, utm: Record<string, string>): string {
  const lines = [
    // A-lead = accredited-school advantage + open to the fastest state.
    ...(lead.vip_fast_track && lead.interes_ny === "Sí" ? ["🔥 A-LEAD: VIP UNAM + NUEVA YORK"] : []),
    lead.vip_fast_track ? "⭐ VIP — FAST TRACK UNAM (2011–2025)" : "Ruta estándar (ECFVG/PAVE)",
    ...(lead.interes_ny ? [`🗽 Interés en Nueva York: ${lead.interes_ny}`] : []),
    `Universidad: ${lead.universidad}`,
    `Año de graduación: ${lead.ano_graduacion}`,
    `Nivel de inglés: ${lead.nivel_ingles}`,
    `Licencia en México: ${lead.licencia_mexico ? "Sí" : "No"}`,
    `NAVLE: ${lead.navle_status}`,
  ];
  const utmParts = Object.entries(utm).map(([k, v]) => `${k}=${v}`);
  if (utmParts.length) lines.push(`Campaña: ${utmParts.join(", ")}`);
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

    const body = {
      fields: [
        { name: "email", value: lead.correo_electronico },
        { name: "firstname", value: firstName || lead.nombre_completo },
        { name: "lastname", value: lastName },
        { name: "phone", value: lead.telefono },
        { name: "brand", value: "VetBridge USA" },
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
