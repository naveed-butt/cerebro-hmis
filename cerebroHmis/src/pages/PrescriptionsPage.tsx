import { useState } from 'react'
import { prescriptions } from '../data/mockData'

const refillDue = prescriptions.filter((rx) => rx.status === 'Refill Due')

export default function PrescriptionsPage() {
  const [search, setSearch] = useState('')

  const filtered = prescriptions.filter(
    (rx) =>
      search === '' ||
      rx.drug.toLowerCase().includes(search.toLowerCase()) ||
      rx.patient.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="page">
      <div className="sh fx ac jb">
        <div>
          <div className="sh-t">Prescriptions</div>
          <div className="sh-s">Active medications across all patients</div>
        </div>
        <button className="pbtn">+ New Prescription</button>
      </div>

      {refillDue.length > 0 && (
        <div className="rxal">
          ⚠ {refillDue.length} prescription{refillDue.length > 1 ? 's require' : ' requires'} renewal —{' '}
          {refillDue.map((rx) => `${rx.patient} · ${rx.drug} (${rx.refills} refills remaining)`).join(', ')}
        </div>
      )}

      <div className="tctl" style={{ background: '#fff', borderRadius: 10, border: '1px solid #ede8df', marginBottom: 20 }}>
        <div className="sw">
          <span className="si">🔍</span>
          <input
            className="srch"
            placeholder="Filter by patient or medication…"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button className="fbtn">Status ▾</button>
        <button className="fbtn">Patient ▾</button>
      </div>

      {filtered.map((rx) => (
        <div className="rxc" key={`${rx.drug}-${rx.patient}`}>
          <div style={{ flex: 1 }}>
            <div className="rxd">
              {rx.drug}{' '}
              <span style={{ fontSize: 14, fontWeight: 500, color: '#78716c' }}>{rx.dose}</span>
            </div>
            <div className="rxm">
              {rx.patient} · {rx.freq} · Refills: {rx.refills} · Expires: {rx.expires}
            </div>
          </div>
          <div className="rxact">
            <span className={rx.status === 'Refill Due' ? 'badge b-re' : 'badge b-gr'}>
              {rx.status}
            </span>
            <button className="obtn" style={{ fontSize: 12, padding: '4px 12px' }}>Renew</button>
          </div>
        </div>
      ))}
    </div>
  )
}
