/*!
 * Celtmen Apps - i18n (fr / en)
 * ---------------------------------------------------------------------------
 * Moteur de traduction + dictionnaires, partagé par :
 *   /index.html            (../ depuis store/ et NightRush/)
 *   /store/*.html
 *   /NightRush/*.html
 *
 * Fonctionnement :
 *   - la langue est détectée automatiquement au chargement de la page, sans
 *     aucune action de l'utilisateur (?lang=xx > localStorage > navigateur > défaut)
 *   - les textes du HTML sont marqués avec des attributs data-i18n* :
 *        data-i18n             -> textContent
 *        data-i18n-html        -> innerHTML (chaînes contenant des liens/balises)
 *        data-i18n-placeholder -> attribut placeholder
 *        data-i18n-alt         -> attribut alt
 *        data-i18n-label       -> attribut aria-label
 *        data-i18n-title       -> attribut title
 *        data-i18n-content     -> attribut content (balises <meta>)
 *   - les textes générés en JS utilisent I18N.t("chemin.cle")
 *   - un changement de langue déclenche l'événement "celtmen:langchange"
 *
 * Ajouter une langue :
 *   1. ajouter son code dans SUPPORTED (+ LOCALE_LABELS et HTML_LANG)
 *   2. dupliquer le dictionnaire (ex. "fr") dans TRANSLATIONS et le traduire
 *   3. rien d'autre : les pages se traduisent automatiquement
 */
