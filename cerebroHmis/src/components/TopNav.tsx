import { NavLink } from 'react-router-dom'
import { useUiStore } from '../store/uiStore'
import { useEffect } from 'react'

export default function TopNav() {
  const { darkMode, toggleDarkMode } = useUiStore()

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode)
  }, [darkMode])

  return (
    <div className="tnav">
      <NavLink to="/patients" className="logo">MedTrack</NavLink>

      <div className="fx gap8">
        <NavLink
          to="/patients"
          className={({ isActive }) => `navlink${isActive ? ' active' : ''}`}
        >
          Patients
        </NavLink>
        <NavLink
          to="/appointments"
          className={({ isActive }) => `navlink${isActive ? ' active' : ''}`}
        >
          Appointments
        </NavLink>
        <NavLink
          to="/billing"
          className={({ isActive }) => `navlink${isActive ? ' active' : ''}`}
        >
          Billing
        </NavLink>
        <NavLink
          to="/prescriptions"
          className={({ isActive }) => `navlink${isActive ? ' active' : ''}`}
        >
          Prescriptions
        </NavLink>
      </div>

      <div className="dk-wrap" style={{ marginLeft: 'auto' }}>
        <span className="dk-lbl">{darkMode ? '🌙' : '☀️'}</span>
        <button
          className={`dk-tog${darkMode ? ' on' : ''}`}
          onClick={toggleDarkMode}
          aria-label="Toggle dark mode"
        >
          <div className="dk-thumb" />
        </button>
      </div>

      <div className="uchip" style={{ marginLeft: 16 }}>
        <div className="uav">DL</div>
        <span style={{ fontSize: 13, fontWeight: 600 }}>Dr. Lee</span>
        <span style={{ color: '#a8a29e', fontSize: 12, marginLeft: 2 }}>▾</span>
      </div>
    </div>
  )
}
