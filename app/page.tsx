'use client'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import 'css/main.min.css'
import Image from 'next/image'
import bg from '../public/assets/skinXbg.png'
import Cookies from 'js-cookie'
import ErrLoginModal from './components/errLoginModal'

export default function LoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userName, setUserName] = useState('')
  const [isLogin, setIsLogin] = useState(true)
  const [error, setError] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = (errorMessage) => {
    setError(errorMessage)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }
  const handleLogin = async () => {
    try {
      // API endpoint for login
      const apiUrl = 'http://localhost:4000/users/login'

      // Make authentication payload
      const requestBody = {
        email,
        password
      }

      // Make the API call to login
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      })

      const result = await response.json()

      // Check if the request was successful
      if (!response.ok) {
        const errorMessage = result.message
        console.log('errorMessage', errorMessage)
        openModal(errorMessage)
        return
      }

      const token = result.token
      const userName = result?.user?.userName

      // Save the token and userName to local storage
      Cookies.set('my_token_key', token)
      Cookies.set('userName', userName)

      router.push('/post')
    } catch (err) {
      console.log('err', err)
    }
  }

  // Function to handle registration
  const handleRegistrationState = () => {
    setIsLogin(false)
  }

  const handleLoginState = () => {
    setIsLogin(true)
  }

  const handleRegister = async () => {
    try {
      // API endpoint for register
      const apiUrl = await 'http://localhost:4000/users/register'

      // Make authentication payload
      const requestBody = {
        email,
        password,
        userName
      }

      // Make the API call to register
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      })

      // Check if the request was successful
      if (!response.ok) {
        const result = await response.json()
        const errorMessage = result.message
        openModal(errorMessage)
        return
      }

      setIsLogin(true)
      return response
    } catch (err) {
      console.log('err', err)
    }
  }

  return (
    <section className="vh-100 d-flex flex-column justify-content-center">
      <div className="container-fluid h-custom">
        <div className="row justify-content-evenly align-items-center h-100">
          {isLogin ? (
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form>
                <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                  <p className="lead fw-normal mb-0 me-3">Sign in</p>
                  <button
                    type="button"
                    className="btn btn-secondary btn-floating mx-1"
                  ></button>
                  <button
                    type="button"
                    className="btn btn-secondary btn-floating mx-1"
                  ></button>
                  <button
                    type="button"
                    className="btn btn-secondary btn-floating mx-1"
                  ></button>
                </div>

                <div className="divider d-flex align-items-center my-4"></div>

                {/* Email input */}
                <div className="form-outline mb-4 border-primary">
                  <input
                    type="email"
                    id="form3Example3"
                    className="form-control form-control-lg"
                    placeholder="Enter a valid email address"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label className="form-label" htmlFor="form3Example3">
                    Email address
                  </label>
                </div>

                {/* Password input */}
                <div className="form-outline mb-3 border-primary">
                  <input
                    type="password"
                    id="form3Example4"
                    className="form-control form-control-lg"
                    placeholder="Enter password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label className="form-label" htmlFor="form3Example4">
                    Password
                  </label>
                </div>

                <div className="text-center text-lg-start mt-4 pt-2">
                  <button
                    type="button"
                    className="btn btn-primary btn-lg"
                    style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
                    onClick={handleLogin}
                  >
                    <a
                      className="btn btn-primary btn-lg text-decoration-none"
                      style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
                    >
                      Login
                    </a>
                  </button>
                  <p className="small fw-bold mt-2 pt-1 mb-0">
                    Dont have an account?{' '}
                    <a
                      href="#!"
                      className="link-danger"
                      onClick={handleRegistrationState}
                    >
                      Register
                    </a>
                  </p>
                </div>
              </form>
            </div>
          ) : (
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form>
                <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                  <p className="lead fw-normal mb-0 me-3">Register</p>
                  <button
                    type="button"
                    className="btn btn-secondary btn-floating mx-1"
                  ></button>
                  <button
                    type="button"
                    className="btn btn-secondary btn-floating mx-1"
                  ></button>
                  <button
                    type="button"
                    className="btn btn-secondary btn-floating mx-1"
                  ></button>
                </div>

                <div className="divider d-flex align-items-center my-4"></div>

                {/* UserName input */}
                <div className="form-outline mb-4 border-primary">
                  <input
                    type="username"
                    id="form3Example3"
                    className="form-control form-control-lg"
                    placeholder="Enter uesrname"
                    onChange={(e) => setUserName(e.target.value)}
                  />
                  <label className="form-label" htmlFor="form3Example3">
                    Username
                  </label>
                </div>

                {/* Email input */}
                <div className="form-outline mb-4 border-primary">
                  <input
                    type="email"
                    id="form3Example3"
                    className="form-control form-control-lg"
                    placeholder="Enter email address"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label className="form-label" htmlFor="form3Example3">
                    Email address
                  </label>
                </div>

                {/* Password input */}
                <div className="form-outline mb-3 border-primary">
                  <input
                    type="password"
                    id="form3Example4"
                    className="form-control form-control-lg"
                    placeholder="Enter password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label className="form-label" htmlFor="form3Example4">
                    Password
                  </label>
                </div>

                <div className="text-center text-lg-start mt-4 pt-2">
                  <button
                    type="button"
                    className="btn btn-primary btn-lg"
                    style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
                    onClick={handleRegister}
                  >
                    <a
                      className="btn btn-primary btn-lg text-decoration-none"
                      style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
                    >
                      Register
                    </a>
                  </button>
                  <p className="small fw-bold mt-2 pt-1 mb-0">
                    Already have an account?{' '}
                    <a
                      href="#!"
                      className="link-danger"
                      onClick={handleLoginState}
                    >
                      Login
                    </a>
                  </p>
                </div>
              </form>
            </div>
          )}

          {/* Img Logo */}
          <div className="col-md-9 col-lg-6 col-xl-5">
            <Image
              src={bg}
              width={500}
              height={500}
              className="rounded-5"
              alt="SkinX Logo"
            />
          </div>

          {/* Err Modal */}
          {isModalOpen && (
            <ErrLoginModal
              isModalOpen={isModalOpen}
              closeModal={closeModal}
              errorMessage={error}
            />
          )}
        </div>
      </div>
    </section>
  )
}
