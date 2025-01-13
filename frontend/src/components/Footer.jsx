import React from 'react'

/**
 * Footer Component
 * Displays the application footer with the current year.
 */
const Footer = () => {
    const currentYear = new Date().getFullYear();

  return (
      <footer className='text-gray-400 text-center text-sm py-3 my-2'>
          <p>Eventer &copy; {currentYear}</p>
      </footer>
  )
}

export default Footer