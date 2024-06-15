import React from 'react'
import { useLocation } from 'react-router-dom';
import './faixa_detalhes_ong.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' ;
import { faClipboardList, faPencil } from '@fortawesome/free-solid-svg-icons';

function Faixa_detalhes_ONG() {

  const location = useLocation();
  const instituicao = location.state

  return (
    <>
      <div className='container_faixa_detalhes'>
        <div className='container_nomeONG'>
            <h2>{instituicao.nomeinstituicao}</h2>
        </div>
        <div className='container_acoesONG'>
            <button className='acessar_form'><FontAwesomeIcon icon={ faClipboardList } size='2x' /></button>
            <button className='editar_perfil'><a href='/configuracoes_ong'><FontAwesomeIcon icon={ faPencil } /> Editar Perfil</a></button>
        </div>
      </div>
    </>
  )
}

export default Faixa_detalhes_ONG