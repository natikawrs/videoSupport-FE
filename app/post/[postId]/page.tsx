'use client'

import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import 'css/main.min.css'
import verifyToken from '@/app/utils/verify-token'
import Navbar from '@/app/components/navBar'
import Footer from '@/app/components/footer'

export default function PostDetailPage({ params }) {
  const router = useRouter()
  const [data, setData] = useState<
    | {
        id: string
        title: string
        content: string
        postedAt: string
        postedBy: string
        tags: string[]
      }
    | undefined
  >()

  useEffect(() => {
    // API endpoint URL
    const apiUrl = `http://localhost:4000/posts/getPostById/${params.postId}`
    // Function to fetch data from the API
    const fetchData = async () => {
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

        setData(result)
      } catch (err) {
        console.log('err', err)
      }
    }
    fetchData()
  }, [])

  return (
    <>
      <Navbar />
      <div
        style={{ backgroundColor: '#f0f0f0' }}
        className="row position-relative justify-content-evenly"
      >
        <div
          className="border border-primary border-2 col-md-5 p-5 mb-4 rounded-5 mt-5"
          style={{
            boxShadow: '5px 8px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#ffffff'
          }}
          role="button"
        >
          <p className="text-decoration-none text-dark">Title: {data?.title}</p>
          <p className="text-decoration-none text-dark">Content: </p>
          <li
            className="list-group-item px-3 border-0"
            dangerouslySetInnerHTML={{ __html: data?.content }}
          />
          <p className="text-decoration-none text-dark">
            Post at: {data?.postedAt}
          </p>
          <p className="text-decoration-none text-dark">
            Post by: {data?.postedBy}
          </p>
          <p>Tags: {data?.tags.join(', ')}</p>
        </div>
      </div>
      <Footer />
    </>
  )
}
