'use client'

import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import 'css/main.min.css'
import Navbar from '@/app/components/navBar'
import Footer from '@/app/components/footer'
import ErrLoginModal from '../../components/errModal'

export default function EmployeeDetailPage({ params }) {
  const router = useRouter()
  const [error, setError] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [data, setData] = useState({
    id: '',
    firstName: '',
    lastName: '',
    department: '',
    salary: ''
  })

  const [updatedData, setUpdatedData] = useState({
    firstName: '',
    lastName: '',
    department: '',
    salary: ''
  })

  const handleInputChange = (e, field) => {
    // Check if the value is an empty string
    if (e.target.value === '') {
      setData((prevData) => ({
        ...prevData,
        [field]: '' // Set the field to an empty string
      }));
    } else if (field === 'salary') {
      // If the field is 'salary', convert the value to a number
      const numericValue = Number(e.target.value);
      if (!isNaN(numericValue)) {
        // Update the field in the updatedData state as a number
        setUpdatedData((prevData) => ({
          ...prevData,
          [field]: numericValue
        }));
      } else {
        console.error('Salary must be a valid number');
      }
    } else {
      // Update the field in the updatedData state
      setUpdatedData((prevData) => ({
        ...prevData,
        [field]: e.target.value
      }));
    }
  };
  

  const openModal = (errorMessage) => {
    setError(errorMessage)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }
  const handleUpdateEmployee = async () => {
    try {
      // API endpoint for update employee
      const apiUrl =
        await `http://localhost:4000/employees/updateEmployee/${params.employeeId}`

      // Make payload
      const requestBody = {
        firstName: updatedData.firstName || data.firstName || '',
        lastName: updatedData.lastName || data.lastName || '',
        department: updatedData.department || data.department || '',
        salary: updatedData.salary || data.salary || ''
      }

      // Make the API call to register
      const response = await fetch(apiUrl, {
        method: 'PATCH',
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

  const handleDeleteEmployee = async () => {
    try {
      // API endpoint for delete employee
      const apiUrl =
        await `http://localhost:4000/employees/deleteEmployee/${params.employeeId}`

      // Make the API call to register
      const response = await fetch(apiUrl, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
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

  useEffect(() => {
      // API endpoint for get employee by id
    const apiUrl = `http://localhost:4000/employees/getEmployeeById/${params.employeeId}`
    // Function to fetch data from the API
    const fetchData = async () => {
      try {
        // Fetch data
        const response = await fetch(apiUrl, {
          method: 'GET'
        })

        // Parse the JSON response
        const result = await response.json()

        // Check if the request was successful
        if (!response.ok) {
          const errorMessage = result.message
          console.log('errorMessage', errorMessage)
          throw new Error('Failed to fetch data')
        }

        setData(result)
      } catch (err) {
        console.log('err', err)
      }
    }
    fetchData()
  }, [params.employeeId])

  return (
    <>
      <Navbar />

      <div
        style={{ backgroundColor: '#f0f0f0' }}
        className="row position-relative justify-content-evenly"
      >
        <div
          className="border border-primary border-2 col-md-5 p-5 mb-4 rounded-5 mt-5 mb-5"
          style={{
            boxShadow: '5px 8px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#ffffff'
          }}
          role="button"
        >
          <form>
            {/* firstName input */}
            <div className="form-outline mb-4 border-primary">
              <input
                type="text"
                id="form3Example3"
                className="form-control form-control-lg"
                placeholder="Enter Firstname"
                value={updatedData.firstName || data.firstName || ''}
                onChange={(e) => handleInputChange(e, 'firstName')}
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
                value={updatedData.lastName || data.lastName || ''}
                onChange={(e) => handleInputChange(e, 'lastName')}
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
                value={updatedData.department || data.department || ''}
                onChange={(e) => handleInputChange(e, 'department')}
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
                value={updatedData.salary || data.salary || ''}
                onChange={(e) => handleInputChange(e, 'salary')}
              />
              <label className="form-label" htmlFor="form3Example4">
                Salary
              </label>
            </div>
            <div className="text-center mt-5 pt-2">
              {/* Centering the button */}
              <button
                type="button"
                className="btn btn-primary btn-lg"
                style={{ marginLeft: '1rem', marginRight: '1rem' }}
                onClick={handleUpdateEmployee}
              >
                <a
                  className="btn btn-primary btn-lg text-decoration-none"
                  style={{ paddingLeft: '2rem', paddingRight: '2rem' }}
                >
                  Update Employee
                </a>
              </button>

              <button
                type="button"
                className="btn  btn-lg border border-secondary"
                style={{ marginLeft: '1rem', marginRight: '1rem' }}
                onClick={handleDeleteEmployee}
              >
                <a className="btn btn-lg text-decoration-none">
                  Delete Employee
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
      <Footer />
    </>
  )
}
