import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import UsernameNG from "../../components/modals";
import UserService from "../../services/user.service";
import { useAuth } from "../../store/AuthContext";
import "./transacoes.css";

const Transacoes: React.FC = () => {
  const { user, setUser } = useAuth();
  // const [user, setUser] = useState<IUser>();
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    new UserService()
      .getUser(localStorage.getItem("token"))
      .then(({ data }) => {
        setUser(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [modalShow]);
  const handleClickClearLocalStorage = () => {
    localStorage.clear();
  };
  return (
    <div>
      <header className="header">
        <a href="#default" className="logo">
          {user?.username}
        </a>
        <a href="#default" className="logo">
          {`R$ ${user?.accounts.balance}`}
        </a>
        <div className="header-right">
          <Link
            className="active"
            to="/login"
            onClick={handleClickClearLocalStorage}
          >
            Sair
          </Link>
          <Button variant="primary" onClick={() => setModalShow(true)}>
            Transferir
          </Button>
          <UsernameNG show={modalShow} onHide={() => setModalShow(false)} />
          <a href="#about">About</a>
        </div>
      </header>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Nome</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <td>3</td>
            <td colSpan={2}>Larry the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default Transacoes;
