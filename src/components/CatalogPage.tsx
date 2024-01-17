import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Breadcrumbs from './Breadcrumbs';
import './Catalog.css'
import image_1 from '/static/images/spektrofotometr-nano-500.png';
import image_2 from '/static/images/avtoklav-s-vertikalnoy-zagruzkoy-mvs-83-obem-75-litrov.jpg';

// Определение типа для объекта "ChemistryEquipment"
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

const CatalogPage: React.FC = () => {
    const navigateTo = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchParam = queryParams.get('type') || '';
    const priceParam = queryParams.get('price') || '';

    const [equipments, setEquipments] = useState<ChemistryEquipment[]>([]);
    const [searchValue, setSearchValue] = useState(searchParam);
    const [priceValue, setPriceValue] = useState(priceParam);

    const fetchEquipments = (searchText: string, price: string) => {
        // Use mock data instead of fetching from the API
        const filteredEquipments = chemistryEquipmentMocks.filter(equipment =>
            equipment.type.toLowerCase().includes(searchText.toLowerCase()) &&
            equipment.price.includes(price)
        );
        setEquipments(filteredEquipments);
    };
    const breadcrumbsItems = [
        { label: 'Каталог', link: '' } // Link to the current page
    ];

    const handleSearchClick = () => {
        navigateTo(`/?type=${searchValue}&price=${priceValue}`);
        fetchEquipments(searchValue, priceValue);
    };

    useEffect(() => {
        fetchEquipments(searchValue, priceValue);
    }, []);

    return (
        <div className="album">
            <div className="container">
                <div className="row">
                    <Breadcrumbs items={breadcrumbsItems} /> {/* Include Breadcrumbs component */}
                    <div className="search-bar">
                        <input
                            type="text"
                            id="search-input"
                            placeholder="Поиск"
                            value={searchValue}
                            onChange={(event => setSearchValue(event.target.value))}
                        />
                        <input
                            type="number"
                            id="price-input"
                            placeholder="Цена"
                            value={priceValue}
                            onChange={(event => setPriceValue(event.target.value))}
                        />
                        <button type="button" id="search-button" onClick={handleSearchClick}>
                            Искать
                        </button>
                    </div>

                    {equipments.map((equipment) => (
                        <div className="col" key={equipment.chemistry_product_id}>
                            <div className="card">
                                <img src={equipment.image_url} alt={equipment.type} className="card-img-top" />
                                <div className="card-body">
                                    <h5 className="card-title">{equipment.type}</h5>
                                    <p className="card-text">{equipment.description}</p>
                                    <p className="card-text">Цена: {equipment.price} рублей</p>
                                    <a href={`/RIP_front/#equipment/${equipment.chemistry_product_id}/`} className="btn btn-primary">
                                        Подробнее
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CatalogPage;
