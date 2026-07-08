/**
 * Decorative SVG artwork for the landing page: the Mexico -> USA journey.
 * Drawn in the same rounded-stroke style as the lucide icon set so the
 * illustrations read as part of the design system, not pasted imagery.
 */

const NAVY = "oklch(0.38 0.14 250)";
const ORANGE = "oklch(0.72 0.15 55)";

/** Hero scene: plane taking off from Mexico on a dashed arc, descending toward a US skyline with the Statue of Liberty. */
export function HeroJourney({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 560 440"
      role="img"
      aria-label="Trayectoria de un avión desde México hacia Estados Unidos"
      className={className}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* soft backdrop */}
      <circle cx="330" cy="200" r="180" fill={NAVY} opacity="0.05" />
      <circle cx="120" cy="330" r="90" fill={ORANGE} opacity="0.06" />

      {/* ground line */}
      <path d="M24 376 H536" stroke={NAVY} strokeWidth="2.5" opacity="0.25" />

      {/* ——— US skyline (right) ——— */}
      <g stroke={NAVY} strokeWidth="2.5">
        {/* buildings */}
        <path d="M318 376 V268 h40 v108" />
        <path d="M338 268 v-22 h20 v22" opacity="0.9" />
        <path d="M374 376 V230 h34 v146" />
        <path d="M424 376 V290 h30 v86" />
        {/* windows */}
        <g opacity="0.5" strokeWidth="2">
          <path d="M330 290 h16 M330 308 h16 M330 326 h16" />
          <path d="M384 250 h14 M384 268 h14 M384 286 h14 M384 304 h14" />
          <path d="M432 306 h14 M432 324 h14" />
        </g>
        {/* Statue of Liberty */}
        <g>
          {/* pedestal */}
          <path d="M486 376 v-40 h36 v40" />
          <path d="M492 336 v-12 h24 v12" />
          {/* body */}
          <path d="M498 324 c0 -30 3 -48 6 -60 h4 c3 12 6 30 6 60" />
          {/* head */}
          <circle cx="506" cy="252" r="7" />
          {/* crown */}
          <path d="M500 246 l-3 -8 M506 244 v-9 M512 246 l3 -8" strokeWidth="2" />
          {/* tablet arm (left) */}
          <path d="M498 280 l-10 8" />
          {/* torch arm raised */}
          <path d="M514 268 l14 -26" />
          {/* torch flame */}
          <path d="M530 236 c4 -3 3 -9 -1 -11 c-4 2 -5 8 1 11 z" fill={ORANGE} stroke="none" />
        </g>
      </g>
      {/* EE.UU. label */}
      <text x="428" y="404" fontSize="15" fontWeight="700" fill={NAVY} fontFamily="inherit">
        EE.UU.
      </text>

      {/* ——— Mexico origin (left) ——— */}
      <g stroke={NAVY} strokeWidth="2.5">
        {/* map pin */}
        <path d="M64 340 c-11 -12 -17 -21 -17 -30 a17 17 0 1 1 34 0 c0 9 -6 18 -17 30 z" />
        <circle cx="64" cy="309" r="6" fill={ORANGE} stroke="none" />
        {/* little houses */}
        <path d="M96 376 v-16 l10 -8 10 8 v16" opacity="0.6" />
        <path d="M124 376 v-12 l8 -7 8 7 v12" opacity="0.45" />
      </g>
      <text x="40" y="404" fontSize="15" fontWeight="700" fill={NAVY} fontFamily="inherit">
        México
      </text>

      {/* ——— flight trajectory ——— */}
      {/* takeoff point */}
      <circle cx="88" cy="352" r="4" fill={ORANGE} />
      {/* dashed arc: up from Mexico, descending toward the US side */}
      <path
        d="M88 352 C 150 140, 300 84, 452 300"
        stroke={ORANGE}
        strokeWidth="3"
        strokeDasharray="1 14"
        strokeLinecap="round"
      />
      {/* landing target ring near the skyline */}
      <circle cx="452" cy="300" r="7" stroke={ORANGE} strokeWidth="2.5" />
      <circle cx="452" cy="300" r="2.5" fill={ORANGE} />

      {/* plane on the descent */}
      <g transform="translate(384 176) rotate(28)">
        <path
          d="M0 10 L44 0 L16 18 L18 32 L8 20 L-8 22 Z"
          fill={NAVY}
          stroke={NAVY}
          strokeWidth="2"
        />
        <path d="M16 18 L44 0" stroke="white" strokeWidth="1.5" opacity="0.7" />
      </g>
    </svg>
  );
}

/** Quiet full-width band of US landmarks: Golden Gate, Capitol, skyline. Purely decorative. */
export function MonumentsBand({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1200 150"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke={NAVY}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      preserveAspectRatio="xMidYMax meet"
    >
      {/* baseline */}
      <path d="M0 138 H1200" opacity="0.5" />

      {/* Golden Gate */}
      <g>
        <path d="M120 138 V54 M260 138 V54" />
        <path d="M96 84 h48 M236 84 h48" strokeWidth="2" />
        <path d="M60 100 C 120 40, 260 40, 320 100" strokeWidth="2" />
        <path d="M120 84 v-14 M260 84 v-14" strokeWidth="2" />
        <path d="M60 112 H320" />
        <path
          d="M140 112 v-24 M165 112 v-31 M190 112 v-33 M215 112 v-31 M240 112 v-24"
          strokeWidth="1.5"
          opacity="0.7"
        />
      </g>

      {/* Capitol */}
      <g>
        <path d="M480 138 v-28 h150 v28" />
        <path d="M500 110 v-16 h110 v16" />
        <path d="M530 94 c0 -26 10 -40 25 -46 c15 6 25 20 25 46" />
        <path d="M555 48 v-14" />
        <circle cx="555" cy="30" r="4" />
        <path
          d="M515 110 v18 M535 110 v18 M575 110 v18 M595 110 v18"
          strokeWidth="1.5"
          opacity="0.7"
        />
      </g>

      {/* skyline */}
      <g>
        <path d="M760 138 V80 h34 v58" />
        <path d="M770 80 v-18 h14 v18" />
        <path d="M812 138 V56 h30 v82" />
        <path d="M858 138 V96 h28 v42" />
        <g strokeWidth="1.5" opacity="0.6">
          <path d="M770 96 h14 M770 110 h14" />
          <path d="M820 72 h14 M820 88 h14 M820 104 h14" />
          <path d="M866 108 h12 M866 122 h12" />
        </g>
      </g>

      {/* Statue of Liberty */}
      <g>
        <path d="M1010 138 v-30 h30 v30" />
        <path d="M1015 108 v-10 h20 v10" />
        <path d="M1020 98 c0 -24 2.5 -38 5 -48 h3.5 c2.5 10 5 24 5 48" />
        <circle cx="1025" cy="40" r="6" />
        <path d="M1020 35 l-3 -7 M1025 33 v-8 M1030 35 l3 -7" strokeWidth="1.5" />
        <path d="M1032 54 l12 -21" />
        <path
          d="M1046 28 c3.5 -2.5 2.5 -7.5 -1 -9.5 c-3.5 2 -4 7 1 9.5 z"
          fill={ORANGE}
          stroke="none"
        />
      </g>
    </svg>
  );
}
