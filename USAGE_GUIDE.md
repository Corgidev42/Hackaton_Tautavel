# 🎯 Guide d'Utilisation - Nouvelles Fonctionnalités ArcheoTrace

## Accès Rapide aux 4 Nouvelles Vues

Toutes les fonctionnalités sont accessibles via la **sidebar gauche** sur desktop ou le **menu hamburger** sur mobile.

---

## 1. 📥 **Export SIG (Données)** - Le Graal Archéologique

### Qu'est-ce que c'est?
C'est l'interface de téléchargement des données de fouilles pour utilisation dans les logiciels professionnels.

### Comment y accéder?
1. Cliquez sur **"Export SIG (Données)"** dans la sidebar
2. Vous verrez 3 cartes de téléchargement

### Les 3 formats disponibles

#### 🔴 **Shapefile (.SHP)**
- **Pour qui?** QGIS, ArcGIS, MapInfo
- **Quand?** Pour les analyses géographiques avancées
- **Inclus:** Geometries vectorielles complètes + attributs + projection UTM32N

**Comment télécharger?**
- Cliquez le bouton bleu "Télécharger" sous la carte Shapefile

#### 🔵 **GeoJSON (.GEOJSON)**
- **Pour qui?** Webmaps, applications web, analyses en ligne
- **Quand?** Pour partager les données en ligne
- **Inclus:** JSON structuré, projection WGS84, import facile WebGIS

**Comment télécharger?**
- Cliquez le bouton bleu "Télécharger" sous la carte GeoJSON

#### 🟣 **AutoCAD (.DXF)**
- **Pour qui?** AutoCAD, tous les logiciels CAO/DAO
- **Quand?** Pour les plans techniques détaillés
- **Inclus:** Layers organisés, textes, cotations, code couleur par type

**Comment télécharger?**
- Cliquez le bouton violet "Télécharger" sous la carte DXF

### ℹ️ Informations Utiles
- **Données incluses:** Geometries vectorisées + métadonnées + validation + histogrammes
- **Recommandations:** Voir la colonne de droite pour savoir quel format choisir
- **Taille:** ~3.2 MB pour l'ensemble complet
- **Métaproj:** Toujours incluse pour la géolocalisation

---

## 2. 🔥 **Heatmap - Vue Globale du Chantier**

### Qu'est-ce que c'est?
Une visualisation en temps réel de l'avancement du chantier de fouilles avec les zones actives, finies et non touchées.

### Comment y accéder?
1. Cliquez sur **"Heatmap"** dans la sidebar
2. Vous verrez la carte du site avec 6 zones colorées

### Comprendre les Couleurs

#### 🔴 **Zones ROUGES = Actives**
- En cours de fouilles en ce moment
- Niveau d'activité de 75-92%
- Beaucoup de contributeurs dessus

**Exemple:** Secteurs B, C, D sont actifs

#### 🟢 **Zones VERTES = Finies**
- Complétées et validées
- Niveau d'activité: 0% (terminé)
- Prêtes pour la documentation finale

**Exemple:** Secteurs A et E sont finis

#### ⚪ **Zones GRISES = Non Touchées**
- À explorer
- Pas encore commencées
- Priorité pour les prochains jours

**Exemple:** Secteur F n'a pas été touché

### Tableau Détaillé
En bas de la page, un tableau montre **par zone:**
- Status (Active/Finie/Non touchée)
- % d'activité (avec barre de progression)
- Nombre de contributeurs actuels

### Statistiques Globales
- **Zones Actives:** 3
- **Zones Complétées:** 2
- **À Explorer:** 1
- **Avancement Global:** 67%

---

## 3. 🚩 **Anomalies & Signalements**

### Qu'est-ce que c'est?
Une galerie des observations intéressantes du terrain - les "bizarreries" que les contributeurs ont marquées en rouge pendant les fouilles.

### Comment y accéder?
1. Cliquez sur **"Anomalies"** dans la sidebar
2. Vous verrez la galerie avec badge rouge (nombre en attente)

### Types d'Anomalies

- **Pièces de monnaie possibles** → À examiner en priorité
- **Anomalies de scan** → Zones à rescanner
- **Outils archéologiques** → À documenter
- **Lignes de démarcation bizarres** → À vérifier

### Comment Explorer?

#### Filtrer les Signalements
- **Tous** - Affiche tous les signalements
- **En attente** - Ceux qui attendent validation
- **Validés** - Confirmés comme réels
- **Résolus** - Traités et documentés

