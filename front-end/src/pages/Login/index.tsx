import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Container, Form, InputGroup } from "react-bootstrap";
// import './Login.css';
import logo from "../../assets/images/logo_ng.png";
import { Link } from "react-router-dom";

const Login: React.FC = () => {
  return (
    <Container>
      <Card style={{ width: "18rem", display: "flex" }}>
        {/* <img src={logo} alt="logo" /> */}
        <Card.Img variant="top" src={logo} />
        <Card.Body>
          <Card.Title>Login</Card.Title>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
            <Form.Control
              placeholder="Username"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </InputGroup>
          <Form.Label htmlFor="inputPassword5">Password</Form.Label>
          <Form.Control
            type="password"
            id="inputPassword5"
            // aria-describedby="passwordHelpBlock"
          />
          {/* <Form.Text id="passwordHelpBlock" muted>
          Your password must be 8-20 characters long, contain letters and
          numbers, and must not contain spaces, special characters, or emoji.
        </Form.Text> */}
          <Button
            variant="primary"
            style={{ marginTop: "0.5rem", marginRight: "0.5rem" }}
          >
            entrar
          </Button>
          <Link to="register">
            <Button
              variant="outline-primary"
              style={{ marginTop: "0.5rem", marginLeft: "0.5rem" }}
            >
              Criar conta
            </Button>
          </Link>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;
