import React from 'react';
import './header.css';
import header_image from '../../assets/other/header_temporario.png';
import logotipo from '../../assets/other/logotipo_temporario.png';

const Header = () => {
    return (
    <>
        <div className='header'>
            <div className='container_logo'>
                <img className='logotipo' src={logotipo} alt='logotipo' />
            </div>
            <div className='descricao'>
                <h1>CADUCEU</h1>
                <p>NOSSA PLATAFORMA TEM COMO OBJETIVO PRINCIPAL FACILITAR A CONEXÃO ENTRE ONGs E QUALQUER PESSOA QUE ESTEJA INTERESSADA EM PARTICIPAR COMO BENERFICIÁRIO DELAS.
                    AQUI, TANTO ORGANIZAÇÕES QUANTO FUTUROS BENEFICIÁRIOS PODEM CRIAR SUAS CONTAS E USUFRUIR DAS VANTAGENS DO NOSSO SITE.
                </p>
            </div>
            
        </div>
        {/*<img className='header_img' src={header_image} alt="header" />*/}
    </>
    );
}

export default Header;