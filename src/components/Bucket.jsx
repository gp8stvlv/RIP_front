// Bucket.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavbarEq from './Navbar';
import Header from './Header';
import '../style/Bucket.css';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';


const Bucket = () => {
    const { flag } = useParams();
    console.log("flag", flag)
    const { id } = useParams();
    const navigate = useNavigate();
    console.log("id", id)
    let { state } = useLocation();
    const [requestData, setRequestData] = useState(null);
    const [productionCounts, setProductionCounts] = useState({});


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/request/${id}/`);
                setRequestData(response.data);
                console.log("response", response)

                // Initialize productionCounts dictionary with default counts
                const counts = {};
                response.data.chemistry_equipment.forEach(item => {
                    counts[item.equipment.chemistry_product_id] = item.production_count || 1;
                });

                setProductionCounts(counts);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // Check if 'id' is available before making the API request
        if (id) {
            fetchData();
        }
    }, [id]);


    const handleUpdateStatus = async () => {
        try {
            await axios.put(`http://localhost:8000/request/user/${id}/put/`);
            const response = await axios.get(`http://localhost:8000/request/${id}/`);
            navigate('/catalog');
            setRequestData(response.data);
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const handleDeleteFromRequest = async (chemistryProductId) => {
        try {
            await axios.delete(`http://localhost:8000/manyToMany/request_id/${id}/chemistry_product_id/${chemistryProductId}/delete/`);
            const response = await axios.get(`http://localhost:8000/request/${id}/`);
            setRequestData(response.data);
        } catch (error) {
            console.error('Error deleting from request:', error);
        }
    };

    const handleProductionCountChange = (event, chemistryProductId) => {
        const newCount = Math.max(1, Math.floor(Number(event.target.value)) || 1);
        setProductionCounts(prevCounts => ({
            ...prevCounts,
            [chemistryProductId]: newCount,
        }));
    };

    const handleUpdateManyToManyForItem = async (chemistryProductId) => {
        try {
            await axios.put(`http://localhost:8000/manyToMany/request_id/${id}/chemistry_product_id/${chemistryProductId}/put/`, {
                production_count: productionCounts[chemistryProductId],
            });

            const response = await axios.get(`http://localhost:8000/request/${id}/`);
            setRequestData(response.data);
        } catch (error) {
            console.error('Error updating many-to-many:', error);
        }
    };

    const handleDeleteRequest = async () => {
        try {
            await axios.delete(`http://localhost:8000/request/${id}/delete/`);
            navigate('/catalog');
        } catch (error) {
            console.error('Error deleting request:', error);
        }
    };

    if (!requestData) {
        return <p>Loading...</p>;
    }

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
        <>
            <NavbarEq />
            <Header showCart={false} showApp={true} userRequestId={id} />
            <div className="container">
                <h2>Заявка №{requestData.requests.request_id}</h2>
                <p>Статус: {requestData.requests.status}</p>
                <p>Дата создания: {formatDateTime(requestData.requests.created_at)}</p>

                <h3>Оборудование:</h3>
                <ul>
                    {requestData.chemistry_equipment && requestData.chemistry_equipment.map((item) => (
                        <li key={item.equipment.chemistry_product_id}>
                            <h4>{item.equipment.type}</h4>
                            <p>{item.equipment.description}</p>
                            <p>Цена: {item.equipment.price}</p>
                            <img src={item.equipment.image_url_after_serializer} alt={item.equipment.type} />

                            <div>
                                <label htmlFor={`productionCount-${item.equipment.chemistry_product_id}`}>Количество:</label>
                                <input
                                    type="number"
                                    id={`productionCount-${item.equipment.chemistry_product_id}`}
                                    value={productionCounts[item.equipment.chemistry_product_id] || item.production_count || 1}
                                    className="counter"
                                    onChange={(event) => state && state.userRequestId !== null && handleProductionCountChange(event, item.equipment.chemistry_product_id)}
                                    disabled={!state || state.userRequestId === null}
                                />
                                {state && state.userRequestId !== null && (
                                    <div>
                                        <button onClick={() => handleUpdateManyToManyForItem(item.equipment.chemistry_product_id)} className="okey">
                                            Изменить количество
                                        </button>
                                        <button onClick={() => handleDeleteFromRequest(item.equipment.chemistry_product_id)} className="delete">
                                            Удалить из заявки
                                        </button>
                                    </div>
                                )}
                            </div>

                        </li>
                    ))}
                </ul>
                {state && state.userRequestId !== null && (
                    <div>
                        <button onClick={handleUpdateStatus} className="okey">
                            Оформить заявку
                        </button>
                        <button onClick={handleDeleteRequest} className="delete">
                            Удалить заявку
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default Bucket;
