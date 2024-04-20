import React from 'react'
import './posts.css'
import foto_perfil from './assets/greenpiece.jpg';
import imagem_post from './assets/fatec.png';

function Posts() {
  return (
    <div className='post'>
        <div className='cabecalho_post'>
            <div className='foto_cabecalho'>
                <img src={foto_perfil} alt="foto de perfil da instituição" />
            </div>
            <div className='detalhes_cabecalho'>
                <p className='nome_instituicao'>Greenpeace</p>
                <p>8 de setembro de 2023</p>
            </div>
        </div>
        <div className='corpo_post'>
            <p>
                Inscrições abertas para o Programa de Qualificação Profissional!

                Se você tem entre 17 e 21 anos, não deixe de se inscrever em nosso site (www.abcaprendiz.org.br).
                Fique atento(a)! As inscrições vão até o dia 15 de setembro.
            </p>
            <img className='img_post' src={imagem_post} alt="imagem" />
        </div>
    </div>
  )
}

export default Posts