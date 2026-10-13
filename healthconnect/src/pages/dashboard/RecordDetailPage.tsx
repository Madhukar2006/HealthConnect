import React from 'react';
import { useRouter, Link } from '../../context/RouterContext';
import { StorageService } from '../../lib/storage';
import { useToast } from '../../context/ToastContext';
import { 
  ArrowLeft, 
  FileText, 
  Calendar, 
  User, 
  Download, 
  Printer, 
  ShieldCheck, 
  Activity,
  AlertCircle
} from 'lucide-react';

export const RecordDetailPage: React.FC<{ recordId: string }> = ({ recordId }) => {
  const { toast } = useToast();
  const record = StorageService.getRecordById(recordId);

  if (!record) {
    return (
      <div className="p-12 text-center rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
        <AlertCircle className="w-8 h-8 text-slate-400 mx-auto" />
        <h3 className="text-sm font-bold text-slate-900 dark:text-white">Document Not Found</h3>
        <p className="text-xs text-slate-500">The medical record ID requested was not found in your health record repository.</p>
        <Link
          to="/dashboard/records"
          className="inline-block px-4 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg"
        >
          Return to Medical Records
        </Link>
      </div>
    );
  }

  const handleSimulateDownload = () => {
    toast('PDF Export Simulated', `Generated encrypted document copy for ${record.title}.`, 'info');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Back Link */}
      <Link
        to="/dashboard/records"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Medical Records</span>
      </Link>

      {/* Main Document Inspection Container */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        
        {/* Document Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-300 capitalize">
                {record.category.replace('_', ' ')}
              </span>
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verified Diagnostic Summary</span>
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              {record.title}
            </h1>
            <p className="text-xs text-slate-500">
              Document ID: <span className="font-mono">{record.id}</span> · File Size: {record.fileSize}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleSimulateDownload}
              className="py-2 px-3 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>
            <button
              onClick={() => window.print()}
              className="py-2 px-3 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>
          </div>
        </div>

        {/* Clinician and Date Metadata */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="text-[11px] text-slate-400 uppercase font-semibold">Attending Physician</span>
            <p className="font-bold text-slate-900 dark:text-white text-sm">{record.doctorName}</p>
            <p className="text-slate-500">{record.doctorSpecialty}</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="text-[11px] text-slate-400 uppercase font-semibold">Diagnostic Date</span>
            <p className="font-mono font-bold text-slate-900 dark:text-white text-sm">{record.date}</p>
            <p className="text-slate-500">Status: Final Diagnostic Release</p>
          </div>
        </div>

        {/* Clinical Summary & Findings */}
        <div className="space-y-2 pt-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
            Clinical Summary & Observations
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed p-4 rounded-xl bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-800">
            {record.summary}
          </p>
        </div>

        {/* Clinical Diagnosis if available */}
        {record.diagnosis && (
          <div className="space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Primary Diagnostic Assessment
            </h2>
            <p className="text-xs text-slate-700 dark:text-slate-200 p-3 rounded-xl bg-blue-50/60 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 font-medium">
              {record.diagnosis}
            </p>
          </div>
        )}

        {/* Lab Results Biomarker Table (if available) */}
        {record.labResults && record.labResults.length > 0 && (
          <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Measured Laboratory Biomarkers & Reference Ranges
            </h2>
            
            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="py-2.5 px-4">Test Name</th>
                    <th className="py-2.5 px-4">Measured Value</th>
                    <th className="py-2.5 px-4">Normal Reference Range</th>
                    <th className="py-2.5 px-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {record.labResults.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-semibold text-slate-800 dark:text-slate-200">{item.test}</td>
                      <td className="py-3 px-4 font-mono font-bold text-slate-900 dark:text-white">{item.result}</td>
                      <td className="py-3 px-4 font-mono text-slate-500 dark:text-slate-400">{item.normalRange}</td>
                      <td className="py-3 px-4 text-right">
                        <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
                          {item.status.toUpperCase()}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Demo Disclaimer */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 italic">
          * This medical report represents sample clinical documentation created for demonstration purposes only.
        </div>

      </div>

    </div>
  );
};
