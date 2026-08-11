# Ciseaux d'Or Strasbourg — Homme

Site vitrine moderne, élégant et responsive pour le salon de coiffure et
barbier **pour homme** **Ciseaux d'Or Strasbourg — Homme**. Réalisé en
**HTML, CSS et JavaScript** purs, sans framework, et prêt à être publié sur
**GitHub Pages**.

**Coordonnées du salon**

- **Adresse** : 1 Rue d'Ingwiller, 67000 Strasbourg
- **Téléphone** : 03 88 22 56 40
- **Horaires** : du mardi au samedi, 9h00 – 19h00 (fermé lundi et dimanche)

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

L'adresse, le téléphone, les horaires et la carte du salon sont désormais
**renseignés**. Il reste seulement quelques éléments optionnels à compléter,
clairement identifiables dans `index.html` :

| À remplacer            | Comment le trouver dans `index.html`      |
| ---------------------- | ----------------------------------------- |
| Lien de réservation    | `#RESERVATION-A-REMPLACER`                 |
| Lien Instagram         | `#INSTAGRAM-A-REMPLACER`                   |
| Tarifs des prestations | `class="amount"` (« 00 € »)               |

> 💡 Astuce : dans votre éditeur, faites une recherche sur `TODO` ou sur
> `A-REMPLACER` pour repérer les éléments restants à modifier.

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
