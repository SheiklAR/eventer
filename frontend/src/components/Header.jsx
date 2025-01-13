import React from 'react'
import { Link } from 'react-router-dom';

/**
 * Header Component
 * Displays the application header with navigation links.
 */
const Header = () => {

    // Navigation links can be dynamically updated if needed
    const navLinks = [
        { path: '/create', label: 'Create Event' },
        { path: '/login', label: 'Login' },
        { path: '/register', label: 'Register' },
    ];

    return (
        <header className='bg-sky-400 py-4 px-2 items-center mb-4'>
            <nav className='max-w-6xl mx-auto flex justify-between items-center'>
                <h1 className='font-bold text-3xl font-Playwrite text-black'>
                    <Link to='/'>Eventer</Link>
                </h1>
                <div className='flex space-x-2'>
                    {navLinks.map((link, index) => (
                        <Link
                            key={index}
                            to={link.path}
                            className='text-white font-semibold hover:underline hover:text-blue-500 transition'
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            </nav>
        </header>
    )
}

export default Header