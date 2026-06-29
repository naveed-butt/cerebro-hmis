import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePatientStore } from '../store/patientStore'
import type { Patient } from '../types'

const COND_CLASS: Record<string, string> = {
  am: 'badge b-am', bl: 'badge b-bl', pu: 'badge b-pu',
  gr: 'badge b-gr', pk: 'badge b-pk', re: 'badge b-re',
}

const STATUS_DOT: Record<string, string> = {
  Active: 'd-gr', 'Refill Due': 'd-re', New: 'd-bl',
}
const STATUS_TXT: Record<string, string> = {
  Active: 't-gr', 'Refill Due': 't-re', New: 't-bl',
}

function PatientRow({ patient }: { patient: Patient }) {
  const navigate = useNavigate()
  const { setActivePatient } = usePatientStore()

  const handleClick = () => {
    setActivePatient(patient.id)
    navigate(`/patients/${patient.id}`)
  }

  return (
    <div className="prow" onClick={handleClick}>
      <div className="tdx">
        <div className="fx ac gap10">
          <div className="av" style={{ background: patient.avatarColor }}>
            {patient.initials}
          </div>
          <div>
            <div className="ptn">{patient.name}</div>
            <div className="ptid">{patient.id}</div>
          </div>
        </div>
      </div>
      <div className="tdx">{patient.age} · {patient.sex}</div>
      <div className="tdx">
        <span className={COND_CLASS[patient.condType]}>{patient.condTag}</span>
      </div>
      <div className="tdx" style={{ color: '#a8a29e' }}>{patient.lastVisit}</div>
      <div className="tdx">{patient.nextAppt}</div>
      <div className="tdx">
        <div className="srow">
          <div className={`dot ${STATUS_DOT[patient.status]}`} />
          <span className={STATUS_TXT[patient.status]}>{patient.status}</span>
        </div>
      </div>
      <div className="tdx">
        <div className="gbtn">→</div>
      </div>
    </div>
  )
}

export default function PatientsPage() {
  const { patients } = usePatientStore()
  const navigate = useNavigate()
  const [search, setSearch] = useState('')

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'short', day: 'numeric',
  })

  const filtered = patients.filter((p) =>
    search === '' ||
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.id.toLowerCase().includes(search.toLowerCase()) ||
    p.condTag.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="page">
      <div className="sh">
        <div className="sh-t">Good morning, Dr. Lee</div>
        <div className="sh-s">{today} · 4 appointments today</div>
      </div>

      {/* Stats */}
      <div className="sgrid">
        <div className="sc">
          <div className="sc-n">47</div>
          <div className="sc-l">Total Patients</div>
          <div className="sc-d">↑ 3 this month</div>
        </div>
        <div className="sc">
          <div className="sc-n">4</div>
          <div className="sc-l">Today's Appointments</div>
        </div>
      </div>

      {/* Patient Table */}
      <div className="tblw">
        <div className="tctl">
          <div className="sw">
            <span className="si">🔍</span>
            <input
              className="srch"
              placeholder="Search patients…"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button className="fbtn">Condition ▾</button>
          <button className="fbtn">Sort ▾</button>
          <button className="abtn" onClick={() => navigate('/patients/new')}>
            + Add Patient
          </button>
        </div>

        <div className="pgrd">
          <div className="prow hdr">
            <div className="thx">Patient</div>
            <div className="thx">Age</div>
            <div className="thx">Condition</div>
            <div className="thx">Last Visit</div>
            <div className="thx">Next Appt</div>
            <div className="thx">Status</div>
            <div className="thx" />
          </div>
          {filtered.map((p) => (
            <PatientRow key={p.id} patient={p} />
          ))}
        </div>

        <div className="pgft">
          <span style={{ fontSize: 12, color: '#a8a29e' }}>
            Showing {filtered.length} of 47 patients
          </span>
          <div className="pgbs">
            <div className="pgb on">1</div>
            <div className="pgb">2</div>
            <div className="pgb">3</div>
            <div className="pgb">…</div>
          </div>
        </div>
      </div>
    </div>
  )
}
