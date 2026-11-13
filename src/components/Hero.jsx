import { lazy, Suspense } from "react"
import SmokyText from "./originkit/SmokyText"
import NeonBorder from "./originkit/NeonBorder"
import ErrorBoundary from "./ErrorBoundary"
import KeyButton from "./KeyButton"
import Photo from "./Photo"
import { useInViewLive, useMedia, useReducedMotion, useTheme } from "../hooks"
import { hero } from "../data/content"
import { images } from "../data/images"

// Chargé seulement sur grand écran : le téléphone ne télécharge même pas ce code
const LightCables = lazy(() => import("./originkit/LightCables"))

// Réglages d'origine du preset Originkit (count baissé de 48 à 40 pour alléger)
const BUNDLE = { bend: 0, count: 40, spread: 89, widthEnd: 300, thickness: 220, widthStart: 0 }

export default function Hero() {
  const reduced = useReducedMotion()
  const theme = useTheme()
  const [heroRef, heroVisible] = useInViewLive("0px", true)
  const wide = useMedia("(min-width: 900px)")
  const small = useMedia("(max-width: 600px)")
  const mid = useMedia("(max-width: 1100px)")

  const font = {
    fontFamily: 'Georgia, "Times New Roman", serif',
    fontWeight: 700,
    fontSize: small ? 32 : mid ? 44 : 58,
    lineHeight: 1.2,
    textAlign: "left",
  }

  return (
    <section id="accueil" className="hero" ref={heroRef}>
      {wide && !reduced && heroVisible && (
        <>
          <div className="hero-bg" aria-hidden="true">
            <ErrorBoundary fallback={null}>
              <Suspense fallback={null}>
                <LightCables style={{ position: "absolute", inset: 0, minWidth: 0, minHeight: 0 }} bundle={BUNDLE} />
              </Suspense>
            </ErrorBoundary>
          </div>
          <div className="hero-veil" aria-hidden="true" />
        </>
      )}

      <div className="hero-inner">
        <div className="hero-texte">
          <p className="hero-kicker">{hero.kicker}</p>

          <h1 className="hero-title" aria-label={hero.promesse.join(" ")}>
            {reduced ? (
              hero.promesse.map((l) => <span key={l} style={{ display: "block" }}>{l}</span>)
            ) : (
              <span aria-hidden="true" style={{ display: "block" }}>
                <SmokyText key={theme} text={hero.promesse.join("\n")} font={font} color={theme === "dark" ? "#ffffff" : "#1b1712"} intensity={small ? 5 : 10} />
              </span>
            )}
          </h1>

          <p className="hero-desc">{hero.description}</p>

          <div className="hero-boutons">
            <KeyButton label="Contactez-nous" link="#contact" />
            <a className="btn btn-ghost" href="#services">Nos services</a>
          </div>
        </div>

        <div className="hero-photo-wrap">
          <Photo src={images.hero} alt={hero.imageAlt} label="Photo du terrain à ajouter" className="hero-photo" eager />
          {!reduced && heroVisible && (
            <div className="neon-layer" aria-hidden="true">
              <NeonBorder color="#ff8c00" rounded={10} thickness={3} borderSize={38} glow={70} movement="continuous" speed={8} />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}