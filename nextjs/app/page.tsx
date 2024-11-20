"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      // Redirect to login if no token exists
      router.push("/login");
      return;
    }

    // Redirect to today's date route if token exists
    const today = new Date()
    const year = today.getFullYear()
    const month = String(today.getMonth() + 1).padStart(2, "0")
    const day = String(today.getDate()).padStart(2, "0")
    const todayDate = `${year}-${month}-${day}`

    router.push(`/${todayDate}`)
  }, [router]);

  return <div>Loading...</div>;
}
