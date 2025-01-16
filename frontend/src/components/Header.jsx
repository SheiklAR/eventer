import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


/**
 * Header Component
 * Displays the application header with navigation links. 
 */
const Header = () => {
    const [userInfo, setUserInfo] = useState(null);
    
    const navigate = useNavigate();

    // Navigation links can be dynamically updated if needed
    const navLinks = [
        { path: '/create', label: 'Create Event' },
        { path: '/login', label: 'Login' },
        { path: '/register', label: 'Register' },
    ];

    // Function to check userInfo in the local storage
    const checkUserInfo = () => {
        const storedUserInfo = localStorage.userInfo ? JSON.parse(localStorage.userInfo) : null;
        setUserInfo(storedUserInfo);
    }

    useEffect(() => {
        checkUserInfo();
        
        // Add event listener to detect changes in localStorage
        const handleStorageChange = () => checkUserInfo();
        window.addEventListener('storage', handleStorageChange);

        // Cleanup listener on unmount
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        }

    }, [])
    

    const handleClick = async (e) => {
        e.preventDefault()
        alert('You will be logged out');
        try {
            // Clear the cookie
            await axios.post('/api/users/logout');
            // Clear the local storage
            localStorage.setItem('userInfo', null);
    
            navigate('/login');

            // Refresh
            window.location.reload();

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <header className='bg-sky-400 py-4 px-2 items-center mb-4 font-Poppins'>
            <nav className='max-w-6xl mx-auto flex justify-between items-center'>
                <h1 className='font-bold text-3xl font-Playwrite text-black'>
                    <Link to='/'>Eventer</Link>
                </h1>
                <div className='flex space-x-2'>
                    {!userInfo ? navLinks.map((link, index) => (
                        <Link
                            key={index}
                            to={link.path}
                            className='text-white font-semibold hover:underline hover:text-blue-500 transition'
                        >
                            {link.label}
                        </Link>
                    )) :
                        <div className="flex space-x-2 items-center justify-between">
                            <Link
                                className='px-2 py-1 bg-white rounded-md text-blue-500 font-semibold text-sm hover:text-blue-500 transition'
                            >
                                {userInfo.name}
                            </Link>

                            <button
                                className="text-white text-medium hover:text-gray-300"
                                onClick={handleClick}
                            >
                                Logout
                            </button>

                        </div>
                    }
                </div>
            </nav>
        </header>
    )
};

export default Header