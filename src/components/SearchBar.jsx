import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../style/Search.css';
import { setSearchText, setPrice } from '../slices/searchCatalogSlice';

const SearchBar = ({ onSubmit }) => {
    const dispatch = useDispatch();
    const searchValueRedux = useSelector((state) => state.searchCatalog.searchText);
    const priceValueRedux = useSelector((state) => state.searchCatalog.price);
    const [localSearchValue, setLocalSearchValue] = useState('');
    const [localPriceValue, setLocalPriceValue] = useState('');

    useEffect(() => {
        setLocalSearchValue(searchValueRedux);
        setLocalPriceValue(priceValueRedux);
    }, [searchValueRedux, priceValueRedux]);

    const handleInputChange = (event) => {
        const { id, value } = event.target;

        if (id === 'search-input') {
            setLocalSearchValue(value);
        } else if (id === 'price-input') {
            const parsedValue = value === '' ? '' : Math.max(0, parseInt(value, 10)); // Ensure value is non-negative
            setLocalPriceValue(parsedValue);
        }
    };

    const handleSearchClick = () => {
        dispatch(setSearchText(localSearchValue));
        dispatch(setPrice(localPriceValue));

        const queryParams = `?type=${localSearchValue}&price=${localPriceValue}`;
        onSubmit(queryParams);
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                id="search-input"
                placeholder="Поиск"
                value={localSearchValue}
                onChange={handleInputChange}
            />
            <input
                type="number"
                id="price-input"
                placeholder="Цена"
                value={localPriceValue === '' ? '' : localPriceValue}
                onChange={handleInputChange}
            />
            <button type="button" id="search-button" onClick={handleSearchClick}>
                Искать
            </button>
        </div>
    );
};

export default SearchBar;
