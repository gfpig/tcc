import logo from './logo.svg';
import './App.css';
import Stepper from "./components/Stepper/Stepper.jsx"
import Header from './components/Header/Header.js';
import Footer from './components/Footer/Footer.js';
import Menu from './components/Menu/Menu.js';
import { useState } from 'react';

/* IMPORTANDO PÁGINAS */
import Login from './pages/Login/Login'
import Cadastro from './pages/Cadastro/Cadastro';
import Configuracoes_ONG from './pages/Configuracoes_ONG/Configuracoes_ONG';
import Busca from './pages/Busca/Busca';
import Perfil_ONG from './pages/Perfil_ONG/Perfil_ONG';
import Configuracoes_Candidato from './pages/Configuracoes_Candidato/Configuracoes_Candidato';
import Redefinir_Senha from './pages/Redefinir_Senha/Redefinir_Senha';

import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  //const [token, setToken] = useState(false); //false = usuário não logado

  return (
    <>
      {/*<BrowserRouter>

          <Route path="/" element = {<App />} />
          <Route path="login" element = {<Login />} />
          <Route path="cadastro" element = {<Cadastro />} />
          <Route path="configuracoes_ong" element = {<Configuracoes_ONG />} />
          <Route path="configuracoes_candidato" element = {<Configuracoes_Candidato />} />
          <Route path = "resultado" element = {<Busca />} />
          <Route path = "perfil_instituicao" element = {<Perfil_ONG />} />
          <Route path = "login/redefinir_senha" element = {<Redefinir_Senha />} />

      </BrowserRouter>*/}

      <Menu style={{backgroundColor: "#cccccc"}}/>
      <Header style={{marginTop:"50px"}} />
      <div className="bg-zinc-50 flex md:flex-col gap-10 md:h-96 xl:mt-10 items-center justify-center">
          <Stepper />
      </div>
      <Footer />
    </>
  );
};

export default App;
