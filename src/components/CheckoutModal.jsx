import React, { useState, useEffect } from 'react';
import { 
  X, 
  ShieldCheck, 
  Lock, 
  Sparkles, 
  CheckCircle, 
  ArrowRight, 
  RotateCw,
  AlertCircle,
  AlertTriangle,
  Zap
} from 'lucide-react';

export default function CheckoutModal({ 
  isOpen, 
  onClose, 
  selectedTier, 
  onConfirmOrder,
  orderClientName = '',
  setOrderClientName,
  orderPhone = '',
  setOrderPhone,
  orderEmail = '',
  setOrderEmail,
  selectedPaymentMethod = 'wave',
  setSelectedPaymentMethod
}) {
  const chariowCheckoutBaseUrl = "https://zpkvlptl.mychariow.shop/la-methode-epr/checkout";

  // États locaux de validation
  const [localErrors, setLocalErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Gestion du scroll du body et touche Echap
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = '';
      };
    } else {
      document.body.style.overflow = '';
      setLocalErrors({});
      setIsSubmitting(false);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentTier = selectedTier || {
    title: "Le Pack Système Méthode EPR — Intégral",
    priceUSD: "15,80 $US",
    priceFCFA: "~10 000 FCFA",
    oldPrice: "97,00 $US"
  };

  // Validation stricte des coordonnées
  const validateModalForm = () => {
    const errors = {};
    const cleanName = (orderClientName || '').trim();
    const cleanPhone = (orderPhone || '').trim();
    const cleanEmail = (orderEmail || '').trim();

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
      errors.email = "Veuillez renseigner votre adresse email pour recevoir le pack.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      errors.email = "Format d'email invalide (ex: contact@entreprise.com).";
    }

    return errors;
  };

  const handleProceed = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (isSubmitting) return;

    const errors = validateModalForm();
    if (Object.keys(errors).length > 0) {
      setLocalErrors(errors);
      if (errors.name) {
        document.getElementById('modal-client-name')?.focus();
      } else if (errors.phone) {
        document.getElementById('modal-phone')?.focus();
      } else if (errors.email) {
        document.getElementById('modal-email')?.focus();
      }
      return;
    }

    setLocalErrors({});
    setIsSubmitting(true);

    if (onConfirmOrder) {
      onConfirmOrder({
        name: orderClientName.trim(),
        phone: orderPhone.trim(),
        email: orderEmail.trim(),
        paymentMethod: selectedPaymentMethod
      });
    } else {
      const params = new URLSearchParams();
      if (orderClientName.trim()) params.append("name", orderClientName.trim());
      if (orderEmail.trim()) params.append("email", orderEmail.trim());
      if (orderPhone.trim()) params.append("phone", orderPhone.trim());
      if (selectedPaymentMethod) params.append("payment_method", selectedPaymentMethod);
      const targetUrl = `${chariowCheckoutBaseUrl}?${params.toString()}`;
      setTimeout(() => {
        window.location.href = targetUrl;
      }, 500);
    }
  };

  return (
    <div 
      className="checkout-modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-title"
    >
      <div 
        className="checkout-modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        {/* En-tête de la modale */}
        <div className="p-5 border-b border-white/10 bg-[#161622] flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-mono text-[10px] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>PASSERELLE OFFICIELLE SÉCURISÉE • CHARIOW SSL 256-BIT</span>
            </div>
            <h3 id="checkout-title" className="text-xl font-display font-extrabold text-white">
              Finaliser votre Commande Chariow
            </h3>
            <p className="text-xs text-slate-400 font-light">
              Renseignez vos coordonnées pour débloquer votre accès immédiat au Pack .ZIP.
            </p>
          </div>

          <button 
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-colors border border-white/10 cursor-pointer shrink-0"
            aria-label="Fermer la fenêtre de commande"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Corps de la modale */}
        <div className="p-6 overflow-y-auto space-y-5 text-sm">
          
          {/* Fiche récapitulative du produit */}
          <div className="p-4 rounded-2xl bg-[#0D0D12] border border-gold/30 flex gap-4 items-center">
            <img 
              src="./assets/mockup-pack-3d.png" 
              alt="Pack Système EPR" 
              className="w-16 h-16 sm:w-20 sm:h-20 object-contain shrink-0 filter drop-shadow-md"
              onError={(e) => { e.currentTarget.src = "./assets/portrait-electricien-ingenieur-hd.jpg"; }}
            />
            <div className="space-y-1 min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[9px] px-2 py-0.5 rounded-full bg-gold/15 text-gold border border-gold/30 font-bold uppercase">
                  SYSTÈME COMPLET
                </span>
                <span className="text-[10px] font-mono text-emerald-400 font-bold">LIVRAISON .ZIP</span>
              </div>
              <h4 className="font-display font-bold text-white text-sm sm:text-base leading-tight truncate">
                {currentTier.title}
              </h4>
              <p className="text-xs text-slate-400">
                Livre 222 pages + 35 Excel de Rentabilité + 30 Modèles Word
              </p>
            </div>
          </div>

          {/* Tarif officiel */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-gold/10 via-[#1A1A26] to-gold/10 border border-gold/30 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono text-slate-400 uppercase">Tarif unique Chariow</span>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-xl sm:text-2xl font-display font-black text-gold">
                  {currentTier.priceFCFA}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  ({currentTier.priceUSD})
                </span>
              </div>
            </div>
            <div className="px-2.5 sm:px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-mono text-[10px] font-bold text-right">
              Paiement unique • Accès à vie
            </div>
          </div>

          {/* Formulaire obligatoire des coordonnées */}
          <div className="space-y-3 pt-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-300 font-semibold uppercase tracking-wider block">
                Vos coordonnées de livraison :
              </span>
              <span className="text-[10px] font-mono text-amber-400/90">
                * Champs requis
              </span>
            </div>

            {Object.keys(localErrors).length > 0 && (
              <div className="p-3 rounded-xl bg-red-950/40 border border-red-500/50 text-red-300 text-xs flex items-center gap-2 animate-shake">
                <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                <span>Renseignez vos coordonnées obligatoires avant de continuer.</span>
              </div>
            )}

            <div className="space-y-1">
              <span className="text-xs text-slate-300 font-medium">Nom complet / Entreprise *</span>
              <input
                id="modal-client-name"
                type="text"
                value={orderClientName}
                onChange={(e) => {
                  if (setOrderClientName) setOrderClientName(e.target.value);
                  if (localErrors.name) setLocalErrors(prev => ({ ...prev, name: null }));
                }}
                placeholder="Ex: Kouamé Jean (SARL Élec)"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-white placeholder-slate-600 outline-none text-xs font-mono transition-all ${
                  localErrors.name
                    ? "border-red-500 bg-red-950/20 focus:border-red-400 animate-shake"
                    : "border-white/10 bg-[#0D0D12] focus:border-gold"
                }`}
              />
              {localErrors.name && (
                <p className="text-[11px] text-red-400 font-mono flex items-center gap-1 mt-0.5">
                  <AlertCircle className="w-3 h-3 shrink-0" />
                  <span>{localErrors.name}</span>
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <span className="text-xs text-slate-300 font-medium">Numéro WhatsApp *</span>
                <input
                  id="modal-phone"
                  type="tel"
                  value={orderPhone}
                  onChange={(e) => {
                    if (setOrderPhone) setOrderPhone(e.target.value);
                    if (localErrors.phone) setLocalErrors(prev => ({ ...prev, phone: null }));
                  }}
                  placeholder="+225 07 00 00 00 00"
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-white placeholder-slate-600 outline-none text-xs font-mono transition-all ${
                    localErrors.phone
                      ? "border-red-500 bg-red-950/20 focus:border-red-400 animate-shake"
                      : "border-white/10 bg-[#0D0D12] focus:border-gold"
                  }`}
                />
                {localErrors.phone && (
                  <p className="text-[11px] text-red-400 font-mono flex items-center gap-1 mt-0.5">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    <span>{localErrors.phone}</span>
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <span className="text-xs text-slate-300 font-medium">Adresse email *</span>
                <input
                  id="modal-email"
                  type="email"
                  value={orderEmail}
                  onChange={(e) => {
                    if (setOrderEmail) setOrderEmail(e.target.value);
                    if (localErrors.email) setLocalErrors(prev => ({ ...prev, email: null }));
                  }}
                  placeholder="votre.email@exemple.com"
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-white placeholder-slate-600 outline-none text-xs font-mono transition-all ${
                    localErrors.email
                      ? "border-red-500 bg-red-950/20 focus:border-red-400 animate-shake"
                      : "border-white/10 bg-[#0D0D12] focus:border-gold"
                  }`}
                />
                {localErrors.email && (
                  <p className="text-[11px] text-red-400 font-mono flex items-center gap-1 mt-0.5">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    <span>{localErrors.email}</span>
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Moyens de paiement acceptés */}
          <div className="space-y-2 pt-1">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
              Moyens de paiement acceptés sur Chariow :
            </span>
            <div className="flex flex-wrap gap-1.5 text-xs font-mono">
              {[
                { id: 'wave', label: '🌊 Wave' },
                { id: 'orange', label: '🟠 Orange Money' },
                { id: 'mtn', label: '🟡 MTN MoMo' },
                { id: 'moov', label: '🔵 Moov Money' },
                { id: 'airtel', label: '🔴 Airtel / M-Pesa' },
                { id: 'carte', label: '💳 Carte Bancaire' }
              ].map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setSelectedPaymentMethod && setSelectedPaymentMethod(m.id)}
                  className={`px-2.5 py-1 rounded-xl border transition-colors cursor-pointer text-xs ${
                    selectedPaymentMethod === m.id
                      ? "bg-gold/20 border-gold text-white font-bold"
                      : "bg-white/5 border-white/10 text-slate-300 hover:text-white"
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Bouton d'action principal */}
          <div className="space-y-2 pt-2">
            <button
              type="button"
              onClick={handleProceed}
              disabled={isSubmitting}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-gold via-yellow-400 to-amber-500 text-[#0D0D12] font-display font-black text-sm tracking-wide shadow-gold-sm flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] transition-transform disabled:opacity-80 disabled:cursor-wait"
            >
              {isSubmitting ? (
                <>
                  <RotateCw className="w-4 h-4 animate-spin" />
                  <span>Redirection sécurisée vers Chariow en cours...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4 stroke-[2.5]" />
                  <span>Valider & Accéder au Paiement Chariow ({currentTier.priceFCFA})</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </>
              )}
            </button>
            <p className="text-[11px] text-slate-500 text-center font-mono flex items-center justify-center gap-1.5">
              <Lock className="w-3 h-3 text-emerald-400 inline" />
              <span>Vos coordonnées et paiements sont chiffrés et 100% sécurisés.</span>
            </p>
          </div>

          {/* Garanties */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-gold shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-medium">Téléchargement Direct</strong>
                <span className="text-slate-400 text-[11px]">Lien instantané après validation.</span>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-start gap-2.5">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-medium">Assistance 7j/7</strong>
                <span className="text-slate-400 text-[11px]">Support technique WhatsApp garanti.</span>
              </div>
            </div>
          </div>

        </div>

        {/* Pied de la modale */}
        <div className="p-4 bg-[#0D0D12] border-t border-white/10 flex items-center justify-center gap-6 text-[11px] font-mono text-slate-400">
          <div className="flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span>SSL 256-Bit</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5 text-gold" />
            <span>Partenaire Officiel Chariow</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Accès Immédiat</span>
          </div>
        </div>

      </div>
    </div>
  );
}
