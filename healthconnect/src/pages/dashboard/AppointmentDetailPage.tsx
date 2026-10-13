import React, { useState, useEffect } from 'react';
import { useRouter, Link } from '../../context/RouterContext';
import { StorageService } from '../../lib/storage';
import { useToast } from '../../context/ToastContext';
import { Appointment } from '../../types';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  MapPin, 
  Video, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  User, 
  Building2, 
  Phone,
  ShieldCheck,
  Stethoscope
} from 'lucide-react';

export const AppointmentDetailPage: React.FC<{ appointmentId: string }> = ({ appointmentId }) => {
  const { navigate } = useRouter();
  const { toast } = useToast();
  const [appointment, setAppointment] = useState<Appointment | undefined>(() => 
    StorageService.getAppointmentById(appointmentId)
  );

  useEffect(() => {
    setAppointment(StorageService.getAppointmentById(appointmentId));
  }, [appointmentId]);

  if (!appointment) {
    return (
      <div className="p-12 text-center rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
        <AlertCircle className="w-8 h-8 text-slate-400 mx-auto" />
        <h3 className="text-sm font-bold text-slate-900 dark:text-white">Appointment Record Not Found</h3>
        <p className="text-xs text-slate-500">The appointment ID requested does not exist in your local record.</p>
        <Link
          to="/dashboard/appointments"
          className="inline-block px-4 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg"
        >
          Return to Appointments
        </Link>
      </div>
    );
  }

  const isUpcoming = appointment.status === 'upcoming';
  const isCompleted = appointment.status === 'completed';
  const isCancelled = appointment.status === 'cancelled';

  const handleCancel = () => {
    StorageService.cancelAppointment(appointment.id, 'Cancelled via appointment detail view');
    setAppointment(StorageService.getAppointmentById(appointmentId));
    toast('Appointment Cancelled', 'Updated status to cancelled.', 'info');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Back button */}
      <Link
        to="/dashboard/appointments"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Appointments List</span>
      </Link>

      {/* Main Detail Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        
        {/* Header Ribbon */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-start gap-4">
            <div className={`w-14 h-14 rounded-2xl ${appointment.doctorAvatarColor} text-white font-bold text-xl flex items-center justify-center shadow-sm shrink-0`}>
              {appointment.doctorInitials}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-slate-900 dark:text-white">
                  {appointment.doctorName}
                </h1>
                <span
                  className={`px-2.5 py-0.5 text-xs font-bold rounded-full capitalize ${
                    isUpcoming
                      ? 'bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-300'
                      : isCompleted
                      ? 'bg-emerald-50 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-300'
                      : 'bg-red-50 dark:bg-red-950/70 text-red-600 dark:text-red-300'
                  }`}
                >
                  {appointment.status}
                </span>
              </div>
              <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold mt-0.5">
                {appointment.doctorSpecialty} · {appointment.type === 'telehealth' ? 'Virtual Video Visit' : 'In-Person Consultation'}
              </p>
              <p className="text-[11px] text-slate-400 mt-1 font-mono">
                Reference ID: {appointment.id}
              </p>
            </div>
          </div>

          {isUpcoming && (
            <button
              onClick={handleCancel}
              className="py-2 px-3 text-xs font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg border border-red-200 dark:border-red-900/50 self-start transition-colors"
            >
              Cancel Appointment
            </button>
          )}
        </div>

        {/* Cancellation Notice if cancelled */}
        {isCancelled && appointment.cancellationReason && (
          <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 text-xs text-red-800 dark:text-red-200 space-y-1">
            <p className="font-semibold">Cancellation Notice:</p>
            <p>{appointment.cancellationReason}</p>
          </div>
        )}

        {/* Schedule & Location Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-1.5">
            <span className="text-[11px] text-slate-400 uppercase font-semibold">Date & Time</span>
            <div className="flex items-center gap-2 font-mono font-bold text-slate-900 dark:text-white text-sm">
              <Calendar className="w-4 h-4 text-blue-600" />
              <span>{appointment.date}</span>
              <span>·</span>
              <Clock className="w-4 h-4 text-blue-600" />
              <span>{appointment.time}</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-1.5">
            <span className="text-[11px] text-slate-400 uppercase font-semibold">Consultation Venue</span>
            <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 font-semibold">
              {appointment.type === 'telehealth' ? (
                <>
                  <Video className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>HealthConnect Virtual Consultation Room</span>
                </>
              ) : (
                <>
                  <MapPin className="w-4 h-4 text-red-500 shrink-0" />
                  <span className="truncate">{appointment.location}</span>
                </>
              )}
            </div>
          </div>

        </div>

        {/* Clinical Reason & Preparation Notes */}
        <div className="space-y-4 pt-2">
          <div className="space-y-1 text-xs">
            <span className="text-[11px] text-slate-400 uppercase font-semibold">Reported Reason for Consultation</span>
            <p className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-medium">
              {appointment.reason}
            </p>
          </div>

          {appointment.notes && (
            <div className="space-y-1 text-xs">
              <span className="text-[11px] text-slate-400 uppercase font-semibold">Patient Preparation Instructions</span>
              <p className="p-3 rounded-xl bg-blue-50/60 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 text-blue-950 dark:text-blue-200">
                {appointment.notes}
              </p>
            </div>
          )}
        </div>

        {/* Telehealth Room Link if applicable */}
        {appointment.type === 'telehealth' && isUpcoming && (
          <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="space-y-1">
              <p className="font-bold text-emerald-900 dark:text-emerald-100 flex items-center gap-1.5">
                <Video className="w-4 h-4 text-emerald-600" />
                <span>Virtual Consultation Link Ready</span>
              </p>
              <p className="text-[11px] text-emerald-700 dark:text-emerald-300">
                Access your encrypted HD video consultation 5 minutes prior to scheduled start time.
              </p>
            </div>
            <button
              onClick={() => alert('Launching simulated telehealth room with Dr. ' + appointment.doctorName)}
              className="py-2 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg shrink-0 transition-colors"
            >
              Enter Virtual Room
            </button>
          </div>
        )}

      </div>

    </div>
  );
};
