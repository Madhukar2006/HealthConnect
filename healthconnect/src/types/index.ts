export interface Doctor {
  id: string;
  name: string;
  title: string;
  specialty: string;
  experienceYears: number;
  rating: number;
  reviewCount: number;
  fee: number;
  availableDays: string[];
  timeSlots: string[];
  location: string;
  hospital: string;
  bio: string;
  languages: string[];
  education: string;
  avatarColor: string;
  initials: string;
}

export type AppointmentType = 'in-person' | 'telehealth';
export type AppointmentStatus = 'upcoming' | 'completed' | 'cancelled';

export interface Appointment {
  id: string;
  doctorId: string;
  doctorName: string;
  doctorSpecialty: string;
  doctorAvatarColor: string;
  doctorInitials: string;
  patientName: string;
  patientEmail: string;
  date: string; // YYYY-MM-DD
  time: string; // e.g. "09:30 AM"
  type: AppointmentType;
  status: AppointmentStatus;
  reason: string;
  notes?: string;
  location: string;
  clinicRoom?: string;
  telehealthUrl?: string;
  createdAt: string;
  cancellationReason?: string;
}

export type RecordCategory = 'consultation' | 'lab_report' | 'vaccination' | 'imaging';

export interface LabResultItem {
  test: string;
  result: string;
  normalRange: string;
  status: 'normal' | 'abnormal';
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  title: string;
  category: RecordCategory;
  doctorName: string;
  doctorSpecialty: string;
  date: string;
  summary: string;
  diagnosis?: string;
  labResults?: LabResultItem[];
  fileSize: string;
  status: 'final' | 'pending';
}

export interface Prescription {
  id: string;
  medicationName: string;
  genericName: string;
  dosage: string;
  frequency: string;
  duration: string;
  prescribingDoctor: string;
  doctorSpecialty: string;
  issueDate: string;
  expiryDate: string;
  refillsLeft: number;
  status: 'active' | 'completed';
  instructions: string;
  sideEffectsNotes?: string;
}

export interface EmergencyContact {
  name: string;
  relation: string;
  phone: string;
}

export interface PatientProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  bloodGroup: string;
  emergencyContact: EmergencyContact;
  allergies: string[];
  chronicConditions: string[];
  theme: 'light' | 'dark';
  emailNotifications: boolean;
  smsNotifications: boolean;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  date: string;
  type: 'appointment' | 'record' | 'prescription' | 'system';
  read: boolean;
  actionUrl?: string;
}

export interface Specialty {
  id: string;
  name: string;
  description: string;
  doctorCount: number;
}
