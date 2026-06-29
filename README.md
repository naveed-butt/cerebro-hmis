# Handoff: MedTrack — Doctor Patient Management System

## Overview
MedTrack is a web-based practice management system for solo/small-group doctors. It covers five core areas: patient listing, individual patient profiles (with visit history, diagnoses, prescriptions, notes, and lab results), appointment scheduling, billing & revenue, and prescription tracking. It also includes a patient intake/registration flow with fees & billing configuration.

## About the Design Files
The file `MedTrack Dashboard.dc.html` in this bundle is a **high-fidelity interactive HTML prototype** — not production code. It demonstrates the intended look, layout, interactions, and navigation flows. Your task is to **recreate this UI in a React codebase** using the component patterns, routing, and state management of your choice (recommendations below). Do not ship the HTML file directly.

## Fidelity
**High-fidelity.** Colors, typography, spacing, border radii, hover states, dark mode, transitions, and copy are all final. Recreate pixel-accurately.

---

## Recommended Tech Stack
| Concern | Recommendation |
|---|---|
| Framework | React 18 + Vite |
| Routing | React Router v6 |
| State | Zustand (lightweight, no boilerplate) |
| Styling | Tailwind CSS v3 (maps cleanly to the utility classes used) |
| Components | shadcn/ui for base primitives |
| Charts | Recharts (bar + line charts in Billing screen) |
| Icons | Lucide React |
| Forms | React Hook Form + Zod |
| File upload | react-dropzone |

---

## Screens / Views

### 1. Dashboard (`/patients`)
**Purpose:** Daily overview — patient list at a glance, quick stats, navigate to any patient.

**Layout:**
- Full-height page: fixed topnav (60px) + scrollable content area
- Content max-width: 1160px, centered, padding 28px
- Header row: greeting text (left) + subtitle
- Stats row: 2-column grid, gap 16px, below header
- Patient table: full-width card, rounded-10px, border `#ede8df`

**Stats cards (×2):**
- Background `#fff`, border `1px solid #ede8df`, border-radius 10px, padding 20px 22px
- Stat number: 28px, weight 700, color `#1c1208`
- Label: 12px, weight 500, color `#a8a29e`
- Sub-label (delta): 11px, color `#15803d`
- Values: "47 / Total Patients", "4 / Today's Appointments"

**Patient table toolbar:**
- Search input (max-width 260px): border `1.5px solid #e8dfd0`, radius 7px, padding 8px 12px 8px 34px, bg `#fafaf7`, placeholder "Search patients…", search icon absolutely positioned left 11px
- Filter buttons: border `1.5px solid #e8dfd0`, radius 7px, 13px, color `#78716c`
- "+ Add Patient" CTA: bg `#d97706`, white text, weight 600, radius 7px, margin-left auto

**Table columns:** Patient (avatar + name + ID) | Age · Sex | Condition badge | Last Visit | Next Appt | Status dot+label | Arrow icon
- Column widths (fr): 2.5 / 0.6 / 1 / 1 / 1 / 1 / 36px
- Header row bg: `#fafaf7`, text 11px uppercase, weight 600, color `#a8a29e`, letter-spacing 0.5px
- Row padding: 0 20px; cell padding: 13px 0
- Row hover: bg `#fef9f2`, cursor pointer
- Row border-bottom: `1px solid #f8f5f0`
- Arrow button: 28×28px circle, border `1.5px solid #e8dfd0`, color `#a8a29e`; on row hover → bg `#fef3c7`, border `#d97706`, color `#92400e`

**Patient avatars:**
- 34×34px circle, initials (12px, weight 700, white)
- Colors per patient: MS `#d97706`, JO `#0891b2`, PM `#7c3aed`, KA `#059669`, AR `#db2777`, LV `#64748b`

**Condition badges:**
- `badge b-am`: bg `#fef3c7`, color `#92400e` — HTN, Hypertension
- `badge b-bl`: bg `#dbeafe`, color `#1e40af` — Diabetes
- `badge b-pu`: bg `#ede9fe`, color `#5b21b6` — Asthma
- `badge b-gr`: bg `#dcfce7`, color `#15803d` — New Patient
- `badge b-pk`: bg `#fce7f3`, color `#9d174d` — Thyroid
- All badges: padding 2px 10px, radius 20px, font-size 12px, weight 600

**Status dots:**
- Active: dot `#15803d`, text `#15803d`
- Refill Due: dot `#dc2626`, text `#dc2626`
- New: dot `#0891b2`, text `#0891b2`

**Pagination footer:** padding 13px 20px, border-top `#f0ebe0`, "Showing 6 of 47 patients" left; page buttons right (active: bg `#d97706`, white)

---

### 2. Patient Profile (`/patients/:id`)
**Purpose:** Full patient record — demographics, visit history, diagnoses, prescriptions, notes, lab results.

**Layout:**
- Back link "← All Patients" (13px, color `#a8a29e`, hover `#d97706`)
- Hero card: flex row, gap 20px, bg `#fff`, border `1px solid #ede8df`, radius 10px, padding 22px 24px
- Stats row: 4-column grid, gap 12px
- Tab bar + tab content

**Hero card:**
- Avatar: 62×62px circle (same color scheme as list)
- Name: 22px, weight 700
- Meta row: 13px, color `#78716c`, flex wrap, gap 16px — Sex · Age, DOB, Phone, Insurance, ID
- Actions right: "Edit Info" (outlined) + "+ Visit Note" (amber filled)

**Stats cards (×4):** bg `#fffdf9`, border `#ede8df`, radius 8px, padding 14px 16px
- Number: 20px, weight 700, color `#d97706`
- Label: 11px, color `#a8a29e`, weight 500
- Values: Total Visits, Last Visit date, Next Appointment date, Total Billed

**Tab bar:** border-bottom `2px solid #f0e8da`; tabs: padding 10px 18px, 14px, weight 500, color `#78716c`; active: color `#d97706`, border-bottom `2px solid #d97706`, weight 600
- Tabs: History | Diagnoses | Prescriptions | Notes | Labs

**History tab — visit cards:**
- Card: bg `#fff`, border `1px solid #ede8df`, radius 8px, padding 16px 20px, flex row, gap 16px
- Date: day 18px weight 700, month 10px uppercase color `#a8a29e`
- Visit type: 14px weight 600
- Notes: 13px, color `#78716c`, line-height 1.6
- Badge: bg `#fef3c7`, color `#92400e`, radius 20px, 11px weight 600, margin-top 8px

**Diagnoses tab:**
- Each row: bg `#fff`, border `#ede8df`, radius 8px, padding 14px 18px, flex between
- Label 14px weight 600 + ICD-10 code 12px color `#a8a29e`
- Severity badge (same badge system)
- Add row: dashed border `#e8dfd0`, bg `#fafaf7`

**Labs tab:**
- Upload zone: border `2px dashed #e8dfd0`, radius 10px, padding 36px 24px, text center, bg `#fffdf9`; hover: border `#d97706`, bg `#fef9f2`
- Use `react-dropzone` for drag-and-drop
- File list: cards with icon (38×38 radius 8 bg `#fef3c7`), name 14px weight 600, meta 12px color `#a8a29e`, "Preview →" button
- Preview modal: fixed overlay bg `rgba(0,0,0,0.45)`, modal 580px wide, radius 12px, padding 28px
  - Results table: 4 columns — Test / Result / Reference Range / Flag
  - Flag colors: High `#dc2626`, Low `#0891b2`, Normal `#15803d`
  - Warning panel: bg `#fef3c7`, radius 8px, color `#92400e`

---

### 3. Appointments (`/appointments`)
**Purpose:** Weekly agenda view, see and manage all appointments.

**Layout:**
- Header: title + subtitle left, "+ Schedule" CTA right
- Week strip: 7-day horizontal row, today highlighted amber
- Agenda list of appointment cards

**Week strip:** bg `#fff`, border `#ede8df`, radius 10px, padding 14px 16px, flex, gap 6px
- Each day: flex:1, text-center, padding 10px 4px, radius 8px
- Day name: 10px uppercase, color `#a8a29e`
- Day number: 18px weight 700
- Today: bg `#d97706`, day name rgba(255,255,255,0.75), day number white

**Appointment cards:** bg `#fff`, border `1px solid #ede8df`, radius 8px, padding 14px 18px, flex row, gap 14px
- Time: 14px weight 700, color `#d97706`, min-width 64px
- Divider: 1px wide, 34px tall, bg `#f0e8da`
- Patient name: 14px weight 600
- Type + duration: 12px color `#a8a29e`
- Status badge (right)
- Cancelled: opacity 0.38
- Hover: border-color `#d97706`

---

### 4. Billing & Revenue (`/billing`)
**Purpose:** Financial overview — YTD totals, monthly bar chart, recent transactions.

**Layout:**
- 3-column stats grid
- Bar chart card
- Transactions table card

