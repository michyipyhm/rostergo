"use client"
import { useParams } from "next/navigation"
import Link from "next/link"

export default function About() {

    const params = useParams<{ date: string }>()

    return (
        <div>
            <h1>Roster {params.date}</h1>
            <Link href="/">Main Page</Link>
        </div>
    )
}