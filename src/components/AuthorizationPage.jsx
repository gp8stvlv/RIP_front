// AuthorizationPage.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../actions/authActions';
import { Link, useNavigate } from 'react-router-dom';
import '../style/AuthorizationPage.css';

import backgroundImage from '/backIMag.jpeg';
import NavbarEq from './Navbar';
import Header from './Header';


const AuthorizationPage = () => {
  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  };

  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/catalog');
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    await dispatch(loginUser(username, password));
    if (isAuthenticated) {
      navigate('/catalog');
    }
  };

  return (
    <div>
      <NavbarEq />
      <Header showCart={false} showApp={false} />
      <div className="authorization-container" style={backgroundStyle}>
        <div>
          <form onSubmit={handleLogin}>
            <div className="custom-form">
              <label htmlFor="username">Имя пользователя:</label>
              <input
                type="text"
                id="username"
                placeholder="Введите логин"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
                <button type="submit" className="custom-button">
                  Войти
                </button>
                <Link className="custom-button" to="/registration">
                  Не зарегистрированы?
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="hrContainer"></div>
    </div>
  );
};

export default AuthorizationPage;
