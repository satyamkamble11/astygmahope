import React from 'react';
import { motion } from 'framer-motion';
import { FOUNDER_DOCTOR } from '../../data/clinicData';
import { useLanguage } from '../../context/LanguageContext';
import { Award, BookOpen, Flame, Activity, Globe, CheckCircle2, HeartHandshake, Leaf } from 'lucide-react';

interface DoctorProfileProps {
  onOpenAppointment: () => void;
}

export const DoctorProfile: React.FC<DoctorProfileProps> = ({ onOpenAppointment }) => {
  const { t } = useLanguage();

  return (
    <section className="py-12 px-4 sm:px-8 max-w-6xl mx-auto space-y-12">
      
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-3xl mx-auto space-y-3"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-teal-300 text-xs font-bold uppercase tracking-widest">
          <Award className="w-3.5 h-3.5 text-amber-500" />
          <span>{t('founderProfileBadge')}</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-emerald-950 dark:text-white">
          {FOUNDER_DOCTOR.name}
        </h2>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
          {FOUNDER_DOCTOR.experience} {t('clinicalExcellence')}
        </p>
      </motion.div>

      {/* Main Profile Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Key Achievements */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55 }}
          className="lg:col-span-5 glass-panel rounded-3xl p-6 sm:p-8 space-y-6 premium-card"
        >
          <img 
            src={FOUNDER_DOCTOR.imagePath} 
            alt={FOUNDER_DOCTOR.name} 
            className="w-48 h-60 rounded-3xl object-cover object-top mx-auto shadow-2xl border-2 border-emerald-500/30" 
          />
          
          <div className="text-center space-y-1">
            <h3 className="font-serif text-xl font-bold text-emerald-950 dark:text-white">
              {FOUNDER_DOCTOR.name}
            </h3>
            <p className="text-xs text-emerald-700 dark:text-teal-400 font-semibold">
              {FOUNDER_DOCTOR.title}
            </p>
            <p className="text-xs text-gray-500">{FOUNDER_DOCTOR.experience} Medical Experience</p>
          </div>

          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900 dark:text-teal-300 border-b border-gray-200/50 dark:border-gray-800/50 pb-2">
              {t('qualificationsCredentials')}
            </h4>
            <div className="space-y-2">
              {FOUNDER_DOCTOR.qualifications.map((q, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-gray-700 dark:text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-teal-400 shrink-0" />
                  <span>{q}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={onOpenAppointment}
            className="w-full py-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs shadow-md transition-all duration-200"
          >
            {t('consultDoctor')}
          </button>
        </motion.div>

        {/* Right Column: Detailed Bio & Innovations */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, delay: 0.05 }}
          className="lg:col-span-7 space-y-6"
        >
          
          {/* Bio Box */}
          <div className="glass-panel rounded-3xl p-6 sm:p-8 space-y-4">
            <h3 className="font-serif text-xl font-bold text-emerald-950 dark:text-white flex items-center gap-2">
              <HeartHandshake className="w-5 h-5 text-emerald-700 dark:text-teal-400" />
              <span>{t('medicalPhilosophy')}</span>
            </h3>
            <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              {FOUNDER_DOCTOR.bio}
            </p>
          </div>

          {/* Research Innovations */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Ultra Yoga Card */}
            <div className="glass-panel rounded-2xl p-5 space-y-2 border border-amber-500/20">
              <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-sm">
                <Flame className="w-4 h-4" />
                <span>{t('ultraYogaTitle')}</span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                {t('ultraYogaDesc')}
              </p>
            </div>

            {/* A-Dhyand Meditation Card */}
            <div className="glass-panel rounded-2xl p-5 space-y-2 border border-teal-500/20">
              <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400 font-bold text-sm">
                <Activity className="w-4 h-4" />
                <span>{t('aDhyandTitle')}</span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                {t('aDhyandDesc')}
              </p>
            </div>

          </div>

          {/* Ayurvedic Fertility Coach Highlight */}
          <div className="glass-panel rounded-2xl p-5 space-y-2 border-2 border-green-500/40 bg-gradient-to-br from-green-50/60 to-emerald-50/40 dark:from-green-950/30 dark:to-emerald-950/30">
            <div className="flex items-center gap-2 text-green-700 dark:text-green-400 font-bold text-sm">
              <Leaf className="w-4 h-4" />
              <span>{t('ayurvedicCoachTitle')}</span>
              <span className="ml-auto px-2.5 py-0.5 rounded-full bg-green-100 dark:bg-green-950 text-green-800 dark:text-green-300 text-[10px] font-bold uppercase tracking-wider">
                {t('ayurvedicCoachBadge')}
              </span>
            </div>
            <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
              {t('ayurvedicCoachDesc')}
            </p>
          </div>

          {/* Workshops & Publications */}
          <div className="glass-panel rounded-3xl p-6 space-y-3">
            <h4 className="font-serif font-bold text-base text-emerald-950 dark:text-white flex items-center gap-2">
              <Globe className="w-4 h-4 text-emerald-700 dark:text-teal-400" />
              <span>{t('workshopsTitle')}</span>
            </h4>
            <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
              {t('workshopsDesc')}
            </p>
          </div>

        </motion.div>

      </div>

    </section>
  );
};
