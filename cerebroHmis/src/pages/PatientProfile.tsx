import { Link, useParams } from 'react-router-dom'
import { usePatientStore } from '../store/patientStore'
import { useUiStore } from '../store/uiStore'
import { visits, diagnoses, prescriptions, labFiles, labResults } from '../data/mockData'
import { useDropzone } from 'react-dropzone'

const COND_CLASS: Record<string, string> = {
  am: 'badge b-am', bl: 'badge b-bl', pu: 'badge b-pu',
  gr: 'badge b-gr', pk: 'badge b-pk', re: 'badge b-re',
}

function LabPreviewModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="lpmodal" onClick={onClose}>
      <div className="lpinner" onClick={(e) => e.stopPropagation()}>
        <button className="lp-close" onClick={onClose}>✕</button>
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>
            CBC Full Panel — Jun 12, 2026
          </div>
          <div style={{ fontSize: 13, color: '#a8a29e' }}>
            Maria Santos · P-0024 · Ordered by Dr. Lee
          </div>
        </div>
        <div className="lr-row lr-hdr">
          <div>Test</div><div>Result</div><div>Reference Range</div><div>Flag</div>
        </div>
        {labResults.map((r) => (
          <div className="lr-row" key={r.test}>
            <div>{r.test}</div>
            <div className={r.flagType === 'hi' ? 'lr-hi' : r.flagType === 'lo' ? 'lr-lo' : ''}>
              {r.result}
            </div>
            <div>{r.ref}</div>
            <div className={r.flagType === 'hi' ? 'lr-hi' : r.flagType === 'lo' ? 'lr-lo' : 'lr-ok'}>
              {r.flag}
            </div>
          </div>
        ))}
        <div style={{
          marginTop: 20, padding: '12px 14px', background: '#fef3c7',
          borderRadius: 8, fontSize: 13, color: '#92400e',
        }}>
          ⚠ Glucose and LDL are above reference range. Consider dietary counselling and follow-up lipid panel in 3 months.
        </div>
      </div>
    </div>
  )
}

function LabsTab() {
  const { labPreviewOpen, setLabPreviewOpen } = useUiStore()
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'application/pdf': [], 'image/*': [] },
    onDrop: () => {},
  })

  return (
    <div>
      <label className="lab-drop" {...getRootProps()}>
        <input {...getInputProps()} />
        <div style={{ fontSize: 36, marginBottom: 10 }}>📁</div>
        <div style={{ fontWeight: 600, fontSize: 15, color: '#1c1208', marginBottom: 5 }}>
          {isDragActive ? 'Drop files here…' : 'Upload Lab Report'}
        </div>
        <div style={{ fontSize: 13, color: '#a8a29e' }}>
          Drag & drop a PDF, JPG, or PNG — or click to browse
        </div>
      </label>

      <div style={{ fontSize: 11, fontWeight: 700, color: '#a8a29e', textTransform: 'uppercase', letterSpacing: '.7px', marginBottom: 12 }}>
        Uploaded Reports
      </div>
      <div className="lab-list">
        {labFiles.map((lf) => (
          <div className="lab-item" key={lf.name}>
            <div className="lab-icon">{lf.icon}</div>
            <div style={{ flex: 1 }}>
              <div className="lab-n">{lf.name}</div>
              <div className="lab-m">{lf.type} · {lf.size}</div>
            </div>
            <button className="lab-pbtn" onClick={() => setLabPreviewOpen(true)}>
              Preview →
            </button>
          </div>
        ))}
      </div>
      {labPreviewOpen && <LabPreviewModal onClose={() => setLabPreviewOpen(false)} />}
    </div>
  )
}

