# Sprint 1 - Léman Prestige S.R.L

## 📅 Période : 12 - 18 Janvier 2026

## 🎯 Objectifs du Sprint
Configuration de base du projet et développement des composants fondamentaux du Design System.

## 📋 Tâches

### Tâche 1 : Configuration Multilingue (i18n)
**Échéance : 13 Janvier**
- [x] Installer la bibliothèque next-intl (Effectué)
- [ ] Configurer le middleware.ts pour la détection automatique de la langue
- [ ] Créer la structure src/messages/ avec les fichiers fr.json, en.json, es.json
- [ ] Créer une page de test affichant "Bienvenue" dans les 3 langues

**Issue GitHub** : [#19](https://github.com/tontonWilfried/L-man-Prestige-S-RL/issues/19)

---

### Tâche 2 : Architecture du Design System (CSS Variables)
**Échéance : 13 Janvier**
- [ ] Importer les polices Google Fonts : Inter (Textes) et Outfit (Titres)
- [ ] Configurer les variables :root dans globals.css
- [ ] Définir les couleurs : Léman Blue (#0A2A43), Gold Accent (#C5A059), Soft White (#F8F9FA)
- [ ] Configurer les paliers de responsive (Mobile, Tablette, Desktop)

**Issue GitHub** : [#20](https://github.com/tontonWilfried/L-man-Prestige-S-RL/issues/20)

---

### Tâche 3 : Atomes - Boutons Premium
**Échéance : 14 Janvier**
- [ ] Créer le composant <Button /> avec variantes : primary, secondary, ghost
- [ ] Ajouter un effet de survol (hover) fluide (légère augmentation de taille + ombre)
- [ ] Gérer l'état "Chargement" (spinner) et "Désactivé"

**Issue GitHub** : [#21](https://github.com/tontonWilfried/L-man-Prestige-S-RL/issues/21)

---

### Tâche 4 : Atomes - Champs de Saisies (Inputs)
**Échéance : 14 Janvier**
- [ ] Créer le composant <Input /> (Texte, Email)
- [ ] Ajouter une bordure dorée (Gold) lors du focus
- [ ] Intégrer l'affichage du message d'erreur en rouge en dessous du champ

**Issue GitHub** : [#22](https://github.com/tontonWilfried/L-man-Prestige-S-RL/issues/22)

---

### Tâche 5 : Organisme - Header (Navigation Desktop)
**Échéance : 15 Janvier**
- [ ] Intégrer le logo SVG de l'entreprise
- [ ] Créer le menu de navigation avec effet Glassmorphism (translucide + flou)
- [ ] Créer le sélecteur de langue avec les drapeaux (Suisse, Cameroun, Espagne, UK)

**Issue GitHub** : [#23](https://github.com/tontonWilfried/L-man-Prestige-S-RL/issues/23)

---

### Tâche 6 : Organisme - Header (Navigation Mobile)
**Échéance : 15 Janvier**
- [ ] Créer l'icône "Hamburger" animée
- [ ] Développer le menu tiroir (Drawer) qui glisse depuis la droite
- [ ] S'assurer que le sélecteur de langue est facile à utiliser au doigt (taille des icônes)

**Issue GitHub** : [#24](https://github.com/tontonWilfried/L-man-Prestige-S-RL/issues/24)

---

### Tâche 7 : Hero Section (Accueil)
**Échéance : 16 Janvier**
- [x] Créer le titre H1 avec un dégradé de couleur (Gradiant)
- [x] Intégrer une image de fond "Immobilier de prestige" haute définition
- [x] Ajouter un bouton central (CTA) "Découvrir nos services" avec animation d'entrée

**Issue GitHub** : [#25](https://github.com/tontonWilfried/L-man-Prestige-S-RL/issues/25)

---

### Tâche 8 : Footer (Bas de page)
**Échéance : 17 Janvier**
- [x] Créer les colonnes de liens (Services, À propos, Légal)
- [x] Intégrer les icônes de réseaux sociaux (LinkedIn, Instagram)
- [x] Afficher les informations de contact (Email, Téléphone)

**Issue GitHub** : [#26](https://github.com/tontonWilfried/L-man-Prestige-S-RL/issues/26)

---

### Tâche 9 : Revue du Sprint 1
**Échéance : 18 Janvier**
- [ ] Vérifier que tout est responsive (iPhone et Android)
- [ ] Vérifier que les traductions fonctionnent sur chaque page créée
- [ ] Fusionner tout le travail sur la branche main

**Issue GitHub** : [#27](https://github.com/tontonWilfried/L-man-Prestige-S-RL/issues/27)

---

## 🎨 Palette de Couleurs
- **Léman Blue** : `#0A2A43` - Couleur principale
- **Gold Accent** : `#C5A059` - Accents dorés
- **Soft White** : `#F8F9FA` - Arrière-plans clairs

## 🔤 Typographie
- **Titres** : Outfit (Google Fonts)
- **Textes** : Inter (Google Fonts)

## 🌍 Langues Supportées
- 🇫🇷 Français
- 🇬🇧 Anglais
- 🇪🇸 Espagnol

## 📊 Liens Utiles
- **Milestone GitHub** : [Sprint 1](https://github.com/tontonWilfried/L-man-Prestige-S-RL/milestone/1)
- **Project Board** : [Sprint 1 - Léman Prestige](https://github.com/users/tontonWilfried/projects/8)
- **Repository** : [L-man-Prestige-S-RL](https://github.com/tontonWilfried/L-man-Prestige-S-RL)

## 📝 Notes
- Toutes les issues sont assignées à @tontonWilfried
- Labels utilisés : `sprint-1`, `i18n`, `design-system`, `components`
- Utiliser les atomic design principles (Atomes, Molécules, Organismes)
