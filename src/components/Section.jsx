import { useInView } from "../hooks"

// tone : "" (fond de page) | "alt" (fond teinté) | "dark" (bande sombre)
// layout : "stack" (titre au-dessus) | "split" (titre à gauche, contenu à droite)
// bleed : le contenu occupe toute la largeur de l'écran
export default function Section({ id, title, children, tone = "", layout = "stack", bleed = false, aside = null, bg = null }) {
  const [ref, seen] = useInView("-40px 0px")
  const head = <h2 id={`${id}-titre`} className="sec-title">{title}</h2>
  const body = <div ref={ref} className={`reveal${seen ? " is-in" : ""}`}>{children}</div>

  return (
    <section id={id} className={`band${tone ? ` tone-${tone}` : ""}`} aria-labelledby={`${id}-titre`}>
      {bg && <div className="band-bg" aria-hidden="true">{bg}</div>}
      {layout === "split" ? (
        <div className="wrap split">
          <div className="split-head">{head}{aside}</div>
          {body}
        </div>
      ) : bleed ? (
        <>
          <div className="wrap">{head}</div>
          {body}
        </>
      ) : (
        <div className="wrap">{head}{body}</div>
      )}
    </section>
  )
}
