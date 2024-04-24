import React from 'react';
import './solicitacoes.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' ;
import { faUserCircle, faCircle } from '@fortawesome/free-solid-svg-icons';
import foto_perfil from './icons/user_female.webp';


function Solicitacoes() {
  return (
    <>
        <div className='cabecalho__candidatura'>
            <div><p>CANDIDATOS</p></div>
            <div>
                <select>
                    <option>FILTRAR</option>
                    <option>Aprovado</option>
                    <option>Em análise</option>
                    <option>Não aprovado</option>
                </select>
            </div>
        </div>
        <hr className='hr_solicitacoes' />
        <div className='container__candidato'>
            <div className='info_candidatura'>
                <FontAwesomeIcon icon={ faUserCircle } size='8x' color='#e87f45' />
                <div className='container__dadosCandidato'>
                    <span>
                        <p className='nome_candidato'>Gabrielle Fantinati Pignatari</p>
                        <p>Data de nascimento: 08/06/2000</p>
                        <p>Gênero: Menina Mulher</p>
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
                <FontAwesomeIcon icon={ faUserCircle } size='8x' color='#e87f45' />
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