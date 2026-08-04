import React from 'react';
import { motion } from 'framer-motion';
import { CLINIC_DATA, FOUNDER_DOCTOR } from '../../data/clinicData';
import { useLanguage } from '../../context/LanguageContext';
import { 
  Sparkles, 
  Calendar, 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  Music, 
  ArrowRight,
  MapPin,
  Clock,
  Phone,
  Building2
} from 'lucide-react';

interface HeroProps {
  onOpenAppointment: () => void;
  onOpenSoundVault: () => void;
  setActiveTab: (tab: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenAppointment,
  onOpenSoundVault,
  setActiveTab
}) => {
  const { t } = useLanguage();
  const titleLine1 = t('heroTitleLine1');
  const titleLine2 = t('heroTitleLine2');

  return (
    <section className="relative pt-6 pb-16 px-4 sm:px-8 max-w-7xl mx-auto overflow-hidden space-y-10">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[-8%] top-6 h-40 w-40 rounded-full bg-emerald-400/20 blur-3xl animate-[float_12s_ease-in-out_infinite]" />
        <div className="absolute right-[-6%] top-12 h-56 w-56 rounded-full bg-sky-400/20 blur-3xl animate-[float_16s_ease-in-out_infinite]" />
      </div>
      
      {/* Top Direct Helpline Ribbon inspired by reference website header */}
<div className="w-full glass-panel rounded-2xl px-4 py-2.5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs border border-emerald-500/20 bg-gradient-to-r from-emerald-950 via-teal-950 to-emerald-900 text-white">
        <div className="flex items-center gap-2 font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>{t('callHelpline')}</span>
          <a href={`tel:${CLINIC_DATA.phone}`} className="font-bold text-amber-300 hover:underline">{CLINIC_DATA.phone}</a>
        </div>
        <div className="flex items-center gap-4 text-[11px] font-semibold text-teal-200">
          <span>📍 {t('shirolHqLocation')}</span>
          <span>•</span>
          <span>📍 {t('kolhapurLocation')}</span>
        </div>
      </div>

      {/* Main Hero Split Layout */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        {/* Left Column - Main Copy & Clinic Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="lg:col-span-7 space-y-6 text-center lg:text-left"
        >
          
{/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-800/20 dark:border-teal-400/30 bg-emerald-50/80 dark:bg-emerald-950/60 text-emerald-900 dark:text-teal-300 text-xs font-bold backdrop-blur-md shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
            <span>{t('branchesBadge')}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>{FOUNDER_DOCTOR.experience} {t('clinicalExcellence')}</span>
          </div>

          {/* Main Headline */}
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-emerald-950 dark:text-white leading-[1.15]">
            <span className="block">{titleLine1}</span>
            <span className="block bg-gradient-to-r from-emerald-800 via-teal-700 to-amber-600 dark:from-teal-400 dark:via-emerald-300 dark:to-amber-300 bg-clip-text text-transparent">
              {titleLine2}
            </span>
          </h1>

          {/* Clinic Summary Subtext */}
          <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            {t('heroSubtitle')}
          </p>

          {/* Two Branch Direct Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-left">
            <div className="p-3.5 rounded-2xl glass-panel border border-emerald-800/20 space-y-1">
              <p className="font-bold text-emerald-950 dark:text-white flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-emerald-700 dark:text-teal-400" /> {t('shirolBranchName')}
              </p>
              <p className="text-[11px] text-emerald-800 dark:text-teal-300 font-semibold">
                📍 {CLINIC_DATA.branches.shirol.distanceInfo}
              </p>
              <p className="text-[10px] text-gray-500">{t('shirolDaysShort')}</p>
            </div>

            <div className="p-3.5 rounded-2xl glass-panel border border-emerald-800/20 space-y-1">
              <p className="font-bold text-emerald-950 dark:text-white flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-teal-600" /> {t('kolhapurBranchName')}
              </p>
              <p className="text-[11px] text-emerald-800 dark:text-teal-300 font-semibold">
                📍 {CLINIC_DATA.branches.kolhapur.distanceInfo}
              </p>
              <p className="text-[10px] text-gray-500">{t('kolhapurDaysShort')}</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={onOpenAppointment}
              className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 hover:from-blue-800 hover:to-indigo-800 text-white font-bold text-sm shadow-xl flex items-center justify-center gap-2.5 transition-all duration-300"
            >
              <Calendar className="w-4 h-4 text-amber-300" />
              <span>{t('bookAppointmentCTA')}</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={onOpenSoundVault}
              className="w-full sm:w-auto px-6 py-4 rounded-2xl glass-panel text-emerald-950 dark:text-white font-semibold text-xs hover:bg-emerald-100/50 dark:hover:bg-gray-800/60 flex items-center justify-center gap-2.5 transition-all duration-300"
            >
              <Music className="w-4 h-4 text-emerald-700 dark:text-teal-400" />
              <span>{t('exploreSoundVault')}</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Right Column - Founder Doctor Card with official photograph */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
          className="lg:col-span-5 relative"
        >
          <div className="relative glass-panel rounded-3xl p-6 shadow-2xl border border-emerald-800/20 space-y-6 premium-card">
            
            {/* Doctor Header */}
            <div className="flex items-center gap-4 border-b border-gray-200/60 dark:border-gray-800/60 pb-4">
              <img 
                src={FOUNDER_DOCTOR.imagePath} 
                alt={FOUNDER_DOCTOR.name} 
                className="w-20 h-24 rounded-2xl object-cover object-top shadow-md shrink-0 border border-emerald-500/30" 
              />
              <div>
                <span className="px-2.5 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-[10px] font-bold uppercase tracking-wider">
                  {t('founderTitle')}
                </span>
                <h3 className="font-serif font-bold text-xl text-emerald-950 dark:text-white mt-0.5">
                  {FOUNDER_DOCTOR.name}
                </h3>
                <p className="text-xs text-emerald-700 dark:text-teal-400 font-semibold">
                  {FOUNDER_DOCTOR.experience} {t('clinicalExcellence')}
                </p>
                <p className="text-[11px] text-gray-500 mt-1">{t('mdHealthEducator')}</p>
              </div>
            </div>

            {/* Accreditations */}
            <div className="space-y-2 text-xs text-gray-700 dark:text-gray-300">
              <p className="font-semibold text-emerald-900 dark:text-teal-300">{t('keySpecializations')}</p>
              <ul className="space-y-1.5">
                {FOUNDER_DOCTOR.highlights.map((h, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-teal-400 shrink-0" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Profile CTA */}
            <button
              onClick={() => setActiveTab('doctors')}
              className="w-full py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 text-xs font-semibold text-emerald-900 dark:text-teal-300 hover:bg-gray-100 dark:hover:bg-gray-800/60 transition-colors flex items-center justify-center gap-2"
            >
              <span>{t('viewFullCredentials')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
