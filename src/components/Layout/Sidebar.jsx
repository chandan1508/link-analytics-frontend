




import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../features/auth/authSlice'
import { 
  FaChartBar,
  FaLink,
  FaSignOutAlt,
  FaTimes
} from 'react-icons/fa'

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.auth.user)

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: FaChartBar },
    { name: 'My Links', path: '/mylinks', icon: FaLink },
  ]

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0  bg-opacity-50 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div 
        className={`fixed md:relative z-30 md:z-0 transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition-transform duration-300 ease-in-out flex-shrink-0 h-full`}
      >
        <div className="flex flex-col w-64 h-screen border-r border-gray-200 bg-white overflow-y-auto">

          {/* Mobile Header */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 md:hidden sticky top-0 bg-white z-10">
            <h1 className="text-xl font-bold text-gray-800">Link Analytics</h1>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="text-gray-500 hover:text-gray-600 focus:outline-none"
            >
              <FaTimes className="h-5 w-5" />
            </button>
          </div>

          {/* Desktop Header */}
          <div className="hidden md:flex md:items-center md:h-16 md:px-4 md:border-b md:border-gray-200 sticky top-0 bg-white z-10">
            <h1 className="text-xl font-bold text-gray-800">Link Analytics</h1>
          </div>

          {/* User */}
          {user && (
            <div className="flex items-center px-4 py-3 border-b border-gray-200">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                  {user.email.charAt(0).toUpperCase()}
                </div>
                <div className="ml-3 truncate">
                  <p className="text-sm font-medium text-gray-700 truncate">{user.email}</p>
                  <p className="text-xs font-medium text-gray-500">Admin</p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`
                }
              >
                <item.icon
                  className={`flex-shrink-0 h-5 w-5 mr-3 ${
                    window.location.pathname === item.path
                      ? 'text-blue-500'
                      : 'text-gray-400 group-hover:text-gray-500'
                  }`}
                />
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* Logout */}
          <div className="flex-shrink-0 px-2 py-4 border-t border-gray-200 sticky bottom-0 bg-white z-10">
            <button
              onClick={handleLogout}
              className="group flex items-center w-full px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900"
            >
              <FaSignOutAlt className="flex-shrink-0 h-5 w-5 mr-3 text-gray-400 group-hover:text-gray-500" />
              Sign out
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar
