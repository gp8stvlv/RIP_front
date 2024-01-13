// EquipmentEditPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import NavbarEq from './Navbar';
import Header from './Header';
import '../style/EquipmentEditPage.css';
import { useNavigate } from 'react-router-dom';
import useImageUpload from '../actions/useImageUpload'; // Import the custom hook

const EquipmentEditPage = () => {
    const { equipmentId } = useParams();
    const [equipment, setEquipment] = useState({});
    const [formData, setFormData] = useState({});
    const navigate = useNavigate();
    const { imageUrl, handleImageUpload } = useImageUpload(); // Use the custom hook

    useEffect(() => {
        fetchData();
    }, [equipmentId]);

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/equipment/${equipmentId}/`);
            setEquipment(response.data || {});
        } catch (error) {
            console.error('Error fetching equipment details:', error);
        }
    };
    useEffect(() => {
        // Check if a new image URL is available
        if (imageUrl) {
            // Update both image URLs in the equipment state
            setEquipment(prevEquipment => ({
                ...prevEquipment,
                image_url_after_serializer: imageUrl,
                image_url: imageUrl,
            }));
        }
    }, [imageUrl]);

    const handleUpdate = async () => {
        try {
            // Update other details of equipment
            await axios.put(`http://localhost:8000/equipment/${equipmentId}/put/`, equipment, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            navigate('/equipment');
        } catch (error) {
            console.error('Error updating equipment:', error);
        }
    };


    return (
        <div className="add-modelings-card-container">
            <NavbarEq />
            <Header showCart={false} showApp={false} />
            <div className='myClass'>
                <h2>Редактирование услуги</h2>
                <div className="myForm">
                    <label>Название:</label>
                    <input
                        type="text"
                        className="pricemy"
                        value={equipment.type || ''}
                        onChange={(e) => setEquipment({ ...equipment, type: e.target.value })}
                    />
                    <label>Описание:</label>
                    <textarea
                        value={equipment.description || ''}
                        onChange={(e) => setEquipment({ ...equipment, description: e.target.value })}
                    />
                    <img
                        src={imageUrl || equipment.image_url_after_serializer || ''}
                        className="photoImg"
                        alt="im"
                    />
                    <label>Изменить изображение:</label>
                    <input
                        type="file"
                        name="photo"
                        onChange={(e) => {
                            setFormData({ ...formData, photo: e.target.files[0] });
                            // Call handleImageUpload only if a file is selected
                            if (e.target.files[0]) {
                                handleImageUpload(e.target.files[0]);
                            }
                        }}
                        className="photomy"
                        required
                    />
                    <label>Цена:</label>
                    <input
                        type="text"
                        className="pricemy"
                        value={equipment.price || ''}
                        onChange={(e) => setEquipment({ ...equipment, price: e.target.value })}
                    />
                    <button
                        className="buttonmy"
                        onClick={handleUpdate}
                    >
                        Изменить
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EquipmentEditPage;
