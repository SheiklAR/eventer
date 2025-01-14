import React from 'react'
import EventCard from '../components/EventCard'
import events from '../events'

// Renders the home screen with a grid of event cards.
const HomeScreen = () => {
  return (
    <div className='flex flex-col items-center'>
      <div className='md:mx-auto items-center md:grid md:grid-cols-2 lg:grid-cols-3 md:space-x-2 gap-4 lg:space-x-4 px-2'>
        {events.map((event) => (
          <EventCard key={event._id} {...event}/>
        ))}
      </div>
    </div>
  )
}

export default HomeScreen