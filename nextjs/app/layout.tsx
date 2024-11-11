import type { Metadata } from "next";
import "./globals.css";
import Image from 'next/image';
import { Button } from "react-bootstrap";
import Link from "next/link"
import styles from './page.module.scss'


export const metadata: Metadata = {
  title: "RosterGo",
  description: "Intuitive Employee Scheduling & Time Tracking, in all-in-one Customizable App.",
};

interface RootLayoutProps {
  children: React.ReactNode
}

export default async function RootLayout(props: RootLayoutProps) {

  const today = new Date();

  const dateFormat = `${today.getFullYear()}年${String(today.getMonth() + 1)}月${String(today.getDate())}日`

  return (
    <html lang="en">
      <body>
        <div className="container">
          <div className="firstSection">
            <div>
              <Link href="/">
              <Image
                src="/rostergo10_final_transparent.png"
                alt="RosterGo"
                width={100}
                height={100}
              /> </Link>
            </div>
            <div className="userActions">
              <div>{dateFormat}</div>
              <div><Button>Change Password</Button></div>
              <div><Button>Logout</Button></div>
            </div>

          </div>

          <div>
            <nav className="navbar">
              <ul className="nav-links">
                <li><a href="/">Daily Status</a></li>
                <li><a href="/roster">Roster</a></li>
                <li><a href="/employee">Employee</a></li>
                <li><a href="/branch">Branch</a></li>
                <li><a href="/shift-slot">Shift Slot</a></li>
              </ul>
            </nav>
          </div>

          <div>
            {props.children}
          </div>
        </div>

      </body>
    </html>
  )

}
