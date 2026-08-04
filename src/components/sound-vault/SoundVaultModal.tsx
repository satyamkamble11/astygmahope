import React, { useState } from 'react';
import { useSoundVault } from '../../context/SoundVaultContext';
import { SoundCategory } from '../../types';
import { 
  X, 
  Lock, 
  Key, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Music, 
  Sparkles, 
  ShieldCheck, 
  Activity,
  CheckCircle2
} from 'lucide-react';

interface SoundVaultModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SoundVaultModal: React.FC<SoundVaultModalProps> = ({ isOpen, onClose }) => {
  const {
    isAuthenticated,
    verifyPasscode,
    selectedCategory,
    setSelectedCategory,
    currentTrack,
    isPlaying,
    playTrack,
    togglePlayPause,
    volume,
    setVolume,
    tracks
  } = useSoundVault();

  const [passcode, setPasscode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const success = verifyPasscode(passcode);
    if (!success) {
      setErrorMsg('Invalid Vault Passcode. Try HOPE2026 or contact clinic admin.');
    } else {
      setErrorMsg('');
    }
  };

  const categories: (SoundCategory | 'All')[] = ['All', 'Meditation', 'Pregnancy', 'Healing', 'Relaxation', 'Yoga', 'Nature'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-lg">
      <div className="glass-panel w-full max-w-3xl rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl border border-teal-500/30 max-h-[92vh] overflow-y-auto relative">
        
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        {!isAuthenticated ? (
          /* Password Authentication Gate */
          <div className="py-8 max-w-md mx-auto text-center space-y-6">
            <div className="w-16 h-16 rounded-3xl bg-amber-500/20 text-amber-500 mx-auto flex items-center justify-center border border-amber-500/30">
              <Lock className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="font-serif text-2xl font-bold text-emerald-950 dark:text-white">
                Protected Healing Sound Library
              </h2>
              <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                Authorized patient audio vault containing Dr. Umesh Datta Kalekar's A-Dhyand Meditation, Garbhasanskar ragas, and cellular healing soundscapes.
              </p>
            </div>

            <form onSubmit={handleVerify} className="space-y-4">
              <div className="relative">
                <Key className="w-4 h-4 text-amber-500 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  placeholder="Enter Passcode (Default: HOPE2026)"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white/60 dark:bg-gray-900/60 text-xs font-medium focus:ring-2 focus:ring-amber-500 outline-none"
                />
              </div>

              {errorMsg && (
                <p className="text-xs text-red-500 font-semibold">{errorMsg}</p>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs shadow-lg transition-all"
              >
                Unlock Healing Vault
              </button>
            </form>

            <p className="text-[11px] text-gray-500">
              Need access? Contact receptionist at +91 7522900512.
            </p>
          </div>
        ) : (
          /* Authenticated Sound Library */
          <div className="space-y-6">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 text-xs font-bold uppercase tracking-wider">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Vault Access Unlocked</span>
                </div>
                <h2 className="font-serif text-2xl font-bold text-emerald-950 dark:text-white mt-1">
                  Sangeetopchar Audio Vault
                </h2>
              </div>
              <span className="text-xs font-semibold text-emerald-700 dark:text-teal-400">
                MP3 • WAV • FLAC Audio Engine
              </span>
            </div>

            {/* Now Playing Bar */}
            {currentTrack && (
              <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950 to-teal-950 text-white flex flex-col sm:flex-row items-center justify-between gap-4 border border-teal-400/30">
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={togglePlayPause}
                    className="w-12 h-12 rounded-xl bg-teal-500 text-emerald-950 flex items-center justify-center hover:scale-105 transition-transform shrink-0"
                  >
                    {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-0.5" />}
                  </button>
                  <div>
                    <p className="text-xs font-bold">{currentTrack.title}</p>
                    <p className="text-[10px] text-teal-300">{currentTrack.category} • {currentTrack.frequencyHz}Hz Resonance • {currentTrack.duration}</p>
                  </div>
                </div>

                {/* Animated Frequency Visualizer Bar */}
                <div className="flex items-center gap-1.5 h-6">
                  {[40, 70, 30, 90, 50, 80, 40, 60].map((h, i) => (
                    <span 
                      key={i} 
                      className={`w-1 rounded-full bg-teal-400 transition-all duration-300 ${isPlaying ? 'animate-pulse' : 'opacity-40'}`} 
                      style={{ height: isPlaying ? `${h}%` : '4px' }} 
                    />
                  ))}
                </div>

                {/* Volume Slider */}
                <div className="flex items-center gap-2 text-xs">
                  {volume === 0 ? <VolumeX className="w-4 h-4 text-gray-400" /> : <Volume2 className="w-4 h-4 text-teal-300" />}
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    className="w-20 accent-teal-400"
                  />
                </div>
              </div>
            )}

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all ${
                    selectedCategory === cat 
                      ? 'bg-emerald-800 text-white shadow-md' 
                      : 'glass-panel text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Track List */}
            <div className="space-y-3">
              {tracks.map((track) => (
                <div
                  key={track.id}
                  onClick={() => playTrack(track)}
                  className={`p-4 rounded-2xl glass-panel flex items-center justify-between gap-4 cursor-pointer hover:bg-emerald-50/50 dark:hover:bg-emerald-950/40 transition-all border ${
                    currentTrack?.id === track.id ? 'border-teal-500 bg-emerald-50/70 dark:bg-emerald-950/60' : 'border-gray-200/50 dark:border-gray-800/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-950/80 text-teal-700 dark:text-teal-300 flex items-center justify-center shrink-0">
                      <Music className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-emerald-950 dark:text-white">{track.title}</h4>
                      <p className="text-[11px] text-gray-500 max-w-md line-clamp-1">{track.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-xs font-semibold">
                    <span className="px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 text-[10px]">
                      {track.frequencyHz}Hz
                    </span>
                    <span className="text-gray-500">{track.duration}</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
