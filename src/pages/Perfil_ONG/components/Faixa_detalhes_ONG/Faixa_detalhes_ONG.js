import React, {useState, useEffect} from 'react'
import { useLocation } from 'react-router-dom';
import './faixa_detalhes_ong.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' ;
import { faClipboardList, faPencil, faPlus } from '@fortawesome/free-solid-svg-icons';
import { createClient } from "@supabase/supabase-js";
import Swal from 'sweetalert2';

const PROJECT_URL = "https://xljeosvrbsygpekwclan.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhsamVvc3ZyYnN5Z3Bla3djbGFuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ1MTY1NzAsImV4cCI6MjAzMDA5MjU3MH0.InFDrSOcPxRe4LXMBJ4dT59bBb3LSpKw063S90E3uPo"
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

function Faixa_detalhes_ONG() {

  const location = useLocation();
  const instituicao = location.state

  const [isInstituicao, setIsInstituicao] = useState(null) //variável para saber se o usuário é a instituição do perfil
  const [sessao, setSessao] = useState()

  useEffect(() => {
    const verificaSessao = async () => { //pegando a sessão e colocando numa variável
      const { data: { session }} = await supabase.auth.getSession();
      setSessao(session)
      if (session !== null) {
        if(instituicao.id === session.user.id) {
          setIsInstituicao(true)
        } else {
          setIsInstituicao(false)
        }
      } else {
        setIsInstituicao(false)
      }
    }
    verificaSessao()
  }, [])

  const HandleClick_Candidatar = async () => {
    const resposta = window.confirm("Tem certeza que quer se candidatar?")

    if(resposta) {
      //console.log("Candidatou-se")
      try { //coloca o post na tabela
        const { error } = await supabase
        .from('solicitacao')
        .insert({
          id_instituicao: instituicao.id,
          id_candidato: sessao.user.id,
          status: "EM ANÁLISE"
        })

        if(!error) {
          Swal.fire({
            icon: "success",
            title: "Candidatura enviada!"
          })
        }
      } catch (erro) { //se não estão, cria um novo erro para ser exibido ao usuário
        let mensagem;
        if (sessao === null) {mensagem = "Faça login antes de continuar"} else {
          mensagem = "Um erro ocorreu"
        }
          console.log("Ocorreu um erro: ", erro.message);
          Swal.fire({
            icon: "error",
            title: mensagem
          })
      }
    }
  }

  return (
    <>
    {isInstituicao !== null ?
      <div className='container_faixa_detalhes'>
        <div className='container_nomeONG'>
            <h2>{instituicao.nomeinstituicao}</h2>
        </div>
        <div className='container_acoesONG'>
            <button className='acessar_form' title="Formulário de cadastro"><FontAwesomeIcon icon={ faClipboardList } size='2x' /></button>
            {isInstituicao ? <button className='editar_perfil'><a href='/configuracoes_ong'><FontAwesomeIcon icon={ faPencil } /> Editar Perfil</a></button>
            : <button className='editar_perfil' onClick={HandleClick_Candidatar}><FontAwesomeIcon icon={ faPlus } /> Candidatar-se</button>}
        </div>
      </div>
    : null}
    </>
  )
}

export default Faixa_detalhes_ONG