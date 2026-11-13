import { lazy, Suspense } from "react"
import ErrorBoundary from "./ErrorBoundary"

// "Keycap Button" d'Originkit : bouton 3D lumineux. Si le chargement échoue, on affiche un bouton normal.
const Keycap = lazy(() => import("./originkit/KeycapButton"))

const FONT = { fontFamily: '"Segoe UI", system-ui, sans-serif', fontSize: 17, fontWeight: 700, letterSpacing: 0.3 }

export default function KeyButton({ label, link }) {
  const simple = <a className="btn btn-primary" href={link}>{label}</a>
  return (
    <ErrorBoundary fallback={simple}>
      <Suspense fallback={simple}>
        <span className="keycap">
          <Keycap
            label={label}
            link={link}
            newTab={false}
            font={FONT}
            padding="16px 32px"
            rounded={40}
            colors={{ fill: "#1d1710", textColor: "#e9b866", hoverTextColor: "#f6d9a6" }}
            prism={{ color: "#d9892a", float: 8, intensity: 35, thickness: 15, hoverFloat: 7 }}
            camera={{ tilt: 42, rotate: -12 }}
          />
        </span>
      </Suspense>
    </ErrorBoundary>
  )
}