import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

import '../style/SearchApplication.css';

const SearchApplication = ({ setSearchResults, setFilterValues }) => {
    const [status, setStatus] = useState('');
    const [formationDateFrom, setFormationDateFrom] = useState('');
    const [formationDateTo, setFormationDateTo] = useState('');

    const [localStatus, setLocalStatus] = useState('');
    const [localFormationDateFrom, setLocalFormationDateFrom] = useState('');
    const [localFormationDateTo, setLocalFormationDateTo] = useState('');
    const [localUsername, setLocalUsername] = useState('');


    useEffect(() => {
        // Read query parameters from URL
        const queryParams = new URLSearchParams(location.search);
        const status = queryParams.get('status');
        const formationDateFrom = queryParams.get('formation_date_from');
        const formationDateTo = queryParams.get('formation_date_to');
        const username = queryParams.get('username');

        // Update local state with filter values
        setLocalStatus(status || '');
        setLocalFormationDateFrom(formationDateFrom || '');
        setLocalFormationDateTo(formationDateTo || '');
        setLocalUsername(username || '');
    }, [location.search]);

    const handleInputChange = (event) => {
        const { id, value } = event.target;

        if (id === 'status-input') {
            setStatus(value);
        } else if (id === 'formation-date-from-input') {
            setFormationDateFrom(value);
        } else if (id === 'formation-date-to-input') {
            setFormationDateTo(value);
        }
    };

    const handleSearchClick = async () => {

    };

    return (
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
            <button type="button" id="search-button" onClick={handleSearchClick}>
                Искать
            </button>
        </div>
    );
};

export default SearchApplication;
