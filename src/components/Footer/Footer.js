import React from 'react';
import './footer.css';
import ana from '../../assets/devs/ana_giulia.jpg';
import antonio from '../../assets/devs/antonio.jpg';
import flavia from '../../assets/devs/flavia.jpg';
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
                    <p>Breve descrição sobre o perfil da pessoa e quem é a Ana</p>
                </div>
                <div className='dev2'>
                    <div className='foto'>
                        <img src={antonio} alt="" />
                        <h3>Antonio Victor Lopes Silva</h3>
                    </div>
                    <p>Breve descrição sobre o perfil da pessoa e quem é o Antonio</p>
                </div>
                <div className='dev3'>
                    <div className='foto'>
                        <img src={flavia} alt="" />
                        <h3>Flávia Conceição Ramos</h3>
                    </div>
                    <p>Breve descrição sobre o perfil da pessoa e quem é a Flávia</p>
                </div>
                <div className='dev4'>
                    <div className='foto'>
                        <img src={gabrielle} alt="" />
                        <h3>Gabrielle Fantinati Pignatari</h3>
                    </div>
                    <p>Breve descrição sobre o perfil da pessoa e quem é a Gabrielle</p>
                </div>
            </div>
        </div>
    );
}

export default Footer;