// ModelCard.jsx
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import '../style/ModelCard.css';
import { addModelingToBucket } from '../actions/bucketActions'; // Import both actions
import { useNavigate } from 'react-router-dom';

const ModelingsCard = ({
  chemistry_product_id,
  type,
  description,
  image_url,
  price,
  status,
  image_url_after_serializer,
  onDelete, // Add onDelete prop here
}) => {
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  const isUserAuthorized = isAuthenticated;

  const navigate = useNavigate();

  const handleAddToBucket = () => {
    if (user) {
      dispatch(addModelingToBucket(chemistry_product_id));
      dispatch(updateNavbar());
      navigate('/catalog');
    }
  };


  return (
    <div className="custom-card">
      <Link to={`/catalog/${chemistry_product_id}`} className="card-href">
        <img src={image_url_after_serializer} alt={type} className="custom-card-img" />
        <div className="custom-card-body">
          <p className="custom-card-text text-center">{type}</p>
          <p className="custom-card-price text-center">{price} рублей</p>
        </div>
      </Link>
      {isUserAuthorized && (
        <div className="button-container">
          <button className="add-to-cart-button" onClick={handleAddToBucket}>
            В корзину
          </button>
        </div>
      )}
    </div>
  );
};

export default ModelingsCard;
