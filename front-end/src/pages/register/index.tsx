import React, { useEffect, useState } from "react";
import ErrorLogin from "../../components/Error/index";
import { Button, Card, Form } from "react-bootstrap";
import "./register.css";
import axios from "axios";
import { Link, redirect } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const [error, setError] = useState(false);
  const [name, setName] = useState("");
  const [validName, setValidName] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [messageError, setMessageError] = useState("");
  let navigate = useNavigate();

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
      .post("http://localhost:3001/users", {
        username: name,
        password: password,
      })
      .then(function (response) {
        navigate("/login");
        console.log(response);
      })
      .catch(function (error) {
        // setError(true);
        // setMessageError("usuário ja existe");
        console.log("ERRO -> ", error);
      });
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
                <Button>Voltar</Button>
              </Link>
              <Button
                type="submit"
                disabled={submit()}
                onClick={handleButtonRegister}
              >
                CADASTRAR
              </Button>
            </div>
            {/* {error ? <ErrorLogin message={messageError} /> : ""} */}
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Register;
