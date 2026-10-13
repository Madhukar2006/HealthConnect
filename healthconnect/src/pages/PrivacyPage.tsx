import React from 'react';
import { ShieldCheck, Lock, Eye, FileText } from 'lucide-react';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
      
      <div className="space-y-2 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-semibold text-[11px]">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Patient Privacy Statement</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
          HealthConnect Privacy Policy
        </h1>
        <p className="text-xs text-slate-400">
          Last revised: October 2026 · Demonstrational Platform Governance
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="text-sm font-bold text-slate-900 dark:text-white">1. Scope and Purpose</h2>
        <p>
          HealthConnect is built to showcase a privacy-conscious, patient-first web application. In this local demonstration deployment, all personal health information (PHI), appointments, and simulated laboratory tests are stored exclusively inside your browser's local sandbox storage (`localStorage`). No clinical data is sent to external advertising networks or unverified third parties.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-bold text-slate-900 dark:text-white">2. Data We Collect and Retain</h2>
        <p>
          When you use HealthConnect in demo mode, the following data points may be stored in your browser session:
        </p>
        <ul className="list-disc list-inside space-y-1 pl-2">
          <li><strong>Patient Demographic Data:</strong> Simulated names, email addresses, contact numbers, and emergency contact details.</li>
          <li><strong>Scheduling Records:</strong> Chosen consultation dates, time slots, appointment modes (telehealth/in-person), and reported symptom notes.</li>
          <li><strong>Simulated Health Records:</strong> Mock lab reports (such as lipid profiles), consultation notes, and prescription schedules.</li>
          <li><strong>Interface Preferences:</strong> Theme selection (light or dark mode) and notification settings.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-bold text-slate-900 dark:text-white">3. Local Storage and Data Eradication</h2>
        <p>
          You retain complete ownership over your demonstration data. Clicking the <strong>"Reset Demo Data"</strong> button in either the footer or patient dashboard immediately wipes all modified records and reinstates default baseline samples. You may also clear your browser's storage at any time to remove all traces.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-bold text-slate-900 dark:text-white">4. Production Cloud Integrations (Supabase & PostgreSQL)</h2>
        <p>
          For production instances connected to Supabase or PostgreSQL databases, access is strictly governed by cryptographic Row-Level Security (RLS) policies. Under these rules, only authenticated users matching the unique patient identifier (`auth.uid() = patient_id`) may read or write consultation records.
        </p>
      </section>

      <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 space-y-1">
        <p className="font-semibold text-slate-700 dark:text-slate-300">Regulatory Disclaimer:</p>
        <p>
          HealthConnect is a demonstrational software prototype. In a live healthcare operating environment, deployment would require compliance auditing under the Health Insurance Portability and Accountability Act (HIPAA), GDPR, or local regional healthcare privacy regulations.
        </p>
      </div>

    </div>
  );
};
