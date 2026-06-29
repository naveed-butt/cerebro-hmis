import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z.object({
  firstName: z.string().min(1, 'Required'),
  lastName: z.string().min(1, 'Required'),
  dob: z.string().min(1, 'Required'),
  sex: z.string().min(1, 'Required'),
  phone: z.string().min(1, 'Required'),
  email: z.string().email('Invalid email').or(z.literal('')),
  address: z.string().optional(),
  insuranceProvider: z.string().optional(),
  policyNumber: z.string().optional(),
  groupNumber: z.string().optional(),
  subscriberName: z.string().optional(),
  conditions: z.string().optional(),
  medications: z.string().optional(),
  allergies: z.string().optional(),
  emergencyName: z.string().optional(),
  emergencyRelation: z.string().optional(),
  emergencyPhone: z.string().optional(),
  consultFee: z.string().optional(),
  billingType: z.string().optional(),
  copay: z.string().optional(),
  paymentMethod: z.string().optional(),
  billingNotes: z.string().optional(),
})

type FormData = z.infer<typeof schema>

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="intk-field">
      <div className="intk-lbl">{label}</div>
      {children}
    </div>
  )
}

function FullField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="intk-field full">
      <div className="intk-lbl">{label}</div>
      {children}
    </div>
  )
}

export default function NewPatientPage() {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = (data: FormData) => {
    console.log('New patient:', data)
    navigate('/patients')
  }

  return (
    <div className="page">
      <button className="bk" onClick={() => navigate('/patients')}>← All Patients</button>
      <div className="sh">
        <div className="sh-t">New Patient Registration</div>
        <div className="sh-s">Complete all sections to register the patient in MedTrack</div>
      </div>

      <form className="intk" onSubmit={handleSubmit(onSubmit)}>
        {/* Personal Information */}
        <div className="intk-card">
          <div className="intk-sec">Personal Information</div>
          <div className="intk-grid">
            <Field label="First Name">
              <input className="intk-inp" placeholder="First name" {...register('firstName')} />
              {errors.firstName && <span style={{ fontSize: 11, color: '#dc2626' }}>{errors.firstName.message}</span>}
            </Field>
            <Field label="Last Name">
              <input className="intk-inp" placeholder="Last name" {...register('lastName')} />
              {errors.lastName && <span style={{ fontSize: 11, color: '#dc2626' }}>{errors.lastName.message}</span>}
            </Field>
            <Field label="Date of Birth">
              <input className="intk-inp" placeholder="MM / DD / YYYY" {...register('dob')} />
            </Field>
            <Field label="Sex">
              <select className="intk-sel" {...register('sex')}>
                <option value="">Select…</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other / Prefer not to say</option>
              </select>
            </Field>
            <Field label="Phone Number">
              <input className="intk-inp" placeholder="+1 (___) ___-____" {...register('phone')} />
            </Field>
            <Field label="Email Address">
              <input className="intk-inp" placeholder="patient@email.com" {...register('email')} />
            </Field>
            <FullField label="Home Address">
              <input className="intk-inp" placeholder="Street, City, State, ZIP" {...register('address')} />
            </FullField>
          </div>
        </div>

        {/* Insurance */}
        <div className="intk-card">
          <div className="intk-sec">Insurance Information</div>
          <div className="intk-grid">
            <Field label="Insurance Provider">
              <input className="intk-inp" placeholder="e.g. BlueCross, Aetna, Cigna…" {...register('insuranceProvider')} />
            </Field>
            <Field label="Policy Number">
              <input className="intk-inp" placeholder="Policy #" {...register('policyNumber')} />
            </Field>
            <Field label="Group Number">
              <input className="intk-inp" placeholder="Group #" {...register('groupNumber')} />
            </Field>
            <Field label="Subscriber Name">
              <input className="intk-inp" placeholder="Name on the policy" {...register('subscriberName')} />
            </Field>
          </div>
        </div>

        {/* Medical History */}
        <div className="intk-card">
          <div className="intk-sec">Medical History</div>
          <div className="intk-grid">
            <FullField label="Existing Conditions / Diagnoses">
              <textarea className="intk-ta" placeholder="e.g. Hypertension, Diabetes T2, Asthma…" {...register('conditions')} />
            </FullField>
            <FullField label="Current Medications">
              <textarea className="intk-ta" placeholder="List all medications, dosages, and frequency…" {...register('medications')} />
            </FullField>
            <FullField label="Known Allergies">
              <textarea className="intk-ta" placeholder="e.g. Penicillin, Aspirin, Latex, Shellfish…" style={{ minHeight: 64 }} {...register('allergies')} />
            </FullField>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="intk-card">
          <div className="intk-sec">Emergency Contact</div>
          <div className="intk-grid">
            <Field label="Contact Name">
              <input className="intk-inp" placeholder="Full name" {...register('emergencyName')} />
            </Field>
            <Field label="Relationship to Patient">
              <select className="intk-sel" {...register('emergencyRelation')}>
                <option value="">Select…</option>
                <option>Spouse / Partner</option>
                <option>Parent</option>
                <option>Child</option>
                <option>Sibling</option>
                <option>Friend</option>
                <option>Other</option>
              </select>
            </Field>
            <Field label="Phone Number">
              <input className="intk-inp" placeholder="+1 (___) ___-____" {...register('emergencyPhone')} />
            </Field>
          </div>
        </div>

        {/* Fees & Billing */}
        <div className="intk-card">
          <div className="intk-sec">Fees &amp; Billing</div>
          <div className="intk-grid">
            <Field label="Consultation Fee">
              <input className="intk-inp" placeholder="e.g. $150.00" {...register('consultFee')} />
            </Field>
            <Field label="Billing Type">
              <select className="intk-sel" {...register('billingType')}>
                <option value="">Select…</option>
                <option>Insurance (Primary)</option>
                <option>Insurance + Copay</option>
                <option>Self-Pay / Cash</option>
                <option>Sliding Scale</option>
                <option>Medicare</option>
                <option>Medicaid</option>
              </select>
            </Field>
            <Field label="Copay Amount">
              <input className="intk-inp" placeholder="e.g. $25.00 (if applicable)" {...register('copay')} />
            </Field>
            <Field label="Preferred Payment Method">
              <select className="intk-sel" {...register('paymentMethod')}>
                <option value="">Select…</option>
                <option>Credit / Debit Card</option>
                <option>Bank Transfer (ACH)</option>
                <option>Cash</option>
                <option>Check</option>
                <option>Health Savings Account (HSA)</option>
              </select>
            </Field>
            <FullField label="Billing Notes">
              <textarea className="intk-ta" placeholder="e.g. Patient has secondary insurance, agreed on sliding scale rate of $80…" style={{ minHeight: 64 }} {...register('billingNotes')} />
            </FullField>
          </div>
        </div>

        <div className="intk-act">
          <button type="button" className="obtn" onClick={() => navigate('/patients')}>Cancel</button>
          <button type="submit" className="pbtn">Save &amp; Register Patient</button>
        </div>
      </form>
    </div>
  )
}
