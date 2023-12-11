import React, { FC, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Breadcrumbs from './Breadcrumbs';
import './Catalog.css';
import logoImage from './CH.png';

// Определение типа для объекта "Букет"
interface chemistryEquipment {
    chemistry_product_id: number;
    type: string;
    description: string;
    image_url: string;
    price: string;
    status: string;
    image_url_after_serializer: string;
}

// Mock data for chemistryEquipment
const chemistryEquipmentMocks: chemistryEquipment[] = [
    {
        chemistry_product_id: 1,
        type: 'Test Equipment 1',
        description: 'Description for Test Equipment 1',
        image_url: 'https://example.com/image1.jpg',
        price: '100',
        status: 'In Stock',
        image_url_after_serializer: 'https://example.com/image1_after_serializer.jpg',
    },
    {
        chemistry_product_id: 2,
        type: 'Test Equipment 2',
        description: 'Description for Test Equipment 2',
        image_url: 'https://example.com/image2.jpg',
        price: '150',
        status: 'Out of Stock',
        image_url_after_serializer: 'https://example.com/image2_after_serializer.jpg',
    },
    // Add more mock objects as needed
];

// Компонент "Catalog" представляет собой функциональный компонент React
const CatalogPage: FC = () => {
    // Хук useNavigate предоставляет функцию для навигации между страницами
    const navigateTo = useNavigate();
    // Хук useLocation предоставляет информацию о текущем URL
    const location = useLocation();
    // Получение параметров запроса из URL
    const queryParams = new URLSearchParams(location.search);
    const searchParam = queryParams.get('type') || '';
    const priceParam = queryParams.get('price') || '';

    // Использование хука useState для управления состоянием компонента
    const [equipments, setEquipment] = useState<chemistryEquipment[]>(chemistryEquipmentMocks);
    const [searchValue, setSearchValue] = useState(searchParam);
    const [priceValue, setPriceValue] = useState(priceParam);

    // Функция для отправки запроса на сервер и получения данных об оборудовании
    const fetchChemistryEquipments = (searchText: string, price: string) => {
        const apiUrl = `/equipment?type=${searchText}&price=${price}`;

        console.log('Fetching from:', apiUrl);

        fetch(apiUrl)
            .then((response) => {
                console.log('Response status:', response.status);

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                return response.json();
            })
            .then((data) => {
                console.log('Data received:', data);
                setEquipment(data);
            })
            .catch((error) => {
                console.error('Error fetching ChemistryEquipments:', error);
            });
    };

    // Массив объектов для построения breadcrumbsItems
    const breadcrumbsItems = [{ label: 'Каталог', link: '' }]; // Ссылка на текущую страницу

    // Обработчик события для кнопки поиска
    const handleSearchClick = () => {
        // Перенаправление на ту же страницу с новыми параметрами запроса
        navigateTo(`/RIP_Front/catalog/?type=${searchValue}&price=${priceValue}`);
        // Запрос данных после перенаправления на новый URL
        fetchChemistryEquipments(searchValue, priceValue);
    };

    // Хук useEffect используется для выполнения действий при монтировании компонента
    // или при изменении значения параметра поиска (searchValue)
    useEffect(() => {
        // Запрос данных при первом монтировании компонента или при изменении параметра поиска
        fetchChemistryEquipments(searchValue, priceValue);
    }, []); // Обновление эффекта при каждом изменении searchValue

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
                            onChange={(event) => setSearchValue(event.target.value)}
                        />
                        <input
                            type="number"
                            id="price-input"
                            placeholder="Цена"
                            value={priceValue}
                            onChange={(event) => setPriceValue(event.target.value)}
                        />
                        <button type="button" id="search-button" onClick={handleSearchClick}>
                            Искать
                        </button>
                    </div>

                    {equipments.map((chemistryEquipment) => (
                        <div className="col-4" key={chemistryEquipment.chemistry_product_id}>
                            <div className="card">
                                <img
                                    src={
                                        chemistryEquipment.image_url_after_serializer !== '' &&
                                            chemistryEquipment.image_url_after_serializer !== 'http://localhost:9000/images/images/None'
                                            ? chemistryEquipment.image_url_after_serializer
                                            : logoImage
                                    }
                                    alt={chemistryEquipment.type}
                                    className="card-img-top"
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{chemistryEquipment.type}</h5>
                                    {/* <p className="card-text">{chemistryEquipment.description}</p> */}
                                    <p className="card-text">Цена: {chemistryEquipment.price} рублей</p>
                                    {/* Add more text elements here if needed */}

                                    <a
                                        href={`/EquipmentDetail/${chemistryEquipment.chemistry_product_id}/`}
                                        className="btn btn-primary"
                                        style={{ height: '40px' }}
                                    >
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
