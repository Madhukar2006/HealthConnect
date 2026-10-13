import React, { useState } from 'react';
import { useBooking } from '../../context/BookingContext';
import { StorageService } from '../../lib/storage';
import { Doctor, AppointmentType } from '../../types';
import { useRouter } from '../../context/RouterContext';
import { 
  X, 
  Calendar, 
  Clock, 
  Video, 
  MapPin, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  ArrowLeft, 
  DollarSign, 
  Stethoscope, 
  Building2,
  CalendarDays,
  FileCheck2
} from 'lucide-react';

export const BookingModal: React.FC = () => {
  const { 
    isOpen, 
    closeBooking, 
    state, 
    setDoctor, 
    setDate, 
    setTimeSlot, 
    setType, 
    setReason, 
    setNotes, 
    nextStep, 
    prevStep, 
    confirmBooking,
    resetBooking
  } = useBooking();

  const { navigate } = useRouter();
  const [doctorSearch, setDoctorSearch] = useState('');
  const doctors = StorageService.getDoctors();

  if (!isOpen) return null;

  const filteredDoctors = doctors.filter(d => 
    d.name.toLowerCase().includes(doctorSearch.toLowerCase()) ||
    d.specialty.toLowerCase().includes(doctorSearch.toLowerCase())
  );

  // Generate next 14 days for date selection
  const availableDates: { dateString: string; dayName: string; displayLabel: string; isAvailable: boolean }[] = [];
  const today = new Date();
  for (let i = 1; i <= 14; i++) {
    const d = new Date();
    d.setDate(today.getDate() + i);
    const dayName = d.toLocaleDateString('en-US', { weekday: 'long' });
    const dateString = d.toISOString().split('T')[0];
    const displayLabel = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', weekday: 'short' });
    const isAvailable = state.selectedDoctor ? state.selectedDoctor.availableDays.includes(dayName) : true;
    availableDates.push({ dateString, dayName, displayLabel, isAvailable });
  }

  const handleFinish = () => {
    resetBooking();
    navigate('/dashboard/appointments');
  };

  const stepsList = [
    'Doctor',
    'Date',
    'Time',
    'Mode',
    'Symptoms',
    'Review',
    'Confirm',
    'Receipt'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-in fade-in zoom-in-95 duration-200 my-8">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-950/50">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              {state.step === 8 ? 'Appointment Receipt' : 'Schedule Clinical Consultation'}
            </h2>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              <span>Step {state.step} of 8</span>
              <span>·</span>
              <span>{stepsList[state.step - 1]}</span>
            </div>
          </div>
          <button
            onClick={closeBooking}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Bar */}
        <div className="w-full bg-slate-100 dark:bg-slate-800 h-1">
          <div 
            className="bg-blue-600 h-1 transition-all duration-300" 
            style={{ width: `${(state.step / 8) * 100}%` }}
          />
        </div>

        {/* Validation Error Banner */}
        {state.validationError && (
          <div className="mx-6 mt-4 p-3 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 flex items-center gap-2 text-xs text-red-700 dark:text-red-300">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{state.validationError}</span>
          </div>
        )}

        {/* Step Content */}
        <div className="p-6 max-h-[68vh] overflow-y-auto">
          
          {/* STEP 1: Select Doctor */}
          {state.step === 1 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Step 1: Choose Your Doctor</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Select a licensed specialist based on clinical focus and consultation fees.
                </p>
              </div>

              <input
                type="text"
                placeholder="Search by doctor name or specialty..."
                value={doctorSearch}
                onChange={(e) => setDoctorSearch(e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              />

              <div className="grid gap-2.5 max-h-80 overflow-y-auto pr-1">
                {filteredDoctors.map((doc) => {
                  const isSelected = state.selectedDoctor?.id === doc.id;
                  return (
                    <div
                      key={doc.id}
                      onClick={() => setDoctor(doc)}
                      className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/40 ring-1 ring-blue-600'
                          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-800/60'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full ${doc.avatarColor} text-white font-bold text-sm flex items-center justify-center shrink-0`}>
                            {doc.initials}
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-slate-900 dark:text-white">{doc.name}</h4>
                            <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                              <span>{doc.specialty}</span>
                              <span aria-hidden="true">·</span>
                              <span>{doc.experienceYears} yrs exp</span>
                              <span aria-hidden="true">·</span>
                              <span>Rating {doc.rating} ({doc.reviewCount})</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-xs font-bold text-slate-900 dark:text-white font-mono">${doc.fee}</span>
                          <p className="text-[10px] text-slate-400">per visit</p>
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 line-clamp-1">
                        {doc.bio}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: Choose Date */}
          {state.step === 2 && state.selectedDoctor && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Step 2: Choose an Available Date</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Consulting with {state.selectedDoctor.name}. Available on {state.selectedDoctor.availableDays.join(', ')}.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {availableDates.map(({ dateString, displayLabel, dayName, isAvailable }) => {
                  const isSelected = state.date === dateString;
                  return (
                    <button
                      key={dateString}
                      disabled={!isAvailable}
                      onClick={() => setDate(dateString)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        !isAvailable
                          ? 'opacity-40 bg-slate-50 dark:bg-slate-800/20 border-slate-200 dark:border-slate-800 cursor-not-allowed'
                          : isSelected
                          ? 'border-blue-600 bg-blue-50/60 dark:bg-blue-950/40 ring-1 ring-blue-600 text-blue-950 dark:text-blue-100'
                          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-800/60'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900 dark:text-white">{displayLabel}</span>
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />}
                      </div>
                      <p className="text-[10px] text-slate-400 mt-1">
                        {isAvailable ? `${dayName} schedule` : 'No clinic hours'}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: Choose Time Slot */}
          {state.step === 3 && state.selectedDoctor && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Step 3: Select Time Slot</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Selected Date: <strong className="text-slate-800 dark:text-slate-200">{state.date}</strong>
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {state.selectedDoctor.timeSlots.map((slot) => {
                  const isSelected = state.timeSlot === slot;
                  return (
                    <button
                      key={slot}
                      onClick={() => setTimeSlot(slot)}
                      className={`py-3 px-4 rounded-xl border text-center transition-all ${
                        isSelected
                          ? 'border-blue-600 bg-blue-600 text-white font-bold shadow-sm'
                          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-800/60 text-slate-900 dark:text-white'
                      }`}
                    >
                      <div className="flex items-center justify-center gap-1.5 text-xs font-mono">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{slot}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 4: Choose Appointment Mode */}
          {state.step === 4 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Step 4: Select Consultation Mode</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Choose between an in-person clinical visit or a secure video consultation.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <button
                  onClick={() => setType('in-person')}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    state.type === 'in-person'
                      ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/40 ring-1 ring-blue-600'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-9 h-9 rounded-lg bg-blue-100 dark:bg-blue-900/60 text-blue-600 dark:text-blue-300 flex items-center justify-center">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">In-Person Clinic Visit</h4>
                      <p className="text-[10px] text-slate-400">At medical facility</p>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                    Physical examination, diagnostic vitals, and direct specialist evaluation at {state.selectedDoctor?.location}.
                  </p>
                </button>

                <button
                  onClick={() => setType('telehealth')}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    state.type === 'telehealth'
                      ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/40 ring-1 ring-blue-600'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-9 h-9 rounded-lg bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-300 flex items-center justify-center">
                      <Video className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">Telehealth Video</h4>
                      <p className="text-[10px] text-slate-400">Encrypted virtual room</p>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                    Virtual consultation via high-definition video link. Ideal for routine follow-ups, lab reviews, and non-acute symptoms.
                  </p>
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: Reason for Visit */}
          {state.step === 5 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Step 5: Clinical Reason & Symptoms</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Helps {state.selectedDoctor?.name} prepare for your consultation.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Primary Reason for Consultation <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Annual cardiovascular evaluation, persistent headaches..."
                  value={state.reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Additional Notes or Symptoms (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Mention duration of symptoms, medications you currently take, or questions for the doctor..."
                  value={state.notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>
          )}

          {/* STEP 6: Review Booking Details */}
          {state.step === 6 && state.selectedDoctor && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Step 6: Review Booking Details</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Please verify your clinical appointment details before submitting.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full ${state.selectedDoctor.avatarColor} text-white font-bold text-sm flex items-center justify-center`}>
                      {state.selectedDoctor.initials}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">{state.selectedDoctor.name}</h4>
                      <p className="text-[11px] text-slate-500">{state.selectedDoctor.specialty} · {state.selectedDoctor.hospital}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-slate-900 dark:text-white font-mono">${state.selectedDoctor.fee}</span>
                    <p className="text-[10px] text-slate-400">Consultation Fee</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 text-[11px] block">Date & Time</span>
                    <strong className="text-slate-800 dark:text-slate-200 font-mono">{state.date} at {state.timeSlot}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[11px] block">Mode</span>
                    <strong className="text-slate-800 dark:text-slate-200 capitalize">{state.type} Visit</strong>
                  </div>
                  <div className="col-span-2">
                    <span className="text-slate-400 text-[11px] block">Location</span>
                    <p className="text-slate-700 dark:text-slate-300 text-xs">
                      {state.type === 'telehealth' ? 'HealthConnect Secure Video Room' : state.selectedDoctor.location}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <span className="text-slate-400 text-[11px] block">Reason for Visit</span>
                    <p className="text-slate-700 dark:text-slate-300 text-xs italic">"{state.reason}"</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 7: Confirm Appointment */}
          {state.step === 7 && state.selectedDoctor && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Step 7: Confirm Appointment</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Slot verification and demo database reservation.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-blue-200 dark:border-blue-900 bg-blue-50/50 dark:bg-blue-950/30 text-xs text-blue-900 dark:text-blue-200 space-y-2">
                <div className="flex items-center gap-2 font-semibold">
                  <FileCheck2 className="w-4 h-4 text-blue-600" />
                  <span>Clinical Policy & Demo Information</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  This demo reservation is recorded to your local browser repository. Duplicate bookings for the same specialist at this time are blocked. You can reschedule or cancel anytime from your patient dashboard.
                </p>
              </div>
            </div>
          )}

          {/* STEP 8: Confirmation Receipt */}
          {state.step === 8 && state.confirmedAppointment && (
            <div className="space-y-5 text-center py-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Appointment Confirmed</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Appointment ID: <span className="font-mono font-semibold text-slate-700 dark:text-slate-300">{state.confirmedAppointment.id}</span>
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-left text-xs space-y-2 max-w-md mx-auto">
                <div className="flex justify-between">
                  <span className="text-slate-400">Doctor:</span>
                  <strong className="text-slate-800 dark:text-slate-200">{state.confirmedAppointment.doctorName}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Specialty:</span>
                  <span className="text-slate-700 dark:text-slate-300">{state.confirmedAppointment.doctorSpecialty}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Date & Time:</span>
                  <strong className="text-slate-800 dark:text-slate-200 font-mono">
                    {state.confirmedAppointment.date} · {state.confirmedAppointment.time}
                  </strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Type:</span>
                  <span className="text-slate-700 dark:text-slate-300 capitalize">{state.confirmedAppointment.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Location:</span>
                  <span className="text-slate-700 dark:text-slate-300 text-right">{state.confirmedAppointment.location}</span>
                </div>
              </div>

              <p className="text-[11px] text-slate-400 max-w-sm mx-auto">
                A calendar reminder and preparatory instructions have been added to your HealthConnect Patient Dashboard.
              </p>
            </div>
          )}

        </div>

        {/* Modal Footer Controls */}
        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-950/50">
          {state.step < 8 ? (
            <>
              {state.step > 1 ? (
                <button
                  onClick={prevStep}
                  className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
              ) : (
                <div />
              )}

              {state.step === 7 ? (
                <button
                  onClick={confirmBooking}
                  className="flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition-all"
                >
                  <span>Confirm & Schedule</span>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  onClick={nextStep}
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-all"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </>
          ) : (
            <div className="w-full flex items-center justify-end gap-3">
              <button
                onClick={closeBooking}
                className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              >
                Close
              </button>
              <button
                onClick={handleFinish}
                className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-all"
              >
                View in Dashboard →
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
