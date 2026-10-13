import React from 'react';
import { useRouter, Link } from '../context/RouterContext';
import { useBooking } from '../context/BookingContext';
import { StorageService } from '../lib/storage';
import { 
  ArrowLeft, 
  Star, 
  MapPin, 
  Calendar, 
  Clock, 
  GraduationCap, 
  Languages, 
  Building2, 
  ShieldCheck, 
  DollarSign,
  CalendarCheck
} from 'lucide-react';

export const DoctorDetailPage: React.FC<{ doctorId: string }> = ({ doctorId }) => {
  const { navigate } = useRouter();
  const { openBooking } = useBooking();
  const doctor = StorageService.getDoctorById(doctorId);

  if (!doctor) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Doctor Profile Not Found</h2>
        <p className="text-xs text-slate-500">The physician profile you requested could not be located in our demo registry.</p>
        <Link
          to="/doctors"
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Doctor Directory</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Back Link */}
      <Link
        to="/doctors"
        className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Specialist Directory</span>
      </Link>

      {/* Main Profile Header Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
          
          <div className="flex items-start gap-5">
            <div className={`w-20 h-20 rounded-2xl ${doctor.avatarColor} text-white font-bold text-2xl flex items-center justify-center shadow-md shrink-0`}>
              {doctor.initials}
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  {doctor.name}
                </h1>
                <span title="Board Certified">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                </span>
              </div>
              <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                {doctor.title} · {doctor.specialty}
              </p>
              
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400 pt-1">
                <div className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <strong className="text-slate-800 dark:text-slate-200">{doctor.rating}</strong>
                  <span>({doctor.reviewCount} verified reviews)</span>
                </div>
                <span>·</span>
                <span>{doctor.experienceYears} Years Clinical Experience</span>
              </div>
            </div>
          </div>

          {/* Fee & Booking CTA */}
          <div className="sm:text-right shrink-0 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-3">
            <div>
              <span className="text-xs text-slate-400 block">Consultation Fee</span>
              <span className="text-2xl font-bold text-slate-900 dark:text-white font-mono">${doctor.fee}</span>
              <span className="text-[10px] text-slate-400 block">Covers in-person or telehealth visit</span>
            </div>
            <button
              onClick={() => openBooking(doctor)}
              className="w-full py-2.5 px-4 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Book Appointment</span>
            </button>
          </div>

        </div>

        {/* Doctor Clinical Biography */}
        <div className="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
            Clinical Biography & Focus
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {doctor.bio}
          </p>
        </div>

        {/* Credentials & Location Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs">
          
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center gap-2 font-semibold text-slate-800 dark:text-slate-200">
              <GraduationCap className="w-4 h-4 text-blue-600" />
              <span>Education & Credentials</span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
              {doctor.education}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center gap-2 font-semibold text-slate-800 dark:text-slate-200">
              <Languages className="w-4 h-4 text-emerald-600" />
              <span>Languages Spoken</span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-[11px]">
              {doctor.languages.join(', ')}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center gap-2 font-semibold text-slate-800 dark:text-slate-200">
              <Building2 className="w-4 h-4 text-purple-600" />
              <span>Hospital Affiliation</span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-[11px]">
              {doctor.hospital}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center gap-2 font-semibold text-slate-800 dark:text-slate-200">
              <MapPin className="w-4 h-4 text-red-500" />
              <span>Clinic Location</span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-[11px]">
              {doctor.location}
            </p>
          </div>

        </div>

        {/* Available Hours */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
            Available Consultation Days & Slots
          </h2>
          <div className="flex flex-wrap gap-2 text-xs">
            {doctor.timeSlots.map((slot) => (
              <span 
                key={slot}
                className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono text-[11px] border border-slate-200 dark:border-slate-700"
              >
                {slot}
              </span>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
