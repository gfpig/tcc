import React from 'react'
import { useLocation } from 'react-router-dom'
import './sobre.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' ;
import { faLocationDot, faPhone, faEnvelope, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import foto_perfil from './assets/cats.png';

function Sobre() {
  const location = useLocation();
  const instituicao = location.state

  return (
    <div className='container_sobre'>
        <img src={foto_perfil} alt="logo_ong" />
        <div className='informacoes_instituicao'>
            <li>{instituicao.descricao}</li>
            <br />
            <li><FontAwesomeIcon icon={ faLocationDot } /><span className='titulo'>ENDEREÇO:</span><span>{instituicao.logradouro}, {instituicao.numero} - {instituicao.bairro}, {instituicao.cidade}, {instituicao.uf}</span></li>
            <br />
            <li><FontAwesomeIcon icon={ faPhone } /><span className='titulo'>TEL: </span><span>{instituicao.telefone}</span></li>
            {instituicao.whatsapp && <><br />
            <li><FontAwesomeIcon icon={faWhatsapp} /><span className='titulo'>WHATSAPP: </span><span>{instituicao.whatsapp}</span></li></>}
            <br />
            <li><FontAwesomeIcon icon={faEnvelope} /><span className='titulo'>E-MAIL: </span><span>{instituicao.emailinstituicao}</span></li>
            {instituicao.site && <><br />
            <li><FontAwesomeIcon icon={faGlobe} /><span className='titulo'>SITE: </span><span>{instituicao.site}</span></li></>}
        </div>
    </div>
  )
}

export default Sobre