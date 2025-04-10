import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { selectCurrentUser } from '../../features/auth/authSlice'

const PrivateRoute = ({ children }) => {
  const user = useSelector(selectCurrentUser)
  console.log(user);

  if (!user) {
    // Redirect to login page if not authenticated
    return <Navigate to="/login" replace />
  }

  // Render child components if authenticated
  return children ? children : <Outlet />
}

export default PrivateRoute