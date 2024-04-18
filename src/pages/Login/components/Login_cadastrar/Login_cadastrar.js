import React from "react";
import './login_cadastrar.css';
import capa from '../assets/images/diversidade.png';

const Login_cadastrar= () => {
    return (
        <>
            <div className="container_esquerda">
                <img src={capa} alt="" />

                <div className="faixa_cadastro">
                    <p>Ainda não tem conta?</p>
                    <p className="link_cadastro"><a href="/cadastro">CADASTRE-SE</a></p>
                </div>
            </div>
        </>
    )
}

export default Login_cadastrar;