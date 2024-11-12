"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'


export default function LoginPage() {
  const [nickname, setNickname] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nickname, password }),
      })

      if (response.ok) {
        router.push('/employee')
      } else {
        const data = await response.json()
        setError(data.message || 'Login failed')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    }
  }
  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="row w-75 bg-white rounded-4 shadow-sm p-4">
        <div className="col-md-5 d-flex align-items-center justify-content-center p-4">
          <Image
            src="/rostergo10_final_transparent.png"
            alt="RosterGo"
            width={250}
            height={250}
            className="img-fluid"
          />
        </div>
        
        <div className="col-md-7 d-flex align-items-center">
          <div className="w-100 px-4">
            <h2 className="text-center mb-4">Admin Login</h2>

            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <input type="hidden" name="remember" defaultValue="true" />
              <div className="mb-3">
                <input
                  id="nickname"
                  name="nickname"
                  type="text"
                  required
                  placeholder="Nickname"
                  className="form-control form-control-lg"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                />
              </div>
              
              <div className="mb-4">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="Password"
                  className="form-control form-control-lg"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              
              <button
                type="submit"
                className="btn btn-primary w-100 py-2"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}