import React from 'react';
import './sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faLock, faBell, faMessage, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'

function Sidebar() {
  return (
        <>
        <div className="sidebar">
            <nav className="sidebar_navigation">
                <ul>
                    <li>
                        <a href="">
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
                        <a href="">
                        <FontAwesomeIcon icon={faBell} />
                            <span>NOTIFICAÇÕES</span>
                        </a>
                    </li>
                    <li>
                        <a href="">
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
    </>
  )
}

export default Sidebar