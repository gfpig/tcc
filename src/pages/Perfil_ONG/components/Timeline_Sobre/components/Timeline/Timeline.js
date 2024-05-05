import React from 'react'
import './timeline.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' ;
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import Posts from './Posts/Posts';

function Timeline() {
  return (
    <div class="flex flex-col ml-3 mr-3 md:ml-0 md:mr-0 items-center self-center">

      <div className='funcoes_postar'>
        <textarea className='digitar_post' placeholder="Digite seu post" />

        <div className='acoes_postar'>
            <button className='selecionar_imagem'><FontAwesomeIcon icon={ faCamera } size="2xl" /></button>
            <button className='publicar'>PUBLICAR</button>
        </div>
      </div>

      <Posts />
    </div>
  )
}

export default Timeline