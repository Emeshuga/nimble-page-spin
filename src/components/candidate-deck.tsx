import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CANDIDATES, type Candidate } from "@/lib/candidates";

// Depth offsets for the three visible cards in the stack (top -> back).
const OFFSETS = [
  { x: 0, y: 0, r: 0, s: 1 },
  { x: 13, y: 11, r: 3.4, s: 0.965 },
  { x: -11, y: 19, r: -4.2, s: 0.93 },
];
const N = CANDIDATES.length;
const EASE = "cubic-bezier(.22,.61,.36,1)";
const THRESHOLD = 80;
const FLY_MS = 340;

const BADGE_BG: Record<Candidate["badgeType"], string> = {
  vip: "#ef8b3c",
  ready: "#2f9e6f",
  ny: "#1e3a6e",
};

function slotTransform(slot: number) {
  const o = OFFSETS[Math.min(slot, OFFSETS.length - 1)];
  return `translate(${o.x}px, ${o.y}px) rotate(${o.r}deg) scale(${o.s})`;
}

function CardFace({ c }: { c: Candidate }) {
  return (
    <>
      <div className="relative h-[58%]">
        <img
          src={c.img}
          alt=""
          draggable={false}
          className="pointer-events-none h-full w-full object-cover"
        />
        <span
          className="absolute left-3.5 top-3.5 rounded-full px-2.5 py-1 text-[11.5px] font-bold text-white"
          style={{ backgroundColor: BADGE_BG[c.badgeType] }}
        >
          {c.badge}
        </span>
        <div
          className="absolute bottom-3 left-4 text-white"
          style={{ textShadow: "0 2px 12px rgba(0,0,0,.55)" }}
        >
          <div className="text-[20px] font-bold leading-tight">
            {c.flag} {c.name}
          </div>
          <div className="text-sm opacity-90">{c.school}</div>
        </div>
      </div>
      <div className="px-4 py-3">
        {[
          ["English", c.eng],
          ["Exam", c.exam],
          ["Focus", c.spec],
          ["Status", c.avail],
        ].map(([k, v], idx, arr) => (
          <div
            key={k}
            className={`flex justify-between py-[5px] text-[13.5px] ${
              idx < arr.length - 1 ? "border-b border-dashed border-border" : ""
            }`}
          >
            <span className="text-muted-foreground">{k}</span>
            <span className="font-semibold">{v}</span>
          </div>
        ))}
      </div>
    </>
  );
}

type Fly = { cand: number; dir: 1 | -1; fromX: number } | null;

