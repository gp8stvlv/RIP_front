// TableRow.jsx
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../style/TableRow.css';

const TableRow = ({ application }) => {
  const [isListOpen, setListOpen] = useState(false);

  const user = useSelector((state) => state.auth.user);
  const isModerator = user?.role === 'moderator';

  const toggleList = () => {
    setListOpen(!isListOpen);
  };

  const handleStatusChange = async (newStatus) => {
    try {
      console.log("application.request_id", application.request_id)
      await axios.put(`http://localhost:8000/request/moderator/${application.request_id}/put/`, {
        status: newStatus,
      }, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // You can update the UI or perform other actions upon success
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const formatDateTime = (dateTimeString) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: false,
    };
    return new Date(dateTimeString).toLocaleDateString('ru-RU', options);
  };

  return (
    <tr>
      <td>{application.request_id}</td>
      <td>{application.status}</td>
      <td>{application.created_at ? formatDateTime(application.created_at) : '-'}</td>
      <td>{application.formation_date ? formatDateTime(application.formation_date) : '-'}</td>
      <td>{application.completion_date ? formatDateTime(application.completion_date) : '-'}</td>
      {isModerator && (
        <td>{application.username}</td>
      )}
      <td>{application.moderatorname}</td>
      <td>
        <Link to={`/catalog/applications/${application.request_id}`}>Подробнее</Link>
      </td>
      {isModerator && (
        <td>
          {application.status === 'в работе' && application.moderatorname === null && (
            <>
              <button onClick={() => handleStatusChange('завершен')}>Завершить</button>
              <button onClick={() => handleStatusChange('отменен')}>Отменить</button>
            </>
          )}
        </td>
      )}
    </tr>
  );
};

export default TableRow;
