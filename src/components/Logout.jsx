// Logout.jsx
import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../actions/authActions';
import { useNavigate } from 'react-router-dom';
import { selectAuth, logoutSuccess } from "../slices/authSlice"; // Make sure logoutSuccess is imported

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Используйте селектор для получения данных аутентификации
  const auth = useSelector(selectAuth);

  useEffect(() => {
    const handleLogout = async () => {
      if (auth.isAuthenticated) {
        try {
          await axios.get('http://localhost:8000/users/logout/', {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          });
          dispatch(logoutUser()); // Assuming you have logoutUser action creator
          dispatch(logoutSuccess()); // Dispatch the logoutSuccess action
          navigate('/');
        } catch (error) {
          console.error('Error during logout:', error);
        }
      }
    };

    handleLogout();
  }, [dispatch, navigate, auth]);

  return (
    <div>
      <p>Выход</p>
    </div>
  );
};

export default Logout;
