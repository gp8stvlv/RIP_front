import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../style/Navbar.css';

function NavbarEq() {

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const isModerator = user?.role === 'moderator'; // Replace 'модератор' with the actual role name

  const [showUserProfileMenu, setShowUserProfileMenu] = React.useState(false);

  // const dispatch = useDispatch();
  const handleUserProfileClick = () => {
    setShowUserProfileMenu(!showUserProfileMenu);
  };

  const handleCloseUserProfileMenu = () => {
    setShowUserProfileMenu(false);
  };


  return (
    <Navbar className="color-navbar" expand="lg">
      <Container>
        <Nav className="ms-auto">
          <Link to="/catalog" className="btns-log">
            Каталог
          </Link>

          {isModerator && (
            <Link to="/equipment" className="btns-log">
              Список услуг для редактирования
            </Link>
          )}

          {isModerator && (
            <Link to="/addEquipment" className="btns-log">
              Добавить оборудование
            </Link>
          )}

          {isAuthenticated ? (
            <>
              <div className="btns-log">Имя пользователя: {user.username} </div>
              <Link to="/logout" className="btns-log">
                Выйти
              </Link>
            </>
          ) : (
            <>
              <Link to="/registration" className="btns-log">
                Зарегистрироваться
              </Link>
              <Link to="/login" className="btns-log">
                Войти
              </Link>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavbarEq;