import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { CLINIC_DATA } from '../../data/clinicData';
import { 
  HeartHandshake, 
  Globe, 
  Sun, 
  Moon, 
  Sparkles, 
  Calendar, 
  Music, 
  Menu, 
  X, 
  Phone,
  ShieldCheck
} from 'lucide-react';
import { ThemeMode, Language } from '../../types';

interface NavbarProps {
  onOpenAppointment: () => void;
  onOpenSoundVault: () => void;
  onOpenPortal: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAppointment,
  onOpenSoundVault,
  onOpenPortal,
  activeTab,
  setActiveTab
}) => {
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const clinicName = t('clinicName');
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const languages: { code: Language; label: string }[] = [
    { code: 'EN', label: 'English' },
    { code: 'MR', label: 'मराठी' },
    { code: 'HI', label: 'हिंदी' }
  ];

  const themes: { mode: ThemeMode; label: string; icon: React.ReactNode }[] = [
    { mode: 'light', label: 'Light Luxury', icon: <Sun className="w-4 h-4 text-amber-500" /> },
    { mode: 'dark', label: 'Dark Obsidian', icon: <Moon className="w-4 h-4 text-teal-400" /> },
    { mode: 'diwali', label: 'Diwali Theme', icon: <Sparkles className="w-4 h-4 text-amber-400" /> },
    { mode: 'navratri', label: 'Navratri Theme', icon: <Sparkles className="w-4 h-4 text-purple-400" /> }
  ];

  return (
    <header className="sticky top-0 z-50 px-4 sm:px-8 py-3">
      <motion.nav
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`max-w-7xl mx-auto glass-panel rounded-2xl px-4 sm:px-6 py-3 flex items-center justify-between shadow-glass transition-all duration-300 ${scrolled ? 'shadow-2xl' : ''}`}
      >
        
        {/* Brand Logo & Name */}
        <div 
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <img 
            src="/assets/logo/logo.svg" 
            alt="Astygma Hope Clinic Logo" 
            className="w-11 h-11 object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-md"
          />
          <div>
            <h1 className="font-serif font-bold text-lg sm:text-xl tracking-tight text-emerald-950 dark:text-white group-hover:text-emerald-700 transition-colors">
              {clinicName}
            </h1>
            <p className="text-[10px] uppercase tracking-widest text-emerald-700 dark:text-teal-400 font-semibold">
              {CLINIC_DATA.branch}
            </p>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-5 font-medium text-xs">
          <button 
            onClick={() => setActiveTab('home')}
            className={`hover:text-emerald-700 dark:hover:text-teal-300 transition-colors ${activeTab === 'home' ? 'text-emerald-800 dark:text-teal-400 font-bold' : 'text-gray-600 dark:text-gray-300'}`}
          >
            {t('home')}
          </button>
          <button 
            onClick={() => setActiveTab('about')}
            className={`hover:text-emerald-700 dark:hover:text-teal-300 transition-colors ${activeTab === 'about' ? 'text-emerald-800 dark:text-teal-400 font-bold' : 'text-gray-600 dark:text-gray-300'}`}
          >
            {t('about')}
          </button>
          <button 
            onClick={() => setActiveTab('doctors')}
            className={`hover:text-emerald-700 dark:hover:text-teal-300 transition-colors ${activeTab === 'doctors' ? 'text-emerald-800 dark:text-teal-400 font-bold' : 'text-gray-600 dark:text-gray-300'}`}
          >
            {t('doctors')}
          </button>
          <button 
            onClick={() => setActiveTab('services')}
            className={`hover:text-emerald-700 dark:hover:text-teal-300 transition-colors ${activeTab === 'services' ? 'text-emerald-800 dark:text-teal-400 font-bold' : 'text-gray-600 dark:text-gray-300'}`}
          >
            {t('services')}
          </button>
          <button 
            onClick={() => setActiveTab('gallery')}
            className={`hover:text-emerald-700 dark:hover:text-teal-300 transition-colors ${activeTab === 'gallery' ? 'text-emerald-800 dark:text-teal-400 font-bold' : 'text-gray-600 dark:text-gray-300'}`}
          >
            {t('gallery')}
          </button>
          <button 
            onClick={() => setActiveTab('cms')}
            className={`hover:text-emerald-700 dark:hover:text-teal-300 transition-colors ${activeTab === 'cms' ? 'text-emerald-800 dark:text-teal-400 font-bold' : 'text-gray-600 dark:text-gray-300'}`}
          >
            {t('cmsFeed')}
          </button>
          <button 
            onClick={() => setActiveTab('courses')}
            className={`hover:text-emerald-700 dark:hover:text-teal-300 transition-colors ${activeTab === 'courses' ? 'text-emerald-800 dark:text-teal-400 font-bold' : 'text-gray-600 dark:text-gray-300'}`}
          >
            {t('courses')}
          </button>
          <button 
            onClick={() => setActiveTab('contact')}
            className={`hover:text-emerald-700 dark:hover:text-teal-300 transition-colors ${activeTab === 'contact' ? 'text-emerald-800 dark:text-teal-400 font-bold' : 'text-gray-600 dark:text-gray-300'}`}
          >
            {t('contact')}
          </button>
          <button 
            onClick={onOpenSoundVault}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-100/50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-200/60 transition-colors text-[11px] font-bold"
          >
            <Music className="w-3.5 h-3.5" /> {t('soundVault')}
          </button>
        </div>

        {/* Right Controls */}
        <div className="hidden lg:flex items-center gap-3">
          
          {/* Language Switcher */}
          <div className="relative">
            <button 
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800/60 transition-colors text-xs font-medium"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-700 dark:text-teal-400" />
              <span>{language}</span>
            </button>
            {langDropdownOpen && (
              <div className="absolute right-0 mt-2 w-32 glass-panel rounded-xl py-1 shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                {languages.map(l => (
                  <button
                    key={l.code}
                    onClick={() => {
                      setLanguage(l.code);
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-xs hover:bg-emerald-50 dark:hover:bg-emerald-950/40 flex items-center justify-between ${language === l.code ? 'font-bold text-emerald-800 dark:text-teal-400' : ''}`}
                  >
                    <span>{l.label}</span>
                    {language === l.code && <span className="text-[10px] text-emerald-600">✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme Switcher */}
          <div className="relative">
            <button 
              onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
              className="p-2 rounded-xl border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800/60 transition-colors"
              title="Theme Switcher"
            >
              {theme === 'light' && <Sun className="w-4 h-4 text-amber-500" />}
              {theme === 'dark' && <Moon className="w-4 h-4 text-teal-400" />}
              {(theme === 'diwali' || theme === 'navratri') && <Sparkles className="w-4 h-4 text-amber-400" />}
            </button>
            {themeDropdownOpen && (
              <div className="absolute right-0 mt-2 w-44 glass-panel rounded-xl py-1 shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                {themes.map(t => (
                  <button
                    key={t.mode}
                    onClick={() => {
                      setTheme(t.mode);
                      setThemeDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-xs hover:bg-emerald-50 dark:hover:bg-emerald-950/40 flex items-center gap-2 ${theme === t.mode ? 'font-bold text-emerald-800 dark:text-teal-400' : ''}`}
                  >
                    {t.icon}
                    <span>{t.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Staff Portal Link */}
          <button
            onClick={onOpenPortal}
            className="p-2 rounded-xl border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800/60 transition-colors text-xs text-gray-500 dark:text-gray-400"
            title="Portal Login"
          >
            <ShieldCheck className="w-4 h-4" />
          </button>

          {/* Book Appointment CTA Button */}
          <button
            onClick={onOpenAppointment}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-800 to-emerald-700 hover:from-emerald-900 hover:to-emerald-800 text-white font-medium text-xs shadow-md hover:shadow-lg transition-all duration-200 active:scale-95"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>{t('bookAppointment')}</span>
          </button>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            onClick={onOpenAppointment}
            className="px-3 py-1.5 rounded-lg bg-emerald-800 text-white text-xs font-semibold"
          >
            Book
          </button>
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg border border-gray-200 dark:border-gray-800"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 glass-panel rounded-2xl p-4 shadow-xl flex flex-col gap-3">
          <button 
            onClick={() => { setActiveTab('home'); setMobileMenuOpen(false); }}
            className="text-left py-2 font-medium text-sm border-b border-gray-100 dark:border-gray-800"
          >
            {t('home')}
          </button>
          <button 
            onClick={() => { setActiveTab('about'); setMobileMenuOpen(false); }}
            className="text-left py-2 font-medium text-sm border-b border-gray-100 dark:border-gray-800"
          >
            {t('about')}
          </button>
          <button 
            onClick={() => { setActiveTab('doctors'); setMobileMenuOpen(false); }}
            className="text-left py-2 font-medium text-sm border-b border-gray-100 dark:border-gray-800"
          >
            {t('doctors')}
          </button>
          <button 
            onClick={() => { setActiveTab('services'); setMobileMenuOpen(false); }}
            className="text-left py-2 font-medium text-sm border-b border-gray-100 dark:border-gray-800"
          >
            {t('services')}
          </button>
          <button 
            onClick={() => { setActiveTab('gallery'); setMobileMenuOpen(false); }}
            className="text-left py-2 font-medium text-sm border-b border-gray-100 dark:border-gray-800"
          >
            {t('gallery')}
          </button>
          <button 
            onClick={() => { setActiveTab('cms'); setMobileMenuOpen(false); }}
            className="text-left py-2 font-medium text-sm border-b border-gray-100 dark:border-gray-800"
          >
            {t('cmsFeed')}
          </button>
          <button 
            onClick={() => { setActiveTab('courses'); setMobileMenuOpen(false); }}
            className="text-left py-2 font-medium text-sm border-b border-gray-100 dark:border-gray-800"
          >
            {t('courses')}
          </button>
          <button 
            onClick={() => { setActiveTab('contact'); setMobileMenuOpen(false); }}
            className="text-left py-2 font-medium text-sm border-b border-gray-100 dark:border-gray-800"
          >
            {t('contact')}
          </button>
          <button 
            onClick={() => { onOpenSoundVault(); setMobileMenuOpen(false); }}
            className="flex items-center gap-2 py-2 text-emerald-800 dark:text-teal-400 font-semibold text-sm border-b border-gray-100 dark:border-gray-800"
          >
            <Music className="w-4 h-4" /> {t('soundVault')}
          </button>
          <button 
            onClick={() => { onOpenPortal(); setMobileMenuOpen(false); }}
            className="flex items-center gap-2 py-2 text-gray-600 dark:text-gray-300 font-medium text-sm"
          >
            <ShieldCheck className="w-4 h-4" /> {t('staffPortal')}
          </button>

          {/* Mobile Language Switcher */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-800">
            <span className="text-xs text-gray-500 font-medium">Language:</span>
            <div className="flex gap-2">
              {languages.map(l => (
                <button
                  key={l.code}
                  onClick={() => setLanguage(l.code)}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold ${language === l.code ? 'bg-emerald-800 text-white' : 'bg-gray-100 dark:bg-gray-800'}`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
