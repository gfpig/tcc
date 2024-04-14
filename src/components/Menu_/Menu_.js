import React from 'react';
import './menu_.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' ;
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import logotipo from '../../assets/other/logotipo_temporario.png';
import search from '../../assets/icons/search_bar.png';

const Menu = () => {
    return (
        <>
        <nav className='navegacao_menu'>
            <ul className="menu_">
                <div className='logo'>
                    <a href="/"><img src={logotipo} alt="logotipo" /></a>
                </div>
                <div className='search_bar'>
                    <input id="search-input" type="text" maxLength="800" placeholder="Digite o nome da ONG" />
                    <a className='busca' href="resultado"><FontAwesomeIcon icon={ faMagnifyingGlass } size="lg" /></a>
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