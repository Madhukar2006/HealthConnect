import React from 'react';
import { FileText, AlertTriangle } from 'lucide-react';

export const TermsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
      
      <div className="space-y-2 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-[11px]">
          <FileText className="w-3.5 h-3.5" />
          <span>Terms of Service</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
          HealthConnect Terms of Use
        </h1>
        <p className="text-xs text-slate-400">
          Last revised: October 2026 · Software Prototype Agreement
        </p>
      </div>

      <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 text-amber-900 dark:text-amber-200 flex items-start gap-3">
        <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-semibold">Medical Practice Disclaimer:</p>
          <p className="text-[11px] leading-relaxed">
            HealthConnect does not offer licensed medical advice, diagnosis, or treatment. All physician listings, consultations, and medical records are simulated. For acute medical emergencies, dial 911 immediately.
          </p>
        </div>
      </div>

      <section className="space-y-3">
        <h2 className="text-sm font-bold text-slate-900 dark:text-white">1. Acceptance of Terms</h2>
        <p>
          By interacting with the HealthConnect web application, you acknowledge and agree that this software is provided on an "as-is" and "as-available" basis for technical evaluation and architectural demonstration purposes.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-bold text-slate-900 dark:text-white">2. Permitted Use</h2>
        <p>
          You are permitted to interact with the interactive appointment scheduler, simulate profile adjustments, review test laboratory values, and test local session state transitions. You agree not to upload genuine sensitive patient data, social security numbers, or payment card details.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-bold text-slate-900 dark:text-white">3. Intellectual Property and Open Source Conventions</h2>
        <p>
          The interface components, styling patterns, and application logic are crafted according to modern engineering standards. Third-party libraries (Lucide React, Tailwind CSS) remain the property of their respective copyright holders.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-bold text-slate-900 dark:text-white">4. Limitation of Liability</h2>
        <p>
          Under no circumstances shall HealthConnect, its contributors, or demonstration creators be held liable for any direct or indirect damages resulting from reliance on the simulated medical advice or records displayed within this software.
        </p>
      </section>

    </div>
  );
};
