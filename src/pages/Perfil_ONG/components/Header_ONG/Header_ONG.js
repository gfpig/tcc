import React from 'react'
import './header_ong.css';
import foto from './icons/cats.png'
import header from './icons/paisagem.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandHoldingHeart } from '@fortawesome/free-solid-svg-icons';

function Header_ONG() {
  return (
    <div className='header_instituicao'>
        <div className='container_fotoONG'>
            <img className='fotoONG' src={foto} alt='foto de perfil' />
        </div>    
    </div>
  )
}

export default Header_ONG