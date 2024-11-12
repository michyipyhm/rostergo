'use client'

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "react-bootstrap"
import { useState } from "react"
import ChangePasswordModal from "@/component/ChangePassword"

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const today = new Date()
  const dateFormat = `${today.getFullYear()}年${String(today.getMonth() + 1)}月${String(today.getDate())}日`
  const [showPasswordModal, setShowPasswordModal] = useState(false)

  const router = useRouter ()
  
  const handleLogout = async () => {
    try {
      const response = await fetch ('/api/login', {
        method: 'DELETE',
      })
      if (response.ok) {
        router.push('/login')
      }
    } catch (error) {
      console.error('Logout error:', error)
   }
}

  return (
    <div className="layoutContainer">
      <div className="firstSection">
        <div>
          <Link href="/">
            <Image src="/rostergo10_final_transparent.png" alt="RosterGo" width={100} height={100} />
          </Link>
        </div>
        <div className="userActions">
          <div>{dateFormat}</div>
          <div>
            <Button
              onClick={() => setShowPasswordModal(true)}>Change Password</Button>
          </div>
          <div>
            <Button
              onClick={handleLogout}>Logout</Button>
          </div>
        </div>
      </div>

      <div>
        <nav className="layoutNavbar">
          <ul className="nav-links">
            <li><Link href="/">Daily Status</Link></li>
            <li><Link href="/roster">Monthly Roster</Link></li>
            <li><Link href="/employee">Employee</Link></li>
            <li><Link href="/branch">Branch</Link></li>
            <li><Link href="/shift-slot">Shift Slot</Link></li>  
          </ul>
        </nav>
      </div>

      <div>{children}</div>

      <ChangePasswordModal 
        show={showPasswordModal}
        onHide={() => setShowPasswordModal(false)}
      />
    </div>
  )
}