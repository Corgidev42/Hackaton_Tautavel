# Système de Découvertes pour les Artifact Cards

## Structure des dossiers

Les images des découvertes sont stockées dans `public/addons/` :

```
public/addons/
├── os/           # Images d'os découverts
├── pierre/       # Images de pierres découvertes
├── galet/        # Images de galets découverts
├── calcite/      # Images de calcite découvertes
└── placeholder.svg  # Image pour les découvertes non révélées (?)
```

## Fonctionnalités

### Affichage des découvertes
- Chaque artifact card peut contenir plusieurs découvertes de différentes catégories
- Les découvertes sont affichées au centre de la card
- En **hover** sur une card, les images défilent automatiquement toutes les 800ms

### États des découvertes
1. **Découvert** (`discovered: true`) : Affiche l'image réelle de la découverte
2. **Non découvert** (`discovered: false`) : Affiche le placeholder avec un point d'interrogation

## Utilisation

### Ajouter des découvertes à un artifact

Dans `artifact-dashboard-grid.tsx`, ajoutez un tableau `discoveries` :

```typescript
{
  id: 1,
  status: "completed",
  title: "Biface T-1247",
  category: "Stone Tools",
  discoveries: [
    { 
      id: "1-1", 
      category: "pierre", 
      imagePath: "/addons/pierre/pierre-1.svg", 
      discovered: true 
    },
    { 
      id: "1-2", 
      category: "galet", 
      imagePath: "/addons/galet/galet-1.svg", 
      discovered: false 
    },
  ],
}
```

### Catégories disponibles
- `os` : Ossements et fragments d'os
- `pierre` : Outils en pierre taillée
- `galet` : Galets aménagés
- `calcite` : Cristaux et dépôts de calcite

## Remplacement des images

Pour remplacer les images placeholder par de vraies images :

1. Placez vos images dans le dossier correspondant dans `public/addons/[categorie]/`
2. Nommez-les de manière descriptive (ex: `os-femur-1.svg`, `pierre-silex-2.png`)
3. Mettez à jour les `imagePath` dans les données des artifacts
4. Les formats supportés : SVG, PNG, JPG, WebP

## Notes techniques

- Le défilement s'active uniquement au hover
- Vitesse de défilement : 800ms par image (modifiable dans `dashboard-artifact-card.tsx`)
- Les images sont affichées avec `object-contain` pour préserver les proportions
- Taille de l'affichage : 96x96px sur mobile, 128x128px sur desktop
