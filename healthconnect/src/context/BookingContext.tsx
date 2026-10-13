import React, { createContext, useContext, useState } from 'react';
import { Doctor, Appointment, AppointmentType } from '../types';
import { StorageService } from '../lib/storage';
import { useAuth } from './AuthContext';
import { useToast } from './ToastContext';
import { useRouter } from './RouterContext';

export interface BookingState {
  step: number; // 1 to 8
  selectedDoctor: Doctor | null;
  date: string;
  timeSlot: string;
  type: AppointmentType;
  reason: string;
  notes: string;
  isConfirmed: boolean;
  confirmedAppointment: Appointment | null;
  validationError: string | null;
}

interface BookingContextType {
  state: BookingState;
  isOpen: boolean;
  openBooking: (initialDoctor?: Doctor) => void;
  closeBooking: () => void;
  setDoctor: (doctor: Doctor) => void;
  setDate: (date: string) => void;
  setTimeSlot: (slot: string) => void;
  setType: (type: AppointmentType) => void;
  setReason: (reason: string) => void;
  setNotes: (notes: string) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  confirmBooking: () => boolean;
  resetBooking: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

const INITIAL_STATE: BookingState = {
  step: 1,
  selectedDoctor: null,
  date: '',
  timeSlot: '',
  type: 'in-person',
  reason: '',
  notes: '',
  isConfirmed: false,
  confirmedAppointment: null,
  validationError: null,
};

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState<BookingState>(INITIAL_STATE);
  const { user } = useAuth();
  const { toast } = useToast();
  const { navigate } = useRouter();

  const openBooking = (initialDoctor?: Doctor) => {
    setState({
      ...INITIAL_STATE,
      selectedDoctor: initialDoctor || null,
      step: initialDoctor ? 2 : 1,
    });
    setIsOpen(true);
  };

  const closeBooking = () => {
    setIsOpen(false);
  };

  const setDoctor = (doctor: Doctor) => {
    setState(prev => ({
      ...prev,
      selectedDoctor: doctor,
      date: '',
      timeSlot: '',
      validationError: null,
    }));
  };

  const setDate = (date: string) => {
    setState(prev => ({ ...prev, date, timeSlot: '', validationError: null }));
  };

  const setTimeSlot = (timeSlot: string) => {
    setState(prev => ({ ...prev, timeSlot, validationError: null }));
  };

  const setType = (type: AppointmentType) => {
    setState(prev => ({ ...prev, type }));
  };

  const setReason = (reason: string) => {
    setState(prev => ({ ...prev, reason, validationError: null }));
  };

  const setNotes = (notes: string) => {
    setState(prev => ({ ...prev, notes }));
  };

  const nextStep = () => {
    setState(prev => {
      // Step validations
      if (prev.step === 1 && !prev.selectedDoctor) {
        return { ...prev, validationError: 'Please select a healthcare specialist to proceed.' };
      }
      if (prev.step === 2 && !prev.date) {
        return { ...prev, validationError: 'Please select a consultation date.' };
      }
      if (prev.step === 3 && !prev.timeSlot) {
        return { ...prev, validationError: 'Please choose an available appointment time slot.' };
      }
      if (prev.step === 5 && (!prev.reason || prev.reason.trim().length < 3)) {
        return { ...prev, validationError: 'Please provide a brief reason for your consultation.' };
      }

      return { ...prev, step: Math.min(prev.step + 1, 8), validationError: null };
    });
  };

  const prevStep = () => {
    setState(prev => ({
      ...prev,
      step: Math.max(prev.step - 1, 1),
      validationError: null
    }));
  };

  const goToStep = (step: number) => {
    setState(prev => ({ ...prev, step, validationError: null }));
  };

  const confirmBooking = (): boolean => {
    if (!state.selectedDoctor || !state.date || !state.timeSlot || !state.reason) {
      setState(prev => ({ ...prev, validationError: 'Missing booking details. Please review all steps.' }));
      return false;
    }

    // Check duplicate slot validation in demo storage
    const existing = StorageService.getAppointments();
    const isSlotTaken = existing.some(
      a =>
        a.doctorId === state.selectedDoctor?.id &&
        a.date === state.date &&
        a.time === state.timeSlot &&
        a.status === 'upcoming'
    );

    if (isSlotTaken) {
      setState(prev => ({
        ...prev,
        validationError: 'This appointment slot was recently reserved. Please select another time slot.'
      }));
      return false;
    }

    const newAppointment: Appointment = {
      id: `apt-${Date.now().toString().slice(-6)}`,
      doctorId: state.selectedDoctor.id,
      doctorName: state.selectedDoctor.name,
      doctorSpecialty: state.selectedDoctor.specialty,
      doctorAvatarColor: state.selectedDoctor.avatarColor,
      doctorInitials: state.selectedDoctor.initials,
      patientName: user?.name || 'Alex Rivera (Demo)',
      patientEmail: user?.email || 'alex.rivera.demo@healthconnect.internal',
      date: state.date,
      time: state.timeSlot,
      type: state.type,
      status: 'upcoming',
      reason: state.reason.trim(),
      notes: state.notes.trim() || undefined,
      location: state.type === 'telehealth' ? 'HealthConnect Secure Video Room' : state.selectedDoctor.location,
      clinicRoom: state.type === 'in-person' ? 'Consultation Suite' : undefined,
      telehealthUrl: state.type === 'telehealth' ? `https://healthconnect.demo/video/${Date.now()}` : undefined,
      createdAt: new Date().toISOString(),
    };

    StorageService.saveAppointment(newAppointment);

    setState(prev => ({
      ...prev,
      step: 8, // Success confirmation step
      isConfirmed: true,
      confirmedAppointment: newAppointment,
      validationError: null,
    }));

    toast('Appointment Confirmed!', `Scheduled with ${state.selectedDoctor.name} on ${state.date}`, 'success');
    return true;
  };

  const resetBooking = () => {
    setState(INITIAL_STATE);
    setIsOpen(false);
  };

  return (
    <BookingContext.Provider
      value={{
        state,
        isOpen,
        openBooking,
        closeBooking,
        setDoctor,
        setDate,
        setTimeSlot,
        setType,
        setReason,
        setNotes,
        nextStep,
        prevStep,
        goToStep,
        confirmBooking,
        resetBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) throw new Error('useBooking must be used within BookingProvider');
  return context;
};
