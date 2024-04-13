import React from 'react';
import './solicitacoes.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' ;
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import foto_perfil from './icons/user_female.webp';


function Solicitacoes() {
  return (
    <div className='container__candidatura'>
        <div className='info_candidatura'>
            <img src={foto_perfil} alt="icon_candidato"/>
            <div className='container__dadosCandidato'>
                <span>
                    <p className='nome_candidato'>Gabrielle Fantinati Pignatari</p>
                    <p>Data de nascimento: 08/06/2000</p>
                    <p>Gênero: Menina Mulher</p>
                </span>
            </div>
        </div>
        <div className='status_candaditura'>
            <div>
                <FontAwesomeIcon icon={ faCircle } />
                EM ANÁLISE
            </div>
            <button>VISUALIZAR FORMULÁRIO</button>
        </div>
    </div>
  )
}

export default Solicitacoes