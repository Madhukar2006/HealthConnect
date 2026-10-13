import React, { useState, useEffect } from 'react';
import { StorageService } from '../../lib/storage';
import { useToast } from '../../context/ToastContext';
import { Prescription } from '../../types';
import { 
  Pill, 
  Calendar, 
  Clock, 
  User, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle, 
  ShieldAlert,
  Info
} from 'lucide-react';

export const PrescriptionsPage: React.FC = () => {
  const { toast } = useToast();
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [selectedRx, setSelectedRx] = useState<Prescription | null>(null);

  const loadData = () => {
    setPrescriptions(StorageService.getPrescriptions());
  };

  useEffect(() => {
    loadData();
    const handleUpdate = () => loadData();
    window.addEventListener('healthconnect:storage-updated', handleUpdate);
    return () => window.removeEventListener('healthconnect:storage-updated', handleUpdate);
  }, []);

  const filtered = prescriptions.filter(p => {
    if (statusFilter === 'all') return true;
    return p.status === statusFilter;
  });

  const handleRequestRefill = (id: string, name: string) => {
    const success = StorageService.requestRefill(id);
    if (success) {
      toast('Refill Requested', `Order sent to your pharmacy for ${name}.`, 'success');
      loadData();
    } else {
      toast('Refill Unavailable', 'No remaining refills authorized for this prescription.', 'error');
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        {/* Status Filter */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl">
          {(['all', 'active', 'completed'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setStatusFilter(tab)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg capitalize transition-colors ${
                statusFilter === tab
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {tab === 'all' ? 'All Prescriptions' : `${tab} Prescriptions`}
            </button>
          ))}
        </div>

        {/* Clinical Disclaimer */}
        <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-blue-600 shrink-0" />
          <span>Demo prescription tracker · Not real pharmacological advice.</span>
        </div>

      </div>

      {/* Prescriptions Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((rx) => {
            const isActive = rx.status === 'active';

            return (
              <div
                key={rx.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-4 hover:border-slate-300 dark:hover:border-slate-700 transition-all"
              >
                <div className="space-y-3">
                  
                  {/* Top Bar */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl ${isActive ? 'bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'} flex items-center justify-center font-bold`}>
                        <Pill className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                          {rx.medicationName}
                        </h3>
                        <p className="text-[11px] text-slate-500 font-mono">
                          {rx.genericName} · {rx.dosage}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`px-2 py-0.5 text-[10px] font-bold rounded-full capitalize ${
                        isActive
                          ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                      }`}
                    >
                      {rx.status}
                    </span>
                  </div>

                  {/* Dosage & Frequency */}
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-1.5 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Frequency:</span>
                      <strong className="text-slate-800 dark:text-slate-200">{rx.frequency}</strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Duration:</span>
                      <span className="text-slate-700 dark:text-slate-300">{rx.duration}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Refills Remaining:</span>
                      <span className="font-mono font-bold text-slate-900 dark:text-white">{rx.refillsLeft}</span>
                    </div>
                  </div>

                  {/* Instructions */}
                  <div className="space-y-1 text-xs">
                    <span className="text-[11px] font-semibold text-slate-400 uppercase">Directions</span>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-[11px]">
                      {rx.instructions}
                    </p>
                  </div>

                  {/* Prescriber & Dates */}
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                    <span>Prescribed by {rx.prescribingDoctor}</span>
                    <span className="font-mono">Issued {rx.issueDate}</span>
                  </div>

                </div>

                {/* Bottom Actions */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
                  <button
                    onClick={() => setSelectedRx(rx)}
                    className="flex-1 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors text-center"
                  >
                    View Details
                  </button>

                  {isActive && (
                    <button
                      disabled={rx.refillsLeft <= 0}
                      onClick={() => handleRequestRefill(rx.id, rx.medicationName)}
                      className={`py-1.5 px-3 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                        rx.refillsLeft > 0
                          ? 'text-white bg-blue-600 hover:bg-blue-700'
                          : 'opacity-50 bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      <RefreshCw className="w-3 h-3" />
                      <span>Request Refill</span>
                    </button>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-12 text-center rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
          <Pill className="w-8 h-8 text-slate-300 mx-auto" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">No Prescriptions Found</h3>
          <p className="text-xs text-slate-500">No prescriptions matching this filter status are currently on file.</p>
        </div>
      )}

      {/* Prescription Detail Modal */}
      {selectedRx && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-5">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {selectedRx.medicationName} ({selectedRx.dosage})
                </h3>
                <p className="text-xs text-slate-400 font-mono">Generic: {selectedRx.genericName}</p>
              </div>
              <button
                onClick={() => setSelectedRx(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
                <span className="text-[11px] text-slate-400 font-semibold uppercase">Prescriber</span>
                <p className="font-bold text-slate-900 dark:text-white">{selectedRx.prescribingDoctor}</p>
                <p className="text-slate-500">{selectedRx.doctorSpecialty}</p>
              </div>

              <div className="space-y-1">
                <span className="text-[11px] text-slate-400 font-semibold uppercase">Schedule & Dosage</span>
                <p className="text-slate-800 dark:text-slate-200 leading-relaxed">{selectedRx.instructions}</p>
              </div>

              {selectedRx.sideEffectsNotes && (
                <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 text-amber-900 dark:text-amber-200 space-y-1">
                  <span className="text-[11px] font-bold">Clinical Advisory Note:</span>
                  <p className="text-[11px]">{selectedRx.sideEffectsNotes}</p>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => setSelectedRx(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900"
              >
                Close
              </button>
              {selectedRx.status === 'active' && selectedRx.refillsLeft > 0 && (
                <button
                  onClick={() => {
                    handleRequestRefill(selectedRx.id, selectedRx.medicationName);
                    setSelectedRx(null);
                  }}
                  className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
                >
                  Request Refill
                </button>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
