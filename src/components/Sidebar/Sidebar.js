import React, {useState} from 'react';
import './sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faLock, faBell, faMessage, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import Form_dados from '../../pages/Configuracoes_ONG/components/Form_dados/Form_dados';
import Solicitacoes from '../../pages/Configuracoes_ONG/components/Solicitacoes/Solicitacoes';
import Notificacoes from '../../pages/Configuracoes_ONG/components/Notificacoes/Notificacoes';

function Sidebar() {
    const opcoes = [<Form_dados />, <Notificacoes />, <Solicitacoes />];
    const [opcaoAtual, setOpcaoAtual] = useState(0);
  return (
        <>
        <div style={{display:"flex", justifyContent:"center"}}>
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
                            <a href="">
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
                            <a href="">
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
            </div>
        </div>
    </>
  )
}

export default Sidebar