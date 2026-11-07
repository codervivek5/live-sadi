import { useId } from "react";

export type ArtVariant = "pheras" | "haldi" | "mehndi" | "sangeet" | "reception";

/** Rotated petals around a centre, used for marigolds and the mehndi mandala. */
function Petals({
  cx,
  cy,
  count,
  rx,
  ry,
  offset,
  ...paint
}: {
  cx: number;
  cy: number;
  count: number;
  rx: number;
  ry: number;
  offset: number;
} & React.SVGProps<SVGEllipseElement>) {
  return (
    <g>
      {Array.from({ length: count }, (_, i) => (
        <ellipse key={i} cx={cx} cy={cy - offset} rx={rx} ry={ry} transform={`rotate(${(360 / count) * i} ${cx} ${cy})`} {...paint} />
      ))}
    </g>
  );
}

function Marigold({ cx, cy, r, tone = 0 }: { cx: number; cy: number; r: number; tone?: number }) {
  const fills = ["#f59e0b", "#ffb21e", "#f97316"];
  return (
    <g>
      <Petals cx={cx} cy={cy} count={12} rx={r * 0.26} ry={r * 0.5} offset={r * 0.5} fill={fills[tone % 3]} opacity={0.95} />
      <Petals cx={cx} cy={cy} count={8} rx={r * 0.2} ry={r * 0.36} offset={r * 0.3} fill="#ffd166" />
      <circle cx={cx} cy={cy} r={r * 0.16} fill="#8a4b08" />
    </g>
  );
}

function Pheras({ id }: { id: string }) {
  const beads = (n: number) => Array.from({ length: n }, (_, j) => 132 + j * 9);
  return (
    <>
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1c060e" />
          <stop offset="0.55" stopColor="#701f3a" />
          <stop offset="1" stopColor="#d98a3a" />
        </linearGradient>
        <radialGradient id={`${id}-glow`} cx="0.5" cy="0.78" r="0.5">
          <stop offset="0" stopColor="#ffd37a" stopOpacity="0.85" />
          <stop offset="1" stopColor="#ffd37a" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-gold`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e9c97c" />
          <stop offset="1" stopColor="#a8772a" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill={`url(#${id}-sky)`} />
      <rect width="400" height="300" fill={`url(#${id}-glow)`} />
      {[[50, 50], [340, 40], [90, 110], [310, 100], [200, 28], [20, 160], [380, 150]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="1.7" fill="#ffe7a8" opacity="0.8" />
      ))}
      <path d="M108 122 L200 72 L292 122 Z" fill={`url(#${id}-gold)`} />
      {Array.from({ length: 9 }, (_, i) => (
        <circle key={i} cx={120 + i * 20} cy={122} r="10" fill="#d9b04e" />
      ))}
      <circle cx="200" cy="66" r="5" fill="#ffe08a" />
      {[124, 164, 230, 270].map((x, i) => (
        <rect key={x} x={x} y="128" width={i === 0 || i === 3 ? 9 : 6} height="122" fill="#cf9f42" opacity={i === 0 || i === 3 ? 1 : 0.7} />
      ))}
      <rect x="98" y="250" width="204" height="14" rx="3" fill="#7d4f1a" />
      {[138, 176, 224, 262].map((x, i) => {
        const b = beads(5 + (i % 2) * 2);
        const lastY = b[b.length - 1];
        return (
          <g key={x}>
            <line x1={x} y1="130" x2={x} y2={lastY} stroke="#7a4a10" strokeWidth="0.8" />
            {b.map((y) => (
              <circle key={y} cx={x} cy={y} r="3.8" fill={y % 2 ? "#f5a623" : "#ff8a00"} />
            ))}
          </g>
        );
      })}
      <g fill="#14050b">
        <circle cx="168" cy="204" r="9" />
        <rect x="155" y="214" width="26" height="38" rx="11" />
        <circle cx="232" cy="208" r="8.5" />
        <rect x="220" y="217" width="25" height="35" rx="11" />
      </g>
      <path d="M223 202 q9 -12 18 0 l5 36 h-28 z" fill="#b0132f" opacity="0.9" />
      <rect x="184" y="240" width="32" height="10" rx="2" fill="#4a1018" stroke="#d9b04e" />
      <path d="M200 218 C190 230 192 240 200 240 C208 240 210 230 200 218 Z" fill="#ff9d2e" />
      <path d="M200 228 C196 234 197 240 200 240 C203 240 204 234 200 228 Z" fill="#ffe39b" />
    </>
  );
}

