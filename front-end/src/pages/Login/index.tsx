import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Container, Form, InputGroup, Modal } from "react-bootstrap";
import logo from "../../assets/images/logo_ng.png";
import { Link, useNavigate } from "react-router-dom";
import UserService from "../../services/user.service";
import "./login.css";
const Login: React.FC = () => {
  const [name, setName] = useState("");
  const [smShow, setSmShow] = useState(false);
  const [message, setMessage] = useState("");
  const [validName, setValidName] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  let navigate = useNavigate();

  const signup = async () => {
    new UserService()
      .login(name, password)
      .then(function (response) {
        const { data } = response;
        localStorage.setItem("token", data);
        navigate("/transacoes");
        console.log(response);
      })
      .catch(function (error) {
        setSmShow(true);
        setMessage("nome ou senha invalida !");
        console.log("ERRO -> ", error);
      });
  };
  const ValidateName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const minLength = 3;
    if (event?.target.value.length >= minLength) {
      setValidName(true);
    } else {
      setValidName(false);
    }
    setName(event.target.value);
  };
  const validatePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const validPassword = /^(?=.*?[A-Z])(?=.*?[0-9]).{8,}$/;
    if (validPassword.test(event.target.value)) {
      setValidPassword(true);
    } else {
      setValidPassword(false);
    }
    setPassword(event.target.value);
  };
  const submit = () => {
    if (validPassword && validName) return false;
    return true;
  };

  return (
    <Container className={"login"}>
      <Card style={{ width: "18rem", display: "flex" }}>
        {/* <img src={logo} alt="logo" /> */}
        <Card.Img variant="top" src={logo} />
        <Card.Body>
          <Card.Title>Login</Card.Title>
          <label className="form-label" htmlFor="name">
            Nome
            <input
              className="form-control"
              type="text"
              id="name"
              onChange={(event) => ValidateName(event)}
            />
          </label>
          <label className="form-label" htmlFor="password">
            Senha
            <input
              className="form-control"
              type="password"
              id="password"
              onChange={(event) => validatePassword(event)}
            />
          </label>
          <Button
            variant="dark"
            style={{ marginTop: "0.5rem", marginRight: "0.5rem" }}
            disabled={submit()}
            onClick={signup}
          >
            entrar
          </Button>
          <Link to="register">
            <Button
              variant="outline-dark"
              style={{ marginTop: "0.5rem", marginLeft: "0.5rem" }}
            >
              Criar conta
            </Button>
          </Link>
          <Modal
            size="sm"
            show={smShow}
            onHide={() => setSmShow(false)}
            aria-labelledby="example-modal-sizes-title-sm"
          >
            <Modal.Header closeButton>
              <Modal.Title id="example-modal-sizes-title-sm">
                Notificação
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>{message}</Modal.Body>
          </Modal>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;
