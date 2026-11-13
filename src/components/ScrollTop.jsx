import { useEffect, useState } from "react"
import { ArrowUp } from "lucide-react"

export default function ScrollTop() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])
  const up = () => {
    const calme = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    window.scrollTo({ top: 0, behavior: calme ? "auto" : "smooth" })
  }
  return (
    <button className={`scroll-top${show ? " is-on" : ""}`} aria-label="Retour en haut" tabIndex={show ? 0 : -1} onClick={up}>
      <ArrowUp size={22} aria-hidden="true" />
    </button>
  )
}
