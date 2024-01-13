import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../style/EquipmentPage.css'; // Import the CSS file
import NavbarEq from './Navbar';
import Header from './Header';

const EquipmentPage = () => {
    const [equipmentList, setEquipmentList] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8000/equipment/');
            setEquipmentList(response.data.equipment || []);
        } catch (error) {
            console.error('Error fetching equipment list:', error);
        }
    };

    const handleDelete = async (chemistry_product_id) => {
        try {
            const response = await fetch(`http://localhost:8000/equipment/${chemistry_product_id}/delete/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                console.log('Deleted successfully');
                // Reload the page after successful deletion
                window.location.reload();
            } else {
                console.error('Deletion failed');
            }
        } catch (error) {
            console.error('Error during deletion:', error);
        }
    };

    return (
        <div>
            <NavbarEq />
            <Header showCart={false} showApp={false} />
            <div className="myEditEq">
                <div className="equipment-list-container">
                    <h1>Список услуг</h1>
                    <table className="my-excel-table">
                        <thead>
                            <tr>
                                <th>Название</th>
                                <th>Описание</th>
                                <th>Цена</th>
                                <th>Изображение</th>
                                <th>Действия</th>
                            </tr>
                        </thead>
                        <tbody>
                            {equipmentList.map((equipment) => (
                                <tr key={equipment.chemistry_product_id}>
                                    <td>{equipment.type}</td>
                                    <td>{equipment.description}</td>
                                    <td>{equipment.price}</td>
                                    <td>
                                        <img src={equipment.image_url_after_serializer} alt={equipment.type} className="myequipment-image" />
                                    </td>
                                    <td>
                                        <button className="my-delete-button" onClick={() => handleDelete(equipment.chemistry_product_id)}>
                                            удалить
                                        </button>
                                        <Link to={`/equipment/${equipment.chemistry_product_id}`}>
                                            редактировать
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default EquipmentPage;
