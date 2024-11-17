'use client'

import React, { useEffect, useState } from 'react'
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import Image from "next/image"
import Link from "next/link"
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
    // try {
    //   // Get the token from localStorage
    //   const token = localStorage.getItem('token')

    //   if (token) {
    //   // Call the server to invalidate the token
    //   const response = await fetch('/api/logout', {
    //     method: 'POST',
    //     headers: {
    //       'Authorization': `Bearer ${localStorage.getItem('token')}`,
    //       'Content-Type': 'application/json'
    //     }
    //   });

    //   if (!response.ok) {
    //     console.error('Logout failed on server');
    //   }
    // }
    // Clear the token from localStorage
    localStorage.removeItem('token');

      // Redirect to login page
      router.push('/login');
    // } catch (error) {
    //   console.error('Logout error:', error);
    //    // Even if server logout fails, clear local storage and redirect
    //   localStorage.removeItem('token');
    //   router.push('/login');
  //  }
}

  return (
    <>
      <Navbar bg="light" expand="lg" className="mb-3">
        <Container fluid>
          <Navbar.Brand href="/" className="d-flex align-items-center">
            <Image
              src="/rostergo10_final_transparent.png"
              alt="RosterGo"
              width={80}
              height={80}
              className="me-2"
            />
            <span className="ms-2">Hi! {nickname}</span>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Daily Status</Nav.Link>
              <Nav.Link href="/roster">Monthly Roster</Nav.Link>
              <Nav.Link href="/employee">Employee</Nav.Link>
              <Nav.Link href="/branch">Branch</Nav.Link>
              <Nav.Link href="/shift-slot">Shift Slot</Nav.Link>
            </Nav>

            <div className="userActions">
          <div>{dateFormat}</div>
          </div>

            <div className="d-flex">
              <Button 
                onClick={() => setShowPasswordModal(true)}>Change Password</Button>
          
              <Button variant="outline-danger" onClick={handleLogout}>
                Logout
              </Button>
            </div>

            <ChangePasswordModal 
              show={showPasswordModal}
              onHide={() => setShowPasswordModal(false)}
              />
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container fluid>
        {children}
      </Container>
    </>
  );


  //   <div className="layoutContainer">
  //     <div className="firstSection">
  //       <div>
  //         <Link href="/">
  //           <Image src="/rostergo10_final_transparent.png" alt="RosterGo" width={100} height={100} />
  //         </Link>
  //       </div>
  //       <div className="userActions">
  //         <div>{dateFormat}</div>
  //         <div>
  //           <Button
  //             onClick={() => setShowPasswordModal(true)}>Change Password</Button>
  //         </div>
  //         <div>
  //           <Button
  //             onClick={handleLogout}>Logout</Button>
  //         </div>
  //       </div>
  //     </div>

  //     <div>
  //       <nav className="layoutNavbar">
  //         <ul className="nav-links">
  //           <li><Link href="/">Daily Status</Link></li>
  //           <li><Link href="/roster">Monthly Roster</Link></li>
  //           <li><Link href="/employee">Employee</Link></li>
  //           <li><Link href="/branch">Branch</Link></li>
  //           <li><Link href="/shift-slot">Shift Slot</Link></li>  
  //         </ul>
  //       </nav>
  //     </div>

  //     <div>{children}</div>

  //     <ChangePasswordModal 
  //       show={showPasswordModal}
  //       onHide={() => setShowPasswordModal(false)}
  //     />
  //   </div>
  // )
}