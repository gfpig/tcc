import React, {useState} from "react";
//import './form_login.css';
import {useForm} from 'react-hook-form';
import { createClient } from "@supabase/supabase-js";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

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

function Form_redefinir() {
    //variáveis para redirecionar o usuário após o login bem sucedido
    const navigate = useNavigate();

    const {setError, formState} = useForm();
    const { errors } = formState;
    const formRedefinirSenha = CreateUser({
        initialValues: { senha: "", confirmar_senha: ""}
    });
    return (
    <>
        <div className="form__login">
            <div className="div_login">
                <form onSubmit={async (e) => {
                    e.preventDefault();
                        
                    /*Código para redefinir a senha */
                    if (formRedefinirSenha.values.senha === formRedefinirSenha.values.confirmar_senha) { //se as senhas coincidirem, pode trocar
                        const { data: resetData, error } = await supabase.auth.updateUser({password: formRedefinirSenha.values.senha})
                        if (!error) {
                            Swal.fire({
                                icon: "success",
                                title: "Senha atualizada com sucesso"
                            })
                            //formSenha.clearForm();
                            ///resetaValidacao();
                        } else {
                            Swal.fire({
                                icon: "error",
                                title: "Um erro ocorreu"
                            })
                        }
                    } else {
                        setError("ErroSenha", { message: "As senhas devem coincidir" })
                        document.getElementById("alerta_senha").style.display = "block";
                    }
                }}>
                    <div className="inputs">
                        <input type="password" name="senha" value={ formRedefinirSenha.values.senha } placeholder="Nova senha" onChange={ formRedefinirSenha.handleChange } />
                        <input type="password" name="confirmar_senha" value={ formRedefinirSenha.values.confirmar_senha } placeholder="Confirmar senha" onChange={ formRedefinirSenha.handleChange } />
                        <button>CONFIRMAR</button>
                        {errors && <div className="text-red-600 mt-0 mb-2" id="alerta_login" style={{display: "none"}}>{errors.ErroLogin?.message}</div>}
                    </div>    
                </form>  
            </div>
        </div>
    </>
  )
}

export default Form_redefinir