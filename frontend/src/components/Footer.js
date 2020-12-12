import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className="text-center py-3">
            Made by Aurko and Shanjida <i className="fas fa-award"></i>
            <i className="fas fa-spider-web" style={{ color: "red" }}></i>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
