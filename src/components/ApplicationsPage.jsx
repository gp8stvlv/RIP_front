// ApplicationsPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import TableRow from './TableRow';
import NavbarEq from './Navbar';
import Header from './Header';
import { useLocation } from 'react-router-dom';
import { setStatus, setFormationDateFrom, setFormationDateTo, setUsername } from '../slices/searchApplicationSlice';
import '../style/CartPage.css';
import '../style/SearchApplication.css';

const ApplicationsPage = () => {
  const [localStatus, setLocalStatus] = useState('');
  const [localFormationDateFrom, setLocalFormationDateFrom] = useState('');
  const [localFormationDateTo, setLocalFormationDateTo] = useState('');
  const [localUsername, setLocalUsername] = useState('');
  const [requests, setRequests] = useState(null);
  const [pollInterval, setPollInterval] = useState(null);

  const status = useSelector((state) => state.searchApplication.status);
  const formationDateFrom = useSelector((state) => state.searchApplication.formationDateFrom);
  const formationDateTo = useSelector((state) => state.searchApplication.formationDateTo);
  const username = useSelector((state) => state.searchApplication.username);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const isModerator = user?.role === 'moderator';
  const location = useLocation();

  const fetchData = async (queryParams = {}) => {
    try {
      const response = await axios.get('http://localhost:8000/request', {
        params: queryParams,
        withCredentials: true,
      });

      // Фильтрация результатов запроса на стороне клиента по имени пользователя
      const filteredRequests = response.data.requests.filter(request => {
        const requestUsername = request.username || '';
        return username.toLowerCase().trim() === '' || requestUsername.toLowerCase().includes(username.toLowerCase().trim());
      });

      setRequests(filteredRequests || []);
    } catch (error) {
      console.error('Error fetching data:', error.response);
    }
  };

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    if (id === 'status-input') {
      setLocalStatus(value);
    } else if (id === 'formation-date-from-input') {
      setLocalFormationDateFrom(value);
    } else if (id === 'formation-date-to-input') {
      setLocalFormationDateTo(value);
    } else if (id === 'username-input') {
      console.log('Updating username:', value);
      setLocalUsername(value);
    }
  };

  const handleSearchClick = () => {
    dispatch(setStatus(localStatus));
    dispatch(setFormationDateFrom(localFormationDateFrom));
    dispatch(setFormationDateTo(localFormationDateTo));
    dispatch(setUsername(localUsername));

    fetchData({
      status: localStatus,
      formation_date_from: localFormationDateFrom,
      formation_date_to: localFormationDateTo,
      username: localUsername,
    });

    startPolling();
  };

  const startPolling = () => {
    clearInterval(pollInterval);

    const newPollInterval = setInterval(() => {
      fetchData({
        status: status,
        formation_date_from: formationDateFrom,
        formation_date_to: formationDateTo,
        username: username,
      });
    }, 1000);

    setPollInterval(newPollInterval);
  };

  const handleStatusChange = async (requestId, newStatus) => {
    try {
      await axios.put(`http://localhost:8000/request/moderator/${requestId}/put/`, {
        status: newStatus,
      }, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      fetchData({
        status: localStatus,
        formation_date_from: localFormationDateFrom,
        formation_date_to: localFormationDateTo,
        username: localUsername,
      });
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  useEffect(() => {
    fetchData({
      status: status,
      formation_date_from: formationDateFrom,
      formation_date_to: formationDateTo,
      username: username,
    });

    setLocalStatus(status);
    setLocalFormationDateFrom(formationDateFrom);
    setLocalFormationDateTo(formationDateTo);
    setLocalUsername(username);

    startPolling();

    return () => clearInterval(pollInterval);
  }, [status, formationDateFrom, formationDateTo, username]);

  return (
    <div>
      <NavbarEq />
      <Header showCart={false} showApp={false} />
      <div className="search-bar">
        <input
          type="text"
          id="status-input"
          placeholder="Статус"
          value={localStatus}
          onChange={handleInputChange}
        />
        <input
          type="date"
          id="formation-date-from-input"
          placeholder="Дата создания от"
          value={localFormationDateFrom}
          onChange={handleInputChange}
        />
        <input
          type="date"
          id="formation-date-to-input"
          placeholder="Дата создания до"
          value={localFormationDateTo}
          onChange={handleInputChange}
        />
        {isModerator && (
          <input
            type="text"
            id="username-input"
            placeholder="Имя пользователя"
            value={localUsername}
            onChange={handleInputChange}
          />
        )}
        <button type="button" id="search-button" onClick={handleSearchClick}>
          Искать
        </button>
      </div>
      <div className="applications-container">
        <div className="applications-title">Заявки</div>
        {requests !== null ? (
          requests.length > 0 ? (
            <table className="table-applications">
              <thead>
                <tr>
                  <th>№ заявки</th>
                  <th>Статус</th>
                  <th>Дата и время создания</th>
                  <th>Дата и время формирования</th>
                  <th>Дата и время выполнения</th>
                  {isModerator && <th>Пользователь</th>}
                  <th>Модератор</th>
                  <th>Подробнее</th>
                  {isModerator && <th>Действия</th>}
                </tr>
              </thead>
              <tbody>
                {requests.map((request) => (
                  <TableRow
                    key={request.request_id}
                    application={request}
                    onStatusChange={(newStatus) => handleStatusChange(request.request_id, newStatus)}
                  />
                ))}
              </tbody>
            </table>
          ) : (
            <p>Пока что у вас нет заявок</p>
          )
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default ApplicationsPage;