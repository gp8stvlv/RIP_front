// Header.jsx

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"; // Importing useDispatch once is enough
import { Link } from "react-router-dom";
import Breadcrumbs from "./Breadcrumbs";
import { FaShoppingCart, FaShoppingBasket } from "react-icons/fa";
import "../style/Header.css";

const Header = ({ showCart, showApp, userRequestId }) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const { draft_id, modelingCount, updateNavbarFlag } = useSelector((state) => state.bucket);

  useEffect(() => {
    if (updateNavbarFlag) {
      console.log('Updating Navbar...');
      dispatch(updateNavbar(false)); // Reset the flag
    }
  }, [updateNavbarFlag, dispatch]);


  const isCartActive = draft_id && modelingCount > 0;
  const isUserRequestIdNull = userRequestId === null;

  const cartIcon = isUserRequestIdNull ? <FaShoppingBasket size={30} className="" /> : <FaShoppingCart size={30} className="" />;

  return (
    <div className="header">
      <div className="breadcrumbs-container">
        <Breadcrumbs />
      </div>
      {isAuthenticated && showApp && (
        <Link to="/catalog/applications" className="applications-link">
          <a className="applications-button">Мои заявки</a>
        </Link>
      )}
      {/* корзина */}
      {isAuthenticated && showCart && (
        <>
          {isUserRequestIdNull ? (
            <div className={`cart-icon-container bucket-style inactive-cart`}>
              {cartIcon}
              {isCartActive && (
                <div className="cart-counter">
                  <span>{modelingCount}</span>
                </div>
              )}
            </div>
          ) : (
            <Link to={`/catalog/applications/${userRequestId}`} state={{ userRequestId: userRequestId }} className="cart-link">
              <div className={`cart-icon-container bucket-style`} disabled={!isCartActive}>
                {cartIcon}
                {isCartActive && (
                  <div className="cart-counter">
                    <span>{modelingCount}</span>
                  </div>
                )}
              </div>

            </Link>
          )}
        </>
      )}
    </div>
  );
};

export default Header;
