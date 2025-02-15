import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import getCurrentTime from '../utils/getCurrentTime';
import  getTodaysDate from '../utils/getTodaysDate';
import uploadForm from '../utils/uploadForm';



const NewEventForm = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    image: null,
    description: '',
    date: '',
    time: '',
    category: '',
  });
    
  const navigate = useNavigate()
  const today = getTodaysDate();
  const currentTime = getCurrentTime();
    

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
    
  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      const res = await uploadForm({ formData });
      setLoading(false);
      alert(res.message);
      navigate('/')
    } catch (error) {
      alert("Error creating event: " + (error.response?.data?.message || error.message));
    }
        
  }


  return (
    <div className='max-w-md mx-auto my-auto px-4 py-8 rounded-md shadow-xl text-gray-800 font-Poppins font-medium'>
      <h2 className='text-3xl font-semibold mb-4 mx-auto'>Add new event</h2>
      <form onSubmit={handleSubmit}>
        <label className=''>
          Title
          <input
            type="title"
            name="name"
            placeholder='Enter title'
            value={formData.name}
            autoComplete='on'
            onChange={handleChange}
            required
            className='block w-full font-light text-sm px-2 py-2 my-1 rounded-sm text-black mb-6 border-2'
          />
        </label>
        <label className=''>
          Category
          {/* <input
            type="category"
            name="category"
            placeholder='Enter category'
            value={formData.category}
            autoComplete='on'
            onChange={handleChange}
            required
            className='block w-full font-light text-sm px-2 py-2 my-1 rounded-sm text-black mb-6 border-2'
          /> */}
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className='block w-full font-light text-sm px-2 py-2 my-1 rounded-sm text-black mb-6 border-2'
          >
            <option value="" disabled>Select a category</option>
            <option value="Tech & Science">Tech & Science</option>
            <option value="Cooking">Cooking</option>
            <option value="Design">Design</option>
            <option value="Gaming">Gaming</option>
            <option value="Marketing">Marketing</option>
            <option value="Motivation">Motivation</option>
          </select>
        </label>
        <label className=''>
          Image
          <input
            type="file"
            name="image"
            placeholder='choose file'
            onChange={handleFileChange}
            required
            className='block w-full font-light text-sm px-2 py-2 my-1 rounded-sm text-black mb-6 border-2'
          />
        </label>
        <label className=''>
          Description
          <input
            type="text"
            name="description"
            placeholder='Enter description'
            value={formData.description}
            autoComplete='on'
            onChange={handleChange}
            required
            className='block w-full font-light text-sm px-2 py-2 my-1 rounded-sm text-black mb-6 border-2'
          />
        </label>
        <label className=''>
          Date
          <input
            type="date"
            name="date"
            min={today}
            placeholder='Enter date'
            value={formData.date}
            autoComplete='on'
            onChange={handleChange}
            required
            className='block w-full font-light text-sm px-2 py-2 my-1 rounded-sm text-black mb-6 border-2'
          />
        </label>
        <label className=''>
          Time
          <input
            type="time"
            name="time"
            min={formData.date === today ? currentTime : ''}
            placeholder='Enter time'
            value={formData.time}
            autoComplete='on'
            onChange={handleChange}
            required
            className='block w-full font-light text-sm px-2 py-2 my-1 rounded-sm text-black mb-6 border-2'
          />
        </label>
    
        <button
          type="submit"
          disabled={loading}
          className='px-3 py-2 mt-4 bg-green-400 text-white text-xs rounded-lg font-semibold hover:bg-green-600 active:scale-105 duration-100 transition'
        >{loading ? 'wait...' : 'create event'}</button>
    
      </form>
    
    </div>
  )
};

export default NewEventForm