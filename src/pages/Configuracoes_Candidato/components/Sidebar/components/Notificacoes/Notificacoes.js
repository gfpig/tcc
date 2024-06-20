import React, {useState, useEffect} from 'react'
import './notificacoes.css';
import { createClient } from "@supabase/supabase-js";

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
            let estado = '';

            if(filtroAtual === 1) { estado = true }

            if (filtroAtual === 2) { estado = false }

            const filtro = {
                'visualizado': estado 
            }

            let query = supabase.from('notificacao')
            .select('*, instituicao(nomeinstituicao)')
            .eq('tipo_mensagem', ["Aceito", "Recusa"])
            //.eq('tipo_mensagem', "Recusa")
            .eq('fk_candidato_id', session.user.id)
            .order('codnotificacao', { ascending: false })

            Object.entries(filtro).forEach(([coluna, valor]) => {
                // Checa se o valor do filtro não é vazio/nulo
                if (valor !== '' && valor !== null) {
                    query = query.eq(coluna, valor);
                }
            });

            const { data } = await query

            console.log(query)

            if (data) {
                console.log("data", data)
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
        .eq('fk_candidato_id', session.user.id)
        .eq('tipo_mensagem', "Aceito")
        .eq('tipo_mensagem', "Recusa")

        if(error) {
            console.log("Ocorreu um erro", error.message)
        }
    }

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
        {notificacoes.map((notificacao) => (
            <div className='solicitacao'>
                <p className='nome_candidato'>{notificacao.instituicao.nomeinstituicao}</p>
                <p>Aceitou sua candidatura. Por favor, entre em contato com a instituição através do e-mail ou telefone informados na página de perfil</p>
            </div>
        ))}
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