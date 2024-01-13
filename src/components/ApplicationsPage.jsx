import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import TableRow from './TableRow';
import NavbarEq from './Navbar';
import Header from './Header';
import { useLocation, useNavigate } from 'react-router-dom';
import '../style/CartPage.css';
import '../style/SearchApplication.css';

const ApplicationsPage = () => {
  // Локальные состояния компонента
  const [requests, setRequests] = useState([]);
  const [status, setStatus] = useState('');
  const [formationDateFrom, setFormationDateFrom] = useState('');
  const [formationDateTo, setFormationDateTo] = useState('');
  const [username, setUsername] = useState('');

  // Получение информации о пользователе из глобального состояния Redux
  const user = useSelector((state) => state.auth.user);
  const isModerator = user?.role === 'moderator';

  // Получение текущего URL и функции навигации из react-router-dom
  const location = useLocation();
  const navigate = useNavigate();

  // Функция для отправки запроса на сервер с параметрами запроса и фильтрацией на стороне клиента
  const fetchData = async (queryParams = {}) => {
    try {
      // Отправка GET-запроса на сервер с параметрами запроса
      const response = await axios.get('http://localhost:8000/request/', {
        withCredentials: true,
        params: queryParams,
      });

      // Фильтрация результатов запроса на стороне клиента по имени пользователя
      const filteredRequests = response.data.requests.filter(request => {
        const requestUsername = request.username || ''; // Обработка случая, когда username может быть null
        return requestUsername.toLowerCase().includes(username.toLowerCase());
      });

      // Обновление локального состояния с отфильтрованными заявками
      setRequests(filteredRequests);
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
  };

  // Эффект, срабатывающий при изменении строки запроса в URL
  useEffect(() => {
    // Извлечение параметров из строки запроса
    const queryParams = new URLSearchParams(location.search);
    const status = queryParams.get('status') || '';
    const formationDateFrom = queryParams.get('formation_date_from') || '';
    const formationDateTo = queryParams.get('formation_date_to') || '';

    // Обновление локального состояния и отправка запроса с актуальными параметрами
    setStatus(status);
    setFormationDateFrom(formationDateFrom);
    setFormationDateTo(formationDateTo);
    fetchData({ status, formation_date_from: formationDateFrom, formation_date_to: formationDateTo });
  }, [location.search]);

  // Эффект, обновляющий данные с определенным интервалом при изменении фильтров или имени пользователя
  useEffect(() => {
    const pollInterval = setInterval(() => {
      fetchData({ status, formation_date_from: formationDateFrom, formation_date_to: formationDateTo, username });
    }, 2000);

    return () => clearInterval(pollInterval);
  }, [status, formationDateFrom, formationDateTo, username]);

  // Обработчик изменения значений в полях ввода
  const handleInputChange = (event) => {
    const { id, value } = event.target;

    if (id === 'status-input') {
      setStatus(value);
    } else if (id === 'formation-date-from-input') {
      setFormationDateFrom(value);
    } else if (id === 'formation-date-to-input') {
      setFormationDateTo(value);
    } else if (id === 'username-input') {
      setUsername(value);
    }
  };

  // Обработчик клика на кнопку поиска
  const handleSearchClick = () => {
    // Создание нового объекта URLSearchParams с текущими значениями фильтров
    const newSearchParams = new URLSearchParams();
    newSearchParams.set('status', status);
    newSearchParams.set('formation_date_from', formationDateFrom);
    newSearchParams.set('formation_date_to', formationDateTo);

    // Обновление строки запроса в URL и отправка запроса с актуальными параметрами
    navigate(`?${newSearchParams.toString()}`);
    fetchData({ status, formation_date_from: formationDateFrom, formation_date_to: formationDateTo });
  };

  // Обработчик изменения статуса заявки
  const handleStatusChange = async (requestId, newStatus) => {
    try {
      // Отправка PUT-запроса для изменения статуса заявки на сервер
      await axios.put(`http://localhost:8000/request/moderator/${requestId}/put/`, {
        status: newStatus,
      }, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Обновление данных с актуальными параметрами
      fetchData({ status, formation_date_from: formationDateFrom, formation_date_to: formationDateTo });
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <div>
      <NavbarEq />
      <Header showCart={false} showApp={false} />
      <div className="search-bar">
        <input
          type="text"
          id="status-input"
          placeholder="Статус"
          value={status}
          onChange={handleInputChange}
        />
        <input
          type="date"
          id="formation-date-from-input"
          placeholder="Дата создания от"
          value={formationDateFrom}
          onChange={handleInputChange}
        />
        <input
          type="date"
          id="formation-date-to-input"
          placeholder="Дата создания до"
          value={formationDateTo}
          onChange={handleInputChange}
        />
        {isModerator && (
          <input
            type="text"
            id="username-input"
            placeholder="Имя пользователя"
            value={username}
            onChange={handleInputChange}
          />
        )}
        <button type="button" id="search-button" onClick={handleSearchClick}>
          Искать
        </button>
      </div>
      <div className="applications-container">
        <div className="applications-title">Заявки</div>
        {requests.length > 0 ? (
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
        )}
      </div>
    </div>
  );
};

export default ApplicationsPage;
