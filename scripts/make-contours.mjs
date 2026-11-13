// Génère les courbes de niveau (motif "topographie") utilisées en fond des bandes sombres.
import { writeFileSync } from "node:fs"
const m = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2]
const r0 = (p) => p.map(Math.round).join(",")
function blob(cx, cy, r, seed) {
  const n = 72, pts = []
  for (let i = 0; i < n; i++) {
    const t = (i / n) * Math.PI * 2
    const k = 1 + 0.16 * Math.sin(3 * t + seed) + 0.09 * Math.sin(5 * t + seed * 1.7) + 0.05 * Math.sin(8 * t + seed * 2.3)
    pts.push([cx + Math.cos(t) * r * k * 1.5, cy + Math.sin(t) * r * k])
  }
  let d = "M" + r0(m(pts[n - 1], pts[0]))
  for (let i = 0; i < n; i++) d += "Q" + r0(pts[i]) + " " + r0(m(pts[i], pts[(i + 1) % n]))
  return d + "Z"
}
let paths = ""
for (const [cx, cy, s] of [[280, 260, 0.4], [1280, 620, 2.1], [820, 900, 4.3]])
  for (let r = 30; r < 430; r += 38) paths += `<path d="${blob(cx, cy, r, s + r * 0.004)}"/>`
writeFileSync("src/assets/contours.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice"><g fill="none" stroke="#ff8c00" stroke-opacity=".26" stroke-width="1.2">${paths}</g></svg>`)
