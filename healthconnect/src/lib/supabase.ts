/**
 * Supabase Integration Bridge & Architecture Helper
 * 
 * HealthConnect operates in Demo Mode by default with local persistence.
 * When production Supabase credentials (VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY)
 * are provided in .env.local, the application can switch from LocalStorage to Supabase PostgreSQL.
 */

export interface SupabaseConfigState {
  isConfigured: boolean;
  supabaseUrl: string | null;
  hasAnonKey: boolean;
}

export function getSupabaseConfig(): SupabaseConfigState {
  const url = import.meta.env.VITE_SUPABASE_URL || null;
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY || null;

  return {
    isConfigured: Boolean(url && key && url !== 'https://your-project.supabase.co'),
    supabaseUrl: url,
    hasAnonKey: Boolean(key)
  };
}

export const SUPABASE_SQL_SCHEMA = `-- HealthConnect Production Schema for Supabase / PostgreSQL
-- Generated for HIPAA-compatible Row Level Security (RLS) and patient privacy

-- 1. Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  date_of_birth DATE,
  gender TEXT,
  blood_group TEXT,
  emergency_contact JSONB,
  allergies TEXT[] DEFAULT '{}',
  chronic_conditions TEXT[] DEFAULT '{}',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Doctors Table
CREATE TABLE IF NOT EXISTS public.doctors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  specialty TEXT NOT NULL,
  experience_years INT NOT NULL,
  rating NUMERIC(2, 1) DEFAULT 5.0,
  review_count INT DEFAULT 0,
  fee NUMERIC(10, 2) NOT NULL,
  available_days TEXT[] NOT NULL,
  time_slots TEXT[] NOT NULL,
  location TEXT NOT NULL,
  hospital TEXT NOT NULL,
  bio TEXT NOT NULL,
  languages TEXT[] NOT NULL,
  education TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Appointments Table
CREATE TABLE IF NOT EXISTS public.appointments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  doctor_id UUID REFERENCES public.doctors(id) ON DELETE RESTRICT NOT NULL,
  appointment_date DATE NOT NULL,
  appointment_time TEXT NOT NULL,
  type TEXT CHECK (type IN ('in-person', 'telehealth')) NOT NULL,
  status TEXT CHECK (status IN ('upcoming', 'completed', 'cancelled')) DEFAULT 'upcoming' NOT NULL,
  reason TEXT NOT NULL,
  notes TEXT,
  cancellation_reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  CONSTRAINT unique_doctor_slot UNIQUE (doctor_id, appointment_date, appointment_time)
);

-- 4. Medical Records Table
CREATE TABLE IF NOT EXISTS public.medical_records (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  category TEXT CHECK (category IN ('consultation', 'lab_report', 'vaccination', 'imaging')) NOT NULL,
  doctor_name TEXT NOT NULL,
  record_date DATE NOT NULL,
  summary TEXT NOT NULL,
  diagnosis TEXT,
  lab_results JSONB,
  status TEXT DEFAULT 'final' NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Prescriptions Table
CREATE TABLE IF NOT EXISTS public.prescriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  medication_name TEXT NOT NULL,
  generic_name TEXT NOT NULL,
  dosage TEXT NOT NULL,
  frequency TEXT NOT NULL,
  duration TEXT NOT NULL,
  prescribing_doctor TEXT NOT NULL,
  issue_date DATE NOT NULL,
  expiry_date DATE NOT NULL,
  refills_left INT DEFAULT 0 NOT NULL,
  status TEXT CHECK (status IN ('active', 'completed')) DEFAULT 'active' NOT NULL,
  instructions TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medical_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prescriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.doctors ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Authenticated patients only access their own records
CREATE POLICY "Users can view and update their own profile" 
  ON public.profiles FOR ALL 
  USING (auth.uid() = id);

CREATE POLICY "Users can access their own appointments" 
  ON public.appointments FOR ALL 
  USING (auth.uid() = patient_id);

CREATE POLICY "Users can access their own medical records" 
  ON public.medical_records FOR ALL 
  USING (auth.uid() = patient_id);

CREATE POLICY "Users can access their own prescriptions" 
  ON public.prescriptions FOR ALL 
  USING (auth.uid() = patient_id);

CREATE POLICY "Public read for doctor directory" 
  ON public.doctors FOR SELECT 
  TO authenticated, anon 
  USING (true);
`;
