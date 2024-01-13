import { Container, Nav, Navbar } from 'react-bootstrap';
import '../style/Footer.css';

// import backgroundImage from '/footer.webp';

function FooterAnyMetro() {
  return (
    <div>
      {/* <Image src={backgroundImage} fluid alt="Background Image" className="full-width-image" /> */}
      <Navbar className="color-navbar custom-navbar" expand="lg">
        <Container>
          <Nav className="ms-auto footer-text">
            <p>©Химическое оборудование</p>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default FooterAnyMetro;
