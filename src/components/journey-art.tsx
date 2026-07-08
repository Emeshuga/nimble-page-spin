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

/** Classic top-view airplane silhouette: fuselage, swept wings, tailplane. Nose points along +x. */
function PlaneGlyph() {
  return (
    <path
      d="M28 0 Q26 -4 20 -4 L6 -4 L-10 -26 L-16 -26 L-7 -4 L-18 -4 L-27 -13 L-31 -13 L-25 -3 L-25 3 L-31 13 L-27 13 L-18 4 L-7 4 L-16 26 L-10 26 L6 4 L20 4 Q26 4 28 0 Z"
      fill={NAVY}
      stroke={NAVY}
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  );
}

/**
 * Full-width hero overlay: plane crosses the whole hero on a dashed arc,
 * from Mexico City landmarks (far left) over the Golden Gate into a US
 * skyline with the Space Needle and Statue of Liberty (far right).
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

      {/* ——— Mexico City (far left): Ángel de la Independencia, Teotihuacán pyramid, Torre Latinoamericana ——— */}
      <g stroke={NAVY} strokeWidth="2.5" opacity="0.85">
        {/* Ángel de la Independencia */}
        <g>
          <path d="M90 560 v-12 h28 v12" />
          <path d="M98 548 V478 M110 548 V478" />
          <path d="M94 478 h20" />
          {/* golden angel */}
          <g stroke={ORANGE}>
            <circle cx="104" cy="462" r="3" />
            <path d="M104 465 v9" strokeWidth="2" />
            <path d="M104 468 l-8 -6 M104 468 l8 -6" strokeWidth="2" />
          </g>
        </g>
        {/* Teotihuacán pyramid */}
        <g>
          <path d="M140 560 V545 H156 V530 H170 V516 H182 V508 H198 V516 H210 V530 H224 V545 H240 V560" />
          <path d="M186 560 V508 M194 560 V508" strokeWidth="1.5" opacity="0.6" />
        </g>
        {/* Torre Latinoamericana */}
        <g>
          <path d="M252 560 V470 h16 V560" />
          <path d="M252 470 L256 458 h8 L268 470" />
          <path d="M260 458 V438" />
          <g strokeWidth="1.5" opacity="0.5">
            <path d="M256 490 h8 M256 506 h8 M256 522 h8 M256 538 h8" />
          </g>
        </g>
      </g>
      <text x="140" y="596" fontSize="17" fontWeight="700" fill={NAVY} fontFamily="inherit">
        México
      </text>

      {/* ——— USA (right): Golden Gate, skyline, Space Needle, Statue of Liberty ——— */}
      <g stroke={NAVY} strokeWidth="2.5" opacity="0.85">
        {/* Golden Gate Bridge */}
        <g>
          <path d="M965 560 V440 M1075 560 V440" />
          <path d="M957 468 h16 M1067 468 h16" strokeWidth="2" />
          <path d="M957 500 h16 M1067 500 h16" strokeWidth="2" />
          <path d="M925 516 C 965 444, 1075 444, 1115 516" strokeWidth="2" />
          <path d="M920 528 H1122" />
          <g strokeWidth="1.5" opacity="0.6">
            <path d="M985 528 v-52 M1020 528 v-59 M1055 528 v-52" />
          </g>
        </g>
        {/* skyline */}
        <g>
          <path d="M1132 560 V468 h44 v92" />
          <path d="M1152 468 v-20 h18 v20" opacity="0.9" />
          <path d="M1188 560 V430 h38 v130" />
          <g opacity="0.5" strokeWidth="2">
            <path d="M1144 490 h20 M1144 508 h20 M1144 526 h20" />
            <path d="M1198 452 h18 M1198 470 h18 M1198 488 h18 M1198 506 h18" />
          </g>
        </g>
        {/* Space Needle */}
        <g>
          <path d="M1256 560 C1261 520 1265 500 1266 492 M1284 560 C1279 520 1275 500 1274 492" />
          <path d="M1259 532 h22" strokeWidth="2" />
          <path d="M1246 490 q24 -13 48 0 q-24 13 -48 0 z" />
          <path d="M1270 481 V458" />
        </g>
        {/* Statue of Liberty */}
        <g>
          <path d="M1310 560 v-46 h48 v46" />
          <path d="M1318 514 v-14 h32 v14" />
          <path d="M1326 500 c0 -34 4 -54 8 -66 h8 c4 12 8 32 8 66" />
          <path d="M1334 468 v22 M1342 468 v22" strokeWidth="1.5" opacity="0.5" />
          <circle cx="1338" cy="424" r="8" />
          <path d="M1330 418 l-4 -9 M1338 414 v-10 M1346 418 l4 -9" strokeWidth="2" />
          <path d="M1328 452 l-13 9" />
          <path d="M1348 442 l16 -30" />
          <path
            d="M1366 406 c4.5 -3 3.5 -9.5 -1 -11.5 c-4.5 2.5 -5.5 8.5 1 11.5 z"
            fill={ORANGE}
            stroke="none"
          />
        </g>
      </g>
      <text x="1128" y="596" fontSize="17" fontWeight="700" fill={NAVY} fontFamily="inherit">
        EE.UU.
      </text>

      {/* ——— flight trajectory across the whole hero ——— */}
      <circle cx="300" cy="500" r="4" fill={ORANGE} />
      <path
        d="M300 500 C 520 105, 950 55, 1250 480"
        stroke={ORANGE}
        strokeWidth="3"
        strokeDasharray="1 15"
        opacity="0.8"
      />
      {/* landing ring arriving over the city */}
      <circle cx="1250" cy="480" r="8" stroke={ORANGE} strokeWidth="2.5" />
      <circle cx="1250" cy="480" r="3" fill={ORANGE} />

      {/* animated plane (CSS motion path in styles.css) */}
      <g className="vb-plane">
        <PlaneGlyph />
      </g>
      {/* static fallback near the apex when animation is unavailable */}
      <g className="vb-plane-static" transform="translate(740 100) rotate(3)">
        <PlaneGlyph />
      </g>
    </svg>
  );
}

