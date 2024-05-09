import logo from './logo.svg';
import './App.css';
import Stepper from "./components/Stepper/Stepper.jsx"
import Header from './components/Header/Header.js';
import Footer from './components/Footer/Footer.js';
import Menu from './components/Menu/Menu.js';
import { useState } from 'react';

/* PÁGINAS */

const App = () => {
  //const [token, setToken] = useState(false); //false = usuário não logado

  return (
    <>
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
