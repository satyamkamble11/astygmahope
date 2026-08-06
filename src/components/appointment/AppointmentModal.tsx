import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useAppointments } from '../../context/AppointmentContext';
import { useLanguage } from '../../context/LanguageContext';
import { CLINIC_DATA } from '../../data/clinicData';
import { BranchName, PaymentMode } from '../../types';
import {
  X,
  Calendar,
  User,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  Building2,
  Info,
  Wallet,
  ArrowRight,
  ArrowLeft,
  Smartphone,
  Hash,
  BadgeCheck,
  IndianRupee,
  AlertCircle,
} from 'lucide-react';
import { getDayName, getNextAvailableDates, isBranchOpenOnDate, TIME_SLOTS } from '../../utils/scheduleUtils';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
}

const UPI_ID = 'aimsdk9520@oksbi';
const CONSULTATION_FEE = 500;
const RECEIVER_PHONE = CLINIC_DATA.whatsApp.replace(/[^0-9]/g, '');

interface UpiApp {
  name: string;
  packageName: string;
  intent: string;
}

const UPI_APPS: UpiApp[] = [
  { name: 'Google Pay', packageName: 'com.google.android.apps.nbu.paisa.user', intent: 'intent://pay?pa=aimsdk9520@oksbi&pn=Astygma%20Hope%20Clinic&cu=INR&tn=Book%20your%20appointment#Intent;scheme=upi;package=com.google.android.apps.nbu.paisa.user;end' },
  { name: 'PhonePe', packageName: 'com.phonepe.app', intent: 'intent://pay?pa=aimsdk9520@oksbi&pn=Astygma%20Hope%20Clinic&cu=INR&tn=Book%20your%20appointment#Intent;scheme=upi;package=com.phonepe.app;end' },
  { name: 'Paytm', packageName: 'net.one97.paytm', intent: 'intent://pay?pa=aimsdk9520@oksbi&pn=Astygma%20Hope%20Clinic&cu=INR&tn=Book%20your%20appointment#Intent;scheme=upi;package=net.one97.paytm;end' },
  { name: 'BHIM UPI', packageName: 'in.org.npci.upiapp', intent: 'intent://pay?pa=aimsdk9520@oksbi&pn=Astygma%20Hope%20Clinic&cu=INR&tn=Book%20your%20appointment#Intent;scheme=upi;package=in.org.npci.upiapp;end' },
  { name: 'Other UPI App', packageName: '', intent: `upi://pay?pa=${UPI_ID}&pn=Astygma%20Hope%20Clinic&tn=Book%20your%20appointment` },
];

const isValidIndianMobile = (value: string): boolean => {
  const digits = value.replace(/[^0-9]/g, '');
  if (digits.length === 12 && digits.startsWith('91')) {
    return /^[6-9][0-9]{9}$/.test(digits.slice(2));
  }
  if (digits.length === 11 && digits.startsWith('0')) {
    return /^[6-9][0-9]{9}$/.test(digits.slice(1));
  }
  return /^[6-9][0-9]{9}$/.test(digits);
};

