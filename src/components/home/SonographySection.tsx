import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Scan, Play, Video, Image as ImageIcon, FolderCheck, CheckCircle2, FileText, Info } from 'lucide-react';

interface SonographySectionProps {
  onOpenAppointment: () => void;
}

export const SonographySection: React.FC<SonographySectionProps> = ({ onOpenAppointment }) => {
  const { t } = useLanguage();
  const [activeMediaTab, setActiveMediaTab] = useState<'overview' | 'videos' | 'folderInfo'>('overview');

  return (
    <section className="py-12 px-4 sm:px-8 max-w-6xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="glass-panel rounded-3xl p-8 border border-teal-500/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 text-xs font-bold uppercase tracking-wider">
              <Scan className="w-3.5 h-3.5" />
              <span>{t('sonographyBadge')}</span>
            </div>
            <h2 className="font-serif text-3xl font-bold text-emerald-950 dark:text-white">
              {t('sonographyTitle')}
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 max-w-2xl">
              {t('sonographySubtitle')}
            </p>
          </div>

          <button
            onClick={onOpenAppointment}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-800 to-teal-700 hover:from-emerald-900 hover:to-teal-800 text-white text-xs font-semibold shadow-lg shrink-0"
          >
            {t('bookUltrasound')}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-3 border-b border-gray-200 dark:border-gray-800 pb-3">
        <button
          onClick={() => setActiveMediaTab('overview')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${activeMediaTab === 'overview' ? 'bg-emerald-800 text-white shadow-md' : 'glass-panel text-gray-600 dark:text-gray-300'}`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>{t('tabCapabilities')}</span>
        </button>
        <button
          onClick={() => setActiveMediaTab('videos')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${activeMediaTab === 'videos' ? 'bg-emerald-800 text-white shadow-md' : 'glass-panel text-gray-600 dark:text-gray-300'}`}
        >
          <Video className="w-3.5 h-3.5" />
          <span>{t('tabMediaPlayer')}</span>
        </button>
        <button
          onClick={() => setActiveMediaTab('folderInfo')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${activeMediaTab === 'folderInfo' ? 'bg-emerald-800 text-white shadow-md' : 'glass-panel text-gray-600 dark:text-gray-300'}`}
        >
          <FolderCheck className="w-3.5 h-3.5 text-amber-500" />
          <span>{t('tabAssetFolder')}</span>
        </button>
      </div>

      {/* Tab Content 1: Overview */}
      {activeMediaTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-panel p-6 rounded-2xl space-y-3">
            <div className="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-950/60 flex items-center justify-center text-teal-700 dark:text-teal-300">
              <Scan className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-emerald-950 dark:text-white">{t('follicularStudy')}</h4>
            <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
              {t('follicularStudyDesc')}
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-700 dark:text-emerald-300">
              <Scan className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-emerald-950 dark:text-white">{t('earlyGestation')}</h4>
            <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
              {t('earlyGestationDesc')}
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/60 flex items-center justify-center text-amber-700 dark:text-amber-300">
              <Scan className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-emerald-950 dark:text-white">{t('pelvicHealth')}</h4>
            <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
              {t('pelvicHealthDesc')}
            </p>
          </div>
        </div>
      )}

      {/* Tab Content 2: Video Player */}
      {activeMediaTab === 'videos' && (
        <div className="glass-panel rounded-3xl p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-4">
            <div>
              <h3 className="font-serif font-bold text-lg text-emerald-950 dark:text-white">
                {t('videoShowcaseTitle')}
              </h3>
              <p className="text-xs text-gray-500">
                {t('videoShowcaseSub')}
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-teal-300 text-[11px] font-bold">
              HD Sonography Clips
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Demo Video Frame 1 */}
            <div className="relative rounded-2xl overflow-hidden glass-panel border border-emerald-500/20 group">
              <div className="aspect-video bg-gradient-to-br from-emerald-950 to-gray-900 flex flex-col items-center justify-center p-6 text-center text-white relative">
                <div className="w-14 h-14 rounded-full bg-teal-500/20 backdrop-blur-md border border-teal-400/40 flex items-center justify-center text-teal-300 mb-3 group-hover:scale-110 transition-transform">
                  <Play className="w-6 h-6 fill-current ml-1" />
                </div>
                <h4 className="font-bold text-sm">Follicular Dynamics Sonography</h4>
                <p className="text-[11px] text-gray-400 mt-1">Real-time scan preview</p>
              </div>
              <div className="p-4 bg-white/60 dark:bg-gray-900/60">
                <p className="text-xs font-semibold text-emerald-950 dark:text-white">Demonstration of Follicular Growth Monitoring</p>
                <p className="text-[11px] text-gray-500 mt-0.5">Media path: /assets/sonography/follicular_study.mp4</p>
              </div>
            </div>

            {/* Demo Video Frame 2 */}
            <div className="relative rounded-2xl overflow-hidden glass-panel border border-emerald-500/20 group">
              <div className="aspect-video bg-gradient-to-br from-emerald-950 to-gray-900 flex flex-col items-center justify-center p-6 text-center text-white relative">
                <div className="w-14 h-14 rounded-full bg-teal-500/20 backdrop-blur-md border border-teal-400/40 flex items-center justify-center text-teal-300 mb-3 group-hover:scale-110 transition-transform">
                  <Play className="w-6 h-6 fill-current ml-1" />
                </div>
                <h4 className="font-bold text-sm">Fetal Heartbeat doppler Scan</h4>
                <p className="text-[11px] text-gray-400 mt-1">Early pregnancy confirmation</p>
              </div>
              <div className="p-4 bg-white/60 dark:bg-gray-900/60">
                <p className="text-xs font-semibold text-emerald-950 dark:text-white">Early Gestational Sac & Fetal Doppler Scan</p>
                <p className="text-[11px] text-gray-500 mt-0.5">Media path: /assets/sonography/fetal_doppler.mp4</p>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Tab Content 3: Folder Info (Dedicated User Folder Request) */}
      {activeMediaTab === 'folderInfo' && (
        <div className="glass-panel rounded-3xl p-8 space-y-4 border border-amber-500/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/60 flex items-center justify-center text-amber-600">
              <FolderCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-emerald-950 dark:text-white">
                {t('folderReadyTitle')}
              </h3>
              <p className="text-xs text-emerald-700 dark:text-teal-400 font-semibold">
                Directory: <code className="bg-amber-100 dark:bg-amber-950/80 px-2 py-0.5 rounded text-amber-900 dark:text-amber-200">/public/assets/sonography</code>
              </p>
            </div>
          </div>

          <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
            {t('folderReadyDesc')}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-medium">
            <div className="flex items-center gap-2 p-3 rounded-xl bg-white/40 dark:bg-black/40">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Supports .MP4, .WEBM, .MOV video files</span>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-xl bg-white/40 dark:bg-black/40">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Supports high-res PNG / JPG scan clips</span>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};

