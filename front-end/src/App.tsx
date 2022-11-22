import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/register";
import Transacoes from "./pages/Transacoes";

import { AuthProvider } from "./store/AuthContext";
declare function createRoutesFromElements(
  children: React.ReactNode
): RouteObject[];

interface RouteObject {
  caseSensitive?: boolean;
  children?: RouteObject[];
  element?: React.ReactNode;
  index?: boolean;
  path?: string;
}
const App: React.FC = () => {
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/login/register" element={<Register />} />
          <Route path="/transacoes" element={<Transacoes />} />
        </Routes>
      </AuthProvider>
    </div>
  );
};

export default App;
