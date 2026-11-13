import { useState } from "react"
import { Moon, Sun } from "lucide-react"

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || "light")
  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark"
    document.documentElement.dataset.theme = next
    try { localStorage.setItem("theme", next) } catch { /* ignoré */ }
    setTheme(next)
  }
  return (
    <button className="icon-btn" onClick={toggle} aria-label={theme === "dark" ? "Activer le mode clair" : "Activer le mode sombre"}>
      {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  )
}
