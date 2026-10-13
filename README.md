# 🎬 Cinéma & Météo App — Single Page Application (Vue.js 3)

[![Vue.js](https://img.shields.io/badge/Vue.js-3.5-4FC08D?style=for-the-badge&logo=vuedotjs&logoColor=white)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Vue Router](https://img.shields.io/badge/Vue_Router-5.x-4FC08D?style=for-the-badge)](https://router.vuejs.org/)
[![Pinia](https://img.shields.io/badge/Pinia-4.x-FFD859?style=for-the-badge)](https://pinia.vuejs.org/)
[![Axios](https://img.shields.io/badge/Axios-1.x-5A29E4?style=for-the-badge&logo=axios&logoColor=white)](https://axios-http.com/)

Application web monopage (**Single Page Application - SPA**) moderne conçue avec **Vue.js 3** (Options API) et **Vite**.  
Le projet combine un **catalogue cinématographique complet** connecté à une API REST sécurisée par JWT et un **module météo en direct** exploitant des données distantes et du formatage temporel relatif.

---

## 📑 Sommaire

1. [Fonctionnalités Principales](#-fonctionnalités-principales)
2. [Architecture & Bonnes Pratiques](#-architecture--bonnes-pratiques)
3. [Arborescence du Projet](#-arborescence-du-projet)
4. [Installation & Démarrage](#-installation--démarrage)
5. [Scripts NPM Disponibles](#-scripts-npm-disponibles)

---

## 🚀 Fonctionnalités Principales

### 🎬 Module Cinéma (Catalogue & Fiches Détaillées)
* **Catalogue Paginé** : Affichage d'une grille de films dynamique (20 éléments/page) avec composant de pagination dédié (`Pagination.vue`).
* **Recherche & Filtrage en Temps Réel** :
  * Recherche textuelle par titre avec **débouncing (350 ms)** pour limiter les appels réseau inutiles.
  * Filtre dynamique par genre cinématographique (chargé via l'API).
* **Fiche Détaillée d'un Film** : Vue dédiée (`/movies/:id`) affichant l'affiche, l'année, les genres, les réalisateurs, la distribution complète, le synopsis et les avis spectateurs.
* **Mise en Cache & Confort de Navigation** :
  * Mise en cache de la vue catalogue via `<keep-alive include="MovieList">`.
  * **Restauration de la position de défilement** (*scroll restoration*) lors du retour d'une fiche détaillée vers le catalogue.

### 🔒 Authentification & Sécurité (JWT & Pinia)
* **Connexion Utilisateur** : Authentification auprès de l'API avec stockage sécurisé du token JWT dans `localStorage`.
* **Gestion d'État Centralisée (Pinia)** : Store global réactif (`useAuthStore`) pour piloter l'état de connexion (`isAuthenticated`, `currentUser`).
* **Protection des Routes (*Navigation Guards*)** :
  * Les routes protégées (`meta: { requiresAuth: true }`, ex: `/profile`) redirigent vers `/login` avec conservation de l'URL cible en paramètre `redirect`.
  * Les routes invités (`meta: { requiresGuest: true }`, ex: `/login`) redirigent les utilisateurs déjà connectés vers leur profil.
* **Déconnexion Réactive Découplée** : Pattern Observateur interceptant automatiquement les erreurs HTTP 401 pour purger le store et réinitialiser l'interface en temps réel.

### 🌦️ Module Météo
* **Données en Direct** : Consommation de l'API OpenWeatherMap pour une liste de villes régionales.
* **Formatage Temporel Relatif** : Utilisation de la bibliothèque `timeago.js` dans le composant `City.vue` (*« Mis à jour il y a 5 minutes »*).
* **Gestion Robuste des États UI** : Prise en charge explicite des états de **chargement**, d'**erreur avec bouton "Réessayer"**, et de **liste vide**.

---

## 🏛️ Architecture & Bonnes Pratiques

* **Single File Components (SFC)** : Encapsulation stricte du template, de la logique et des styles scopés (`<style scoped>`) pour chaque composant.
* **Séparation des Responsabilités (SRP)** :
  * **Vues / Conteneurs (`src/views/`)** : Composants liés aux routes, orchestrent la récupération des données et la logique métier (`MovieList.vue`, `CitiesList.vue`, `Login.vue`).
  * **Composants Présentationnels (`src/components/`)** : Composants réutilisables et autonomes pilotés par `props` et événements `$emit` (`Movie.vue`, `City.vue`, `Pagination.vue`).
* **Couche de Service Découplée (`src/services/api.js`)** : Instance Axios centralisée gérant la base URL, les en-têtes JSON, l'injection automatique du header `Authorization: Bearer <token>`, et la capture globale des erreurs.
* **Assets & Conventions Vite** :
  * Utilisation de l'alias `@/` pour cibler le dossier `src/`.
  * Assets graphiques compilés situés dans `src/assets/icons/`.
  * Fichiers statiques servis directement depuis `public/`.

---

## 📂 Arborescence du Projet

```text
JS_Vue/
├── vue_js/
│   ├── public/                      # Assets statiques non compilés (favicon.ico)
│   ├── scripts/
│   │   └── compress.mjs             # Script de compression d'images natif Node.js
│   ├── src/
│   │   ├── assets/
│   │   │   └── icons/               # Icônes vectorielles SVG du projet
│   │   ├── components/              # Composants réutilisables (Dumb Components)
│   │   │   ├── City.vue             # Vignette d'une ville météo
│   │   │   ├── Movie.vue            # Vignette d'un film
│   │   │   └── Pagination.vue       # Barre de navigation de pagination
│   │   ├── router/
│   │   │   └── index.js             # Configuration Vue Router & Navigation Guards
│   │   ├── services/
│   │   │   └── api.js               # Client HTTP Axios centralisé & endpoints REST
│   │   ├── stores/
│   │   │   └── auth.js              # Store Pinia d'authentification utilisateur
│   │   ├── views/                   # Vues associées aux routes (Smart Components)
│   │   │   ├── CitiesList.vue       # Écran liste des villes météo
│   │   │   ├── Login.vue            # Écran de connexion JWT
│   │   │   ├── MovieDetail.vue      # Écran fiche détaillée d'un film
│   │   │   ├── MovieList.vue        # Écran catalogue principal des films
│   │   │   └── Profile.vue          # Écran profil utilisateur sécurisé
│   │   ├── App.vue                  # Composant racine & barre de navigation globale
│   │   └── main.js                  # Point d'entrée de l'application Vue 3
│   ├── index.html                   # Document HTML hôte
│   ├── package.json                 # Dépendances et scripts de build
│   └── vite.config.js               # Configuration du bundler Vite
├── .gitignore                       # Règles d'exclusion Git
└── README.md                        # Présentation générale du projet
```

---

## 🛠️ Installation & Démarrage

### Prérequis
* **Node.js** : version `22.x LTS` ou supérieure recommandée
* **NPM** : version `10.x` ou supérieure

### 1. Cloner le projet
```bash
git clone <URL_DU_DEPOT>
cd JS_Vue/vue_js
```

### 2. Installer les dépendances
```bash
npm install
```

### 3. Configurer les variables d'environnement
Créez un fichier `.env` à la racine de `vue_js/` en vous basant sur l'exemple fourni :
```bash
cp .env.example .env
```
Contenu par défaut :
```env
VITE_API_URL=http://localhost:8000/api
```

### 4. Démarrer le serveur de développement
```bash
npm run dev
```
L'application est accessible localement à l'adresse : **`http://localhost:5173`**

---

## ⚡ Scripts NPM Disponibles

| Commande | Action |
| :--- | :--- |
| `npm run dev` | Démarre le serveur local de développement avec rechargement à chaud (HMR). |
| `npm run build` | Compile et minifie l'application pour le déploiement en production (`dist/`). |
| `npm run preview` | Prévisualise localement le livrable généré dans le dossier `dist/`. |
| `npm run compress` | Compresse les assets graphiques (SVG, PNG, ICO) via `zlib` (Gzip niveau 9). |


