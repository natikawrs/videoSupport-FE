'use client'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import 'css/main.min.css'
import ErrLoginModal from '../components/errModal'
import Footer from '../components/footer'
import Navbar from '../components/navBar'

export default function CreateEmployeePage() {
  const router = useRouter()

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [department, setDepartment] = useState('')
  const [salary, setSalary] = useState<number | undefined>(undefined)
  const [error, setError] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = (errorMessage) => {
    setError(errorMessage)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const handleCreateEmployee = async () => {
    try {
        // API endpoint for create employee
      const apiUrl = await 'http://localhost:4000/employees/createEmployee'

      // Make payload
      const requestBody = {
        firstName,
        lastName,
        department,
        salary
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

      router.push('/employee')
      return response
    } catch (err) {
      console.log('err', err)
    }
  }

  return (
    <>
      <Navbar />
      <section className="vh-100 d-flex flex-column justify-content-center">
        <div className="container-fluid h-custom">
          <div className="row justify-content-center align-items-center h-100">
            {/* Centering the row */}
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form>
                <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                  <p className="lead fw-normal mb-0 me-3">
                    Input employee details
                  </p>
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

                {/* firstName input */}
                <div className="form-outline mb-4 border-primary">
                  <input
                    type="firstname"
                    id="form3Example3"
                    className="form-control form-control-lg"
                    placeholder="Enter Firstname"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <label className="form-label" htmlFor="form3Example3">
                    Firstname
                  </label>
                </div>

                {/* lastName input */}
                <div className="form-outline mb-4 border-primary">
                  <input
                    type="lastname"
                    id="form3Example3"
                    className="form-control form-control-lg"
                    placeholder="Enter Lastname"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  <label className="form-label" htmlFor="form3Example3">
                    Lastname
                  </label>
                </div>

                {/* Department input */}
                <div className="form-outline mb-4 border-primary">
                  <input
                    type="department"
                    id="form3Example3"
                    className="form-control form-control-lg"
                    placeholder="Enter department"
                    onChange={(e) => setDepartment(e.target.value)}
                  />
                  <label className="form-label" htmlFor="form3Example3">
                    Department
                  </label>
                </div>

                {/* Salary input */}
                <div className="form-outline mb-3 border-primary">
                  <input
                    type="number"
                    id="form3Example4"
                    className="form-control form-control-lg"
                    placeholder="Enter salary"
                    onChange={(e) => setSalary(parseFloat(e.target.value))}
                  />
                  <label className="form-label" htmlFor="form3Example4">
                    Salary
                  </label>
                </div>

                <div className="text-center mt-4 pt-2">
                  {/* Centering the button */}
                  <button
                    type="button"
                    className="btn btn-primary btn-lg"
                    style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
                    onClick={handleCreateEmployee}
                  >
                    <a
                      className="btn btn-primary btn-lg text-decoration-none"
                      style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
                    >
                      Create Employee
                    </a>
                  </button>
                </div>
              </form>
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
      <Footer />
    </>
  )
}
