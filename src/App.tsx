import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { AppointmentProvider } from './context/AppointmentContext';
import { SoundVaultProvider } from './context/SoundVaultContext';
import { CMSProvider } from './context/CMSContext';

import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

import { Hero } from './components/home/Hero';
import { ClinicInfoSection } from './components/home/ClinicInfoSection';
import { DoctorProfile } from './components/home/DoctorProfile';
import { ContactBar } from './components/home/ContactBar';
import { SonographySection } from './components/home/SonographySection';
import { ServicesGrid } from './components/home/ServicesGrid';
import { CMSFeed } from './components/home/CMSFeed';
import { TestimonialsSection } from './components/home/TestimonialsSection';

import { AboutPage } from './components/pages/AboutPage';
import { DoctorsPage } from './components/pages/DoctorsPage';
import { GalleryPage } from './components/pages/GalleryPage';
import { ContactPage } from './components/pages/ContactPage';
import { CoursesPage } from './components/pages/CoursesPage';

import { AppointmentModal } from './components/appointment/AppointmentModal';
import { SoundVaultModal } from './components/sound-vault/SoundVaultModal';
import { PortalLoginModal } from './components/dashboards/PortalLoginModal';

import { ReceptionDashboard } from './components/dashboards/ReceptionDashboard';
import { AdminDashboard } from './components/dashboards/AdminDashboard';
import { DoctorDashboard } from './components/dashboards/DoctorDashboard';
import { AIChatbot } from './components/ai/AIChatbot';

import { Role } from './types';

const AppContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [appointmentModalOpen, setAppointmentModalOpen] = useState(false);
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState<string | undefined>(undefined);
  const [soundVaultOpen, setSoundVaultOpen] = useState(false);
  const [portalLoginOpen, setPortalLoginOpen] = useState(false);
  const [userRole, setUserRole] = useState<Role | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [cursor, setCursor] = useState({ x: 0, y: 0, visible: false, hovering: false });

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 1200);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      const { clientX, clientY } = event;
      setCursor((current) => ({ ...current, x: clientX, y: clientY, visible: true }));
    };

    const onPointerLeave = () => setCursor((current) => ({ ...current, visible: false }));
    const onPointerEnter = () => setCursor((current) => ({ ...current, visible: true }));

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerleave', onPointerLeave);
    window.addEventListener('pointerenter', onPointerEnter);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerleave', onPointerLeave);
      window.removeEventListener('pointerenter', onPointerEnter);
    };
  }, []);

  const handleOpenAppointment = (serviceName?: string) => {
    setSelectedServiceForBooking(serviceName);
    setAppointmentModalOpen(true);
  };

  const handleLoginSuccess = (role: Role) => {
    setUserRole(role);
    if (role === 'RECEPTIONIST') {
      setActiveTab('reception');
    } else if (role === 'DOCTOR') {
      setActiveTab('doctor');
    } else if (role === 'SUPER_ADMIN' || role === 'CLINIC_ADMIN') {
      setActiveTab('admin');
    } else {
      setActiveTab('reception');
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-between selection:bg-emerald-800 selection:text-white overflow-x-hidden">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="ambient-orb ambient-orb-1" />
        <div className="ambient-orb ambient-orb-2" />
        <div className="ambient-orb ambient-orb-3" />
      </div>

      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(6,95,70,0.28),_rgba(8,14,15,0.95))] backdrop-blur-xl"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.55 } }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="flex flex-col items-center gap-4"
            >
              <motion.div
                animate={{ scale: [1, 1.06, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                className="w-16 h-16 rounded-3xl bg-white/10 border border-white/30 shadow-2xl flex items-center justify-center"
              >
                <img src="/assets/logo/logo.svg" alt="Astygma Hope" className="w-8 h-8 object-contain" />
              </motion.div>
              <div className="text-xs font-semibold uppercase tracking-[0.4em] text-emerald-100/90">Loading Care Experience</div>
              <div className="h-1.5 w-48 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-300 via-teal-300 to-amber-300"
                  initial={{ x: '-100%' }}
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {cursor.visible && (
        <div
          className={`pointer-events-none fixed left-0 top-0 z-[80] hidden md:block`}
          style={{
            transform: `translate(${cursor.x - 12}px, ${cursor.y - 12}px)`,
            transition: 'transform 120ms ease-out, opacity 120ms ease-out',
            opacity: cursor.visible ? 1 : 0,
          }}
        >
          <div className={`custom-cursor ${cursor.hovering ? 'custom-cursor--hover' : ''}`} />
        </div>
      )}
      
      {/* Top Navbar */}
      <Navbar
        onOpenAppointment={() => handleOpenAppointment()}
        onOpenSoundVault={() => setSoundVaultOpen(true)}
        onOpenPortal={() => setPortalLoginOpen(true)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Body View Switching */}
      <main className="flex-1 relative z-10">
        {activeTab === 'home' && (
          <div className="space-y-16">
            <Hero
              onOpenAppointment={() => handleOpenAppointment()}
              onOpenSoundVault={() => setSoundVaultOpen(true)}
              setActiveTab={setActiveTab}
            />
            <ClinicInfoSection onOpenAppointment={() => handleOpenAppointment()} />
            <ServicesGrid onOpenAppointment={handleOpenAppointment} />
            <SonographySection onOpenAppointment={() => handleOpenAppointment('Ultrasound')} />
<DoctorProfile onOpenAppointment={() => handleOpenAppointment()} />
            <TestimonialsSection />
            <ContactBar onOpenAppointment={() => handleOpenAppointment()} />
            <CMSFeed />
          </div>
        )}

        {activeTab === 'about' && (
          <AboutPage onOpenAppointment={() => handleOpenAppointment()} />
        )}

        {activeTab === 'doctors' && (
          <DoctorsPage onOpenAppointment={() => handleOpenAppointment()} setActiveTab={setActiveTab} />
        )}

        {activeTab === 'sonography' && (
          <SonographySection onOpenAppointment={() => handleOpenAppointment('Ultrasound')} />
        )}

        {activeTab === 'services' && (
          <ServicesGrid onOpenAppointment={handleOpenAppointment} />
        )}

        {activeTab === 'gallery' && (
          <GalleryPage />
        )}

        {activeTab === 'cms' && (
          <CMSFeed />
        )}

        {activeTab === 'courses' && (
          <CoursesPage onOpenAppointment={() => handleOpenAppointment()} />
        )}

        {activeTab === 'contact' && (
          <ContactPage onOpenAppointment={() => handleOpenAppointment()} />
        )}

        {activeTab === 'reception' && (
          <ReceptionDashboard />
        )}

        {activeTab === 'doctor' && (
          <DoctorDashboard />
        )}

        {activeTab === 'admin' && (
          <AdminDashboard />
        )}
      </main>

      {/* Footer */}
      <Footer
        onOpenPortal={() => setPortalLoginOpen(true)}
        setActiveTab={setActiveTab}
      />

      {/* Floating AI Chatbot */}
      <AIChatbot
        onOpenAppointment={() => handleOpenAppointment()}
        onOpenPortal={() => setPortalLoginOpen(true)}
      />

      {/* Global Modals */}
      <AppointmentModal
        isOpen={appointmentModalOpen}
        onClose={() => setAppointmentModalOpen(false)}
        initialService={selectedServiceForBooking}
      />

      <SoundVaultModal
        isOpen={soundVaultOpen}
        onClose={() => setSoundVaultOpen(false)}
      />

      <PortalLoginModal
        isOpen={portalLoginOpen}
        onClose={() => setPortalLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

    </div>
  );
};

export function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppointmentProvider>
          <SoundVaultProvider>
            <CMSProvider>
              <AppContent />
            </CMSProvider>
          </SoundVaultProvider>
        </AppointmentProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
