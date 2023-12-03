import React from 'react'
import 'css/main.min.css'
import Image from 'next/image'
import logoFooter from '../../public/assets/skinx-logo-white.svg'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer
      className="text-center text-lg-start bg-success text-muted"
      style={{ padding: '5rem 19rem' }}
    >
      {/* Image */}
      <span className="me-3">
        <Image
          src={logoFooter}
          width={180}
          height={80}
          className="rounded-5"
          alt="SkinX Logo"
        />
      </span>
      <section className="d-flex justify-content-center justify-content-lg-between p-4">
        <div className="me-5 mb-3 d-none d-lg-block col">
          <Link className="text-white fs-0 mt-5" href={'/post'}>Home</Link>
          <br />
          <span className="text-white fs-0 mt-5">About Skinx</span>
          <br />
          <span className="text-white fs-0 mt-5">Privacy Notice</span>
        </div>

        <div className="me-5 mb-3 d-none d-lg-block col">
          <span className="text-white fs-0 mt-5">How to use</span>
          <br />
          <span className="text-white fs-0 mt-5">Content</span>
        </div>

        <div className="me-5 mb-3 d-none d-lg-block col">
          <span className="text-white fs-0 mt-5">Our Tean</span>
          <br />
          <span className="text-white fs-0 mt-5">Terms and Conditions</span>
          <br />
          <span className="text-white fs-0 mt-5">Cookie Policy</span>
        </div>
      </section>
    </footer>
  )
}

export default Footer
