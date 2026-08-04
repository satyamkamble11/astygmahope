import React from 'react';
import { motion } from 'framer-motion';
import { CLINIC_MISSION, TRUST_POINTS } from '../../data/clinicData';
import { useLanguage } from '../../context/LanguageContext';
import { HeartHandshake, ShieldCheck, Sparkles, Award, Users, Stethoscope } from 'lucide-react';

const icons = [Award, HeartHandshake, Sparkles, Users, Stethoscope, ShieldCheck];

interface ClinicInfoSectionProps {
  onOpenAppointment: () => void;
}

export const ClinicInfoSection: React.FC<ClinicInfoSectionProps> = ({ onOpenAppointment }) => {
  const { t } = useLanguage();

  return (
    <section id="about-clinic" className="py-16 px-4 sm:px-8 max-w-7xl mx-auto space-y-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-3xl mx-auto space-y-4"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-teal-300 text-xs font-bold uppercase tracking-wider">
          <HeartHandshake className="w-3.5 h-3.5 text-amber-500" />
          <span>{t('aboutClinicBadge')}</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-emerald-950 dark:text-white">
          {t('whyPatientsTrustUs')}
        </h2>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
          {CLINIC_MISSION}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {TRUST_POINTS.map((point, idx) => {
          const Icon = icons[idx] || ShieldCheck;
          return (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="glass-panel rounded-2xl p-5 space-y-3 border border-emerald-800/10 hover:shadow-xl transition-shadow"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center">
                <Icon className="w-5 h-5 text-emerald-700 dark:text-teal-400" />
              </div>
              <h3 className="font-serif font-bold text-base text-emerald-950 dark:text-white">{point.title}</h3>
              <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">{point.desc}</p>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <button
          onClick={onOpenAppointment}
          className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-800 hover:to-indigo-800 text-white font-bold text-sm shadow-xl transition-all hover:scale-[1.02] active:scale-95"
        >
          {t('bookConsultation500')}
        </button>
      </motion.div>
    </section>
  );
};
