


import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../../features/auth/authThunks'
import Button from '../UI/Button'
import Loader from '../UI/Loader'

const LoginForm = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    })
  }

  // const handleSubmit = async (e) => {
  //   e.preventDefault()
  //   setIsLoading(true)
  //   setError(null)
    
  //   try {
  //     await dispatch(login(credentials)).unwrap()
  //   } catch (err) {
  //     console.log(err.message)
  //     setError(err.message || 'Login failed')
  //   } finally {
  //     setIsLoading(false)
  //   }
  // }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
  
    try {
      const res = await dispatch(login(credentials)) // no .unwrap()
      // console.log('Login successful:', res)
    } catch (err) {
      // console.log(err.message)
      setError(err.message || 'Login failed')
    } finally {
      setIsLoading(false)
    }
  }
  

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      <div className="rounded-md shadow-sm space-y-4">
        <div>
          <label htmlFor="email" className="sr-only">Email address</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
            placeholder="Email address"
            value={credentials.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password" className="sr-only">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
          />
        </div>
      </div>

      <div>
        <Button
          type="submit"
          className="w-full flex justify-center"
          disabled={isLoading}
        >
          {isLoading ? <Loader size="sm" className="mr-2" /> : null}
          Sign in
        </Button>
      </div>
    </form>
  )
}

export default LoginForm