**Bar chart:** SVG or Recharts BarChart; months Jan–Jun on x-axis, amber bars (`#d97706`) with decreasing opacity for older months; value labels above bars; current month label in amber weight 600

**Transactions table:**
- Columns: Patient | Service | Date | Amount | Status
- Column widths (fr): 1.4 / 1.2 / 0.8 / 0.7 / 0.8
- Header row: bg `#fafaf7`, 11px uppercase, color `#a8a29e`
- Row padding: 13px 20px; border-top `#f8f5f0`

---

### 5. Prescriptions (`/prescriptions`)
**Purpose:** All active prescriptions across patients, refill alerts.

**Layout:**
- Alert banner (red, when refills = 0)
- Search/filter toolbar
- Prescription cards list

**Alert banner:** bg `#fee2e2`, border `#fca5a5`, radius 8px, padding 12px 16px, 13px, color `#dc2626`, weight 500, flex + gap 10px

**Prescription cards:** bg `#fff`, border `#ede8df`, radius 10px, padding 18px 20px, flex between
- Drug name: 16px weight 700 + dose 14px weight 500 color `#78716c`
- Meta: 13px color `#78716c` — patient · frequency · refills · expires
- Status badge + "Renew" button (outlined, 12px)

---

### 6. New Patient Registration (`/patients/new`)
**Purpose:** Intake form — register a new patient with personal, insurance, medical history, fees, and emergency contact.

**Layout:** max-width 700px, stacked section cards, each card bg `#fff` border `#ede8df` radius 10px padding 22px 24px

**Section header:** 12px uppercase, weight 700, letter-spacing 0.6px, border-bottom `1px solid #f0e8da`, margin-bottom 16px

**Form grid:** 2-column, gap 14px; `.full` fields span both columns

**Field inputs:**
- Label: 12px weight 600, color `#78716c`
- Input/select: border `1.5px solid #e8dfd0`, radius 7px, padding 9px 12px, 14px, bg `#fafaf7`, placeholder color `#c9c3bb`
- Focus: border-color `#d97706`
- Textarea: min-height 80px, resize vertical

**Sections:**
1. Personal Information — First/Last Name, DOB, Sex, Phone, Email, Address
2. Insurance Information — Provider, Policy #, Group #, Subscriber Name
3. Medical History — Conditions, Medications, Allergies (all textareas)
4. Fees & Billing — Consultation Fee, Billing Type, Copay Amount, Payment Method, Billing Notes
5. Emergency Contact — Name, Relationship, Phone

**Actions row:** flex end, gap 12px — "Cancel" (outlined) + "Save & Register Patient" (amber filled)

---

## Design Tokens

### Colors
```
Amber primary:     #d97706
Amber dark:        #92400e
Amber light bg:    #fef3c7
Amber hover bg:    #fef9f2
Page background:   #f7f5f1
Card background:   #ffffff
Card border:       #ede8df
Input border:      #e8dfd0
Input bg:          #fafaf7
Body text:         #1c1208
Secondary text:    #78716c
Muted text:        #a8a29e
Placeholder:       #c9c3bb
Dividers:          #f0e8da
Success green:     #15803d  / bg #dcfce7
Error red:         #dc2626  / bg #fee2e2
Info blue:         #0891b2  / bg #dbeafe
Purple:            #5b21b6  / bg #ede9fe
Pink:              #9d174d  / bg #fce7f3
```

### Dark Mode Colors
```
Page bg:           #13110e
Nav bg:            #171410
Card bg:           #1c1a16
Border:            #2e2b22
Input bg:          #13110e
Input border:      #3a3520
Body text:         #e8e0d0
Secondary text:    #8a8070
Muted text:        #6b6050
Active nav:        #3a2a0a (bg), #d97706 (text)
```
Dark mode is toggled by adding class `dark` to `<body>`. All transitions use `0.2s`.

### Typography
```
Font family:  'DM Sans', system-ui, sans-serif
Weights used: 400, 500, 600, 700, 800
```
| Usage | Size | Weight |
|---|---|---|
| Logo | 20px | 800 |
| Page title | 22px | 700 |
| Card stat number | 28px (dashboard), 20px (profile) | 700 |
| Patient name in table | 14px | 600 |
| Nav links | 14px | 500 |
| Body / note text | 13–14px | 400 |
| Table headers | 11px | 600 |
| Labels / badges | 11–12px | 600 |

### Spacing & Radius
```
Page padding:      28px
Card padding:      20–24px
Card radius:       10px
Badge radius:      20px
Button radius:     7px
Input radius:      7px
Avatar radius:     50%
Gap (stats grid):  16px
Gap (form grid):   14px
```

