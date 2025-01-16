import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const RegisterForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        try {
            const userInfo = await axios.post('/api/users/register', { name, email, password });
            // Store user info on localstorage
            localStorage.setItem('userInfo', JSON.stringify(userInfo.data));
            // Navigate to previous page
            navigate('/');
            // Refresh the page
            window.location.reload();
        } catch (error) {
            alert(error.response.data);
            console.log(error);
        }
    }


  return (
      <div className='font-Poppins max-w-md mx-auto shadow-lg px-3 rounded-md py-2 pt-3'>
          <h1 className='text-2xl font-semibold text-gray-700 my-2'>Create new account</h1>
          <form onSubmit={handleSubmit}>
              <label className='block text-md'>
                  <span className='text-gray-700'>Name</span>
                  <input
                      type="text"
                      placeholder='Name'
                      value={name}
                      autoComplete='true'
                      onChange={(e) => setName(e.target.value)}
                      className='px-2 text-sm border-2 py-1 mt-1 mb-3 max-w-sm block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-200 focus:ring-opacity-50'
                  />
              </label>
              <label className='block mt-1 text-md'>
                  <span className='text-gray-700'>Email</span>
                  <input
                      type="email"
                      placeholder='Email'
                      value={email}
                      autoComplete='true'
                      onChange={(e) => setEmail(e.target.value)}
                      className='px-2 text-sm border-2 py-1 mt-1 mb-3 max-w-sm block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-200 focus:ring-opacity-50'
                  />
              </label>
              <label className='block mt-1 text-md'>
                  <span className='text-gray-700'>Password</span>
                  <input
                      type="password"
                      placeholder='Password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className='px-2 text-sm border-2 py-1 mt-1 mb-3 max-w-sm block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-200 focus:ring-opacity-50'
                  />
              </label>
              <label className='block mt-1 text-md'>
                  <span className='text-gray-700'>Confirm Password</span>
                  <input
                      type="password"
                      placeholder='Confirm Password'
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className='px-2 text-sm border-2 py-1 mt-1 mb-3 max-w-sm block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-200 focus:ring-opacity-50'
                  />
              </label>
              <button
                  type="submit"
                  className='px-2 py-2 mr-3 bg-green-600 text-white text-sm my-2 rounded-lg font-semibold hover:bg-green-700 active:scale-105 duration-100 transition'>
                  Sign Up
              </button>
          </form>
        <p className='font-medium text-sm my-2'>Already have an account? <span><Link to="/login" className='text-blue-600'>Login</Link></span></p>
    </div>
  )
}

export default RegisterForm
