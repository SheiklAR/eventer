import { React, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import checkAuth from '../utils/checkAuth';
import NewEventForm from '../components/NewEventForm';

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

  const navigate = useNavigate()


  // Check for authorization
  useEffect(() => {
    checkAuth(setIsAuthorized, navigate)
  }, []);
  

  return (
    <NewEventForm />
  )
};

export default CreateEventScreen;