'use client'

import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import 'css/main.min.css'
import Navbar from '../components/navBar'
import Footer from '../components/footer'

export default function EmployeePage() {
  const router = useRouter()
  const [data, setData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [searchData, setSearchData] = useState('all')
  const [salarySorting, setSalarySorting] = useState('sorting')
  const [departmentsSorting, setDepartmentsSorting] = useState('all')
  const [allTags, setAllTags] = useState('')
  const [totalPages, setTotalPages] = useState('')
  const pageSize = 10

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1)
  }

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1)) // Ensure currentPage doesn't go below 1
  }

  // Function to navigate to a post deatail page
  const navigateToEmployeeDetail = (id: string) => {
    router.push(`/employee/${id}`)
  }

  const navigateToCreateEmployee = () => {
    router.push('/create')
  }

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        // API endpoint for fetch all departments in db
        const apiUrlToFetchDepartments =
          'http://localhost:4000/employees/getAllDepartments'
        const response = await fetch(apiUrlToFetchDepartments, {
          method: 'GET'
        })

        // Parse the JSON response
        const result = await response.json()

        // Check if the request was successful
        if (!response.ok) {
          const errorMessage = result.message
          console.log('errorMessage', errorMessage)
          throw new Error('Failed to fetch departments')
        }

        // Add "all" to the array of departments
        const tagsWithAll: any = ['all', ...result]

        setAllTags(tagsWithAll)
      } catch (error) {
        console.log('error', error)
      }
    }
    // Call the fetchTahs
    fetchDepartments()
  }, [])

  useEffect(() => {
    async function fetchData() {
      // API endpoint for get all employee upon filter
      const getAllEmployeesApiUrl =
        'http://localhost:4000/employees/getAllEmployees'

      try {
        if (searchData === '') {
          setSearchData('all')
        }

        const requestBody = {
          firstName: searchData,
          department: departmentsSorting,
          orderBy: salarySorting,
          page: currentPage,
          pageSize
        }

        const response = await fetch(getAllEmployeesApiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestBody)
        })

        // Handle the response
        const result = await response.json()

        // Check if the request was successful
        if (!response.ok) {
          const errorMessage = result.message
          console.log('errorMessage', errorMessage)
          throw new Error('Failed to fetch data')
        }

        //Set State
        setData(result.employees)
        setTotalPages(result.totalPages)
        // Set state or perform other actions with the fetched data
        console.log(data)
      } catch (error) {
        // Handle errors (e.g., log or show an error message)
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [currentPage, pageSize, searchData, departmentsSorting, salarySorting])

  return (
    <>
      <Navbar />
      <div style={{ paddingLeft: '15rem', paddingRight: '15rem' }}>
        {/* 
         part */}
        <div className="container mt-5">
          <div
            className="input-group justify-content-center border border-primary border-3 p-5 "
            style={{
              borderBottomLeftRadius: '1.5rem',
              borderBottomRightRadius: '1.5rem',
              boxShadow: '5px 8px rgba(0, 0, 0, 0.1)'
            }}
          >
            <div>
              {/* Text above search box */}
              <p className="mb-2">Search by firstName</p>
              <div
                className="form-outline border border-primary border-2 rounded"
                data-mdb-input-init
                style={{ width: '800px' }}
              >
                {/* Search box */}
                <input
                  type="text"
                  id="form1"
                  className="form-control form-control-lg border-0"
                  placeholder="Enter firstName to search"
                  onChange={(e) => setSearchData(e.target.value)}
                  onBlur={(e) => {
                    const trimmedValue = e.target.value.trim()
                    setSearchData(trimmedValue === '' ? 'all' : trimmedValue)
                    console.log(
                      'Search data:',
                      trimmedValue === '' ? 'all' : trimmedValue
                    )
                    console.log('(trimmedValue:', trimmedValue)
                  }}
                />
              </div>
            </div>

            {/* Dropdowns */}
            <div className="row mt-3">
              <div className="col">
                <p className="mb-2">Department</p>
                <div className="dropdown">
                  <button
                    className="btn dropdown-toggle border border-secondary border-2 rounded"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{
                      fontSize: '1rem',
                      padding: '15px 20px',
                      width: '200px'
                    }}
                  >
                    {departmentsSorting}
                  </button>
                  <ul className="dropdown-menu" style={{ fontSize: '1.2rem' }}>
                    {Array.isArray(allTags) && allTags.length > 0 ? (
                      allTags.map((department, index) => (
                        <li
                          key={index}
                          onClick={() => setDepartmentsSorting(department)}
                        >
                          <a className="dropdown-item" href="#">
                            {department.trim()}{' '}
                          </a>
                        </li>
                      ))
                    ) : (
                      <li>
                        <a className="dropdown-item" href="#">
                          No departments available
                        </a>
                      </li>
                    )}
                  </ul>
                </div>
              </div>

              <div className="col">
                <p className="mb-2">Salary</p>
                <div className="dropdown">
                  <button
                    className="btn dropdown-toggle border border-secondary border-2 rounded"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{
                      fontSize: '1rem',
                      padding: '15px 20px',
                      width: '200px'
                    }}
                  >
                    {salarySorting}
                  </button>
                  <ul className="dropdown-menu" style={{ fontSize: '1.2rem' }}>
                    <li onClick={() => setSalarySorting('sorting')}>
                      <a className="dropdown-item" href="#">
                        sorting
                      </a>
                    </li>
                    <li onClick={() => setSalarySorting('minTomax')}>
                      <a className="dropdown-item" href="#">
                        min To max
                      </a>
                    </li>
                    <li onClick={() => setSalarySorting('maxTomin')}>
                      <a className="dropdown-item" href="#">
                        max To min
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col">
                <p className="mb-2">Create Employee</p>
                <button
                  type="button"
                  className="btn btn-primary btn-lg"
                  style={{
                    paddingLeft: '2.5rem',
                    paddingRight: '2.5rem',
                    width: '200px'
                  }}
                  onClick={() => navigateToCreateEmployee()}
                >
                  <a
                    className="btn btn-primary btn-lg text-decoration-none"
                    style={{
                      width: '100%'
                    }}
                  >
                    Create
                  </a>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Post*/}
        <div className="row position-relative justify-content-evenly mt-5">
          {data && data.length > 0 ? (
            data.map((employee: any) => (
              <div
                key={employee.id}
                className="border border-primary border-2 col-md-5 p-5 mb-4 rounded-5"
                style={{ height: '250px' }}
                onClick={() => navigateToEmployeeDetail(employee.id)}
                role="button"
              >
                <p className="text-decoration-none text-dark">
                  First name: {employee.firstName}
                </p>
                <p className="text-decoration-none text-dark">
                  Last name: {employee.lastName}
                </p>
                <p className="text-secondary">
                  Department: {employee.department}
                </p>
                <p>Salary: {employee.salary} THB</p>
              </div>
            ))
          ) : (
            <p>No data available</p>
          )}
        </div>

        {/* Pagination */}
        <div className="d-flex align-items-center justify-content-center p-5">
          <button
            className="btn border border-secondary border-2 rounded me-3"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Previous Page
          </button>
          <span className="me-3">
            Current Page: {currentPage} / {totalPages}
          </span>
          <button
            className="btn border border-secondary border-2 rounded"
            onClick={handleNextPage}
            disabled={currentPage === Number(totalPages)}
          >
            Next Page
          </button>
        </div>
      </div>
      <Footer />
    </>
  )
}
