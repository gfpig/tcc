import React from 'react'
import './resultados.css';
//import greenpiece from './icons/greenpiece.jpg'
//import abcaprendiz from './icons/LOGO.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandHoldingHeart } from '@fortawesome/free-solid-svg-icons';


function Resultados() {
  return (
    <div className='resultados'>
        <div className='container_resultado'>
            <div className='info_ong'>
                <FontAwesomeIcon icon={ faHandHoldingHeart } size='8x' color='white' />
                <div className='container__dadosResultado'>
                    <span>
                        <p className='nome_ong'>LOREM IPSUM</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eget ligula eu lectus lobortis condimentum. Aliquam nonummy auctor massa. Pellentesque habitant morbi tristique senectus et netus...</p>
                    </span>

                    <div className='opcoes_resultado'>
                        <button>SITE</button>
                        <button><a href='/perfil_instituicao'>MAIS INFORMAÇÕES</a></button>
                    </div> 
                </div>       
            </div>
            
        </div>

        <div className='container_resultado'>
            <div className='info_ong'>
                <FontAwesomeIcon icon={ faHandHoldingHeart } size='8x' color='white' />
                <div className='container__dadosResultado'>
                    <span>
                        <p className='nome_ong'>LOREM IPSUM</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eget ligula eu lectus lobortis condimentum. Aliquam nonummy auctor massa. Pellentesque habitant morbi tristique senectus et netus...</p>
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