import React, { useState, useEffect } from 'react';
import { useRouter, Link } from '../../context/RouterContext';
import { useAuth } from '../../context/AuthContext';
import { useBooking } from '../../context/BookingContext';
import { StorageService } from '../../lib/storage';
import { Appointment, MedicalRecord, Prescription } from '../../types';
import { 
  Calendar, 
  FileText, 
  Pill, 
  PlusCircle, 
  Clock, 
  MapPin, 
  Video, 
  Building2, 
  ArrowRight, 
  ShieldCheck, 
  Activity, 
  AlertCircle,
  CheckCircle2,
  Stethoscope,
  Sparkles
} from 'lucide-react';

export const DashboardOverview: React.FC = () => {
  const { navigate } = useRouter();
  const { user } = useAuth();
  const { openBooking } = useBooking();

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const profile = StorageService.getProfile();

  const loadData = () => {
    setAppointments(StorageService.getAppointments());
    setRecords(StorageService.getRecords());
    setPrescriptions(StorageService.getPrescriptions());
  };

  useEffect(() => {
    loadData();
    const handleStorageUpdate = () => loadData();
    window.addEventListener('healthconnect:storage-updated', handleStorageUpdate);
    return () => window.removeEventListener('healthconnect:storage-updated', handleStorageUpdate);
  }, []);

  const upcomingAppointments = appointments.filter(a => a.status === 'upcoming');
  const nextAppointment = upcomingAppointments[0];
  const activePrescriptions = prescriptions.filter(p => p.status === 'active');

  return (
    <div className="space-y-8">
      
      {/* Patient Greeting & Status Ribbon */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-900 to-slate-900 text-white shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-800 text-blue-200">
              Demo Patient Account
            </span>
            <span className="text-xs text-blue-300">· ID: {profile.id}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome back, {user?.name || profile.name}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Blood Group: <strong className="text-white font-mono">{profile.bloodGroup}</strong> · Allergies: {profile.allergies.join(', ')}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => openBooking()}
            className="py-2.5 px-4 text-xs font-bold text-slate-900 bg-white hover:bg-slate-100 rounded-xl transition-all shadow-sm flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4 text-blue-600" />
            <span>New Appointment</span>
          </button>
        </div>
      </div>

      {/* KPI / Quick Metric Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 block">Upcoming Visits</span>
            <span className="text-2xl font-bold text-slate-900 dark:text-white font-mono tabular-nums">
              {upcomingAppointments.length}
            </span>
          </div>
          <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <Calendar className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 block">Active Prescriptions</span>
            <span className="text-2xl font-bold text-slate-900 dark:text-white font-mono tabular-nums">
              {activePrescriptions.length}
            </span>
          </div>
          <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <Pill className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 block">Clinical Records</span>
            <span className="text-2xl font-bold text-slate-900 dark:text-white font-mono tabular-nums">
              {records.length}
            </span>
          </div>
          <div className="w-10 h-10 rounded-lg bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center">
            <FileText className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 block">Primary Provider</span>
            <span className="text-xs font-bold text-slate-900 dark:text-white truncate block max-w-[130px]">
              Dr. Priya Patel
            </span>
            <span className="text-[10px] text-slate-400">General Medicine</span>
          </div>
          <div className="w-10 h-10 rounded-lg bg-sky-50 dark:bg-sky-950 text-sky-600 dark:text-sky-400 flex items-center justify-center">
            <Stethoscope className="w-5 h-5" />
          </div>
        </div>

      </div>

      {/* Main Split: Next Appointment & Recent Medical Records */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Next Appointment Spotlight */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">
              Next Scheduled Appointment
            </h2>
            <Link
              to="/dashboard/appointments"
              className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 font-semibold"
            >
              <span>View All ({appointments.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {nextAppointment ? (
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl ${nextAppointment.doctorAvatarColor} text-white font-bold text-base flex items-center justify-center shadow-sm`}>
                    {nextAppointment.doctorInitials}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      {nextAppointment.doctorName}
                    </h3>
                    <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                      {nextAppointment.doctorSpecialty}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="px-2.5 py-1 text-[11px] font-bold rounded-full bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-300 capitalize">
                    {nextAppointment.type}
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                  <strong className="text-slate-800 dark:text-slate-200 font-mono">
                    {nextAppointment.date} at {nextAppointment.time}
                  </strong>
                </div>
                <div className="flex items-center gap-2">
                  {nextAppointment.type === 'telehealth' ? (
                    <Video className="w-4 h-4 text-emerald-500 shrink-0" />
                  ) : (
                    <MapPin className="w-4 h-4 text-red-500 shrink-0" />
                  )}
                  <span className="text-slate-600 dark:text-slate-400 truncate">
                    {nextAppointment.location}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 pt-1 italic">
                  "{nextAppointment.reason}"
                </p>
              </div>

              {nextAppointment.notes && (
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  <strong>Preparation:</strong> {nextAppointment.notes}
                </p>
              )}

              <div className="pt-2 flex items-center gap-3">
                <Link
                  to={`/dashboard/appointments/${nextAppointment.id}`}
                  className="flex-1 py-2 text-center text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                >
                  View Consultation Details
                </Link>
                {nextAppointment.type === 'telehealth' && (
                  <button
                    onClick={() => alert('Telehealth simulator: In production, this launches the HIPAA-compliant WebRTC encrypted video room.')}
                    className="py-2 px-3 text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 rounded-lg border border-emerald-200 dark:border-emerald-800 transition-colors"
                  >
                    Join Video Room
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-3">
              <Calendar className="w-8 h-8 text-slate-300 mx-auto" />
              <p className="text-xs text-slate-500">No upcoming clinical consultations scheduled.</p>
              <button
                onClick={() => openBooking()}
                className="py-2 px-4 text-xs font-semibold text-white bg-blue-600 rounded-lg"
              >
                Schedule an Appointment
              </button>
            </div>
          )}
        </div>

        {/* Recent Medical Records */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">
              Recent Medical Documents & Labs
            </h2>
            <Link
              to="/dashboard/records"
              className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 font-semibold"
            >
              <span>View All Records ({records.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {records.slice(0, 3).map((rec) => (
              <div
                key={rec.id}
                onClick={() => navigate(`/dashboard/records/${rec.id}`)}
                className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-400 cursor-pointer transition-all space-y-1.5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 dark:text-white">
                      {rec.title}
                    </h3>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      <span className="capitalize">{rec.category.replace('_', ' ')}</span>
                      <span aria-hidden="true">·</span>
                      <span>{rec.doctorName}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono">{rec.date}</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 shrink-0">
                    {rec.fileSize}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                  {rec.summary}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Active Prescriptions Strip */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Pill className="w-4 h-4 text-emerald-600" />
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">
              Active Medication Regimen
            </h2>
          </div>
          <Link
            to="/dashboard/prescriptions"
            className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-semibold"
          >
            Manage Prescriptions →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activePrescriptions.map((rx) => (
            <div
              key={rx.id}
              className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/70 space-y-2 text-xs"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">{rx.medicationName}</h4>
                  <p className="text-[11px] text-slate-500">{rx.dosage} · {rx.frequency}</p>
                </div>
                <span className="text-[10px] px-2 py-0.5 font-bold rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
                  {rx.refillsLeft} refills left
                </span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-400">
                <strong>Instructions:</strong> {rx.instructions}
              </p>
              <div className="pt-1 flex items-center justify-between text-[10px] text-slate-400">
                <span>Prescribed by {rx.prescribingDoctor}</span>
                <span className="font-mono">Issued {rx.issueDate}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
