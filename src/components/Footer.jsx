import { Mail, MapPin, Phone } from "lucide-react"
import { site } from "../data/content"

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-content">
          <div>
            <p className="footer-logo"><small>CABINET</small><strong>LE COMPETENT</strong></p>
            <p>Votre partenaire de confiance pour l'expertise foncière et la topographie au Togo.</p>
          </div>
          <div>
            <h4>Liens rapides</h4>
            <ul>
              <li><a href="#about">À propos</a></li>
              <li><a href="#services">Nos services</a></li>
              <li><a href="#projets">Projets</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <p className="ligne"><Phone size={18} aria-hidden="true" /><a href={`tel:${site.tel}`}>{site.telAffiche}</a></p>
            <p className="ligne"><MapPin size={18} aria-hidden="true" />{site.adresse}</p>
            <p className="ligne"><Mail size={18} aria-hidden="true" /><a href={`mailto:${site.email}`}>{site.email}</a></p>
          </div>
        </div>
        <p className="footer-bas">&copy; {new Date().getFullYear()} {site.nom}. Tous droits réservés.</p>
      </div>
    </footer>
  )
}
