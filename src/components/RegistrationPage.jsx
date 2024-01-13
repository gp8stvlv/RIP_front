import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../actions/registrationActions';
import { useNavigate } from 'react-router-dom';

import NavbarEq from './Navbar';
import Header from './Header';

import '../style/AuthorizationPage.css';


import backgroundImage from '/backIMag.jpeg';

const useCustomNavigate = () => {
  const navigate = useNavigate();

  const customNavigate = (url) => {
    navigate(url);
  };

  return customNavigate;
};

const RegistrationPage = () => {
  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  };

  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useCustomNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/catalog');
    }
  }, [isAuthenticated, navigate]);

  const handleRegister = async () => {
    const userData = {
      username,
      email,
      password,
      role: 'user',
    };

    await dispatch(registerUser(userData));

    if (isAuthenticated) {
      navigate('/catalog');
    };
  };


  return (
    <div>
      <NavbarEq />
      <Header showCart={false} showApp={false} />
      <div className="authorization-container" style={backgroundStyle}>
        <div>
          <div className="custom-form">
            <label htmlFor="username">Логин:</label>
            <input
              type="text"
              id="username"
              placeholder="Введите логин"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              placeholder="Введите email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="password">Пароль:</label>
            <input
              type="password"
              id="password"
              placeholder="Введите пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="button-container">
              <div className="custom-button" onClick={handleRegister}>
                Зарегистрироваться
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hrContainer"></div>
    </div>
  );
};

export default RegistrationPage;