### Transitions
```
Background:  0.2s ease
Color:       0.15s ease
Border:      0.15s ease
Dark toggle: 0.2s ease (thumb slides left/right)
```

---

## Interactions & Behavior

| Trigger | Action |
|---|---|
| Click patient row | Navigate to `/patients/:id`, default tab = History |
| Click "← All Patients" | Navigate back to `/patients` |
| Click "+ Add Patient" | Navigate to `/patients/new` |
| Click "Cancel" in intake | Navigate to `/patients` |
| Click tab (History/Dx/Rx…) | Switch active tab, update URL hash or local state |
| Click "Preview →" on lab file | Open modal overlay |
| Click modal overlay or ✕ | Close modal |
| Click dark mode toggle | Toggle `dark` class on `<body>`, persist in `localStorage` |
| Click nav link | Navigate to screen, highlight active link |

---

## State Management (Zustand stores)

```ts
// patientStore
interface PatientStore {
  patients: Patient[]
  activePatientId: string | null
  setActivePatient: (id: string) => void
}

// uiStore
interface UIStore {
  darkMode: boolean
  toggleDarkMode: () => void
  labPreviewOpen: boolean
  setLabPreviewOpen: (open: boolean) => void
  activePatientTab: 'history' | 'diagnoses' | 'rx' | 'notes' | 'labs'
  setActivePatientTab: (tab: string) => void
}
```

---

## Data Models

```ts
interface Patient {
  id: string            // e.g. "P-0024"
  name: string
  initials: string
  age: number
  sex: 'M' | 'F' | 'Other'
  dob: string
  phone: string
  insurance: string
  condTag: string       // display label
  condType: 'am' | 'bl' | 'pu' | 'gr' | 'pk'  // badge color key
  lastVisit: string
  nextAppt: string
  status: 'Active' | 'New' | 'Refill Due'
  totalVisits: number
  totalBilled: string
  avatarColor: string   // hex
}

interface Visit {
  day: string
  mon: string
  type: string
  notes: string
  badge: string
}

interface Diagnosis {
  code: string
  label: string
  since: string
  severity: string
  sevType: 'am' | 'bl' | 'gr' | 're'
}

interface Prescription {
  drug: string
  dose: string
  patient: string
  freq: string
  refills: number
  expires: string
  status: 'Active' | 'Refill Due'
}

interface LabFile {
  name: string
  type: string
  size: string
  icon: string
  uploadedAt: string
}

interface Transaction {
  patient: string
  service: string
  date: string
  amount: string
  status: 'Paid' | 'Pending'
}
```

---

## GitHub Setup & Claude Code Workflow

### Step 1 — Scaffold the React app
```bash
npm create vite@latest medtrack -- --template react-ts
cd medtrack
npm install
```

### Step 2 — Install dependencies
```bash
npm install react-router-dom zustand tailwindcss @tailwindcss/vite
npm install lucide-react recharts react-dropzone react-hook-form zod @hookform/resolvers
npx shadcn@latest init
```

### Step 3 — Push to GitHub
```bash
git init
git add .
git commit -m "chore: scaffold MedTrack React app"
gh repo create medtrack --public --source=. --push
# or: create repo on github.com and follow their push instructions
```

### Step 4 — Open in Claude Code
1. Open your terminal in the project folder
2. Run `claude` (Claude Code CLI)
3. Paste this message to get started:

```
I have a design handoff package for a patient management system called MedTrack. 
The README.md in this folder describes every screen, component, token, and data model.
Please implement the design as a React + Vite + Tailwind app, screen by screen, 
starting with the layout shell (topnav + routing) then the Patients list screen.
Reference the HTML prototype file "MedTrack Dashboard.dc.html" for exact visual reference.
```

### Step 5 — Iterate screen by screen
Ask Claude Code to implement one screen at a time:
- `"Implement the Patient Profile screen with all 5 tabs"`
- `"Add dark mode toggle using the token values in the README"`
- `"Implement the New Patient Registration form with React Hook Form + Zod validation"`
- `"Add the Billing screen with a Recharts bar chart"`

---

## Files in This Package
| File | Purpose |
|---|---|
| `README.md` | This document — full implementation spec |
| `MedTrack Dashboard.dc.html` | Interactive HTML prototype — visual reference |

---

*Generated from the MedTrack design session. For questions, open the HTML file in a browser to interact with the full prototype.*
