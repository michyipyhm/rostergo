"use client"

import Link from 'next/link'
import Image from 'next/image'


export default function LoginPage() {
  
  return (

    <div className="container"> 
      <div className="logo">
        <Image
            src="/rostergo10_final_transparent.png"
            alt="RosterGo"
            width={250}
            height={250}
          />
        </div>


      <div className='loginBox'>
      <form>

          <input
              id="username"
              name="username"
              type="text"
              required
              placeholder="Username"
            />

          <input
              id="password"
              name="password"
              type="password"
              required
              placeholder="Password"
            />
        
          <button
            type="submit"
          >
            Log in
          </button>
       </form>

        <div>
          Not Have Account Yet?
          <Link href="/login">
            Log in
          </Link>
        </div>

      </div>
    </div>
 
  )
}