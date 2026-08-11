# Dossier des photos — Ciseaux d'Or

Ce dossier contient les images du site — toutes sont désormais de **vraies
photos du salon**. Pour en remplacer une, gardez le même nom de fichier.

## Images du site

| Fichier         | Où elle apparaît                              |
| --------------- | --------------------------------------------- |
| `salon1.png`    | Accueil (grande photo hero)                   |
| `accueil.png`   | Section « Le salon » (photo principale)       |
| `salon2.png`    | Section « Le salon » (bande espace)           |
| `coupe-1.png`   | Galerie « Nos réalisations »                  |
| `coupe-2.png`   | Galerie « Nos réalisations » + bandeau CTA    |
| `coupe-3.png`   | Galerie « Nos réalisations »                  |
| `facade.png`    | Section « Contact » (façade / localisation)   |

## Conseils

- Gardez le **même nom de fichier** : aucune modification du code n'est alors
  nécessaire.
- Préférez le format **`.jpg`** (ou `.webp`) et des images **optimisées**
  (moins de 500 Ko idéalement) pour un site rapide.
- Si vous souhaitez ajouter plus de photos dans la galerie, dupliquez un bloc
  `<figure class="gallery__item">…</figure>` dans `index.html` et pointez vers
  votre nouveau fichier.

## Régénérer les images temporaires

Un script est fourni pour recréer les placeholders si besoin :

```bash
python3 scripts/generate_placeholders.py
```
