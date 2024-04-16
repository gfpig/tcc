import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Login from './pages/Login/Login'
import Cadastro from './pages/Cadastro/Cadastro';
import Configuracoes_ONG from './pages/Configuracoes_ONG/Configuracoes_ONG';
import Busca from './pages/Busca/Busca';
import Perfil_ONG from './pages/Perfil_ONG/Perfil_ONG';

import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "cadastro",
    element: <Cadastro />
  },
  {
    path: "configuracoes_ong",
    element: <Configuracoes_ONG />
  },
  {
    path: "resultado",
    element: <Busca />
  },
  {
    path: "perfil_instituicao",
    element: <Perfil_ONG />
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
