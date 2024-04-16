import React from 'react'
import './header_ong.css';
import foto from './icons/greenpiece.jpg'

function Header_ONG() {
  return (
    <div className='header'>
        <div className='container_fotoONG'>
            <img className='fotoONG' src={foto} alt='foto de perfil' />
        </div>    
    </div>
  )
}

export default Header_ONG