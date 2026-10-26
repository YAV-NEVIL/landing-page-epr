import React, { useEffect } from 'react';
import { 
  X, 
  ShieldCheck, 
  Lock, 
  Sparkles, 
  CheckCircle, 
  ArrowRight, 
  ExternalLink, 
  FileSpreadsheet, 
  FileText, 
  BookOpen, 
  Smartphone,
  Zap
} from 'lucide-react';

export default function CheckoutModal({ isOpen, onClose, selectedTier, onConfirmOrder }) {
  const chariowCheckoutUrl = "https://zpkvlptl.mychariow.shop/la-methode-epr/checkout";

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
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentTier = selectedTier || {
    title: "Le Pack Système Méthode EPR — Intégral",
    priceUSD: "15,80 $US",
    priceFCFA: "~10 000 FCFA",
    oldPrice: "97,00 $US"
  };

  const handleProceed = () => {
    if (onConfirmOrder) {
      onConfirmOrder();
    } else {
      window.location.href = chariowCheckoutUrl;
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
              Finaliser votre Commande
            </h3>
            <p className="text-xs text-slate-400 font-light">
              Accès immédiat au Pack Téléchargeable • Ir. Jean Philippe
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
        <div className="p-6 overflow-y-auto space-y-6 text-sm">
          
          {/* Fiche récapitulative du produit */}
          <div className="p-4 rounded-2xl bg-[#0D0D12] border border-gold/30 flex gap-4 items-center">
            <img 
              src="/assets/mockup-pack-3d.png" 
              alt="Pack Système EPR" 
              className="w-20 h-20 object-contain shrink-0 filter drop-shadow-md"
              onError={(e) => { e.currentTarget.src = "/assets/portrait-electricien-ingenieur-hd.jpg"; }}
            />
            <div className="space-y-1 min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[9px] px-2 py-0.5 rounded-full bg-gold/15 text-gold border border-gold/30 font-bold uppercase">
                  SYSTÈME COMPLET
                </span>
                <span className="text-[10px] font-mono text-emerald-400 font-bold">LIVRAISON .ZIP</span>
              </div>
              <h4 className="font-display font-bold text-white text-base leading-tight truncate">
                {currentTier.title}
              </h4>
              <p className="text-xs text-slate-400">
                Livre 222 pages + 35 Excel de Rentabilité + 30 Modèles Word
              </p>
            </div>
          </div>

          {/* Tarif officiel */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-gold/10 via-[#1A1A26] to-gold/10 border border-gold/30 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono text-slate-400 uppercase">Tarif officiel Chariow</span>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-2xl font-display font-black text-gold">
                  {currentTier.priceFCFA}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  ({currentTier.priceUSD})
                </span>
                {currentTier.oldPrice && (
                  <span className="text-xs font-mono text-slate-500 line-through">
                    {currentTier.oldPrice}
                  </span>
                )}
              </div>
            </div>
            <div className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-mono text-[10px] font-bold text-right">
              Paiement unique • Accès à vie
            </div>
          </div>

          {/* Moyens de paiement acceptés */}
          <div className="space-y-2">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
              Moyens de paiement acceptés sur la passerelle :
            </span>
            <div className="flex flex-wrap gap-2 text-xs font-mono">
              <span className="px-2.5 py-1 rounded-xl bg-white/5 border border-white/10 text-slate-200">🌊 Wave</span>
              <span className="px-2.5 py-1 rounded-xl bg-white/5 border border-white/10 text-slate-200">🟠 Orange Money</span>
              <span className="px-2.5 py-1 rounded-xl bg-white/5 border border-white/10 text-slate-200">🟡 MTN MoMo</span>
              <span className="px-2.5 py-1 rounded-xl bg-white/5 border border-white/10 text-slate-200">🔵 Moov Money</span>
              <span className="px-2.5 py-1 rounded-xl bg-white/5 border border-white/10 text-slate-200">🔴 Airtel Money</span>
              <span className="px-2.5 py-1 rounded-xl bg-white/5 border border-white/10 text-slate-200">💳 Visa / Mastercard</span>
            </div>
          </div>

          {/* Bouton d'action principal */}
          <div className="space-y-2 pt-2">
            <button
              type="button"
              onClick={handleProceed}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-gold via-yellow-400 to-amber-500 text-[#0D0D12] font-display font-black text-sm tracking-wide shadow-gold-sm flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] transition-transform"
            >
              <span>Accéder au Paiement Chariow ({currentTier.priceFCFA})</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
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
