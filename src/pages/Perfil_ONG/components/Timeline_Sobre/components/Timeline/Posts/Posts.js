import React from 'react'
import './posts.css'
import foto_perfil from './assets/icon.jpg';
import imagem_post from './assets/fatec.png';

function Posts() {
  return (
    <div className='post'>
        <div className='cabecalho_post'>
            <div className='foto_cabecalho'>
                <img src={foto_perfil} alt="foto de perfil da instituição" />
            </div>
            <div className='detalhes_cabecalho'>
                <p className='nome_instituicao'>Lorem Ipsum</p>
                <p>8 de setembro de 2023</p>
            </div>
        </div>
        <div className='corpo_post'>
            <p>
                As inscrições para o vestibular da FATEC já estão abertas! Fique atento às datas para não perder nenhum etapa do processo:
                <br /><br />
                Inscrições apenas no site: www.vestibularfatec.com.br
            </p>
            <img className='img_post' src={imagem_post} alt="imagem" />
        </div>
    </div>
  )
}

export default Posts