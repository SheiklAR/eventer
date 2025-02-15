import { React, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
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
  const userInfo = localStorage.getItem('userInfo');

  if (userInfo == null) {
    console.log('here')
    return <Navigate to="/login" replace />;
  }


  return (
    <NewEventForm />
  )
};

export default CreateEventScreen;