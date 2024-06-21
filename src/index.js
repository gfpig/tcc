import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createClient } from "@supabase/supabase-js";
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

/*const PROJECT_URL = "https://xljeosvrbsygpekwclan.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhsamVvc3ZyYnN5Z3Bla3djbGFuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ1MTY1NzAsImV4cCI6MjAzMDA5MjU3MH0.InFDrSOcPxRe4LXMBJ4dT59bBb3LSpKw063S90E3uPo"
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);*/

//const [tipoSessao, setTipoSessao] = useState()

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "login",
    element: <Login />
  },
  {
    path: "cadastro",
    element: <Cadastro />
  },
  {
    path: "configuracoes_ong",
    element: //(
      //<PrivateRoute>
        <Configuracoes_ONG />
      //</PrivateRoute>
    //)
  },
  {
    path: "configuracoes_candidato",
    element: //(
      //<PrivateRoute>
        <Configuracoes_Candidato />
      //</PrivateRoute>
    //)
  },
  {
    path: "resultado",
    element: <Busca />
  },
  {
    path: "perfil_instituicao",
    element: //(
      //<PrivateRoute>
        <Perfil_ONG />
      //</PrivateRoute>
    //)
  },
  {
    path: "login/redefinir_senha",
    element: <Redefinir_Senha />
  }
]);

/*function PrivateRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  useEffect(() => {
    verificaSessao().then((result) => {
      setIsAuthenticated(result);
    });
  }, []);

  console.log(isAuthenticated)

  return isAuthenticated === "deslogado" ? children : <Navigate to="/" />;

}

const verificaSessao = async () => { //pegando a sessão e colocando numa variável
  const { data: { session }} = await supabase.auth.getSession();

  console.log(session)
  if(session === null) {
    return "deslogado"
  }

  if (session.user.user_metadata.cpf === undefined) { //se for instituição
      return "instituicao"
  } else { //se for candidato
    return "candidato"
  }
}*/

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RouterProvider router={router} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
