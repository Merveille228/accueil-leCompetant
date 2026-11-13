import { lazy, Suspense } from "react"
import Section from "./Section"
import Photo from "./Photo"
import ErrorBoundary from "./ErrorBoundary"
import { useInViewLive, useMedia } from "../hooks"
import { projets } from "../data/content"
import { images } from "../data/images"

// three.js n'est téléchargé que lorsque la galerie approche de l'écran
const CrumpleCardCarousel = lazy(() => import("./originkit/CrumpleCardCarousel"))

// Carte provisoire tant qu'il n'y a pas de vraie photo (jamais de photo d'un autre site)
const provisoire = (n) =>
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="700"><rect width="900" height="700" fill="#262626"/><rect x="24" y="24" width="852" height="652" fill="none" stroke="#ff8c00" stroke-width="4" stroke-dasharray="14 10"/><text x="450" y="360" fill="#ff8c00" font-family="Arial, sans-serif" font-size="44" text-anchor="middle">Projet ${n} - photo à ajouter</text></svg>`
  )

const cartes = projets.map((p, i) => ({
  image: { src: images.projets[i] || provisoire(i + 1), alt: p.alt },
  imageY: 0,
}))

function GrilleSecours() {
  return (
    <div className="projets-grille">
      {projets.map((p, i) => <Photo key={p.alt} src={images.projets[i]} alt={p.alt} label={`Projet ${i + 1} - photo à ajouter`} />)}
    </div>
  )
}

export default function Projets() {
  // La galerie n'existe que lorsqu'elle est proche de l'écran : pas de calcul inutile ailleurs
  const [ref, seen] = useInViewLive("250px 0px")
  const small = useMedia("(max-width: 600px)")
  const mid = useMedia("(max-width: 1000px)")

  return (
    <Section id="projets" title="Projets & Réalisations" bleed>
      <div ref={ref} className="projets-stage" role="region" aria-label="Galerie de projets">
        {seen && (
          <ErrorBoundary fallback={<GrilleSecours />}>
            <Suspense fallback={null}>
              <CrumpleCardCarousel
                images={cartes}
                direction="horizontal"
                speed={15}
                hold={600}
                itemWidth={small ? 560 : mid ? 640 : 700}
                itemHeight={small ? 470 : mid ? 480 : 500}
                background="#0b0907"
                style={{ minWidth: 0, minHeight: 0 }}
                advanced={{ scrollSens: 0 }}
              />
            </Suspense>
          </ErrorBoundary>
        )}
      </div>
      <ul className="sr-only">
        {projets.map((p) => <li key={p.alt}>{p.alt}</li>)}
      </ul>
    </Section>
  )
}
