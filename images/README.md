# Dossier des photos — Ciseaux d'Or

Ce dossier contient les images du site. Les fichiers actuels sont des
**images temporaires** (placeholder). Pour mettre vos propres photos, il vous
suffit de **remplacer chaque fichier en gardant exactement le même nom**.

## Liste des images à remplacer

| Fichier            | Où elle apparaît            | Format conseillé        |
| ------------------ | --------------------------- | ----------------------- |
| `hero.jpg`         | Grande image d'accueil      | Paysage — 1920 × 1080 px |
| `salon.jpg`        | Section « Le salon »        | Portrait — 900 × 1100 px |
| `galerie-1.jpg`    | Galerie (grande, verticale) | Portrait — 800 × 1100 px |
| `galerie-2.jpg`    | Galerie                     | Carré — 800 × 800 px     |
| `galerie-3.jpg`    | Galerie                     | Carré — 800 × 800 px     |
| `galerie-4.jpg`    | Galerie (large, horizontale)| Paysage — 1200 × 800 px  |
| `galerie-5.jpg`    | Galerie                     | Carré — 800 × 800 px     |
| `galerie-6.jpg`    | Galerie                     | Carré — 800 × 800 px     |

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
