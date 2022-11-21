import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/register";

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
      {/* <AuthProvider children={undefined}> */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      {/* </AuthProvider> */}
    </div>
  );
};

export default App;