function Haldi({ id }: { id: string }) {
  const flowers: [number, number, number, number][] = [
    [50, 50, 34, 0], [120, 28, 26, 1], [350, 48, 36, 2], [290, 24, 24, 0], [30, 150, 28, 1],
    [372, 156, 30, 0], [70, 250, 36, 2], [345, 255, 32, 1], [200, 20, 20, 2], [160, 70, 18, 0],
  ];
  return (
    <>
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffe08a" />
          <stop offset="1" stopColor="#f2a93b" />
        </linearGradient>
        <radialGradient id={`${id}-brass`} cx="0.4" cy="0.35" r="0.8">
          <stop offset="0" stopColor="#f3d98a" />
          <stop offset="1" stopColor="#9a6b1c" />
        </radialGradient>
      </defs>
      <rect width="400" height="300" fill={`url(#${id}-bg)`} />
      {flowers.map(([x, y, r, t], i) => (
        <Marigold key={i} cx={x} cy={y} r={r} tone={t} />
      ))}
      <ellipse cx="200" cy="270" rx="120" ry="14" fill="#8a5a10" opacity="0.18" />
      <circle cx="200" cy="170" r="84" fill={`url(#${id}-brass)`} />
      <circle cx="200" cy="170" r="68" fill="none" stroke="#fff3c4" strokeWidth="2" opacity="0.6" />
      <ellipse cx="200" cy="162" rx="46" ry="26" fill="#f6b400" />
      <ellipse cx="190" cy="154" rx="22" ry="11" fill="#ffd54a" />
      {[[150, 190], [250, 188], [200, 218]].map(([x, y], i) => (
        <Marigold key={i} cx={x} cy={y} r={14} tone={i} />
      ))}
      {Array.from({ length: 16 }, (_, i) => (
        <circle key={i} cx={60 + ((i * 53) % 290)} cy={110 + ((i * 37) % 150)} r="2.4" fill="#fff3c4" opacity="0.8" />
      ))}
    </>
  );
}

function Mehndi({ id }: { id: string }) {
  const henna = "#7a3b1e";
  return (
    <>
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fdeceb" />
          <stop offset="1" stopColor="#e8a6a6" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill={`url(#${id}-bg)`} />
      {[[40, 40], [360, 40], [40, 260], [360, 260]].map(([x, y], i) => (
        <g key={i} opacity="0.7">
          <Petals cx={x} cy={y} count={10} rx={6} ry={16} offset={20} fill="none" stroke={henna} strokeWidth="1.4" />
          <circle cx={x} cy={y} r="6" fill={henna} />
        </g>
      ))}
      <g>
        <circle cx="200" cy="150" r="118" fill="none" stroke={henna} strokeWidth="1.2" strokeDasharray="2 6" strokeLinecap="round" />
        <Petals cx={200} cy={150} count={24} rx={7} ry={20} offset={96} fill="none" stroke={henna} strokeWidth="1.6" />
        <circle cx="200" cy="150" r="84" fill="none" stroke={henna} strokeWidth="1.4" />
        <Petals cx={200} cy={150} count={16} rx={9} ry={24} offset={62} fill="none" stroke={henna} strokeWidth="1.8" />
        <circle cx="200" cy="150" r="46" fill="none" stroke={henna} strokeWidth="1.4" strokeDasharray="1 5" strokeLinecap="round" />
        <Petals cx={200} cy={150} count={8} rx={10} ry={22} offset={26} fill={henna} opacity="0.85" />
        <circle cx="200" cy="150" r="10" fill="#fdeceb" stroke={henna} strokeWidth="2" />
        <circle cx="200" cy="150" r="4" fill={henna} />
      </g>
    </>
  );
}

