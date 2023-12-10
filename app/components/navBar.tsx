'use client'

import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import 'css/main.min.css'
import Image from 'next/image'
import Cookies from 'js-cookie'
import Link from 'next/link'
import navLogo from '../../public/assets/navLogo.svg'

const Navbar = () => {
  const [userName, setUserName] = useState<string>('Username')
  const router = useRouter()

  useEffect(() => {
    const cookieUserName = Cookies.get('userName')
    if (cookieUserName !== undefined) {
      setUserName(cookieUserName)
    }
  }, [])

  const onLogout = () => {
    Cookies.remove('my_token_key')
    Cookies.remove('userName')
    router.push('/')
  }

  return (
    <nav
      className="navbar navbar-expand-lg bg-body-tertiary"
      style={{ paddingLeft: '10rem', paddingRight: '10rem' }}
    >
      <div className="container-fluid">
        <Image
          src={navLogo}
          width={200}
          height={35}
          className="rounded-5"
          alt="Video Support Logo"
        />
        {/* <NavLogo/> */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" href="/employee">
                Home
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
