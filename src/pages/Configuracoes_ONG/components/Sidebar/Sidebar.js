import React, {useState} from 'react';
import './sidebar.css';
import './alterar_senha.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faLock, faBell, faMessage, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import Form_dados from './components/Form_dados/Form_dados';
import Solicitacoes from './components/Solicitacoes/Solicitacoes';
import Notificacoes from './components/Notificacoes/Notificacoes';
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const PROJECT_URL = "https://xljeosvrbsygpekwclan.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhsamVvc3ZyYnN5Z3Bla3djbGFuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ1MTY1NzAsImV4cCI6MjAzMDA5MjU3MH0.InFDrSOcPxRe4LXMBJ4dT59bBb3LSpKw063S90E3uPo"
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

function Sidebar() {
    const opcoes = [<Form_dados />, <Notificacoes />, <Solicitacoes />];
    const [opcaoAtual, setOpcaoAtual] = useState(0);
    const [formVisivel, setFormVisivel] = React.useState(false); //form de trocar senha

    const navigate = useNavigate();

    async function SignOut() {
        const { error } = await supabase.auth.signOut()

        if (error) {
            Swal.fire({
                icon: "error",
                title: "Não foi possível sair da sua conta"
            })
        } else {
            navigate("/login");
        }
    }

  return (
        <>
        <div className='flex justify-center flex-row'>
            {/* SIDEBAR */}
            <div className="sidebar">
                <nav className="sidebar_navigation">
                    <ul>
                        <li>
                            <a className={`${opcaoAtual === 0 && "opcao_selecionada"}`} onClick={() => {
                                setOpcaoAtual(0);
                            }}>
                                <FontAwesomeIcon icon={faPencil} />
                                <span>EDITAR DADOS</span>
                            </a>
                        </li>
                        <li>
                            <a className={`${formVisivel === true && "opcao_selecionada"}`} onClick={() => { 
                                setFormVisivel(true); 
                            }}>
                                <FontAwesomeIcon icon={faLock} />
                                <span>ALTERAR SENHA</span>
                            </a>
                        </li>
                        <li>
                        <a className={`${opcaoAtual === 1 && "opcao_selecionada"}`} onClick={() => {
                                setOpcaoAtual(1);
                            }}>
                                <FontAwesomeIcon icon={faBell} />
                                <span>NOTIFICAÇÕES</span>
                            </a>
                        </li>
                        <li>
                            <a className={`${opcaoAtual === 2 && "opcao_selecionada"}`} onClick={() => {
                                setOpcaoAtual(2);
                            }}>
                                <FontAwesomeIcon icon={faMessage} />
                                <span>SOLICITAÇÕES</span>
                            </a>
                        </li>
                        <li>
                            <a onClick={SignOut}>
                                <FontAwesomeIcon icon={faRightFromBracket} />
                                <span>LOGOUT</span>
                            </a>
                        </li>
                    </ul>       
                </nav>
            </div>

            {/* COMPONENTES QUE MUDAM CONFORME A OPÇÃO SELECIONADA NA SIDEBAR */}
            <div className='container_opcao_selecionada'>
                {opcoes[opcaoAtual]}
                { formVisivel
                ? (
                    <form className='form_alterarSenha'>
                        {/* FORM PROPRIAMENTE DITO */}
                        <div>
                            <button type = "button" className="close-modal" onClick={() => setFormVisivel(false)}>
                                x
                            </button>
                            <input placeholder="Senha atual" />
                            <input placeholder="Nova senha" />
                            <input placeholder="Digite a senha novamente" />
                            <button type="submit">SALVAR</button>
                        </div>
                    </form>
                ) : null    
                }
            </div>
        </div>
    </>
  )
}

export default Sidebar