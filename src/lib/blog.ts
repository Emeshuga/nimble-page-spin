/**
 * Blog content. Add a new post by appending an object here, the index and
 * the /blog/$slug route render from this array. `body` is an array of
 * paragraphs (and optional H2 headings prefixed with "## ").
 */
export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO
  readMinutes: number;
  body: string[];
};

export const POSTS: BlogPost[] = [
  {
    slug: "how-mexican-veterinarians-practice-in-the-us",
    title: "How Mexican veterinarians can practice in the United States",
    excerpt:
      "A clear overview of the pathway from a Mexican veterinary degree to practicing as a licensed DVM in the U.S., including the UNAM accelerated route.",
    date: "2026-07-10",
    readMinutes: 5,
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
