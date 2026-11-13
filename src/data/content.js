// Tous les textes du site sont ici (repris de ton HTML d'origine).
export const site = {
  nom: "Cabinet LE COMPETENT",
  tel: "+22892307825",
  telAffiche: "+228 92 30 78 25",
  whatsapp: "https://wa.me/22892307825",
  email: "contact@cabinetlecompetent.tg", // À VÉRIFIER : adresse réelle ?
  adresse: "01 Adewui, Lomé, TOGO",
  horaires: ["Lun - Ven : 8h00 - 17h00", "Samedi : 9h00 - 13h00"],
}

export const nav = [
  { href: "#accueil", label: "Accueil" },
  { href: "#about", label: "A propos" },
  { href: "#services", label: "Nos services" },
  { href: "#avantages", label: "Avantages" },
  { href: "#projets", label: "Projets" },
  { href: "#faq", label: "FAQ" },
]

export const hero = {
  kicker: "Expertise foncière & Topographie",
  promesse: ["Sécurisez votre terrain,", "Construisez l'avenir"],
  description:
    "Cabinet LE COMPETENT accompagne particuliers et entreprises pour l'obtention du titre foncier, levées topographiques, lotissement et le suivi juridique et technique des travaux",
  imageAlt: "Travaux de topographie sur le terrain",
}

export const about = {
  paragraphes: [
    'Le cabinet "Le compétent" a été créé pour une gestion optimale de votre chantier, de l\'acquisition du terrain jusqu\'à la finition de l\'immeuble.',
    "Nous constituons un groupe de professionnels formés spécifiquement pour garantir votre satisfaction.",
    "Notre professionnalisme, notre fiabilité de service et notre rapidité nous ont permis de bâtir notre réputation d'excellence.",
    "Nous allions expertise technique et conseil juridique pour protéger vos droits et sécuriser vos investissements.",
  ],
  points: [
    "Professionnalisme et transparence",
    "Accompagnement juridique et technique",
    "Intervention rapide sur le terrain",
    "Suivi personnalisé de votre projet",
  ],
  imageAlt: "Équipe du Cabinet Le Compétent sur le terrain",
}

export const services = [
  { icon: "foncier", titre: "Expertise foncière", texte: "Évaluation, cadastre, et sécurisation des droits de propriétés" },
  { icon: "topo", titre: "Topographie", texte: "Levés topographiques précis, plans et cartographie professionnelle" },
  { icon: "archi", titre: "Architecture", texte: "Conception des plans et suivi technique des constructions" },
  { icon: "lotissement", titre: "Lotissement", texte: "Division réglementée des terrains et mise en conformité" },
]

export const avantages = [
  { icon: "droit", titre: "Faire valoir son droit de propriété", texte: "Protégez votre investissement et vos droits de manière légale et définitive" },
  { icon: "litige", titre: "Éviter les litiges fonciers", texte: "Un titre clair réduit considérablement les risques de conflits" },
  { icon: "transaction", titre: "Sécuriser vos transactions", texte: "Facilitez la vente, l'achat ou la transmission de votre bien immobilier" },
]

export const projets = [
  { alt: "Projet de lotissement réalisé" },
  { alt: "Levée topographique en cours" },
  { alt: "Bornage de terrain finalisé" },
]

// À FAIRE CONFIRMER par le cabinet (délais, paiement, zone d'intervention)
export const faq = [
  { q: "Combien de temps faut-il pour obtenir un titre foncier ?", a: "Le délai varie entre 6 et 12 mois selon la complexité du dossier. Nous vous accompagnons à chaque étape pour accélérer le processus." },
  { q: "Quels documents sont nécessaires pour une expertise foncière ?", a: "Documents requis : pièce d'identité, attestation villageoise, plan de localisation, et tout document prouvant la propriété du terrain." },
  { q: "Proposez-vous des plans de paiement ?", a: "Oui, nous offrons des facilités de paiement adaptées à votre budget. Contactez-nous pour discuter des options disponibles." },
  { q: "Intervenez-vous sur tout le territoire togolais ?", a: "Oui, nous intervenons dans toutes les régions du Togo. Notre équipe se déplace pour tous types de projets." },
]
