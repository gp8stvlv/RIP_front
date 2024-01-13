import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { setSearchResults, setFilterValues } from '../actions/applicationActions';
import { useLocation, useNavigate } from 'react-router-dom';

import '../style/SearchApplication.css';

const SearchApplication = ({ setSearchResults, setFilterValues }) => {
    const [status, setStatus] = useState('');
    const [formationDateFrom, setFormationDateFrom] = useState('');
    const [formationDateTo, setFormationDateTo] = useState('');

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        // Read query parameters from URL
        const queryParams = new URLSearchParams(location.search);
        const status = queryParams.get('status');
        const formationDateFrom = queryParams.get('formation_date_from');
        const formationDateTo = queryParams.get('formation_date_to');

        // Update local state with filter values
        setStatus(status || '');
        setFormationDateFrom(formationDateFrom || '');
        setFormationDateTo(formationDateTo || '');
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
        try {
            const queryParams = `?status=${status}&formation_date_from=${formationDateFrom}&formation_date_to=${formationDateTo}`;
            const response = await axios.get(`http://localhost:8000/request/${queryParams}`, {
                withCredentials: true,
            });

            console.log('Backend response queryParams:', response);

            // Update Redux store with filter values
            setFilterValues({ status, formationDateFrom, formationDateTo });

            // Ensure that setSearchResults is correctly spelled
            setSearchResults(response.data.requests || []);

            // Update query parameters in the URL
            const newSearchParams = new URLSearchParams();
            newSearchParams.set('status', status);
            newSearchParams.set('formation_date_from', formationDateFrom);
            newSearchParams.set('formation_date_to', formationDateTo);

            // Push new URL with updated query parameters
            navigate(`?${newSearchParams.toString()}`);
        } catch (error) {
            console.error('Error searching applications:', error);
        }
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

const mapStateToProps = (state) => ({
    searchResults: state.application ? state.application.searchResults : [],
});

export default connect(mapStateToProps, { setSearchResults, setFilterValues })(SearchApplication);
