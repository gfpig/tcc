import React from 'react'
import './faixa_detalhes_ong.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' ;
import { faClipboardList, faPencil } from '@fortawesome/free-solid-svg-icons';

function Faixa_detalhes_ONG() {
  return (
    <>
    <div className='container_faixa_detalhes'>
        <div className='container_nomeONG'>
            <h2>GREENPEACE</h2>
        </div>
        <div className='container_acoesONG'>
            <button className='acessar_form'><FontAwesomeIcon icon={ faClipboardList } size='2x' /></button>
            <button className='editar_perfil'><FontAwesomeIcon icon={ faPencil } /> Editar Perfil</button>
        </div>
    </div>
    
    </>
  )
}

export default Faixa_detalhes_ONG