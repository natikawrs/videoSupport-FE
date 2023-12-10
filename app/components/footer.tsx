import React from 'react'
import 'css/main.min.css'
import Image from 'next/image'
import logoFooter from '../../public/assets/footerLogo.svg'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer
      className="text-center text-lg-start bg-secondary text-muted"
      style={{ padding: '1rem 19rem' }}
    >
      {/* Image */}
      <span className="me-3">
        <Image
          src={logoFooter}
          width={180}
          height={80}
          className="rounded-5"
          alt="Video Support Logo"
        />
      </span>
      <section className="d-flex justify-content-center justify-content-lg-between p-2">
        <div className="me-5 mb-3 d-none d-lg-block col">
          <span className="text-white fs-0 mt-5">Empower support inquiries with video</span>
        </div>

        <div className="me-5 mb-3 d-none d-lg-block col">
        <Link className="text-white fs-0 mt-5" href={'/employee'}>Home</Link>
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
