import React, { useState, useMemo } from 'react';
import { useRouter, Link } from '../context/RouterContext';
import { useBooking } from '../context/BookingContext';
import { StorageService } from '../lib/storage';
import { SPECIALTIES } from '../data/mockData';
import { 
  Search, 
  Filter, 
  Star, 
  MapPin, 
  Clock, 
  Calendar, 
  Building, 
  ArrowUpDown, 
  X,
  Stethoscope,
  Info
} from 'lucide-react';

export const DoctorsPage: React.FC = () => {
  const { searchParams, navigate } = useRouter();
  const { openBooking } = useBooking();
  const doctors = StorageService.getDoctors();

  const initialSearch = searchParams.get('search') || '';
  const initialSpecialty = searchParams.get('specialty') || 'all';

  const [search, setSearch] = useState(initialSearch);
  const [specialtyFilter, setSpecialtyFilter] = useState(initialSpecialty);
  const [dayFilter, setDayFilter] = useState('all');
  const [sortBy, setSortBy] = useState<'rating' | 'fee_asc' | 'fee_desc' | 'experience'>('rating');

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const filteredDoctors = useMemo(() => {
    return doctors
      .filter((doc) => {
        const matchesSearch = 
          doc.name.toLowerCase().includes(search.toLowerCase()) ||
          doc.specialty.toLowerCase().includes(search.toLowerCase()) ||
          doc.hospital.toLowerCase().includes(search.toLowerCase());

        const matchesSpecialty = 
          specialtyFilter === 'all' || 
          doc.specialty.toLowerCase() === specialtyFilter.toLowerCase();

        const matchesDay = 
          dayFilter === 'all' || 
          doc.availableDays.includes(dayFilter);

        return matchesSearch && matchesSpecialty && matchesDay;
      })
      .sort((a, b) => {
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'fee_asc') return a.fee - b.fee;
        if (sortBy === 'fee_desc') return b.fee - a.fee;
        if (sortBy === 'experience') return b.experienceYears - a.experienceYears;
        return 0;
      });
  }, [doctors, search, specialtyFilter, dayFilter, sortBy]);

  const handleResetFilters = () => {
    setSearch('');
    setSpecialtyFilter('all');
    setDayFilter('all');
    setSortBy('rating');
  };

  const hasActiveFilters = search || specialtyFilter !== 'all' || dayFilter !== 'all';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Specialist Directory
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
            Find & Schedule With Accredited Physicians
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Sample physician directory with transparent consultation rates and verified schedules.
          </p>
        </div>

        {/* Demo Disclaimer notice */}
        <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300 max-w-sm">
          <Info className="w-4 h-4 text-blue-600 shrink-0" />
          <span className="text-[11px] leading-tight">
            Profiles illustrate verified clinical scheduling mechanics in local demonstration mode.
          </span>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          
          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search by name, specialty, or clinic..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* Specialty Filter */}
          <div>
            <select
              value={specialtyFilter}
              onChange={(e) => setSpecialtyFilter(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="all">All Specialties</option>
              {SPECIALTIES.map((s) => (
                <option key={s.id} value={s.name}>{s.name}</option>
              ))}
            </select>
          </div>

          {/* Availability Day Filter */}
          <div>
            <select
              value={dayFilter}
              onChange={(e) => setDayFilter(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="all">Any Day Available</option>
              {daysOfWeek.map((d) => (
                <option key={d} value={d}>Available on {d}</option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="rating">Highest Rated</option>
              <option value="fee_asc">Consultation Fee: Low to High</option>
              <option value="fee_desc">Consultation Fee: High to Low</option>
              <option value="experience">Most Experienced</option>
            </select>
          </div>

        </div>

        {hasActiveFilters && (
          <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
            <span className="text-slate-500">
              Showing {filteredDoctors.length} {filteredDoctors.length === 1 ? 'physician' : 'physicians'}
            </span>
            <button
              onClick={handleResetFilters}
              className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          </div>
        )}
      </div>

      {/* Doctors List */}
      {filteredDoctors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doc) => (
            <div
              key={doc.id}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow"
            >
              <div className="space-y-4">
                
                {/* Doctor Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl ${doc.avatarColor} text-white font-bold text-base flex items-center justify-center shadow-sm shrink-0`}>
                      {doc.initials}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                        <Link to={`/doctors/${doc.id}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                          {doc.name}
                        </Link>
                      </h3>
                      <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">{doc.specialty}</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs font-bold text-slate-900 dark:text-white font-mono">${doc.fee}</span>
                    <p className="text-[10px] text-slate-400">per consult</p>
                  </div>
                </div>

                {/* Rating & Experience Clean Unboxed Metadata */}
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500 shrink-0" />
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{doc.rating}</span>
                  <span aria-hidden="true">·</span>
                  <span>{doc.reviewCount} reviews</span>
                  <span aria-hidden="true">·</span>
                  <span>{doc.experienceYears} yrs experience</span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {doc.bio}
                </p>

                {/* Hospital and Location */}
                <div className="text-[11px] text-slate-500 dark:text-slate-400 space-y-1">
                  <div className="flex items-center gap-1.5 truncate">
                    <Building className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{doc.hospital}</span>
                  </div>
                  <div className="flex items-center gap-1.5 truncate">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{doc.location}</span>
                  </div>
                </div>

                {/* Available Days */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>Available: {doc.availableDays.join(', ')}</span>
                </div>

              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
                <Link
                  to={`/doctors/${doc.id}`}
                  className="flex-1 py-2 px-3 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-center transition-colors"
                >
                  View Details
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
      ) : (
        /* Empty State */
        <div className="p-12 text-center rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
            <Search className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">No Physicians Found</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
              We couldn't find any doctors matching your current search criteria. Try clearing your filters or searching for another specialty.
            </p>
          </div>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 rounded-lg hover:bg-blue-100"
          >
            Clear All Filters
          </button>
        </div>
      )}

    </div>
  );
};
