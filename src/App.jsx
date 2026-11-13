import Header from "./components/Header"
import Hero from "./components/Hero"
import About from "./components/About"
import Services from "./components/Services"
import Avantages from "./components/Avantages"
import Projets from "./components/Projets"
import Faq from "./components/Faq"
import Contact from "./components/Contact"
import Footer from "./components/Footer"
import ScrollTop from "./components/ScrollTop"

export default function App() {
  return (
    <>
      <a className="skip" href="#contenu">Aller au contenu</a>
      <Header />
      <main id="contenu">
        <Hero />
        <About />
        <Services />
        <Avantages />
        <Projets />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <ScrollTop />
    </>
  )
}
