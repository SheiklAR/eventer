import { useState, useEffect } from 'react'
import React from 'react'
import EventCard from '../components/EventCard'
import axios from 'axios'

// Renders the home screen with a grid of event cards.
const HomeScreen = () => {
  const [events, setEvents] = useState([]);


  useEffect(() => {

    const fetchEvents = async () => {
      try {
        const { data } = await axios.get('/api/events'); // Destructure `data` from response
        setEvents(data);
      } catch (error) {
        console.log('fetching error', error.message);
      }
    }

    fetchEvents();
  }, []);


  return (
    <div className='flex flex-col items-center'>
      <div className='md:mx-auto items-center md:grid md:grid-cols-2 lg:grid-cols-3 md:space-x-2 gap-4 lg:space-x-4 px-2'>
        {events.length > 0 ? events.map((event) => (
          <EventCard key={event._id} {...event} />
        )) : (
          <p>Loading...</p>)}
      </div>
    </div>
  )
}

export default HomeScreen