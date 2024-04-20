import React, {useState} from 'react'
import './notificacoes.css';

function Notificacoes() {
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
            <p className='nome_candidato'>Greenpeace</p>
            <p>Aceitou sua candidatura, cheque seu e-mail para mais informações</p>
        </div>
        <div className='solicitacao'>
            <p className='nome_candidato'>ABC Aprendiz</p>
            <p>Não aprovou sua candidatura.</p>
        </div>
        <div className='solicitacao'>
            <p className='nome_candidato'>Greenpeace</p>
            <p>Aceitou sua candidatura, cheque seu e-mail para mais informações</p>
        </div>
        <div className='solicitacao'>
            <p className='nome_candidato'>ABC Aprendiz</p>
            <p>Não aprovou sua candidatura.</p>
        </div>
        <div className='solicitacao'>
            <p className='nome_candidato'>Greenpeace</p>
            <p>Aceitou sua candidatura, cheque seu e-mail para mais informações</p>
        </div>
        <div className='solicitacao'>
            <p className='nome_candidato'>ABC Aprendiz</p>
            <p>Não aprovou sua candidatura.</p>
        </div>
        <div className='solicitacao'>
            <p className='nome_candidato'>Greenpeace</p>
            <p>Aceitou sua candidatura, cheque seu e-mail para mais informações</p>
        </div>
        <div className='solicitacao'>
            <p className='nome_candidato'>ABC Aprendiz</p>
            <p>Não aprovou sua candidatura.</p>
        </div>
        <div className='solicitacao'>
            <p className='nome_candidato'>Greenpeace</p>
            <p>Aceitou sua candidatura, cheque seu e-mail para mais informações</p>
        </div>
        <div className='solicitacao'>
            <p className='nome_candidato'>ABC Aprendiz</p>
            <p>Não aprovou sua candidatura.</p>
        </div>
    </div>
    </>
  )
}

export default Notificacoes