export function CandidateDeck() {
  // `order` is a rotation of candidate indices; order[0] is the top card.
  const [order, setOrder] = useState<number[]>(() => CANDIDATES.map((_, k) => k));
  const [fly, setFly] = useState<Fly>(null);

  const topRef = useRef<HTMLDivElement | null>(null);
  const flyRef = useRef<HTMLDivElement | null>(null);
  const drag = useRef({ active: false, startX: 0, dx: 0, id: -1 });
  const busy = useRef(false);
  const paused = useRef(false);
  const advanceRef = useRef<(dir: 1 | -1, fromX?: number) => void>(() => {});

  // dir 1 = next (top exits left, stack rises); dir -1 = prev (previous slides in from left).
  function advance(dir: 1 | -1, fromX = 0) {
    if (busy.current) return;
    busy.current = true;
    paused.current = true;

    if (dir === 1) {
      setFly({ cand: order[0], dir, fromX });
      setOrder((p) => [...p.slice(1), p[0]]);
    } else {
      // Snap the current top back to center; the incoming previous card covers it.
      const el = topRef.current;
      if (el) {
        el.style.transition = `transform .18s ${EASE}`;
        el.style.transform = slotTransform(0);
      }
      setFly({ cand: order[order.length - 1], dir, fromX: 0 });
      setOrder((p) => [p[p.length - 1], ...p.slice(0, -1)]);
    }

    window.setTimeout(() => {
      setFly(null);
      busy.current = false;
      paused.current = false;
    }, FLY_MS);
  }
  advanceRef.current = advance;

  // Auto-advance every 5s while idle.
  useEffect(() => {
    const t = window.setInterval(() => {
      if (!busy.current && !paused.current) advanceRef.current(1);
    }, 5000);
    return () => window.clearInterval(t);
  }, []);

  // Animate the fly overlay once it mounts (ref write, no re-render).
  useEffect(() => {
    if (!fly) return;
    const el = flyRef.current;
    if (!el) return;
    if (fly.dir === 1) {
      el.style.transition = "none";
      el.style.transform = `translateX(${fly.fromX}px) rotate(${fly.fromX * 0.05}deg)`;
      requestAnimationFrame(() => {
        el.style.transition = `transform ${FLY_MS}ms ${EASE}`;
        el.style.transform = "translateX(-560px) rotate(-18deg)";
      });
    } else {
      el.style.transition = "none";
      el.style.transform = "translateX(-560px) rotate(-16deg)";
      requestAnimationFrame(() => {
        el.style.transition = `transform ${FLY_MS}ms ${EASE}`;
        el.style.transform = "translateX(0) rotate(0deg)";
      });
    }
  }, [fly]);

  function onDown(e: React.PointerEvent) {
    if (busy.current) return;
    drag.current = { active: true, startX: e.clientX, dx: 0, id: e.pointerId };
    paused.current = true;
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
    const el = topRef.current;
    if (el) el.style.transition = "none";
  }
  function onMove(e: React.PointerEvent) {
    const d = drag.current;
    if (!d.active) return;
    d.dx = e.clientX - d.startX;
    const el = topRef.current;
    if (el) el.style.transform = `translateX(${d.dx}px) rotate(${d.dx * 0.05}deg)`;
  }
  function onUp(e: React.PointerEvent) {
    const d = drag.current;
    if (!d.active) return;
    d.active = false;
    (e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId);
    const dx = d.dx;
    if (dx <= -THRESHOLD) {
      advance(1, dx);
    } else if (dx >= THRESHOLD) {
      advance(-1);
    } else {
      const el = topRef.current;
      if (el) {
        el.style.transition = `transform .3s ${EASE}`;
        el.style.transform = slotTransform(0);
      }
      paused.current = false;
    }
  }

  const visible = order.slice(0, 3);

  return (
    <div
      className="relative flex flex-col items-center"
      onMouseEnter={() => {
        paused.current = true;
      }}
      onMouseLeave={() => {
        if (!drag.current.active && !busy.current) paused.current = false;
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute top-2 h-[440px] w-[400px] rounded-[46%_54%_55%_45%/48%_44%_56%_52%] blur-lg"
        style={{
          background:
            "radial-gradient(circle at 55% 40%, oklch(0.72 0.15 55 / 0.22), transparent 70%)",
        }}
      />
      <div className="relative h-[436px] w-[322px]">
        {visible.map((cand, slot) => {
          const isTop = slot === 0;
          return (
            <div
              key={cand}
              ref={isTop ? topRef : undefined}
              onPointerDown={isTop && !fly ? onDown : undefined}
              onPointerMove={isTop && !fly ? onMove : undefined}
              onPointerUp={isTop && !fly ? onUp : undefined}
              onPointerCancel={isTop && !fly ? onUp : undefined}
              className={`absolute inset-0 select-none overflow-hidden rounded-3xl border border-border bg-card shadow-xl ${
                isTop && !fly ? "cursor-grab touch-pan-y active:cursor-grabbing" : ""
              }`}
              style={{
                transform: slotTransform(slot),
                zIndex: 30 - slot,
                transition: `transform ${FLY_MS}ms ${EASE}`,
                willChange: "transform",
              }}
            >
              <CardFace c={CANDIDATES[cand]} />
            </div>
          );
        })}

        {/* Fly overlay: the outgoing (next) or incoming (prev) card. */}
        {fly && (
          <div
            ref={flyRef}
            className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl border border-border bg-card shadow-xl"
            style={{ zIndex: 50, willChange: "transform" }}
          >
            <CardFace c={CANDIDATES[fly.cand]} />
          </div>
        )}
      </div>

      <div className="relative z-10 mt-6 flex items-center gap-4">
        <button
          type="button"
          onClick={() => advance(-1)}
          aria-label="Previous candidate"
          className="grid h-11 w-11 place-items-center rounded-full border border-border bg-card text-muted-foreground shadow-sm transition hover:text-primary"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="flex gap-1.5">
          {CANDIDATES.map((_, k) => (
            <span
              key={k}
              className="h-1.5 rounded-full transition-all"
              style={{
                width: k === order[0] ? 22 : 6,
                background: k === order[0] ? "var(--color-primary)" : "var(--color-border)",
              }}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => advance(1)}
          aria-label="Next candidate"
          className="grid h-11 w-11 place-items-center rounded-full border border-border bg-card text-muted-foreground shadow-sm transition hover:text-primary"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">Sample profiles · swipe to browse</p>
    </div>
  );
}
