import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Login from "./src/pages/Login/";
import Cadastro from "./src/pages/Cadastro";
import Home from "./src/pages/Entrada";
import Pedidos from "./src/pages/Pedidos";
import Produtos from "./src/pages/Produtos";
import Clientes from "./src/pages/Clientes";


export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Cadastro" element={<Cadastro />} />
        <Route path='/Home' element={<Home />} />
        <Route path="/Clientes" element={<Clientes />} />
        <Route path="/Produtos" element={<Produtos />} />
        <Route path="/Pedidos" element={<Pedidos />} />
      </Routes>
    </BrowserRouter>
  );
}
