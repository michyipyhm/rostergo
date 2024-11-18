'use client'

import React, { useEffect, useState } from 'react'
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import Image from "next/image"
import Link from 'next/link';
import { useRouter } from "next/navigation"
import * as jose from 'jose';
import ChangePasswordModal from "@/component/ChangePassword"


export default function MainLayout({ children }: { children: React.ReactNode }) {
  const [nickname, setNickname] = useState('');
  const router = useRouter();

  const today = new Date()
  const dateFormat = `${today.getFullYear()}年${String(today.getMonth() + 1)}月${String(today.getDate())}日`
  const [showPasswordModal, setShowPasswordModal] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jose.decodeJwt(token);
        setNickname(decodedToken.nickname as string || '');
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    } else {
      router.push('/login');
    }
  }, [router]);
  
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token')

      if (token) {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        console.error('Logout failed on server');
      }
    }
      localStorage.removeItem('token');
      router.push('/login');

    } catch (error) {
      console.error('Logout error:', error);
       // Even if server logout fails, clear local storage and redirect
      localStorage.removeItem('token');
      router.push('/login');
   }
}

  return (
    <>
  
    <div className="layoutContainer">

      <div className="firstSection">
          <Link href="/">
            <Image src="/rostergo10_final_transparent.png" alt="RosterGo" width={80} height={80} />
          </Link>
        <div className="fs-3">Hi! {nickname} 👋</div>
     </div>

      <div className="userActions">
        <div className="fs-5">{dateFormat}</div>
        <div>
          <Button
            onClick={() => setShowPasswordModal(true)}>Change Password</Button>
        </div>
        <div>
          <Button
            onClick={handleLogout}>Logout</Button>
        </div>
      </div>

      <ChangePasswordModal 
        show={showPasswordModal}
        onHide={() => setShowPasswordModal(false)}
      />
    </div>

        <nav className="layoutNavbar">
          <ul className="nav-links">
            <li><Link href="/">Daily Status</Link></li>
            <li><Link href="/roster">Monthly Roster</Link></li>
            <li><Link href="/employee">Employee</Link></li>
            <li><Link href="/branch">Branch</Link></li>
            <li><Link href="/shift-slot">Shift Slot</Link></li>  
          </ul>
        </nav>
      
      <div>{children}</div>
      </>  
  )
}