import React from 'react'
import './header_ong.css';
import foto from './icons/greenpiece.jpg'
import header from './icons/header.jpg'

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