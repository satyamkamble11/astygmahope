import React, { useEffect, useState } from 'react';
import { FOUNDER_DOCTOR, CLINIC_DATA } from '../../data/clinicData';
import { useLanguage } from '../../context/LanguageContext';
import { fetchDoctors, isSupabaseConfigured } from '../../lib/queries';
import { Doctor } from '../../types';
import { 
  Award, 
  Calendar, 
  CheckCircle2, 
  Flame, 
  Activity, 
  Globe, 
  Scan, 
  FolderCheck,
  Video,
  Play,
  Leaf
} from 'lucide-react';

interface DoctorsPageProps {
  onOpenAppointment: () => void;
  setActiveTab: (tab: string) => void;
}

export const DoctorsPage: React.FC<DoctorsPageProps> = ({ onOpenAppointment, setActiveTab }) => {
  const { t } = useLanguage();
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    let cancelled = false;
    (async () => {
      try {
        const rows = await fetchDoctors();
        if (cancelled || rows.length === 0) return;
const mapped: Doctor[] = rows.map((r) => ({
          id: r.id,
          name: r.name,
          role: r.role || '',
          title: r.title || '',
          experience: r.experience || '',
          qualifications: r.qualifications,
          bio: r.bio || '',
          highlights: r.highlights,
          imagePath: r.image_path || '',
          isFounder: r.is_founder || undefined,
        }));
        setDoctors(mapped);
      } catch (e) {
        console.error('Failed to load doctors from Supabase:', e);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const founderDoctor = doctors.length > 0 ? doctors.find((d) => d.isFounder) || doctors[0] : FOUNDER_DOCTOR;

  return (
    <div className="py-12 px-4 sm:px-8 max-w-7xl mx-auto space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-teal-300 text-xs font-bold uppercase tracking-wider">
          <Award className="w-3.5 h-3.5 text-amber-500" />
          <span>{t('medicalLeadershipBadge')}</span>
        </div>
        <h1 className="font-serif text-4xl font-bold text-emerald-950 dark:text-white">
          {t('ourDoctorsHeading')}
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
          {t('ourDoctorsSubtitle')}
        </p>
      </div>



      {/* Doctor 1: Founder Dr. Umesh Datta Kalekar */}
      <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-emerald-800/20 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
{/* Photo Column */}
        <div className="lg:col-span-5 text-center space-y-4">
          <img 
            src={founderDoctor.imagePath} 
            alt={founderDoctor.name} 
            className="w-64 h-80 rounded-3xl object-cover object-top mx-auto shadow-2xl border-4 border-emerald-500/30" 
          />
          <div className="space-y-1">
            <h3 className="font-serif text-2xl font-bold text-emerald-950 dark:text-white">{founderDoctor.name}</h3>
            <p className="text-xs font-bold text-emerald-700 dark:text-teal-400">{founderDoctor.title}</p>
            <p className="text-xs text-amber-600 font-semibold">{founderDoctor.experience} Medical Leadership</p>
          </div>

          <button
            onClick={onOpenAppointment}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-900 to-emerald-700 hover:from-emerald-950 hover:to-emerald-800 text-white text-xs font-semibold shadow-lg flex items-center justify-center gap-2"
          >
            <Calendar className="w-4 h-4" /> {t('requestAppointmentKalekar')}
          </button>
        </div>

        {/* Bio & Credentials Column */}
        <div className="lg:col-span-7 space-y-6">
          
<div className="space-y-2">
            <h4 className="font-serif font-bold text-xl text-emerald-950 dark:text-white">{t('biographyHeading')}</h4>
            <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              {founderDoctor.bio}
            </p>
          </div>

          <div className="space-y-3">
            <h5 className="font-bold text-xs uppercase tracking-wider text-emerald-900 dark:text-teal-300">
              {t('qualificationsCredentials')}
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {founderDoctor.qualifications.map((q, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2.5 rounded-xl bg-white/40 dark:bg-black/40 text-xs text-gray-700 dark:text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-teal-400 shrink-0" />
                  <span>{q}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Proprietary Research */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/40 space-y-1">
              <span className="font-bold text-xs text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
                <Flame className="w-4 h-4" /> {t('ultraYogaDev')}
              </span>
              <p className="text-[11px] text-gray-600 dark:text-gray-400 leading-tight">
                {t('ultraYogaDevDesc')}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-teal-50/60 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800/40 space-y-1">
              <span className="font-bold text-xs text-teal-800 dark:text-teal-300 flex items-center gap-1.5">
                <Activity className="w-4 h-4" /> {t('aDhyandDev')}
              </span>
              <p className="text-[11px] text-gray-600 dark:text-gray-400 leading-tight">
                {t('aDhyandDevDesc')}
              </p>
            </div>
          </div>


          {/* Ayurvedic Fertility Coach Highlight */}
          <div className="p-4 rounded-2xl border-2 border-green-500/40 bg-gradient-to-br from-green-50/60 to-emerald-50/40 dark:from-green-950/30 dark:to-emerald-950/30 space-y-1">
            <span className="font-bold text-xs text-green-800 dark:text-green-300 flex items-center gap-1.5">
              <Leaf className="w-4 h-4" /> {t('ayurvedicCoachTitle')}
              <span className="ml-auto px-2.5 py-0.5 rounded-full bg-green-100 dark:bg-green-950 text-green-800 dark:text-green-300 text-[10px] font-bold uppercase tracking-wider">
                {t('ayurvedicCoachBadge')}
              </span>
            </span>
            <p className="text-[11px] text-gray-600 dark:text-gray-400 leading-tight">
              {t('ayurvedicCoachDesc')}
            </p>
          </div>

        </div>

      </div>



      {/* Sonography Department Section Link */}
      <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-teal-500/30 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        <div className="lg:col-span-4 text-center space-y-4">
          <div className="w-48 h-60 rounded-3xl bg-gradient-to-br from-teal-900 to-emerald-950 mx-auto flex flex-col items-center justify-center p-6 text-white border-2 border-teal-400/30 shadow-xl">
            <Scan className="w-12 h-12 text-teal-400 mb-2" />
            <h4 className="font-serif font-bold text-lg">{t('sonographyTitle')}</h4>
            <p className="text-[11px] text-teal-300 mt-1">{t('sonographyDept')}</p>
          </div>
          <button
            onClick={() => setActiveTab('sonography')}
            className="w-full py-3 rounded-xl glass-panel text-xs font-semibold text-emerald-900 dark:text-teal-300 flex items-center justify-center gap-2"
          >
            <Video className="w-4 h-4 text-teal-400" /> {t('openSonographyCenter')}
          </button>
        </div>

        <div className="lg:col-span-8 space-y-4">
          <span className="px-3 py-1 rounded-md bg-teal-100 dark:bg-teal-950/80 text-teal-800 dark:text-teal-300 text-xs font-bold uppercase tracking-wider">
            {t('diagnosticUltrasoundDept')}
          </span>
          <h3 className="font-serif text-2xl font-bold text-emerald-950 dark:text-white">
            {t('sonographyDeptTitle')}
          </h3>
          <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            {t('sonographyDeptDesc')}
          </p>

          <div className="p-4 rounded-2xl bg-amber-50/50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/40 text-xs text-amber-900 dark:text-amber-300 flex items-start gap-2.5">
            <FolderCheck className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>
              <strong>{t('folderProvisioned')}</strong>: {t('folderProvisionedDesc')} <code className="font-mono bg-amber-100 dark:bg-amber-950 px-1 py-0.5 rounded text-amber-900 dark:text-amber-200">/public/assets/sonography</code>
            </span>
          </div>

          <button
            onClick={onOpenAppointment}
            className="px-6 py-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs shadow-md"
          >
            {t('requestUltrasoundAppointment')}
          </button>
        </div>

      </div>


    </div>
  );
};
