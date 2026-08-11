# Ciseaux d'Or — Salon de coiffure à Strasbourg

Site vitrine moderne, élégant et responsive pour le salon de coiffure et
barbier **Ciseaux d'Or** (Strasbourg). Réalisé en **HTML, CSS et JavaScript**
purs, sans framework, et prêt à être publié sur **GitHub Pages**.

## ✨ Fonctionnalités

- Design premium, sobre et moderne (noir / or / crème)
- 100 % responsive (ordinateur, tablette, mobile)
- Menu mobile, animations au défilement, galerie avec agrandissement (lightbox)
- Bouton **« Prendre rendez-vous »** visible à plusieurs endroits
- Bouton **Instagram**
- Sections : Accueil, Le salon, Prestations, Galerie, Horaires, Contact

## 📁 Structure du projet

```
ciseaux-d-or/
├── index.html          ← Page principale (à la racine, pour GitHub Pages)
├── css/
│   └── style.css       ← Styles du site
├── js/
│   └── main.js         ← Interactions (menu, galerie, animations)
├── images/             ← VOS PHOTOS (voir images/README.md)
│   ├── hero.jpg
│   ├── salon.jpg
│   └── galerie-1.jpg … galerie-6.jpg
├── scripts/
│   └── generate_placeholders.py   ← Génère les images temporaires
├── .nojekyll           ← Assure une publication propre sur GitHub Pages
└── README.md
```

## 🖼️ Remplacer les images

Les images fournies sont **temporaires**. Pour utiliser vos propres photos,
remplacez les fichiers du dossier `images/` **en gardant les mêmes noms**.
Voir le guide détaillé : [`images/README.md`](images/README.md).

## ✏️ Informations à personnaliser

Les textes ci-dessous sont **temporaires** et clairement identifiables dans le
code (`index.html`). Recherchez les marqueurs pour les remplacer facilement :

| À remplacer                     | Comment le trouver dans `index.html`          |
| ------------------------------- | --------------------------------------------- |
| Lien de réservation             | `#RESERVATION-A-REMPLACER`                     |
| Lien Instagram                  | `#INSTAGRAM-A-REMPLACER`                       |
| Adresse                         | Section `#contact` → « Adresse »               |
| Téléphone                       | Section `#contact` → « Téléphone »             |
| Email                           | Section `#contact` → « Email »                 |
| Horaires                        | Section `#horaires` (bloc `hours__list`)       |
| Tarifs des prestations          | `class="amount"` (« 00 € »)                    |
| Carte Google Maps               | Section `#contact` (bloc `contact__map`)       |

> 💡 Astuce : dans votre éditeur, faites une recherche sur `TODO` ou sur
> `A-REMPLACER` pour repérer tous les éléments à modifier.

### Ajouter la carte Google Maps

1. Ouvrez [Google Maps](https://www.google.com/maps) et recherchez votre salon.
2. Cliquez sur **Partager** → **Intégrer une carte** → **Copier le HTML**.
3. Dans `index.html`, remplacez le bloc `contact__map-placeholder` par le code
   `<iframe>` copié.

## 🚀 Publier sur GitHub Pages

1. Poussez ce projet sur un dépôt GitHub.
2. Dans le dépôt, ouvrez **Settings → Pages**.
3. Sous **Build and deployment**, choisissez :
   - **Source** : `Deploy from a branch`
   - **Branch** : votre branche (ex. `main`) et le dossier `/ (root)`
4. Enregistrez. Votre site sera disponible à l'adresse :
   `https://<votre-utilisateur>.github.io/<nom-du-depot>/`

Comme `index.html` est à la racine, aucune configuration supplémentaire n'est
nécessaire.

## 🔧 Tester en local

Ouvrez simplement `index.html` dans votre navigateur, ou lancez un petit
serveur local :

```bash
python3 -m http.server 8000
# puis ouvrez http://localhost:8000
```

---

Site prêt à l'emploi — pensez à remplacer les informations et les photos
temporaires par les vôtres. Bonne mise en ligne ! ✂️
