import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import confetti from 'canvas-confetti';
import CheckoutModal from './components/CheckoutModal';
import { 
  Zap, 
  ShieldCheck, 
  FileSpreadsheet, 
  FileText, 
  BookOpen, 
  CheckCircle2, 
  ArrowRight, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX,
  TrendingUp, 
  Clock, 
  Sliders, 
  Activity, 
  Layers, 
  Download, 
  ChevronRight, 
  ChevronLeft,
  DollarSign, 
  HardHat, 
  Sparkles,
  ExternalLink,
  ChevronDown,
  AlertCircle,
  RotateCw,
  Eye,
  FileCheck,
  Calculator,
  UserCheck,
  Calendar,
  AlertTriangle,
  FolderOpen,
  Lock,
  CreditCard
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [navScrolled, setNavScrolled] = useState(false);
  const [activeTabResource, setActiveTabResource] = useState('excel');


  // -------------------------------------------------------------
  // LECTEUR AUDIO RÉEL (Fichier MP3 voix haute définition de l'Ir. Jean Philippe)
  // Lancement automatique dès l'arrivée sur le site (avec gestion des règles d'autoplay des navigateurs)
  // -------------------------------------------------------------
  const audioRef = useRef(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioCurrentTime, setAudioCurrentTime] = useState(0);
  const [audioDuration, setAudioDuration] = useState(48); // secondes estimées
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [hasStartedAudio, setHasStartedAudio] = useState(false);

  // Tentative de lancement automatique dès l'arrivée du visiteur
  useEffect(() => {
    const startAudioPlay = () => {
      if (audioRef.current && !isPlayingAudio) {
        const promise = audioRef.current.play();
        if (promise !== undefined) {
          promise
            .then(() => {
              setIsPlayingAudio(true);
              setHasStartedAudio(true);
              // Succès : retrait des écouteurs de repli
              ['click', 'touchend', 'pointerdown'].forEach((evt) => {
                window.removeEventListener(evt, startAudioPlay);
              });
            })
            .catch((err) => {
              // Politique de blocage navigateur : reste en attente du premier tap utilisateur
              console.log("Lecture audio différée (en attente d'interaction utilisateur) :", err);
            });
        }
      }
    };

    // 1. Essai immédiat au chargement du composant
    startAudioPlay();

    // 2. Repli : dès que l'utilisateur touche ou clique l'écran (sans scroll qui n'est pas un geste valide)
    ['click', 'touchend', 'pointerdown'].forEach((evt) => {
      window.addEventListener(evt, startAudioPlay, { passive: true });
    });

    return () => {
      ['click', 'touchend', 'pointerdown'].forEach((evt) => {
        window.removeEventListener(evt, startAudioPlay);
      });
    };
  }, []);

  const toggleAudioPlay = () => {
    if (!audioRef.current) return;
    setHasStartedAudio(true);
    if (isPlayingAudio) {
      audioRef.current.pause();
      setIsPlayingAudio(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlayingAudio(true);
      }).catch((err) => {
        console.error("Audio playback error:", err);
      });
    }
  };

  const handleAudioTimeUpdate = () => {
    if (audioRef.current) {
      setAudioCurrentTime(audioRef.current.currentTime);
      if (audioRef.current.duration && !isNaN(audioRef.current.duration)) {
        setAudioDuration(audioRef.current.duration);
      }
    }
  };

  const handleAudioSeek = (e) => {
    const seekTime = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = seekTime;
      setAudioCurrentTime(seekTime);
    }
  };

  const formatAudioTime = (seconds) => {
    if (isNaN(seconds)) return "00:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // -------------------------------------------------------------
  // SECTION DÉMONSTRATION EN ACTION : 8 CLASSEURS EXCEL RÉELS
  // -------------------------------------------------------------
  const [selectedExcelIndex, setSelectedExcelIndex] = useState(0);
  const [debourseSecSlider, setDebourseSecSlider] = useState(606000); // FCFA
  const coefK = 1.38;
  const prixFacture = Math.round(debourseSecSlider * coefK);
  const margeNette = prixFacture - debourseSecSlider;
  const margePourcent = ((margeNette / prixFacture) * 100).toFixed(1);

  const excelFilesList = [
    { 
      id: "01", 
      name: "Matrice_Devis_Chiffrage_Chirurgical.xlsx", 
      tag: "Devis & Marge", 
      cat: "Rentabilité",
      badge: "Formule K=1.38",
      desc: "Chiffrage automatique des fournitures, main-d'œuvre et réintégration systématique des charges fixes."
    },
    { 
      id: "02", 
      name: "Radar_Impayes_Acomptes_40_30_30.xlsx", 
      tag: "Recouvrement", 
      cat: "Trésorerie",
      badge: "Verrou 40/30/30",
      desc: "Tableau de bord de suivi des paiements clients par chantier avec alertes automatiques et modèle de relance."
    },
    { 
      id: "03", 
      name: "Calculateur_Cout_Horaire_Compagnon_RH.xlsx", 
      tag: "Coûts Salaires", 
      cat: "Charges PME",
      badge: "Taux Horaire Vente",
      desc: "Décompose le salaire brut, primes de panier, transport et charges sociales pour calculer le coût effectif de chaque heure."
    },
    { 
      id: "04", 
      name: "Gestion_Stocks_Cables_Disjoncteurs.xlsx", 
      tag: "Inventaire", 
      cat: "Logistique",
      badge: "Seuils Critiques",
      desc: "Inventaire dynamique des bobines de cuivre, disjoncteurs et consommables avec alertes de réapprovisionnement."
    },
    { 
      id: "05", 
      name: "Bilan_Rentabilite_Reelle_Vs_Prevue.xlsx", 
      tag: "Bilan Chantier", 
      cat: "Contrôle",
      badge: "Écarts de Marge",
      desc: "Audit post-chantier pour comparer le prévisionnel aux dépenses réelles et détecter les dérives de main-d'œuvre."
    },
    { 
      id: "06", 
      name: "Planning_Hebdo_Affectation_Equipes.xlsx", 
      tag: "Planning", 
      cat: "Opérations",
      badge: "7 Jours / Chantiers",
      desc: "Calendrier opérationnel hebdomadaire d'affectation des techniciens pour éliminer les temps morts et retards."
    },
    { 
      id: "07", 
      name: "Calculateur_Avenants_Supplements.xlsx", 
      tag: "Suppléments", 
      cat: "Facturation",
      badge: "Anti-Travail Gratuit",
      desc: "Chiffrage instantané sur chantier de toute modification client avec génération du bon d'accord avant exécution."
    },
    { 
      id: "08", 
      name: "Tableau_Bord_Tresorerie_Bancaire.xlsx", 
      tag: "Cash-Flow", 
      cat: "Finances",
      badge: "Anticipation 4 Semaines",
      desc: "Projection des entrées et sorties de trésorerie pour ne plus jamais être pris au dépourvu pour la paie."
    },
  ];

  // -------------------------------------------------------------
  // SECTION DÉMONSTRATION EN ACTION : DOCUMENTS WORD OFFICIELS
  // -------------------------------------------------------------
  const [selectedWordIndex, setSelectedWordIndex] = useState(0);
  const wordFilesList = [
    {
      id: "01",
      title: "Contrat de Prestation de Travaux Électriques PME",
      subtitle: "CONTRAT CADRE OFFICIEL • NORMES NF C 15-100",
      desc: "Contrat complet avec calendrier de paiement ferme (40/30/30), clause résolutoire et réserve de propriété.",
      articles: [
        { num: "Article 1", title: "Objet de la Mission & Conformité", text: "L'installateur s'engage à exécuter les travaux conformément aux règles de l'art, au cahier des charges et aux normes de sécurité électrique NF C 15-100." },
        { num: "Article 2", title: "Calendrier de Paiement Inaliénable (40% / 30% / 30%)", text: "Acompte de 40% exigible à la signature avant approvisionnement des fournitures, 30% à mi-chantier (tirage de câbles achevé), et solde de 30% à la réception contradictoire." },
        { num: "Article 3", title: "Travaux Supplémentaires & Avenants Écrits", text: "Toute modification ou adjonction demandée par le client fera l'objet d'un avenant écrit chiffré au déboursé sec majoré du coefficient K, signé avant exécution." },
        { num: "Article 4", title: "Réserve de Propriété & Arrêt de Chantier", text: "Les matériels et appareillages installés demeurent la propriété de l'entreprise jusqu'au paiement intégral. Tout retard supérieur à 5 jours entraîne l'arrêt immédiat des prestations." }
      ]
    },
    {
      id: "02",
      title: "Procès-Verbal (PV) de Réception Définitive sans Réserve",
      subtitle: "DOCUMENT DE CLÔTURE • EXIGIBILITÉ DU SOLDE",
      desc: "Document officiel validant la conformité technique, déclenchant l'exigibilité immédiate du solde de 30%.",
      articles: [
        { num: "Contrôle 1", title: "Essais Différentiels & Mesures d'Isolement", text: "Déclenchement des disjoncteurs différentiels 30mA testé et conforme. Continuité du réseau de terre mesurée à 12 Ohms (conforme norme < 100 Ohms)." },
        { num: "Contrôle 2", title: "Repérage & Schémas Unifilaires", text: "Tableau repéré, circuits étiquetés, remise du schéma unifilaire de distribution et consignes de coupure générale au maître d'ouvrage." },
        { num: "Contrôle 3", title: "Déblocage Immédiat du Solde", text: "La signature du présent procès-verbal sans réserve emporte obligation de règlement du solde de 30% sous un délai maximum de 48 heures ouvrées." }
      ]
    },
    {
      id: "03",
      title: "Lettre de Relance Aimable J+7 pour Acompte en Attente",
      subtitle: "PROCÉDURE AMIABLE • MAINTIEN DU PLANNING",
      desc: "Courrier diplomatique et ferme rappelant le blocage de l'approvisionnement sans le versement de l'acompte.",
      articles: [
        { num: "Rappel", title: "Facture d'Acompte n° 2026-084", text: "Nous nous permettons de vous rappeler que la facture d'acompte de 40% émise le 12 courant selon bon de commande validé est arrivée à échéance." },
        { num: "Impact", title: "Réservation des Matériels chez le Grossiste", text: "Pour maintenir la date convenue de début des saignées et de pose des gaines, la commande des tourets de câble 3x2.5mm² requiert le déblocage dudit acompte." },
        { num: "Modalités", title: "Canaux de Règlement Instantané", text: "Règlement possible par virement bancaire ou paiement mobile direct (Wave / Orange Money / MTN) au numéro d'entreprise indiqué en en-tête." }
      ]
    },
    {
      id: "04",
      title: "Avenant Contractuel pour Travaux Supplémentaires Imprévus",
      subtitle: "BOUCLIER ANTI-PERTES • AVENANT CHANTIER",
      desc: "Le document qui met fin au travail gratuit en consignant immédiatement les ajouts demandés par le client.",
      articles: [
        { num: "Contexte", title: "Demande de Modification sur Chantier", text: "À la demande expresse du client lors de la visite du 18 courant, modification du plan initial : ajout de 6 prises 2P+T étanches et 2 départs climatisation." },
        { num: "Chiffrage", title: "Valorisation Ferme & Délais", text: "Montant total de l'avenant arrêté à la somme de 145 000 FCFA TTC. Délai d'exécution prorogé de 2 jours ouvrables. Acompte 50% exigible avant exécution." }
      ]
    },
    {
      id: "05",
      title: "Fiche d'Intervention Quotidienne & Rapport de Chantier",
      subtitle: "SUIVI TERRAIN • VALIDATION DES HEURES",
      desc: "Feuille de bord compagnon consignant les tâches accomplies, les fournitures consommées et l'émargement client.",
      articles: [
        { num: "Heures", title: "Pointage Compagnons sur Chantier", text: "Équipe présente de 8h00 à 17h30 : 1 Chef d'équipe + 2 compagnons électriciens. Tâches : tubage dalle R+1 et pose boîtes de dérivation." },
        { num: "Consommables", title: "Sorties de Fournitures Vérifiées", text: "Utilisation de 220 mètres de gaine ICTA Ø20, 4 bobines de fil H07V-U 2.5mm² et 18 pots d'encastrement scellés." }
      ]
    },
    {
      id: "06",
      title: "Contrat de Sous-Traitance Compagnon Électricien",
      subtitle: "SÉCURITÉ JURIDIQUE • DÉLÉGATION MAÎTRISÉE",
      desc: "Protège l'entreprise en cas de malfaçon d'un sous-traitant et impose le respect strict du calendrier.",
      articles: [
        { num: "Mission", title: "Périmètre d'Intervention Assigné", text: "Le sous-traitant s'engage à exécuter le tirage des lignes secondaires et raccordement des appareillages sous la supervision du chef d'équipe." },
        { num: "Garantie", title: "Reprise des Malfaçons à Charge Exclusive", text: "Toute non-conformité constatée lors des essais sera reprise immédiatement par le sous-traitant à ses frais exclusifs sans majoration de prix." }
      ]
    }
  ];

  // -------------------------------------------------------------
  // OFFRE UNIQUE & COMPLÈTE — LE SYSTÈME MÉTHODE EPR INTÉGRAL
  // (Demande explicite : Supprimer l'offre Livre seul et l'accompagnement personnalisé,
  // focaliser exclusivement sur l'offre unique complète à 15,80 $US / ~10 000 FCFA / 15,80 €)
  // -------------------------------------------------------------
  const uniqueOffer = {
    id: 1,
    badge: "OFFRE UNIQUE COMPLÈTE // LE SYSTÈME INTÉGRAL CLÉ EN MAIN",
    title: "Le Pack Système Méthode EPR",
    shortTitle: "Pack Système Intégral",
    tagline: "L'arme absolue : Le Livre Fondateur (222 pages) + Les 35 Fichiers Excel Automatisés + Les 30 Modèles Juridiques Word + La Note Vocale. Clé en main.",
    priceUSD: "15,80 $US",
    priceEUR: "15,80 €",
    priceFCFA: "~10 000 FCFA",
    shortFCFA: "~10 000 F",
    oldPriceUSD: "97,00 $US",
    oldPriceFCFA: "65 000 FCFA",
    realValueFCFA: "145 000 FCFA",
    discountTag: "-84% DE RÉDUCTION IMMÉDIATE",
    isPopular: true,
    popularTag: "★ ACCÈS IMMÉDIAT AU SYSTÈME INTÉGRAL (TOUS LES OUTILS INCLUS)",
    ctaText: "Obtenir le Système Intégral — 15,80 $US (~10 000 FCFA)",
    features: [
      { text: "Livre Fondateur complet de l'Ingénieur (PDF HD 222 pages — 9 Piliers fondamentaux)", included: true },
      { text: "Pack Complet de 35 Classeurs Excel de Rentabilité, Stocks & Finances", included: true },
      { text: "Système de Gestion des Stocks automatisé avec macros VBA (EPR Stock V3)", included: true },
      { text: "Cockpit Rentabilité Chantier en temps réel (Devisé vs Réalisé au centime près)", included: true },
      { text: "Calculateur de Marge brute & simulateur du Taux Horaire réel", included: true },
      { text: "Radar Facturation, Échéanciers & Relance automatique des impayés", included: true },
      { text: "30 Documents Administratifs & Juridiques Word modifiables (.docx)", included: true },
      { text: "Fiche Modification & Travaux Supplémentaires (Avenants anti-perte)", included: true },
      { text: "Contrats types sous-traitance, Procédures d'ouverture et PV de réception", included: true },
      { text: "Note Vocale d'accompagnement audio de l'Ir. Jean Philippe (Voix HD)", included: true },
      { text: "Téléchargement immédiat de l'archive .ZIP complète dès confirmation", included: true },
      { text: "Accès à vie sans abonnement mensuel et mises à jour gratuites", included: true }
    ]
  };

  const priceTiers = [uniqueOffer];
  const activePriceIndex = 0;

  // État Modale & Tunnel de Commande Chariow 100% sur la même page
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [orderClientName, setOrderClientName] = useState('');
  const [orderPhone, setOrderPhone] = useState('');
  const [orderEmail, setOrderEmail] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('wave');
  const [formErrors, setFormErrors] = useState({});
  const [isSubmittingOrder, setIsSubmittingOrder] = useState(false);

  // Validation obligatoire des coordonnées avant redirection Chariow
  const validateOrderForm = () => {
    const errors = {};
    const cleanName = orderClientName.trim();
    const cleanPhone = orderPhone.trim();
    const cleanEmail = orderEmail.trim();

    if (!cleanName) {
      errors.name = "Veuillez renseigner votre nom complet ou le nom de votre entreprise.";
    } else if (cleanName.length < 2) {
      errors.name = "Le nom doit comporter au moins 2 caractères.";
    }

    if (!cleanPhone) {
      errors.phone = "Veuillez renseigner votre numéro WhatsApp / téléphone.";
    } else {
      const digitsOnly = cleanPhone.replace(/[^0-9]/g, '');
      if (digitsOnly.length < 8) {
        errors.phone = "Veuillez renseigner un numéro valide (minimum 8 chiffres).";
      }
    }

    if (!cleanEmail) {
      errors.email = "Veuillez renseigner votre adresse email pour recevoir le lien du pack.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      errors.email = "Format d'email invalide (ex: contact@entreprise.com).";
    }

    return errors;
  };

  // Traitement de la commande avec vérification des champs
  const handleOrderSubmit = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (isSubmittingOrder) return;

    const errors = validateOrderForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      
      // Auto-focus sur le premier champ invalide
      if (errors.name) {
        const el = document.getElementById('order-client-name');
        el?.focus();
        el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else if (errors.phone) {
        const el = document.getElementById('order-phone');
        el?.focus();
        el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else if (errors.email) {
        const el = document.getElementById('order-email');
        el?.focus();
        el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    // Tout est valide : déclenchement du paiement et transmission des coordonnées
    setFormErrors({});
    setIsSubmittingOrder(true);
    handlePurchaseClick();

    // Construction de l'URL sécurisée Chariow avec les données saisies
    const baseUrl = "https://zpkvlptl.mychariow.shop/la-methode-epr/checkout";
    const params = new URLSearchParams();
    if (orderClientName.trim()) params.append("name", orderClientName.trim());
    if (orderEmail.trim()) params.append("email", orderEmail.trim());
    if (orderPhone.trim()) params.append("phone", orderPhone.trim());
    if (selectedPaymentMethod) params.append("payment_method", selectedPaymentMethod);
    const targetUrl = `${baseUrl}?${params.toString()}`;

    // Redirection fluide après un court retour visuel
    setTimeout(() => {
      window.location.href = targetUrl;
    }, 600);
  };

  // Redirection fluide vers la section paiement 100% dans la même page
  const handleGoToPayment = () => {
    handlePurchaseClick();
    const paymentEl = document.getElementById('paiement');
    if (paymentEl) {
      paymentEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      setIsCheckoutModalOpen(true);
    }
  };

  // -------------------------------------------------------------
  // Animations GSAP
  // -------------------------------------------------------------
  const mainRef = useRef(null);
  const heroRef = useRef(null);
  const manifestoRef = useRef(null);
  const stickyProtocolRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setNavScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        manifestoRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: manifestoRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          }
        }
      );

      const stackCards = gsap.utils.toArray('.sticky-protocol-card');
      stackCards.forEach((card, index) => {
        if (index < stackCards.length - 1) {
          ScrollTrigger.create({
            trigger: card,
            start: "top top+=100",
            endTrigger: stackCards[index + 1],
            end: "top top+=100",
            scrub: true,
            onUpdate: (self) => {
              const progress = self.progress;
              gsap.to(card, {
                scale: 1 - progress * 0.08,
                opacity: 1 - progress * 0.45,
                filter: `blur(${progress * 16}px)`,
                ease: "power2.inOut",
                overwrite: "auto"
              });
            }
          });
        }
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  const handlePurchaseClick = () => {
    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.7 },
      colors: ['#F5C518', '#FFD700', '#ffffff', '#4A0E17']
    });
  };

  const CHARIOW_URL = "https://zpkvlptl.mychariow.shop/la-methode-epr";

  return (
    <div ref={mainRef} className="relative min-h-screen bg-[#0D0D12] text-[#FAF8F5] font-sans selection:bg-[#F5C518] selection:text-[#0D0D12] overflow-x-hidden w-full max-w-full">
      
      {/* BALISE AUDIO RÉELLE (Voix Studio Haute Définition) */}
      <audio 
        ref={audioRef}
        src="./assets/note-vocale-jean-philippe.mp3"
        preload="auto"
        autoPlay
        onTimeUpdate={handleAudioTimeUpdate}
        onLoadedMetadata={handleAudioTimeUpdate}
        onEnded={() => setIsPlayingAudio(false)}
      />

      {/* OVERLAY DE BRUIT SVG INLINE (feTurbulence - 0.05 Opacité) */}
      <svg className="noise-overlay" aria-hidden="true">
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>

      {/* A. NAVBAR — "L'Île Flottante" */}
      <header className="fixed top-5 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
        <nav 
          className={`pointer-events-auto flex items-center justify-between gap-4 sm:gap-8 px-5 sm:px-7 py-3 rounded-full transition-all duration-500 max-w-5xl w-full ${
            navScrolled 
              ? "bg-[#0D0D12]/85 backdrop-blur-xl border border-gold/25 shadow-2xl shadow-black/80 py-2.5" 
              : "bg-[#161622]/60 backdrop-blur-md border border-white/10"
          }`}
        >
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold via-yellow-500 to-amber-700 flex items-center justify-center text-[#0D0D12] shadow-gold-sm font-black text-sm tracking-tighter">
              <Zap className="w-4 h-4 fill-current" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-sm sm:text-base tracking-tight text-white group-hover:text-gold transition-colors">
                MÉTHODE <span className="text-gold">EPR</span>
              </span>
              <span className="text-[9px] uppercase tracking-widest text-slateCustom-text font-mono -mt-1 hidden sm:block">
                Système PME Électricité
              </span>
            </div>
          </a>

          <div className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-300">
            <a href="#outils-en-action" className="link-hover-lift hover:text-gold transition-colors">
              Fichiers en Action
            </a>
            <a href="#note-vocale" className="link-hover-lift hover:text-gold transition-colors">
              Note Vocale Auteur
            </a>
            <a href="#manifeste" className="link-hover-lift hover:text-gold transition-colors">
              Le Manifeste
            </a>
            <a href="#protocole" className="link-hover-lift hover:text-gold transition-colors">
              Protocole en 3 Étapes
            </a>
            <a href="#tarifs" className="link-hover-lift hover:text-gold transition-colors">
              Tarifs
            </a>
            <a href="#paiement" className="link-hover-lift text-gold hover:text-white font-semibold transition-colors">
              Commander Chariow
            </a>
          </div>

          <button
            type="button"
            onClick={() => handleGoToPayment(1)}
            className="btn-magnetic px-4 sm:px-5 py-2 rounded-full bg-gradient-to-r from-gold via-yellow-400 to-gold text-[#0D0D12] font-display font-bold text-xs tracking-wide shadow-gold-sm cursor-pointer"
          >
            <span className="slide-layer"></span>
            <span className="relative z-10 flex items-center gap-1.5">
              <span>Débloquer le Pack</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </button>
        </nav>
      </header>

      {/* B. SECTION HERO — L'ENTREPRENEUR & FEUILLES VOLANTES */}
      <section 
        ref={heroRef}
        className="relative min-h-[100dvh] w-full flex flex-col justify-center pt-28 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-12 lg:px-20 overflow-hidden max-w-full"
      >
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden max-w-full">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[140px] pointer-events-none animate-pulse-glow"></div>
          <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-[#4A0E17]/25 rounded-full blur-[160px] pointer-events-none"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0D0D12]/40 to-[#0D0D12]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* GAUCHE : Copywriting */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-gold animate-ping"></span>
              <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-gold">
                Système d'Exploitation PME • BTP & Électricité Africaine
              </span>
            </div>

            <div className="space-y-1 sm:space-y-2">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-white leading-tight">
                L'Artisan Bâtisseur rencontre
              </h1>
              <p className="text-4xl sm:text-6xl lg:text-7xl font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-gold via-yellow-200 to-amber-400 font-normal leading-tight drop-shadow-md">
                La Haute Précision Financière.
              </p>
            </div>

            <p className="text-sm sm:text-lg text-slate-300 max-w-xl font-light leading-relaxed">
              <strong className="text-white font-medium">Vous travaillez dur, les chantiers s'enchaînent, mais où passe votre argent ?</strong><br />
              LA MÉTHODE EPR arme les électriciens d'un cockpit de gestion complet : 
              le <span className="text-gold font-semibold">Livre Fondateur de 222 pages</span>, <span className="text-gold font-semibold">35 Tableaux de Bord Excel</span> et <span className="text-gold font-semibold">30 Modèles Word</span> pour stopper les fuites et verrouiller votre marge.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                type="button"
                onClick={() => handleGoToPayment(1)}
                className="btn-magnetic px-8 py-4 rounded-2xl bg-gradient-to-r from-gold via-yellow-400 to-amber-500 text-[#0D0D12] font-display font-black text-sm tracking-wide shadow-gold-glow flex items-center justify-center gap-3 cursor-pointer"
              >
                <span className="slide-layer"></span>
                <span className="relative z-10 flex items-center gap-2">
                  <Download className="w-4 h-4 stroke-[2.5]" />
                  <span>Obtenir le Pack Complet — 15,80 $US (~10 000 FCFA)</span>
                </span>
              </button>

              <button
                type="button"
                onClick={toggleAudioPlay}
                className="px-6 py-4 rounded-2xl bg-gold/15 hover:bg-gold/25 text-gold font-display font-semibold text-xs tracking-wider border border-gold/40 hover:border-gold transition-all flex items-center justify-center gap-2 text-center cursor-pointer shadow-gold-sm"
              >
                <Volume2 className={`w-4 h-4 shrink-0 ${isPlayingAudio ? "text-emerald-400 animate-pulse" : "text-gold"}`} />
                <span>{isPlayingAudio ? "Pause Note Vocale (48s)" : "Écouter la Note Vocale (48s) ▶"}</span>
              </button>

              <a
                href="#outils-en-action"
                className="px-6 py-4 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-display font-semibold text-xs tracking-wider border border-white/10 hover:border-gold/30 transition-all flex items-center justify-center gap-2 text-center"
              >
                <Eye className="w-4 h-4 text-gold" />
                <span>Voir les Fichiers en Action</span>
              </a>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-400 font-mono">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-gold" />
                <span>Paiement Sécurisé Mobile Money</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>65 Fichiers Téléchargeables (.ZIP)</span>
              </div>
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4 text-amber-400" />
                <span>Excel & Word 100% Modifiables</span>
              </div>
            </div>
          </div>

          {/* DROITE : L'Entrepreneur en Photo entouré de ses Feuilles en Lévitation */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-tr from-gold/20 via-amber-600/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative w-full max-w-md mx-auto">

              {/* FEUILLE VOLANTE 1 (Haut Gauche) - Masquée sur mobile pour éliminer tout débordement */}
              <div className="hidden lg:block absolute -top-10 -left-6 sm:-left-10 z-20 animate-float-slow w-48 sm:w-56 p-3.5 rounded-2xl bg-[#161622]/95 border border-white/15 backdrop-blur-xl shadow-2xl transform -rotate-6 hover:rotate-0 transition-transform">
                <div className="flex items-center justify-between pb-2 border-b border-white/10 text-[9px] font-mono text-slate-400">
                  <div className="flex items-center gap-1.5 text-blue-400 font-bold">
                    <FileText className="w-3 h-3" />
                    <span>FACTURE CHANTIER</span>
                  </div>
                  <span className="text-emerald-400 font-bold">N° 2026-084</span>
                </div>
                <div className="py-2 space-y-1 text-[10px]">
                  <p className="font-semibold text-white truncate">Villa Duplex R+2</p>
                  <div className="flex justify-between text-slate-300 font-mono text-[9px]">
                    <span>Déboursé sec :</span>
                    <span className="font-bold text-white">2 450 000 F</span>
                  </div>
                  <div className="flex justify-between text-gold font-mono text-[9px]">
                    <span>Acompte 40% :</span>
                    <span className="font-bold">980 000 F ✓</span>
                  </div>
                </div>
                <div className="pt-1.5 border-t border-white/5 flex items-center justify-between text-[8px] font-mono text-emerald-400">
                  <span>ENCAISSÉ MOBILE MONEY</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                </div>
              </div>

              {/* FEUILLE VOLANTE 2 (Haut Droite) - Masquée sur mobile pour éliminer tout débordement */}
              <div className="hidden lg:block absolute -top-8 -right-4 sm:-right-8 z-20 animate-float-reverse w-48 sm:w-56 p-3.5 rounded-2xl bg-[#161622]/95 border border-gold/30 backdrop-blur-xl shadow-2xl transform rotate-6 hover:rotate-0 transition-transform">
                <div className="flex items-center justify-between pb-2 border-b border-white/10 text-[9px] font-mono text-slate-400">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                    <FileSpreadsheet className="w-3 h-3" />
                    <span>CALCULATEUR K</span>
                  </div>
                  <span className="text-gold font-bold">EXCEL_EPR</span>
                </div>
                <div className="py-2 space-y-1 text-[10px]">
                  <div className="flex justify-between text-slate-300 font-mono text-[9px]">
                    <span>Frais Généraux K :</span>
                    <span className="text-gold font-bold">1.38</span>
                  </div>
                  <div className="flex justify-between text-slate-300 font-mono text-[9px]">
                    <span>Marge Nette Cible :</span>
                    <span className="text-emerald-400 font-bold">+24.0%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden mt-1">
                    <div className="h-full bg-gradient-to-r from-gold to-emerald-400 w-4/5"></div>
                  </div>
                </div>
                <div className="pt-1.5 border-t border-white/5 text-[8px] font-mono text-slate-400 flex justify-between">
                  <span>0% PERTE DÉTECTÉE</span>
                  <span className="text-gold font-bold">SÉCURISÉ ✓</span>
                </div>
              </div>

              {/* CARTE CENTRALE : Portrait de l'Entrepreneur */}
              <div className="relative z-10 rounded-[3rem] p-2.5 bg-gradient-to-b from-gold/40 via-white/10 to-transparent border-2 border-gold/30 shadow-2xl shadow-black/80 overflow-hidden group">
                <div className="relative rounded-[2.5rem] overflow-hidden bg-[#161622] aspect-[4/5] sm:aspect-[3/4]">
                  <img 
                    src="./assets/portrait-electricien-ingenieur-hd.jpg" 
                    alt="Ir. Jean Philippe - Entrepreneur & Ingénieur Méthode EPR" 
                    className="w-full h-full object-cover object-top filter brightness-105 contrast-110 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D12] via-[#0D0D12]/20 to-transparent"></div>
                  
                  <div className="absolute bottom-4 inset-x-4 p-4 rounded-2xl bg-[#0D0D12]/85 backdrop-blur-md border border-white/15 space-y-1 shadow-lg">
                    <div className="flex items-center justify-between">
                      <span className="font-display font-extrabold text-sm sm:text-base text-white">
                        Ir. Jean Philippe
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-gold/20 text-gold border border-gold/30 font-bold">
                        Auteur & Consultant
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300 font-light leading-tight">
                      Praticien terrain, formateur de plus de 500 patrons de PME électricité en Afrique.
                    </p>
                  </div>
                </div>
              </div>

              {/* FEUILLE VOLANTE 3 (Bas Gauche) - Masquée sur mobile pour éliminer tout débordement */}
              <div className="hidden lg:block absolute -bottom-6 -left-4 sm:-left-8 z-20 animate-float-soft w-48 sm:w-52 p-3 rounded-2xl bg-[#161622]/95 border border-white/15 backdrop-blur-xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform">
                <div className="flex items-center gap-1.5 text-[9px] font-mono text-gold font-bold mb-1">
                  <ShieldCheck className="w-3 h-3" />
                  <span>CONTRAT SOUS-TRAITANCE</span>
                </div>
                <p className="text-[10px] text-slate-200 font-medium">Article 3 : Avenants Écrits</p>
                <div className="mt-1 flex items-center justify-between text-[8px] font-mono text-slate-400">
                  <span>Signé & Tamponné</span>
                  <span className="text-emerald-400 font-bold">VALIDE ✓</span>
                </div>
              </div>

              {/* FEUILLE VOLANTE 4 (Bas Droite) - Masquée sur mobile pour éliminer tout débordement */}
              <div className="hidden lg:block absolute -bottom-8 -right-4 sm:-right-6 z-20 animate-float-slow w-48 sm:w-56 p-3 rounded-2xl bg-[#1A1A26]/95 border border-gold/40 backdrop-blur-xl shadow-gold-sm transform -rotate-4 hover:rotate-0 transition-transform flex items-center gap-3">
                <img 
                  src="./assets/mockup-pack-3d.png" 
                  alt="Pack 3D Méthode EPR" 
                  className="w-12 h-12 object-contain shrink-0 filter drop-shadow-md"
                />
                <div className="space-y-0.5">
                  <span className="font-mono text-[9px] text-gold font-bold uppercase">Système Complet</span>
                  <p className="text-[11px] font-display font-extrabold text-white leading-tight">
                    65 Outils Clé en Main
                  </p>
                  <p className="text-[8px] font-mono text-emerald-400">ZIP Téléchargeable</p>
                </div>
              </div>

              {/* BADGES RECADRÉS FLUIDES POUR MOBILE (< 1024px) - 100% dans l'écran, 0 débordement */}
              <div className="lg:hidden grid grid-cols-2 gap-2.5 mt-4 w-full">
                <div className="p-3 rounded-2xl bg-[#161622]/95 border border-white/15 backdrop-blur-md flex flex-col justify-between">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 font-bold">
                    <FileSpreadsheet className="w-3.5 h-3.5" />
                    <span>CALCULATEUR K</span>
                  </div>
                  <div className="mt-1 flex items-baseline justify-between">
                    <span className="text-[10px] font-mono text-slate-300">Frais K :</span>
                    <span className="text-xs font-mono font-bold text-gold">1.38</span>
                  </div>
                  <span className="text-[9px] font-mono text-emerald-400 mt-0.5">Marge nette +24%</span>
                </div>

                <div className="p-3 rounded-2xl bg-[#161622]/95 border border-gold/30 backdrop-blur-md flex flex-col justify-between">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-gold font-bold">
                    <FileText className="w-3.5 h-3.5" />
                    <span>65 OUTILS INCLUS</span>
                  </div>
                  <div className="mt-1 flex items-baseline justify-between">
                    <span className="text-[10px] font-mono text-slate-300">Pack Pro :</span>
                    <span className="text-xs font-mono font-bold text-white">ZIP Prêt</span>
                  </div>
                  <span className="text-[9px] font-mono text-gold mt-0.5">Excel & Word</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* C. SECTION SHOWCASE : LES 65 FICHIERS EN ACTION DIRECTE (Point 1 demandé) */}
      <section id="outils-en-action" className="py-24 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto space-y-16">
        
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-mono font-bold tracking-widest uppercase">
            <span>Démonstration Pratique & Interactive // 65 Outils Réels</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            Les Fichiers en Action Directe.
          </h2>
          <p className="text-sm sm:text-base text-slate-400 font-light leading-relaxed">
            Ne lisez pas de simples résumés : explorez les feuilles de calcul, simulez vos prix au centime et inspectez les clauses juridiques réelles que vous utiliserez dès demain.
          </p>
        </div>

        {/* Sélecteur d'Onglets de Démonstration */}
        <div className="flex justify-center">
          <div className="inline-flex p-1.5 rounded-2xl bg-[#161622] border border-white/10 gap-2">
            <button
              onClick={() => setActiveTabResource('excel')}
              className={`px-5 py-2.5 rounded-xl font-display text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTabResource === 'excel'
                  ? "bg-gold text-[#0D0D12] shadow-gold-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>35 Classeurs Excel de Gestion</span>
            </button>

            <button
              onClick={() => setActiveTabResource('word')}
              className={`px-5 py-2.5 rounded-xl font-display text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTabResource === 'word'
                  ? "bg-gold text-[#0D0D12] shadow-gold-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>30 Modèles Administratifs Word</span>
            </button>

            <button
              onClick={() => setActiveTabResource('livre')}
              className={`px-5 py-2.5 rounded-xl font-display text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTabResource === 'livre'
                  ? "bg-gold text-[#0D0D12] shadow-gold-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Livre Fondateur (222 Pages)</span>
            </button>
          </div>
        </div>

        {/* CONTENEUR DE LA FENÊTRE LOGICIELLE EN ACTION */}
        <div className="bg-[#161622] border border-white/15 rounded-[2.5rem] p-6 sm:p-10 shadow-2xl overflow-hidden space-y-8">
          
          {/* ========================================================= */}
          {/* TAB 1 : TABLEURS EXCEL EN ACTION                          */}
          {/* ========================================================= */}
          {activeTabResource === 'excel' && (
            <div className="space-y-8 animate-fadeIn">
              
              {/* Barre de contrôle du fichier actif */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 font-bold border border-emerald-500/25">
                      FEUILLE N° {excelFilesList[selectedExcelIndex].id} / 35
                    </span>
                    <span className="text-xs text-gold font-mono font-bold">
                      {excelFilesList[selectedExcelIndex].badge}
                    </span>
                    <span className="text-xs text-slate-400 font-mono hidden sm:inline">
                      • {excelFilesList[selectedExcelIndex].cat}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-display font-bold text-white flex items-center gap-2">
                    <FileSpreadsheet className="w-5 h-5 text-emerald-400" />
                    <span>{excelFilesList[selectedExcelIndex].name}</span>
                  </h3>
                  <p className="text-xs text-slate-300 font-light">
                    {excelFilesList[selectedExcelIndex].desc}
                  </p>
                </div>

                {/* Sélecteur des 8 Feuilles Clés */}
                <div className="flex flex-wrap gap-1.5 max-w-xl">
                  {excelFilesList.map((file, idx) => (
                    <button
                      key={file.id}
                      onClick={() => setSelectedExcelIndex(idx)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                        selectedExcelIndex === idx
                          ? "bg-gold text-[#0D0D12] font-bold shadow-sm"
                          : "bg-[#0D0D12] text-slate-400 hover:text-white border border-white/5"
                      }`}
                    >
                      Feuille {file.id}
                    </button>
                  ))}
                </div>
              </div>

              {/* AFFICHAGE EN FONCTION DU FICHIER SÉLECTIONNÉ */}

              {/* Cas A : Feuille 01 - Matrice Devis & Marge */}
              {selectedExcelIndex === 0 && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="p-5 rounded-2xl bg-[#0D0D12] border border-gold/30 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <span className="font-mono text-[11px] uppercase tracking-wider text-gold font-bold">
                          Simulateur Dynamique de Chiffrage
                        </span>
                        <p className="text-xs text-slate-400">
                          Ajustez le curseur de déboursé sec pour observer le recalcul instantané du prix client et de la marge avec K=1.38 :
                        </p>
                      </div>
                      <div className="flex items-center gap-4 bg-[#161622] px-4 py-2 rounded-xl border border-white/10 shrink-0">
                        <span className="text-xs font-mono text-slate-400">Déboursé :</span>
                        <span className="text-sm font-mono font-bold text-white">
                          {debourseSecSlider.toLocaleString()} FCFA
                        </span>
                      </div>
                    </div>

                    <input 
                      type="range" 
                      min="200000" 
                      max="3000000" 
                      step="50000"
                      value={debourseSecSlider}
                      onChange={(e) => setDebourseSecSlider(Number(e.target.value))}
                      className="w-full accent-[#F5C518] cursor-pointer"
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                      <div className="p-3 rounded-xl bg-[#161622] border border-white/5">
                        <span className="text-[10px] font-mono text-slate-400 uppercase">Prix Facturé Client</span>
                        <p className="text-lg font-mono font-black text-gold">
                          {prixFacture.toLocaleString()} FCFA
                        </p>
                      </div>
                      <div className="p-3 rounded-xl bg-[#161622] border border-white/5">
                        <span className="text-[10px] font-mono text-slate-400 uppercase">Marge Nette de l'Entreprise</span>
                        <p className="text-lg font-mono font-black text-emerald-400">
                          +{margeNette.toLocaleString()} FCFA
                        </p>
                      </div>
                      <div className="p-3 rounded-xl bg-[#161622] border border-white/5">
                        <span className="text-[10px] font-mono text-slate-400 uppercase">Taux de Marge Réel</span>
                        <p className="text-lg font-mono font-black text-white">
                          {margePourcent}% net
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Tableau du devis */}
                  <div className="rounded-2xl bg-[#09090D] border border-white/10 overflow-hidden shadow-inner w-full max-w-full">
                    <div className="flex items-center gap-3 px-4 py-2 border-b border-white/10 bg-[#12121A] text-xs font-mono text-slate-400">
                      <span className="text-gold font-bold">fx</span>
                      <span className="text-white truncate">=ARRONDI(SOMME(E2:E5) * Coefficient_K_1.38 ; -2)</span>
                    </div>

                    <div className="lg:hidden px-3 py-1.5 bg-amber-500/10 border-b border-amber-500/20 text-[10px] font-mono text-amber-300 flex items-center justify-between">
                      <span>👉 Glissez horizontalement pour voir toutes les colonnes</span>
                      <span className="text-gold font-bold">6 colonnes</span>
                    </div>

                    <div className="overflow-x-auto w-full max-w-full">
                      <table className="w-full text-left font-mono text-xs border-collapse min-w-[620px]">
                      <thead>
                        <tr className="bg-[#181824] text-slate-400 border-b border-white/10">
                          <th className="py-2.5 px-3 border-r border-white/5 w-12 text-center text-slate-600">#</th>
                          <th className="py-2.5 px-4 border-r border-white/5 text-slate-300">DÉSIGNATION DES OUVRAGES</th>
                          <th className="py-2.5 px-3 border-r border-white/5 text-right">QTÉ</th>
                          <th className="py-2.5 px-4 border-r border-white/5 text-right">PRIX UNIT.</th>
                          <th className="py-2.5 px-4 border-r border-white/5 text-right">DÉBOURSÉ SEC</th>
                          <th className="py-2.5 px-4 text-right text-gold">FACTURÉ CLIENT</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 text-slate-300">
                        <tr className="hover:bg-white/5">
                          <td className="py-2 px-3 text-center text-slate-600 bg-[#12121A]">1</td>
                          <td className="py-2 px-4 font-sans text-white font-medium">Câble Cuivre R2V 3x2.5mm² (couronne 100m)</td>
                          <td className="py-2 px-3 text-right">4</td>
                          <td className="py-2 px-4 text-right">45 000 F</td>
                          <td className="py-2 px-4 text-right">180 000 F</td>
                          <td className="py-2 px-4 text-right font-bold text-gold">248 400 F</td>
                        </tr>
                        <tr className="hover:bg-white/5">
                          <td className="py-2 px-3 text-center text-slate-600 bg-[#12121A]">2</td>
                          <td className="py-2 px-4 font-sans text-white font-medium">Tableau Divisionnaire 24 Modules équipé Legrand</td>
                          <td className="py-2 px-3 text-right">2</td>
                          <td className="py-2 px-4 text-right">65 000 F</td>
                          <td className="py-2 px-4 text-right">130 000 F</td>
                          <td className="py-2 px-4 text-right font-bold text-gold">179 400 F</td>
                        </tr>
                        <tr className="hover:bg-white/5">
                          <td className="py-2 px-3 text-center text-slate-600 bg-[#12121A]">3</td>
                          <td className="py-2 px-4 font-sans text-white font-medium">Disjoncteurs Différentiels 30mA Type A</td>
                          <td className="py-2 px-3 text-right">6</td>
                          <td className="py-2 px-4 text-right">18 500 F</td>
                          <td className="py-2 px-4 text-right">111 000 F</td>
                          <td className="py-2 px-4 text-right font-bold text-gold">153 180 F</td>
                        </tr>
                        <tr className="hover:bg-white/5">
                          <td className="py-2 px-3 text-center text-slate-600 bg-[#12121A]">4</td>
                          <td className="py-2 px-4 font-sans text-white font-medium">Main d'œuvre : Chef d'équipe + 2 compagnons (5j)</td>
                          <td className="py-2 px-3 text-right">1</td>
                          <td className="py-2 px-4 text-right">185 000 F</td>
                          <td className="py-2 px-4 text-right">185 000 F</td>
                          <td className="py-2 px-4 text-right font-bold text-gold">255 300 F</td>
                        </tr>
                      </tbody>
                    </table>
                    </div>
                  </div>
                </div>
              )}

              {/* Cas B : Feuille 02 - Radar d'Impayés & Acomptes */}
              {selectedExcelIndex === 1 && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    <div className="p-3.5 rounded-xl bg-[#0D0D12] border border-emerald-500/30">
                      <span className="text-[10px] font-mono text-slate-400">Total Encaissé (Acomptes)</span>
                      <p className="text-lg font-mono font-bold text-emerald-400">4 850 000 FCFA</p>
                    </div>
                    <div className="p-3.5 rounded-xl bg-[#0D0D12] border border-amber-500/30">
                      <span className="text-[10px] font-mono text-slate-400">Tranches 30% en Attente</span>
                      <p className="text-lg font-mono font-bold text-gold">2 420 000 FCFA</p>
                    </div>
                    <div className="p-3.5 rounded-xl bg-[#0D0D12] border border-red-500/30">
                      <span className="text-[10px] font-mono text-slate-400">Soldes Dépassés (&gt; J+7)</span>
                      <p className="text-lg font-mono font-bold text-red-400">850 000 FCFA</p>
                    </div>
                    <div className="p-3.5 rounded-xl bg-[#0D0D12] border border-white/10">
                      <span className="text-[10px] font-mono text-slate-400">Taux de Recouvrement</span>
                      <p className="text-lg font-mono font-bold text-white">92.4%</p>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-[#09090D] border border-white/10 overflow-hidden shadow-inner w-full max-w-full">
                    <div className="lg:hidden px-3 py-1.5 bg-amber-500/10 border-b border-amber-500/20 text-[10px] font-mono text-amber-300 flex items-center justify-between">
                      <span>👉 Glissez horizontalement pour voir toutes les colonnes</span>
                      <span className="text-gold font-bold">6 colonnes</span>
                    </div>

                    <div className="overflow-x-auto w-full max-w-full">
                      <table className="w-full text-left font-mono text-xs border-collapse min-w-[680px]">
                      <thead>
                        <tr className="bg-[#181824] text-slate-400 border-b border-white/10">
                          <th className="py-2.5 px-4 text-slate-300">CLIENT / CHANTIER</th>
                          <th className="py-2.5 px-3 text-right">TOTAL DEVIS</th>
                          <th className="py-2.5 px-3 text-center">ACOMPTE 40%</th>
                          <th className="py-2.5 px-3 text-center">TRANCHE 30%</th>
                          <th className="py-2.5 px-3 text-center">SOLDE 30%</th>
                          <th className="py-2.5 px-3 text-center">ACTION</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 text-slate-300">
                        <tr className="hover:bg-white/5">
                          <td className="py-2.5 px-4 font-sans text-white font-medium">Résidence Riviera (Villa R+2)</td>
                          <td className="py-2.5 px-3 text-right">3 200 000 F</td>
                          <td className="py-2.5 px-3 text-center"><span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px]">PAYÉ (Wave)</span></td>
                          <td className="py-2.5 px-3 text-center"><span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px]">PAYÉ</span></td>
                          <td className="py-2.5 px-3 text-center"><span className="px-2 py-0.5 rounded bg-amber-500/20 text-gold text-[10px]">Attente PV</span></td>
                          <td className="py-2.5 px-3 text-center"><span className="text-slate-400 text-[11px]">En cours</span></td>
                        </tr>
                        <tr className="hover:bg-white/5">
                          <td className="py-2.5 px-4 font-sans text-white font-medium">Pharmacie du Plateau</td>
                          <td className="py-2.5 px-3 text-right">1 850 000 F</td>
                          <td className="py-2.5 px-3 text-center"><span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px]">PAYÉ</span></td>
                          <td className="py-2.5 px-3 text-center"><span className="px-2 py-0.5 rounded bg-red-500/20 text-red-400 text-[10px]">Retard J+8</span></td>
                          <td className="py-2.5 px-3 text-center"><span className="text-slate-500 text-[10px]">À émettre</span></td>
                          <td className="py-2.5 px-3 text-center"><button className="px-2 py-0.5 rounded bg-gold text-[#0D0D12] font-bold text-[10px]">Relance J+7</button></td>
                        </tr>
                        <tr className="hover:bg-white/5">
                          <td className="py-2.5 px-4 font-sans text-white font-medium">Clinique Deux Plateaux</td>
                          <td className="py-2.5 px-3 text-right">5 400 000 F</td>
                          <td className="py-2.5 px-3 text-center"><span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px]">PAYÉ</span></td>
                          <td className="py-2.5 px-3 text-center"><span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px]">PAYÉ</span></td>
                          <td className="py-2.5 px-3 text-center"><span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px]">CLÔTURÉ ✓</span></td>
                          <td className="py-2.5 px-3 text-center"><span className="text-emerald-400 text-[11px]">Archivé</span></td>
                        </tr>
                      </tbody>
                    </table>
                    </div>
                  </div>
                </div>
              )}

              {/* Cas C : Autres Feuilles (Aperçu dynamique) */}
              {selectedExcelIndex > 1 && (
                <div className="p-8 rounded-2xl bg-[#0D0D12] border border-white/10 space-y-4 text-center">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto">
                    <FileSpreadsheet className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-display font-bold text-white">
                    {excelFilesList[selectedExcelIndex].name}
                  </h4>
                  <p className="text-xs text-slate-400 max-w-lg mx-auto">
                    {excelFilesList[selectedExcelIndex].desc}
                  </p>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 font-mono text-xs text-gold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Feuille pré-remplie avec formules automatiques prête à l'emploi</span>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 2 : MODÈLES WORD OFFICIELS EN ACTION                  */}
          {/* ========================================================= */}
          {activeTabResource === 'word' && (
            <div className="space-y-8 animate-fadeIn">
              
              {/* Sélecteur de documents */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-blue-500/15 text-blue-400 font-bold border border-blue-500/25">
                      DOCUMENT N° {wordFilesList[selectedWordIndex].id} / 30
                    </span>
                    <span className="text-xs text-gold font-mono font-bold">
                      {wordFilesList[selectedWordIndex].subtitle}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-display font-bold text-white flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-400" />
                    <span>{wordFilesList[selectedWordIndex].title}</span>
                  </h3>
                  <p className="text-xs text-slate-300 font-light">
                    {wordFilesList[selectedWordIndex].desc}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {wordFilesList.map((doc, idx) => (
                    <button
                      key={doc.id}
                      onClick={() => setSelectedWordIndex(idx)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                        selectedWordIndex === idx
                          ? "bg-gold text-[#0D0D12] font-bold shadow-sm"
                          : "bg-[#0D0D12] text-slate-400 hover:text-white border border-white/5"
                      }`}
                    >
                      Doc {doc.id}
                    </button>
                  ))}
                </div>
              </div>

              {/* Document Papier Paginaison Réelle */}
              <div className="p-6 sm:p-10 rounded-2xl bg-[#FAF8F5] text-[#1A1A1A] font-serif shadow-2xl max-w-4xl mx-auto space-y-6 border border-slate-300 animate-fadeIn">
                
                {/* En-tête officiel */}
                <div className="flex items-center justify-between pb-4 border-b-2 border-slate-900 font-sans">
                  <div className="space-y-0.5">
                    <h4 className="text-base font-black tracking-tight text-slate-900">
                      ENTREPRISE D'ÉLECTRICITÉ BÂTIMENT & INDUSTRIE
                    </h4>
                    <p className="text-[10px] text-slate-600 font-mono">
                      RCCM : CI-ABJ-2026-B-1284 • Agrément Technique PME • Tél : +225 07 00 00 00
                    </p>
                  </div>
                  <div className="px-3 py-1 rounded bg-slate-900 text-white font-mono text-[10px] font-bold">
                    MODÈLE OFFICIEL EPR
                  </div>
                </div>

                {/* Titre du document actif */}
                <div className="text-center py-2 space-y-1">
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-950 uppercase underline decoration-gold decoration-4 underline-offset-4">
                    {wordFilesList[selectedWordIndex].title}
                  </h3>
                  <p className="text-xs text-slate-600 font-sans italic">
                    {wordFilesList[selectedWordIndex].subtitle}
                  </p>
                </div>

                {/* Articles du document sélectionné */}
                <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-slate-800">
                  {wordFilesList[selectedWordIndex].articles.map((art, i) => (
                    <div key={i} className="p-3.5 rounded-xl bg-slate-100/80 border border-slate-200 space-y-1">
                      <div className="flex items-center gap-2 font-sans font-bold text-slate-900 text-xs">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{art.num} — {art.title}</span>
                      </div>
                      <p className="text-xs text-slate-700 font-sans pl-5 leading-normal">
                        {art.text}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Bloc de signature & cachet */}
                <div className="pt-6 border-t border-slate-300 grid grid-cols-2 gap-8 font-sans text-xs">
                  <div className="space-y-8">
                    <p className="font-bold text-slate-900">Pour le Client (Maître d'Ouvrage) :</p>
                    <p className="text-[10px] text-slate-500 italic">Mention manuscrite « Lu et approuvé, bon pour accord »</p>
                    <div className="w-36 h-0.5 bg-slate-400"></div>
                  </div>
                  <div className="space-y-4 text-right">
                    <p className="font-bold text-slate-900">Pour l'Entreprise d'Électricité :</p>
                    <div className="inline-block p-3 rounded-full border-2 border-emerald-600 text-emerald-700 font-mono text-[10px] font-bold transform -rotate-12">
                      CACHET OFFICIEL AGRÉÉ
                    </div>
                    <div className="w-36 h-0.5 bg-slate-400 ml-auto"></div>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 3 : LE LIVRE FONDATEUR (222 PAGES)                    */}
          {/* ========================================================= */}
          {activeTabResource === 'livre' && (
            <div className="space-y-8 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
                <div>
                  <h3 className="text-xl font-display font-bold text-white flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-gold" />
                    <span>Le Livre Fondateur : 222 Pages de Stratégie Terrain</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    L'armature méthodique rédigée par l'Ir. Jean Philippe pour les entrepreneurs africains.
                  </p>
                </div>
                <span className="font-mono text-xs px-3 py-1 rounded-full bg-gold/15 text-gold font-bold border border-gold/30">
                  PDF Haute Définition
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { num: "01", title: "L'Esprit & Posture EPR", desc: "Passer d'ouvrier à patron respectable qui refuse les chantiers à perte." },
                  { num: "02", title: "Positionnement Stratégique", desc: "Identifier les chantiers à haute rentabilité et éliminer les clients toxiques." },
                  { num: "03", title: "Chiffrage Chirurgical", desc: "Calculer son coefficient K de frais généraux et sécuriser sa marge nette." },
                  { num: "04", title: "Pilotage & Discipline", desc: "Organiser les compagnons, respecter les délais et éviter les heures perdues." },
                  { num: "05", title: "Radar Trésorerie & Acomptes", desc: "Verrouiller le paiement en 3 tranches inaliénables sans conflit." },
                  { num: "06", title: "Gestion Stocks & Matériel", desc: "Sécuriser les bobines et éviter les vols et gaspillages de chantier." },
                  { num: "07", title: "Droit & Contrats PME", desc: "Clauses de protection, PV de réception et recouvrement d'impayés." },
                  { num: "08", title: "Management d'Équipes", desc: "Former, motiver et déléguer sans perdre le contrôle de la qualité." },
                  { num: "09", title: "Croissance & Grands Comptes", desc: "Gagner la confiance des architectes et décrocher des marchés réguliers." }
                ].map((pillar) => (
                  <div key={pillar.num} className="p-4 rounded-2xl bg-[#0D0D12] border border-white/5 space-y-2 hover:border-gold/30 transition-all">
                    <div className="flex items-center justify-between text-xs font-mono text-gold font-bold">
                      <span>PILIER {pillar.num}</span>
                    </div>
                    <h4 className="text-sm font-display font-bold text-white">{pillar.title}</h4>
                    <p className="text-xs text-slate-400 font-light leading-relaxed">{pillar.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* ------------------------------------------------------------- */}
        {/* LECTEUR AUDIO RÉEL QUI PARLE (Point 2 demandé par l'utilisateur) */}
        {/* ------------------------------------------------------------- */}
        <div id="note-vocale" className="p-8 sm:p-10 rounded-[2.5rem] bg-gradient-to-r from-[#1A1A26] via-[#161622] to-[#1A1A26] border border-gold/30 shadow-gold-sm flex flex-col md:flex-row items-center justify-between gap-8">
          
          <div className="flex items-center gap-5">
            <div className="relative">
              <img 
                src="./assets/portrait-electricien-ingenieur-hd.jpg" 
                alt="Ir. Jean Philippe" 
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-gold shadow-md"
              />
              <span className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-[#161622] flex items-center justify-center text-[10px] text-white font-bold ${
                isPlayingAudio ? "bg-emerald-500 animate-pulse" : "bg-gold"
              }`}>
                {isPlayingAudio ? "▶" : "✓"}
              </span>
            </div>
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-gold/15 border border-gold/30 font-mono text-[9px] uppercase tracking-wider text-gold font-bold">
                <Volume2 className="w-3 h-3" />
                <span>Note Vocale Réelle de l'Auteur</span>
              </div>
              <h4 className="text-base sm:text-lg font-display font-bold text-white">
                « Pourquoi tant d'électriciens talentueux ferment boutique après 3 ans ? »
              </h4>
              <p className="text-xs text-slate-400 font-light">
                Message personnel de l'Ir. Jean Philippe à ses confrères artisans et patrons de PME.
              </p>
            </div>
          </div>

          {/* Contrôles du Lecteur Audio Réel */}
          <div className="w-full md:w-auto flex flex-col gap-2 bg-[#0D0D12] p-4 rounded-2xl border border-white/10 shrink-0 min-w-[280px]">
            <div className="flex items-center gap-4">
              <button
                onClick={toggleAudioPlay}
                className="w-12 h-12 rounded-full bg-gradient-to-r from-gold to-yellow-400 text-[#0D0D12] flex items-center justify-center hover:scale-105 transition-transform cursor-pointer shadow-gold-sm shrink-0"
                title={isPlayingAudio ? "Mettre en pause" : "Écouter la note vocale"}
              >
                {isPlayingAudio ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
              </button>

              {/* Forme d'onde animée synchronisée */}
              <div className="flex items-center gap-1 h-8 flex-1">
                {[30, 60, 45, 90, 50, 100, 70, 85, 40, 95, 60, 80, 50, 65, 40].map((h, i) => (
                  <div
                    key={i}
                    className={`w-1 rounded-full transition-all duration-200 ${
                      isPlayingAudio ? "bg-gold" : "bg-slate-700"
                    }`}
                    style={{
                      height: isPlayingAudio ? `${Math.max(18, Math.sin((audioCurrentTime * 6) + i) * 80 + 20)}%` : `${h * 0.4}%`
                    }}
                  ></div>
                ))}
              </div>

              <span className="font-mono text-xs text-slate-300 shrink-0">
                {formatAudioTime(audioCurrentTime)} / {formatAudioTime(audioDuration)}
              </span>
            </div>

            {/* Barre de progression cliquable */}
            <input 
              type="range"
              min="0"
              max={audioDuration || 48}
              value={audioCurrentTime}
              onChange={handleAudioSeek}
              className="w-full accent-gold h-1 bg-white/10 rounded-lg cursor-pointer"
            />
          </div>

        </div>

      </section>

      {/* D. LE MANIFESTE */}
      <section 
        id="manifeste" 
        ref={manifestoRef}
        className="py-28 px-6 sm:px-12 lg:px-20 bg-[#09090D] border-y border-white/5 relative overflow-hidden"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gold/5 blur-[120px] pointer-events-none rounded-full"></div>

        <div className="max-w-4xl mx-auto space-y-12 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-300 font-mono text-xs uppercase tracking-widest">
            <span>Le Manifeste EPR // Ir. Jean Philippe</span>
          </div>

          <div className="space-y-8">
            <p className="text-base sm:text-xl text-slate-400 font-light max-w-2xl mx-auto leading-relaxed">
              « La plupart des artisans électriciens et patrons de PME se concentrent sur : <br className="hidden sm:inline" />
              <span className="text-slate-300 underline decoration-red-500/40 decoration-2 underline-offset-4">
                enchaîner les chantiers épuisants, baisser leurs devis face aux bricoleurs et espérer un bénéfice à la fin du mois.
              </span> »
            </p>

            <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent mx-auto"></div>

            <p className="text-3xl sm:text-5xl lg:text-6xl font-serif italic text-white font-normal leading-tight">
              Nous nous concentrons sur : <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-yellow-300 to-amber-500 font-medium">
                chiffrer avec une rigueur chirurgicale, verrouiller chaque centime de marge
              </span>{" "}
              et bâtir une entreprise qui génère du cash prévisible.
            </p>
          </div>

          <div className="pt-6">
            <span className="font-mono text-xs text-gold uppercase tracking-widest">
              — Arrêtez de travailler pour payer les fournisseurs en retard. Devenez un dirigeant rentable.
            </span>
          </div>
        </div>
      </section>

      {/* E. PROTOCOLE ARCHIVE STICKY */}
      <section id="protocole" ref={stickyProtocolRef} className="py-24 px-6 sm:px-12 lg:px-20 max-w-5xl mx-auto space-y-12">
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-mono font-bold tracking-widest uppercase">
            <span>Section 03 // Protocole d'Exécution</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            Les 3 Étapes Fondatrices de la Méthode.
          </h2>
          <p className="text-sm text-slate-400 font-light">
            Défilez pour parcourir l'archive séquentielle du système EPR. Chaque étape s'empile avec son animation dédiée.
          </p>
        </div>

        <div className="space-y-12">
          {/* CARTE STICKY 01 */}
          <div className="sticky-protocol-card sticky top-28 bg-[#161622] border border-white/10 rounded-[3rem] p-8 sm:p-12 shadow-2xl overflow-hidden min-h-[380px] flex flex-col md:flex-row items-center justify-between gap-8 group">
            <div className="space-y-5 max-w-md">
              <div className="flex items-center gap-3">
                <span className="font-mono text-2xl font-black text-gold">01</span>
                <span className="font-mono text-xs uppercase tracking-widest text-slate-400">// ÉTAPE FONDATRICE</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-white leading-tight">
                Audit de Rentabilité & Blindage des Frais Généraux
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-light">
                Calculez votre coût de revient horaire exact. Banalisez les devis intuitifs et intégrez les amortissements réels pour ne plus jamais travailler à perte.
              </p>
              <div className="flex items-center gap-2 text-xs font-mono text-gold pt-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Module Excel Calcul Coût Horaire Compagnon</span>
              </div>
            </div>

            <div className="relative w-48 h-48 sm:w-60 sm:h-60 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-gold/20 animate-spin" style={{ animationDuration: '24s' }}></div>
              <div className="absolute inset-4 rounded-full border border-dashed border-gold/40 animate-spin" style={{ animationDuration: '16s', animationDirection: 'reverse' }}></div>
              <div className="absolute inset-10 rounded-full border border-amber-500/30 animate-pulse"></div>
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gold to-amber-600 flex items-center justify-center text-[#0D0D12] font-mono font-black text-lg shadow-gold-sm">
                K=1.38
              </div>
            </div>
          </div>

          {/* CARTE STICKY 02 */}
          <div className="sticky-protocol-card sticky top-32 bg-[#1A1A26] border border-white/10 rounded-[3rem] p-8 sm:p-12 shadow-2xl overflow-hidden min-h-[380px] flex flex-col md:flex-row items-center justify-between gap-8 group">
            <div className="space-y-5 max-w-md">
              <div className="flex items-center gap-3">
                <span className="font-mono text-2xl font-black text-gold">02</span>
                <span className="font-mono text-xs uppercase tracking-widest text-slate-400">// DÉPLOIEMENT SYSTÈME</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-white leading-tight">
                Implantation des 65 Outils Word & Tableurs Excel
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-light">
                Déployez les fiches de chantier types, contrats de sous-traitance validés et la matrice de gestion des stocks pour piloter chaque compagnon avec précision.
              </p>
              <div className="flex items-center gap-2 text-xs font-mono text-gold pt-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>30 Fiches Procédures Word + 35 Matrices Excel</span>
              </div>
            </div>

            <div className="relative w-48 h-48 sm:w-60 sm:h-60 rounded-2xl bg-[#09090D] border border-white/10 p-4 overflow-hidden flex flex-col justify-between">
              <div className="grid grid-cols-6 gap-2 opacity-30">
                {Array.from({ length: 36 }).map((_, i) => (
                  <div key={i} className="w-2 h-2 rounded-full bg-gold"></div>
                ))}
              </div>
              <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent animate-laser shadow-[0_0_15px_#F5C518]"></div>
              <div className="font-mono text-[10px] text-gold tracking-widest text-center">
                65 FICHIERS OPÉRATIONNELS
              </div>
            </div>
          </div>

          {/* CARTE STICKY 03 */}
          <div className="sticky-protocol-card sticky top-36 bg-[#161622] border border-gold/30 rounded-[3rem] p-8 sm:p-12 shadow-2xl overflow-hidden min-h-[380px] flex flex-col md:flex-row items-center justify-between gap-8 group">
            <div className="space-y-5 max-w-md">
              <div className="flex items-center gap-3">
                <span className="font-mono text-2xl font-black text-gold">03</span>
                <span className="font-mono text-xs uppercase tracking-widest text-slate-400">// MAÎTRISE FINANCIÈRE</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-white leading-tight">
                Pilotage de Trésorerie & Radar d'Acomptes Systématique
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-light">
                Sécurisez 40% d'acompte à la commande sans négociation, 30% à mi-chantier et 30% à la livraison avec PV contradictoire. Fini les trous d'air de trésorerie.
              </p>
              <div className="flex items-center gap-2 text-xs font-mono text-gold pt-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Trésorerie Prévisionnelle Hebdomadaire</span>
              </div>
            </div>

            <div className="relative w-48 h-48 sm:w-60 sm:h-60 rounded-2xl bg-[#09090D] border border-white/10 flex flex-col items-center justify-center p-4">
              <svg className="w-full h-24 stroke-gold" viewBox="0 0 200 60" fill="none">
                <path 
                  d="M0 30 L40 30 L50 10 L60 50 L70 20 L80 40 L90 30 L130 30 L140 5 L150 55 L160 30 L200 30" 
                  strokeWidth="3" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="animate-pulse"
                />
              </svg>
              <span className="font-mono text-[11px] text-emerald-400 font-bold mt-2">
                FLUX FINANCIER POSITIF
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* F. SECTION OFFRE UNIQUE — LE SYSTÈME COMPLET MÉTHODE EPR (15,80 $US / ~10 000 FCFA / 15,80 €) */}
      <section 
        id="tarifs" 
        className="py-24 px-6 sm:px-12 lg:px-20 max-w-5xl mx-auto space-y-10"
      >
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/15 border border-gold/40 text-gold text-xs font-mono font-bold tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Offre Unique & Complète // Tout le Système Clé en Main</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            Un Seul Investissement. <br />
            <span className="font-serif italic text-gold font-normal">Tout le Système Intégral Débloqué.</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
            Pas de formules tronquées ni d'options partielles : vous recevez l'intégralité du pack (le Livre Fondateur de 222 pages + les 35 Fichiers Excel automatisés + les 30 Modèles Juridiques Word + la Note Vocale de l'Ingénieur) au tarif unique de lancement.
          </p>
        </div>

        {/* CARTE UNIQUE MAÎTRESSE HAUTE FIDÉLITÉ */}
        <div className="relative">
          <div className="p-6 sm:p-10 rounded-[2.5rem] bg-gradient-to-b from-[#1C1C2A] via-[#161622] to-[#12121A] border-2 border-gold shadow-gold-glow space-y-8">
            
            {/* Haut de la carte */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/10">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs px-3 py-1 rounded-full bg-gold/15 text-gold font-bold border border-gold/30">
                    {uniqueOffer.badge}
                  </span>
                  <span className="font-mono text-xs px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
                    {uniqueOffer.discountTag}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-4xl font-display font-black text-white">
                  {uniqueOffer.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 font-light max-w-xl">
                  {uniqueOffer.tagline}
                </p>
              </div>

              {/* Bloc de prix unique mis en valeur */}
              <div className="bg-[#0D0D12] p-5 sm:p-6 rounded-2xl border border-gold/40 text-left lg:text-right shrink-0 min-w-[260px] shadow-lg">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                  Prix Unique de Lancement
                </span>
                <div className="flex items-baseline gap-2 lg:justify-end mt-1">
                  <span className="text-3xl sm:text-5xl font-display font-black text-gold">
                    {uniqueOffer.priceFCFA}
                  </span>
                  <span className="text-base font-mono text-slate-200">
                    ({uniqueOffer.priceUSD})
                  </span>
                </div>
                <div className="flex items-center gap-2 lg:justify-end mt-1 text-xs font-mono">
                  <span className="text-slate-500 line-through">
                    {uniqueOffer.oldPriceUSD} ({uniqueOffer.oldPriceFCFA})
                  </span>
                  <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded">
                    Paiement Unique
                  </span>
                </div>
                <div className="mt-2 pt-2 border-t border-white/5 text-[10px] font-mono text-slate-400 lg:text-right">
                  <span>Valeur réelle certifiée : </span>
                  <span className="text-slate-200 font-bold line-through">{uniqueOffer.realValueFCFA}</span>
                </div>
              </div>
            </div>

            {/* 4 Piliers Fondamentaux Inclus dans le Pack Unique */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="p-4 rounded-2xl bg-[#0D0D12]/70 border border-white/10 flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-gold/15 text-gold flex items-center justify-center shrink-0">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-white text-xs sm:text-sm">Livre 222 Pages</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">9 Piliers fondamentaux pour structurer votre PME.</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#0D0D12]/70 border border-white/10 flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0">
                  <FileSpreadsheet className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-white text-xs sm:text-sm">35 Fichiers Excel</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Marges, Devis, Stocks VBA, Trésorerie automatique.</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#0D0D12]/70 border border-white/10 flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/15 text-blue-400 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-white text-xs sm:text-sm">30 Modèles Word</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Contrats, Avenants anti-perte, PV de réception.</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#0D0D12]/70 border border-white/10 flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center shrink-0">
                  <Volume2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-white text-xs sm:text-sm">Note Vocale HD</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Accompagnement & conseils de l'Ingénieur.</p>
                </div>
              </div>
            </div>

            {/* Liste exhaustive des fonctionnalités incluses */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                TOUT CE QUI EST INCLUS DANS VOTRE ARCHIVE .ZIP TÉLÉCHARGEABLE :
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                {uniqueOffer.features.map((feat, fIdx) => (
                  <div 
                    key={fIdx} 
                    className="p-3.5 rounded-xl border bg-white/5 border-white/10 text-slate-100 flex items-center gap-3 transition-colors hover:border-gold/30"
                  >
                    <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                    <span className="font-medium text-xs sm:text-sm">
                      {feat.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bouton d'action direct vers le paiement sur la même page */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-t border-white/10">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Paiement sécurisé via Chariow (Wave, Orange, MTN, Moov, Airtel, Carte)</span>
              </div>

              <button
                type="button"
                onClick={handleGoToPayment}
                className="btn-magnetic px-8 py-4 rounded-2xl bg-gradient-to-r from-gold via-yellow-400 to-amber-500 text-[#0D0D12] font-display font-black text-sm tracking-wide shadow-gold-sm flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] transition-transform"
              >
                <span className="slide-layer"></span>
                <span className="relative z-10 flex items-center gap-2">
                  <span>Obtenir le Système Complet ({uniqueOffer.priceFCFA} / {uniqueOffer.priceUSD})</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </span>
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* G. SECTION TUNNEL DE PAIEMENT CHARIOW INTÉGRÉE DIRECTEMENT DANS CETTE PAGE */}
      <section 
        id="paiement" 
        className="py-24 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto space-y-12"
      >
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold tracking-widest uppercase">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Passerelle Officielle Chariow // Reste 100% sur cette page de vente</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            Finalisez votre Commande Chariow.
          </h2>
          <p className="text-sm sm:text-base text-slate-400 font-light leading-relaxed">
            Pas de redirection imprévue : renseignez vos coordonnées ci-dessous pour débloquer votre pack .ZIP immédiatement après validation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Colonne 1 : Récapitulatif Commande */}
          <div className="lg:col-span-5 bg-[#161622] border border-white/15 rounded-[2.5rem] p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center gap-3 pb-4 border-b border-white/10">
              <img 
                src="./assets/mockup-pack-3d.png" 
                alt="Pack Système EPR" 
                className="w-16 h-16 object-contain filter drop-shadow-md shrink-0"
                onError={(e) => { e.currentTarget.src = "./assets/portrait-electricien-ingenieur-hd.jpg"; }}
              />
              <div className="min-w-0">
                <span className="font-mono text-[9px] text-gold font-bold uppercase tracking-wider block">
                  COMMANDE UNIQUE RÉSERVÉE
                </span>
                <h4 className="font-display font-extrabold text-white text-base truncate">
                  LA MÉTHODE EPR
                </h4>
                <p className="text-xs text-slate-400 font-mono">
                  Système d'Exploitation PME Intégral
                </p>
              </div>
            </div>

            {/* Récapitulatif Produit Unique */}
            <div className="p-4 rounded-2xl bg-[#0D0D12] border border-gold/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider">Pack Intégral Sélectionné</span>
                <span className="font-mono text-[9px] px-2 py-0.5 rounded-full bg-gold/15 text-gold border border-gold/30 font-bold uppercase">
                  65 OUTILS + LIVRE
                </span>
              </div>
              <div className="text-white font-display font-bold text-sm">
                {uniqueOffer.title}
              </div>
              <p className="text-xs text-slate-400 leading-relaxed font-light">
                Livre PDF 222 pages + 35 Classeurs Excel (Rentabilité & Stocks VBA) + 30 Modèles Word + Note Vocale.
              </p>
            </div>

            {/* Détails du montant */}
            <div className="p-4 rounded-2xl bg-[#0D0D12] border border-white/10 space-y-2 font-mono text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Tarif unique Chariow :</span>
                <span className="text-white font-medium">{uniqueOffer.priceFCFA} ({uniqueOffer.priceUSD})</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Frais de livraison :</span>
                <span className="text-emerald-400 font-bold">GRATUIT (Téléchargement direct)</span>
              </div>
              <div className="pt-2 border-t border-white/10 flex justify-between items-baseline text-sm">
                <span className="text-white font-bold font-sans">Total TTC à régler :</span>
                <div className="text-right">
                  <span className="text-2xl font-display font-black text-gold">
                    {uniqueOffer.priceFCFA}
                  </span>
                  <span className="text-[11px] text-slate-400 block font-mono">
                    ({uniqueOffer.priceUSD} / 15,80 €)
                  </span>
                </div>
              </div>
            </div>

            {/* Badges de réassurance */}
            <div className="space-y-2 text-xs text-slate-400 pt-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Format .ZIP avec les 65 fichiers réels Word & Excel</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                <span>Accès immédiat par email + téléchargement direct</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Support d'assistance technique WhatsApp dédié</span>
              </div>
            </div>
          </div>

          {/* Colonne 2 : Terminal Express Chariow */}
          <div className="lg:col-span-7 bg-[#161622] border border-gold/40 rounded-[2.5rem] p-6 sm:p-10 space-y-6 shadow-gold-sm">
            
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  <span className="font-mono text-xs font-bold text-emerald-400 uppercase">
                    Guichet Chariow Ouvert
                  </span>
                </div>
                <h3 className="text-xl font-display font-black text-white">
                  Coordonnées & Moyen de Paiement
                </h3>
              </div>
              <div className="px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-[10px] font-mono text-slate-400 hidden sm:block">
                SSL 256-BIT CRYPTÉ
              </div>
            </div>

            {/* Choix de l'opérateur de paiement local */}
            <div className="space-y-2">
              <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                1. Sélectionnez votre moyen de paiement Mobile Money ou Carte :
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { id: 'wave', name: 'Wave', badge: 'CI / Sénégal', icon: '🌊' },
                  { id: 'orange', name: 'Orange Money', badge: 'Afrique Ouest', icon: '🟠' },
                  { id: 'mtn', name: 'MTN MoMo', badge: 'CI / BJ / CM / RDC', icon: '🟡' },
                  { id: 'moov', name: 'Moov Money', badge: 'CI / Togo / Bénin', icon: '🔵' },
                  { id: 'airtel', name: 'Airtel / M-Pesa', badge: 'RDC / Afrique Centrale', icon: '🔴' },
                  { id: 'carte', name: 'Carte Bancaire', badge: 'Visa / Mastercard', icon: '💳' },
                ].map((method) => (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => setSelectedPaymentMethod(method.id)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      selectedPaymentMethod === method.id 
                        ? "bg-gold/15 border-gold text-white font-bold shadow-sm" 
                        : "bg-[#0D0D12] border-white/5 text-slate-400 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-1.5 text-sm font-display font-bold text-white">
                      <span>{method.icon}</span>
                      <span className="text-xs">{method.name}</span>
                    </div>
                    <span className="text-[9px] font-mono text-slate-400 mt-1">{method.badge}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Formulaire des coordonnées client avec validation obligatoire */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                  2. Vos coordonnées de livraison numérique :
                </label>
                <span className="text-[10px] font-mono text-amber-400/90 font-medium">
                  * Tous les champs sont requis
                </span>
              </div>

              {/* Message d'alerte global si validation échouée */}
              {Object.keys(formErrors).length > 0 && (
                <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-500/50 text-red-300 text-xs flex items-center gap-2.5 animate-shake">
                  <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>Veuillez renseigner vos coordonnées obligatoires ci-dessous avant de procéder au règlement.</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-300 font-medium">Nom complet / Entreprise *</span>
                  </div>
                  <input
                    id="order-client-name"
                    type="text"
                    value={orderClientName}
                    onChange={(e) => {
                      setOrderClientName(e.target.value);
                      if (formErrors.name) {
                        setFormErrors(prev => ({ ...prev, name: null }));
                      }
                    }}
                    placeholder="Ex: Kouamé Jean (SARL Élec)"
                    className={`w-full px-4 py-3 rounded-xl border text-white placeholder-slate-600 outline-none text-xs font-mono transition-all ${
                      formErrors.name
                        ? "border-red-500 bg-red-950/20 focus:border-red-400 animate-shake"
                        : "border-white/10 bg-[#0D0D12] focus:border-gold"
                    }`}
                  />
                  {formErrors.name && (
                    <p className="text-[11px] text-red-400 font-mono flex items-center gap-1.5 mt-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{formErrors.name}</span>
                    </p>
                  )}
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-300 font-medium">Numéro WhatsApp / Téléphone *</span>
                  </div>
                  <input
                    id="order-phone"
                    type="tel"
                    value={orderPhone}
                    onChange={(e) => {
                      setOrderPhone(e.target.value);
                      if (formErrors.phone) {
                        setFormErrors(prev => ({ ...prev, phone: null }));
                      }
                    }}
                    placeholder="+225 07 00 00 00 00"
                    className={`w-full px-4 py-3 rounded-xl border text-white placeholder-slate-600 outline-none text-xs font-mono transition-all ${
                      formErrors.phone
                        ? "border-red-500 bg-red-950/20 focus:border-red-400 animate-shake"
                        : "border-white/10 bg-[#0D0D12] focus:border-gold"
                    }`}
                  />
                  {formErrors.phone && (
                    <p className="text-[11px] text-red-400 font-mono flex items-center gap-1.5 mt-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{formErrors.phone}</span>
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-300 font-medium">Adresse email (réception du pack et facture) *</span>
                </div>
                <input
                  id="order-email"
                  type="email"
                  value={orderEmail}
                  onChange={(e) => {
                    setOrderEmail(e.target.value);
                    if (formErrors.email) {
                      setFormErrors(prev => ({ ...prev, email: null }));
                    }
                  }}
                  placeholder="votre.email@exemple.com"
                  className={`w-full px-4 py-3 rounded-xl border text-white placeholder-slate-600 outline-none text-xs font-mono transition-all ${
                    formErrors.email
                      ? "border-red-500 bg-red-950/20 focus:border-red-400 animate-shake"
                      : "border-white/10 bg-[#0D0D12] focus:border-gold"
                  }`}
                />
                {formErrors.email && (
                  <p className="text-[11px] text-red-400 font-mono flex items-center gap-1.5 mt-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{formErrors.email}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Bouton d'action principal connecté à la validation */}
            <div className="pt-2 space-y-3">
              <button
                id="btn-valider-paiement-chariow"
                type="button"
                onClick={handleOrderSubmit}
                disabled={isSubmittingOrder}
                className="w-full py-4 sm:py-5 rounded-2xl bg-gradient-to-r from-gold via-yellow-400 to-amber-500 text-[#0D0D12] font-display font-black text-sm sm:text-base tracking-wide shadow-gold-glow flex items-center justify-center gap-3 cursor-pointer hover:scale-[1.01] transition-transform disabled:opacity-80 disabled:cursor-wait"
              >
                {isSubmittingOrder ? (
                  <>
                    <RotateCw className="w-5 h-5 animate-spin" />
                    <span>Connexion sécurisée à Chariow en cours...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4 stroke-[2.5]" />
                    <span>Valider le Paiement Chariow ({priceTiers[activePriceIndex].priceFCFA})</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </>
                )}
              </button>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] font-mono text-slate-400 text-center sm:text-left">
                <span className="flex items-center gap-1.5 justify-center">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 inline" />
                  <span>Paiement chiffré SSL 256-Bit • Aucun frais masqué</span>
                </span>
                <button
                  type="button"
                  onClick={() => setIsCheckoutModalOpen(true)}
                  className="text-gold hover:underline cursor-pointer"
                >
                  Ouvrir en modale rapide
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* G. PIED DE PAGE */}
      <footer className="bg-[#09090D] border-t border-white/10 rounded-t-[4rem] pt-20 pb-12 px-6 sm:px-12 lg:px-20 text-slate-400">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-gold text-[#0D0D12] flex items-center justify-center font-black">
                  <Zap className="w-4 h-4 fill-current" />
                </div>
                <span className="font-display font-extrabold text-xl text-white tracking-tight">
                  LA MÉTHODE <span className="text-gold">EPR</span>
                </span>
              </div>
              
              <p className="text-xs text-slate-400 font-light max-w-md leading-relaxed">
                Le premier système d'exploitation de gestion, rentabilité et chiffrage chirurgical conçu pour les électriciens et dirigeants de PME BTP en Afrique.
              </p>

              <div className="pt-2 flex items-center gap-2 text-xs font-mono text-slate-300">
                <span>Auteur :</span>
                <span className="text-gold font-semibold">Ir. Jean Philippe (Ingénieur & Consultant PME)</span>
              </div>
            </div>

            <div className="space-y-3">
              <h5 className="font-mono text-xs uppercase tracking-wider text-white font-bold">Navigation</h5>
              <ul className="space-y-2 text-xs">
                <li><a href="#outils-en-action" className="link-hover-lift hover:text-gold">35 Fichiers Excel</a></li>
                <li><a href="#outils-en-action" className="link-hover-lift hover:text-gold">30 Modèles Word</a></li>
                <li><a href="#note-vocale" className="link-hover-lift hover:text-gold">Note Vocale Auteur</a></li>
                <li><a href="#manifeste" className="link-hover-lift hover:text-gold">Le Manifeste</a></li>
                <li><a href="#paiement" className="link-hover-lift text-gold font-bold">Commander sur Chariow</a></li>
              </ul>
            </div>

            <div className="space-y-3">
              <h5 className="font-mono text-xs uppercase tracking-wider text-white font-bold">Paiements Locaux & Sécurité</h5>
              <p className="text-xs text-slate-400 leading-relaxed font-light">
                Transactions chiffrées sécurisées via la passerelle officielle <strong>Chariow</strong> :
              </p>
              <div className="flex flex-wrap gap-2 text-[10px] font-mono text-slate-300">
                <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10">Wave</span>
                <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10">Orange Money</span>
                <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10">MTN MoMo</span>
                <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10">Moov Money</span>
                <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10">Visa / Mastercard</span>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-emerald-400 font-semibold tracking-wider">
                SYS_OK // PASSERELLE CHARIOW & PAIEMENTS MOBILES OPÉRATIONNELS
              </span>
            </div>

            <div>
              © 2026 LA MÉTHODE EPR • Ir. Jean Philippe • Tous droits réservés.
            </div>
          </div>
        </div>
      </footer>

      {/* BANDEAU AUDIO FLOTTANT HAUTE FIDÉLITÉ (Mobile-first, 100% adapté aux écrans 320px-450px) */}
      <aside 
        aria-label="Lecteur audio flottant de la note vocale"
        onClick={toggleAudioPlay}
        className={`fixed bottom-3 sm:bottom-6 left-3 right-3 sm:left-auto sm:right-6 z-40 max-w-sm sm:max-w-md mx-auto sm:mx-0 flex items-center justify-between gap-2.5 p-2 sm:p-2.5 rounded-full bg-[#161622]/95 border shadow-2xl backdrop-blur-xl text-xs font-mono transition-all cursor-pointer ${
          isPlayingAudio 
            ? "border-emerald-500/50 shadow-emerald-500/10" 
            : "border-gold/50 shadow-gold-sm hover:scale-[1.02]"
        }`}
      >
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          <div className="relative shrink-0">
            <img 
              src="./assets/portrait-electricien-ingenieur-hd.jpg" 
              alt="Ir. Jean Philippe" 
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover border border-gold"
            />
            <span className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border border-[#0D0D12] ${
              isPlayingAudio ? "bg-emerald-500 animate-pulse" : "bg-gold"
            }`}></span>
          </div>

          <div className="space-y-0.5 min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-[10px] sm:text-xs text-white truncate">
                {isPlayingAudio ? "Note Vocale en cours" : "Note Vocale de l'Ingénieur"}
              </span>
              <span className="text-[9px] text-gold font-mono shrink-0">
                {formatAudioTime(audioCurrentTime)} / {formatAudioTime(audioDuration)}
              </span>
            </div>

            <div className="flex items-center gap-0.5 h-2.5">
              {[30, 70, 45, 90, 50, 100, 60, 80, 40, 75, 55, 85].map((h, i) => (
                <span
                  key={i}
                  className={`w-0.5 rounded-full transition-all duration-200 ${
                    isPlayingAudio ? "bg-gold" : "bg-slate-600"
                  }`}
                  style={{
                    height: isPlayingAudio ? `${Math.max(25, Math.sin((audioCurrentTime * 6) + i) * 80 + 20)}%` : '30%'
                  }}
                ></span>
              ))}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleAudioPlay();
          }}
          className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center shrink-0 transition-transform cursor-pointer shadow-md ${
            isPlayingAudio 
              ? "bg-emerald-500 text-white shadow-emerald-500/30" 
              : "bg-gold text-[#0D0D12] hover:scale-105"
          }`}
          title={isPlayingAudio ? "Mettre en pause la note vocale" : "Écouter la note vocale de l'Ir. Jean Philippe"}
        >
          {isPlayingAudio ? (
            <Pause className="w-3.5 h-3.5 fill-current" />
          ) : (
            <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
          )}
        </button>
      </aside>

      {/* MODALE DE PAIEMENT EXPRESS CHARIOW FLOTTANTE (SUR LA MÊME PAGE) */}
      <CheckoutModal 
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
        selectedTier={priceTiers[activePriceIndex]}
        orderClientName={orderClientName}
        setOrderClientName={setOrderClientName}
        orderPhone={orderPhone}
        setOrderPhone={setOrderPhone}
        orderEmail={orderEmail}
        setOrderEmail={setOrderEmail}
        selectedPaymentMethod={selectedPaymentMethod}
        setSelectedPaymentMethod={setSelectedPaymentMethod}
        onConfirmOrder={(clientData) => {
          handlePurchaseClick();
          const baseUrl = "https://zpkvlptl.mychariow.shop/la-methode-epr/checkout";
          const params = new URLSearchParams();
          if (clientData?.name) params.append("name", clientData.name);
          if (clientData?.email) params.append("email", clientData.email);
          if (clientData?.phone) params.append("phone", clientData.phone);
          if (clientData?.paymentMethod) params.append("payment_method", clientData.paymentMethod);
          const targetUrl = `${baseUrl}?${params.toString()}`;
          setTimeout(() => {
            window.location.href = targetUrl;
          }, 400);
        }}
      />

    </div>
  );
}

