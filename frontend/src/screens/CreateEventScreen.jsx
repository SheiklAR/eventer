import { React, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


// isLoggedIn => if user info is not null
// if not redirect to login
// else
/* form
event name
event description
event date
event time
event category
event image
*/


const CreateEventScreen = () => {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [category, setCategory] = useState('');

    const navigate = useNavigate()
    
    useEffect(() => {
        const storedUserInfo = localStorage.getItem('userInfo');
        console.log(storedUserInfo);
        if (storedUserInfo == null) {
            navigate('/login');
            setIsAuthorized(false);
        } else {
            setIsAuthorized(true)
        }
    }, []);


    if (isAuthorized === null) {
        return <div>loading...</div>
    }
    

    const handleSubmit = (e) => {
        e.preventDefault();
    }


  return (
        <div className='max-w-md my-auto px-4 py-8 rounded-md shadow-xl text-gray-800 font-Poppins font-medium'>
          <h2 className='text-3xl font-semibold mb-4 mx-auto'>Add new event</h2>
          <form onSubmit={handleSubmit}>
            <label className=''>
              Title
              <input
                type="title"
                placeholder='Enter title'
                value={title}
                autoComplete='on'
                onChange={(e) => setTitle(e.target.value)}
                className='block w-full font-light text-sm px-2 py-2 my-1 rounded-sm text-black mb-6 border-2'
              />
            </label>
            <label className=''>
              Category
              <input
                type="category"
                placeholder='Enter category'
                value={category}
                autoComplete='on'
                onChange={(e) => setCategory(e.target.value)}
                className='block w-full font-light text-sm px-2 py-2 my-1 rounded-sm text-black mb-6 border-2'
              />
            </label>
            <label className=''>
              Image
              <input
                type="file"
                placeholder='choose file'
                value={image}
                autoComplete='on'
                onChange={(e) => setImage(e.target.value)}
                className='block w-full font-light text-sm px-2 py-2 my-1 rounded-sm text-black mb-6 border-2'
              />
            </label>
            <label className=''>
              Description
              <input
                type="text"
                placeholder='Enter description'
                value={description}
                autoComplete='on'
                onChange={(e) => setDescription(e.target.value)}
                className='block w-full font-light text-sm px-2 py-2 my-1 rounded-sm text-black mb-6 border-2'
              />
            </label>
            <label className=''>
              Date
              <input
                type="date"
                placeholder='Enter date'
                value={date}
                autoComplete='on'
                onChange={(e) => setDate(e.target.value)}
                className='block w-full font-light text-sm px-2 py-2 my-1 rounded-sm text-black mb-6 border-2'
              />
            </label>
            <label className=''>
              Time
              <input
                type="time"
                placeholder='Enter time'
                value={time}
                autoComplete='on'
                onChange={(e) => setTime(e.target.value)}
                className='block w-full font-light text-sm px-2 py-2 my-1 rounded-sm text-black mb-6 border-2'
              />
            </label>
    
            <button
              type="submit"
              className='px-3 py-2 mt-4 bg-green-400 text-white text-xs rounded-lg font-semibold hover:bg-green-600 active:scale-105 duration-100 transition'
            >Create Event</button>
    
          </form>
    
        </div>
  )
}

export default CreateEventScreen