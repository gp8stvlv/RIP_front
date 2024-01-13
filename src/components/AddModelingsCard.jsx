// AddModelingsCard.css
import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarEq from './Navbar';
import Header from './Header';
import '../style/AddModelingsCard.css'; // Import the CSS file


const AddModelingsCard = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = React.useState({
        type: '',
        description: '',
        price: '',
        status: 'действует',
        photo: null,
        image_url_after_serializer: null,
    });

    const handleChange = (e) => {
        const { name, value, type } = e.target;

        if (type === 'file') {
            setFormData((prevData) => ({ ...prevData, [name]: e.target.files[0] }));
        } else {
            setFormData((prevData) => ({ ...prevData, [name]: value }));
        }
    };

    const handleImageUpload = async () => {
        try {
            const formDataImage = new FormData();
            formDataImage.append('photo', formData.photo);

            const response = await fetch('http://localhost:8000/upload-photo/', {
                method: 'POST',
                body: formDataImage,
            });

            if (response.ok) {
                const imageUrl = await response.json();
                console.log('Image upload successful. Photo URL:', imageUrl.photo_url);
                return imageUrl.photo_url;
            } else {
                console.error('Failed to upload image');
                console.error('Server response:', await response.text());
                return null;
            }
        } catch (error) {
            console.error('Error during image upload:', error);
            return null;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const photoUrl = await handleImageUpload();

            if (photoUrl !== null) {
                const updatedDataToSend = {
                    ...formData,
                    image_url: photoUrl,
                };

                const response = await fetch('http://localhost:8000/equipment/post/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedDataToSend),
                });

                const updatedData = await response.json();
                console.log('updatedData', updatedData);

                navigate('/catalog');
            } else {
                console.error('Photo URL is null');
            }
        } catch (error) {
            console.error('Error during ModelingsCard addition:', error);
        }
    };

    return (
        <div className="add-modelings-card-container">
            <NavbarEq />
            <Header showCart={false} showApp={false} />

            <div className='myClass'>
                <h2>Добавление оборудования</h2>

                <form onSubmit={handleSubmit}>
                    <label>Название:</label>
                    <input type="text"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="pricemy" // Add class name for styling
                        required
                    />

                    <label>Описание:</label>
                    <textarea name="description"

                        value={formData.description}
                        onChange={handleChange} required
                    />

                    <label>Изображение:</label>
                    <input
                        type="file"
                        name="photo"
                        onChange={handleChange}
                        className="photomy" // Add class name for styling
                        required
                    />

                    <label>Цена:</label>
                    <input
                        type="text"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        className="pricemy" // Add class name for styling
                        required
                    />
                    <button type="submit"
                        className="buttonmy"
                    >Добавить оборудование</button>
                </form>
            </div>
        </div>
    );
};

export default AddModelingsCard;
