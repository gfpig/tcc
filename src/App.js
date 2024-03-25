import logo from './logo.svg';
import './App.css';
import Stepper from "./components/Stepper/Stepper.jsx"
import Header from './components/Header/Header.js';
import Footer from './components/Footer/Footer.js';
import Menu from './components/Menu/Menu.js';

const App = () => {
  return (
    <>
      <Menu />
      <Header style={{marginTop:"50px"}} />
      <div className="bg-zinc-50 flex flex-col gap-10 h-96 mt-10 items-center justify-center">
          <Stepper />
      </div>
      <Footer />
    </>
  );
};

export default App;
