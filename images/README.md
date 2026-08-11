# Dossier des photos — Ciseaux d'Or

Ce dossier contient les images du site. Les photos de la galerie sont de
**vraies photos du salon** ; `hero.jpg` et `salon.jpg` restent des
**images temporaires** (placeholder) que vous pouvez remplacer en gardant le
même nom de fichier.

## Images du site

| Fichier         | Où elle apparaît             | Format conseillé         | Statut       |
| --------------- | ---------------------------- | ------------------------ | ------------ |
| `hero.jpg`      | Grande image d'accueil       | Paysage — 1920 × 1080 px | Temporaire   |
| `salon.jpg`     | Section « Le salon »         | Portrait — 900 × 1100 px | Temporaire   |
| `coupe-1.png`   | Galerie « Nos réalisations » | Portrait — env. 4:5      | Photo réelle |
| `coupe-2.png`   | Galerie « Nos réalisations » | Portrait — env. 4:5      | Photo réelle |
| `coupe-3.png`   | Galerie « Nos réalisations » | Portrait — env. 4:5      | Photo réelle |

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
