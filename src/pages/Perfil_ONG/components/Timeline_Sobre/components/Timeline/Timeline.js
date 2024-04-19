import React from 'react'
import './timeline.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' ;
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import Posts from './Posts/Posts';

function Timeline() {
  return (
    <div style={{display: "flex", flexDirection:"column"}}>
        <textarea className='digitar_post' placeholder="Digite seu post" />

        <div className='acoes_postar'>
            <button className='selecionar_imagem'><FontAwesomeIcon icon={ faCamera } size="2xl" /></button>
            <button className='publicar'>PUBLICAR</button>
        </div>

        <Posts />
    </div>
  )
}

export default Timeline