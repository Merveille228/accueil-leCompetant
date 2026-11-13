import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"
import { nav } from "../data/content"
import ThemeToggle from "./ThemeToggle"

export default function Header() {
  const [open, setOpen] = useState(false)
  const [solid, setSolid] = useState(false)

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    const onKey = (e) => e.key === "Escape" && setOpen(false)
    window.addEventListener("keydown", onKey)
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <header className={`header${solid || open ? " is-solid" : ""}${open ? " menu-open" : ""}`}>
      <a className="logo" href="#accueil">
        <small>CABINET</small>
        <strong>LE COMPETENT</strong>
      </a>

      <nav className="nav" aria-label="Navigation principale">
        <ul>
          {nav.map((n) => (
            <li key={n.href}><a href={n.href}>{n.label}</a></li>
          ))}
        </ul>
      </nav>

      <div className="header-actions">
        <ThemeToggle />
        <a className="btn btn-primary btn-sm nav-cta" href="#contact">Contactez-nous</a>
        <button
          className="icon-btn burger"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          aria-controls="menu-mobile"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div className={`overlay${open ? " is-open" : ""}`} onClick={close} />
      <nav id="menu-mobile" className={`mnav${open ? " is-open" : ""}`} aria-label="Menu mobile" inert={!open}>
        <ul>
          {nav.map((n) => (
            <li key={n.href}><a href={n.href} onClick={close}>{n.label}</a></li>
          ))}
          <li><a className="btn btn-primary" href="#contact" onClick={close}>Contactez-nous</a></li>
        </ul>
      </nav>
    </header>
  )
}