(function (global) {
  "use strict";

  var STORAGE_KEY = "celtmen-lang";
  var DEFAULT_LOCALE = "fr";
  var SUPPORTED = ["fr", "en"];
  var LOCALE_LABELS = { fr: "Français", en: "English" };
  var HTML_LANG = { fr: "fr-FR", en: "en-US" };

  var TRANSLATIONS = {

    fr: {

      meta: {
        storeTitle: "Celtmen Apps Store",
        storeDesc: "Découvrez toutes les applications Celtmen Apps : Night Rush, HavoK App et plus encore. Téléchargement simple, rapide et sécurisé.",
        appDesc: "Fiche détaillée d'une application du store Celtmen Apps.",
        nightRushTitle: "Night Rush - Celtmen Apps",
        nightRushDesc: "Night Rush, un jeu d'endless runner avec classement mondial, skins et power-ups.",
        havokTitle: "HavoK App - Celtmen Apps",
        havokDesc: "HavoK App, l'application créée par un fan pour Team HavoK.",
        privacyTitle: "Politique de Confidentialité - Celtmen Apps",
        privacyDesc: "Politique de confidentialité de Celtmen Apps et des applications du store.",
        homeTitle: "Celtmen Apps - Store d'applications",
        homeDesc: "Celtmen Apps est un store d'applications moderne pour découvrir et télécharger les applications développées par Celtmen.",
        nrPrivacyTitle: "Politique de Confidentialité - Night Rush",
        nrPrivacyDesc: "Politique de confidentialité du jeu Night Rush : données collectées, usages et droits.",
        downloadTitle: "Téléchargement Night Rush",
        downloadDesc: "Téléchargez Night Rush gratuitement sur Android, iOS, Windows et Mac."
      },

      ui: {
        brand: "Celtmen Apps",
        tagline: "Découvrez nos applications",
        searchPlaceholder: "Rechercher une application…",
        allApps: "Toutes les apps",
        noResults: "Aucune application trouvée.",
        view: "Voir",
        back: "Retour",
        backStore: "Retour au Store",
        by: "Par",
        get: "Obtenir",
        download: "Télécharger",
        age: "Âge",
        size: "Taille",
        version: "Version",
        minIOS: "iOS minimum",
        screenshots: "Captures d'écran",
        description: "Description",
        about: "À propos",
        features: "Fonctionnalités",
        information: "Informations",
        privacy: "Confidentialité",
        readFullPolicy: "Lire la politique de confidentialité complète",
        notFoundTitle: "Application introuvable",
        notFoundText: "Cette application n'existe pas ou n'est plus disponible dans le store.",
        free: "Gratuit",
        language: "Langue",
        changeLanguage: "Changer de langue",
        updated: "Dernière mise à jour : 12 septembre 2026",
        footer: "© 2026 Celtmen. Tous droits réservés.",
        developer: "Développeur"
      },

      categories: {
        games: "Jeux",
        entertainment: "Divertissement",
        utilities: "Utilitaires"
      },
      apps: {

        "night-rush": {
          name: "Night Rush",
          subtitle: "Un jeu d'endless runner",
          description: "Night Rush est un jeu d'endless runner avec classement mondial, skins et power-ups. Courez toute la nuit, évitez les obstacles, débloquez de nouvelles skins et affrontez des joueurs du monde entier sur le classement global.",
          category: "categories.games",
          size: "89 Mo",
          version: "0.31",
          age: "4+",
          minIOS: "14.0+",
          platforms: "iOS, Android, Windows et Mac",
          screensAlt1: "Capture d'écran du gameplay de Night Rush",
          screensAlt2: "Capture d'écran du salon Night Rush",
          screensAlt3: "Capture d'écran du classement mondial de Night Rush",
          f1Title: "Endless Runner",
          f1Desc: "Courez le plus loin possible dans des niveaux nocturnes sans fin.",
          f2Title: "Classement mondial",
          f2Desc: "Affrontez des joueurs du monde entier et grimpez dans le classement global.",
          f3Title: "Skins",
          f3Desc: "Débloquez et collectionnez des skins uniques pour personnaliser votre personnage.",
          f4Title: "Power-ups",
          f4Desc: "Utilisez des fusées et des réanimations pour augmenter votre score.",
          privacyShort: "Night Rush collecte votre pseudo et votre progression (scores, skins) via Supabase pour le classement mondial. Aucune donnée personnelle sensible n'est collectée.",
          privacyLink: "Lire la politique de confidentialité complète"
        },

        "havok-app": {
          name: "HavoK App",
          subtitle: "Application non officielle créée par un fan pour Team HavoK",
          description: "HavoK App est une application créée par un fan pour les fans de Team HavoK. Ce n'est pas l'application officielle, elle rassemble simplement le contenu de la Team HavoK dans un seul endroit pratique.",
          category: "categories.entertainment",
          size: "14 Mo",
          version: "1.1.0",
          age: "4+",
          minIOS: "15.1+",
          platforms: "iOS",
          screensAlt1: "Capture d'écran 1 de HavoK App",
          screensAlt2: "Capture d'écran 2 de HavoK App",
          screensAlt3: "Capture d'écran 3 de HavoK App",
          screensAlt4: "Capture d'écran 4 de HavoK App",
          f1Title: "Face ID",
          f1Desc: "Authentifiez-vous rapidement et en toute sécurité grâce à Face ID.",
          f2Title: "Contenu Team HavoK",
          f2Desc: "Accédez à tout le contenu lié à la Team HavoK depuis un seul endroit.",
          privacyShort: "HavoK App utilise Face ID uniquement pour l'authentification. Aucune donnée biométrique ne quitte votre appareil.",
          privacyLink: "Lire la politique de confidentialité complète"
        }
      },

      privacy: {
        title: "Politique de Confidentialité",
        s1t: "1. Introduction",
        s1: "Celtmen Apps (ci-après « nous », « notre » ou « le service ») est un store d'applications qui permet de découvrir et de télécharger des applications mobiles. La présente politique de confidentialité décrit la manière dont nous collectons, utilisons et protégeons vos informations lorsque vous visitez notre site et utilisez nos services.",
        s2t: "2. Responsable du traitement",
        s2Html: "Celtmen<br>Email : <a href=\"mailto:celtmen@yahoo.com\">celtmen@yahoo.com</a>",
        s3t: "3. Données collectées",
        s3Intro: "Notre site est statique et ne collecte pas directement de données personnelles. Cependant, les données suivantes peuvent être collectées :",
        s3li1Html: "<strong>Données de navigation :</strong> comme la plupart des sites, nous pouvons collecter des informations via des services tiers (voir section 6).",
        s3li2Html: "<strong>Aucune donnée directement soumise :</strong> nous ne proposons pas de formulaire de compte, de paiement ni d'inscription sur ce site.",
        s3li3Html: "<strong>Applications tierces :</strong> les applications téléchargées via notre store (Night Rush, HavoK App, etc.) ont leurs propres politiques de confidentialité. Nous vous invitons à les consulter avant toute installation.",
        s4t: "4. Applications distribuées",
        s4Intro: "Les applications proposées sur notre store peuvent collecter des données personnelles (identifiants, données biométriques, etc.). Voici les permissions connues :",
        s4li1Html: "<strong>Night Rush</strong> : aucune permission sensible requise.",
        s4li2Html: "<strong>HavoK App</strong> : accès aux données biométriques (Face ID) — requis pour l'authentification.",
        s4Outro: "Pour plus de détails, consultez la description de chaque application dans le store.",
        s5t: "5. Hébergement et téléchargements",
        s5li1Html: "<strong>Site web :</strong> hébergé par GitHub Pages (GitHub, Inc.). <a href=\"https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement\" target=\"_blank\" rel=\"noopener\">Politique de GitHub</a>",
        s5li2Html: "<strong>Fichiers IPA :</strong> hébergés sur GitHub Releases. Les téléchargements sont gérés par GitHub.",
        s6t: "6. Services tiers",
        s6Intro: "Nous utilisons les services suivants, qui peuvent collecter des données :",
        s6li1Html: "<strong>GitHub Pages</strong> : hébergement du site.",
        s7t: "7. Cookies",
        s7: "Notre site n'utilise pas de cookies propres. Cependant, GitHub Pages peut utiliser des cookies techniques nécessaires au bon fonctionnement du service.",
        s8t: "8. Vos droits (RGPD)",
        s8Intro: "Si vous résidez dans l'Union européenne ou au Royaume-Uni, vous disposez des droits suivants :",
        s8li1: "Droit d'accès à vos données personnelles",
        s8li2: "Droit de rectification",
        s8li3: "Droit à l'effacement (« droit à l'oubli »)",
        s8li4: "Droit à la limitation du traitement",
        s8li5: "Droit à la portabilité",
        s8li6: "Droit d'opposition",
        s8OutroHtml: "Pour exercer ces droits, contactez-nous à : <a href=\"mailto:celtmen@yahoo.com\">celtmen@yahoo.com</a>",
        s9t: "9. Conservation des données",
        s9: "Nous ne stockons pas de données personnelles sur nos serveurs. Les données éventuellement collectées par les services tiers (GitHub) sont conservées selon leurs propres politiques.",
        s10t: "10. Modifications",
        s10: "Nous pouvons mettre à jour cette politique de confidentialité à tout moment. La date de dernière mise à jour est indiquée en haut de cette page.",
        s11t: "11. Contact",
        s11Html: "Pour toute question concernant cette politique de confidentialité, contactez-nous :<br>Email : <a href=\"mailto:celtmen@yahoo.com\">celtmen@yahoo.com</a>"
      },

      landing: {
        heading: "Celtmen Apps",
        text: "Découvrez un store d'applications simple, rapide et moderne. Téléchargez les applications développées par Celtmen.",
        cta: "Accéder au Store"
      },

      download: {
        heading: "Téléchargement Night Rush",
        note: "Choisissez votre plateforme pour installer Night Rush gratuitement.",
        platform: "Plateforme",
        version: "Version 0.32 · iOS 0.31",
        backStore: "Retour au Store",
        help: "Un problème d'installation ? Consultez la <a href=\"../store/night-rush.html\">fiche de Night Rush</a> ou la <a href=\"privacy.html\">politique de confidentialité</a>."
      },

      nrPrivacy: {
        title: "Politique de Confidentialité — Night Rush",
        s1t: "1. Introduction",
        s1: "Night Rush est un jeu mobile gratuit développé par Celtmen. Cette politique de confidentialité décrit les données personnelles collectées et la manière dont elles sont utilisées.",
        s2t: "2. Responsable du traitement",
        s2Html: "Celtmen<br>Email : <a href=\"mailto:celtmen@yahoo.com\">celtmen@yahoo.com</a>",
        s3t: "3. Données collectées",
        s31t: "3.1 Données fournies par l'utilisateur",
        s31Intro: "Lors de la création d'un compte, vous fournissez :",
        s31li1Html: "<strong>Pseudo</strong> : choisi par vous, affiché dans le classement",
        s31li2Html: "<strong>Mot de passe</strong> : stocké de manière sécurisée sur nos serveurs (Supabase)",
        s32t: "3.2 Données collectées automatiquement",
        s32li1Html: "<strong>Scores et progression</strong> : meilleur score, points, skins acquis",
        s32li2Html: "<strong>Plateforme</strong> : le système d'exploitation (Android, iOS, Windows, Mac) est envoyé à un webhook Discord pour les statistiques",
        s33t: "3.3 Données collectées par des tiers",
        s33li1Html: "<strong>Google AdMob</strong> : des publicités récompensées sont affichées dans le jeu. Google peut collecter des données publicitaires (identifiant publicitaire, localisation approximative). <a href=\"https://policies.google.com/privacy\" target=\"_blank\" rel=\"noopener\">Politique de Google</a>",
        s4t: "4. Utilisation des données",
        s4Intro: "Les données sont utilisées pour :",
        s4li1: "Sauvegarder votre progression (scores, skins, points)",
        s4li2: "Afficher le classement mondial",
        s4li3: "Permettre la connexion à votre compte sur plusieurs appareils",
        s4li4: "Afficher des publicités pour financer le jeu gratuit",
        s4li5: "Établir des statistiques anonymes d'utilisation (via Discord)",
        s5t: "5. Stockage et sécurité",
        s5li1Html: "<strong>Serveur</strong> : les données de compte sont stockées via <a href=\"https://supabase.com\" target=\"_blank\" rel=\"noopener\">Supabase</a> (hébergé dans l'Union européenne)",
        s5li2Html: "<strong>Local</strong> : une copie de votre progression est sauvegardée localement sur votre appareil",
        s6t: "6. Partage des données",
        s6Intro: "Nous ne vendons pas vos données personnelles. Les données peuvent être partagées avec :",
        s6li1Html: "<strong>Supabase</strong> : hébergement de la base de données",
        s6li2Html: "<strong>Google AdMob</strong> : régie publicitaire",
        s6li3Html: "<strong>Discord</strong> : webhook pour les statistiques (uniquement la plateforme, aucune donnée personnelle)",
        s7t: "7. Conservation des données",
        s7Html: "Les données de compte sont conservées tant que votre compte est actif. Pour supprimer votre compte et toutes vos données, contactez-nous à <a href=\"mailto:celtmen@yahoo.com\">celtmen@yahoo.com</a>.",
        s8t: "8. Vos droits (RGPD)",
        s8Intro: "Conformément au RGPD, vous disposez des droits suivants :",
        s8li1: "Droit d'accès à vos données",
        s8li2: "Droit de rectification",
        s8li3: "Droit à l'effacement (suppression du compte)",
        s8li4: "Droit à la portabilité",
        s8li5: "Droit d'opposition",
        s8OutroHtml: "Pour exercer ces droits, envoyez un email à <a href=\"mailto:celtmen@yahoo.com\">celtmen@yahoo.com</a>.",
        s9t: "9. Mineurs",
        s9: "Le jeu est accessible à tous. Si vous avez moins de 15 ans (ou l'âge de consentement numérique dans votre pays), demandez l'autorisation à vos parents avant de créer un compte.",
        s10t: "10. Modifications",
        s10: "Cette politique peut être mise à jour à tout moment. La date de dernière mise à jour est indiquée en haut de cette page.",
        s11t: "11. Contact",
        s11Html: "Pour toute question : <a href=\"mailto:celtmen@yahoo.com\">celtmen@yahoo.com</a>"
      }
    },

    en: {

      meta: {
        storeTitle: "Celtmen Apps Store",
        storeDesc: "Discover every Celtmen Apps application: Night Rush, HavoK App and more. Fast, simple and secure downloads.",
        appDesc: "Detailed page of a Celtmen Apps store application.",
        nightRushTitle: "Night Rush - Celtmen Apps",
        nightRushDesc: "Night Rush, an endless runner game with a global leaderboard, skins and power-ups.",
        havokTitle: "HavoK App - Celtmen Apps",
        havokDesc: "HavoK App, the fan made application for Team HavoK.",
        privacyTitle: "Privacy Policy - Celtmen Apps",
        privacyDesc: "Privacy policy of Celtmen Apps and of the applications available in the store.",
        homeTitle: "Celtmen Apps - App Store",
        homeDesc: "Celtmen Apps is a modern app store to discover and download the applications built by Celtmen.",
        nrPrivacyTitle: "Privacy Policy - Night Rush",
        nrPrivacyDesc: "Privacy policy of the Night Rush game: data collected, purposes and your rights.",
        downloadTitle: "Download Night Rush",
        downloadDesc: "Download Night Rush for free on Android, iOS, Windows and Mac."
      },

      ui: {
        brand: "Celtmen Apps",
        tagline: "Discover our apps",
        searchPlaceholder: "Search for an app…",
        allApps: "All apps",
        noResults: "No app found.",
        view: "View",
        back: "Back",
        backStore: "Back to Store",
        by: "By",
        get: "Get",
        download: "Download",
        age: "Age",
        size: "Size",
        version: "Version",
        minIOS: "Minimum iOS",
        screenshots: "Screenshots",
        description: "Description",
        about: "About",
        features: "Features",
        information: "Information",
        privacy: "Privacy",
        readFullPolicy: "Read the full privacy policy",
        notFoundTitle: "App not found",
        notFoundText: "This app does not exist or is no longer available in the store.",
        free: "Free",
        language: "Language",
        changeLanguage: "Change language",
        updated: "Last updated: September 12, 2026",
        footer: "© 2026 Celtmen. All rights reserved.",
        developer: "Developer"
      },

      categories: {
        games: "Games",
        entertainment: "Entertainment",
        utilities: "Utilities"
      },
      apps: {

        "night-rush": {
          name: "Night Rush",
          subtitle: "An endless runner game",
          description: "Night Rush is an endless runner game with a global leaderboard, skins and power-ups. Run through the night, dodge obstacles, unlock new skins and compete with players worldwide on the global leaderboard.",
          category: "categories.games",
          size: "89 MB",
          version: "0.31",
          age: "4+",
          minIOS: "14.0+",
          platforms: "iOS, Android, Windows and Mac",
          screensAlt1: "Night Rush gameplay screenshot",
          screensAlt2: "Night Rush lobby screenshot",
          screensAlt3: "Night Rush global leaderboard screenshot",
          f1Title: "Endless Runner",
          f1Desc: "Run as far as you can through endless night-themed levels.",
          f2Title: "Global Leaderboard",
          f2Desc: "Compete with players worldwide and climb the global rankings.",
          f3Title: "Skins",
          f3Desc: "Unlock and collect unique skins to customize your character.",
          f4Title: "Power-ups",
          f4Desc: "Use power-ups like rockets and revives to boost your score.",
          privacyShort: "Night Rush stores your nickname and your progress (scores, skins) on Supabase for the global leaderboard. No sensitive personal data is collected.",
          privacyLink: "Read the full privacy policy"
        },

        "havok-app": {
          name: "HavoK App",
          subtitle: "A fan made app for Team HavoK",
          description: "HavoK App is an application made by a fan, for the fans of Team HavoK. It is not the official app; it simply gathers Team HavoK content in one convenient place.",
          category: "categories.entertainment",
          size: "14 MB",
          version: "1.1.0",
          age: "4+",
          minIOS: "15.1+",
          platforms: "iOS",
          screensAlt1: "HavoK App screenshot 1",
          screensAlt2: "HavoK App screenshot 2",
          screensAlt3: "HavoK App screenshot 3",
          screensAlt4: "HavoK App screenshot 4",
          f1Title: "Face ID",
          f1Desc: "Sign in quickly and securely with Face ID biometric authentication.",
          f2Title: "Team HavoK content",
          f2Desc: "Access everything related to Team HavoK in one convenient place.",
          privacyShort: "HavoK App uses Face ID for authentication purposes only. No biometric data ever leaves your device.",
          privacyLink: "Read the full privacy policy"
        }
      },

      privacy: {
        title: "Privacy Policy",
        s1t: "1. Introduction",
        s1: "Celtmen Apps (hereafter \"we\", \"our\" or \"the service\") is an app store that lets you discover and download mobile applications. This privacy policy explains how we collect, use and protect your information when you visit our website and use our services.",
        s2t: "2. Data controller",
        s2Html: "Celtmen<br>Email: <a href=\"mailto:celtmen@yahoo.com\">celtmen@yahoo.com</a>",
        s3t: "3. Data collected",
        s3Intro: "Our website is static and does not collect personal data directly. However, the following data may be collected:",
        s3li1Html: "<strong>Browsing data:</strong> like most websites, we may collect information through third-party services (see section 6).",
        s3li2Html: "<strong>No data submitted directly:</strong> we provide no account, payment or sign-up form on this website.",
        s3li3Html: "<strong>Third-party apps:</strong> applications downloaded from our store (Night Rush, HavoK App, etc.) have their own privacy policies. We recommend reading them before installing anything.",
        s4t: "4. Distributed applications",
        s4Intro: "Applications available in our store may collect personal data (identifiers, biometric data, etc.). Here are the known permissions:",
        s4li1Html: "<strong>Night Rush</strong>: no sensitive permission required.",
        s4li2Html: "<strong>HavoK App</strong>: biometric data access (Face ID) — required for authentication.",
        s4Outro: "For more details, please read the description of each application in the store.",
        s5t: "5. Hosting and downloads",
        s5li1Html: "<strong>Website:</strong> hosted on GitHub Pages (GitHub, Inc.). <a href=\"https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement\" target=\"_blank\" rel=\"noopener\">GitHub privacy statement</a>",
        s5li2Html: "<strong>IPA files:</strong> hosted on GitHub Releases. Downloads are handled by GitHub.",
        s6t: "6. Third-party services",
        s6Intro: "We use the following services, which may collect data:",
        s6li1Html: "<strong>GitHub Pages</strong>: website hosting.",
        s7t: "7. Cookies",
        s7: "Our website sets no cookies of its own. GitHub Pages may however use technical cookies that are required for the service to work properly.",
        s8t: "8. Your rights (GDPR)",
        s8Intro: "If you live in the European Union or the United Kingdom, you have the following rights:",
        s8li1: "Right of access to your personal data",
        s8li2: "Right to rectification",
        s8li3: "Right to erasure (\"right to be forgotten\")",
        s8li4: "Right to restriction of processing",
        s8li5: "Right to data portability",
        s8li6: "Right to object",
        s8OutroHtml: "To exercise these rights, contact us at: <a href=\"mailto:celtmen@yahoo.com\">celtmen@yahoo.com</a>",
        s9t: "9. Data retention",
        s9: "We do not store any personal data on our servers. Any data collected by third-party services (GitHub) is retained according to their own policies.",
        s10t: "10. Changes",
        s10: "We may update this privacy policy at any time. The last update date is shown at the top of this page.",
        s11t: "11. Contact",
        s11Html: "For any question about this privacy policy, contact us:<br>Email: <a href=\"mailto:celtmen@yahoo.com\">celtmen@yahoo.com</a>"
      },
      landing: {
        heading: "Celtmen Apps",
        text: "Discover a simple, fast and modern app store. Download the applications built by Celtmen.",
        cta: "Open the Store"
      },

      download: {
        heading: "Download Night Rush",
        note: "Pick your platform to install Night Rush for free.",
        platform: "Platform",
        version: "Version 0.32 · iOS 0.31",
        backStore: "Back to Store",
        help: "Trouble installing? Read the <a href=\"../store/night-rush.html\">Night Rush page</a> or the <a href=\"privacy.html\">privacy policy</a>."
      },

      nrPrivacy: {
        title: "Privacy Policy — Night Rush",
        s1t: "1. Introduction",
        s1: "Night Rush is a free mobile game developed by Celtmen. This privacy policy describes the personal data we collect and how it is used.",
        s2t: "2. Data controller",
        s2Html: "Celtmen<br>Email: <a href=\"mailto:celtmen@yahoo.com\">celtmen@yahoo.com</a>",
        s3t: "3. Data collected",
        s31t: "3.1 Data you provide",
        s31Intro: "When you create an account, you provide:",
        s31li1Html: "<strong>Nickname</strong>: chosen by you, displayed on the leaderboard",
        s31li2Html: "<strong>Password</strong>: stored securely on our servers (Supabase)",
        s32t: "3.2 Data collected automatically",
        s32li1Html: "<strong>Scores and progress</strong>: best score, points, unlocked skins",
        s32li2Html: "<strong>Platform</strong>: your operating system (Android, iOS, Windows, Mac) is sent to a Discord webhook for statistics",
        s33t: "3.3 Data collected by third parties",
        s33li1Html: "<strong>Google AdMob</strong>: rewarded ads are displayed in the game. Google may collect advertising data (advertising identifier, approximate location). <a href=\"https://policies.google.com/privacy\" target=\"_blank\" rel=\"noopener\">Google privacy policy</a>",
        s4t: "4. How data is used",
        s4Intro: "Data is used to:",
        s4li1: "Save your progress (scores, skins, points)",
        s4li2: "Display the global leaderboard",
        s4li3: "Let you sign in to your account on several devices",
        s4li4: "Show ads to fund the free game",
        s4li5: "Build anonymous usage statistics (through Discord)",
        s5t: "5. Storage and security",
        s5li1Html: "<strong>Server</strong>: account data is stored with <a href=\"https://supabase.com\" target=\"_blank\" rel=\"noopener\">Supabase</a> (hosted in the European Union)",
        s5li2Html: "<strong>Local</strong>: a copy of your progress is saved locally on your device",
        s6t: "6. Data sharing",
        s6Intro: "We never sell your personal data. Data may be shared with:",
        s6li1Html: "<strong>Supabase</strong>: database hosting",
        s6li2Html: "<strong>Google AdMob</strong>: advertising network",
        s6li3Html: "<strong>Discord</strong>: webhook for statistics (platform only, no personal data)",
        s7t: "7. Data retention",
        s7Html: "Account data is kept for as long as your account is active. To delete your account and all your data, contact us at <a href=\"mailto:celtmen@yahoo.com\">celtmen@yahoo.com</a>.",
        s8t: "8. Your rights (GDPR)",
        s8Intro: "Under the GDPR, you have the following rights:",
        s8li1: "Right of access to your data",
        s8li2: "Right to rectification",
        s8li3: "Right to erasure (account deletion)",
        s8li4: "Right to data portability",
        s8li5: "Right to object",
        s8OutroHtml: "To exercise these rights, send an email to <a href=\"mailto:celtmen@yahoo.com\">celtmen@yahoo.com</a>.",
        s9t: "9. Minors",
        s9: "The game is available to everyone. If you are under 15 (or under the digital consent age in your country), please ask your parents for permission before creating an account.",
        s10t: "10. Changes",
        s10: "This policy may be updated at any time. The last update date is shown at the top of this page.",
        s11t: "11. Contact",
        s11Html: "For any question: <a href=\"mailto:celtmen@yahoo.com\">celtmen@yahoo.com</a>"
      }
    }
  };

  /* -------------------------------------------------------------------------
   * Moteur
   * ---------------------------------------------------------------------- */

  var current = DEFAULT_LOCALE;
  var listeners = [];
  var warned = {};

  function normalize(value) {
    if (!value) { return null; }
    var short = String(value).toLowerCase().replace(/_/g, "-").split("-")[0];
    return SUPPORTED.indexOf(short) !== -1 ? short : null;
  }

  function stored() {
    try {
      return normalize(global.localStorage.getItem(STORAGE_KEY));
    } catch (e) {
      return null;
    }
  }

  function persist(locale) {
    try {
      global.localStorage.setItem(STORAGE_KEY, locale);
    } catch (e) { /* navigation privée : on ignore */ }
  }

  function fromQuery() {
    var search = global.location && global.location.search;
    if (!search) { return null; }
    try {
      return normalize(new URLSearchParams(search).get("lang"));
    } catch (e) {
      return null;
    }
  }

  function fromBrowser() {
    var nav = global.navigator;
    if (!nav) { return null; }
    var langs = nav.languages && nav.languages.length ? nav.languages : [nav.language];
    for (var i = 0; i < langs.length; i++) {
      var match = normalize(langs[i]);
      if (match) { return match; }
    }
    return null;
  }

  // ?lang=xx  >  choix mémorisé  >  langue du navigateur  >  langue par défaut
  function detect() {
    return fromQuery() || stored() || fromBrowser() || DEFAULT_LOCALE;
  }

  function resolve(locale, key) {
    var node = TRANSLATIONS[locale];
    var parts = String(key).split(".");
    for (var i = 0; i < parts.length && node != null; i++) {
      node = node[parts[i]];
    }
    return typeof node === "string" ? node : null;
  }

  function t(key, vars) {
    var value = resolve(current, key);
    if (value === null) { value = resolve(DEFAULT_LOCALE, key); }
    if (value === null) {
      if (!warned[key]) {
        warned[key] = true;
        if (global.console && console.warn) {
          console.warn("[i18n] clé manquante : " + key);
        }
      }
      return key;
    }
    if (vars) {
      Object.keys(vars).forEach(function (name) {
        value = value.split("{" + name + "}").join(vars[name]);
      });
    }
    return value;
  }
  var SELECTOR = "[data-i18n],[data-i18n-html],[data-i18n-placeholder],[data-i18n-alt],[data-i18n-label],[data-i18n-title],[data-i18n-content]";
  var ATTR_MAP = {
    "data-i18n-placeholder": "placeholder",
    "data-i18n-alt": "alt",
    "data-i18n-label": "aria-label",
    "data-i18n-title": "title",
    "data-i18n-content": "content"
  };

  /**
   * Traduit tous les noeuds marqués d'un document (ou d'un sous-arbre).
   */
  function apply(root) {
    if (typeof document === "undefined") { return; }
    root = root || document;
    if (!root.querySelectorAll) { return; }
    var nodes = root.querySelectorAll(SELECTOR);
    for (var i = 0; i < nodes.length; i++) {
      var node = nodes[i];
      if (node.hasAttribute("data-i18n")) {
        node.textContent = t(node.getAttribute("data-i18n"));
      }
      if (node.hasAttribute("data-i18n-html")) {
        node.innerHTML = t(node.getAttribute("data-i18n-html"));
      }
      for (var attr in ATTR_MAP) {
        if (node.hasAttribute(attr)) {
          node.setAttribute(ATTR_MAP[attr], t(node.getAttribute(attr)));
        }
      }
    }
  }

  function select() {
    return document.getElementById("lang-switcher-select");
  }

  var STYLE_ID = "celtmen-lang-css";

  /**
   * Injecte le style du sélecteur de langue : aucune feuille de style à
   * ajouter sur les pages, le sélecteur s'affiche correctement partout.
   */
  function injectStyles() {
    if (document.getElementById(STYLE_ID)) { return; }
    var style = document.createElement("style");
    style.id = STYLE_ID;
    /* Flèche dessinée en SVG inline (encodée) pour ne dépendre d'aucune image */
    var arrow = "url(\"data:image/svg+xml;charset=utf-8," +
      "%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20width=%2210%22%20height=%226%22%3E" +
      "%3Cpath%20d=%22M0%200l5%206%205-6z%22%20fill=%22%236e6e73%22/%3E%3C/svg%3E\")";
    style.textContent = [
      ".lang-slot{display:flex;justify-content:flex-end;margin-bottom:12px}",
      ".lang-switcher{font:inherit;font-size:14px;font-weight:600;color:#1d1d1f;",
      "-webkit-appearance:none;appearance:none;border:0;border-radius:999px;",
      "padding:8px 34px 8px 14px;cursor:pointer;background-color:#e8e8ed;",
      "background-image:" + arrow + ";background-repeat:no-repeat;",
      "background-position:right 12px center;transition:background-color .2s,box-shadow .2s}",
      ".lang-switcher:hover{background-color:#dcdce1}",
      ".lang-switcher:focus-visible{outline:2px solid #0071e3;outline-offset:2px}",
      ".lang-float{position:fixed;top:16px;right:16px;z-index:50}",
      ".lang-float .lang-switcher{box-shadow:0 6px 18px rgba(0,0,0,.12)}"
    ].join("");
    document.head.appendChild(style);
  }

  /**
   * Sélecteur de langue (facultatif : l'auto-détection reste le comportement
   * par défaut). Il est injecté dans #lang-switcher s'il existe, sinon en
   * haut à droite de la page.
   */
  function buildSwitcher() {
    injectStyles();
    var node = select();
    if (!node) {
      node = document.createElement("select");
      node.id = "lang-switcher-select";
    }
    node.className = "lang-switcher";
    node.textContent = "";
    SUPPORTED.forEach(function (locale) {
      var option = document.createElement("option");
      option.value = locale;
      option.textContent = LOCALE_LABELS[locale];
      node.appendChild(option);
    });
    node.value = current;
    node.setAttribute("aria-label", t("ui.changeLanguage"));
    node.addEventListener("change", function () { setLocale(node.value); });

    var slot = document.getElementById("lang-switcher");
    if (slot) {
      slot.textContent = "";
      slot.appendChild(node);
    } else if (document.body && !document.querySelector(".lang-float")) {
      var box = document.createElement("div");
      box.className = "lang-float";
      box.appendChild(node);
      document.body.appendChild(box);
    }
    return node;
  }

  function syncSwitcher() {
    var node = select();
    if (node) {
      node.value = current;
      node.setAttribute("aria-label", t("ui.changeLanguage"));
    }
  }

  function emit() {
    listeners.slice(0).forEach(function (fn) {
      try {
        fn(current);
      } catch (err) {
        if (global.console && console.error) { console.error(err); }
      }
    });
    if (typeof CustomEvent === "function") {
      document.dispatchEvent(new CustomEvent("celtmen:langchange", {
        detail: { locale: current, tag: HTML_LANG[current], document: document }
      }));
    }
  }

  /**
   * Change la langue : mémorise le choix, traduit la page et notifie le JS.
   */
  function setLocale(locale) {
    var next = normalize(locale) || DEFAULT_LOCALE;
    if (next === current) {
      syncSwitcher();
      return current;
    }
    current = next;
    persist(next);
    if (typeof document !== "undefined" && document.documentElement) {
      document.documentElement.lang = HTML_LANG[current];
      apply(document);
      injectSEO();
      syncSwitcher();
      emit();
    }
    return current;
  }

  /**
   * S'abonne aux changements de langue. Retourne une fonction de désabonnement.
   */
  function onChange(fn) {
    if (typeof fn !== "function") { return function () {}; }
    listeners.push(fn);
    return function off() {
      var index = listeners.indexOf(fn);
      if (index !== -1) { listeners.splice(index, 1); }
    };
  }

    function reveal() {
    var root = document.documentElement;
    if (root && root.classList) { root.classList.remove("i18n-pending"); }
  }

  /* ------------------------------------------------------------------------
   * SEO : hreflang, canon et données structurées (JSON-LD)
   * ----------------------------------------------------------------------
   * Le site sert le FR et l'EN sur le MÊME URL (détection navigateur). Sans
   * hreflang, Google ne pourrait indexer qu'une seule langue. Comme le moteur
   * supporte déjà ?lang=fr|en, on expose les deux variantes et on canonise
   * chaque URL language-specific → Google indexe le contenu des 2 langues.
   */
  var HOST = "https://celtmen-apps.pages.dev";
  var SEO_TAG = "data-celtmen-seo";

  function pagePath() {
    try {
      var p = global.location && global.location.pathname;
      if (!p || p.charAt(0) !== "/") { return "/"; }
      return p;
    } catch (e) { return "/"; }
  }

  function hrefFor(loc) {
    return HOST + pagePath() + "?lang=" + loc;
  }

  function setMetadata(name, content) {
    if (!content) { return; }
    var tag = document.querySelector('meta[name="' + name + '"]');
    if (!tag) {
      tag = document.createElement("meta");
      tag.setAttribute("name", name);
      document.head.appendChild(tag);
    }
    tag.setAttribute("content", content);
  }

  function setProperty(name, content) {
    if (!content) { return; }
    var tag = document.querySelector('meta[property="' + name + '"]');
    if (!tag) {
      tag = document.createElement("meta");
      tag.setAttribute("property", name);
      document.head.appendChild(tag);
    }
    tag.setAttribute("content", content);
  }

    function removeAll(selector) {
    var nodes = document.querySelectorAll(selector);
    for (var i = 0; i < nodes.length; i++) {
      if (nodes[i].parentNode) { nodes[i].parentNode.removeChild(nodes[i]); }
    }
  }

    function injectSEO() {
    if (typeof document === "undefined" || !document.head) { return; }

        /* enlève les injections précédentes (idempotence, appelée à chaque setLocale) */
    removeAll("link[rel='canonical'][data-celtmen-seo]");
    removeAll("link[rel='alternate'][data-celtmen-seo]");
    removeAll("script[type='application/ld+json'][data-celtmen-seo]");

    /* canonical : URL de la page dans la langue courante */
    var canon = document.createElement("link");
    canon.setAttribute(SEO_TAG, "1");
    canon.rel = "canonical";
    canon.href = hrefFor(current);
    document.head.appendChild(canon);

    /* hreflang : variantes fr/en + x-default (URL propre, auto-détection) */
    SUPPORTED.forEach(function (loc) {
      var al = document.createElement("link");
      al.setAttribute(SEO_TAG, "1");
      al.rel = "alternate";
      al.hreflang = loc;
      al.href = hrefFor(loc);
      document.head.appendChild(al);
    });
    var xdef = document.createElement("link");
    xdef.setAttribute(SEO_TAG, "1");
    xdef.rel = "alternate";
    xdef.hreflang = "x-default";
    xdef.href = HOST + pagePath();
    document.head.appendChild(xdef);

    /* métas pour les crawlers */
    setTag("robots", "index, follow");
    setTag("googlebot", "index, follow");
    document.documentElement.setAttribute("lang", HTML_LANG[current]);

    /* données structurées JSON-LD (WebSite + Organization) */
    var prevLd = document.querySelector("script[type='application/ld+json'][\"" + SEO_TAG + "\"]");
    if (prevLd) { prevLd.parentNode.removeChild(prevLd); }
    var ld = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": t("meta.homeTitle"),
      "url": HOST,
      "inLanguage": SUPPORTED.join(","),
      "publisher": {
        "@type": "Organization",
        "name": t("ui.brand"),
        "url": HOST,
        "logo": { "@type": "ImageObject", "url": HOST + "/assets/optimized/logoCeltmen.png" }
      }
    };
    var script = document.createElement("script");
    script.setAttribute(SEO_TAG, "1");
    script.setAttribute("type", "application/ld+json");
    script.textContent = JSON.stringify(ld);
    document.head.appendChild(script);
  }

  /**
   * Détecte la langue puis traduit la page. Appelée automatiquement au
   * chargement du script (chargé en defer : le DOM est prêt).
   */
  function init() {
    current = detect();
    document.documentElement.lang = HTML_LANG[current];
    apply(document);
        buildSwitcher();
    injectSEO();
    reveal();
    global.addEventListener("load", reveal, { once: true });
    return current;
  }

  var I18N = {
    supported: SUPPORTED,
    defaultLocale: DEFAULT_LOCALE,
    labels: LOCALE_LABELS,
    htmlLang: HTML_LANG,
    translations: TRANSLATIONS,
    t: t,
    format: t,
    apply: apply,
    detect: detect,
    getLocale: function () { return current; },
    setLocale: setLocale,
    onChange: onChange,
    refresh: function () { apply(document); syncSwitcher(); }
  };

  global.I18N = I18N;
  if (typeof module !== "undefined" && module.exports) { module.exports = I18N; }

  if (typeof document !== "undefined" && document.documentElement) {
    init();
  }

})(typeof window !== "undefined" ? window : globalThis);