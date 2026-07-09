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
};

/** Human-readable profile packed into the single "details" property in HubSpot. */
function buildDetails(lead: LeadForHubSpot, utm: Record<string, string>): string {
  const lines = [
    lead.vip_fast_track ? "⭐ VIP — FAST TRACK UNAM (2011–2025)" : "Ruta estándar (ECFVG/PAVE)",
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
