import React from 'react';
import { CLINIC_DATA, FOUNDER_DOCTOR } from '../../data/clinicData';
import { useLanguage } from '../../context/LanguageContext';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Instagram, 
  Facebook, 
  Youtube, 
  Award, 
  HeartHandshake,
  ShieldCheck
} from 'lucide-react';

interface FooterProps {
  onOpenPortal: () => void;
  setActiveTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPortal, setActiveTab }) => {
  const { t } = useLanguage();

  return (
    <footer className="mt-20 border-t border-gray-200/60 dark:border-gray-800/80 bg-white/40 dark:bg-black/40 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* Column 1: Brand & Founder */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <img 
              src="/assets/logo/logo.svg" 
              alt="Astygma Hope Clinic Logo" 
              className="w-11 h-11 object-contain drop-shadow-md"
            />
            <div>
              <h3 className="font-serif font-bold text-lg text-emerald-950 dark:text-white">
                {t('clinicName')}
              </h3>
              <p className="text-xs text-emerald-700 dark:text-teal-400 font-semibold">{CLINIC_DATA.branch}</p>
            </div>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
            {t('footerTagline')}
          </p>
          <div className="pt-2 flex items-center gap-2 text-xs font-medium text-emerald-900 dark:text-teal-300">
            <Award className="w-4 h-4 text-amber-500" />
            <span>{FOUNDER_DOCTOR.name} ({FOUNDER_DOCTOR.experience})</span>
          </div>
        </div>

        {/* Column 2: Branch Address & Hours */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm text-emerald-950 dark:text-white uppercase tracking-wider">
            {t('shirolBranchLocation')}
          </h4>
          <div className="flex items-start gap-2.5 text-xs text-gray-600 dark:text-gray-300">
            <MapPin className="w-4 h-4 text-emerald-700 dark:text-teal-400 shrink-0 mt-0.5" />
            <a href={CLINIC_DATA.branches.shirol.gmapsUrl} target="_blank" rel="noreferrer" className="hover:underline">
              {CLINIC_DATA.address.line1}, {CLINIC_DATA.address.line2}, {CLINIC_DATA.address.landmark}, {CLINIC_DATA.address.city}, {CLINIC_DATA.address.state} - {CLINIC_DATA.address.pincode}, {CLINIC_DATA.address.country}
            </a>
          </div>
          <div className="flex items-center gap-2.5 text-xs text-gray-600 dark:text-gray-300 pt-1">
            <Clock className="w-4 h-4 text-emerald-700 dark:text-teal-400 shrink-0" />
            <span>{CLINIC_DATA.branches.shirol.daysAvailable} ({CLINIC_DATA.branches.shirol.hours})</span>
          </div>
          <p className="text-[11px] text-amber-600 dark:text-amber-400 font-semibold pl-6">
            • {t('sundayClosed')}
          </p>
        </div>

        {/* Column 3: Contact & Direct Actions */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm text-emerald-950 dark:text-white uppercase tracking-wider">
            {t('directHelpline')}
          </h4>
          <div className="flex items-center gap-2.5 text-xs text-gray-700 dark:text-gray-200">
            <Phone className="w-4 h-4 text-emerald-700 dark:text-teal-400 shrink-0" />
            <a href={`tel:${CLINIC_DATA.phone}`} className="hover:underline font-semibold">{CLINIC_DATA.phone}</a>
          </div>
          <div className="flex items-center gap-2.5 text-xs text-gray-700 dark:text-gray-200">
            <Mail className="w-4 h-4 text-emerald-700 dark:text-teal-400 shrink-0" />
            <a href={`mailto:${CLINIC_DATA.email}`} className="hover:underline">{CLINIC_DATA.email}</a>
          </div>

          {/* Social Links */}
          <div className="pt-2 flex items-center gap-3">
            <a 
              href={CLINIC_DATA.socials.instagram} 
              target="_blank" 
              rel="noreferrer"
              className="w-8 h-8 rounded-lg border border-gray-200 dark:border-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-pink-600 hover:border-pink-500 transition-colors"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a 
              href={CLINIC_DATA.socials.facebook} 
              target="_blank" 
              rel="noreferrer"
              className="w-8 h-8 rounded-lg border border-gray-200 dark:border-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-blue-600 hover:border-blue-500 transition-colors"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a 
              href={CLINIC_DATA.socials.youtube} 
              target="_blank" 
              rel="noreferrer"
              className="w-8 h-8 rounded-lg border border-gray-200 dark:border-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-red-600 hover:border-red-500 transition-colors"
            >
              <Youtube className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Column 4: Quick Portal & Compliance */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm text-emerald-950 dark:text-white uppercase tracking-wider">
            {t('internalPortals')}
          </h4>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            For Reception, Doctors, Lab Staff & Administrative Access:
          </p>
          <button
            onClick={onOpenPortal}
            className="w-full py-2.5 px-4 rounded-xl border border-emerald-800/30 dark:border-teal-400/30 bg-emerald-50/50 dark:bg-emerald-950/40 text-emerald-900 dark:text-teal-300 font-medium text-xs flex items-center justify-center gap-2 hover:bg-emerald-100/70 transition-colors"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-700 dark:text-teal-400" />
            <span>{t('staffPortal')}</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6 border-t border-gray-200/40 dark:border-gray-800/40 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500">
        <p>© {new Date().getFullYear()} {t('clinicName')} ({CLINIC_DATA.branch}). {t('rightsReserved')}</p>
        <p className="mt-2 sm:mt-0 font-medium">{t('developedFor')}</p>
      </div>
    </footer>
  );
};
