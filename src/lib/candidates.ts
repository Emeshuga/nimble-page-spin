/**
 * Illustrative sample candidate profiles for the homepage deck. These are
 * representative examples, not real people, the deck carries a "sample
 * profiles" note. Later this can be fed anonymized rows from the database.
 */
export type Candidate = {
  img: string;
  name: string;
  flag: string;
  school: string;
  eng: string;
  exam: string;
  spec: string;
  avail: string;
  badge: string;
  badgeType: "vip" | "ready" | "ny";
};

export const CANDIDATES: Candidate[] = [
  {
    img: "/candidates/c1.jpg",
    name: "Dra. María R.",
    flag: "🇲🇽",
    school: "FMVZ-UNAM · 2016",
    eng: "Advanced",
    exam: "NAVLE · in prep",
    spec: "Small animal",
    avail: "Available Q1 2027",
    badge: "VIP · Fast-Track",
    badgeType: "vip",
  },
  {
    img: "/candidates/c2.jpg",
    name: "Dr. James T.",
    flag: "🇨🇦",
    school: "U. of Guelph · 2018",
    eng: "Native",
    exam: "NAVLE · passed",
    spec: "Mixed practice",
    avail: "Ready now",
    badge: "Ready to place",
    badgeType: "ready",
  },
  {
    img: "/candidates/c3.jpg",
    name: "Dra. Ana H.",
    flag: "🇲🇽",
    school: "UNAM · 2014",
    eng: "Advanced",
    exam: "NAVLE · scheduled",
    spec: "Feline",
    avail: "Available Q2 2027",
    badge: "VIP · Fast-Track",
    badgeType: "vip",
  },
  {
    img: "/candidates/c4.jpg",
    name: "Dr. Carlos D.",
    flag: "🇲🇽",
    school: "U. Autónoma · 2012",
    eng: "Intermediate",
    exam: "ECFVG · in progress",
    spec: "Small animal",
    avail: "15 yrs experience",
    badge: "NY permit eligible",
    badgeType: "ny",
  },
  {
    img: "/candidates/c5.jpg",
    name: "Dra. Priya S.",
    flag: "🇨🇦",
    school: "U. of Calgary · 2019",
    eng: "Native",
    exam: "NAVLE · passed",
    spec: "Emergency",
    avail: "Ready now",
    badge: "Ready to place",
    badgeType: "ready",
  },
];
