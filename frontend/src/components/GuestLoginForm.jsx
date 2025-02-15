import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


const GuestLoginForm = () => {
  const [name, setName] = useState('');


  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        // Store user info on localstorage
        localStorage.setItem('isGuest', JSON.stringify(true));
        localStorage.setItem('userInfo', JSON.stringify({ name }));
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
    <h2 className='text-3xl font-semibold mb-4 mx-auto'>Guest LogIn</h2>
      <form onSubmit={handleSubmit}>
        <label className=''>
          Name
          <input
            type="text"
            placeholder='Enter name'
            value={name}
            autoComplete='on'
            onChange={(e) => setName(e.target.value)}
            className='block w-full font-light text-sm px-2 py-2 my-1 rounded-sm text-black mb-6'
          />
        </label>

        <button
          type="submit"
          className='px-3 py-2 mt-4 bg-green-400 text-white text-xs rounded-lg font-semibold hover:bg-green-600 active:scale-105 duration-100 transition'
        >LogIn as guest</button>
      </form>

    </div>
  )
}

export default GuestLoginForm