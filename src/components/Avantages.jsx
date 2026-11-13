import { lazy, Suspense } from "react"
import { House, Scale, ShieldCheck } from "lucide-react"
import ErrorBoundary from "./ErrorBoundary"
import { useReducedMotion } from "../hooks"
import Section from "./Section"
import { avantages } from "../data/content"

const ReactiveLines = lazy(() => import("./originkit/ReactiveLines"))

const icons = { droit: House, litige: Scale, transaction: ShieldCheck }

export default function Avantages() {
  const reduced = useReducedMotion()
  // Les lignes réagissent à la souris : sur écran tactile, le fond de courbes de niveau reste visible
  const fond = reduced ? null : (
    <ErrorBoundary fallback={null}>
      <Suspense fallback={null}>
        <ReactiveLines
          backgroundColor="#0e0b08"
          lineColor="rgba(255, 140, 0, 0.5)"
          lineWidth={1.4}
          minLines={8}
          maxLines={64}
          fade
          fadeIntensity={40}
        />
      </Suspense>
    </ErrorBoundary>
  )
  return (
    <Section id="avantages" title="Pourquoi avoir un titre foncier ?" tone="dark" layout="split" bg={fond}>
      <ul className="adv-liste">
        {avantages.map((a, i) => {
          const Icon = icons[a.icon]
          return (
            <li className="adv" key={a.titre} style={{ "--i": i }}>
              <span className="adv-icon"><Icon size={28} strokeWidth={1.6} aria-hidden="true" /></span>
              <div>
                <h3>{a.titre}</h3>
                <p>{a.texte}</p>
              </div>
            </li>
          )
        })}
      </ul>
    </Section>
  )
}
