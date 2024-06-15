import React, {useState, useEffect} from 'react';
import './solicitacoes.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' ;
import { faUserCircle, faCircle } from '@fortawesome/free-solid-svg-icons';
//import foto_perfil from './icons/user_female.webp';
import { createClient } from "@supabase/supabase-js";

const PROJECT_URL = "https://xljeosvrbsygpekwclan.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhsamVvc3ZyYnN5Z3Bla3djbGFuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ1MTY1NzAsImV4cCI6MjAzMDA5MjU3MH0.InFDrSOcPxRe4LXMBJ4dT59bBb3LSpKw063S90E3uPo"
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);


function Solicitacoes() {
    //const [sessao, setSessao] = useState(null)
    const [candidaturas, setCandidaturas] = useState([])
    const [fetchDone, setFetchDone] = useState(false)

    useEffect (() => {

        const verificaSessao = async () => { //pegando a sessão e colocando numa variável
            try {
                const { data: { session }} = await supabase.auth.getSession();
                //console.log(session.user.id)
                //setSessao(session)
                FetchCandidaturas(session)
            } catch (error) {
                console.log(error)
            } //finally {
                //FetchCandidaturas()
            //}
        }
        verificaSessao()
    
        const FetchCandidaturas = async (sessao) => {
            try {
                 /*let query = supabase
                .from('solicitacao')
                .select(`'id_candidato', candidato(nomecandidato)`)
                .eq('id_instituicao', sessao.user.id)

                const { data, error } = await query*/
                
                const { data, error } = await supabase
                .from('solicitacao')
                .select(`*, candidato(*)`)
                .eq('id_instituicao', sessao.user.id);

                //console.log("query", query)
                //console.log("data", data)
                if (error) {
                    console.log(error)
                    setCandidaturas([])
                }
          
                if (data) {
                  console.log(data)
                  setCandidaturas(data)
                }
            } catch (erro) {
                console.log(erro)
            } finally {
                setFetchDone(true)
            }
        }
    }, [])

  return (
    <>
    {fetchDone ?
    <>
    {console.log(candidaturas.map((solicitacao) => (solicitacao.candidato.nomecandidato)))}
        <div className='cabecalho__candidatura'>
            <div><p>CANDIDATOS</p></div>
            <div>
                <select>
                    <option>Cidade</option>
                    <option>São Bernardo do Campo</option>
                    <option>São Caetano do Sul</option>
                    <option>Mauá</option>
                </select>
                <select>
                    <option>Status</option>
                    <option>Aprovado</option>
                    <option>Em análise</option>
                    <option>Não aprovado</option>
                </select>
            </div>
        </div>
        <hr className='hr_solicitacoes' />

        {candidaturas.map((solicitacao) => (
            <>
            <div className='container__candidato'>
                <div className='info_candidatura'>
                    <FontAwesomeIcon icon={ faUserCircle } size='8x' color='#e87f45' />
                    <div className='container__dadosCandidato'>
                        <span>
                            <p className='nome_candidato'>{solicitacao.candidato.nomecandidato}</p>
                            <p>Cidade: {solicitacao.candidato.cidade}</p>
                            <p>Idade: {solicitacao.candidato.nomecandidato}</p>
                            <p>Gênero: {solicitacao.candidato.genero}</p>
                        </span>
                    </div>     
                </div>
                <div className='status_candaditura'>
                        <div className='status analise'>
                            <FontAwesomeIcon icon={ faCircle } />
                            <span>{solicitacao.status}</span>
                        </div>
                        <button>MAIS DETALHES</button>
                </div>
            </div>
            </>
        ))}
        
        <div className='container__candidato'>
            <div className='info_candidatura'>
                <FontAwesomeIcon icon={ faUserCircle } size='8x' color='#e87f45' />
                <div className='container__dadosCandidato'>
                    <span>
                        <p className='nome_candidato'>Gabrielle Fantinati Pignatari</p>
                        <p>Cidade: São Caetano do Sul</p>
                        <p>Idade: 23</p>
                        <p>Gênero: Feminino</p>
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
                        <p>Cidade: São Bernardo do Campo</p>
                        <p>Idade: 23</p>
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
    : null}
        </>
  )
}

export default Solicitacoes