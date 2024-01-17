import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumbs from './Breadcrumbs';
import './EquipmentDetailPage.css';
import logoImage from './CH.png';

const EquipmentDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [chemistryEquipmentData, setChemistryEquipmentDataData] = useState({
        type: '',
        description: '',
        image_url: '',
        price: '',
        status: '',
        image_url_after_serializer: ''
    });


    const breadcrumbsItems = [
        { label: 'Каталог', link: 'equipment/' },
        { label: 'Подробнее', link: '' }
    ];


    useEffect(() => {
        const fetchChemistryEquipmentData = async () => {
            try {
                const response = await fetch(`/equipment/${id}`);
                const data = await response.json();
                setChemistryEquipmentDataData(data);
            } catch (error) {
                console.error('Error fetching ChemistryEquipmentData data:', error);
            }
        };

        fetchChemistryEquipmentData();
        return () => {
        };
    }, [id]);

    return (

        <div className="container">
            {
                <div className="row">
                    <Breadcrumbs items={breadcrumbsItems} /> {/* Include Breadcrumbs component */}
                    <div className="col">
                        <div className="card">
                            <img
                                src={(chemistryEquipmentData.image_url_after_serializer != '' && chemistryEquipmentData.image_url_after_serializer !== 'http://localhost:9000/images/images/None') ? chemistryEquipmentData.image_url_after_serializer : logoImage}
                                alt={chemistryEquipmentData.image_url_after_serializer}
                                className="card-img-top"
                            />
                            <div className="card-body">
                                <h5 className="card-title">{chemistryEquipmentData.type}</h5>
                                <p className="card-text">{chemistryEquipmentData.description}</p>
                                <p className="card-text">Цена: {chemistryEquipmentData.price} рублей</p>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default EquipmentDetailPage;