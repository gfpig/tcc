import React from 'react';
import './footer.css';
import ana from '../../assets/devs/ana_giulia.png';
import antonio from '../../assets/devs/antonio.jpg';
import flavia from '../../assets/devs/flavia.jpeg';
import gabrielle from '../../assets/devs/gabrielle.jpg';

const Footer = () => {
    return (
        <div className='footer'>
            <h1>Desenvolvedores: </h1>
            <div className='container_devs'>
                <div className='dev1'>
                    <div className='foto'>
                        <img src={ana} alt="" />
                        <h3>Ana Giulia Senra Nascimento</h3>
                    </div>
                    <p><center>20 anos. Tecnica em administração e Administradora de banco de dados pela ETEC.</center></p>
                </div>
                <div className='dev2'>
                    <div className='foto'>
                        <img src={antonio} alt="" />
                        <h3>Antonio Victor Lopes Silva</h3>
                    </div>
                    <p><center>23 anos, apaixonado por dados e de games, pai de pet.</center></p>
                </div>
                <div className='dev3'>
                    <div className='foto'>
                        <img src={flavia} alt="" />
                        <h3>Flávia Conceição Ramos</h3>
                    </div>
                    <p><center>24 anos, apaixonada por tecnologia. Resiliente, persistente e curiosa, sempre em busca de novos desafios e conhecimentos.</center></p>
                </div>
                <div className='dev4'>
                    <div className='foto'>
                        <img src={gabrielle} alt="" />
                        <h3>Gabrielle Fantinati Pignatari</h3>
                    </div>
                    <p><center>24 anos, amante de programação front-end, mãe de pet e cronicamente online</center></p>
                </div>
            </div>
        </div>
    );
}

export default Footer;