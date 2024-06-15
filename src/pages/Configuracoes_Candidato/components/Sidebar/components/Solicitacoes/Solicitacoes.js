import React from 'react';
//import './solicitacoes.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandHoldingHeart, faCircle } from '@fortawesome/free-solid-svg-icons';
import foto_perfil from './icons/icon_ong.png';


function Solicitacoes() {
  return (
    <>
        <div className='cabecalho__candidatura'>
            <div><p>INSTITUIÇÕES</p></div>
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
                <FontAwesomeIcon icon={ faHandHoldingHeart } size='8x' color='white' />
                <div className='container__dadosCandidato'>
                    <span>
                        <p className='nome_candidato'>Lorem Ipsum</p>
                        <p>Área: Educação</p>
                        <p>Categoria: Profissionalizante</p>
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
                <FontAwesomeIcon icon={ faHandHoldingHeart } size='8x' color='white' />
                <div className='container__dadosCandidato'>
                    <span>
                        <p className='nome_candidato'>Lorem Ipsum</p>
                        <p>Área: Educação</p>
                        <p>Categoria: Informática</p>
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