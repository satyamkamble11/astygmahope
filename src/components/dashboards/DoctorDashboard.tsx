import React, { useMemo, useState } from 'react';
import { useAppointments } from '../../context/AppointmentContext';
import { AppointmentStatus } from '../../types';
import {
  Stethoscope,
  Search,
  CalendarDays,
  FileText,
  Phone,
  UserRound,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

export const DoctorDashboard: React.FC = () => {
  const { appointments, updateStatus } = useAppointments();
  const [searchQuery, setSearchQuery] = useState('');
  const [doctorNotes, setDoctorNotes] = useState<Record<string, string>>({});

  const filteredAppointments = useMemo(() => {
    return appointments.filter((apt) => {
      const matchesQuery =
        apt.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        apt.patientPhone.includes(searchQuery) ||
        apt.patientCity.toLowerCase().includes(searchQuery.toLowerCase()) ||
        apt.branch.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesQuery;
    });
  }, [appointments, searchQuery]);

  const pendingCount = appointments.filter((apt) => apt.status === 'PENDING').length;
  const approvedCount = appointments.filter((apt) => apt.status === 'APPROVED').length;

  const saveDoctorNote = (appointmentId: string) => {
    const note = doctorNotes[appointmentId]?.trim();
    if (!note) return;
    updateStatus(appointmentId, 'APPROVED');
  };

  return (
    <div className="py-8 px-4 sm:px-8 max-w-7xl mx-auto space-y-6">
      <div className="glass-panel rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-emerald-800/20">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-teal-300 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Doctor Clinical Workspace</span>
          </div>
          <h2 className="font-serif text-3xl font-bold text-emerald-950 dark:text-white mt-1">
            Patient Triage & Consultation Notes
          </h2>
          <p className="text-xs text-gray-500">
            Review patient requests, mark follow-up urgency, and capture clinical notes for a faster consultation workflow.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-2xl glass-panel text-center">
            <p className="text-xs text-gray-500 font-medium">Pending Review</p>
            <p className="font-serif font-bold text-lg text-amber-600 dark:text-amber-400">{pendingCount}</p>
          </div>
          <div className="px-4 py-2 rounded-2xl glass-panel text-center">
            <p className="text-xs text-gray-500 font-medium">Approved</p>
            <p className="font-serif font-bold text-lg text-emerald-600 dark:text-teal-400">{approvedCount}</p>
          </div>
        </div>
      </div>

      <div className="glass-panel rounded-2xl p-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search patient name or phone"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-white/60 dark:bg-gray-900/60 text-xs font-medium outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {filteredAppointments.map((apt) => (
          <div key={apt.id} className="glass-panel rounded-3xl p-5 space-y-4 border border-gray-200/50 dark:border-gray-800/50">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-emerald-900 dark:text-teal-300 font-bold text-sm">
                  <UserRound className="w-4 h-4" />
                  <span>{apt.patientName}</span>
                </div>
                <div className="mt-2 space-y-1 text-[11px] text-gray-600 dark:text-gray-300">
                  <p className="flex items-center gap-2"><Phone className="w-3.5 h-3.5" /> {apt.patientPhone}</p>
                  <p className="flex items-center gap-2"><CalendarDays className="w-3.5 h-3.5" /> {apt.preferredDate} • {apt.preferredTime}</p>
                  <p className="font-semibold text-emerald-800 dark:text-teal-300">{apt.branch} • {apt.patientCity}</p>
                </div>
              </div>

              <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                apt.status === 'PENDING' ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300' :
                apt.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-teal-300' :
                'bg-blue-100 text-blue-800 dark:bg-blue-950/80 dark:text-blue-300'
              }`}>
                {apt.status}
              </span>
            </div>

            <div className="rounded-2xl bg-slate-50 dark:bg-slate-900/50 p-3 text-[11px] text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-2 font-semibold text-emerald-900 dark:text-teal-300">
                <Stethoscope className="w-4 h-4" />
                <span>Clinical Notes</span>
              </div>
              <textarea
                rows={3}
                value={doctorNotes[apt.id] ?? ''}
                onChange={(e) => setDoctorNotes(prev => ({ ...prev, [apt.id]: e.target.value }))}
                placeholder="Add symptoms, care plan, or recommended follow-up notes..."
                className="w-full mt-2 px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white/70 dark:bg-gray-900/70 text-xs font-medium outline-none"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => updateStatus(apt.id, 'APPROVED')}
                className="px-3 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-[11px] font-semibold"
              >
                Mark Approved
              </button>
              <button
                onClick={() => updateStatus(apt.id, 'COMPLETED')}
                className="px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-semibold"
              >
                Mark Completed
              </button>
              <button
                onClick={() => saveDoctorNote(apt.id)}
                className="px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 text-[11px] font-semibold flex items-center gap-2"
              >
                <FileText className="w-3.5 h-3.5" />
                Save Note
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