const isValidName = (value: string): boolean => {
  return /^[a-zA-Z\u0900-\u097F\u0C80-\u0CFF\s'.-]+$/.test(value.trim());
};

const isValidUTRPrefix = (value: string): boolean => {
  return value.trim().length >= 10;
};

export const AppointmentModal: React.FC<AppointmentModalProps> = ({ isOpen, onClose, initialService }) => {
  const { addAppointment, getWhatsAppUrl, getSystemGeneratedUTR } = useAppointments();
  const { t } = useLanguage();

  const [currentStep, setCurrentStep] = useState(1);
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientCity, setPatientCity] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [senderMobile, setSenderMobile] = useState('');
  const [utrId, setUtrId] = useState('');
  const [branch, setBranch] = useState<BranchName>('Shirol Branch (Main HQ)');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('10:30 AM');
  const [paymentMode, setPaymentMode] = useState<PaymentMode>('OFFLINE');
  const [notes, setNotes] = useState(initialService ? `Interested in: ${initialService}` : '');
  const [submittedApt, setSubmittedApt] = useState<any | null>(null);
  const [dateMessage, setDateMessage] = useState('');
  const [stepError, setStepError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [paymentModeError, setPaymentModeError] = useState('');
  
  // UPI Scanner zoom state
  const [zoomScanner, setZoomScanner] = useState(false);

  const today = useMemo(() => {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }, []);

  const prevOpenRef = useRef(isOpen);
  useEffect(() => {
    if (isOpen && !prevOpenRef.current) {
      setCurrentStep(1);
      setPatientName('');
      setPatientPhone('');
      setPatientCity('');
      setPatientEmail('');
      setSenderMobile('');
      setUtrId('');
      setBranch('Shirol Branch (Main HQ)');
      setPreferredDate('');
      setPreferredTime('10:30 AM');
      setPaymentMode('OFFLINE');
      setNotes(initialService ? `Interested in: ${initialService}` : '');
      setSubmittedApt(null);
      setDateMessage('');
      setStepError('');
      setFieldErrors({});
      setPaymentModeError('');
    }
    prevOpenRef.current = isOpen;
  }, [isOpen, initialService]);

  useEffect(() => {
    if (isOpen && initialService) {
      setNotes(`Interested in: ${initialService}`);
    }
  }, [isOpen, initialService]);

  if (!isOpen) return null;

  const handleBranchChange = (nextBranch: BranchName) => {
    setBranch(nextBranch);
    if (preferredDate && !isBranchOpenOnDate(nextBranch, preferredDate)) {
      setPreferredDate('');
    }
    setDateMessage('');
    setStepError('');
  };

  const handleDateChange = (value: string) => {
    setPreferredDate(value);
    if (!value) {
      setDateMessage('');
      setStepError('');
      return;
    }

    if (!isBranchOpenOnDate(branch, value)) {
      const dayName = getDayName(new Date(value + 'T12:00:00').getDay() as 0 | 1 | 2 | 3 | 4 | 5 | 6);
      setDateMessage(`${branch} is not open on ${dayName}. Please choose a branch day.`);
      return;
    }

    setDateMessage('');
    setStepError('');
  };

  const validateStep1 = (): boolean => {
    const errors: Record<string, string> = {};
    if (!patientName.trim()) {
      errors.patientName = 'Full name is required.';
    } else if (!isValidName(patientName)) {
      errors.patientName = 'Please enter a valid name (letters only).';
    }

    if (!patientPhone.trim()) {
      errors.patientPhone = 'Mobile number is required.';
    } else if (!isValidIndianMobile(patientPhone)) {
      errors.patientPhone = 'Please enter a valid 10-digit Indian mobile number (starting 6-9).';
    }

    if (!patientCity.trim()) {
      errors.patientCity = 'City / Village is required.';
    }

    if (!preferredDate) {
      errors.preferredDate = 'Please select a preferred date.';
    } else if (!isBranchOpenOnDate(branch, preferredDate)) {
      setDateMessage('This date is not available for the selected branch. Please choose a valid visiting day.');
      errors.preferredDate = 'Invalid date for the selected branch.';
    }

    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) {
      setStepError('Please fix the highlighted fields and try again.');
      return false;
    }
    setStepError('');
    return true;
  };

  const validateStep2 = (): boolean => {
    if (paymentMode === 'ONLINE') {
      if (!senderMobile.trim()) {
        setPaymentModeError('Sender mobile number is required for online payment verification.');
        return false;
      }
      if (!isValidIndianMobile(senderMobile)) {
        setPaymentModeError('Please enter a valid 10-digit sender mobile number (starting 6-9).');
        return false;
      }
      if (!utrId.trim()) {
        setPaymentModeError('Please enter the UTR / Transaction ID received after payment.');
        return false;
      }
      if (!isValidUTRPrefix(utrId)) {
        setPaymentModeError('UTR ID should be at least 10 characters long. (Example: GPay UTR IDs are typically 12 characters.)');
        return false;
      }
    }
    setPaymentModeError('');
    return true;
  };

  const proceedToPayment = () => {
    if (!validateStep1()) return;
    setCurrentStep(2);
  };

  const handleOnlinePay = (app: UpiApp) => {
    const url = app.intent;
    window.location.href = url;
  };

  const handleSubmitOnline = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep1()) {
      setCurrentStep(1);
      return;
    }
    if (!validateStep2()) return;

    const utr = utrId.trim().toUpperCase();

    const apt = await addAppointment({
      patientName,
      patientPhone: patientPhone.startsWith('+91') ? patientPhone : `+91 ${patientPhone}`,
      patientCity,
      patientEmail,
      senderMobile: senderMobile.startsWith('+91') ? senderMobile : `+91 ${senderMobile}`,
      utrId: utr,
      branch,
      preferredDate,
      preferredTime,
      paymentMode: 'ONLINE',
      consultationFee: CONSULTATION_FEE,
      notes,
    });

    if (!apt) {
      setStepError('This appointment already exists for the same phone number, branch, date and time. Please choose a different slot.');
      return;
    }

    setSubmittedApt(apt);
  };

  const handleSubmitOffline = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep1()) {
      setCurrentStep(1);
      return;
    }

    const apt = await addAppointment({
      patientName,
      patientPhone: patientPhone.startsWith('+91') ? patientPhone : `+91 ${patientPhone}`,
      patientCity,
      patientEmail,
      senderMobile: patientPhone.startsWith('+91') ? patientPhone : `+91 ${patientPhone}`,
      branch,
      preferredDate,
      preferredTime,
      paymentMode: 'OFFLINE',
      consultationFee: CONSULTATION_FEE,
      notes,
    });

    if (!apt) {
      setStepError('This appointment already exists for the same phone number, branch, date and time. Please choose a different slot.');
      return;
    }

    setSubmittedApt(apt);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="glass-panel w-full max-w-lg rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl border border-emerald-500/30 max-h-[92vh] overflow-y-auto relative bg-white/95 dark:bg-gray-950/95 text-gray-900 dark:text-white">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        {!submittedApt ? (
          <>
            {/* Header */}
            <div className="text-center space-y-2 pt-2">
              <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-teal-300 text-[11px] font-bold uppercase tracking-wider">
                Direct Clinic Triage • Book your appointment!
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-emerald-950 dark:text-white leading-tight">
                Take the Next Step in Your Fertility Journey
              </h2>
              <p className="text-xs text-gray-600 dark:text-gray-300 font-medium">
                Schedule your visit today with Dr. Umesh Datta Kalekar!
              </p>
            </div>

            {/* Branch Schedule Guidance */}
            <div className="p-3 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/40 text-[11px] space-y-1 text-emerald-900 dark:text-teal-300">
              <p className="font-bold flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-emerald-600" /> Day-Wise Branch Consultation Schedule:
              </p>
              <p>• <strong>Kolhapur Branch</strong>: Mondays & Wednesdays (10 AM to 5 PM)</p>
              <p>• <strong>Shirol Branch (HQ)</strong>: Tuesdays, Thursdays, Fridays, & Saturdays (10 AM to 6 PM)</p>
              <p className="text-[10px] text-amber-700 dark:text-amber-400 font-semibold">• Note: Sonography is available ONLY at Shirol Branch (Tue, Thu, Sat).</p>
            </div>

            <form className="space-y-4">
              {currentStep === 1 && (
                <>
                  {/* Full Name */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">{t('fullName')}</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-emerald-700 dark:text-teal-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        placeholder="Enter your full name"
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white/70 dark:bg-gray-900/70 text-xs font-medium focus:ring-2 focus:ring-emerald-700 outline-none"
                      />
                    </div>
                    {fieldErrors.patientName && <p className="text-[10px] text-red-600 font-semibold flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {fieldErrors.patientName}</p>}
                  </div>

                  {/* Mobile Number & City/Village */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* Mobile Number */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">{t('mobileNumber')}</label>
                      <div className="flex rounded-xl border border-gray-300 dark:border-gray-700 overflow-hidden bg-white/70 dark:bg-gray-900/70">
                        <span className="px-3 py-3 bg-gray-100 dark:bg-gray-800 text-xs font-bold text-gray-600 dark:text-gray-300 flex items-center border-r border-gray-300 dark:border-gray-700">
                          +91
                        </span>
                        <input
                          type="tel"
                          required
                          placeholder="9876543210"
                          value={patientPhone}
                          onChange={(e) => setPatientPhone(e.target.value)}
                          className="w-full px-3 py-3 text-xs font-medium bg-transparent outline-none"
                        />
                      </div>
                      {fieldErrors.patientPhone && <p className="text-[10px] text-red-600 font-semibold flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {fieldErrors.patientPhone}</p>}
                    </div>

                    {/* Patient City / Village Name */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">{t('patientCity')}</label>
                      <div className="relative">
                        <MapPin className="w-4 h-4 text-emerald-700 dark:text-teal-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          required
                          placeholder="e.g. Shirol, Kolhapur"
                          value={patientCity}
                          onChange={(e) => setPatientCity(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white/70 dark:bg-gray-900/70 text-xs font-medium focus:ring-2 focus:ring-emerald-700 outline-none"
                        />
                      </div>
                      {fieldErrors.patientCity && <p className="text-[10px] text-red-600 font-semibold flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {fieldErrors.patientCity}</p>}
                    </div>

                  </div>

                  {/* Branch Selector */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Select Clinic Branch *</label>
                    <select
                      value={branch}
                      onChange={(e) => handleBranchChange(e.target.value as BranchName)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white/70 dark:bg-gray-900/70 text-xs font-semibold focus:ring-2 focus:ring-emerald-700 outline-none"
                    >
                      <option value="Shirol Branch (Main HQ)">Shirol Branch (Main HQ) - 250m from Bus Stand</option>
                      <option value="Kolhapur Branch">Kolhapur Branch - Near Deshmukh Hall, Hari Om Nagar</option>
                    </select>
                  </div>

                  {/* Date & Time Slot */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">{t('preferredDate')}</label>
                      <input
                        type="date"
                        required
                        min={today}
                        value={preferredDate}
                        onChange={(e) => handleDateChange(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white/70 dark:bg-gray-900/70 text-xs font-medium outline-none"
                      />
                      {dateMessage && <p className="text-[10px] text-amber-700 dark:text-amber-300 font-semibold">{dateMessage}</p>}
                      {fieldErrors.preferredDate && <p className="text-[10px] text-red-600 font-semibold flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {fieldErrors.preferredDate}</p>}
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">{t('morningTimeSlot')}</label>
                      <select
                        value={preferredTime}
                        onChange={(e) => setPreferredTime(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white/70 dark:bg-gray-900/70 text-xs font-medium outline-none"
                      >
                        {TIME_SLOTS.map(slot => (
                          <option key={slot} value={slot}>{slot}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="rounded-xl bg-slate-50 dark:bg-slate-900/60 p-3 text-[11px] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800">
                    <p className="font-semibold text-emerald-900 dark:text-emerald-300">Appointment summary</p>
                    <p className="mt-1 text-gray-600 dark:text-gray-300 font-bold">Book your appointment!</p>
                    <p className="text-gray-500 dark:text-gray-400">Choose Online Booking to pay or confirm via UPI apps, or Offline Booking to pay at the clinic.</p>
                  </div>

                  {stepError && <p className="text-[10px] text-red-600 font-semibold flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {stepError}</p>}

                  <button
                    type="button"
                    onClick={proceedToPayment}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 hover:from-blue-800 hover:to-indigo-800 text-white font-bold text-sm shadow-xl transition-all flex items-center justify-center gap-2 active:scale-95"
                  >
                    Next step
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </>
              )}

              {currentStep === 2 && (
                <>
                  {/* Online / Offline mode selector */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">{t('paymentMode')}</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => { setPaymentMode('ONLINE'); setPaymentModeError(''); }}
                        className={`rounded-xl border px-3 py-2 text-xs font-semibold ${paymentMode === 'ONLINE' ? 'border-blue-600 bg-blue-50 text-blue-700 dark:text-blue-300' : 'border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300'}`}
                      >
                        <span className="flex items-center justify-center gap-2"><Wallet className="w-4 h-4" /> {t('onlinePayment')}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => { setPaymentMode('OFFLINE'); setPaymentModeError(''); }}
                        className={`rounded-xl border px-3 py-2 text-xs font-semibold ${paymentMode === 'OFFLINE' ? 'border-emerald-600 bg-emerald-50 text-emerald-700 dark:text-emerald-300' : 'border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300'}`}
                      >
                        <span className="flex items-center justify-center gap-2"><Wallet className="w-4 h-4" /> {t('payAtClinic')}</span>
                      </button>
                    </div>
                  </div>

                  {paymentMode === 'ONLINE' && (
                    <>
                      {/* UPI QR + ID */}
                      <div className="rounded-2xl border border-emerald-200 dark:border-emerald-900 bg-emerald-50/70 dark:bg-emerald-950/40 p-4 space-y-3">
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <p className="text-[11px] uppercase tracking-[0.2em] text-emerald-800 dark:text-emerald-300 font-bold">UPI / GPay</p>
                            <p className="text-sm font-bold text-emerald-950 dark:text-white">{UPI_ID}</p>
                            <p className="text-[11px] text-gray-600 dark:text-gray-300">Click QR code to zoom and scan with any UPI app.</p>
                          </div>
                          
                          {/* Clickable Zoomable UPI scanner image */}
                          <div 
                            className="relative cursor-zoom-in" 
                            onClick={() => setZoomScanner(true)}
                            title="Click to Zoom UPI QR Code"
                          >
                            <img
                              src="/assets/clinic/upi_scanner.jpg"
                              alt="Clinic UPI QR Code"
                              className="w-24 h-24 rounded-2xl bg-white border border-emerald-300 dark:border-emerald-800 object-contain shadow-sm hover:scale-105 transition-transform"
                            />
                            <span className="absolute bottom-1 right-1 bg-black/60 text-white text-[8px] px-1 rounded">Zoom</span>
                          </div>
                        </div>

                        {/* UPI app launcher buttons */}
                        <div className="grid grid-cols-2 gap-2">
                          {UPI_APPS.map((app) => (
                            <a
                              key={app.name}
                              href={app.intent}
                              onClick={(e) => {
                                e.preventDefault();
                                handleOnlinePay(app);
                              }}
                              className={`flex items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-[11px] font-bold transition-all active:scale-95 text-white ${app.name === 'Google Pay' ? 'bg-[#4285F4]' : app.name === 'PhonePe' ? 'bg-[#5F259F]' : app.name === 'Paytm' ? 'bg-[#002E6E]' : app.name === 'BHIM UPI' ? 'bg-[#1BAF5B]' : 'bg-gray-800'}`}
                            >
                              <Smartphone className="w-3.5 h-3.5" />
                              {app.name}
                            </a>
                          ))}
                        </div>
                      </div>

                      {/* Sender mobile + UTR fields */}
                      <div className="space-y-3">
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Sender Mobile Number *</label>
                          <div className="flex rounded-xl border border-gray-300 dark:border-gray-700 overflow-hidden bg-white/70 dark:bg-gray-900/70">
                            <span className="px-3 py-3 bg-gray-100 dark:bg-gray-800 text-xs font-bold text-gray-600 dark:text-gray-300 flex items-center border-r border-gray-300 dark:border-gray-700">
                              +91
                            </span>
                            <input
                              type="tel"
                              required
                              maxLength={10}
                              placeholder="Mobile from which payment was made"
                              value={senderMobile}
                              onChange={(e) => setSenderMobile(e.target.value.replace(/[^0-9]/g, '').slice(0, 10))}
                              className="w-full px-3 py-3 text-xs font-medium bg-transparent outline-none"
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">UTR / Transaction ID *</label>
                          <div className="relative">
                            <Hash className="w-4 h-4 text-emerald-700 dark:text-teal-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                            <input
                              type="text"
                              required
                              placeholder="e.g. 412345678901"
                              value={utrId}
                              onChange={(e) => setUtrId(e.target.value)}
                              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white/70 dark:bg-gray-900/70 text-xs font-medium focus:ring-2 focus:ring-emerald-700 outline-none"
                            />
                            <button
                              type="button"
                              onClick={() => { setUtrId(getSystemGeneratedUTR()); }}
                              className="absolute right-2 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-teal-300 text-[10px] font-bold"
                            >
                              Auto
                            </button>
                          </div>
                          <p className="text-[10px] text-gray-400">After paying, enter the 12-digit UTR transaction number to confirm.</p>
                        </div>
                      </div>

                      {paymentModeError && <p className="text-[10px] text-red-600 font-semibold flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {paymentModeError}</p>}

                      <button
                        type="submit"
                        onClick={handleSubmitOnline}
                        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 hover:from-blue-800 hover:to-indigo-800 text-white font-bold text-sm shadow-xl transition-all flex items-center justify-center gap-2 active:scale-95"
                      >
                        <BadgeCheck className="w-4 h-4" />
                        <span>Confirm Appointment Booking</span>
                      </button>
                    </>
                  )}

                  {paymentMode === 'OFFLINE' && (
                    <>
                      <div className="rounded-2xl border border-emerald-200 dark:border-emerald-900 bg-emerald-50/70 dark:bg-emerald-950/40 p-4 space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-2xl bg-white/80 dark:bg-gray-900/70 border border-emerald-300 dark:border-emerald-800 flex items-center justify-center text-emerald-700 dark:text-teal-300 shadow-sm">
                            <IndianRupee className="w-6 h-6" />
                          </div>
                          <div>
                            <p className="text-[11px] uppercase tracking-[0.2em] text-emerald-800 dark:text-emerald-300 font-bold">Offline Booking</p>
                            <p className="text-sm font-bold text-emerald-950 dark:text-white">Book your appointment!</p>
                            <p className="text-[11px] text-gray-600 dark:text-gray-300">Settle consultation details when you visit the clinic. A booking request is dispatched to reception instantly.</p>
                          </div>
                        </div>
                      </div>

                      {paymentModeError && <p className="text-[10px] text-red-600 font-semibold flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {paymentModeError}</p>}

                      <button
                        type="submit"
                        onClick={handleSubmitOffline}
                        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-800 to-teal-700 hover:from-emerald-900 hover:to-teal-800 text-white font-bold text-sm shadow-xl transition-all flex items-center justify-center gap-2 active:scale-95"
                      >
                        <Calendar className="w-4 h-4" />
                        <span>Confirm Booking Request</span>
                      </button>
                    </>
                  )}

                  <div className="rounded-xl bg-amber-50 dark:bg-amber-950/40 p-3 text-[11px] text-amber-900 dark:text-amber-300 border border-amber-200 dark:border-amber-900">
                    Book your appointment! Pay at clinic or confirm details.
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="flex-1 py-3 rounded-xl border border-gray-300 dark:border-gray-700 text-xs font-semibold"
                    >
                      <span className="flex items-center justify-center gap-2"><ArrowLeft className="w-4 h-4" /> Back</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setCurrentStep(1);
                        onClose();
                      }}
                      className="flex-1 py-3 rounded-xl border border-gray-300 dark:border-gray-700 text-xs font-semibold"
                    >
                      <span className="flex items-center justify-center gap-2"><X className="w-3.5 h-3.5" /> Back to Home</span>
                    </button>
                  </div>

                  <div className="pt-1 text-center space-y-1">
                    <p className="text-[11px] text-emerald-700 dark:text-teal-400 font-bold flex items-center justify-center gap-1">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>{t('dataSafe')}</span>
                    </p>
                    <p className="text-[10px] text-gray-500">{t('receptionConfirmation')}</p>
                  </div>
                </>
              )}
            </form>
          </>
        ) : (
          <div className="py-6 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-teal-400 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h3 className="font-serif font-bold text-2xl text-emerald-950 dark:text-white">
                {t('requestSent')}
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-300 max-w-md mx-auto leading-relaxed">
                {t('requestSentDesc1')} <strong>{submittedApt.patientName}</strong>! {t('requestSentDesc2')} <strong>{submittedApt.branch}</strong> {t('on')} <strong>{submittedApt.preferredDate}</strong> {t('at')} <strong>{submittedApt.preferredTime}</strong> {t('requestSentDesc3')}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40 text-left space-y-2 text-xs">
              <p className="font-bold text-emerald-900 dark:text-teal-300">{t('appointmentRef')} {submittedApt.id}</p>
              <p className="text-gray-600 dark:text-gray-300">{t('patientCityLabel')} {submittedApt.patientCity}</p>
              {submittedApt.paymentMode === 'ONLINE' && submittedApt.utrId && (
                <p className="text-gray-600 dark:text-gray-300 font-semibold flex items-center gap-1.5">
                  <Hash className="w-3.5 h-3.5 text-emerald-600" /> UTR ID: <strong>{submittedApt.utrId}</strong>
                </p>
              )}
              <p className="text-gray-600 dark:text-gray-300">{t('helplinePhone')} {CLINIC_DATA.phone}</p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <a
                href={getWhatsAppUrl(submittedApt)}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto flex-1 py-3.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-md"
              >
                <span>{t('sendWhatsApp')}</span>
              </a>

              <button
                onClick={() => {
                  setSubmittedApt(null);
                  onClose();
                }}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-gray-300 dark:border-gray-700 text-xs font-semibold"
              >
                {t('done')}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* UPI Scanner Zoom Modal Overlay */}
      {zoomScanner && (
        <div 
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90 cursor-zoom-out" 
          onClick={() => setZoomScanner(false)}
        >
          <div className="relative max-w-sm w-full bg-white dark:bg-gray-900 rounded-3xl p-6 text-center space-y-4 border border-emerald-500/20 shadow-2xl">
            <button
              onClick={() => setZoomScanner(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <X className="w-5 h-5 text-gray-800 dark:text-white" />
            </button>
            <p className="font-serif font-bold text-gray-900 dark:text-white text-base">Scan to Pay & Register</p>
            <img
              src="/assets/clinic/upi_scanner.jpg"
              alt="Clinic UPI QR Code Zoomed"
              className="w-full h-auto max-h-[60vh] rounded-2xl border border-gray-200 dark:border-gray-800 shadow-md object-contain mx-auto"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold">Tap anywhere to close zoom</p>
          </div>
        </div>
      )}
    </div>
  );
};
