import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { AppointmentRequest, AppointmentStatus, BranchName, PaymentMode } from '../types';
import { CLINIC_DATA } from '../data/clinicData';
import {
  fetchAppointments,
  createAppointment,
  updateAppointmentStatus,
  isSupabaseConfigured,
} from '../lib/queries';

interface AppointmentContextType {
  appointments: AppointmentRequest[];
  addAppointment: (request: Omit<AppointmentRequest, 'id' | 'status' | 'createdAt'>) => Promise<AppointmentRequest | null>;
  updateStatus: (id: string, status: AppointmentStatus) => Promise<void>;
  getWhatsAppUrl: (appointment: AppointmentRequest) => string;
  getSystemGeneratedUTR: () => string;
  isLoading: boolean;
  isSupabaseActive: boolean;
}

const INITIAL_APPOINTMENTS: AppointmentRequest[] = [
  {
    id: "apt-101",
    patientName: "Priya Sharma",
    patientPhone: "+91 9823011223",
    patientCity: "Kolhapur",
    patientEmail: "priya.sharma@example.com",
    branch: "Kolhapur Branch",
    preferredDate: "2026-08-05",
    preferredTime: "11:00 AM",
    paymentMode: "OFFLINE",
    consultationFee: 500,
    notes: "Initial consultation request.",
    status: "PENDING",
    createdAt: new Date().toISOString()
  },
  {
    id: "apt-102",
    patientName: "Rajesh Patil",
    patientPhone: "+91 9422044556",
    patientCity: "Shirol",
    patientEmail: "rajesh.patil@example.com",
    branch: "Shirol Branch (Main HQ)",
    preferredDate: "2026-08-06",
    preferredTime: "10:30 AM",
    paymentMode: "ONLINE",
    consultationFee: 500,
    notes: "Follow-up & Sonography scan.",
    status: "APPROVED",
    createdAt: new Date().toISOString()
  }
];

const AppointmentContext = createContext<AppointmentContextType | undefined>(undefined);

export const AppointmentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [appointments, setAppointments] = useState<AppointmentRequest[]>(INITIAL_APPOINTMENTS);
  const [isLoading, setIsLoading] = useState<boolean>(isSupabaseConfigured);

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    let cancelled = false;
    (async () => {
      try {
        const rows = await fetchAppointments();
        if (cancelled) return;
        const mapped: AppointmentRequest[] = rows.map((r) => ({
          id: r.id,
          patientName: r.patient_name,
          patientPhone: r.patient_phone,
          patientCity: r.patient_city,
          patientEmail: r.patient_email || undefined,
          doctorName: r.doctor_name || undefined,
          serviceName: r.service_name || undefined,
          branch: r.branch,
          preferredDate: r.preferred_date,
          preferredTime: r.preferred_time,
          paymentMode: r.payment_mode,
          consultationFee: r.consultation_fee,
          notes: r.notes || undefined,
          senderMobile: r.sender_mobile || undefined,
          utrId: r.utr_id || undefined,
          status: r.status,
          createdAt: r.created_at,
        }));
        setAppointments(mapped);
      } catch (e) {
        console.error('Failed to load appointments from Supabase:', e);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const addAppointment = useCallback(async (request: Omit<AppointmentRequest, 'id' | 'status' | 'createdAt'>): Promise<AppointmentRequest | null> => {
    const duplicate = appointments.some(
      appointment =>
        appointment.patientPhone === request.patientPhone &&
        appointment.branch === request.branch &&
        appointment.preferredDate === request.preferredDate &&
        appointment.preferredTime === request.preferredTime
    );

    if (duplicate) {
      return null;
    }

    const newApt: AppointmentRequest = {
      ...request,
      id: `apt-${Date.now().toString().slice(-4)}`,
      status: 'PENDING',
      createdAt: new Date().toISOString()
    };

    if (isSupabaseConfigured) {
      try {
        const row = await createAppointment({
          patientName: request.patientName,
          patientPhone: request.patientPhone,
          patientCity: request.patientCity,
          patientEmail: request.patientEmail,
          doctorName: request.doctorName,
          serviceName: request.serviceName,
          branch: request.branch,
          preferredDate: request.preferredDate,
          preferredTime: request.preferredTime,
          paymentMode: request.paymentMode,
          consultationFee: request.consultationFee,
          notes: request.notes,
          senderMobile: request.senderMobile,
          utrId: request.utrId,
        });
        const created: AppointmentRequest = {
          ...newApt,
          id: row.id,
          status: row.status,
          createdAt: row.created_at,
        };
        setAppointments(prev => [created, ...prev]);
        return created;
      } catch (e) {
        console.error('Failed to create appointment in Supabase:', e);
        return null;
      }
    }

    setAppointments(prev => [newApt, ...prev]);
    return newApt;
  }, [appointments]);

  const updateStatus = useCallback(async (id: string, status: AppointmentStatus) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status } : a));
    if (isSupabaseConfigured) {
      try {
        await updateAppointmentStatus(id, status);
      } catch (e) {
        console.error('Failed to update appointment status:', e);
      }
    }
  }, []);

  const getSystemGeneratedUTR = useCallback(() => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ0123456789';
    let utr = '';
    for (let i = 0; i < 12; i++) {
      utr += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return utr;
  }, []);

  const getWhatsAppUrl = useCallback((appointment: AppointmentRequest) => {
    const isOnline = appointment.paymentMode === 'ONLINE';
    const utr = appointment.utrId || getSystemGeneratedUTR();
    const senderMobile = appointment.senderMobile || appointment.patientPhone;

    const text = encodeURIComponent(
      `✅ SUCCESSFUL BOOKING CONFIRMATION — ${CLINIC_DATA.name}\n\n` +
      `🧑‍⚕️ Patient: ${appointment.patientName}\n` +
      `📱 Mobile: ${appointment.patientPhone}\n` +
      `🧑‍💼 Sender Mobile: ${senderMobile}\n` +
      `🏥 Branch: ${appointment.branch}\n` +
      `📍 City/Village: ${appointment.patientCity}\n` +
      `📅 Date: ${appointment.preferredDate}\n` +
      `⏰ Time: ${appointment.preferredTime}\n` +
      (isOnline
        ? `💳 Payment: ONLINE • ₹${appointment.consultationFee}\n` +
          `🔢 UTR ID: ${utr}\n\n` +
          `Payment received successfully. Booking confirmed.`
        : `💵 Payment: OFFLINE • ₹${appointment.consultationFee} (pay at clinic)\n\n` +
          `Offline booking confirmed. Please pay the consultation fee at the clinic.`)
    );
    const cleanPhone = CLINIC_DATA.whatsApp.replace(/[^0-9]/g, '');
    return `https://wa.me/${cleanPhone}?text=${text}`;
  }, [getSystemGeneratedUTR]);

  const value = useMemo(() => ({
    appointments,
    addAppointment,
    updateStatus,
    getWhatsAppUrl,
    getSystemGeneratedUTR,
    isLoading,
    isSupabaseActive: isSupabaseConfigured,
  }), [appointments, addAppointment, updateStatus, getWhatsAppUrl, getSystemGeneratedUTR, isLoading]);

  return (
    <AppointmentContext.Provider value={value}>
      {children}
    </AppointmentContext.Provider>
  );
};

export const useAppointments = () => {
  const context = useContext(AppointmentContext);
  if (!context) throw new Error('useAppointments must be used within AppointmentProvider');
  return context;
};
