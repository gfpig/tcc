import React from 'react';
import './solicitacoes.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' ;
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import foto_perfil from './icons/icon_ong.png';


function Solicitacoes() {
  return (
    <>
        <div className='cabecalho__candidatura'>
            <div><p>INSTITUIÇÕES</p></div>
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
                        <p className='nome_candidato'>ABC APRENDIZ</p>
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
                <img src={foto_perfil} alt="icon_candidato"/>
                <div className='container__dadosCandidato'>
                    <span>
                        <p className='nome_candidato'>Pequeno Cidadão</p>
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