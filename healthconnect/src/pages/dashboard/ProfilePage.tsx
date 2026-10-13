import React, { useState } from 'react';
import { StorageService } from '../../lib/storage';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useToast } from '../../context/ToastContext';
import { PatientProfile } from '../../types';
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  Heart, 
  ShieldCheck, 
  Bell, 
  Moon, 
  Sun, 
  Save, 
  RefreshCw, 
  LogOut,
  AlertCircle
} from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme, setTheme } = useTheme();
  const { toast } = useToast();

  const [profile, setProfile] = useState<PatientProfile>(() => StorageService.getProfile());
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (field: keyof PatientProfile, value: any) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleEmergencyChange = (field: string, value: string) => {
    setProfile(prev => ({
      ...prev,
      emergencyContact: {
        ...prev.emergencyContact,
        [field]: value
      }
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile.name.trim() || !profile.email.trim()) {
      alert('Name and email are required fields.');
      return;
    }
    setIsSaving(true);
    StorageService.saveProfile(profile);
    setTimeout(() => {
      setIsSaving(false);
      toast('Profile Updated', 'Patient demographics and preferences saved locally.', 'success');
    }, 400);
  };

  const handleResetData = () => {
    if (confirm('Reset all demo appointments and medical records to default baseline?')) {
      StorageService.resetDemoData();
      setProfile(StorageService.getProfile());
      toast('Demo Data Reset', 'Default test database restored.', 'info');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      
      {/* Profile Header Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white font-bold text-2xl flex items-center justify-center shadow-md">
            {profile.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'AR'}
          </div>
          <div className="space-y-1">
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">
              {profile.name}
            </h1>
            <p className="text-xs text-slate-500 font-mono">
              Patient ID: {profile.id} · {profile.email}
            </p>
            <span className="inline-block px-2 py-0.5 text-[10px] font-bold rounded bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-300">
              Verified Demo Profile
            </span>
          </div>
        </div>

        <button
          onClick={logout}
          className="py-2 px-3 text-xs font-semibold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 rounded-lg hover:bg-red-100 transition-colors flex items-center gap-1.5 self-start sm:self-center"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Main Profile Form */}
      <form onSubmit={handleSave} className="space-y-8">
        
        {/* Personal Demographics */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
            Personal Demographics
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Full Legal Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => handleChange('name', e.target.value)}
                required
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => handleChange('email', e.target.value)}
                required
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Contact Phone Number
              </label>
              <input
                type="text"
                value={profile.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Date of Birth
              </label>
              <input
                type="date"
                value={profile.dateOfBirth}
                onChange={(e) => handleChange('dateOfBirth', e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Blood Group
              </label>
              <select
                value={profile.bloodGroup}
                onChange={(e) => handleChange('bloodGroup', e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              >
                <option value="A Positive">A Positive (A+)</option>
                <option value="A Negative">A Negative (A-)</option>
                <option value="B Positive">B Positive (B+)</option>
                <option value="B Negative">B Negative (B-)</option>
                <option value="AB Positive">AB Positive (AB+)</option>
                <option value="AB Negative">AB Negative (AB-)</option>
                <option value="O Positive">O Positive (O+)</option>
                <option value="O Negative">O Negative (O-)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Gender Identity
              </label>
              <input
                type="text"
                value={profile.gender}
                onChange={(e) => handleChange('gender', e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
            Emergency Contact Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Contact Name
              </label>
              <input
                type="text"
                value={profile.emergencyContact.name}
                onChange={(e) => handleEmergencyChange('name', e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Relationship
              </label>
              <input
                type="text"
                value={profile.emergencyContact.relation}
                onChange={(e) => handleEmergencyChange('relation', e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Emergency Phone
              </label>
              <input
                type="text"
                value={profile.emergencyContact.phone}
                onChange={(e) => handleEmergencyChange('phone', e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
              />
            </div>
          </div>
        </div>

        {/* Preferences & Theme */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
            Application Preferences & Notifications
          </h2>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">Visual Theme</p>
                <p className="text-[11px] text-slate-500">Currently using {theme} mode.</p>
              </div>
              <button
                type="button"
                onClick={toggleTheme}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center gap-1.5"
              >
                {theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5" />}
                <span>Toggle {theme === 'dark' ? 'Light' : 'Dark'}</span>
              </button>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">Email Reminders</p>
                <p className="text-[11px] text-slate-500">Receive schedule and lab notification alerts via email.</p>
              </div>
              <input
                type="checkbox"
                checked={profile.emailNotifications}
                onChange={(e) => handleChange('emailNotifications', e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded"
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">SMS Notifications</p>
                <p className="text-[11px] text-slate-500">Urgent visit reminder text messages.</p>
              </div>
              <input
                type="checkbox"
                checked={profile.smsNotifications}
                onChange={(e) => handleChange('smsNotifications', e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <button
            type="button"
            onClick={handleResetData}
            className="w-full sm:w-auto py-2 px-4 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center gap-1.5 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Entire Demo Database</span>
          </button>

          <button
            type="submit"
            disabled={isSaving}
            className="w-full sm:w-auto py-2.5 px-6 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm transition-all flex items-center justify-center gap-1.5"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{isSaving ? 'Saving Changes...' : 'Save Patient Profile'}</span>
          </button>
        </div>

      </form>

    </div>
  );
};
