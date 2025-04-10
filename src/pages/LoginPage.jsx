// import React, { useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { useSelector } from 'react-redux'
// import LoginForm from '../components/Auth/LoginForm'
// import { selectCurrentUser } from '../features/auth/authSlice'

// const LoginPage = () => {
//   const user = useSelector(selectCurrentUser)
//   const navigate = useNavigate()
//   console.log(user);
  

//   useEffect(() => {
//     if (user) {
//       navigate('/dashboard')
//     }
//   }, [user, navigate])

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8">
//         <div>
//           <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//             Sign in to your account
//           </h2>
//         </div>
//         <LoginForm />
//       </div>
//     </div>
//   )
// }

// export default LoginPage


import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginForm from '../components/Auth/LoginForm';
import { selectCurrentUser } from '../features/auth/authSlice';
import Loader from '../components/UI/Loader';

const LoginPage = () => {
  const user = useSelector(selectCurrentUser);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user) {
      const redirectTo = location.state?.from?.pathname || '/dashboard';
      navigate(redirectTo, { replace: true });
    }
  }, [user, navigate, location.state]);

  if (user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;