import React from 'react'
import './resultados.css';
import greenpiece from './icons/greenpiece.jpg'
import abcaprendiz from './icons/LOGO.png'


function Resultados() {
  return (
    <div className='resultados'>
        <div className='container_resultado'>
            <div className='info_ong'>
                <img src={greenpiece} alt="logo_ong"/>
                <div className='container__dadosResultado'>
                    <span>
                        <p className='nome_ong'>GREENPIECE</p>
                        <p>Organização sem fins lucrativos, fundada em 1962 e administrada pelo Rotary Club de Santo André, que atende gratuitamente jovens e adolescentes da região do grande ABCDM...</p>
                    </span>

                    <div className='opcoes_resultado'>
                        <button>SITE</button>
                        <button>MAIS INFORMAÇÕES</button>
                    </div> 
                </div>       
            </div>
            
        </div>

        <div className='container_resultado'>
            <div className='info_ong'>
                <img src={abcaprendiz} alt="logo_ong"/>
                <div className='container__dadosResultado'>
                    <span>
                        <p className='nome_ong'>ABC APRENDIZ</p>
                        <p>Organização sem fins lucrativos, fundada em 1962 e administrada pelo Rotary Club de Santo André, que atende gratuitamente jovens e adolescentes da região do grande ABCDM...</p>
                    </span>

                    <div className='opcoes_resultado'>
                        <button>SITE</button>
                        <button>MAIS INFORMAÇÕES</button>
                    </div>
                </div>     
            </div>
            
        </div>
    </div>
  )
}

export default Resultados