import React from 'react'
import './sobre.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' ;
import { faLocationDot, faPhone, faEnvelope, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import foto_perfil from './assets/greenpiece.jpg';

function Sobre() {
  return (
    <div className='container_sobre'>
        <img src={foto_perfil} alt="logo_ong" />
        <div className='informacoes_instituicao'>
            <li>Organização sem fins lucrativos, fundada em 1962 e administrada pelo Rotary Club de Santo André, que atende gratuitamente jovens e adolescentes da região do grande ABCDM, através de Programas de Qualificação Social e Profissional e Empregabilidade.</li>
            <br />
            <li><FontAwesomeIcon icon={ faLocationDot } /><span className='titulo'>ENDEREÇO:</span><span>Avenida Dom Jorge Marcos de Oliveira nº 120 - Vila Guiomar, Santo André, SP, Brazil</span></li>
            <br />
            <li><FontAwesomeIcon icon={ faPhone } /><span className='titulo'>Tel: </span><span> (11) 4438-7733</span><span className='titulo'>Tel: </span><span> (11) 4438-7575</span></li>
            <br />
            <li><FontAwesomeIcon icon={faWhatsapp} /><span className='titulo'>WHATSAPP: </span><span>(11) 94209-1914 </span></li>
            <br />
            <li><FontAwesomeIcon icon={faEnvelope} /><span className='titulo'>E-MAIL: </span><span> coordenacao@abcaprendiz.org.br</span></li>
            <br />
            <li><FontAwesomeIcon icon={faGlobe} /><span className='titulo'>Site: </span><span> www.abcaprendiz.org.br</span></li>
        </div>
    </div>
  )
}

export default Sobre