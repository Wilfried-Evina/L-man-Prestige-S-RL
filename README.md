# 🏠 Léman Prestige S.R.L - Site Web Immobilier de Luxe

[![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black)](https://vercel.com/)

Site web professionnel pour **Léman Prestige S.R.L**, agence immobilière spécialisée dans la location et relocation d'appartements de luxe dans la région lémanique (Genève, Suisse).

## 🌟 Fonctionnalités Principales

### 🏢 Gestion des Propriétés
- **Mini-admin complet** : Interface d'administration sécurisée pour gérer les annonces
- **Upload d'images multiples** : Galerie photos avec slider et lightbox
- **CRUD complet** : Création, lecture, mise à jour et suppression des propriétés
- **Base de données MongoDB** : Stockage cloud avec Atlas

### 🌍 Site Multilingue
- **3 langues supportées** : Français, Anglais, Espagnol
- **Internationalisation (i18n)** : Gestion centralisée des traductions avec `next-intl`
- **SEO optimisé** : URLs localisées et métadonnées adaptées

### 🛠️ Services Immobiliers
- **Relocation** : Service complet de recherche d'appartements
- **Travaux** : Gestion de projets de rénovation
- **Nettoyage** : Services de nettoyage professionnel
- **Déménagement** : Organisation de déménagements
- **Administratif** : Gestion administrative
- **Assurances** : Solutions d'assurance immobilière
- **Sous-location** : Gestion de sous-locations

### 📱 Interface Utilisateur
- **Design responsive** : Optimisé pour desktop, tablette et mobile
- **UI/UX moderne** : Interface élégante avec Tailwind CSS
- **Composants réutilisables** : Architecture modulaire avec composants Atom/Molecule/Organism
- **Animations fluides** : Transitions et effets visuels raffinés

### 🔐 Sécurité & Authentification
- **Authentification admin** : Système sécurisé avec tokens HTTPOnly
- **Auto-déconnexion** : Inactivité automatique après 15 minutes
- **Protection des routes** : Middleware de sécurité
- **Upload sécurisé** : Gestion sécurisée des fichiers

### 📊 Contact & Conversion
- **Formulaires de contact** : Modal de contact intégré
- **Système de devis** : Génération automatique de demandes
- **Informations de contact** : Téléphone et email intégrés
- **Call-to-action optimisés** : Boutons stratégiques sur toutes les pages

## 🛠️ Technologies Utilisées

### Frontend
- **Next.js 16.1.1** : Framework React avec App Router
- **TypeScript** : Typage statique pour la robustesse
- **Tailwind CSS** : Framework CSS utilitaire
- **CSS Modules** : Styles scoped pour les composants

### Backend & Base de Données
- **API Routes Next.js** : Endpoints RESTful
- **MongoDB Atlas** : Base de données cloud
- **Mongoose** : ODM pour MongoDB

### Internationalisation & SEO
- **next-intl** : Gestion de l'internationalisation
- **Metadata API** : Optimisation SEO automatique

### Outils de Développement
- **ESLint** : Linting du code
- **Prettier** : Formatage automatique
- **Git** : Gestion de version
- **VS Code** : Environnement de développement

## 🚀 Installation & Configuration

### Prérequis
- Node.js 18+
- npm ou yarn
- Compte MongoDB Atlas
- Variables d'environnement

### Installation

1. **Cloner le repository**
   ```bash
   git clone https://github.com/Wilfried-Evina/L-man-Prestige-S-RL.git
   cd L-man-Prestige-S-RL
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Configuration des variables d'environnement**
   Créer un fichier `.env.local` :
   ```env
   MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/dbname
   ADMIN_EMAIL=admin@lemanprestige.com
   ADMIN_PASSWORD=password
   NEXTAUTH_SECRET=your-secret
   ```

4. **Lancer le serveur de développement**
   ```bash
   npm run dev
   # ou
   yarn dev
   ```

5. **Accéder à l'application**
   Ouvrir [http://localhost:3000](http://localhost:3000)

## 📁 Structure du Projet

```
├── app/                    # App Router Next.js
│   ├── [locale]/          # Routes internationalisées
│   ├── api/               # API Routes
│   └── globals.css        # Styles globaux
├── components/            # Composants React
│   ├── atoms/            # Composants de base
│   ├── molecules/        # Composants composites
│   └── organisms/        # Composants complexes
├── data/                  # Données statiques
├── hooks/                 # Hooks personnalisés
├── i18n/                  # Configuration i18n
├── messages/              # Fichiers de traduction
└── public/                # Assets statiques
```

## 🔧 Scripts Disponibles

- `npm run dev` : Lancer le serveur de développement
- `npm run build` : Build de production
- `npm run start` : Lancer le serveur de production
- `npm run lint` : Vérification ESLint

## 🌐 Déploiement

Le projet est configuré pour un déploiement facile sur **Vercel** :

1. Connecter votre repository GitHub à Vercel
2. Configurer les variables d'environnement
3. Déployer automatiquement

## 📞 Contact

**Léman Prestige S.R.L**
- 📍 Genève, Suisse
- 📞 +41 76 523 24 31
- ✉️ info@lemanprestige.com
- 🌐 [lemanprestige.com](https://lemanprestige.com)

## 📝 Licence

Ce projet est privé et propriété de Léman Prestige S.R.L.

---

*Développé avec ❤️ pour l'excellence immobilière dans la région lémanique*
