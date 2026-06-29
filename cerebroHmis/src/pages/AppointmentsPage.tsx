import { appointments } from '../data/mockData'

const WEEK = [
  { dn: 'Mon', dd: '23' }, { dn: 'Tue', dd: '24' }, { dn: 'Wed', dd: '25' },
  { dn: 'Thu', dd: '26' }, { dn: 'Fri', dd: '27' }, { dn: 'Sat', dd: '28' },
  { dn: 'Sun', dd: '29', today: true },
]

const STATUS_CLASS: Record<string, string> = {
  Confirmed: 'badge b-gr', Cancelled: 'badge b-re', Pending: 'badge b-am',
}

export default function AppointmentsPage() {
  return (
    <div className="page">
      <div className="sh fx ac jb">
        <div>
          <div className="sh-t">Appointments</div>
          <div className="sh-s">Week of Jun 23 – 29, 2026</div>
        </div>
        <button className="pbtn">+ Schedule</button>
      </div>

      {/* Week strip */}
      <div className="wstrip">
        {WEEK.map((d) => (
          <div key={d.dd} className={`wday${d.today ? ' tod' : ''}`}>
            <div className="wdn">{d.dn}</div>
            <div className="wdd">{d.dd}</div>
          </div>
        ))}
      </div>

      <div style={{ fontSize: 11, fontWeight: 700, color: '#a8a29e', textTransform: 'uppercase', letterSpacing: '.7px', marginBottom: 14 }}>
        Today — Sunday, Jun 29
      </div>

      <div className="alist">
        {appointments.map((appt) => (
          <div key={appt.id} className={`ac-card${appt.status === 'Cancelled' ? ' canc' : ''}`}>
            <div className="at">{appt.time}</div>
            <div className="asep" />
            <div className="ai">
              <div className="an">{appt.name}</div>
              <div className="atp">{appt.type} · {appt.dur}</div>
            </div>
            <span className={STATUS_CLASS[appt.status]}>{appt.status}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
