import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/UI/Button'

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="text-center max-w-md">
        <h1 className="text-9xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Page Not Found</h2>
        <p className="text-gray-600 mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex justify-center">
          <Link to="/">
            <Button className="px-6 py-3">
              Go to Homepage
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage