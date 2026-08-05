import React, { useState } from 'react';
import { Role } from '../../types';
import { X, ShieldCheck, Key, Database, AlertCircle, Server } from 'lucide-react';
import { setToken } from '../../lib/api';
import { login } from '../../lib/queries';

interface PortalLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (role: Role) => void;
}

export const PortalLoginModal: React.FC<PortalLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsSubmitting(true);

    try {
      const res = await login(email.trim(), password);
      // Store the JWT for subsequent authenticated API calls
      setToken(res.token);

      const role = (res.user?.role as Role) || 'PATIENT';
      onLoginSuccess(role);
      onClose();
    } catch (err) {
      const e = err as { message?: string };
      setErrorMsg(e?.message || 'Invalid credentials. Please check your email and password.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="glass-panel w-full max-w-md rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl border border-emerald-500/30 relative">
        
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-emerald-800 text-white mx-auto flex items-center justify-center shadow-lg">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-emerald-950 dark:text-white">
            Staff Portal Login
          </h2>
          <p className="text-xs text-gray-500">
            Sign in with your staff account to access clinical triage queues & admin settings.
          </p>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-900 text-[10px] font-bold text-slate-700 dark:text-slate-300">
            <Server className="w-3 h-3" />
            <span>Render backend (JWT secured)</span>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Staff Email</label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-700 dark:text-teal-400 text-sm font-bold">@</span>
              <input
                type="email"
                required
                placeholder="staff@astygmahope.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white/60 dark:bg-gray-900/60 text-xs font-medium outline-none"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Password</label>
            <div className="relative">
              <Key className="w-4 h-4 text-emerald-700 dark:text-teal-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white/60 dark:bg-gray-900/60 text-xs font-medium outline-none"
              />
            </div>
          </div>

          {errorMsg && (
            <p className="text-xs text-red-500 font-semibold flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5" /> {errorMsg}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs shadow-md disabled:opacity-60"
          >
            {isSubmitting ? 'Authenticating...' : 'Authenticate & Access Portal'}
          </button>
        </form>

      </div>
    </div>
  );
};
