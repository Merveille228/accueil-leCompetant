import { Check } from "lucide-react"
import Section from "./Section"
import Photo from "./Photo"
import { useInView } from "../hooks"
import { about } from "../data/content"
import { images } from "../data/images"

export default function About() {
  const [lead, ...rest] = about.paragraphes
  const [mediaRef, seen] = useInView("-60px 0px")

  return (
    <Section id="about" title="A propos">
      <div className="about">
        <div className="about-texte">
          <p className="lead">{lead}</p>
          {rest.map((p) => <p key={p}>{p}</p>)}
          <ul className="coches">
            {about.points.map((p) => (
              <li key={p}><Check size={20} aria-hidden="true" />{p}</li>
            ))}
          </ul>
        </div>

        <div ref={mediaRef} className={`about-media${seen ? " is-in" : ""}`}>
          <span className="about-frame" aria-hidden="true" />
          <span className="about-ring" aria-hidden="true" />
          <Photo src={images.about} alt={about.imageAlt} label="Photo de l'équipe à ajouter" className="about-photo" />
        </div>
      </div>
    </Section>
  )
}
