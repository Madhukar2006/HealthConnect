import React from 'react';
import { RouterProvider, useRouter } from './context/RouterContext';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { BookingProvider } from './context/BookingContext';

import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { BookingModal } from './components/appointments/BookingModal';

import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { DoctorsPage } from './pages/DoctorsPage';
import { DoctorDetailPage } from './pages/DoctorDetailPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { AuthPages } from './pages/AuthPages';

import { DashboardOverview } from './pages/dashboard/DashboardOverview';
import { AppointmentsPage } from './pages/dashboard/AppointmentsPage';
import { AppointmentDetailPage } from './pages/dashboard/AppointmentDetailPage';
import { MedicalRecordsPage } from './pages/dashboard/MedicalRecordsPage';
import { RecordDetailPage } from './pages/dashboard/RecordDetailPage';
import { PrescriptionsPage } from './pages/dashboard/PrescriptionsPage';
import { ProfilePage } from './pages/dashboard/ProfilePage';
import { NotificationsPage } from './pages/dashboard/NotificationsPage';

const AppContent: React.FC = () => {
  const { path } = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  // Helper route matching
  const isDashboardRoute = path.startsWith('/dashboard');

  // Match doctor profile: /doctors/:id
  const doctorDetailMatch = path.match(/^\/doctors\/([a-zA-Z0-9-]+)$/);
  // Match appointment detail: /dashboard/appointments/:id
  const appointmentDetailMatch = path.match(/^\/dashboard\/appointments\/([a-zA-Z0-9-]+)$/);
  // Match record detail: /dashboard/records/:id
  const recordDetailMatch = path.match(/^\/dashboard\/records\/([a-zA-Z0-9-]+)$/);

  // Protected route redirect check
  if (isDashboardRoute && !isAuthenticated && !isLoading) {
    return (
      <div className="min-h-screen flex flex-col justify-between bg-slate-50 dark:bg-slate-950">
        <Navbar />
        <div className="max-w-md mx-auto my-16 p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Protected Patient Area</h2>
          <p className="text-xs text-slate-500">Please sign in or use one-click demo login to view your patient dashboard.</p>
          <AuthPages mode="login" />
        </div>
        <Footer />
      </div>
    );
  }

  // Dashboard views
  if (isDashboardRoute) {
    if (appointmentDetailMatch) {
      return (
        <DashboardLayout activeTab="appointments" title="Appointment Details">
          <AppointmentDetailPage appointmentId={appointmentDetailMatch[1]} />
          <BookingModal />
        </DashboardLayout>
      );
    }

    if (recordDetailMatch) {
      return (
        <DashboardLayout activeTab="records" title="Medical Document Summary">
          <RecordDetailPage recordId={recordDetailMatch[1]} />
          <BookingModal />
        </DashboardLayout>
      );
    }

    if (path === '/dashboard/appointments') {
      return (
        <DashboardLayout 
          activeTab="appointments" 
          title="Clinical Consultations" 
          subtitle="Manage your scheduled telehealth sessions and in-person hospital visits."
        >
          <AppointmentsPage />
          <BookingModal />
        </DashboardLayout>
      );
    }

    if (path === '/dashboard/records') {
      return (
        <DashboardLayout 
          activeTab="records" 
          title="Personal Health Records" 
          subtitle="Review diagnostic laboratory reports, consultation summaries, and vaccination histories."
        >
          <MedicalRecordsPage />
          <BookingModal />
        </DashboardLayout>
      );
    }

    if (path === '/dashboard/prescriptions') {
      return (
        <DashboardLayout 
          activeTab="prescriptions" 
          title="Prescription Regimen" 
          subtitle="Review active dosages, medication frequencies, and submit refill requests."
        >
          <PrescriptionsPage />
          <BookingModal />
        </DashboardLayout>
      );
    }

    if (path === '/dashboard/profile') {
      return (
        <DashboardLayout 
          activeTab="profile" 
          title="Patient Profile & Settings" 
          subtitle="Update demographic details, emergency contacts, and notifications."
        >
          <ProfilePage />
          <BookingModal />
        </DashboardLayout>
      );
    }

    if (path === '/dashboard/notifications') {
      return (
        <DashboardLayout 
          activeTab="notifications" 
          title="Patient Alerts & Notifications" 
          subtitle="Reminders for upcoming visits, newly released lab results, and pharmacy refills."
        >
          <NotificationsPage />
          <BookingModal />
        </DashboardLayout>
      );
    }

    // Default /dashboard Overview
    return (
      <DashboardLayout activeTab="overview">
        <DashboardOverview />
        <BookingModal />
      </DashboardLayout>
    );
  }

  // Public views
  let content: React.ReactNode = null;

  if (doctorDetailMatch) {
    content = <DoctorDetailPage doctorId={doctorDetailMatch[1]} />;
  } else if (path === '/about') {
    content = <AboutPage />;
  } else if (path === '/services') {
    content = <ServicesPage />;
  } else if (path === '/doctors') {
    content = <DoctorsPage />;
  } else if (path === '/contact') {
    content = <ContactPage />;
  } else if (path === '/privacy') {
    content = <PrivacyPage />;
  } else if (path === '/terms') {
    content = <TermsPage />;
  } else if (path === '/login') {
    content = <AuthPages mode="login" />;
  } else if (path === '/register') {
    content = <AuthPages mode="register" />;
  } else if (path === '/forgot-password') {
    content = <AuthPages mode="forgot-password" />;
  } else {
    // Default home view
    content = <HomePage />;
  }

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 dark:bg-slate-950 transition-colors">
      <Navbar />
      <main className="flex-1">
        {content}
      </main>
      <Footer />
      <BookingModal />
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <RouterProvider>
          <AuthProvider>
            <BookingProvider>
              <AppContent />
            </BookingProvider>
          </AuthProvider>
        </RouterProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
