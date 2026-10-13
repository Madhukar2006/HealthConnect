# HealthConnect — Modern Healthcare Web Platform

HealthConnect is a comprehensive, responsive, accessible healthcare web application designed to connect patients with accredited medical specialists, streamline outpatient appointment scheduling, and provide a single hub for personal health records, laboratory reports, and active prescriptions.

> **Demonstration Notice:** HealthConnect is an architectural software prototype. In default mode, it operates with local persistence (`localStorage`) and simulated clinical data. No genuine patient records or medical advice are stored or transmitted.

---

## Key Features

1. **Specialist Discovery & Doctor Directory**
   - Live query search by clinician name, medical specialty, and clinic hospital affiliation.
   - Comprehensive filtering by medical sub-specialty, availability days, and consultation fee sorting.
   - Detailed physician profiles with board credentials, education, languages spoken, and clinic address.

2. **8-Step Interactive Appointment Scheduling**
   - Step 1: Doctor selection
   - Step 2: Available date picker with day-of-week validation
   - Step 3: Time slot selection
   - Step 4: Consultation mode (In-person clinic visit vs. Encrypted telehealth HD video)
   - Step 5: Clinical reason for visit & symptom notes
   - Step 6: Review booking summary with fee details
   - Step 7: Confirmation & duplicate slot prevention in local persistence layer
   - Step 8: Confirmation receipt with direct dashboard synchronization

3. **Protected Patient Dashboard**
   - **Overview:** Patient greeting, upcoming appointment countdown, quick clinical actions, recent lab results, and active prescriptions.
   - **Appointments (`/dashboard/appointments`):** Filter by status (Upcoming, Completed, Cancelled), cancellation dialog with reason capture, and detail inspection (`/dashboard/appointments/:id`).
   - **Medical Records (`/dashboard/records`):** Categorized documents (Consultation summaries, Lab reports, Vaccinations, Imaging), biomarker test breakdown tables with normal range comparisons, "Add Demo Record" modal, and print/download simulation.
   - **Prescriptions (`/dashboard/prescriptions`):** Active dosage regimens, frequency instructions, prescribing doctors, refill countdown, and "Request Refill" action.
   - **Profile & Preferences (`/dashboard/profile`):** Patient demographics, blood group, emergency contact details, light/dark theme preference, notification toggles, and "Reset Demo Data" action.
   - **Notifications (`/dashboard/notifications`):** Appointment confirmations, laboratory release alerts, and mark-as-read controls.

4. **Public Information & Trust Pages**
   - Landing page (`/`) with clinical value proposition, how it works, and FAQ accordion.
   - Mission and clinical advisory overview (`/about`).
   - Clinical outpatient services breakdown (`/services`).
   - Support and care coordination form with client-side validation (`/contact`).
   - Transparent privacy policy (`/privacy`) and terms of use (`/terms`).

5. **Design & Accessibility**
   - Strict adherence to the Universal Frontend Design Constitution (anti-AI slop rules).
   - Zero-pill metadata discipline (unboxed metadata with clean `·` dividers).
   - Single-row 3-zone Top Bar Contract.
   - Light theme baseline (`#F8FAFC` canvas, `#2563EB` primary, `#0F172A` navy, white cards) with fully styled dark mode toggle.
   - Responsive layouts across mobile, tablet, and 1440px desktop viewports.

---

## Screens & Routes

| Route | View Description | Access |
|---|---|---|
| `/` | Landing page with hero, specialties, workflow, and FAQ | Public |
| `/about` | Clinical mission, ethics, and platform governance | Public |
| `/services` | Comprehensive clinical outpatient departments | Public |
| `/doctors` | Specialist directory with search, filters, and sort | Public |
| `/doctors/:id` | Doctor profile with credentials, clinic map, and booking | Public |
| `/contact` | Validated care coordination inquiry form | Public |
| `/privacy` | Patient privacy and demonstration data policy | Public |
| `/terms` | Terms of service and medical disclaimer | Public |
| `/login` | Account login with 1-click Demo quick access | Public |
| `/register` | Patient registration with validation | Public |
| `/forgot-password` | Password recovery workflow simulation | Public |
| `/dashboard` | Patient portal overview with metrics and next appointment | Protected (Demo Active) |
| `/dashboard/appointments` | Appointment management with status filters | Protected (Demo Active) |
| `/dashboard/appointments/:id` | Appointment details and telehealth link | Protected (Demo Active) |
| `/dashboard/records` | Medical records, lab panels, and demo document creation | Protected (Demo Active) |
| `/dashboard/records/:id` | Detailed diagnostic summary & biomarker reference table | Protected (Demo Active) |
| `/dashboard/prescriptions` | Medication schedule and refill request simulator | Protected (Demo Active) |
| `/dashboard/profile` | Editable patient profile and visual preferences | Protected (Demo Active) |
| `/dashboard/notifications` | Care alerts tray with mark-as-read and clear actions | Protected (Demo Active) |

---

## Technology Stack

- **Framework:** React 19 SPA with Vite
- **Language:** TypeScript with strict type definitions (`src/types/index.ts`)
- **Styling:** Tailwind CSS v4 with custom dark mode class support
- **Icons:** Lucide React (`lucide-react`)
- **Typography:** Plus Jakarta Sans & JetBrains Mono (tabular numerals)
- **Data Architecture:** Seeded LocalStorage repository (`src/lib/storage.ts`) with custom reactive event dispatching
- **Database Architecture Bridge:** Supabase PostgreSQL schema with Row-Level Security (`src/lib/supabase.ts`)

---

## Local Setup & Development

### 1. Prerequisites
- Node.js 20 or higher
- npm or bun

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/Madhukar2006/HealthConnect.git
cd HealthConnect

# Install dependencies
npm install
```

### 3. Running the Development Server
```bash
# Starts Vite development server at http://localhost:3000
npm run dev
```

### 4. Running Verification Commands
```bash
# Type check and lint validation
npm run lint

# Production build verification
npm run build
```

---

## Environment Variables

Copy `.env.example` to create your local environment:
```bash
cp .env.example .env.local
```

| Variable | Description | Default |
|---|---|---|
| `VITE_SUPABASE_URL` | Optional Supabase project URL | `""` (Runs in Demo Mode) |
| `VITE_SUPABASE_ANON_KEY` | Optional Supabase anon public key | `""` (Runs in Demo Mode) |

*Note: If Supabase credentials are not provided, HealthConnect operates autonomously in Local Demo Mode.*

---

## Supabase PostgreSQL Integration Guide

To migrate from local browser storage to a live Supabase PostgreSQL backend:
1. Create a project at [supabase.com](https://supabase.com).
2. Open the **SQL Editor** in your Supabase dashboard.
3. Paste and execute the schema provided in `src/lib/supabase.ts` (or the SQL block below).
4. Add your `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to `.env.local`.

---

## Testing & Quality Assurance

- **Static Analysis:** Strict TypeScript compiler pass (`npm run lint`).
- **Responsive Tests:** Verified on mobile devices (375px), tablets (768px), and desktop viewports (1440px).
- **Persistence Verification:** LocalStorage syncs across view changes and supports a 1-click **Reset Demo Data** action.

---

## Known Limitations

- **Simulated Video:** Telehealth links provide a simulated clinical launch sequence rather than establishing live WebRTC video channels.
- **Demo Mode Storage:** Changes are stored locally in the browser's `localStorage` and are not synchronized across multiple different physical devices without Supabase configuration.

---

## License & Contribution

Distributed under the Apache-2.0 License. Contributions adhering to accessibility guidelines and medical ethics are welcomed.
