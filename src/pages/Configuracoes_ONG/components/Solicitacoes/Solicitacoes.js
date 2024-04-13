import React from 'react';
import './solicitacoes.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' ;
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import foto_perfil from './icons/user_female.webp';


function Solicitacoes() {
  return (
    <>
        <div className='cabecalho__candidatura'>
            <div><p>CANDIDATOS</p></div>
            <div>
                <select>
                    <option>FILTRAR</option>
                </select>
            </div>
        </div>
        <hr className='hr_solicitacoes' />
        <div className='container__candidato'>
            <div className='info_candidatura'>
                <img src={foto_perfil} alt="icon_candidato"/>
                <div className='container__dadosCandidato'>
                    <span>
                        <p className='nome_candidato'>Gabrielle Fantinati Pignatari</p>
                        <p>Data de nascimento: 08/06/2000</p>
                        <p>Gênero: Menina Mulher</p>
                        <p>E-mail: gabriellepignatari@gmail.com</p>
                    </span>
                </div>     
            </div>
            <div className='status_candaditura'>
                    <div className='status analise'>
                        <FontAwesomeIcon icon={ faCircle } />
                        <span>EM ANÁLISE</span>
                    </div>
                    <button>VISUALIZAR FORMULÁRIO</button>
            </div>
        </div>
        <div className='container__candidato'>
            <div className='info_candidatura'>
                <img src={foto_perfil} alt="icon_candidato"/>
                <div className='container__dadosCandidato'>
                    <span>
                        <p className='nome_candidato'>Antonio Victor Lopes Silva</p>
                        <p>Data de nascimento: 19/03/2001</p>
                        <p>Gênero: Masculino</p>
                    </span>
                </div>
            </div>
            <div className='status_candaditura'>
                <div className='status aprovado'>
                    <FontAwesomeIcon icon={ faCircle } />
                    <span>APROVADO</span>
                </div>
                <button>VISUALIZAR FORMULÁRIO</button>
            </div>
        </div>
        </>
  )
}

export default Solicitacoes