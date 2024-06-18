import React, {useState} from 'react'
import './notificacoes.css';

function Notificacoes() {
    document.title = "Notificações"
    const [filtroAtual, setFiltroAtual] = useState(0);
  return (
    <>
    <div className='filtros_notificacoes'>
        <button className={`${filtroAtual === 1 && "selecionado"}`} onClick={() => {
            setFiltroAtual(1);
        }}>LIDAS</button>
        <button className={`${filtroAtual === 2 && "selecionado"}`} onClick={() => {
            setFiltroAtual(2);
        }}>PENDENTES</button>
        <button className={`${filtroAtual === 0 && "selecionado"}`} onClick={() => {
            setFiltroAtual(0);
        }}>TODAS</button>
    </div>
    <div className='container__notificacoes'>
        <div className='solicitacao'>
            <p className='nome_candidato'>Antonio Victor Lopes Silva</p>
            <p>Candidatou-se a uma vaga na sua organização, acesse a tela de solicitações para ver mais informações e DECIDIR SE O CANDIDATO ATENDE OS REQUISITOS.</p>
        </div>
        <div className='solicitacao'>
            <p className='nome_candidato'>Gabrielle Fantinati Pignatari</p>
            <p>Cancelou a candidatura em sua organização.</p>
        </div>
        <div className='solicitacao'>
            <p className='nome_candidato'>Antonio Victor Lopes Silva</p>
            <p>Candidatou-se a uma vaga na sua organização, acesse a tela de solicitações para ver mais informações e DECIDIR SE O CANDIDATO ATENDE OS REQUISITOS.</p>
        </div>
        <div className='solicitacao'>
            <p className='nome_candidato'>Gabrielle Fantinati Pignatari</p>
            <p>Cancelou a candidatura em sua organização.</p>
        </div>
        <div className='solicitacao'>
            <p className='nome_candidato'>Antonio Victor Lopes Silva</p>
            <p>Candidatou-se a uma vaga na sua organização, acesse a tela de solicitações para ver mais informações e DECIDIR SE O CANDIDATO ATENDE OS REQUISITOS.</p>
        </div>
        <div className='solicitacao'>
            <p className='nome_candidato'>Gabrielle Fantinati Pignatari</p>
            <p>Cancelou a candidatura em sua organização.</p>
        </div>
        <div className='solicitacao'>
            <p className='nome_candidato'>Antonio Victor Lopes Silva</p>
            <p>Candidatou-se a uma vaga na sua organização, acesse a tela de solicitações para ver mais informações e DECIDIR SE O CANDIDATO ATENDE OS REQUISITOS.</p>
        </div>
        <div className='solicitacao'>
            <p className='nome_candidato'>Gabrielle Fantinati Pignatari</p>
            <p>Cancelou a candidatura em sua organização.</p>
        </div>
        <div className='solicitacao'>
            <p className='nome_candidato'>Antonio Victor Lopes Silva</p>
            <p>Candidatou-se a uma vaga na sua organização, acesse a tela de solicitações para ver mais informações e DECIDIR SE O CANDIDATO ATENDE OS REQUISITOS.</p>
        </div>
        <div className='solicitacao'>
            <p className='nome_candidato'>Gabrielle Fantinati Pignatari</p>
            <p>Cancelou a candidatura em sua organização.</p>
        </div>
    </div>
    </>
  )
}

export default Notificacoes