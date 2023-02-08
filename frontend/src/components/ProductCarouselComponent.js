import Carousel from "react-bootstrap/Carousel";
import { LinkContainer } from "react-router-bootstrap";

const ProductCarouselComponent = () => {
  const cursorP = {
    cursor: "pointer",
  };
  return (
    <Carousel>
      <Carousel.Item>
        <img
          crossorigin="anonymous"
          className="d-block w-100"
          style={{ height: "300px", objectFit: "cover" }}
          src="/images/carousel/car1.jpg"
          alt="Rose"
        />
        <Carousel.Caption>
          <LinkContainer style={cursorP} to="/product-list/category/Rose">
            <h3 classNmae="bodyPart">Rose</h3>
          </LinkContainer>
          
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          style={{ height: "300px", objectFit: "cover" }}
          src="/images/carousel/car2.jpg"
          alt="Orchid"
        />
        <Carousel.Caption>
          <LinkContainer style={cursorP} to="/product-list/category/Orchid">
            <h3 classNmae="bodyPart">Orchid</h3>
          </LinkContainer>

        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          style={{ height: "300px", objectFit: "cover" }}
          src="/images/carousel/car3.jpg"
          alt="Lily"
        />
        <Carousel.Caption>
          <LinkContainer style={cursorP} to="/product-list/category/Lily">
            <h3 classNmae="bodyPart">Lily</h3>
          </LinkContainer>

        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default ProductCarouselComponent;
