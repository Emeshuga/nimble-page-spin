import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CANDIDATES, type Candidate } from "@/lib/candidates";

const OFFSETS = [
  { x: 0, y: 0, r: 0 },
  { x: 13, y: 11, r: 3.4 },
  { x: -11, y: 19, r: -4.2 },
];

const BADGE_BG: Record<Candidate["badgeType"], string> = {
  vip: "#ef8b3c",
  ready: "#2f9e6f",
  ny: "#1e3a6e",
};

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

export function CandidateDeck() {
  const [i, setI] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [flying, setFlying] = useState<0 | 1 | -1>(0);
  const [paused, setPaused] = useState(false);
  const startX = useRef(0);
  const n = CANDIDATES.length;

  function go(dir: 1 | -1) {
    setFlying(dir);
    window.setTimeout(() => {
      setI((prev) => (dir === -1 ? (prev + 1) % n : (prev - 1 + n) % n));
      setFlying(0);
      setDragX(0);
    }, 240);
  }

  useEffect(() => {
    if (paused || flying) return;
    const t = window.setInterval(() => go(-1), 5000);
    return () => window.clearInterval(t);
  }, [paused, flying, i]);

  function onDown(e: React.PointerEvent) {
    setDragging(true);
    setPaused(true);
    startX.current = e.clientX;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  }
  function onMove(e: React.PointerEvent) {
    if (!dragging) return;
    setDragX(e.clientX - startX.current);
  }
  function onUp() {
    if (!dragging) return;
    setDragging(false);
    if (dragX < -90) go(-1);
    else if (dragX > 90) go(1);
    else setDragX(0);
  }

  return (
    <div className="relative flex flex-col items-center">
      <div
        aria-hidden
        className="pointer-events-none absolute top-2 h-[440px] w-[400px] rounded-[46%_54%_55%_45%/48%_44%_56%_52%] blur-lg"
        style={{
          background:
            "radial-gradient(circle at 55% 40%, oklch(0.72 0.15 55 / 0.22), transparent 70%)",
        }}
      />
      <div className="relative h-[436px] w-[322px]">
        {[2, 1, 0].map((d) => {
          const c = CANDIDATES[(i + d) % n];
          const off = OFFSETS[d];
          const isTop = d === 0;
          const transform = isTop
            ? flying
              ? `translateX(${flying * 480}px) rotate(${flying * 20}deg)`
              : `translateX(${dragX}px) rotate(${dragX * 0.05}deg)`
            : `translate(${off.x}px, ${off.y}px) rotate(${off.r}deg)`;
          return (
            <div
              key={d}
              onPointerDown={isTop ? onDown : undefined}
              onPointerMove={isTop ? onMove : undefined}
              onPointerUp={isTop ? onUp : undefined}
              className={`absolute inset-0 overflow-hidden rounded-3xl border border-border bg-card shadow-xl ${
                isTop ? "cursor-grab touch-pan-y active:cursor-grabbing" : ""
              }`}
              style={{
                transform,
                zIndex: 10 - d,
                transition: dragging && isTop ? "none" : "transform 0.3s ease",
              }}
            >
              <CardFace c={c} />
            </div>
          );
        })}
      </div>

      <div className="relative z-10 mt-6 flex items-center gap-4">
        <button
          type="button"
          onClick={() => go(1)}
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
                width: k === i ? 22 : 6,
                background: k === i ? "var(--color-primary)" : "var(--color-border)",
              }}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => go(-1)}
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
