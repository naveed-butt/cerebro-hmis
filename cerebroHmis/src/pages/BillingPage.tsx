import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { transactions } from '../data/mockData'

const monthlyData = [
  { month: 'Jan', value: 6100 },
  { month: 'Feb', value: 7800 },
  { month: 'Mar', value: 10200 },
  { month: 'Apr', value: 9400 },
  { month: 'May', value: 12700 },
  { month: 'Jun', value: 12100 },
]

const BAR_OPACITY = [.26, .36, .56, .50, .80, 1]

export default function BillingPage() {
  return (
    <div className="page">
      <div className="sh fx ac jb">
        <div>
          <div className="sh-t">Billing &amp; Revenue</div>
          <div className="sh-s">Fiscal Year 2026</div>
        </div>
        <div className="fx gap8">
          <button className="obtn">2025 ↔</button>
          <button className="obtn">Export ↓</button>
        </div>
      </div>

      {/* Stats */}
      <div className="fg">
        <div className="sc">
          <div className="sc-n" style={{ color: '#d97706' }}>$58,420</div>
          <div className="sc-l">YTD Revenue</div>
          <div className="sc-d">↑ 18% vs 2025</div>
        </div>
        <div className="sc">
          <div className="sc-n">$54,220</div>
          <div className="sc-l">Collected</div>
        </div>
        <div className="sc">
          <div className="sc-n" style={{ color: '#dc2626' }}>$4,200</div>
          <div className="sc-l">Outstanding</div>
        </div>
      </div>

      {/* Chart */}
      <div className="fchrt">
        <div className="fct">Monthly Revenue — 2026</div>
        <div className="fcs">January through June (year-to-date)</div>
        <ResponsiveContainer width="100%" height={160}>
          <BarChart data={monthlyData} barCategoryGap="30%">
            <XAxis
              dataKey="month"
              axisLine={false} tickLine={false}
              tick={(props) => {
                const { x, y, payload } = props
                const isLast = payload.value === 'Jun'
                return (
                  <text x={x} y={y + 16} textAnchor="middle" fill={isLast ? '#d97706' : '#c9c3bb'} fontSize={12} fontWeight={isLast ? 600 : 400} fontFamily="DM Sans, system-ui">
                    {payload.value}{isLast ? ' ★' : ''}
                  </text>
                )
              }}
            />
            <YAxis hide />
            <Tooltip
              formatter={(v: number) => [`$${(v / 1000).toFixed(1)}k`, 'Revenue']}
              contentStyle={{ border: '1px solid #ede8df', borderRadius: 8, fontSize: 12 }}
            />
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {monthlyData.map((_, i) => (
                <Cell key={i} fill={`rgba(217,119,6,${BAR_OPACITY[i]})`} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Transactions */}
      <div className="txnw">
        <div className="txnh">
          <span className="txnht">Recent Transactions</span>
          <button className="obtn" style={{ fontSize: 12, padding: '5px 12px' }}>View All</button>
        </div>
        <div className="txnr txnh2">
          <div>Patient</div><div>Service</div><div>Date</div><div>Amount</div><div>Status</div>
        </div>
        {transactions.map((txn) => (
          <div className="txnr" key={`${txn.patient}-${txn.date}`}>
            <div style={{ fontWeight: 500 }}>{txn.patient}</div>
            <div style={{ fontSize: 13, color: '#78716c' }}>{txn.service}</div>
            <div style={{ fontSize: 13, color: '#a8a29e' }}>{txn.date}</div>
            <div style={{ fontWeight: 600 }}>{txn.amount}</div>
            <div>
              <span className={txn.status === 'Paid' ? 'badge b-gr' : 'badge b-am'}>
                {txn.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
