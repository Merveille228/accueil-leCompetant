// Adapte le code Framer de "Crumple Card Carousel" pour un projet React/Vite normal.
// Usage : npm run patch:crumple (après avoir collé le vrai code dans le fichier)
import { existsSync, readFileSync, writeFileSync } from "node:fs"

const file = "src/components/originkit/CrumpleCardCarousel.tsx"
if (!existsSync(file)) {
  console.error("Fichier introuvable : " + file)
  process.exit(1)
}

let s = readFileSync(file, "utf8")
const faits = []
const remplacer = (nom, motif, par) => {
  const present = typeof motif === "string" ? s.includes(motif) : motif.test(s)
  if (present) {
    s = s.replace(motif, par)
    faits.push(nom)
  }
}

remplacer("import \"framer\" retiré", /import \{[^}]*\} from "framer"\r?\n/, "")
remplacer("three depuis npm", 'from "https://esm.sh/three@0.185.1"', 'from "three"')
remplacer("RenderTarget retiré", /const target = RenderTarget\.current\(\)\s*\n\s*const isStatic = [^\n]*\n/, "const isStatic = false\n")
remplacer("défilement vertical de la page autorisé au doigt", 'touchAction: "none"', 'touchAction: "pan-y"')

const i = s.indexOf("addPropertyControls(CrumpleCardCarousel")
if (i !== -1) {
  s = s.slice(0, i).trimEnd() + "\n"
  faits.push("panneau de contrôles Framer retiré")
}

if (!faits.length) {
  console.log("Rien à corriger (déjà adapté, ou fichier provisoire).")
} else {
  writeFileSync(file, s)
  console.log("Corrections appliquées :\n- " + faits.join("\n- "))
}

const reste = s.match(/RenderTarget|ControlType|addPropertyControls|from "framer"|esm\.sh/g)
if (reste) console.warn("Attention, il reste des références Framer :", [...new Set(reste)].join(", "))
