/**
 * Decorative SVG artwork for the landing page: the Mexico -> USA journey.
 * Drawn in the same rounded-stroke style as the lucide icon set so the
 * illustrations read as part of the design system, not pasted imagery.
 *
 * The hero plane animates along the arc via CSS motion path (`.vb-plane`
 * in styles.css); a static plane at the arc's apex is shown instead when
 * the browser doesn't support offset-path or prefers reduced motion.
 */

const NAVY = "oklch(0.38 0.14 250)";
const ORANGE = "oklch(0.72 0.15 55)";

/** Paper-plane glyph pointing along +x, centered on its origin. */
function PlaneGlyph() {
  return (
    <g transform="translate(-20 -14)">
      <path
        d="M0 10 L44 0 L16 18 L18 32 L8 20 L-8 22 Z"
        fill={NAVY}
        stroke={NAVY}
        strokeWidth="2"
      />
      <path d="M16 18 L44 0" stroke="white" strokeWidth="1.5" opacity="0.7" />
    </g>
  );
}

/**
 * Full-width hero overlay: plane crosses the whole hero on a dashed arc,
 * from a Mexico map pin (far left) to a US skyline + Statue of Liberty
 * (far right). Rendered absolutely behind the hero content.
 */
export function HeroFlight({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1440 620"
      preserveAspectRatio="xMidYMax meet"
      aria-hidden="true"
      className={className}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* ground line */}
      <path d="M40 560 H1400" stroke={NAVY} strokeWidth="2.5" opacity="0.15" />

      {/* ——— Mexico origin (far left) ——— */}
      <g stroke={NAVY} strokeWidth="2.5" opacity="0.85">
        <path d="M110 540 c-12 -13 -19 -23 -19 -33 a19 19 0 1 1 38 0 c0 10 -7 20 -19 33 z" />
        <circle cx="110" cy="505" r="6.5" fill={ORANGE} stroke="none" />
        <path d="M150 560 v-18 l11 -9 11 9 v18" opacity="0.5" />
        <path d="M182 560 v-13 l9 -8 9 8 v13" opacity="0.35" />
      </g>
      <text x="86" y="596" fontSize="17" fontWeight="700" fill={NAVY} fontFamily="inherit">
        México
      </text>

      {/* ——— US skyline + Liberty (far right) ——— */}
      <g stroke={NAVY} strokeWidth="2.5" opacity="0.85">
        <path d="M1080 560 V468 h44 v92" />
        <path d="M1100 468 v-20 h18 v20" opacity="0.9" />
        <path d="M1140 560 V430 h38 v130" />
        <path d="M1194 560 V492 h34 v68" />
        <g opacity="0.5" strokeWidth="2">
          <path d="M1092 490 h20 M1092 508 h20 M1092 526 h20" />
          <path d="M1150 452 h18 M1150 470 h18 M1150 488 h18 M1150 506 h18" />
          <path d="M1202 510 h18 M1202 528 h18" />
        </g>
        {/* Statue of Liberty */}
        <g>
          <path d="M1276 560 v-46 h48 v46" />
          <path d="M1284 514 v-14 h32 v14" />
          {/* robe */}
          <path d="M1292 500 c0 -34 4 -54 8 -66 h8 c4 12 8 32 8 66" />
          <path d="M1300 468 v22 M1308 468 v22" strokeWidth="1.5" opacity="0.5" />
          {/* head + crown */}
          <circle cx="1304" cy="424" r="8" />
          <path d="M1296 418 l-4 -9 M1304 414 v-10 M1312 418 l4 -9" strokeWidth="2" />
          {/* tablet arm */}
          <path d="M1294 452 l-13 9" />
          {/* torch arm */}
          <path d="M1314 442 l16 -30" />
          <path
            d="M1332 406 c4.5 -3 3.5 -9.5 -1 -11.5 c-4.5 2.5 -5.5 8.5 1 11.5 z"
            fill={ORANGE}
            stroke="none"
          />
        </g>
      </g>
      <text x="1128" y="596" fontSize="17" fontWeight="700" fill={NAVY} fontFamily="inherit">
        EE.UU.
      </text>

      {/* ——— flight trajectory across the whole hero ——— */}
      <circle cx="130" cy="505" r="4" fill={ORANGE} />
      <path
        d="M130 505 C 380 110, 980 60, 1250 480"
        stroke={ORANGE}
        strokeWidth="3"
        strokeDasharray="1 15"
        opacity="0.8"
      />
      {/* landing ring at the US side */}
      <circle cx="1250" cy="480" r="8" stroke={ORANGE} strokeWidth="2.5" />
      <circle cx="1250" cy="480" r="3" fill={ORANGE} />

      {/* animated plane (CSS motion path in styles.css) */}
      <g className="vb-plane">
        <PlaneGlyph />
      </g>
      {/* static fallback near the apex when animation is unavailable */}
      <g className="vb-plane-static" transform="translate(700 108) rotate(4)">
        <PlaneGlyph />
      </g>
    </svg>
  );
}

/** Quiet full-width band of US landmarks: Golden Gate, Empire State, skyline, Liberty. Purely decorative. */
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

      {/* Empire State Building */}
      <g>
        <path d="M485 138 v-22 h90 v22" />
        <path d="M500 116 v-28 h60 v28" />
        <path d="M513 88 v-24 h34 v24" />
        <path d="M522 64 v-12 h16 v12" />
        <path d="M530 52 v-18" />
        <g strokeWidth="1.5" opacity="0.7">
          <path d="M510 100 h10 M525 100 h10 M540 100 h10" />
          <path d="M521 76 h18" />
        </g>
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
        <path d="M1006 138 v-32 h38 v32" />
        <path d="M1012 106 v-11 h26 v11" />
        {/* robe */}
        <path d="M1017 95 c0 -24 3 -38 6 -46 h6 c3 8 6 22 6 46" />
        <path d="M1023 72 v16 M1029 72 v16" strokeWidth="1.2" opacity="0.5" />
        {/* head + crown */}
        <circle cx="1026" cy="42" r="6" />
        <path d="M1020 37 l-3 -7 M1026 35 v-8 M1032 37 l3 -7" strokeWidth="1.5" />
        {/* tablet arm */}
        <path d="M1018 63 l-10 7" />
        {/* torch arm */}
        <path d="M1034 56 l12 -22" />
        <path
          d="M1048 30 c3.5 -2.5 2.5 -7.5 -1 -9.5 c-3.5 2 -4 7 1 9.5 z"
          fill={ORANGE}
          stroke="none"
        />
      </g>
    </svg>
  );
}
