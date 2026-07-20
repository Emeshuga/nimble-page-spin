/**
 * First-touch source attribution. On the visitor's first page load we derive
 * where they came from (UTM params, else the referrer, else "direct") and
 * persist it in localStorage — SPA navigation and later visits would otherwise
 * lose the landing URL's params, and forms are usually submitted several
 * pages after landing. First touch wins: later visits never overwrite it.
 */

const KEY = "vb_first_touch";

export type FirstTouch = {
  /** Internal option name of the HubSpot "Lead source" dropdown (lead_source). */
  leadSource: string;
  /** Raw signal for humans: utm_source or referrer host or "directo". */
  raw: string;
  /** utm_* params present on the landing URL. */
  utm: Record<string, string>;
  /** Landing pathname. */
  landing: string;
};

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];

const SOCIAL = /facebook|fb\.me|instagram|linkedin|lnkd\.in|twitter|t\.co|x\.com|tiktok/;
const SEARCH = /google|bing|duckduckgo|yahoo|ecosia/;
const JOB_BOARDS = /indeed|occ\.com\.mx|occmundial|computrabajo|glassdoor|talent\.com/;

/** Map utm params / referrer to an existing lead_source dropdown option. */
function derive(utm: Record<string, string>, referrer: string): { leadSource: string; raw: string } {
  const source = (utm.utm_source ?? "").toLowerCase();
  const medium = (utm.utm_medium ?? "").toLowerCase();

  if (source) {
    const raw = source + (medium ? `/${medium}` : "");
    if (medium === "job" || JOB_BOARDS.test(source)) return { leadSource: "job_board", raw };
    if (/cpc|ppc|paid/.test(medium) || (utm.gclid ?? "") !== "") return { leadSource: "ppc", raw };
    if (SOCIAL.test(source)) return { leadSource: "social_media", raw };
    if (SEARCH.test(source)) return { leadSource: "seo", raw };
    if (/whatsapp|^wa$/.test(source)) return { leadSource: "whatsapp", raw };
    if (/email|newsletter/.test(source) || medium === "email") return { leadSource: "email_campaign", raw };
    if (/flyer|qr|print/.test(source)) return { leadSource: "referral", raw };
    return { leadSource: "referral", raw };
  }

  let host = "";
  try {
    host = referrer ? new URL(referrer).hostname.replace(/^www\./, "") : "";
  } catch {
    host = "";
  }
  if (!host) return { leadSource: "direct", raw: "directo" };
  if (SEARCH.test(host)) return { leadSource: "seo", raw: host };
  if (SOCIAL.test(host)) return { leadSource: "social_media", raw: host };
  if (JOB_BOARDS.test(host)) return { leadSource: "job_board", raw: host };
  if (/whatsapp/.test(host)) return { leadSource: "whatsapp", raw: host };
  return { leadSource: "referral", raw: host };
}

/** Record the first touch once per browser. Call on client boot; no-op after. */
export function captureFirstTouch(): void {
  if (typeof window === "undefined") return;
  try {
    if (localStorage.getItem(KEY)) return;
    const params = new URLSearchParams(window.location.search);
    const utm: Record<string, string> = {};
    for (const k of UTM_KEYS) {
      const v = params.get(k);
      if (v) utm[k] = v.slice(0, 120);
    }
    if (params.get("gclid")) utm.gclid = "1";
    const { leadSource, raw } = derive(utm, document.referrer);
    const ft: FirstTouch = { leadSource, raw, utm, landing: window.location.pathname };
    localStorage.setItem(KEY, JSON.stringify(ft));
  } catch {
    // localStorage unavailable (private mode etc.) — attribution is best-effort.
  }
}

export function getFirstTouch(): FirstTouch | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as FirstTouch) : null;
  } catch {
    return null;
  }
}
