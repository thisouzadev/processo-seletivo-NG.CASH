import React, { useState } from "react";
import { Button, Card, Form, Modal } from "react-bootstrap";
import "./register.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const HOST = process.env.REACT_APP_API_HOST || "localhost";
const PROTOCOL = process.env.REACT_APP_API_PROTOCOL || "http";

const Register: React.FC = () => {
  const [smShow, setSmShow] = useState(false);
  const [name, setName] = useState("");
  const [validName, setValidName] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [message, setMessage] = useState("");

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

  const handleButtonRegister = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();

    axios
      .post(`https://laughable-stone-production.up.railway.app/users`, {
        username: name,
        password: password,
      })
      .then(function (response) {
        setSmShow(true);
        setMessage("cadastro feito com sucesso !");
        console.log(response);
      })
      .catch(function (error) {
        setSmShow(true);
        setMessage("Tente cadastrar outro nome !");
        console.log("ERRO -> ", error);
      });
  };
  const handleKeyPress = (event: any) => {
    if (event.key === "Enter") {
      handleButtonRegister;
    }
  };
  return (
    <div className="container mt-5">
      {" "}
      <Card className="mt-5">
        <Card.Title style={{ textAlign: "center" }}>Cadastro</Card.Title>
        <Card.Body>
          <Form action="/" method="post" className="formContainer">
            <label className="form-label" htmlFor="name">
              Nome
              <input
                className="form-control"
                type="text"
                id="name"
                onChange={(event) => ValidateName(event)}
                placeholder="digite um nome valido"
              />
            </label>
            <label className="form-label" htmlFor="password">
              Senha
              <input
                className="form-control"
                type="password"
                id="password"
                onChange={(event) => validatePassword(event)}
                placeholder="******"
              />
            </label>
            <Form.Text>pelo menos 1 letra maiúscula</Form.Text>
            <Form.Text>pelo menos 1 número</Form.Text>
            <Form.Text>8 caracteres</Form.Text>
            <div>
              <Link to="/login">
                <Button style={{ marginRight: "1rem" }} variant="outline-dark">
                  Voltar
                </Button>
              </Link>
              <Button
                variant="dark"
                type="submit"
                disabled={submit()}
                onKeyPress={handleKeyPress}
                onClick={handleButtonRegister}
              >
                CADASTRAR
              </Button>
            </div>
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
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Register;
