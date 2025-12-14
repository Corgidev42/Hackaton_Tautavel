export type Language = "fr" | "en" | "ca" | "es"

export const languages: { code: Language; name: string; flag: string }[] = [
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "ca", name: "Català", flag: "🏴󠁥󠁳󠁣󠁴󠁿" },
  { code: "es", name: "Español", flag: "🇪🇸" },
]

export const translations = {
  fr: {
    // Header
    citizenScienceProject: "Projet de Science Citoyenne",
    artifacts: "Artefacts",
    about: "À propos",
    howToContribute: "Comment Contribuer",
    signIn: "Connexion",
    joinProject: "Rejoindre le Projet",

    // Hero Section
    yearsOfHistory: "450 000 ans d'histoire humaine",
    heroTitle: "Préservez l'Histoire,",
    heroTitleHighlight: "Un Vecteur",
    heroTitleEnd: "à la Fois",
    heroDescription:
      "Rejoignez des milliers de contributeurs numérisant les dessins archéologiques de la Grotte de Tautavel. Votre travail aide à préserver l'un des sites préhistoriques les plus importants d'Europe pour les générations futures.",
    startContributing: "Commencer à Contribuer",
    learnMore: "En Savoir Plus",
    artifactsDigitized: "Artefacts Numérisés",
    contributors: "Contributeurs",
    accuracyRate: "Taux de Précision",

    // Artifact Grid
    digitizationQueue: "File d'Attente de",
    digitization: "Numérisation",
    digitizationQueueDesc:
      "Parcourez les artefacts en attente de vectorisation. Chaque carré représente un dessin historique qui a besoin de votre aide pour être préservé numériquement.",
    completed: "Terminé",
    inProgress: "En Cours",
    notStarted: "Non Commencé",
    loading: "Chargement",
    complete: "terminé",

    // Stats Section
    artifactsVectorized: "Artefacts Vectorisés",
    historicalDrawings: "Dessins historiques préservés à jamais",
    contributorsLabel: "Contributeurs",
    fromCountries: "De 47 pays différents",
    hoursContributed: "Heures Contribuées",
    byOurCommunity: "Par notre incroyable communauté",
    accuracyRateLabel: "Taux de Précision",
    validatedBy: "Validé par des archéologues",

    // Footer
    footerDescription:
      "Un projet de science citoyenne dédié à la préservation du patrimoine archéologique par la vectorisation numérique.",
    project: "Projet",
    aboutTautavel: "À propos de Tautavel",
    howItWorks: "Comment ça Marche",
    researchTeam: "Équipe de Recherche",
    publications: "Publications",
    community: "Communauté",
    leaderboard: "Classement",
    forum: "Forum",
    guidelines: "Directives",
    faq: "FAQ",
    partners: "Partenaires",
    allRightsReserved: "Tous droits réservés",

    // Login Modal
    welcomeBack: "Bienvenue",
    signInToContinue: "Connectez-vous pour continuer votre contribution au projet Tautavel",
    email: "Email",
    password: "Mot de passe",
    signingIn: "Connexion en cours...",
    noAccount: "Vous n'avez pas de compte ?",
    createOne: "Créer un compte",

    // Dashboard
    dashboard: "Tableau de Bord",
    profile: "Profil",
    settings: "Paramètres",
    logOut: "Déconnexion",
    topContributors: "Meilleurs Contributeurs",
    vectors: "vecteurs",
    moreContributors: "+ 5 autres contributeurs",
    artifactCollection: "Collection d'Artefacts",
    selectArtifact: "Sélectionnez un artefact pour commencer la vectorisation",
    available: "Disponible",

    // Profile
    level: "Niveau",
    xpToNextLevel: "XP jusqu'au prochain niveau",
    rank: "Rang",
    streak: "Série",
    accuracy: "Précision",
    recentAchievements: "Réalisations Récentes",
    memberSince: "Membre depuis",
    firstVector: "Premier Vecteur",
    weekWarrior: "Guerrier de la Semaine",
    centuryClub: "Club du Siècle",
    perfectionist: "Perfectionniste",

    // Level titles
    noviceExplorer: "Explorateur Novice",
    caveApprentice: "Apprenti de la Grotte",
    artifactSeeker: "Chercheur d'Artefacts",
    vectorSpecialist: "Spécialiste Vecteur",
    siteGuardian: "Gardien du Site",
    masterArchaeologist: "Maître Archéologue",
    tautavelLegend: "Légende de Tautavel",

    // Cave Visualization
    caveExploration: "Exploration de la Grotte",
    clickOnStratum: "Cliquez sur une couche stratigraphique pour explorer les artefacts",
    stratigraphicCrossSection: "Coupe Stratigraphique",
    surface: "Surface",
    progress: "Progression",
    selected: "Sélectionné",

    // Slice Detail
    vectorizationProgress: "Progression de la Vectorisation",
    artifactsVectorizedCount: "artefacts vectorisés",
    artifactsFound: "Artefacts Trouvés",
    items: "objets",
    vectorize: "Vectoriser",

    // Artifact types
    tool: "outil",
    bone: "os",
    fossil: "fossile",
    pottery: "poterie",

    // Vectorize Page
    vectorizeArtifact: "Vectoriser l'Artefact",
    traceOutlines: "Tracez les contours et les caractéristiques",
    undo: "Annuler",
    redo: "Rétablir",
    clear: "Effacer",
    artifactDetails: "Détails de l'Artefact",
    artifactId: "ID de l'Artefact",
    category: "Catégorie",
    selectType: "Sélectionner le type",
    stoneTool: "Outil en Pierre",
    boneFragment: "Fragment d'Os",
    faunaRemains: "Restes de Faune",
    other: "Autre",
    material: "Matériau",
    selectMaterial: "Sélectionner le matériau",
    flint: "Silex",
    quartzite: "Quartzite",
    limestone: "Calcaire",
    antler: "Bois de Cerf",
    unknown: "Inconnu",
    preservationCondition: "État de Conservation",
    assessCondition: "Évaluer l'état",
    excellent: "Excellent",
    good: "Bon",
    fair: "Correct",
    poor: "Mauvais",
    fragmentary: "Fragmentaire",
    notesAndObservations: "Notes et Observations",
    notesPlaceholder:
      "Ajoutez des observations sur les caractéristiques distinctives, les motifs de dommages ou d'autres détails pertinents...",
    submitWork: "Soumettre le Travail",
    saveDraft: "Enregistrer le Brouillon",
    saved: "Enregistré !",
    submitVectorization: "Soumettre la Vectorisation",
    earnXP: "Gagnez",
    forEachVectorization: "pour chaque vectorisation terminée",

    // Color Palette
    strokeColor: "Couleur du Trait",
    brushSize: "Taille du Pinceau",
    preview: "Aperçu",
    catalanRed: "Rouge Catalan",
    catalanGold: "Or Catalan",
    darkBrown: "Brun Foncé",
    stoneGray: "Gris Pierre",
    boneWhite: "Blanc Os",
    earth: "Terre",
    forest: "Forêt",
    deepBlue: "Bleu Profond",
    black: "Noir",

    pyreneesOrientales: "Pyrénées-Orientales, France",
    aboutTitle: "La Caune de l'Arago",
    aboutSubtitle:
      "Découvrez l'histoire fascinante de l'un des sites préhistoriques les plus importants d'Europe, abritant les plus anciens restes humains de France.",
    discoveredIn1971: "Découvert en 1971",
    historyTitle: "Une Découverte Extraordinaire",
    historyParagraph1:
      "La Caune de l'Arago, située près du village de Tautavel dans les Pyrénées-Orientales, est l'un des sites préhistoriques les plus importants d'Europe. Cette grotte a été occupée par des populations humaines il y a entre 700 000 et 100 000 ans.",
    historyParagraph2:
      "En 1971, l'équipe du Professeur Henry de Lumley a fait une découverte extraordinaire : un crâne humain vieux de 450 000 ans, appartenant à un Homo heidelbergensis européen. Cette découverte a révolutionné notre compréhension de l'histoire humaine en Europe.",
    historyParagraph3:
      "Depuis lors, les fouilles continues ont révélé plus de 600 000 artefacts et 150 restes humains, faisant de Tautavel l'un des sites les plus riches au monde pour l'étude de nos ancêtres.",
    keyFacts: "Chiffres Clés",
    yearsOld: "Années d'Ancienneté",
    humanRemains: "Restes Humains",
    artifactsDiscovered: "Artefacts Découverts",
    yearsOfResearch: "Années de Recherche",
    tautavelManTitle: "L'Homme de Tautavel",
    tautavelManParagraph1:
      "L'Homme de Tautavel est le nom donné aux restes humains découverts dans la grotte. Il s'agit de l'un des plus anciens Européens connus, vivant il y a environ 450 000 ans pendant le Pléistocène moyen.",
    tautavelManParagraph2:
      "Ces chasseurs-cueilleurs étaient parfaitement adaptés à leur environnement. Ils fabriquaient des outils en pierre sophistiqués et chassaient de grands animaux comme les chevaux, les bisons et les rhinocéros.",
    tautavelManParagraph3:
      "L'étude de leurs restes et de leurs outils nous permet de mieux comprendre l'évolution humaine, les migrations préhistoriques et les modes de vie de nos ancêtres lointains.",
    ourMission: "Notre Mission",
    missionParagraph1:
      "Le projet Tautavel Vector vise à préserver numériquement les milliers de dessins archéologiques réalisés au cours de 50 ans de fouilles. Ces dessins représentent un patrimoine scientifique inestimable.",
    missionParagraph2:
      "Grâce à la contribution de citoyens du monde entier, nous transformons ces dessins en fichiers vectoriels haute résolution, garantissant leur préservation pour les générations futures et facilitant la recherche scientifique.",

    joinCommunity: "Rejoignez 2 341 Contributeurs",
    contributeTitle: "Comment Contribuer",
    contributeSubtitle:
      "Participez à la préservation du patrimoine préhistorique en numérisant les dessins archéologiques. Aucune expérience requise, juste votre curiosité et quelques minutes de votre temps.",
    startNow: "Commencer Maintenant",
    howItWorksTitle: "Comment Ça Marche",
    howItWorksSubtitle: "Quatre étapes simples pour contribuer à la science",
    step1Title: "Choisissez un Artefact",
    step1Description: "Parcourez notre collection et sélectionnez un dessin archéologique à vectoriser.",
    step2Title: "Tracez les Contours",
    step2Description: "Utilisez nos outils intuitifs pour tracer les contours et détails de l'artefact.",
    step3Title: "Vérifiez et Annotez",
    step3Description: "Ajoutez des informations sur le type d'artefact, son état et vos observations.",
    step4Title: "Soumettez votre Travail",
    step4Description: "Envoyez votre contribution pour validation par notre équipe d'experts.",
    whatIsVectorization: "Qu'est-ce que la Vectorisation ?",
    vectorizationParagraph1:
      "La vectorisation est le processus de conversion d'images en graphiques vectoriels. Contrairement aux images traditionnelles composées de pixels, les graphiques vectoriels sont définis par des équations mathématiques.",
    vectorizationParagraph2:
      "Cela permet de conserver une qualité parfaite quelle que soit la taille d'affichage, ce qui est essentiel pour la préservation à long terme des documents archéologiques.",
    vectorizationParagraph3:
      "Votre travail de tracé permet de créer des fichiers numériques durables qui pourront être utilisés par les chercheurs pendant des décennies.",
    rewardsTitle: "Récompenses et Reconnaissance",
    rewardsSubtitle: "Votre contribution est valorisée à travers notre système de gamification",
    earnXPTitle: "Gagnez de l'XP",
    earnXPDescription: "Chaque vectorisation complétée vous rapporte des points d'expérience pour progresser.",
    leaderboardTitle: "Classement",
    leaderboardDescription: "Comparez vos contributions avec celles des autres membres de la communauté.",
    achievementsTitle: "Succès à Débloquer",
    achievementsDescription: "Débloquez des badges et succès en atteignant des objectifs de contribution.",
    readyToStart: "Prêt à Commencer ?",
    readyToStartSubtitle: "Rejoignez notre communauté de contributeurs et aidez à préserver l'histoire de l'humanité.",
    createAccount: "Créer un Compte",
  },
  en: {
    // Header
    citizenScienceProject: "Citizen Science Project",
    artifacts: "Artifacts",
    about: "About",
    howToContribute: "How to Contribute",
    signIn: "Sign In",
    joinProject: "Join Project",

    // Hero Section
    yearsOfHistory: "450,000 years of human history",
    heroTitle: "Preserve History,",
    heroTitleHighlight: "One Vector",
    heroTitleEnd: "at a Time",
    heroDescription:
      "Join thousands of contributors digitizing archaeological drawings from the Tautavel Cave. Your work helps preserve one of Europe's most important prehistoric sites for future generations.",
    startContributing: "Start Contributing",
    learnMore: "Learn More",
    artifactsDigitized: "Artifacts Digitized",
    contributors: "Contributors",
    accuracyRate: "Accuracy Rate",

    // Artifact Grid
    digitizationQueue: "Current",
    digitization: "Digitization",
    digitizationQueueDesc:
      "Browse artifacts awaiting vectorization. Each square represents a historical drawing that needs your help to be preserved digitally.",
    completed: "Completed",
    inProgress: "In Progress",
    notStarted: "Not Started",
    loading: "Loading",
    complete: "complete",

    // Stats Section
    artifactsVectorized: "Artifacts Vectorized",
    historicalDrawings: "Historical drawings preserved forever",
    contributorsLabel: "Contributors",
    fromCountries: "From 47 different countries",
    hoursContributed: "Hours Contributed",
    byOurCommunity: "By our amazing community",
    accuracyRateLabel: "Accuracy Rate",
    validatedBy: "Validated by archaeologists",

    // Footer
    footerDescription:
      "A citizen science project dedicated to preserving archaeological heritage through digital vectorization.",
    project: "Project",
    aboutTautavel: "About Tautavel",
    howItWorks: "How It Works",
    researchTeam: "Research Team",
    publications: "Publications",
    community: "Community",
    leaderboard: "Leaderboard",
    forum: "Forum",
    guidelines: "Guidelines",
    faq: "FAQ",
    partners: "Partners",
    allRightsReserved: "All rights reserved",

    // Login Modal
    welcomeBack: "Welcome Back",
    signInToContinue: "Sign in to continue your contribution to the Tautavel project",
    email: "Email",
    password: "Password",
    signingIn: "Signing in...",
    noAccount: "Don't have an account?",
    createOne: "Create one",

    // Dashboard
    dashboard: "Dashboard",
    profile: "Profile",
    settings: "Settings",
    logOut: "Log out",
    topContributors: "Top Contributors",
    vectors: "vectors",
    moreContributors: "+ 5 more contributors",
    artifactCollection: "Artifact Collection",
    selectArtifact: "Select an artifact to begin vectorization",
    available: "Available",

    // Profile
    level: "Level",
    xpToNextLevel: "XP to next level",
    rank: "Rank",
    streak: "Streak",
    accuracy: "Accuracy",
    recentAchievements: "Recent Achievements",
    memberSince: "Member since",
    firstVector: "First Vector",
    weekWarrior: "Week Warrior",
    centuryClub: "Century Club",
    perfectionist: "Perfectionist",

    // Level titles
    noviceExplorer: "Novice Explorer",
    caveApprentice: "Cave Apprentice",
    artifactSeeker: "Artifact Seeker",
    vectorSpecialist: "Vector Specialist",
    siteGuardian: "Site Guardian",
    masterArchaeologist: "Master Archaeologist",
    tautavelLegend: "Tautavel Legend",

    // Cave Visualization
    caveExploration: "Cave Exploration",
    clickOnStratum: "Click on a stratum layer to explore artifacts",
    stratigraphicCrossSection: "Stratigraphic Cross-Section",
    surface: "Surface",
    progress: "Progress",
    selected: "Selected",

    // Slice Detail
    vectorizationProgress: "Vectorization Progress",
    artifactsVectorizedCount: "artifacts vectorized",
    artifactsFound: "Artifacts Found",
    items: "items",
    vectorize: "Vectorize",

    // Artifact types
    tool: "tool",
    bone: "bone",
    fossil: "fossil",
    pottery: "pottery",

    // Vectorize Page
    vectorizeArtifact: "Vectorize Artifact",
    traceOutlines: "Trace the outlines and features",
    undo: "Undo",
    redo: "Redo",
    clear: "Clear",
    artifactDetails: "Artifact Details",
    artifactId: "Artifact ID",
    category: "Category",
    selectType: "Select type",
    stoneTool: "Stone Tool",
    boneFragment: "Bone Fragment",
    faunaRemains: "Fauna Remains",
    other: "Other",
    material: "Material",
    selectMaterial: "Select material",
    flint: "Flint",
    quartzite: "Quartzite",
    limestone: "Limestone",
    antler: "Antler",
    unknown: "Unknown",
    preservationCondition: "Preservation Condition",
    assessCondition: "Assess condition",
    excellent: "Excellent",
    good: "Good",
    fair: "Fair",
    poor: "Poor",
    fragmentary: "Fragmentary",
    notesAndObservations: "Notes & Observations",
    notesPlaceholder: "Add any observations about distinctive features, damage patterns, or other relevant details...",
    submitWork: "Submit Work",
    saveDraft: "Save Draft",
    saved: "Saved!",
    submitVectorization: "Submit Vectorization",
    earnXP: "Earn",
    forEachVectorization: "for each completed vectorization",

    // Color Palette
    strokeColor: "Stroke Color",
    brushSize: "Brush Size",
    preview: "Preview",
    catalanRed: "Catalan Red",
    catalanGold: "Catalan Gold",
    darkBrown: "Dark Brown",
    stoneGray: "Stone Gray",
    boneWhite: "Bone White",
    earth: "Earth",
    forest: "Forest",
    deepBlue: "Deep Blue",
    black: "Black",

    pyreneesOrientales: "Pyrénées-Orientales, France",
    aboutTitle: "The Arago Cave",
    aboutSubtitle:
      "Discover the fascinating history of one of Europe's most important prehistoric sites, home to the oldest human remains in France.",
    discoveredIn1971: "Discovered in 1971",
    historyTitle: "An Extraordinary Discovery",
    historyParagraph1:
      "The Caune de l'Arago, located near the village of Tautavel in the Pyrénées-Orientales, is one of Europe's most important prehistoric sites. This cave was occupied by human populations between 700,000 and 100,000 years ago.",
    historyParagraph2:
      "In 1971, Professor Henry de Lumley's team made an extraordinary discovery: a 450,000-year-old human skull belonging to a European Homo heidelbergensis. This discovery revolutionized our understanding of human history in Europe.",
    historyParagraph3:
      "Since then, continuous excavations have revealed over 600,000 artifacts and 150 human remains, making Tautavel one of the world's richest sites for studying our ancestors.",
    keyFacts: "Key Facts",
    yearsOld: "Years Old",
    humanRemains: "Human Remains",
    artifactsDiscovered: "Artifacts Discovered",
    yearsOfResearch: "Years of Research",
    tautavelManTitle: "Tautavel Man",
    tautavelManParagraph1:
      "Tautavel Man is the name given to the human remains discovered in the cave. He is one of the oldest known Europeans, living approximately 450,000 years ago during the Middle Pleistocene.",
    tautavelManParagraph2:
      "These hunter-gatherers were perfectly adapted to their environment. They crafted sophisticated stone tools and hunted large animals such as horses, bison, and rhinoceroses.",
    tautavelManParagraph3:
      "Studying their remains and tools helps us better understand human evolution, prehistoric migrations, and the lifestyles of our distant ancestors.",
    ourMission: "Our Mission",
    missionParagraph1:
      "The Tautavel Vector project aims to digitally preserve thousands of archaeological drawings created over 50 years of excavations. These drawings represent an invaluable scientific heritage.",
    missionParagraph2:
      "Through contributions from citizens worldwide, we transform these drawings into high-resolution vector files, ensuring their preservation for future generations and facilitating scientific research.",

    joinCommunity: "Join 2,341 Contributors",
    contributeTitle: "How to Contribute",
    contributeSubtitle:
      "Participate in preserving prehistoric heritage by digitizing archaeological drawings. No experience required, just your curiosity and a few minutes of your time.",
    startNow: "Start Now",
    howItWorksTitle: "How It Works",
    howItWorksSubtitle: "Four simple steps to contribute to science",
    step1Title: "Choose an Artifact",
    step1Description: "Browse our collection and select an archaeological drawing to vectorize.",
    step2Title: "Trace the Outlines",
    step2Description: "Use our intuitive tools to trace the outlines and details of the artifact.",
    step3Title: "Verify and Annotate",
    step3Description: "Add information about the artifact type, condition, and your observations.",
    step4Title: "Submit Your Work",
    step4Description: "Send your contribution for validation by our expert team.",
    whatIsVectorization: "What is Vectorization?",
    vectorizationParagraph1:
      "Vectorization is the process of converting images into vector graphics. Unlike traditional images made of pixels, vector graphics are defined by mathematical equations.",
    vectorizationParagraph2:
      "This allows for perfect quality at any display size, which is essential for long-term preservation of archaeological documents.",
    vectorizationParagraph3:
      "Your tracing work creates durable digital files that researchers will be able to use for decades.",
    rewardsTitle: "Rewards and Recognition",
    rewardsSubtitle: "Your contribution is valued through our gamification system",
    earnXPTitle: "Earn XP",
    earnXPDescription: "Each completed vectorization earns you experience points to level up.",
    leaderboardTitle: "Leaderboard",
    leaderboardDescription: "Compare your contributions with other community members.",
    achievementsTitle: "Unlock Achievements",
    achievementsDescription: "Unlock badges and achievements by reaching contribution goals.",
    readyToStart: "Ready to Start?",
    readyToStartSubtitle: "Join our community of contributors and help preserve human history.",
    createAccount: "Create Account",
  },
  ca: {
    // Header
    citizenScienceProject: "Projecte de Ciència Ciutadana",
    artifacts: "Artefactes",
    about: "Sobre",
    howToContribute: "Com Contribuir",
    signIn: "Iniciar Sessió",
    joinProject: "Unir-se al Projecte",

    // Hero Section
    yearsOfHistory: "450.000 anys d'història humana",
    heroTitle: "Preserveu la Història,",
    heroTitleHighlight: "Un Vector",
    heroTitleEnd: "a la Vegada",
    heroDescription:
      "Uniu-vos a milers de col·laboradors digitalitzant dibuixos arqueològics de la Cova de Tautavel. El vostre treball ajuda a preservar un dels llocs prehistòrics més importants d'Europa per a les generacions futures.",
    startContributing: "Comença a Contribuir",
    learnMore: "Més Informació",
    artifactsDigitized: "Artefactes Digitalitzats",
    contributors: "Col·laboradors",
    accuracyRate: "Taxa de Precisió",

    // Artifact Grid
    digitizationQueue: "Cua de",
    digitization: "Digitalització",
    digitizationQueueDesc:
      "Navegueu pels artefactes en espera de vectorització. Cada quadrat representa un dibuix històric que necessita la vostra ajuda per ser preservat digitalment.",
    completed: "Completat",
    inProgress: "En Progrés",
    notStarted: "No Iniciat",
    loading: "Carregant",
    complete: "completat",

    // Stats Section
    artifactsVectorized: "Artefactes Vectoritzats",
    historicalDrawings: "Dibuixos històrics preservats per sempre",
    contributorsLabel: "Col·laboradors",
    fromCountries: "De 47 països diferents",
    hoursContributed: "Hores Contribuïdes",
    byOurCommunity: "Per la nostra increïble comunitat",
    accuracyRateLabel: "Taxa de Precisió",
    validatedBy: "Validat per arqueòlegs",

    // Footer
    footerDescription:
      "Un projecte de ciència ciutadana dedicat a preservar el patrimoni arqueològic a través de la vectorització digital.",
    project: "Projecte",
    aboutTautavel: "Sobre Tautavel",
    howItWorks: "Com Funciona",
    researchTeam: "Equip de Recerca",
    publications: "Publicacions",
    community: "Comunitat",
    leaderboard: "Classificació",
    forum: "Fòrum",
    guidelines: "Directrius",
    faq: "FAQ",
    partners: "Socis",
    allRightsReserved: "Tots els drets reservats",

    // Login Modal
    welcomeBack: "Benvingut de Nou",
    signInToContinue: "Inicieu sessió per continuar la vostra contribució al projecte Tautavel",
    email: "Correu Electrònic",
    password: "Contrasenya",
    signingIn: "Iniciant sessió...",
    noAccount: "No teniu un compte?",
    createOne: "Creeu-ne un",

    // Dashboard
    dashboard: "Tauler",
    profile: "Perfil",
    settings: "Configuració",
    logOut: "Tancar Sessió",
    topContributors: "Millors Col·laboradors",
    vectors: "vectors",
    moreContributors: "+ 5 col·laboradors més",
    artifactCollection: "Col·lecció d'Artefactes",
    selectArtifact: "Seleccioneu un artefacte per començar la vectorització",
    available: "Disponible",

    // Profile
    level: "Nivell",
    xpToNextLevel: "XP fins al proper nivell",
    rank: "Rang",
    streak: "Ratxa",
    accuracy: "Precisió",
    recentAchievements: "Assoliments Recents",
    memberSince: "Membre des de",
    firstVector: "Primer Vector",
    weekWarrior: "Guerrer de la Setmana",
    centuryClub: "Club del Segle",
    perfectionist: "Perfeccionista",

    // Level titles
    noviceExplorer: "Explorador Novell",
    caveApprentice: "Aprenent de la Cova",
    artifactSeeker: "Cercador d'Artefactes",
    vectorSpecialist: "Especialista en Vectors",
    siteGuardian: "Guardià del Lloc",
    masterArchaeologist: "Mestre Arqueòleg",
    tautavelLegend: "Llegenda de Tautavel",

    // Cave Visualization
    caveExploration: "Exploració de la Cova",
    clickOnStratum: "Feu clic en una capa estratigràfica per explorar artefactes",
    stratigraphicCrossSection: "Secció Transversal Estratigràfica",
    surface: "Superfície",
    progress: "Progrés",
    selected: "Seleccionat",

    // Slice Detail
    vectorizationProgress: "Progrés de Vectorització",
    artifactsVectorizedCount: "artefactes vectoritzats",
    artifactsFound: "Artefactes Trobats",
    items: "objectes",
    vectorize: "Vectoritzar",

    // Artifact types
    tool: "eina",
    bone: "os",
    fossil: "fòssil",
    pottery: "terrissa",

    // Vectorize Page
    vectorizeArtifact: "Vectoritzar Artefacte",
    traceOutlines: "Traceu els contorns i les característiques",
    undo: "Desfer",
    redo: "Refer",
    clear: "Esborrar",
    artifactDetails: "Detalls de l'Artefacte",
    artifactId: "ID de l'Artefacte",
    category: "Categoria",
    selectType: "Selecciona tipus",
    stoneTool: "Eina de Pedra",
    boneFragment: "Fragment d'Os",
    faunaRemains: "Restes de Fauna",
    other: "Altre",
    material: "Material",
    selectMaterial: "Selecciona material",
    flint: "Sílex",
    quartzite: "Quartzita",
    limestone: "Calcària",
    antler: "Banya de Cérvol",
    unknown: "Desconegut",
    preservationCondition: "Estat de Conservació",
    assessCondition: "Avalua l'estat",
    excellent: "Excel·lent",
    good: "Bo",
    fair: "Acceptable",
    poor: "Pobre",
    fragmentary: "Fragmentari",
    notesAndObservations: "Notes i Observacions",
    notesPlaceholder:
      "Afegiu observacions sobre característiques distintives, patrons de danys o altres detalls rellevants...",
    submitWork: "Enviar Treball",
    saveDraft: "Desar Esborrany",
    saved: "¡Guardado!",
    submitVectorization: "Enviar Vectorització",
    earnXP: "Guanya",
    forEachVectorization: "per cada vectorització completada",

    // Color Palette
    strokeColor: "Color del Traç",
    brushSize: "Mida del Pinzell",
    preview: "Vista Prèvia",
    catalanRed: "Vermell Català",
    catalanGold: "Or Català",
    darkBrown: "Marró Fosc",
    stoneGray: "Gris Pedra",
    boneWhite: "Blanc Os",
    earth: "Terra",
    forest: "Bosc",
    deepBlue: "Blau Profund",
    black: "Negre",

    pyreneesOrientales: "Pirineus Orientals, França",
    aboutTitle: "La Cova de l'Aragó",
    aboutSubtitle:
      "Descobriu la fascinant història d'un dels jaciments prehistòrics més importants d'Europa, que alberga les restes humanes més antics de França.",
    discoveredIn1971: "Descobert el 1971",
    historyTitle: "Un Descobriment Extraordinari",
    historyParagraph1:
      "La Caune de l'Arago, situada prop del poble de Talteüll als Pirineus Orientals, és un dels jaciments prehistòrics més importants d'Europa. Aquesta cova va ser ocupada per poblacions humanes fa entre 700.000 i 100.000 anys.",
    historyParagraph2:
      "El 1971, l'equip del Professor Henry de Lumley va fer un descobriment extraordinari: un crani humà de 450.000 anys d'antiguitat, pertanyent a un Homo heidelbergensis europeu. Aquest descobriment va revolucionar la nostra comprensió de la història humana a Europa.",
    historyParagraph3:
      "Des de llavors, les excavacions contínues han revelat més de 600.000 artefactes i 150 restes humanes, convertint Talteüll en un dels jaciments més rics del món per a l'estudi dels nostres avantpassats.",
    keyFacts: "Dades Clau",
    yearsOld: "Anys d'Antiguitat",
    humanRemains: "Restes Humanes",
    artifactsDiscovered: "Artefactes Descoberts",
    yearsOfResearch: "Anys de Recerca",
    tautavelManTitle: "L'Home de Talteüll",
    tautavelManParagraph1:
      "L'Home de Talteüll és el nom donat a les restes humanes descobertes a la cova. És un dels europeus més antics coneguts, que va viure fa aproximadament 450.000 anys durant el Pleistocè mitjà.",
    tautavelManParagraph2:
      "Aquests caçadors-recol·lectors estaven perfectament adaptats al seu entorn. Fabricaven eines de pedra sofisticades i caçaven grans animals com cavalls, bisons i rinoceronts.",
    tautavelManParagraph3:
      "L'estudi de les seves restes i eines ens ajuda a entendre millor l'evolució humana, les migracions prehistòriques i els estils de vida dels nostres avantpassats llunyans.",
    ourMission: "La Nostra Missió",
    missionParagraph1:
      "El projecte Tautavel Vector té com a objectiu preservar digitalment milers de dibuixos arqueològics creats al llarg de 50 anys d'excavacions. Aquests dibuixos representen un patrimoni científic inestimable.",
    missionParagraph2:
      "Gràcies a les contribucions de ciutadans de tot el món, transformem aquests dibuixos en fitxers vectorials d'alta resolució, garantint la seva preservació per a les generacions futures i facilitant la recerca científica.",

    joinCommunity: "Uniu-vos a 2.341 Col·laboradors",
    contributeTitle: "Com Contribuir",
    contributeSubtitle:
      "Participeu en la preservació del patrimoni prehistòric digitalitzant dibuixos arqueològics. No cal experiència, només la vostra curiositat i uns minuts del vostre temps.",
    startNow: "Comença Ara",
    howItWorksTitle: "Com Funciona",
    howItWorksSubtitle: "Quatre passos simples per contribuir a la ciència",
    step1Title: "Trieu un Artefacte",
    step1Description: "Navegueu per la nostra col·lecció i seleccioneu un dibuix arqueològic per vectoritzar.",
    step2Title: "Traceu els Contorns",
    step2Description: "Utilitzeu les nostres eines intuïtives per traçar els contorns i detalls de l'artefacte.",
    step3Title: "Verifiqueu i Anoteu",
    step3Description: "Afegiu informació sobre el tipus d'artefacte, el seu estat i les vostres observacions.",
    step4Title: "Envieu el Vostre Treball",
    step4Description: "Envieu la vostra contribució per a la validació pel nostre equip d'experts.",
    whatIsVectorization: "Què és la Vectorització?",
    vectorizationParagraph1:
      "La vectorització és el procés de conversió d'imatges en gràfics vectorials. A diferència de les imatges tradicionals compostes de píxels, els gràfics vectorials es defineixen mitjançant equacions matemàtiques.",
    vectorizationParagraph2:
      "Això permet mantenir una qualitat perfecta a qualsevol mida de visualització, essencial per a la preservació a llarg termini dels documents arqueològics.",
    vectorizationParagraph3:
      "El vostre treball de traçat crea fitxers digitals duradors que els investigadors podran utilitzar durant dècades.",
    rewardsTitle: "Recompenses i Reconeixement",
    rewardsSubtitle: "La vostra contribució és valorada a través del nostre sistema de gamificació",
    earnXPTitle: "Guanyeu XP",
    earnXPDescription: "Cada vectorització completada us aporta punts d'experiència per avançar.",
    leaderboardTitle: "Classificació",
    leaderboardDescription: "Compareu les vostres contribucions amb les d'altres membres de la comunitat.",
    achievementsTitle: "Assoliments a Desbloquejar",
    achievementsDescription: "Desbloquegeu insígnies i assoliments aconseguint objectius de contribució.",
    readyToStart: "Preparats per Començar?",
    readyToStartSubtitle:
      "Uniu-vos a la nostra comunitat de col·laboradors i ajudeu a preservar la història de la humanitat.",
    createAccount: "Crear Compte",
  },
  es: {
    // Header
    citizenScienceProject: "Proyecto de Ciencia Ciudadana",
    artifacts: "Artefactos",
    about: "Acerca de",
    howToContribute: "Cómo Contribuir",
    signIn: "Iniciar Sesión",
    joinProject: "Unirse al Proyecto",

    // Hero Section
    yearsOfHistory: "450.000 años de historia humana",
    heroTitle: "Preserva la Historia,",
    heroTitleHighlight: "Un Vector",
    heroTitleEnd: "a la Vez",
    heroDescription:
      "Únete a miles de colaboradores digitalizando dibujos arqueológicos de la Cueva de Tautavel. Tu trabajo ayuda a preservar uno de los sitios prehistóricos más importantes de Europa para las generaciones futuras.",
    startContributing: "Comenzar a Contribuir",
    learnMore: "Saber Más",
    artifactsDigitized: "Artefactos Digitalizados",
    contributors: "Colaboradores",
    accuracyRate: "Tasa de Precisión",

    // Artifact Grid
    digitizationQueue: "Cola de",
    digitization: "Digitalización",
    digitizationQueueDesc:
      "Explora los artefactos en espera de vectorización. Cada cuadrado representa un dibujo histórico que necesita tu ayuda para ser preservado digitalmente.",
    completed: "Completado",
    inProgress: "En Progreso",
    notStarted: "No Iniciado",
    loading: "Cargando",
    complete: "completado",

    // Stats Section
    artifactsVectorized: "Artefactos Vectorizados",
    historicalDrawings: "Dibujos históricos preservados para siempre",
    contributorsLabel: "Colaboradores",
    fromCountries: "De 47 países diferentes",
    hoursContributed: "Horas Contribuidas",
    byOurCommunity: "Por nuestra increíble comunidad",
    accuracyRateLabel: "Tasa de Precisión",
    validatedBy: "Validado por arqueólogos",

    // Footer
    footerDescription:
      "Un proyecto de ciencia ciudadana dedicado a preservar el patrimonio arqueológico a través de la vectorización digital.",
    project: "Proyecto",
    aboutTautavel: "Sobre Tautavel",
    howItWorks: "Cómo Funciona",
    researchTeam: "Equipo de Investigación",
    publications: "Publicaciones",
    community: "Comunidad",
    leaderboard: "Clasificación",
    forum: "Foro",
    guidelines: "Directrices",
    faq: "FAQ",
    partners: "Socios",
    allRightsReserved: "Todos los derechos reservados",

    // Login Modal
    welcomeBack: "Bienvenido de Nuevo",
    signInToContinue: "Inicia sesión para continuar tu contribución al proyecto Tautavel",
    email: "Correo Electrónico",
    password: "Contraseña",
    signingIn: "Iniciando sesión...",
    noAccount: "¿No tienes una cuenta?",
    createOne: "Crea una",

    // Dashboard
    dashboard: "Panel",
    profile: "Perfil",
    settings: "Configuración",
    logOut: "Cerrar Sesión",
    topContributors: "Mejores Colaboradores",
    vectors: "vectores",
    moreContributors: "+ 5 colaboradores más",
    artifactCollection: "Colección de Artefactos",
    selectArtifact: "Selecciona un artefacto para comenzar la vectorización",
    available: "Disponible",

    // Profile
    level: "Nivel",
    xpToNextLevel: "XP hasta el próximo nivel",
    rank: "Rango",
    streak: "Racha",
    accuracy: "Precisión",
    recentAchievements: "Logros Recientes",
    memberSince: "Miembro desde",
    firstVector: "Primer Vector",
    weekWarrior: "Guerrero de la Semana",
    centuryClub: "Club del Siglo",
    perfectionist: "Perfeccionista",

    // Level titles
    noviceExplorer: "Explorador Novato",
    caveApprentice: "Aprendiz de la Cueva",
    artifactSeeker: "Buscador de Artefactos",
    vectorSpecialist: "Especialista en Vectores",
    siteGuardian: "Guardián del Sitio",
    masterArchaeologist: "Maestro Arqueólogo",
    tautavelLegend: "Leyenda de Tautavel",

    // Cave Visualization
    caveExploration: "Exploración de la Cueva",
    clickOnStratum: "Haz clic en una capa estratigráfica para explorar artefactos",
    stratigraphicCrossSection: "Sección Transversal Estratigráfica",
    surface: "Superficie",
    progress: "Progreso",
    selected: "Seleccionado",

    // Slice Detail
    vectorizationProgress: "Progreso de Vectorización",
    artifactsVectorizedCount: "artefactos vectorizados",
    artifactsFound: "Artefactos Encontrados",
    items: "objetos",
    vectorize: "Vectorizar",

    // Artifact types
    tool: "herramienta",
    bone: "hueso",
    fossil: "fósil",
    pottery: "cerámica",

    // Vectorize Page
    vectorizeArtifact: "Vectorizar Artefacto",
    traceOutlines: "Traza los contornos y características",
    undo: "Deshacer",
    redo: "Rehacer",
    clear: "Borrar",
    artifactDetails: "Detalles del Artefacto",
    artifactId: "ID del Artefacto",
    category: "Categoría",
    selectType: "Seleccionar tipo",
    stoneTool: "Herramienta de Piedra",
    boneFragment: "Fragmento de Hueso",
    faunaRemains: "Restos de Fauna",
    other: "Otro",
    material: "Material",
    selectMaterial: "Seleccionar material",
    flint: "Sílex",
    quartzite: "Cuarcita",
    limestone: "Caliza",
    antler: "Asta de Ciervo",
    unknown: "Desconocido",
    preservationCondition: "Estado de Conservación",
    assessCondition: "Evaluar estado",
    excellent: "Excelente",
    good: "Bueno",
    fair: "Regular",
    poor: "Pobre",
    fragmentary: "Fragmentario",
    notesAndObservations: "Notas y Observaciones",
    notesPlaceholder:
      "Añade observaciones sobre características distintivas, patrones de daño u otros detalles relevantes...",
    submitWork: "Enviar Trabajo",
    saveDraft: "Guardar Borrador",
    saved: "¡Guardado!",
    submitVectorization: "Enviar Vectorización",
    earnXP: "Gana",
    forEachVectorization: "por cada vectorización completada",

    // Color Palette
    strokeColor: "Color del Trazo",
    brushSize: "Tamaño del Pincel",
    preview: "Vista Previa",
    catalanRed: "Rojo Catalán",
    catalanGold: "Oro Catalán",
    darkBrown: "Marrón Oscuro",
    stoneGray: "Gris Piedra",
    boneWhite: "Blanco Hueso",
    earth: "Tierra",
    forest: "Bosque",
    deepBlue: "Azul Profundo",
    black: "Negro",

    pyreneesOrientales: "Pirineos Orientales, Francia",
    aboutTitle: "La Cueva de Arago",
    aboutSubtitle:
      "Descubre la fascinante historia de uno de los yacimientos prehistóricos más importantes de Europa, hogar de los restos humanos más antiguos de Francia.",
    discoveredIn1971: "Descubierto en 1971",
    historyTitle: "Un Descubrimiento Extraordinario",
    historyParagraph1:
      "La Caune de l'Arago, situada cerca del pueblo de Tautavel en los Pirineos Orientales, es uno de los yacimientos prehistóricos más importantes de Europa. Esta cueva fue ocupada por poblaciones humanas hace entre 700.000 y 100.000 años.",
    historyParagraph2:
      "En 1971, el equipo del Profesor Henry de Lumley hizo un descubrimiento extraordinario: un cráneo humano de 450.000 años de antigüedad, perteneciente a un Homo heidelbergensis europeo. Este descubrimiento revolucionó nuestra comprensión de la historia humana en Europa.",
    historyParagraph3:
      "Desde entonces, las excavaciones continuas han revelado más de 600.000 artefactos y 150 restos humanos, convirtiendo a Tautavel en uno de los yacimientos más ricos del mundo para el estudio de nuestros antepasados.",
    keyFacts: "Datos Clave",
    yearsOld: "Años de Antigüedad",
    humanRemains: "Restos Humanos",
    artifactsDiscovered: "Artefactos Descubiertos",
    yearsOfResearch: "Años de Investigación",
    tautavelManTitle: "El Hombre de Tautavel",
    tautavelManParagraph1:
      "El Hombre de Tautavel es el nombre dado a los restos humanos descubiertos en la cueva. Es uno de los europeos más antiguos conocidos, que vivió hace aproximadamente 450.000 años durante el Pleistoceno medio.",
    tautavelManParagraph2:
      "Estos cazadores-recolectores estaban perfectamente adaptados a su entorno. Fabricaban herramientas de piedra sofisticadas y cazaban grandes animales como caballos, bisontes y rinocerontes.",
    tautavelManParagraph3:
      "El estudio de sus restos y herramientas nos ayuda a comprender mejor la evolución humana, las migraciones prehistóricas y los estilos de vida de nuestros antepasados lejanos.",
    ourMission: "Nuestra Misión",
    missionParagraph1:
      "El proyecto Tautavel Vector tiene como objetivo preservar digitalmente miles de dibujos arqueológicos creados a lo largo de 50 años de excavaciones. Estos dibujos representan un patrimonio científico invaluable.",
    missionParagraph2:
      "Gracias a las contribuciones de ciudadanos de todo el mundo, transformamos estos dibujos en archivos vectoriales de alta resolución, garantizando su preservación para las generaciones futuras y facilitando la investigación científica.",

    joinCommunity: "Únete a 2.341 Colaboradores",
    contributeTitle: "Cómo Contribuir",
    contributeSubtitle:
      "Participa en la preservación del patrimonio prehistórico digitalizando dibujos arqueológicos. No se requiere experiencia, solo tu curiosidad y unos minutos de tu tiempo.",
    startNow: "Comenzar Ahora",
    howItWorksTitle: "Cómo Funciona",
    howItWorksSubtitle: "Cuatro pasos simples para contribuir a la ciencia",
    step1Title: "Elige un Artefacto",
    step1Description: "Explora nuestra colección y selecciona un dibujo arqueológico para vectorizar.",
    step2Title: "Traza los Contornos",
    step2Description: "Utiliza nuestras herramientas intuitivas para trazar los contornos y detalles del artefacto.",
    step3Title: "Verifica y Anota",
    step3Description: "Añade información sobre el tipo de artefacto, su estado y tus observaciones.",
    step4Title: "Envía tu Trabajo",
    step4Description: "Envía tu contribución para validación por nuestro equipo de expertos.",
    whatIsVectorization: "¿Qué es la Vectorización?",
    vectorizationParagraph1:
      "La vectorización es el proceso de conversión de imágenes en gráficos vectoriales. A diferencia de las imágenes tradicionales compuestas de píxels, los gráficos vectoriales se definen mediante ecuaciones matemáticas.",
    vectorizationParagraph2:
      "Esto permite mantener una calidad perfecta a cualquier tamaño de visualización, esencial para la preservación a largo plazo de los documentos arqueológicos.",
    vectorizationParagraph3:
      "Tu trabajo de trazado crea archivos digitales duraderos que los investigadores podrán utilizar durante décadas.",
    rewardsTitle: "Recompensas y Reconocimiento",
    rewardsSubtitle: "Tu contribución es valorada a través de nuestro sistema de gamificación",
    earnXPTitle: "Gana XP",
    earnXPDescription: "Cada vectorización completada te aporta puntos de experiencia para avanzar.",
    leaderboardTitle: "Clasificación",
    leaderboardDescription: "Compara tus contribuciones con las de otros miembros de la comunidad.",
    achievementsTitle: "Logros a Desbloquear",
    achievementsDescription: "Desbloquea insignias y logros alcanzando objetivos de contribución.",
    readyToStart: "¿Listo para Empezar?",
    readyToStartSubtitle: "Únete a nuestra comunidad de colaboradores y ayuda a preservar la historia de la humanidad.",
    createAccount: "Crear Cuenta",
  },
}

export type TranslationKey = keyof (typeof translations)["fr"]
