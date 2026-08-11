# Dossier des photos — Ciseaux d'Or

Ce dossier contient les images du site. La plupart sont de **vraies photos du
salon** ; seul `hero.jpg` reste une **image temporaire** (placeholder) que vous
pouvez remplacer en gardant le même nom de fichier.

## Images du site

| Fichier         | Où elle apparaît                    | Statut       |
| --------------- | ----------------------------------- | ------------ |
| `hero.jpg`      | Grande image d'accueil              | Temporaire   |
| `accueil.png`   | Section « Le salon » (photo principale) | Photo réelle |
| `salon1.png`    | Section « Le salon » (ambiance)     | Photo réelle |
| `salon2.png`    | Section « Le salon » (ambiance)     | Photo réelle |
| `facade.png`    | Section « Contact » (façade / localisation) | Photo réelle |
| `coupe-1.png`   | Galerie « Nos réalisations »        | Photo réelle |
| `coupe-2.png`   | Galerie « Nos réalisations »        | Photo réelle |
| `coupe-3.png`   | Galerie « Nos réalisations »        | Photo réelle |

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
