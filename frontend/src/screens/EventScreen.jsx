import axios from 'axios';
import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Event from '../components/Event';



const EventScreen = () => {
    const [event, setEvent] = useState({});
    const { id } = useParams(); // Get id from URL

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const { data } = await axios.get(`/api/events/${id}`);
                setEvent(data);
            } catch (error) {
                console.log('fetching error', error.message);
            }
        }
        fetchEvent();
    }, []);

    return (
      
        <div>
            {/* Load event, only if exists */}
            {event._id && <Event {...event} />}
        </div>
    )
}

export default EventScreen