import type { Metadata } from "next"
import "./globals.css"
import "bootstrap/dist/css/bootstrap.min.css"

export const metadata: Metadata = {
  title: "RosterGo",
  description: "Intuitive Employee Scheduling & Time Tracking, in all-in-one Customizable App.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  console.log(children)
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}