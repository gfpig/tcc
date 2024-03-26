import React from "react";
import './form_login.css';

const Form_login = () => {
    return (
        <>
            <div className="div_login">
                <h1>BEM-VINDO!</h1>
                <div className="inputs">
                    <input type="email" placeholder="E-mail" />
                    <input type="password" placeholder="Senha" />
                </div>
                <p style={{fontstyle: "italic", alignself: "end"}}><a href="" className="esqueci_senha">Esqueci a senha</a></p>
                <button>ENTRAR</button>
            </div>
        </>
    )
}

export default Form_login;