// src/routes/ProtectedRoute.js
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
  const user = JSON.parse(localStorage.getItem("authData"))?.user

  return user ? <Outlet /> : <Navigate to="/login" replace />
}

export default ProtectedRoute
