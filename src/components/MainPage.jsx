import NavbarEq from './Navbar';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Header from './Header';
import FooterAnyMetro from './Footer';
import '../style/MainPage.css';
import backgroundImage from '/backIMag.jpeg';

const MainPage = () => {
  const sectionStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    height: '100vh',
  };

  return (
    <div>
      <NavbarEq />
      <Header showCart={false} showApp={true} />
      <div style={sectionStyle}>
        <Container>
          <Row className="justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
            <Col xs={12} md={8} lg={6}>
              <h1 className="text-black text-center">Исследуйте наше химическое оборудование</h1>
              <p className="text-black text-center">
                Мы предлагаем широкий ассортимент высококачественного химического оборудования для удовлетворения ваших лабораторных и промышленных потребностей.
                Будь то реакторы, дистилляционные установки или аналитические приборы, у нас есть решения для вас.
                Изучите наш каталог и найдите идеальное оборудование для улучшения ваших химических процессов.
              </p>
              <div className="text-center">
                <Link to="/catalog" className="btn btn-primary">
                  Просмотреть каталог
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <FooterAnyMetro />
    </div>
  );
};

export default MainPage;
