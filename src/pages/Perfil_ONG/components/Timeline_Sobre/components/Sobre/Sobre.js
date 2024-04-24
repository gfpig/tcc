import React from 'react'
import './sobre.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' ;
import { faLocationDot, faPhone, faEnvelope, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import foto_perfil from './assets/cats.png';

function Sobre() {
  return (
    <div className='container_sobre'>
        <img src={foto_perfil} alt="logo_ong" />
        <div className='informacoes_instituicao'>
            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eget ligula eu lectus lobortis condimentum. Aliquam nonummy auctor massa. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla at risus. Quisque purus magna, auctor et, sagittis ac, posuere eu, lectus. Nam mattis, felis ut adipiscing</li>
            <br />
            <li><FontAwesomeIcon icon={ faLocationDot } /><span className='titulo'>ENDEREÇO:</span><span>Rua Bell Alliance, 225 - Jd. São Caetano, São Caetano do Sul, SP</span></li>
            <br />
            <li><FontAwesomeIcon icon={ faPhone } /><span className='titulo'>TEL: </span><span> (11) 4232-9552</span></li>
            <br />
            <li><FontAwesomeIcon icon={faWhatsapp} /><span className='titulo'>WHATSAPP: </span><span>(11) 91234-5678 </span></li>
            <br />
            <li><FontAwesomeIcon icon={faEnvelope} /><span className='titulo'>E-MAIL: </span><span>f168dir@cps.sp.gov.br</span></li>
            <br />
            <li><FontAwesomeIcon icon={faGlobe} /><span className='titulo'>SITE: </span><span>https://www.fatecsaocaetano.edu.br/#</span></li>
        </div>
    </div>
  )
}

export default Sobre