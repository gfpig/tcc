import React from 'react';
import './menu.css';
import logotipo from '../../assets/other/logotipo_temporario.png';
import search from '../../assets/icons/search_bar.png';

const Menu = () => {
    return (
        <>
        <nav>
            <ul className="menu">
                <div className='logo'>
                    <img src={logotipo} alt="logotipo" />
                </div>
                <div className='search_bar'>
                    
                    <input id="search-input" type="text" maxLength="800" placeholder="Digite o nome da ONG" />
                    <img src={search} alt="" />
                </div>
                <div className='container__login'>
                    <button id="botao-login" className="botaoLogin"><a href="/login">LOGIN</a></button>
                </div>
            </ul>
        </nav>
        </>
    );
}

export default Menu;