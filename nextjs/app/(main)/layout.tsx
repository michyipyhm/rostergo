"use client";

import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as jose from "jose";
import ChangePasswordModal from "@/component/ChangePassword";
import styles from "./header.module.scss";
import {
  ChartBar,
  CalendarDays,
  Store,
  LogOut,
  Users,
  Package,
  KeyRound,
} from "lucide-react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [nickname, setNickname] = useState("");
  const router = useRouter();

  const today = new Date();
  const dateFormat = `${today.getFullYear()}年${String(
    today.getMonth() + 1
  )}月${String(today.getDate())}日`;
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jose.decodeJwt(token);
        setNickname((decodedToken.nickname as string) || "");
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    } else {
      router.push("/login");
    }
  }, [router]);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");

      if (token) {
        const response = await fetch("/api/auth/logout", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          console.error("Logout failed on server");
        }
      }
      localStorage.removeItem("token");
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
      // Even if server logout fails, clear local storage and redirect
      localStorage.removeItem("token");
      router.push("/login");
    }
  };

  return (
    <div className={styles.layout}>
      <nav className={styles.sidebar}>
        <div className={styles.sidebarTop}>
          <Link href="/" className={styles.logo}>
            <Image
              src="/rostergo10_final_transparent.png"
              alt="RosterGo"
              width={50}
              height={50}
            />
            <span>RosterGo</span>
          </Link>

          <div className={styles.navLinks}>
            <Link href="/" className={styles.navItem}>
              <ChartBar size={20} />
              <span>Daily Status</span>
            </Link>
            <Link href="/roster" className={styles.navItem}>
              <CalendarDays size={20} />
              <span>Monthly Roster</span>
            </Link>
            <Link href="/employee" className={styles.navItem}>
              <Users size={20} />
              <span>Employee</span>
            </Link>
            <Link href="/branch" className={styles.navItem}>
              <Store size={20} />
              <span>Branch</span>
            </Link>
            <Link href="/shiftslot" className={styles.navItem}>
              <Package size={20} />
              <span>Shift Slot</span>
            </Link>
          </div>
        </div>

        <div className={styles.sidebarBottom}>
          <div className={styles.userSection}>
            <div
              className={styles.navItem}
              onClick={() => setShowPasswordModal(true)}
            >
              <KeyRound size={20} />
              <span>Change Password</span>
            </div>
            <div className={styles.navItem} onClick={handleLogout}>
              <LogOut size={20} />
              <span>logout</span>
            </div>
          </div>
        </div>
      </nav>

      <main className={styles.mainContent}>{children}</main>

      <ChangePasswordModal
        show={showPasswordModal}
        onHide={() => setShowPasswordModal(false)}
      />
    </div>
  );
}
