import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Login from './pages/Login/Login'
import Cadastro from './pages/Cadastro/Cadastro';
import Configuracoes_ONG from './pages/Configuracoes_ONG/Configuracoes_ONG';
import Busca from './pages/Busca/Busca';
import Perfil_ONG from './pages/Perfil_ONG/Perfil_ONG';
import Configuracoes_Candidato from './pages/Configuracoes_Candidato/Configuracoes_Candidato';
import Redefinir_Senha from './pages/Redefinir_Senha/Redefinir_Senha';

import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "login",
    element: (
        <Login />
    )
  },
  {
    path: "cadastro",
    element: (
        <Cadastro />
    )
  },
  {
    path: "configuracoes_ong",
    element: (
        <Configuracoes_ONG />
    )
  },
  {
    path: "configuracoes_candidato",
    element: (
        <Configuracoes_Candidato />
    )
  },
  {
    path: "resultado",
    element: <Busca />
  },
  {
    path: "perfil_instituicao",
    element: (
        <Perfil_ONG />
    )
  },
  {
    path: "login/redefinir_senha",
    element: <Redefinir_Senha />
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RouterProvider router={router} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
