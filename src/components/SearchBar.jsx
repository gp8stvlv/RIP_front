import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../style/Search.css';
import { setSearchValue, setPriceValue, setSearchParams } from '../actions/searchCatalogActions';

const SearchBar = ({ onSubmit }) => {
    const dispatch = useDispatch();
    const searchValue = useSelector((state) => state.searchCatalog.searchValue);
    const priceValue = useSelector((state) => state.searchCatalog.priceValue);

    const handleInputChange = (event) => {
        const { id, value } = event.target;

        if (id === 'search-input') {
            dispatch(setSearchValue(value));
        } else if (id === 'price-input') {
            dispatch(setPriceValue(value));
        }
    };

    const handleSearchClick = () => {
        const queryParams = `?type=${searchValue}&price=${priceValue}`;
        dispatch(setSearchParams(queryParams));
        onSubmit(queryParams);
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                id="search-input"
                placeholder="Поиск"
                value={searchValue}
                onChange={handleInputChange}
            />
            <input
                type="number"
                id="price-input"
                placeholder="Цена"
                value={priceValue}
                onChange={handleInputChange}
            />
            <button type="button" id="search-button" onClick={handleSearchClick}>
                Искать
            </button>
        </div>
    );
};

export default SearchBar;
