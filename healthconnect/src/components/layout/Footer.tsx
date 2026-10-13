import React from 'react';
import { Link } from '../../context/RouterContext';
import { Activity, ShieldAlert, HeartHandshake } from 'lucide-react';
import { StorageService } from '../../lib/storage';
import { useToast } from '../../context/ToastContext';

export const Footer: React.FC = () => {
  const { toast } = useToast();

  const handleResetDemo = () => {
    StorageService.resetDemoData();
    toast('Demo Data Reset', 'Initial clinical mock records and appointments restored.', 'info');
  };

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-colors">
      {/* Clinical Disclaimer Banner */}
      <div className="bg-slate-100 dark:bg-slate-950/60 border-b border-slate-200 dark:border-slate-800 py-3 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0" />
            <span>
              <strong>Healthcare Demonstration Notice:</strong> HealthConnect is a demonstration software prototype. All doctor profiles, clinical records, and appointments are simulated sample data and do not constitute real clinical care.
            </span>
          </div>
          <button
            onClick={handleResetDemo}
            className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline shrink-0"
          >
            Reset Demo Data
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 text-slate-900 dark:text-white font-bold text-lg tracking-tight">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-sm">
                <Activity className="w-5 h-5" />
              </div>
              <span>HealthConnect</span>
            </Link>
            <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
              Modern digital platform for specialist discovery, verifiable appointment coordination, and patient-centered health management.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <HeartHandshake className="w-4 h-4 text-rose-500" />
              <span>Designed with patient accessibility first</span>
            </div>
          </div>

          {/* Clinical Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">Clinical Areas</h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li><Link to="/services" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Cardiovascular Care</Link></li>
              <li><Link to="/services" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Neurology & Cognitive Health</Link></li>
              <li><Link to="/services" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Pediatric Consultations</Link></li>
              <li><Link to="/services" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Dermatology Screenings</Link></li>
              <li><Link to="/services" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Orthopedics & Joint Health</Link></li>
            </ul>
          </div>

          {/* Quick Platform Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">Platform</h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li><Link to="/doctors" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Find a Doctor</Link></li>
              <li><Link to="/dashboard" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Patient Dashboard</Link></li>
              <li><Link to="/dashboard/appointments" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Manage Appointments</Link></li>
              <li><Link to="/dashboard/records" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Medical Records Hub</Link></li>
              <li><Link to="/about" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Clinical Mission</Link></li>
            </ul>
          </div>

          {/* Emergency & Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">Immediate Care</h4>
            <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 text-xs text-red-900 dark:text-red-200 space-y-1">
              <p className="font-semibold">Medical Emergencies</p>
              <p className="text-[11px] leading-relaxed">
                If you are experiencing chest pain, difficulty breathing, or severe trauma, call 911 or your local emergency dispatch immediately.
              </p>
            </div>
            <div className="pt-2 text-xs text-slate-500 dark:text-slate-400 space-y-1">
              <p>Demo Support: <span className="font-mono text-slate-700 dark:text-slate-300">support@healthconnect.demo</span></p>
              <Link to="/contact" className="inline-block text-blue-600 dark:text-blue-400 hover:underline">
                Contact Care Coordination →
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p>© {new Date().getFullYear()} HealthConnect Inc. Demonstrational healthcare software architecture.</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:text-slate-800 dark:hover:text-slate-200 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-slate-800 dark:hover:text-slate-200 transition-colors">Terms of Use</Link>
            <Link to="/contact" className="hover:text-slate-800 dark:hover:text-slate-200 transition-colors">Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
