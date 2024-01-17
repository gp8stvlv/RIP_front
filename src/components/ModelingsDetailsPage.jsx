// ModelingsDetailsPage.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import NavbarEq from './Navbar';
import FooterChemistry from './Footer';
import Header from './Header';
import { Link } from 'react-router-dom';
import { getModelingsDetails } from '../actions/modelingsDetailsActions';
import '../style/ModelingsDetailsPage.css';

const ModelingsDetailsPage = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { id } = params;
  const details = useSelector((state) => state.modelingsDetails.details);

  useEffect(() => {
    if (id) {
      dispatch(getModelingsDetails(id));
    }
  }, [id, dispatch]);

  return (
    <div>
      <NavbarEq />
      <Header showCart={false} showApp={true} />
      <div className="model-card">
        <div className="model-card-image">
          <img src={`${details?.image_url_after_serializer}`} alt={details?.type} className="model-detail-card" />
        </div>
        <div className="model-card-description">
          <h2>{details?.type}</h2>
          <p>{details?.description}</p>
          <p>Цена: {details?.price} рублей</p>
          <Link to="/catalog/" className="btn-back-to-models">Вернуться к услугам</Link>
        </div>
      </div>
      <FooterChemistry />
    </div>
  );
};

export default ModelingsDetailsPage;
