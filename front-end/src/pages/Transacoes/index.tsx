import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import UsernameNG from "../../components/modals";
import TransactionsService from "../../services/transacoes.service";
import UserService from "../../services/user.service";
import { useAuth } from "../../store/AuthContext";
import "./transacoes.css";
type TransactionsType = {
  id: number;
  balance: number;
  creditTransactions: [
    {
      id: number;
      debitedAccountId: number;
      creditedAccountId: number;
      value: number;
      createdAt: string;
    }
  ];
  debiteTransactions: [
    {
      id: number;
      debitedAccountId: number;
      creditedAccountId: number;
      value: number;
      createdAt: string;
    }
  ];
};

const Transacoes: React.FC = () => {
  const { user, setUser, smShow } = useAuth();
  const [transactions, setTransactions] = useState<TransactionsType>();
  const [modalShow, setModalShow] = useState(false);
  const [getDate, setGetDate] = useState("");
  const token = localStorage.getItem("token");
  const [filterDate, setFilterDate] = useState(false);
  const [getId, setGetId] = useState("");
  useEffect(() => {
    new UserService()
      .getUser(token)
      .then(({ data }) => {
        setUser(data);
      })
      .catch((err) => {
        console.log(err);
      });
    new UserService()
      .getByIdUser(token, 1)
      .then(({ data }) => {
        data.username;
      })
      .catch((err) => {
        console.log(err);
      });
    new TransactionsService()
      .getTransactions(token, getDate)
      .then(({ data }) => {
        setTransactions(data.accounts);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [smShow, filterDate]);
  const handleClickClearLocalStorage = () => {
    localStorage.clear();
  };

  const formatDate = (date: string) => {
    const formantDateString = date.split("-");
    const day = formantDateString[2].split("T");
    const hour = day[1].split(".");
    return `${formantDateString[1]}/${day[0]}/${formantDateString[0]}, ${hour[0]}`;
  };
  const filterByDate = () => {
    setFilterDate(!filterDate);
  };
  const showAllDate = () => {
    setFilterDate(!filterDate);
    setGetDate("");
  };
  return (
    <div>
      <header className="header">
        <a href="#default" className="logo">
          Bem vindo {user?.username}
        </a>
        <a href="#default" className="logo">
          Saldo {`R$ ${user?.accounts.balance}`}
        </a>
        <div className="header-right">
          <Button variant="outline-dark" onClick={() => setModalShow(true)}>
            Transferir
          </Button>
          <Link
            // className="active"
            to="/login"
            onClick={handleClickClearLocalStorage}
          >
            Sair
          </Link>
          <UsernameNG show={modalShow} onHide={() => setModalShow(false)} />
        </div>
      </header>
      <section className="filter">
        <input
          type="date"
          onChange={(event) => setGetDate(event.target.value)}
        />
        <Button variant="outline-dark" onClick={() => filterByDate()}>
          Filtrar
        </Button>
        <Button variant="outline-dark" onClick={() => showAllDate()}>
          mostrar tudo
        </Button>
      </section>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th colSpan={4}>Debited</th>
          </tr>
          <tr>
            <th>Nome debited</th>
            <th>Nome credited</th>
            <th>valor</th>
            <th>data</th>
          </tr>
        </thead>
        <tbody>
          {transactions?.debiteTransactions.map((debited) => (
            <tr key={debited.id}>
              <td>{debited.debitedAccountId}</td>
              <td>{debited.creditedAccountId}</td>
              <td>R$ {debited.value}</td>
              <td>{formatDate(String(debited.createdAt))}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <hr />
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th colSpan={4}>Credited</th>
          </tr>
          <tr>
            <th>Nome debited</th>
            <th>Nome credited</th>
            <th>valor</th>
            <th>data</th>
          </tr>
        </thead>
        <tbody>
          {transactions?.creditTransactions.map((credited) => (
            <tr key={credited.id}>
              <td>{credited.debitedAccountId}</td>
              <td>{credited.creditedAccountId}</td>
              <td>R$ {credited.value}</td>
              <td>{formatDate(String(credited.createdAt))}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Transacoes;
