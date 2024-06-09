import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import './sobre.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' ;
import { faLocationDot, faPhone, faEnvelope, faGlobe, faHandHoldingHeart } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { createClient } from "@supabase/supabase-js";
//import foto_perfil from './assets/cats.png';

const PROJECT_URL = "https://xljeosvrbsygpekwclan.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhsamVvc3ZyYnN5Z3Bla3djbGFuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ1MTY1NzAsImV4cCI6MjAzMDA5MjU3MH0.InFDrSOcPxRe4LXMBJ4dT59bBb3LSpKw063S90E3uPo"
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

function Sobre() {
  const location = useLocation();
  const instituicao = location.state

  const [fotoPerfil, setFotoPerfil] = useState(null)
  const [fetchDone, setFetchDone] = useState(false)
  
  const FetchFotoStorage = async () => {
    try {
      const { data } = await supabase.storage.from('avatares').getPublicUrl(instituicao.foto);
      setFotoPerfil(data.publicUrl)
    } finally {
      setFetchDone(true)
    }
  }

  FetchFotoStorage();

  return (
    <>
    {fetchDone ?
    <div className='container_sobre'>
        {instituicao.foto ?
        <img src={fotoPerfil} alt="foto_instituicao" />
        : <div className="flex items-center justify-center overflow-clip bg-white h-52 w-52"><FontAwesomeIcon icon={ faHandHoldingHeart } size='8x' color='orange' /></div>
        }
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
    : null }
    </>
  )
}

export default Sobre