/** Quiet full-width band of US landmarks: Golden Gate, Empire State, Vegas sign, skyline, Space Needle, Liberty. */
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
        <path d="M425 138 v-22 h90 v22" />
        <path d="M440 116 v-28 h60 v28" />
        <path d="M453 88 v-24 h34 v24" />
        <path d="M462 64 v-12 h16 v12" />
        <path d="M470 52 v-18" />
        <g strokeWidth="1.5" opacity="0.7">
          <path d="M450 100 h10 M465 100 h10 M480 100 h10" />
          <path d="M461 76 h18" />
        </g>
      </g>

      {/* Las Vegas welcome sign */}
      <g>
        <path d="M640 138 V120" />
        <path d="M640 84 l14 18 -14 18 -14 -18 z" />
        <path d="M640 80 l3 6 6 3 -6 3 -3 6 -3 -6 -6 -3 6 -3 z" strokeWidth="2" />
        <circle cx="640" cy="102" r="3" fill={ORANGE} stroke="none" />
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

      {/* Space Needle */}
      <g>
        <path d="M925 138 C929 106 932 92 933 86 M947 138 C943 106 940 92 939 86" />
        <path d="M928 118 h16" strokeWidth="2" />
        <path d="M916 84 q20 -11 40 0 q-20 11 -40 0 z" />
        <path d="M936 77 V60" />
      </g>

      {/* Statue of Liberty */}
      <g>
        <path d="M1046 138 v-32 h38 v32" />
        <path d="M1052 106 v-11 h26 v11" />
        <path d="M1057 95 c0 -24 3 -38 6 -46 h6 c3 8 6 22 6 46" />
        <path d="M1063 72 v16 M1069 72 v16" strokeWidth="1.2" opacity="0.5" />
        <circle cx="1066" cy="42" r="6" />
        <path d="M1060 37 l-3 -7 M1066 35 v-8 M1072 37 l3 -7" strokeWidth="1.5" />
        <path d="M1058 63 l-10 7" />
        <path d="M1074 56 l12 -22" />
        <path
          d="M1088 30 c3.5 -2.5 2.5 -7.5 -1 -9.5 c-3.5 2 -4 7 1 9.5 z"
          fill={ORANGE}
          stroke="none"
        />
      </g>
    </svg>
  );
}
