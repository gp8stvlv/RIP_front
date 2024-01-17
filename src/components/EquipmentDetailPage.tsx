import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumbs from './Breadcrumbs';
import './EquipmentDetailPage.css';
import image_1 from '/static/images/spektrofotometr-nano-500.png';
import image_2 from '/static/images/avtoklav-s-vertikalnoy-zagruzkoy-mvs-83-obem-75-litrov.jpg';

interface ChemistryEquipment {
    chemistry_product_id: number;
    type: string;
    description: string;
    image_url: string;
    price: string;
    status: string;
    image_url_after_serializer: string;
}

// Mock data for chemistryEquipment
const chemistryEquipmentMocks: ChemistryEquipment[] = [
    {
        chemistry_product_id: 1,
        type: 'Автоклав с вертикальной загрузкой MVS-83, объем 75 литров',
        description: 'Паровой стерилизатор с вертикальной загрузкой с температурой стерилизации 115 - 135°C.',
        image_url: image_1,
        price: '100',
        status: 'введен',
        image_url_after_serializer: image_1,
    },
    {
        chemistry_product_id: 2,
        type: 'Спектрофотометр Nano-500',
        description: 'Спектрофотометр и флуориметр в одном приборе. Измерения в малых объемах в диапазоне длин волн 200 – 800 нм.',
        image_url: image_2,
        price: '150',
        status: 'введен',
        image_url_after_serializer: image_2,
    },
];

const EquipmentDetailPage: React.FC = () => {
    const { id } = useParams<{ id?: string }>();
    const [equipmentData, setEquipmentData] = useState<ChemistryEquipment | null>(null);

    useEffect(() => {
        if (id) {
            const equipmentId = parseInt(id, 10);
            const fetchedEquipmentData = chemistryEquipmentMocks.find(equipment => equipment.chemistry_product_id === equipmentId);
            if (fetchedEquipmentData) {
                setEquipmentData(fetchedEquipmentData);
            } else {
                console.error(`Equipment with ID ${equipmentId} not found`);
            }
        }
    }, [id]);


    const breadcrumbsItems = [
        { label: 'Все оборудование', link: '/' },
        { label: 'Подробнее', link: '' }
    ];

    return (
        <div className="container">
            <div className="row">
                <Breadcrumbs items={breadcrumbsItems} />
                <div className="col">
                    {equipmentData ? (
                        <div className="card">
                            <img src={equipmentData.image_url} alt={equipmentData.type} className="card-img-top" />
                            <div className="card-body">
                                <h5 className="card-title">{equipmentData.type}</h5>
                                <p className="card-text">{equipmentData.description}</p>
                                <p className="card-text">Цена: {equipmentData.price} рублей</p>
                            </div>
                        </div>
                    ) : (
                        <p>Загрузка данных...</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EquipmentDetailPage;
