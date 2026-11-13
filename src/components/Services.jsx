import { useState } from "react"
import { ArrowUpRight, Building2, LayoutGrid, Ruler, ScrollText } from "lucide-react"
import Section from "./Section"
import ServicesPlan from "./ServicesPlan"
import { services } from "../data/content"

const icons = { foncier: ScrollText, topo: Ruler, archi: Building2, lotissement: LayoutGrid }

export default function Services() {
  const [active, setActive] = useState(0)

  return (
    <Section id="services" title="Nos services" tone="alt">
      <div className="plan-wrap">
        <figure className="plan-figure">
          <ServicesPlan active={active} label={`Plan de terrain illustrant le service : ${services[active].titre}`} />
          <figcaption>Plan illustratif</figcaption>
        </figure>

        <ul className="plan-liste">
          {services.map((s, i) => {
            const Icon = icons[s.icon]
            const on = i === active
            return (
              <li key={s.titre} className={`plan-item${on ? " is-active" : ""}`} onMouseEnter={() => setActive(i)}>
                <h3>
                  <button type="button" className="plan-btn" aria-pressed={on} onClick={() => setActive(i)} onFocus={() => setActive(i)}>
                    <Icon size={20} strokeWidth={1.6} aria-hidden="true" />
                    <span>{s.titre}</span>
                  </button>
                </h3>
                <div className="plan-desc">
                  <div>
                    <p>{s.texte}</p>
                    <a className="plan-lien" href="#contact" tabIndex={on ? 0 : -1}>
                      Nous contacter <ArrowUpRight size={16} aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </Section>
  )
}