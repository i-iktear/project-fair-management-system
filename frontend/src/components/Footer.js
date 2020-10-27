import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className="text-center py-3">
            Made by Aurko with{" "}
            <i className="fas fa-heart" style={{ color: "red" }}></i>
            <i className="far fa-heart" style={{ color: "red" }}></i>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
