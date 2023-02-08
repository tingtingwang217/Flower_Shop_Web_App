import { Button } from "react-bootstrap";


const AboutPageComponent = () => {
  return (
    <div className="aboutPart footPad">
      <h2 className="aboutTitle">About Us</h2>
      <p className="aboutText">Flower is a symbol of love and care. They are 
      great to celebrate a special occasion and communicate 
      what words cannot say. No matter what the reason and season, 
      at Sara's flower shop, you can always find what you want.
       We also offer a wide range of services related to flowers, weddings and all kinds 
      of events. We are committed to quality and pour our hearts
       into creating the finest floral designs, well-thought 
       events and truly blossom moments in life. Our misssion goes beyond beautiful blooms. We also bring love, beauty and strength to you.
       </p>
      <div className="tablePart">
        <table cellspacing="10">
          <tr>
            <td className="tableSub col-table">Address</td>
            <td className="tableSub col-uni">Phone</td>
            <td className="tableSub">Email</td>
          </tr>

          <tr>
            <td class="col-table">227 Suimech St, Toronto, ON, M5B 3I9</td>
            <td class="col-uni">416-349-0955</td>
            <td>saraflower@hotmail.com</td>
          </tr>

        </table>
      </div>

      <div className="contactPad">
        <h2 className="aboutTitle">Contact Us</h2>
        <Button
          onClick={() =>
            (window.location = "mailto:wangtingting217@hotmail.com")
          }
        >
          Email Us
        </Button>
      </div>
    </div>
  );
};

export default AboutPageComponent;

