import React, { useState, useEffect } from 'react';
import { useRouter, Link } from '../../context/RouterContext';
import { StorageService } from '../../lib/storage';
import { useToast } from '../../context/ToastContext';
import { MedicalRecord, RecordCategory } from '../../types';
import { 
  FileText, 
  Search, 
  PlusCircle, 
  Filter, 
  Trash2, 
  Calendar, 
  User, 
  ArrowRight, 
  AlertCircle,
  FileCheck2,
  X,
  ShieldAlert,
  Activity
} from 'lucide-react';

export const MedicalRecordsPage: React.FC = () => {
  const { navigate } = useRouter();
  const { toast } = useToast();

  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | RecordCategory>('all');
  const [addModalOpen, setAddModalOpen] = useState(false);

  // New record form state
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<RecordCategory>('consultation');
  const [newDoctor, setNewDoctor] = useState('Dr. Priya Patel, MD');
  const [newSummary, setNewSummary] = useState('');
  const [newDate, setNewDate] = useState(() => new Date().toISOString().split('T')[0]);

  const loadData = () => {
    setRecords(StorageService.getRecords());
  };

  useEffect(() => {
    loadData();
    const handleUpdate = () => loadData();
    window.addEventListener('healthconnect:storage-updated', handleUpdate);
    return () => window.removeEventListener('healthconnect:storage-updated', handleUpdate);
  }, []);

  const filteredRecords = records.filter((rec) => {
    const matchesSearch = 
      rec.title.toLowerCase().includes(search.toLowerCase()) ||
      rec.doctorName.toLowerCase().includes(search.toLowerCase()) ||
      rec.summary.toLowerCase().includes(search.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || rec.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleDeleteRecord = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Delete this demo record from your local storage?')) {
      StorageService.deleteRecord(id);
      loadData();
      toast('Record Removed', 'Demo document was deleted from local storage.', 'info');
    }
  };

  const handleAddRecord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newSummary.trim()) {
      alert('Please provide title and clinical summary.');
      return;
    }

    const createdRecord: MedicalRecord = {
      id: `rec-${Date.now().toString().slice(-5)}`,
      patientId: 'patient-demo-01',
      title: newTitle.trim(),
      category: newCategory,
      doctorName: newDoctor,
      doctorSpecialty: 'General Medicine',
      date: newDate,
      summary: newSummary.trim(),
      fileSize: '180 KB (Simulated PDF)',
      status: 'final'
    };

    StorageService.addRecord(createdRecord);
    setAddModalOpen(false);
    setNewTitle('');
    setNewSummary('');
    loadData();
    toast('Medical Record Added', 'Document added to your health records list.', 'success');
  };

  return (
    <div className="space-y-6">
      
      {/* Controls & Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        {/* Category Pills (Segmented control) */}
        <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl">
          {(['all', 'consultation', 'lab_report', 'vaccination', 'imaging'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg capitalize transition-colors ${
                categoryFilter === cat
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {cat === 'all' ? 'All Records' : cat.replace('_', ' ')}
            </button>
          ))}
        </div>

        <button
          onClick={() => setAddModalOpen(true)}
          className="py-2.5 px-4 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm transition-colors flex items-center justify-center gap-2 shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add Demo Record</span>
        </button>

      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
        <input
          type="text"
          placeholder="Search records by title, doctor, or test summary..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      {/* Records Grid */}
      {filteredRecords.length > 0 ? (
        <div className="grid gap-4">
          {filteredRecords.map((rec) => (
            <div
              key={rec.id}
              onClick={() => navigate(`/dashboard/records/${rec.id}`)}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-blue-500 dark:hover:border-blue-400 cursor-pointer transition-all"
            >
              <div className="space-y-1.5 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white hover:text-blue-600 transition-colors">
                    {rec.title}
                  </h3>
                  <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 capitalize">
                    {rec.category.replace('_', ' ')}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <span>{rec.doctorName}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono">{rec.date}</span>
                  <span aria-hidden="true">·</span>
                  <span>{rec.fileSize}</span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-1">
                  {rec.summary}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100 dark:border-slate-800">
                <Link
                  to={`/dashboard/records/${rec.id}`}
                  onClick={(e) => e?.stopPropagation()}
                  className="py-1.5 px-3 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
                >
                  Inspect Report
                </Link>
                <button
                  onClick={(e) => handleDeleteRecord(rec.id, e)}
                  className="p-2 text-slate-400 hover:text-red-600 transition-colors rounded-lg"
                  title="Delete demo record"
                  aria-label="Delete demo record"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-12 text-center rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
          <FileText className="w-8 h-8 text-slate-300 mx-auto" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">No Medical Records Found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            No health documents matching your current filter criteria were found.
          </p>
          <button
            onClick={() => setAddModalOpen(true)}
            className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Add Demo Document
          </button>
        </div>
      )}

      {/* Add Demo Record Modal */}
      {addModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-150">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Add Simulated Medical Record
              </h3>
              <button
                onClick={() => setAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddRecord} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Document Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Annual Blood Chemistry Panel or Cardiology Note"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  required
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as RecordCategory)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    <option value="consultation">Consultation Summary</option>
                    <option value="lab_report">Lab Report</option>
                    <option value="vaccination">Vaccination Record</option>
                    <option value="imaging">Imaging & Radiology</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Record Date
                  </label>
                  <input
                    type="date"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    required
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Attending Clinician / Facility
                </label>
                <input
                  type="text"
                  value={newDoctor}
                  onChange={(e) => setNewDoctor(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Clinical Summary & Observations <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={3}
                  placeholder="Summary of findings, biomarker values, or consultation notes..."
                  value={newSummary}
                  onChange={(e) => setNewSummary(e.target.value)}
                  required
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setAddModalOpen(false)}
                  className="px-3 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm"
                >
                  Save Record
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
