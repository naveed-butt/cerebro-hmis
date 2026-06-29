import { Outlet } from 'react-router-dom'
import TopNav from './TopNav'

export default function Layout() {
  return (
    <>
      <TopNav />
      <div className="scroll">
        <Outlet />
      </div>
    </>
  )
}
