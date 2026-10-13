import React, { useState, useEffect } from 'react';
import { useRouter, Link } from '../../context/RouterContext';
import { useBooking } from '../../context/BookingContext';
import { StorageService } from '../../lib/storage';
import { useToast } from '../../context/ToastContext';
import { Appointment, AppointmentStatus } from '../../types';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Video, 
  Building2, 
  PlusCircle, 
  XCircle, 
  CheckCircle2, 
  AlertCircle,
  ArrowRight,
  Filter,
  Info
} from 'lucide-react';

export const AppointmentsPage: React.FC = () => {
  const { navigate } = useRouter();
  const { openBooking } = useBooking();
  const { toast } = useToast();

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [statusFilter, setStatusFilter] = useState<'all' | AppointmentStatus>('all');
  const [cancelModalAppointment, setCancelModalAppointment] = useState<Appointment | null>(null);
  const [cancelReason, setCancelReason] = useState('Change in schedule');

  const loadData = () => {
    setAppointments(StorageService.getAppointments());
  };

  useEffect(() => {
    loadData();
    const handleUpdate = () => loadData();
    window.addEventListener('healthconnect:storage-updated', handleUpdate);
    return () => window.removeEventListener('healthconnect:storage-updated', handleUpdate);
  }, []);

  const filteredAppointments = appointments.filter((a) => {
    if (statusFilter === 'all') return true;
    return a.status === statusFilter;
  });

  const handleConfirmCancel = () => {
    if (!cancelModalAppointment) return;
    StorageService.cancelAppointment(cancelModalAppointment.id, cancelReason);
    setCancelModalAppointment(null);
    toast('Appointment Cancelled', `Your visit with ${cancelModalAppointment.doctorName} was cancelled.`, 'info');
    loadData();
  };

  return (
    <div className="space-y-6">
      
      {/* Action Bar & Filter Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        {/* Status Filter Tabs (Button / Segmented Control) */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl">
          {(['all', 'upcoming', 'completed', 'cancelled'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setStatusFilter(tab)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg capitalize transition-colors ${
                statusFilter === tab
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <button
          onClick={() => openBooking()}
          className="py-2.5 px-4 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm transition-colors flex items-center justify-center gap-2"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Schedule New Visit</span>
        </button>

      </div>

      {/* Appointments List */}
      {filteredAppointments.length > 0 ? (
        <div className="grid gap-4">
          {filteredAppointments.map((apt) => {
            const isUpcoming = apt.status === 'upcoming';
            const isCompleted = apt.status === 'completed';
            const isCancelled = apt.status === 'cancelled';

            return (
              <div
                key={apt.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-5 hover:border-slate-300 dark:hover:border-slate-700 transition-all"
              >
                {/* Left: Doctor & Date */}
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl ${apt.doctorAvatarColor} text-white font-bold text-base flex items-center justify-center shadow-sm shrink-0`}>
                    {apt.doctorInitials}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                        <Link to={`/dashboard/appointments/${apt.id}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                          {apt.doctorName}
                        </Link>
                      </h3>
                      <span
                        className={`px-2 py-0.5 text-[10px] font-bold rounded-full capitalize ${
                          isUpcoming
                            ? 'bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-300'
                            : isCompleted
                            ? 'bg-emerald-50 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-300'
                            : 'bg-red-50 dark:bg-red-950/70 text-red-600 dark:text-red-300'
                        }`}
                      >
                        {apt.status}
                      </span>
                    </div>

                    <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                      {apt.doctorSpecialty} · <span className="capitalize">{apt.type} Visit</span>
                    </p>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400 pt-1">
                      <div className="flex items-center gap-1 font-mono">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>{apt.date}</span>
                      </div>
                      <div className="flex items-center gap-1 font-mono">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{apt.time}</span>
                      </div>
                      <div className="flex items-center gap-1 max-w-xs truncate">
                        {apt.type === 'telehealth' ? (
                          <Video className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        ) : (
                          <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                        )}
                        <span className="truncate">{apt.location}</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-400 pt-1 italic">
                      "{apt.reason}"
                    </p>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-2 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100 dark:border-slate-800 shrink-0">
                  <Link
                    to={`/dashboard/appointments/${apt.id}`}
                    className="py-2 px-3 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors text-center"
                  >
                    Details
                  </Link>

                  {isUpcoming && (
                    <button
                      onClick={() => setCancelModalAppointment(apt)}
                      className="py-2 px-3 text-xs font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg transition-colors"
                    >
                      Cancel Visit
                    </button>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-12 text-center rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
          <Calendar className="w-8 h-8 text-slate-300 mx-auto" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            No Appointments Found
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            You do not have any {statusFilter !== 'all' ? statusFilter : ''} appointments in this filter view.
          </p>
          <button
            onClick={() => openBooking()}
            className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Book an Appointment
          </button>
        </div>
      )}

      {/* Cancellation Dialog Modal */}
      {cancelModalAppointment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-950 text-red-600 flex items-center justify-center shrink-0">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Cancel Appointment?</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Are you sure you want to cancel your consultation with {cancelModalAppointment.doctorName} on {cancelModalAppointment.date}?
                </p>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Reason for Cancellation
              </label>
              <select
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              >
                <option value="Change in personal schedule">Change in personal schedule</option>
                <option value="Symptoms resolved or improved">Symptoms resolved or improved</option>
                <option value="Consulted with another physician">Consulted with another physician</option>
                <option value="Rescheduling for a different date">Rescheduling for a different date</option>
              </select>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setCancelModalAppointment(null)}
                className="px-3.5 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900"
              >
                Keep Appointment
              </button>
              <button
                onClick={handleConfirmCancel}
                className="px-4 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-sm"
              >
                Confirm Cancellation
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
