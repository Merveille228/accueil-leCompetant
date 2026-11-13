import { useId } from "react"

// Plan de terrain illustratif : chaque service met en valeur une couche différente du plan.
const P = "110,140 360,86 540,176 500,370 270,412 120,330"
const V = [[110, 140], [360, 86], [540, 176], [500, 370], [270, 412], [120, 330]]

const mid = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2]
const r0 = (p) => p.map(Math.round).join(",")
function blob(cx, cy, r, seed) {
  const n = 64, pts = []
  for (let i = 0; i < n; i++) {
    const t = (i / n) * Math.PI * 2
    const k = 1 + 0.15 * Math.sin(3 * t + seed) + 0.08 * Math.sin(5 * t + seed * 1.7)
    pts.push([cx + Math.cos(t) * r * k * 1.3, cy + Math.sin(t) * r * k])
  }
  let d = "M" + r0(mid(pts[n - 1], pts[0]))
  for (let i = 0; i < n; i++) d += "Q" + r0(pts[i]) + " " + r0(mid(pts[i], pts[(i + 1) % n]))
  return d + "Z"
}
const CONTOURS = Array.from({ length: 7 }, (_, i) => blob(430, 310, 46 + i * 42, 1.3 + i * 0.05))
const DOTS = []
for (let x = 92; x <= 560; x += 34) for (let y = 70; y <= 430; y += 34) DOTS.push([x, y])
const LINES_X = Array.from({ length: 17 }, (_, i) => i * 40)
const LINES_Y = Array.from({ length: 12 }, (_, i) => i * 40)

export default function ServicesPlan({ active, label }) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, "")
  const layer = (i) => `layer${active === i ? " on" : ""}`

  return (
    <svg className="plan-svg" viewBox="0 0 640 460" role="img" aria-label={label}>
      <defs>
        <clipPath id={`${id}p`}><polygon points={P} /></clipPath>
        <pattern id={`${id}h`} width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="9" className="pl-hatch" />
        </pattern>
      </defs>

      {/* fond : quadrillage, courbes de niveau, parcelle, nord, échelle */}
      <g className="pl-grid">
        {LINES_X.map((x) => <line key={`x${x}`} x1={x} y1="0" x2={x} y2="460" />)}
        {LINES_Y.map((y) => <line key={`y${y}`} x1="0" y1={y} x2="640" y2={y} />)}
      </g>
      <g className="pl-cont">{CONTOURS.map((d, i) => <path key={i} d={d} />)}</g>
      <polygon points={P} className="pl-base" />
      <g className="pl-nord">
        <path d="M596 30 L606 66 L596 58 L586 66 Z" />
        <text x="596" y="88" textAnchor="middle" className="pl-text">N</text>
      </g>
      <g className="pl-echelle">
        <path d="M40 436 H160 M40 430 V442 M100 432 V440 M160 430 V442" />
        <text x="40" y="424" className="pl-text">0</text>
        <text x="160" y="424" textAnchor="middle" className="pl-text">100 m</text>
      </g>

      {/* 0 : expertise foncière = limites et bornes */}
      <g className={layer(0)}>
        <polygon points={P} className="pl-fill" />
        <polygon points={P} pathLength="1" className="pl-or draw" />
        {V.map(([x, y], i) => (
          <g key={i}>
            <line x1={x - 14} y1={y} x2={x + 14} y2={y} className="pl-thin" />
            <line x1={x} y1={y - 14} x2={x} y2={y + 14} className="pl-thin" />
            <rect x={x - 6} y={y - 6} width="12" height="12" className="pl-borne" />
          </g>
        ))}
      </g>

      {/* 1 : topographie = station, rayons, points levés, cote */}
      <g className={layer(1)}>
        <g clipPath={`url(#${id}p)`}>{DOTS.map(([x, y]) => <circle key={`${x}-${y}`} cx={x} cy={y} r="2" className="pl-dot" />)}</g>
        <polygon points={P} className="pl-ink" />
        {V.map(([x, y], i) => <line key={i} x1="310" y1="250" x2={x} y2={y} className="pl-thin pl-dash" />)}
        {V.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="4.5" className="pl-pt" />)}
        <circle cx="310" cy="250" r="10" className="pl-station" />
        <path d="M296 250 H324 M310 236 V264" className="pl-thin" />
        <path d="M500 370 L506 396 M270 412 L276 438 M506 396 L276 438 M504.6 388.1 L507.4 403.9 M274.6 430.1 L277.4 445.9" className="pl-or2" />
      </g>

      {/* 2 : architecture = emprise du bâtiment, cloisons, accès */}
      <g className={layer(2)}>
        <polygon points={P} className="pl-ink pl-faint" />
        <polygon points="232,198 392,172 414,262 254,290" fill={`url(#${id}h)`} className="pl-bat" />
        <path d="M312 185 L334 276 M243 244 L403 217" className="pl-ink" />
        <path d="M322 276 L305 340 L290 406" className="pl-or2 pl-dash" />
        <path d="M290 406 m-9 -4 l9 10 l9 -10" className="pl-or2" />
      </g>

      {/* 3 : lotissement = voie et lots */}
      <g className={layer(3)}>
        <polygon points={P} className="pl-fill" />
        <g clipPath={`url(#${id}p)`}>
          <polygon points="90,236 560,268 560,298 90,266" className="pl-road" />
          <path d="M235 60 V252 M365 60 V262 M455 60 V268 M250 282 V440 M380 292 V440" className="pl-or2" />
        </g>
        <polygon points={P} pathLength="1" className="pl-or draw" />
      </g>
    </svg>
  )
}