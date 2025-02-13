import React from 'react'
import { useNavigate } from 'react-router-dom';



const EventCard = ({ _id, image, name, date, time, category }) => {
    const navigate = useNavigate();
    // Const { date, time } = formatDateTime(datetime);
    console.log(date, typeof (date));
    // Covert string to data and ISO
    const ISOdate = date ? new Date(date).toISOString().split("T")[0] : '';
    
    const handleClick = () => {
        navigate(`/event/${_id}`);
    }

    return (
        <div className='mx-2 my-4 bg-white rounded-lg shadow-md max-w-sm hover:shadow-xl'>
            <img src={image} alt="" className='w-full overflow-hidden' />
          
            <div className='p-4 font-Poppins'>
                <h2 className='text-xl font-semibold mb-2 text-gray-800'>{name}</h2>
                <div className='flex space-x-3 items-center justify-between'>
                    <p className='text-gray-600'>Date: {ISOdate}</p>
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
};

export default EventCard