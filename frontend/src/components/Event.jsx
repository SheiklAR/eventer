import React, { useEffect, useState } from 'react'
import io from 'socket.io-client';




const Event = ({ image, name, date, time, category, description }) => {
  const [isLive, setIsLive] = useState(false);
  const [views, setViews] = useState(0);
  const [isAttending, setIsAttending] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);
  const [socket, setSocket] = useState(null);

  // Change date to readable format
  date = new Date(date).toISOString().split('T')[0]
 
  // Check the dates to start live
  useEffect(() => {
    // Check current date
    const now = new Date();
    const currentDate = now.toISOString().split("T")[0];

    // Extract event time 
    const [eventHours, eventMinutes] = time.split(":").map(Number);

    const eventStart = new Date();
    eventStart.setHours(eventHours, eventMinutes, 0, 0);

    const eventEnd = new Date(eventStart.getTime() + 30 * 60 * 1000);
    
    // Check if dates are same and with in the time limit
    if (date === currentDate && now >= eventStart && now <= eventEnd) {
      setIsLive(true);
    } else {
      setIsLive(false);
    }
  }, [date, time]);


  // Make a connection to the server web socket
  useEffect(() => {
    
    if (isLive) {
      // Connect to backend WebSocket
      const newSocket = io("http://localhost:5000", {
        transports: ["websocket"], // Not to use polling
      }); 

      newSocket.on("updateViewers", (count) => {
        setViews(count);
      });

      setSocket(newSocket);
      return () => {
        newSocket.disconnect(); // Clean up when component unmounts
      };
    }
  }, [isLive]);
  
  
  // Join the live based on the user input (i.e attend button)
  // useEffect(() => {
  //   let socket;

  //   if (isLive && isAttending) {
  //     socket = io("http://localhost:5000", {
  //       transports: ["websocket"],
  //     }); // Connect to backend WebSocket
  //     socket.emit('joinLive');

  //     socket.on('updateViewers', (count) => {
  //       setViews(count);
  //     })
  //   }
  // }, [isAttending, isLive]);
  

  // Leave the live based on the user input i.e(leave button)
  // useEffect(() => {
  //   let socket;

  //   if (isLive && isLeaving) {
  //     socket = io("http://localhost:5000", {
  //       transports: ["websocket"],
  //     });
  //     socket.emit('leaveLive');

  //     socket.on('updateViewers', (count) => {
  //       setViews(count)
  //     })
  //   }
  // }, [isLive, isLeaving]);
  
  
  /* live click */
  const handleAttend = () => {
    if (socket) {
      socket.emit('joinLive');
      setIsAttending(true);
    }
  };

  // Leave Click
  const handleLeave = () => {
    if (socket) {
      socket.emit('leaveLive');
      setIsAttending(false);
    }
  }

  return (
    <div className='max-w-lg mx-auto my-4 font-Poppins px-2 py-4 bg-white rounded-lg shadow-md'>
      <h2 className='pb-2 font-Poppins font-bold text-2xl text-gray-700'>{name}</h2>
      <img
        src={image}
        alt={`${name} image`}
        className='w-fill' />
      <div className='flex space-x-3 items-center justify-between'>
        <p className='text-gray-600 py-2'>{category.toUpperCase()}</p>
        {/* views */}
        {isLive &&<p className=''>watching: {views}</p>}
      </div>
      <div className='flex space-x-3 items-center justify-between'>
        <p className='text-gray-600'>Date: {date}</p>
        <p className='text-gray-600'>Time: {time}</p>
      </div>

      <p className='my-2'><strong className='font-semibold'>Description: </strong>{description}</p>

      <div className='flex justify-between mt-3'>
        {isLive  && !isAttending && <button
          type="button"
          onClick={handleAttend}
          className="px-2 py-2 mr-3 bg-purple-700 text-white text-xs rounded-lg font-semibold hover:bg-purple-800 active:scale-105 duration-100 transition">Attend</button>}
        
        {/* Leave button */}
        {isLive  && isAttending && <button
          type="button"
          onClick={handleLeave}
          className="px-2 py-2 mr-3 bg-purple-700 text-white text-xs rounded-lg font-semibold hover:bg-purple-800 active:scale-105 duration-100 transition">Leave</button>}
        
        {/* Live badge */}
        {isLive && <span className='px-3 py-2 bg-red-500 text-white text-xs rounded-lg font-semibold'>Live</span>}
      </div>
    </div>
  )
};

export default Event