'use client'

import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import 'css/main.min.css'
import Navbar from '../components/navBar'
import Image from 'next/image'
import search from '../../public/assets/search-icon.png'
import verifyToken from '../utils/verify-token'
import Footer from '../components/footer'

export default function PostPage() {
  const router = useRouter()
  const [data, setData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [searchData, setSearchData] = useState('all')
  const [postedAtSorting, setPostedAtSorting] = useState('sorting')
  const [tagsSorting, setTagsSorting] = useState('all')
  const [allTags, setAllTags] = useState('')
  const [totalPages, setTotalPages] = useState('')
  const pageSize = 34
  const getByTitleApiUrl = `http://localhost:4000/posts/getPosts`

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1)
  }

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1)) // Ensure currentPage doesn't go below 1
  }

  // Function to navigate to a post deatail page
  const navigateToPostDatail = (postId: string) => {
    router.push(`/post/${postId}`)
  }

  const fetchData = async (apiUrl) => {
    try {
      const token = await verifyToken()

      // Fetch data with the token attached
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      // Parse the JSON response
      const result = await response.json()

      // Check if the request was successful
      if (!response.ok) {
        const errorMessage = result.message
        console.log('errorMessage', errorMessage)
        throw new Error('Failed to fetch data')
      }

      //Set State
      setData(result.posts)
      setTotalPages(result.totalPages)
    } catch (err) {
      console.log('err', err)
    }
  }

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const token = await verifyToken()
        const apiUrlToFetchTags = 'http://localhost:4000/posts/getAllTags'
        const response = await fetch(apiUrlToFetchTags, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })

        // Parse the JSON response
        const result = await response.json()

        // Check if the request was successful
        if (!response.ok) {
          const errorMessage = result.message
          console.log('errorMessage', errorMessage)
          throw new Error('Failed to fetch data')
        }

        // Add "all" to the array of tags
        const tagsWithAll: any = ['all', ...result]

        setAllTags(tagsWithAll)
      } catch (error) {
        console.log('error', error)
      }
    }
    // Call the fetchTahs
    fetchTags()
  }, [])

  useEffect(() => {
    const apiUrlToFetch = `${getByTitleApiUrl}/${searchData}/${tagsSorting}/${postedAtSorting}/${currentPage}/${pageSize}`

    if (searchData === '') {
      setSearchData('all')
    }

    fetchData(apiUrlToFetch)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    currentPage,
    pageSize,
    searchData,
    tagsSorting,
    postedAtSorting,
    getByTitleApiUrl,
    totalPages
  ])

  return (
    <>
      <Navbar />
      <div style={{ paddingLeft: '15rem', paddingRight: '15rem' }}>
        {/* Search part */}
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
              <p className="mb-2">Search by title</p>
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
                  placeholder="Enter a title to search"
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
            <Image
              src={search}
              width={30}
              height={30}
              className="rounded-5 mt-5"
              alt="SkinX Logo"
            />

            {/* Dropdowns */}
            <div className="row mt-3">
              <div className="col">
                <p className="mb-2">Type of tag</p>
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
                    {tagsSorting}
                  </button>
                  <ul className="dropdown-menu" style={{ fontSize: '1.2rem' }}>
                    {Array.isArray(allTags) && allTags.length > 0 ? (
                      allTags.map((tag, index) => (
                        <li key={index} onClick={() => setTagsSorting(tag)}>
                          <a className="dropdown-item" href="#">
                            {tag.trim()}{' '}
                          </a>
                        </li>
                      ))
                    ) : (
                      <li>
                        <a className="dropdown-item" href="#">
                          No tags available
                        </a>
                      </li>
                    )}
                  </ul>
                </div>
              </div>

              <div className="col">
                <p className="mb-2">Posted at</p>
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
                    {postedAtSorting}
                  </button>
                  <ul className="dropdown-menu" style={{ fontSize: '1.2rem' }}>
                    <li onClick={() => setPostedAtSorting('sorting')}>
                      <a className="dropdown-item" href="#">
                        sorting
                      </a>
                    </li>
                    <li onClick={() => setPostedAtSorting('oldest')}>
                      <a className="dropdown-item" href="#">
                        oldest
                      </a>
                    </li>
                    <li onClick={() => setPostedAtSorting('newest')}>
                      <a className="dropdown-item" href="#">
                        newest
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Post*/}
        <div className="row position-relative justify-content-evenly mt-5">
          {data.map((post: any, index: number) => (
            <div
              key={post.id}
              className="border border-primary border-2 col-md-5 p-5 mb-4 rounded-5"
              style={{ height: '250px' }}
              onClick={() => navigateToPostDatail(post.id)}
              role="button"
            >
              <p className="text-decoration-none text-dark">
                Title: {post.title}
              </p>
              <p className="text-secondary">Tags: {post.tags.join(', ')}</p>
              <p>Post at: {post.postedAt}</p>
            </div>
          ))}
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
