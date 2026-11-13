// Tes photos sont dans /public/assets. Écris simplement leur nom de fichier ici.
// Les espaces, accents et apostrophes sont gérés automatiquement.
const url = (p) => {
  if (!p) return ""
  if (/^(https?:)?\/\//.test(p) || p.startsWith("data:")) return p
  return encodeURI("/" + p.replace(/^\/?(public\/)?/, ""))
}

export const images = {
  hero: url("assets/WhatsApp Image 2025-10-18 à 13.46.29_6a23e3f2.jpg"),
  about: url("assets/img1.jpg"),
  projets: [
    url("assets/Images d'immeubles en construction et d'immeubles chic déjà construit_20251029_145554_0000.jpg"),
    url("assets/Images d'immeubles en construction et d'immeubles chic déjà construit_20251029_145554_0001.jpg"),
    url("assets/Images d'immeubles en construction et d'immeubles chic déjà construit_20251029_145554_0002.jpg"),
  ],
}