export default function PatientProfile() {
  const { id } = useParams<{ id: string }>()
  const { patients } = usePatientStore()
  const { activePatientTab, setActivePatientTab } = useUiStore()

  const patient = patients.find((p) => p.id === id) ?? patients[0]
  const patientRx = prescriptions.filter((rx) => rx.patient === patient.name)

  const tabs = [
    { key: 'history', label: 'History' },
    { key: 'diagnoses', label: 'Diagnoses' },
    { key: 'rx', label: 'Prescriptions' },
    { key: 'notes', label: 'Notes' },
    { key: 'labs', label: 'Labs' },
  ] as const

  return (
    <div className="page">
      <Link to="/patients" className="bk">← All Patients</Link>

      {/* Hero card */}
      <div className="hero">
        <div className="hav" style={{ background: patient.avatarColor }}>
          {patient.initials}
        </div>
        <div style={{ flex: 1 }}>
          <div className="hn">{patient.name}</div>
          <div className="hm">
            <span>{patient.sex} · {patient.age} yrs</span>
            <span>DOB: {patient.dob}</span>
            <span>{patient.phone}</span>
            <span>{patient.insurance}</span>
            <span style={{ color: '#c9c3bb' }}>ID: {patient.id}</span>
          </div>
        </div>
        <div className="hact">
          <button className="obtn">Edit Info</button>
          <button className="pbtn">+ Visit Note</button>
        </div>
      </div>

      {/* Stats row */}
      <div className="hstats">
        <div className="hsc">
          <div className="hs-n">{patient.totalVisits}</div>
          <div className="hs-l">Total Visits</div>
        </div>
        <div className="hsc">
          <div className="hs-n">{patient.lastVisit !== '—' ? patient.lastVisit : '—'}</div>
          <div className="hs-l">Last Visit</div>
        </div>
        <div className="hsc">
          <div className="hs-n">{patient.nextAppt}</div>
          <div className="hs-l">Next Appointment</div>
        </div>
        <div className="hsc">
          <div className="hs-n">{patient.totalBilled}</div>
          <div className="hs-l">Total Billed</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="ptabs">
        {tabs.map((t) => (
          <button
            key={t.key}
            className={`ptab${activePatientTab === t.key ? ' active' : ''}`}
            onClick={() => setActivePatientTab(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activePatientTab === 'history' && (
        <div className="vlist">
          {visits.map((v) => (
            <div className="vi" key={`${v.day}-${v.mon}`}>
              <div className="vi-dt">
                <div className="vi-day">{v.day}</div>
                <div className="vi-mon">{v.mon}</div>
              </div>
              <div className="vi-main">
                <div className="vi-type">{v.type}</div>
                <div className="vi-note">{v.notes}</div>
                <div className="vi-b">{v.badge}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activePatientTab === 'diagnoses' && (
        <div className="dxl">
          {diagnoses.map((dx) => (
            <div className="dxi" key={dx.code}>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{dx.label}</div>
                <div style={{ fontSize: 12, color: '#a8a29e', marginTop: 3 }}>
                  ICD-10: {dx.code} · Since {dx.since}
                </div>
              </div>
              <span className={COND_CLASS[dx.sevType]}>{dx.severity}</span>
            </div>
          ))}
          <div className="dxi dxi-add" style={{ border: '1.5px dashed #e8dfd0', cursor: 'pointer', justifyContent: 'center' }}>
            <span style={{ fontSize: 13, fontWeight: 500, color: '#a8a29e' }}>+ Add Diagnosis</span>
          </div>
        </div>
      )}

      {activePatientTab === 'rx' && (
        <div>
          {patientRx.length === 0 ? (
            <div className="empty">No active prescriptions for this patient.</div>
          ) : (
            patientRx.map((rx) => (
              <div className="rxc" key={rx.drug}>
                <div style={{ flex: 1 }}>
                  <div className="rxd">
                    {rx.drug}{' '}
                    <span style={{ fontSize: 14, fontWeight: 500, color: '#78716c' }}>{rx.dose}</span>
                  </div>
                  <div className="rxm">{rx.freq} · Refills: {rx.refills} · Expires: {rx.expires}</div>
                </div>
                <div className="rxact">
                  <span className={rx.status === 'Refill Due' ? 'badge b-re' : 'badge b-gr'}>
                    {rx.status}
                  </span>
                  <button className="obtn" style={{ fontSize: 12, padding: '4px 12px' }}>Renew</button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {activePatientTab === 'notes' && (
        <div className="notes-a">
          <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 12, color: '#1c1208' }}>
            Clinical Notes — {patient.name}
          </div>
          <div>
            Patient is compliant with medication regimen. Self-monitoring BP at home and logging readings.
            Advised to reduce occupational stress and maintain daily 30-min walks.
            Consider cardiology referral if BP does not stabilise by Sep 2026.
            Anxiety is mild and managed with lifestyle interventions for now.
          </div>
          <div style={{ fontSize: 12, color: '#a8a29e', marginTop: 16 }}>
            Last updated: Jun 12, 2026 · Dr. Lee
          </div>
        </div>
      )}

      {activePatientTab === 'labs' && <LabsTab />}
    </div>
  )
}
