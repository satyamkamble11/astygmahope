import React from 'react';
import { motion } from 'framer-motion';
import { CLINIC_DATA } from '../../data/clinicData';
import { useLanguage } from '../../context/LanguageContext';
import { Phone, Mail, MessageCircle, Instagram, Facebook, Calendar, MapPin } from 'lucide-react';

interface ContactBarProps {
  onOpenAppointment: () => void;
}

export const ContactBar: React.FC<ContactBarProps> = ({ onOpenAppointment }) => {
  const { t } = useLanguage();
  const whatsAppUrl = `https://wa.me/${CLINIC_DATA.whatsApp.replace(/[^0-9]/g, '')}?text=Hello%20Astygma%20Hope%20Clinic,%20I%20would%20like%20to%20inquire.`;

  const contacts = [
    {
      icon: Phone,
      label: 'Call Helpline',
      value: CLINIC_DATA.phone,
      href: `tel:${CLINIC_DATA.phone}`,
      color: 'text-emerald-700 dark:text-teal-400'
    },
    {
      icon: MessageCircle,
      label: t('whatsAppChat'),
      value: t('chatNow'),
      href: whatsAppUrl,
      color: 'text-green-600'
    },
    {
      icon: Mail,
      label: t('emailUs'),
      value: CLINIC_DATA.email,
      href: `mailto:${CLINIC_DATA.email}`,
      color: 'text-blue-600'
    }
  ];

  return (
    <section id="contact" className="py-12 px-4 sm:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-panel rounded-3xl p-6 sm:p-8 border border-emerald-800/20 space-y-6"
      >
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 text-xs font-bold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5" />
            <span>{t('easyContactBadge')}</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-emerald-950 dark:text-white">
            {t('wereHereToHelp')}
          </h2>
          <p className="text-xs text-gray-500">{t('contactSubtitle')}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {contacts.map((c, idx) => (
            <motion.a
              key={c.label}
              href={c.href}
              target={c.label === 'WhatsApp Chat' ? '_blank' : undefined}
              rel="noreferrer"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.03 }}
              className="flex flex-col items-center gap-2 p-5 rounded-2xl bg-white/60 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-800 hover:border-emerald-500/40 hover:shadow-lg transition-all text-center group"
            >
              <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center group-hover:scale-110 transition-transform">
                <c.icon className={`w-5 h-5 ${c.color}`} />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">{c.label}</span>
              <span className="text-xs font-semibold text-emerald-950 dark:text-white">{c.value}</span>
            </motion.a>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <button
            onClick={onOpenAppointment}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-700 to-indigo-700 text-white font-bold text-xs shadow-lg hover:scale-[1.02] transition-transform"
          >
            <Calendar className="w-4 h-4" />
            {t('bookAppointmentCTA')}
          </button>

          <div className="flex items-center gap-3">
            <a href={CLINIC_DATA.socials.instagram} target="_blank" rel="noreferrer"
              className="w-10 h-10 rounded-xl border border-gray-200 dark:border-gray-800 flex items-center justify-center hover:text-pink-600 hover:border-pink-400 transition-colors">
              <Instagram className="w-4 h-4" />
            </a>
            <a href={CLINIC_DATA.socials.facebook} target="_blank" rel="noreferrer"
              className="w-10 h-10 rounded-xl border border-gray-200 dark:border-gray-800 flex items-center justify-center hover:text-blue-600 hover:border-blue-400 transition-colors">
              <Facebook className="w-4 h-4" />
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
