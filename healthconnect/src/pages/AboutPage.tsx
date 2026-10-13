import React from 'react';
import { Link } from '../context/RouterContext';
import { Activity, ShieldCheck, Heart, Award, Users, Stethoscope } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Page Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-semibold">
          <Activity className="w-3.5 h-3.5" />
          <span>Our Clinical Mission</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Restoring clarity and empathy to patient care navigation.
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          HealthConnect was founded on a simple principle: patients should have transparent, friction-free access to specialist medical advice and full ownership of their health journey.
        </p>
      </div>

      {/* Core Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <Heart className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Patient Agency First</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Every patient deserves direct, plain-language summaries of lab results, actionable medication schedules, and transparent clinical notes without bureaucracy.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Uncompromised Privacy</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Engineered with strict Row-Level Security principles and end-to-end data segregation so clinical conversations remain strictly between doctor and patient.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Verified Clinical Standards</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Every specialist credential, hospital affiliation, and consultation protocol is evaluated against accredited medical board standards.
          </p>
        </div>
      </div>

      {/* Demonstration Notice Box */}
      <div className="p-6 rounded-2xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2 text-xs text-slate-600 dark:text-slate-400">
        <h4 className="font-bold text-slate-900 dark:text-white text-sm">Demonstration & Evaluation Architecture</h4>
        <p className="leading-relaxed">
          HealthConnect represents a production-calibrated frontend architecture with local persistence for demonstration purposes. While this platform simulates patient records, appointment scheduling, and doctor profiles, it is not licensed to provide real clinical diagnoses or emergency care.
        </p>
      </div>

      {/* CTA Strip */}
      <div className="text-center pt-4">
        <Link
          to="/doctors"
          className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm transition-all"
        >
          <span>Meet Our Clinical Specialists</span>
          <Stethoscope className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
};
