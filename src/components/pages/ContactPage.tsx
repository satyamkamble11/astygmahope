import React, { useState } from 'react';
import { CLINIC_DATA } from '../../data/clinicData';
import { useLanguage } from '../../context/LanguageContext';
import { createContactMessage, isSupabaseConfigured } from '../../lib/queries';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  MessageSquare, 
  CheckCircle2, 
  Building2,
  Calendar,
  ExternalLink,
  AlertCircle
} from 'lucide-react';

interface ContactPageProps {
  onOpenAppointment: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onOpenAppointment }) => {
  const { t } = useLanguage();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sentSuccess, setSentSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    setSubmitting(true);
    setError('');

    if (isSupabaseConfigured) {
      try {
        await createContactMessage({ name, phone, email, message });
        setSentSuccess(true);
        setTimeout(() => {
          setName('');
          setPhone('');
          setEmail('');
          setMessage('');
          setSentSuccess(false);
        }, 4000);
      } catch (err) {
        setError('Failed to send message. Please try again or use WhatsApp.');
      } finally {
        setSubmitting(false);
      }
      return;
    }

    // Fallback demo mode
    setSentSuccess(true);
    setTimeout(() => {
      setName('');
      setPhone('');
      setEmail('');
      setMessage('');
      setSentSuccess(false);
    }, 4000);
    setSubmitting(false);
  };

  const whatsAppUrl = `https://wa.me/${CLINIC_DATA.whatsApp.replace(/[^0-9]/g, '')}?text=Hello%20Astygma%20Hope%20Clinic%20Shirol,%20I%20have%20an%20inquiry.`;

  return (
    <div className="py-12 px-4 sm:px-8 max-w-7xl mx-auto space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-teal-300 text-xs font-bold uppercase tracking-wider">
          <MapPin className="w-3.5 h-3.5" />
          <span>{t('contactBadge')}</span>
        </div>
        <h1 className="font-serif text-4xl font-bold text-emerald-950 dark:text-white">
          {t('contactHeading')}
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
          {t('contactPageSubtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Contact Cards */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="glass-panel rounded-3xl p-6 space-y-4 border border-emerald-800/20">
            <h3 className="font-serif font-bold text-lg text-emerald-950 dark:text-white flex items-center gap-2">
              <Building2 className="w-5 h-5 text-emerald-700 dark:text-teal-400" />
              <span>{t('shirolBranchLocation')}</span>
            </h3>
            
            <a
              href={CLINIC_DATA.branches.shirol.gmapsUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-start gap-3 text-xs text-gray-700 dark:text-gray-300 hover:text-emerald-700 dark:hover:text-teal-300 transition-colors"
            >
              <MapPin className="w-4 h-4 text-emerald-700 dark:text-teal-400 shrink-0 mt-0.5" />
              <span>
                {CLINIC_DATA.address.line1}, {CLINIC_DATA.address.line2}, {CLINIC_DATA.address.landmark}, {CLINIC_DATA.address.city}, {CLINIC_DATA.address.state} - {CLINIC_DATA.address.pincode}, {CLINIC_DATA.address.country}
              </span>
            </a>

            <div className="flex items-center gap-3 text-xs text-gray-700 dark:text-gray-300">
              <Clock className="w-4 h-4 text-emerald-700 dark:text-teal-400 shrink-0" />
              <span>{CLINIC_DATA.branches.shirol.daysAvailable} ({CLINIC_DATA.branches.shirol.hours})</span>
            </div>
            <p className="text-[11px] text-amber-600 font-semibold pl-7">• {t('sundayClosed')}</p>

            <a
              href={CLINIC_DATA.branches.shirol.gmapsUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-emerald-700 dark:text-teal-300 font-semibold text-xs hover:underline"
            >
              <MapPin className="w-3.5 h-3.5" /> {t('viewOnMap')}
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="glass-panel rounded-3xl p-6 space-y-4 border border-teal-500/20">
            <h3 className="font-serif font-bold text-lg text-emerald-950 dark:text-white flex items-center gap-2">
              <Phone className="w-5 h-5 text-teal-600" />
              <span>{t('helplineWhatsApp')}</span>
            </h3>

            <div className="flex items-center justify-between text-xs font-semibold text-emerald-900 dark:text-teal-300">
              <span>{t('clinicPhone')}</span>
              <a href={`tel:${CLINIC_DATA.phone}`} className="hover:underline">{CLINIC_DATA.phone}</a>
            </div>

            <div className="flex items-center justify-between text-xs font-semibold text-emerald-900 dark:text-teal-300">
              <span>{t('officialEmail')}</span>
              <a href={`mailto:${CLINIC_DATA.email}`} className="hover:underline">{CLINIC_DATA.email}</a>
            </div>

            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs shadow-md flex items-center justify-center gap-2 transition-all"
            >
              <MessageSquare className="w-4 h-4" /> {t('openWhatsAppChat')}
            </a>
          </div>

          <button
            onClick={onOpenAppointment}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-900 to-teal-800 text-white font-semibold text-xs shadow-xl flex items-center justify-center gap-2"
          >
            <Calendar className="w-4 h-4 text-amber-300" /> {t('requestAppointment500')}
          </button>

        </div>

        {/* Right Column: Contact Form & Google Maps */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="glass-panel rounded-3xl p-6 sm:p-8 space-y-4 border border-emerald-800/20">
            <h3 className="font-serif font-bold text-xl text-emerald-950 dark:text-white">
              {t('sendInquiry')}
            </h3>

{sentSuccess && (
              <div className="p-3 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{t('inquirySuccess')}</span>
              </div>
            )}

            {error && (
              <div className="p-3 rounded-xl bg-red-100 text-red-700 text-xs font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-600" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">{t('yourName')}</label>
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white/60 dark:bg-gray-900/60 text-xs font-medium outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">{t('phoneNumber')}</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 9876543210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white/60 dark:bg-gray-900/60 text-xs font-medium outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">{t('emailOptional')}</label>
                <input
                  type="email"
                  placeholder="yourname@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white/60 dark:bg-gray-900/60 text-xs font-medium outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">{t('messageInquiry')}</label>
                <textarea
                  rows={3}
                  placeholder="How can Dr. Kalekar's office help you today?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white/60 dark:bg-gray-900/60 text-xs font-medium outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs shadow-md flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" /> {t('sendInquiryToReception')}
              </button>
            </form>
          </div>

          {/* Direction & Location Card */}
          <div className="glass-panel rounded-3xl p-5 border border-emerald-800/20 space-y-4">
            <div className="flex items-center gap-2 text-emerald-900 dark:text-teal-300 font-bold text-sm">
              <MapPin className="w-4 h-4 text-emerald-700 dark:text-teal-400" /> {t('quickDirections')}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="rounded-2xl border border-emerald-800/20 bg-white/60 dark:bg-gray-900/40 p-4 space-y-2">
                <p className="font-bold text-emerald-950 dark:text-white">Shirol Branch</p>
                <p className="text-gray-600 dark:text-gray-300">{t('shirolBranchDesc')}</p>
                <a href={CLINIC_DATA.branches.shirol.gmapsUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-emerald-700 dark:text-teal-300 font-semibold hover:underline">
                  <MapPin className="w-3.5 h-3.5" /> {t('openLocation')}
                </a>
              </div>
              <div className="rounded-2xl border border-emerald-800/20 bg-white/60 dark:bg-gray-900/40 p-4 space-y-2">
                <p className="font-bold text-emerald-950 dark:text-white">Kolhapur Branch</p>
                <p className="text-gray-600 dark:text-gray-300">{t('kolhapurBranchDesc')}</p>
                <a href={CLINIC_DATA.branches.kolhapur.gmapsUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-emerald-700 dark:text-teal-300 font-semibold hover:underline">
                  <MapPin className="w-3.5 h-3.5" /> {t('openLocation')}
                </a>
              </div>
            </div>

            {/* Embedded Google Map for Shirol Branch */}
            <div className="rounded-2xl overflow-hidden border border-emerald-800/20">
              <iframe
                title="Astygma Hope Clinic Shirol Branch - Google Map"
                src="https://maps.google.com/maps?q=Astygma%20Hope%20Clinic%20Shirol%20Maharashtra%20416103&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="w-full h-64"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <p className="text-[11px] text-center text-gray-500">
              <a href={CLINIC_DATA.branches.shirol.gmapsUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-emerald-700 dark:text-teal-300 font-semibold hover:underline">
                <ExternalLink className="w-3 h-3" /> {t('viewOnMap')} — Shirol Branch
              </a>
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

