import React from 'react'
import { useNavigate } from 'react-router-dom';

// Format date and time
const formatDateTime = (datetime) => {
    const dateTimeObj = new Date(datetime);
    const date = dateTimeObj.toISOString().split('T')[0];
    const time = dateTimeObj.toTimeString().split(' ')[0];
    return { date, time };
  };

const EventCard = ({ image, name, datetime, category }) => {
    const navigate = useNavigate();
    const { date, time } = formatDateTime(datetime);
   
    const handleClick = () => {
        navigate('#');
    }

    return (
        <div className='mx-2 my-4 bg-white rounded-lg shadow-md max-w-sm hover:shadow-xl'>
            <img src={image} alt="" className='w-full overflow-hidden' />
          
            <div className='p-4 font-Poppins'>
                <h2 className='text-xl font-semibold mb-2 text-gray-800'>{name}</h2>
                <div className='flex space-x-3 items-center justify-between'>
                    <p className='text-gray-600'>Date: {date}</p>
                    <p className='text-gray-600'>Time: {time}</p>
                </div>
                <div className='flex justify-between mt-3'>
                    <p className='text-gray-600 py-2'>{category.toUpperCase()}</p>
                    <button
                        type="button"
                        onClick={handleClick}
                        className="px-2 py-2 mr-3 bg-purple-700 text-white text-xs rounded-lg font-semibold hover:bg-purple-800 active:scale-105 duration-100 transition">View event</button>
                </div>
            </div>
        </div>
    )
}

export default EventCard