function Sangeet({ id }: { id: string }) {
  return (
    <>
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#170722" />
          <stop offset="1" stopColor="#701f3a" />
        </linearGradient>
        <linearGradient id={`${id}-beam`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.5" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill={`url(#${id}-bg)`} />
      {[[70, 0, 20, 300, 140], [200, 0, 130, 300, 270], [330, 0, 260, 300, 400]].map(([x, , x1, y2, x2], i) => (
        <polygon key={i} points={`${x - 6},0 ${x + 6},0 ${x2},${y2} ${x1},${y2}`} fill={`url(#${id}-beam)`} opacity={0.35 - i * 0.05} />
      ))}
      <line x1="200" y1="0" x2="200" y2="40" stroke="#d4af75" strokeWidth="1.5" />
      <circle cx="200" cy="64" r="26" fill="#d9d2e6" />
      {[-16, -6, 6, 16].map((o) => (
        <line key={o} x1={200 + o} y1="40" x2={200 + o * 0.7} y2="88" stroke="#8d819c" strokeWidth="0.8" />
      ))}
      {[52, 64, 76].map((y) => (
        <ellipse key={y} cx="200" cy={y} rx="26" ry="5" fill="none" stroke="#8d819c" strokeWidth="0.8" />
      ))}
      <ellipse cx="200" cy="262" rx="170" ry="26" fill="#d4af75" opacity="0.22" />
      <ellipse cx="200" cy="262" rx="120" ry="16" fill="#d4af75" opacity="0.3" />
      <g fill="#fffdf8" fontSize="30" fontFamily="serif" opacity="0.85">
        <text x="60" y="150">♪</text>
        <text x="318" y="120">♫</text>
        <text x="110" y="214" fontSize="22">♫</text>
        <text x="280" y="214" fontSize="22">♪</text>
      </g>
      {[[40, 60], [350, 80], [120, 40], [300, 30], [250, 140], [150, 130], [380, 200], [20, 220]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2.2" fill={i % 2 ? "#e8a6a6" : "#d4af75"} />
      ))}
    </>
  );
}

function Reception({ id }: { id: string }) {
  const gold = "#c9a064";
  return (
    <>
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff9ee" />
          <stop offset="1" stopColor="#efd7b6" />
        </linearGradient>
        <radialGradient id={`${id}-glow`} cx="0.5" cy="0.3" r="0.5">
          <stop offset="0" stopColor="#fff2c8" stopOpacity="0.95" />
          <stop offset="1" stopColor="#fff2c8" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="300" fill={`url(#${id}-bg)`} />
      <rect width="400" height="300" fill={`url(#${id}-glow)`} />
      {[60, 200, 340].map((x) => (
        <g key={x} fill="none" stroke={gold} strokeWidth="2">
          <path d={`M${x - 52} 300 V140 a52 52 0 0 1 104 0 V300`} />
          <path d={`M${x - 40} 300 V142 a40 40 0 0 1 80 0 V300`} opacity="0.5" />
        </g>
      ))}
      <path d="M0 40 Q100 78 200 40 T400 40" fill="none" stroke={gold} strokeWidth="1" />
      {Array.from({ length: 17 }, (_, i) => {
        const x = i * 25;
        const y = 40 + Math.sin((i / 16) * Math.PI * 2) * 20 + 6;
        return <circle key={i} cx={x} cy={y} r="3" fill="#ffd978" />;
      })}
      <line x1="200" y1="40" x2="200" y2="92" stroke={gold} strokeWidth="1.5" />
      {[[22, 108], [40, 130], [60, 156]].map(([w, y], i) => (
        <g key={i}>
          <path d={`M${200 - w} ${y} h${w * 2} l-8 14 h-${w * 2 - 16} z`} fill={gold} />
          {Array.from({ length: 4 + i * 2 }, (_, j) => (
            <circle key={j} cx={200 - w + 8 + (j * (w * 2 - 16)) / (3 + i * 2)} cy={y + 20} r="2.6" fill="#ffe9a8" />
          ))}
        </g>
      ))}
      <circle cx="200" cy="92" r="6" fill="#ffd978" />
      <rect x="0" y="262" width="400" height="38" fill="#e3c79d" opacity="0.55" />
    </>
  );
}

/** Original illustrated covers for each celebration. Swap for photography by passing a real `src` to the card instead. */
export function WeddingArt({ variant, className }: { variant: ArtVariant; className?: string }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden focusable="false">
      {variant === "pheras" && <Pheras id={id} />}
      {variant === "haldi" && <Haldi id={id} />}
      {variant === "mehndi" && <Mehndi id={id} />}
      {variant === "sangeet" && <Sangeet id={id} />}
      {variant === "reception" && <Reception id={id} />}
    </svg>
  );
}
