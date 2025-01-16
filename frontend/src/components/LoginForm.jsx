import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userInfo = await axios.post('/api/users/login', { email, password });

      // Store user info on localstorage
      localStorage.setItem('userInfo', JSON.stringify(userInfo.data));
      // Navigate to previous page
      navigate(-1);
      // Refresh the page
      setTimeout(() => {
        window.location.reload();
      }, 100)
    } catch (error) {
      alert(error.response.data);
      console.log(error);
    }
    
  }


  return (
    <div className='max-w-md mx-auto my-auto px-4 py-8 rounded-md bg-gray-700 text-white font-Poppins font-medium'>
      <h2 className='text-3xl font-semibold mb-4 mx-auto'>LogIn</h2>
      <form onSubmit={handleSubmit}>
        <label className=''>
          Email
          <input
            type="email"
            placeholder='Enter email'
            value={email}
            autoComplete='on'
            onChange={(e) => setEmail(e.target.value)}
            className='block w-full font-light text-sm px-2 py-2 my-1 rounded-sm text-black mb-6'
          />
        </label>
        <label className=''>
          Password
          <input
            type="password"
            placeholder='Enter password'
            value={password}
            autoComplete='on'
            onChange={(e) => setPassword(e.target.value)}
            className='block w-full font-light text-sm px-2 py-2 my-1 rounded-sm text-black'
          />
        </label>

        <button
          type="submit"
          className='px-3 py-2 mt-4 bg-green-400 text-white text-xs rounded-lg font-semibold hover:bg-green-600 active:scale-105 duration-100 transition'
        >Sign in</button>

        <p className='mt-4 text-sm'>Don't have an account? <Link to='/register' className='text-blue-400 hover:text-blue-500'>Sign up</Link></p>
      </form>

    </div>
  )
}

export default LoginForm