#### Comprendre Chaque Carte
Chaque anomalie affiche:
- 📸 **Image** - Avec bordure rouge pour mettre en avant la zone
- ⏳/✓/✅ **Status Badge** - État actuel
- 💬 **Commentaires** - Observations des experts
- 👥 **Contributeur** - Qui a signalé
- ❤️ **Likes** - Intérêt de la communauté

#### Section Commentaires (Type Instagram)
- Voir jusqu'à 2 commentaires directs
- "Voir les X autres commentaires" pour plus
- Avatars des contributeurs
- Timestamps automatiques

---

## 4. 🏆 **Top Contributeurs - Leaderboard**

### Qu'est-ce que c'est?
Un classement gamifié des meilleurs contributeurs et un système de modération pour identifier les trolls.

### Comment y accéder?
1. Cliquez sur **"Top Contributeurs"** dans la sidebar
2. Vous verrez le leaderboard avec badges et cartes spéciales

### Lire le Leaderboard

#### Les Rangs
- **🥇 #1** - Meilleur contributeur (couronne dorée) → À inviter au musée
- **🥈 #2** - Deuxième meilleur (couronne argentée)
- **🥉 #3** - Troisième (couronne bronze)
- **#4+** - Numérotation simple

#### Les Informations par Contributeur
- **Plans validés** - Nombre total de plans
- **Précision** - % de plans acceptés sans conflit
- **Status** - Expert (🏆), Actif (⭐), Troll (🚫)

### Les Boutons d'Action

#### 💬 **Message** (Contributeurs Experts)
- Envoyer un message privé
- Proposer des collaborations
- Inviter aux événements du musée

**Qui contacter?**
- Les experts (90%+ de précision)
- Les top contributeurs (500+ plans validés)

#### 🚫 **Ban** (Trolls)
- Bannir des utilisateurs problématiques
- Pour ceux avec <30% de précision
- Idéal pour "TrollDuNet" (15% de précision)

### Cartes Spéciales

#### 🌟 **Expert du Chantier** (Carte Or)
Affiche le TOP contributeur:
- Gros avatar avec cadre doré
- Nombre de plans validés en gros
- Proposition: "Invitation musée VIP 🎫"

#### ⚠️ **À Surveiller** (Carte Rouge)
Liste les contributeurs problématiques:
- Faible précision
- Possibles trolls
- À examiner attentivement

### Statistiques Globales
- **Total contributeurs top:** 6
- **Experts reconnus:** 3 (badgés)
- **Messages envoyés:** 12
- **Bannissements:** 1

---

## 📱 **Conseils d'Utilisation**

### Sur Desktop
- Utilisez le menu fixe à gauche pour naviguer
- Plus d'espace pour voir les détails
- Tableaux complets visibles sans scroll horizontal

### Sur Mobile/Tablette
- Cliquez le 🍔 hamburger pour ouvrir le menu
- Le menu se ferme auto après sélection
- Cartes et contenu adaptés à votre écran
- Swipe pour les tableaux larges

### Raccourcis d'Information
- 📊 Tous les nombres cliquables vont à la vue correspondante
- 🔔 Les badges orange indiquent des éléments en attente
- 🟢 Les vert indiquent du succès/complété
- 🔴 Les rouge indiquent urgence/attention requise

---

## 🤔 **Questions Fréquentes**

### Q: Comment télécharger mes données?
**R:** Allez dans "Export SIG (Données)" et choisissez le format. Un toast confirmera le téléchargement.

### Q: Quelle zone est la plus active?
**R:** Vérifiez la "Heatmap" - les zones rouges avec le % le plus haut sont les plus actives.

### Q: Comment signaler une anomalie?
**R:** Les anomalies sont signalées via l'interface de fouilles (non visible ici). Elles apparaissent dans "Anomalies".

### Q: Puis-je bannir quelqu'un?
**R:** Oui! Allez dans "Top Contributeurs", trouvez le troll (faible %), et cliquez "Ban".

### Q: Comment inviter un expert au musée?
**R:** Allez dans "Top Contributeurs", cliquez "Message" sur un expert, et proposez l'invitation.

---

## ✨ **Prochaines Étapes**

Ces vues sont **prêtes pour l'intégration** avec:
- [ ] Vraies données de base de données
- [ ] API de téléchargement réelle
- [ ] Système de commentaires en temps réel
- [ ] Notifications de modération
- [ ] Export en backups

**Bon travail sur le chantier! 🏛️⛏️**
