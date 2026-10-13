import { Doctor, Appointment, MedicalRecord, Prescription, PatientProfile, NotificationItem } from '../types';
import { 
  INITIAL_DOCTORS, 
  INITIAL_APPOINTMENTS, 
  INITIAL_RECORDS, 
  INITIAL_PRESCRIPTIONS, 
  INITIAL_PATIENT_PROFILE, 
  INITIAL_NOTIFICATIONS 
} from '../data/mockData';

const KEYS = {
  DOCTORS: 'healthconnect_doctors_v1',
  APPOINTMENTS: 'healthconnect_appointments_v1',
  RECORDS: 'healthconnect_records_v1',
  PRESCRIPTIONS: 'healthconnect_prescriptions_v1',
  PROFILE: 'healthconnect_profile_v1',
  NOTIFICATIONS: 'healthconnect_notifications_v1',
  SESSION: 'healthconnect_session_v1',
};

function safeGet<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const item = localStorage.getItem(key);
    if (!item) {
      localStorage.setItem(key, JSON.stringify(fallback));
      return fallback;
    }
    return JSON.parse(item) as T;
  } catch (err) {
    console.warn(`[HealthConnect Storage] Error reading ${key}:`, err);
    return fallback;
  }
}

function safeSet<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new CustomEvent('healthconnect:storage-updated', { detail: { key } }));
  } catch (err) {
    console.error(`[HealthConnect Storage] Error writing ${key}:`, err);
  }
}

export const StorageService = {
  // Doctors
  getDoctors(): Doctor[] {
    return safeGet<Doctor[]>(KEYS.DOCTORS, INITIAL_DOCTORS);
  },
  getDoctorById(id: string): Doctor | undefined {
    return this.getDoctors().find(d => d.id === id);
  },

  // Appointments
  getAppointments(): Appointment[] {
    return safeGet<Appointment[]>(KEYS.APPOINTMENTS, INITIAL_APPOINTMENTS);
  },
  getAppointmentById(id: string): Appointment | undefined {
    return this.getAppointments().find(a => a.id === id);
  },
  saveAppointment(appointment: Appointment): void {
    const appointments = this.getAppointments();
    const existingIndex = appointments.findIndex(a => a.id === appointment.id);
    if (existingIndex >= 0) {
      appointments[existingIndex] = appointment;
    } else {
      appointments.unshift(appointment);
    }
    safeSet(KEYS.APPOINTMENTS, appointments);

    // Also trigger notification
    this.addNotification({
      id: `notif-${Date.now()}`,
      title: 'Appointment Scheduled',
      message: `Confirmed with ${appointment.doctorName} on ${appointment.date} at ${appointment.time}.`,
      date: 'Just now',
      type: 'appointment',
      read: false,
      actionUrl: `/dashboard/appointments/${appointment.id}`
    });
  },
  cancelAppointment(id: string, reason: string): boolean {
    const appointments = this.getAppointments();
    const apt = appointments.find(a => a.id === id);
    if (!apt) return false;
    apt.status = 'cancelled';
    apt.cancellationReason = reason;
    safeSet(KEYS.APPOINTMENTS, appointments);

    this.addNotification({
      id: `notif-${Date.now()}`,
      title: 'Appointment Cancelled',
      message: `Your visit with ${apt.doctorName} on ${apt.date} was cancelled.`,
      date: 'Just now',
      type: 'appointment',
      read: false,
      actionUrl: `/dashboard/appointments`
    });
    return true;
  },

  // Medical Records
  getRecords(): MedicalRecord[] {
    return safeGet<MedicalRecord[]>(KEYS.RECORDS, INITIAL_RECORDS);
  },
  getRecordById(id: string): MedicalRecord | undefined {
    return this.getRecords().find(r => r.id === id);
  },
  addRecord(record: MedicalRecord): void {
    const records = this.getRecords();
    records.unshift(record);
    safeSet(KEYS.RECORDS, records);

    this.addNotification({
      id: `notif-${Date.now()}`,
      title: 'New Medical Document Added',
      message: `${record.title} added to your health records.`,
      date: 'Just now',
      type: 'record',
      read: false,
      actionUrl: `/dashboard/records/${record.id}`
    });
  },
  deleteRecord(id: string): boolean {
    const records = this.getRecords();
    const filtered = records.filter(r => r.id !== id);
    if (filtered.length !== records.length) {
      safeSet(KEYS.RECORDS, filtered);
      return true;
    }
    return false;
  },

  // Prescriptions
  getPrescriptions(): Prescription[] {
    return safeGet<Prescription[]>(KEYS.PRESCRIPTIONS, INITIAL_PRESCRIPTIONS);
  },
  requestRefill(id: string): boolean {
    const list = this.getPrescriptions();
    const rx = list.find(r => r.id === id);
    if (!rx || rx.refillsLeft <= 0) return false;
    rx.refillsLeft -= 1;
    safeSet(KEYS.PRESCRIPTIONS, list);

    this.addNotification({
      id: `notif-${Date.now()}`,
      title: 'Refill Request Submitted',
      message: `Demo refill request sent for ${rx.medicationName}. Remaining refills: ${rx.refillsLeft}.`,
      date: 'Just now',
      type: 'prescription',
      read: false,
      actionUrl: `/dashboard/prescriptions`
    });
    return true;
  },

  // Patient Profile
  getProfile(): PatientProfile {
    return safeGet<PatientProfile>(KEYS.PROFILE, INITIAL_PATIENT_PROFILE);
  },
  saveProfile(profile: PatientProfile): void {
    safeSet(KEYS.PROFILE, profile);
  },

  // Notifications
  getNotifications(): NotificationItem[] {
    return safeGet<NotificationItem[]>(KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
  },
  addNotification(item: NotificationItem): void {
    const list = this.getNotifications();
    list.unshift(item);
    safeSet(KEYS.NOTIFICATIONS, list);
  },
  markNotificationRead(id: string): void {
    const list = this.getNotifications();
    const target = list.find(n => n.id === id);
    if (target) {
      target.read = true;
      safeSet(KEYS.NOTIFICATIONS, list);
    }
  },
  markAllNotificationsRead(): void {
    const list = this.getNotifications().map(n => ({ ...n, read: true }));
    safeSet(KEYS.NOTIFICATIONS, list);
  },
  clearNotifications(): void {
    safeSet(KEYS.NOTIFICATIONS, []);
  },

  // Reset Everything to Default Demo Baseline
  resetDemoData(): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(KEYS.DOCTORS, JSON.stringify(INITIAL_DOCTORS));
    localStorage.setItem(KEYS.APPOINTMENTS, JSON.stringify(INITIAL_APPOINTMENTS));
    localStorage.setItem(KEYS.RECORDS, JSON.stringify(INITIAL_RECORDS));
    localStorage.setItem(KEYS.PRESCRIPTIONS, JSON.stringify(INITIAL_PRESCRIPTIONS));
    localStorage.setItem(KEYS.PROFILE, JSON.stringify(INITIAL_PATIENT_PROFILE));
    localStorage.setItem(KEYS.NOTIFICATIONS, JSON.stringify(INITIAL_NOTIFICATIONS));
    window.dispatchEvent(new CustomEvent('healthconnect:storage-updated', { detail: { key: 'ALL' } }));
  }
};
