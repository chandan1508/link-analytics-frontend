// src/routes/PublicRoute.js
import { Navigate, Outlet } from 'react-router-dom'

const PublicRoute = () => {
  const user = JSON.parse(localStorage.getItem("authData"))?.user

  return user ? <Navigate to="/dashboard" replace /> : <Outlet />
}

export default PublicRoute
