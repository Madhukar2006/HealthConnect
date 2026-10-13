import React, { useState } from 'react';
import { useRouter, Link } from '../context/RouterContext';
import { useBooking } from '../context/BookingContext';
import { StorageService } from '../lib/storage';
import { SPECIALTIES } from '../data/mockData';
import { 
  Activity, 
  Calendar, 
  ShieldCheck, 
  Video, 
  Search, 
  CheckCircle2, 
  ArrowRight, 
  Clock, 
  Star, 
  HelpCircle, 
  FileText,
  ChevronDown,
  Sparkles,
  Users,
  Building,
  Heart,
  Stethoscope
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { navigate } = useRouter();
  const { openBooking } = useBooking();
  const doctors = StorageService.getDoctors();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const featuredDoctors = doctors.slice(0, 3);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/doctors?search=${encodeURIComponent(searchQuery)}`);
  };

  const faqs = [
    {
      q: 'How does appointment booking work on HealthConnect?',
      a: 'Select a specialist by specialty, experience, or consultation fee. Choose an available calendar date and time slot, select either an in-person clinic visit or a telehealth video session, and confirm. Your visit is instantly registered with preparation instructions.'
    },
    {
      q: 'Is this demo connected to real healthcare clinics or doctors?',
      a: 'No. HealthConnect is a demonstrational healthcare software prototype. All doctor credentials, medical records, and scheduling operations run locally in your browser demo environment and do not transmit real clinical information.'
    },
    {
      q: 'Can I choose between telehealth and in-person clinic appointments?',
      a: 'Yes. Every participating specialist supports both physical visits at their designated hospital pavilion and encrypted telehealth consultations accessible directly through your patient dashboard.'
    },
    {
      q: 'How are patient medical records and prescriptions managed?',
      a: 'Your patient dashboard stores consultation summaries, lab panels, vaccination histories, and active prescription regimens. You can review detailed biomarker results, request demo refills, and add new simulated documents at any time.'
    }
  ];

  return (
    <div className="space-y-20 pb-20">
      
      {/* 1. Hero Section */}
      <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden border-b border-slate-200 dark:border-slate-800 bg-gradient-to-b from-blue-50/60 via-slate-50 to-white dark:from-slate-900/60 dark:via-slate-950 dark:to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Value Proposition */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/70 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/80 text-blue-700 dark:text-blue-300 text-xs font-semibold">
                <Activity className="w-3.5 h-3.5" />
                <span>Next-Generation Healthcare Coordination</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15]">
                Compassionate specialist care, seamlessly scheduled and managed.
              </h1>

              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                HealthConnect unites accredited physicians, transparent appointment scheduling, and your complete personal health record in a secure, patient-centered platform.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => openBooking()}
                  className="px-5 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 rounded-xl shadow-sm transition-all flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book an Appointment</span>
                </button>

                <Link
                  to="/doctors"
                  className="px-5 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-all flex items-center gap-2"
                >
                  <span>Explore Doctors</span>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </Link>

                <Link
                  to="/dashboard"
                  className="px-4 py-3 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1.5"
                >
                  <span>Patient Dashboard Demo →</span>
                </Link>
              </div>

              {/* Key Trust Signals */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-200 dark:border-slate-800 text-xs">
                <div>
                  <span className="font-bold text-slate-900 dark:text-white block font-mono text-base">25+</span>
                  <span className="text-slate-500 dark:text-slate-400">Clinical Specialties</span>
                </div>
                <div>
                  <span className="font-bold text-slate-900 dark:text-white block font-mono text-base">&lt; 2 min</span>
                  <span className="text-slate-500 dark:text-slate-400">Average Booking Time</span>
                </div>
                <div>
                  <span className="font-bold text-slate-900 dark:text-white block font-mono text-base">100%</span>
                  <span className="text-slate-500 dark:text-slate-400">Offline Demo Ready</span>
                </div>
              </div>

            </div>

            {/* Right Column: Hero Interactive Preview Card */}
            <div className="lg:col-span-5">
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-5">
                
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
                      SL
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-slate-900 dark:text-white">Dr. Sarah Lin, MD</h3>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">Cardiology Specialist · Next Available</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold font-mono text-emerald-600 dark:text-emerald-400">Today</span>
                </div>

                {/* Quick Consultation Booking Widget */}
                <div className="space-y-3">
                  <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Find care by specialty:
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {SPECIALTIES.slice(0, 4).map((spec) => (
                      <button
                        key={spec.id}
                        onClick={() => navigate(`/doctors?specialty=${encodeURIComponent(spec.name)}`)}
                        className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 text-left hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-950/30 transition-all"
                      >
                        <p className="font-semibold text-slate-900 dark:text-white text-xs">{spec.name}</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">{spec.doctorCount} doctors</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Upcoming Demo Visit</span>
                    <span className="text-[11px] font-mono font-semibold text-blue-600 dark:text-blue-400">Oct 22 · 10:30 AM</span>
                  </div>
                  <p className="text-xs font-medium text-slate-900 dark:text-white">
                    Annual Cardiovascular Checkup & Lipid Review
                  </p>
                  <div className="flex items-center gap-2 text-[11px] text-slate-500">
                    <Building className="w-3.5 h-3.5 text-slate-400" />
                    <span>Central Medical Pavilion</span>
                  </div>
                </div>

                <button
                  onClick={() => openBooking(doctors[0])}
                  className="w-full py-2.5 px-4 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors text-center"
                >
                  Book Instant Appointment with Dr. Lin
                </button>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Interactive Search & Doctor Finder */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 md:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="max-w-3xl mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Find the right physician for your health journey
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Search by clinical discipline, physician name, or schedule an urgent appointment slot.
            </p>
          </div>

          <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-3">
            <div className="md:col-span-5 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                placeholder="Doctor name, condition, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div className="md:col-span-4">
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="all">All Specialties</option>
                {SPECIALTIES.map((s) => (
                  <option key={s.id} value={s.name}>{s.name}</option>
                ))}
              </select>
            </div>

            <div className="md:col-span-3">
              <button
                type="submit"
                className="w-full py-2.5 px-4 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors flex items-center justify-center gap-1.5"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Search Doctors</span>
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* 3. Healthcare Services & Specialties */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Comprehensive Clinical Specialties
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Experienced physicians across key outpatient departments.
            </p>
          </div>
          <Link
            to="/services"
            className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
          >
            <span>View All Services</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SPECIALTIES.map((spec) => (
            <div
              key={spec.id}
              onClick={() => navigate(`/doctors?specialty=${encodeURIComponent(spec.name)}`)}
              className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-sm cursor-pointer transition-all space-y-2 group"
            >
              <div className="w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Stethoscope className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {spec.name}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {spec.description}
              </p>
              <div className="pt-2 flex items-center justify-between text-[11px] text-blue-600 dark:text-blue-400 font-semibold">
                <span>{spec.doctorCount} Doctors Available</span>
                <span>→</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. How the Platform Works */}
      <section className="bg-slate-100/70 dark:bg-slate-900/40 py-16 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              How HealthConnect Coordinates Your Care
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Three streamlined steps from doctor discovery to ongoing care management.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Step 1 */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-bold text-sm flex items-center justify-center font-mono">
                1
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Discover & Select a Doctor
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Filter accredited doctors by medical sub-specialty, consultation fees, patient reviews, and clinic locations.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-bold text-sm flex items-center justify-center font-mono">
                2
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Choose Mode & Reserve Slot
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Select between an in-person clinic consultation or an encrypted telehealth video call with immediate slot verification.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-bold text-sm flex items-center justify-center font-mono">
                3
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Access Records & Prescriptions
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Follow your care plan inside the Patient Dashboard. Review lab summaries, medication dosage instructions, and refill logs.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 5. Featured Sample Doctors */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Featured Clinical Specialists
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Sample profiles illustrating credentials, fees, and booking slots.
            </p>
          </div>
          <Link
            to="/doctors"
            className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
          >
            <span>View Full Directory</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredDoctors.map((doc) => (
            <div
              key={doc.id}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl ${doc.avatarColor} text-white font-bold text-base flex items-center justify-center shadow-sm`}>
                      {doc.initials}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">{doc.name}</h3>
                      <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">{doc.specialty}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-slate-900 dark:text-white font-mono">${doc.fee}</span>
                    <p className="text-[10px] text-slate-400">per consult</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{doc.rating}</span>
                  <span aria-hidden="true">·</span>
                  <span>{doc.reviewCount} reviews</span>
                  <span aria-hidden="true">·</span>
                  <span>{doc.experienceYears} yrs experience</span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                  {doc.bio}
                </p>

                <div className="text-[11px] text-slate-500 space-y-1">
                  <div className="flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{doc.hospital}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>Days: {doc.availableDays.join(', ')}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
                <Link
                  to={`/doctors/${doc.id}`}
                  className="flex-1 py-2 px-3 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-center transition-colors"
                >
                  View Profile
                </Link>
                <button
                  onClick={() => openBooking(doc)}
                  className="flex-1 py-2 px-3 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg text-center transition-colors"
                >
                  Book Slot
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Patient Experience Section (Illustrative Content clearly labelled) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-2xl bg-gradient-to-r from-blue-900 to-slate-900 text-white space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-bold tracking-wider uppercase text-blue-300">
                Illustrative Patient Journey (Demonstration Example)
              </span>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight mt-1">
                From Preventive Screening to Prescribed Care
              </h2>
            </div>
            <Link
              to="/dashboard"
              className="px-4 py-2 text-xs font-semibold bg-white text-slate-900 hover:bg-slate-100 rounded-lg transition-colors shrink-0"
            >
              Test Patient Dashboard →
            </Link>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
            In our demonstration patient workflow, Alex Rivera books a routine cardiology evaluation with Dr. Sarah Lin. Follow-up diagnostic lab tests (Comprehensive Metabolic Panel) and lipid management prescriptions are directly logged into the patient record, keeping medications and instructions organized in one place.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs">
            <div className="p-4 rounded-xl bg-white/10 border border-white/10 space-y-1">
              <span className="text-blue-300 font-mono text-[11px]">Workflow Phase 1</span>
              <p className="font-bold">Consultation Scheduled</p>
              <p className="text-[11px] text-slate-300">Fast 8-step booking with immediate confirmation.</p>
            </div>
            <div className="p-4 rounded-xl bg-white/10 border border-white/10 space-y-1">
              <span className="text-blue-300 font-mono text-[11px]">Workflow Phase 2</span>
              <p className="font-bold">Lab Results Finalized</p>
              <p className="text-[11px] text-slate-300">Test results compared against normal reference ranges.</p>
            </div>
            <div className="p-4 rounded-xl bg-white/10 border border-white/10 space-y-1">
              <span className="text-blue-300 font-mono text-[11px]">Workflow Phase 3</span>
              <p className="font-bold">Active Rx Management</p>
              <p className="text-[11px] text-slate-300">Refill requests tracked with timing instructions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Frequently Asked Questions */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Common questions regarding HealthConnect navigation and demonstration data.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full p-4 text-left flex items-center justify-between gap-4 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50"
                  aria-expanded={isOpen}
                >
                  <span className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white">
                    {faq.q}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/60">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
};
