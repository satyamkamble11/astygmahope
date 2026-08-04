import React, { useState } from 'react';
import { useAppointments } from '../../context/AppointmentContext';
import { AppointmentStatus } from '../../types';
import { 
  Users, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Phone, 
  Calendar, 
  MessageSquare, 
  Search, 
  Filter,
  ShieldCheck,
  Send
} from 'lucide-react';

export const ReceptionDashboard: React.FC = () => {
  const { appointments, updateStatus, getWhatsAppUrl } = useAppointments();
  const [statusFilter, setStatusFilter] = useState<AppointmentStatus | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = appointments.filter(a => {
    const matchesStatus = statusFilter === 'ALL' || a.status === statusFilter;
    const matchesQuery = a.patientName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         a.patientPhone.includes(searchQuery) ||
                         a.patientCity.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         a.branch.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesQuery;
  });

  return (
    <div className="py-8 px-4 sm:px-8 max-w-7xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-emerald-800/20">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-teal-300 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Reception & Administrative Triage Portal</span>
          </div>
          <h2 className="font-serif text-3xl font-bold text-emerald-950 dark:text-white mt-1">
            Shirol Branch Appointment Queue
          </h2>
          <p className="text-xs text-gray-500">
            Review incoming non-payment patient requests, update appointment status, and send WhatsApp direct confirmations.
          </p>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-2xl glass-panel text-center">
            <p className="text-xs text-gray-500 font-medium">Pending Triage</p>
            <p className="font-serif font-bold text-lg text-amber-600 dark:text-amber-400">
              {appointments.filter(a => a.status === 'PENDING').length}
            </p>
          </div>
          <div className="px-4 py-2 rounded-2xl glass-panel text-center">
            <p className="text-xs text-gray-500 font-medium">Approved</p>
            <p className="font-serif font-bold text-lg text-emerald-600 dark:text-teal-400">
              {appointments.filter(a => a.status === 'APPROVED').length}
            </p>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 glass-panel p-4 rounded-2xl">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search patient name, phone, service..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-white/60 dark:bg-gray-900/60 text-xs font-medium outline-none"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          {['ALL', 'PENDING', 'APPROVED', 'COMPLETED', 'CANCELLED'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all ${
                statusFilter === st 
                  ? 'bg-emerald-800 text-white shadow-md' 
                  : 'glass-panel text-gray-600 dark:text-gray-300'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Appointment Table */}
      <div className="glass-panel rounded-3xl overflow-hidden shadow-xl border border-gray-200/50 dark:border-gray-800/50">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200/60 dark:border-gray-800/60 bg-emerald-50/50 dark:bg-emerald-950/40 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                <th className="py-3.5 px-4">Patient Info</th>
                <th className="py-3.5 px-4">Treatment / Service</th>
                <th className="py-3.5 px-4">Date & Time</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Reception Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200/40 dark:divide-gray-800/40 text-xs">
              {filtered.map((apt) => (
                <tr key={apt.id} className="hover:bg-emerald-50/30 dark:hover:bg-emerald-950/20 transition-colors">
                  
                  {/* Patient Info */}
                  <td className="py-4 px-4">
                    <p className="font-bold text-emerald-950 dark:text-white">{apt.patientName}</p>
                    <p className="text-[11px] text-gray-500 flex items-center gap-1 mt-0.5">
                      <Phone className="w-3 h-3 text-emerald-600" />
                      <span>{apt.patientPhone}</span>
                    </p>
                  </td>

                  {/* Branch & City */}
                  <td className="py-4 px-4 font-semibold text-emerald-900 dark:text-teal-300">
                    <p>{apt.branch}</p>
                    <p className="text-[11px] text-gray-500 font-normal">📍 {apt.patientCity}</p>
                  </td>

                  {/* Date Time */}
                  <td className="py-4 px-4 text-gray-700 dark:text-gray-300">
                    <p className="font-semibold">{apt.preferredDate}</p>
                    <p className="text-[11px] text-gray-500">{apt.preferredTime}</p>
                  </td>

                  {/* Status */}
                  <td className="py-4 px-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      apt.status === 'PENDING' ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300' :
                      apt.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-teal-300' :
                      apt.status === 'COMPLETED' ? 'bg-blue-100 text-blue-800 dark:bg-blue-950/80 dark:text-blue-300' :
                      'bg-red-100 text-red-800 dark:bg-red-950/80 dark:text-red-300'
                    }`}>
                      {apt.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-4 text-right space-x-2">
                    
                    {/* Approve Button */}
                    {apt.status !== 'APPROVED' && (
                      <button
                        onClick={() => updateStatus(apt.id, 'APPROVED')}
                        className="px-2.5 py-1 rounded-lg bg-emerald-800 text-white font-semibold text-[11px] hover:bg-emerald-900 transition-colors"
                      >
                        Approve
                      </button>
                    )}

                    {/* Complete Button */}
                    {apt.status === 'APPROVED' && (
                      <button
                        onClick={() => updateStatus(apt.id, 'COMPLETED')}
                        className="px-2.5 py-1 rounded-lg bg-blue-600 text-white font-semibold text-[11px] hover:bg-blue-700 transition-colors"
                      >
                        Complete
                      </button>
                    )}

                    {/* WhatsApp Action */}
                    <a
                      href={getWhatsAppUrl(apt)}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-teal-300 font-semibold text-[11px] hover:bg-emerald-200 transition-colors"
                    >
                      <Send className="w-3 h-3" />
                      <span>WhatsApp</span>
                    </a>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
