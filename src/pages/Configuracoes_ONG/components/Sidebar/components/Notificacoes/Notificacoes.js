import React, {useState, useEffect} from 'react'
import './notificacoes.css';
import { createClient } from "@supabase/supabase-js";
import Swal from 'sweetalert2';

const PROJECT_URL = "https://xljeosvrbsygpekwclan.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhsamVvc3ZyYnN5Z3Bla3djbGFuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ1MTY1NzAsImV4cCI6MjAzMDA5MjU3MH0.InFDrSOcPxRe4LXMBJ4dT59bBb3LSpKw063S90E3uPo"
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

function Notificacoes() {
    document.title = "Notificações"
    const [filtroAtual, setFiltroAtual] = useState(0);
    const [fetchDone, setFetchDone] = useState(false);
    const [notificacoes, setNotificacoes] = useState([])

    useEffect (() => {
        if (!fetchDone) {
            fetchNotificacoes()
        }
    }, [fetchDone])

    const fetchNotificacoes = async () => {
        const { data: { session }} = await supabase.auth.getSession()      
        try {
            const { data } = await supabase
            .from('notificacao')
            .select('*, candidato(nomecandidato)')
            .eq('tipo_mensagem', "Solicitação")
            .eq('id_instituicao', session.user.id)

            if (data) {
                setNotificacoes(data)

                Visualizado()
            }
        } catch (erro) {
            console.log("Erro:", erro.message)
        } finally {
            setFetchDone(true)
        }
    }

    const Visualizado = async () => {
        const { data: { session }} = await supabase.auth.getSession()
        const { error } = await supabase
        .from('notificacao')
        .update({
            visualizado: true
        })
        .eq('id_instituicao', session.user.id)
        .eq('tipo_mensagem', 'Solicitação')

        if(error) {
            console.log("Ocorreu um erro", error.message)
        }
    }

  return (
    <>
    {fetchDone ? 
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
        {notificacoes.map((notificacao) => (
            <>
            {console.log(notificacao)}
            <div className='solicitacao'>
                <p className='nome_candidato'>{notificacao.candidato.nomecandidato}</p>
                <p>Candidatou-se a uma vaga na sua organização, acesse a tela de solicitações para ver mais informações e DECIDIR SE O CANDIDATO ATENDE OS REQUISITOS.</p>
            </div>
            </>
        ))}
    </div>
    </>
    : null}
    </>
    
  )
}

export default Notificacoes