import { useEffect, useRef, useState } from "react"

export function useMedia(query) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const update = () => setMatches(mq.matches)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [query])
  return matches
}

export const useReducedMotion = () => useMedia("(prefers-reduced-motion: reduce)")

// Devient true (et le reste) dès que l'élément approche de l'écran
export function useInView(rootMargin = "0px") {
  const ref = useRef(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || seen) return
    if (!("IntersectionObserver" in window)) {
      setSeen(true)
      return
    }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setSeen(true)
        io.disconnect()
      }
    }, { rootMargin })
    io.observe(el)
    return () => io.disconnect()
  }, [rootMargin, seen])
  return [ref, seen]
}

// Vrai tant que l'élément est (presque) à l'écran, faux sinon : sert à couper les effets WebGL hors écran
export function useInViewLive(rootMargin = "0px", initial = false) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(initial)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!("IntersectionObserver" in window)) {
      setVisible(true)
      return
    }
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin })
    io.observe(el)
    return () => io.disconnect()
  }, [rootMargin])
  return [ref, visible]
}

// "light" ou "dark" : suit le bouton de thème en direct
export function useTheme() {
  const read = () => (document.documentElement.dataset.theme === "dark" ? "dark" : "light")
  const [theme, setTheme] = useState(read)
  useEffect(() => {
    const mo = new MutationObserver(() => setTheme(read()))
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] })
    return () => mo.disconnect()
  }, [])
  return theme
}