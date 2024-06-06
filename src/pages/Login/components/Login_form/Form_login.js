import React, {useState} from "react";
import './form_login.css';
import {useForm} from 'react-hook-form';
import { createClient } from "@supabase/supabase-js";
import { useLocation, useNavigate } from "react-router-dom";

const PROJECT_URL = "https://xljeosvrbsygpekwclan.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhsamVvc3ZyYnN5Z3Bla3djbGFuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ1MTY1NzAsImV4cCI6MjAzMDA5MjU3MH0.InFDrSOcPxRe4LXMBJ4dT59bBb3LSpKw063S90E3uPo"
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

function CreateUser (valoresDoLogin) {
    const [values, setValues] = React.useState(valoresDoLogin.initialValues);
    const {clearErrors} = useForm();

    return {
        values, 
        handleChange: (evento) => {
            clearErrors('ErroLogin');
            document.getElementById("alerta_login").style.display = "none";
            const value = evento.target.value;
            const name = evento.target.name;
            //console.log("value: ", value);
            setValues ({
                ...values,
                [name]: value,
            });    
            //console.log("value: ", value);
        },
    };
}

const Form_login = () => {
    //variáveis para redirecionar o usuário após o login bem sucedido
    const navigate = useNavigate();

    const {setError, formState} = useForm();
    const { errors } = formState;
    const formLogin = CreateUser({
        initialValues: { email: "", senha: ""}
    });
    const formRecuperacaoSenha = CreateUser({
        initialValues: {email: ''}
    });
    const [esqueciSenha, setEsqueciSenha] = useState(false)

    return (
        <>
        {console.log(esqueciSenha)}
        
            <div className="form__login">
                <div className="div_login">     
                    <h1>BEM-VINDO!</h1>
                    {!esqueciSenha &&
                        <form onSubmit={async (e) => {
                            e.preventDefault();
                            
                            try{
                                const { data, error } = await supabase.auth.signInWithPassword({
                                    email: formLogin.values.email,
                                    password: formLogin.values.senha,
                                })

                                if(data.user === null && data.session === null) { //caso o login falhe
                                    setError('ErroLogin', { message: "E-mail ou senha incorretos." });
                                    document.getElementById("alerta_login").style.display = "block";
                                    return;
                                }

                                if (error) { //se deu algum erro
                                    setError('ErroLogin', { message: "Um erro inesperado ocorreu" });
                                    return;
                                } else { //se o usuário foi logado com sucesso
                                    navigate("/");
                                }
                            } catch (error) {
                                console.error('Sign in error:', error.message);
                            }
                        }}>
                        <div className="inputs">
                            <input type="email" name="email" value={ formLogin.values.email } placeholder="E-mail" onChange={ formLogin.handleChange } required />
                            <input type="password" name="senha" value={ formLogin.values.senha } placeholder="Senha" onChange={ formLogin.handleChange } required />
                            <p className="italic self-end mt-3 esqueci_senha" onClick={() => setEsqueciSenha(!esqueciSenha)}>Esqueci a senha</p>
                            <button>ENTRAR</button>
                            {errors && <div className="text-red-600 mt-0 mb-2" id="alerta_login" style={{display: "none"}}>{errors.ErroLogin?.message}</div>}
                        </div>    
                    </form>  
                    }
                    {esqueciSenha &&
                    <form onSubmit={async (e) => {
                        e.preventDefault();
                            
                        /*Código para mandar o e-mail de alterar senha */
                        try {
                            const {error} = await supabase
                            .auth
                            .resetPasswordForEmail(formRecuperacaoSenha.values.email, {
                                redirectTo: "http://localhost:3000/redefinir_senha"
                            })
                            //console.log(formRecuperacaoSenha.values.email)
                            //console.log("https://tcc-phi-two.vercel.app/")
                        } catch (error) {
                            console.log(error)
                        }
                    }}>
                        <div className="inputs">
                            <input type="email" name="email" value={ formRecuperacaoSenha.values.email } placeholder="E-mail" onChange={ formRecuperacaoSenha.handleChange } />
                            <p className="italic self-end mt-3 esqueci_senha" onClick={() => setEsqueciSenha(!esqueciSenha)}>Voltar</p>
                            <button>CONFIRMAR</button>
                            {errors && <div className="text-red-600 mt-0 mb-2" id="alerta_login" style={{display: "none"}}>{errors.ErroLogin?.message}</div>}
                        </div>    
                    </form>  
                    }
                </div>
            </div>
        </>
    )
}

export default Form_login;