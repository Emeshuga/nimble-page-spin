/** Shared site constants: contact info and canonical links. */
export const SITE = {
  name: "VetBridge USA",
  /** Vet / Spanish-facing contact (veterinarios + legal pages). */
  email: "hola@vetbridgeusa.com",
  /** English brand-level contact (homepage, about, contact, footer). */
  emailGeneral: "hello@vetbridgeusa.com",
  /** Clinic / employer-facing contact (clinics page). */
  emailClinics: "clinics@vetbridgeusa.com",
  /** WhatsApp number only — build links via whatsappLink() in lib/whatsapp.ts so each surface gets its own pre-filled text. */
  whatsappNumber: "13232503726",
  /** Human-readable last-updated date for the legal pages. */
  legalUpdated: "8 de julio de 2026",
  facebook: "https://www.facebook.com/VetBridgeUSA",
  linkedin: "https://www.linkedin.com/company/vetbridge-usa",
} as const;
