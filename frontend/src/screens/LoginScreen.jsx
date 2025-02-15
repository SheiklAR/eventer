import React from 'react'
import { Navigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm'


const LoginScreen = () => {
  const storedUserInfo = localStorage.getItem('userInfo');

  // Immediately renders unlike useNavigate with useEffect
  if (storedUserInfo) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className='py-10 px-2 md:py-2 md:px-0 md:mx-auto'>
      <LoginForm />
    </div>
  )
};

export default LoginScreen;