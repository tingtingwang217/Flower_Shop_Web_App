import { Alert, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const AddedToCartMessageComponent = ({ showCartMessage, setShowCartMessage }) => {
  const navigate = useNavigate(); //returns a function that lets you navigate programmatically
    const goBack = () => {
        navigate(-1); //hitting the back button
    }

  return (
    <Alert
      show={showCartMessage}
      variant="success"
      onClose={() => setShowCartMessage(false)}
      dismissible
    >
      <Alert.Heading>The product was added to your cart!</Alert.Heading>
      <p>
        <Button variant="success" onClick={goBack}>Go back</Button>{" "}
        <Link to="/cart">
          <Button variant="danger">Go to cart</Button>
        </Link>
      </p>
    </Alert>
  );
};

export default AddedToCartMessageComponent;

