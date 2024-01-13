import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import NavbarEq from './Navbar';
import Header from './Header';
import SearchBar from './SearchBar';  // Import the SearchBar component
import { getCatalog } from '../actions/catalogActions';
import { setSearchParams } from '../actions/searchCatalogActions';
import { addModelingToBucket } from '../actions/bucketActions';
import { useNavigate } from 'react-router-dom';
import { FaShoppingBasket } from 'react-icons/fa';
import { toast } from 'react-toastify';
import '../style/ModelCard.css';

const Catalog = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const searchValue = useSelector((state) => state.searchCatalog.searchText);
    const priceValue = useSelector((state) => state.searchCatalog.price);


    const handleGetCatalog = async () => {
        dispatch(getCatalog());
    };

    useEffect(() => {
        handleGetCatalog();
    }, [dispatch]);

    const [catalogData, setCatalogData] = useState(null);

    const handleSearchSubmit = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/equipment?type=${searchValue}&price=${priceValue}`, {
                withCredentials: true,
            });

            setCatalogData(response.data);
        } catch (error) {
            console.error('Error fetching catalog data:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/equipment?type=${searchValue}&price=${priceValue}`, {
                    withCredentials: true,
                });

                console.log('catalog data response', response.data);
                setCatalogData(response.data);
            } catch (error) {
                console.error('Error fetching catalog data:', error);
            }
        };

        fetchData();

        // Use searchValue and priceValue directly in the URL
        dispatch(setSearchParams(`?type=${searchValue}&price=${priceValue}`));
        handleSearchSubmit();
    }, [dispatch, searchValue, priceValue]);

    const handleAddToBucket = async (chemistryProductId, userRequestId) => {
        try {
            const response = await axios.post(
                `http://localhost:8000/equipment/chemistry_product_id/${chemistryProductId}/post/`,
                {
                    modeling_id: chemistryProductId,
                    user_request_id: userRequestId,
                },
                {
                    withCredentials: true,
                }
            );

            if (response.status === 201) {
                console.log('response', response);
                console.log('responseData', response.data);
                toast.success('Услуга добавлена в корзину');

                const queryParams = '?type=&price=';
                handleSearchSubmit(queryParams);
            }
        } catch (error) {
            if (error.response.status === 409) {
                toast.warning('Уже есть в корзине');
                console.warn('Уже есть в корзине');
            } else {
                console.error('Ошибка во время добавления услуги в корзину:', error);
            }
        }
    };

    const handleSearch = (queryParams) => {
        handleSearchSubmit(queryParams);
    };

    if (!catalogData) {
        return <p>Loading...</p>;
    }

    const cartIcon = <FaShoppingBasket size={70} className="" />

    return (
        <>
            <NavbarEq />
            <Header showCart={true} showApp={true} userRequestId={catalogData.user_request_id} />
            <SearchBar onSubmit={handleSearch} />
            <div className="catalog-container">
                {catalogData.equipment.map((item, index) => (
                    <div key={item.chemistry_product_id} className="custom-card">
                        <Link to={`/catalog/${item.chemistry_product_id}`} className="card-href">
                            <img src={item.image_url_after_serializer} alt={item.type} className="custom-card-img" />
                            <div className="custom-card-body">
                                <p className="custom-card-text text-center">{item.type}</p>
                                <p className="custom-card-price text-center">{item.price} рублей</p>
                            </div>
                        </Link>
                        {isAuthenticated && (
                            <div className="button-container">
                                <button
                                    className="add-to-cart-button"
                                    onClick={() => handleAddToBucket(item.chemistry_product_id, catalogData.user_request_id)}
                                >
                                    В корзину
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </>
    );
};

export default Catalog;
