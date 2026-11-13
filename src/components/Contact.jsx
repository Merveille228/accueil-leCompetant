import { useState } from "react"
import { Clock, MapPin, Phone } from "lucide-react"
import Section from "./Section"
import KeyButton from "./KeyButton"
import { site } from "../data/content"

export default function Contact() {
  const [status, setStatus] = useState("idle") // idle | sending | ok | error

  async function onSubmit(e) {
    e.preventDefault()
    const form = e.currentTarget
    setStatus("sending")
    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(new FormData(form)).toString(),
      })
      if (!res.ok) throw new Error(String(res.status))
      form.reset()
      setStatus("ok")
    } catch {
      setStatus("error")
    }
  }

  return (
    <Section id="contact" title="Contact" tone="alt">
      <div className="contact">
        <div className="contact-infos">
          <p className="contact-accroche">Prêt à sécuriser votre terrain ?</p>
          <p className="contact-sous">Contactez-nous via le formulaire ou directement par téléphone / WhatsApp</p>

          <a className="contact-tel" href={`tel:${site.tel}`}>{site.telAffiche}</a>
          <div className="contact-boutons">
            <KeyButton label="Appeler" link={`tel:${site.tel}`} />
            <a className="btn btn-ghost" href={site.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp</a>
          </div>

          <ul className="contact-liste">
            <li><MapPin size={20} aria-hidden="true" /><span><strong>Adresse</strong><br />{site.adresse}</span></li>
            <li><Clock size={20} aria-hidden="true" /><span><strong>Horaires</strong><br />{site.horaires[0]}<br />{site.horaires[1]}</span></li>
          </ul>
        </div>

        <form name="contact" method="POST" onSubmit={onSubmit} className="form">
          <input type="hidden" name="form-name" value="contact" />
          <p className="hp" aria-hidden="true">
            <label>Ne pas remplir <input name="bot-field" tabIndex={-1} autoComplete="off" /></label>
          </p>

          <div className="field">
            <label htmlFor="f-nom">Nom complet</label>
            <input id="f-nom" type="text" name="nom" autoComplete="name" required />
          </div>
          <div className="field">
            <label htmlFor="f-tel">Téléphone</label>
            <input id="f-tel" type="tel" name="telephone" autoComplete="tel" required />
          </div>
          <div className="field">
            <label htmlFor="f-mail">Email <span>(optionnel)</span></label>
            <input id="f-mail" type="email" name="email" autoComplete="email" />
          </div>
          <div className="field">
            <label htmlFor="f-msg">Votre message</label>
            <textarea id="f-msg" name="message" rows={5} required />
          </div>

          <button className="btn btn-primary" type="submit" disabled={status === "sending"}>
            {status === "sending" ? "Envoi en cours..." : "Envoyer"}
          </button>

          <p className={`form-status ${status}`} role="status">
            {status === "ok" && "Message envoyé. Nous vous répondons rapidement."}
            {status === "error" && "L'envoi a échoué. Appelez-nous ou écrivez-nous sur WhatsApp."}
          </p>
        </form>
      </div>
    </Section>
  )
}
