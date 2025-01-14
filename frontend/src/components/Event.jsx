import React from 'react'
import { formatDateTime } from '../utilities';


const Event = ({image, name, datetime, category, description}) => {
  const { date, time } = formatDateTime(datetime);

  /* live click */
  const handleClick = () => { };

  return (
    <div className='max-w-lg mx-auto my-4 font-Poppins px-2 py-4 bg-white rounded-lg shadow-md'>
      <img
        src={image}
        alt={`${name} image`}
        className='w-fill' />
      <div className='flex space-x-3 items-center justify-between'>
        <p className='text-gray-600 py-2'>{category.toUpperCase()}</p>
        {/* views */}
        <p>Views: </p>
      </div>
      <div className='flex space-x-3 items-center justify-between'>
        <p className='text-gray-600'>Date: {date}</p>
        <p className='text-gray-600'>Time: {time}</p>
      </div>

      <p className='my-2'><strong className='font-semibold'>Description: </strong>{ description }</p>

      <div className='flex justify-between mt-3'>
        <button
          type="button"
          onClick={handleClick}
          className="px-2 py-2 mr-3 bg-purple-700 text-white text-xs rounded-lg font-semibold hover:bg-purple-800 active:scale-105 duration-100 transition">Attend</button>
        {/* live badge */}
        <span className='px-3 py-2 bg-red-500 text-white text-xs rounded-lg font-semibold'>Live</span>
      </div>
    </div>
  )
}

export default Event