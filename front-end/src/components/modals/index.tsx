import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import TransactionsService from "../../services/transacoes.service";
import UserService from "../../services/user.service";
import { useAuth } from "../../store/AuthContext";

type UserByName = [
  {
    id: number;
    username: string;
    accounts: {
      id: number;
      balance: number;
    };
  }
];

function UsernameNG(props: any) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [getUsers, setGetUsers] = useState<UserByName>();
  const [value, setValue] = useState(1);
  const { user, setSmShow, smShow } = useAuth();

  useEffect(() => {
    new UserService()
      .getAllUser(localStorage.getItem("token"))
      .then(({ data }) => {
        setGetUsers(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const token = localStorage.getItem("token");
  const handleClick = () => {
    new TransactionsService()
      .depositar(value, name, token)
      .then(function (response: any) {
        setSmShow(true);
        setMessage("deposito feito com sucesso");
        console.log(response);
      })
      .catch(function (error: any) {
        setSmShow(true);
        setMessage("operação invalida !");
        console.log("ERRO -> ", error);
      });
  };
  const submit = () => {
    if (value <= user.accounts.balance) return false;
    return true;
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Transferir</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <section
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <label className="form-label" htmlFor="name">
            Nome
            <input
              className="form-control"
              type="text"
              id="name"
              onChange={(event) => setName(event.target.value)}
              placeholder="nome"
            />
          </label>
          <label className="form-label" htmlFor="number">
            valor R$
            <input
              className="form-control"
              type="number"
              id="number"
              min="1"
              value={value}
              max={user.accounts.balance}
              onChange={(event) => setValue(Number(event.target.value))}
              placeholder="valor"
            />
          </label>
          <Button
            variant="outline-dark"
            disabled={submit()}
            onClick={handleClick}
          >
            Depositar
          </Button>
        </section>
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
        <Table striped bordered hover style={{ textAlign: "center" }}>
          <thead>
            <tr>
              <th>Usuários NG</th>
            </tr>
          </thead>
          <tbody>
            {getUsers?.map((user) => (
              <tr key={user.id}>
                <td>{user.username}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="dark" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UsernameNG;
