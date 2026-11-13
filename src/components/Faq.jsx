import { useState } from "react"
import { Plus } from "lucide-react"
import Section from "./Section"
import { faq } from "../data/content"

export default function Faq() {
  const [open, setOpen] = useState(0)
  const aside = (
    <div className="faq-aside">
      <p>Une autre question sur votre terrain ou votre dossier ?</p>
      <a className="btn btn-ghost" href="#contact">Nous contacter</a>
    </div>
  )
  return (
    <Section id="faq" title="Questions fréquentes" layout="split" aside={aside}>
      <div className="faq">
        {faq.map((f, i) => {
          const isOpen = open === i
          return (
            <div className={`faq-item${isOpen ? " is-open" : ""}`} key={f.q}>
              <h3>
                <button id={`faq-b-${i}`} aria-expanded={isOpen} aria-controls={`faq-${i}`} onClick={() => setOpen(isOpen ? null : i)}>
                  <span>{f.q}</span>
                  <Plus className="faq-icon" size={22} aria-hidden="true" />
                </button>
              </h3>
              <div id={`faq-${i}`} role="region" aria-labelledby={`faq-b-${i}`} className="faq-a">
                <div><p>{f.a}</p></div>
              </div>
            </div>
          )
        })}
      </div>
    </Section>
  )
}
