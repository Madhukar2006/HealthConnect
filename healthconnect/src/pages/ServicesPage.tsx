import React from 'react';
import { useRouter } from '../context/RouterContext';
import { useBooking } from '../context/BookingContext';
import { SPECIALTIES } from '../data/mockData';
import { StorageService } from '../lib/storage';
import { 
  Heart, 
  Brain, 
  Baby, 
  Sparkles, 
  Activity, 
  Bone, 
  Stethoscope, 
  Scale, 
  Smile, 
  ArrowRight,
  CalendarCheck
} from 'lucide-react';

export const ServicesPage: React.FC = () => {
  const { navigate } = useRouter();
  const { openBooking } = useBooking();
  const doctors = StorageService.getDoctors();

  const getServiceIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case 'cardiology': return Heart;
      case 'neurology': return Brain;
      case 'pediatrics': return Baby;
      case 'dermatology': return Sparkles;
      case 'orthopedics': return Bone;
      case 'psychiatry & behavioral health': return Smile;
      default: return Stethoscope;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
          Clinical Departments
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Comprehensive Outpatient Healthcare Services
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          From preventive wellness exams to specialized chronic illness monitoring, explore accredited clinical disciplines available for direct scheduling.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SPECIALTIES.map((spec) => {
          const Icon = getServiceIcon(spec.name);
          const specialtyDoctors = doctors.filter(d => d.specialty.toLowerCase() === spec.name.toLowerCase());
          const firstDoctor = specialtyDoctors[0];

          return (
            <div
              key={spec.id}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {spec.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    {spec.description}
                  </p>
                </div>

                <div className="text-xs text-slate-600 dark:text-slate-400 space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <p className="font-semibold text-slate-800 dark:text-slate-200 text-[11px] uppercase tracking-wider">
                    Common Consultation Focus:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-[11px] text-slate-500 dark:text-slate-400">
                    <li>Routine diagnostic evaluations</li>
                    <li>Prescription management & lab review</li>
                    <li>Telehealth video and in-person sessions</li>
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
                <button
                  onClick={() => navigate(`/doctors?specialty=${encodeURIComponent(spec.name)}`)}
                  className="flex-1 py-2 px-3 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-center transition-colors"
                >
                  View Specialists
                </button>
                <button
                  onClick={() => openBooking(firstDoctor)}
                  className="py-2 px-3 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg text-center transition-colors flex items-center gap-1.5"
                >
                  <CalendarCheck className="w-3.5 h-3.5" />
                  <span>Book</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
