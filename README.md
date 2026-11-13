# Cabinet Le Compétent - version React (JSX)

## 1. Installer
```bash
npm install
```

## 2. Coller les 3 composants Originkit
Remplace le contenu de ces 3 fichiers (garde les noms et l'extension .tsx) :
- `src/components/originkit/LightCables.tsx`
- `src/components/originkit/SmokyText.tsx`
- `src/components/originkit/CrumpleCardCarousel.tsx`

Puis, **seulement pour Crumple**, lance :
```bash
npm run patch:crumple
```
(il retire les imports Framer, branche `three` depuis npm et laisse la page défiler au doigt sur mobile)

## 3. Photos
Tes photos restent dans `public/assets/` (le zip n'y touche pas). Les noms sont à écrire dans `src/data/images.js` (espaces, accents et apostrophes sont gérés).

## 3 bis. Ajouter / changer des photos
Mets-les dans `public/assets/` puis écris leurs chemins dans `src/data/images.js`
(ex. `hero: "/assets/hero.jpg"`). Compresse-les avant (WebP ou JPG léger) et évite les espaces/accents dans les noms.

## 4. Modifier les textes
Tout est dans `src/data/content.js`.

## 5. Lancer
```bash
npm run dev      # développement
npm run build    # version à publier (dossier dist)
```

## À vérifier avant de publier
- l'adresse e-mail dans `content.js`
- les délais, facilités de paiement et zone d'intervention de la FAQ
- le formulaire ne marche que sur Netlify (en local, il affichera un message d'échec)
- `og:image` dans `index.html` (URL absolue)
