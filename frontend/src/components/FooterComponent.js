import { Container, Row, Col } from "react-bootstrap";

const FooterComponent = () => {
  return (
    <footer >
      <Container fluid>
        <Row className="mt-5">
          <Col className="foot text-white text-center py-5">
            Copyright &copy; Sara's Flower Shop
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default FooterComponent;
