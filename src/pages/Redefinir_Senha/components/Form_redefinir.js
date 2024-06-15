import React, {useState} from "react";
//import './form_login.css';
import {useForm} from 'react-hook-form';
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
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
            //clearErrors('ErroLogin');
            //document.getElementById("alerta_login").style.display = "none";
            const value = evento.target.value;
            const name = evento.target.name;
            setValues ({
                ...values,
                [name]: value,
            });
        },
    };
}

function Form_redefinir() {
    //variáveis para redirecionar o usuário após o login bem sucedido
    const navigate = useNavigate();

    const {setError, formState} = useForm();
    const { errors } = formState;
    const [erros, setErros] = useState({}); //erros do yup
    const formRedefinirSenha = CreateUser({
        initialValues: { senha: "", confirmar_senha: ""}
    });

    //validação da senha nova
    const [validaQtde, setQtde] = useState(false)
    const [validaMaiuscula, setMaiuscula] = useState(false)
    const [validaNumero, setNumero] = useState(false)
    const [validaSimbolo, setSimbolo] = useState(false)

    const validationSchema= yup.object({
        novaSenha: yup.string("Not string 1")
                    .min(8, "")
                    .matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])/, "Os requisitos da senha devem ser atendidos")
                    .required("É necessário informar uma senha"),
        confirmarSenha: yup.string("Not string")
                    .oneOf([yup.ref("senha"), null], "As senhas devem coincidir")
                    .required("É necessário confirmar sua senha"),
    })

    const handlePasswordChange = (e) => {
        const maiuscula = new RegExp('(?=.*[A-Z])');
        const numero = new RegExp('(?=.*[0-9])');
        const simbolo = new RegExp('(?=.*[!@#\$%\^&\*])');
        const qtde = new RegExp('(?=.{8,})');

        if(maiuscula.test(e)) {
            setMaiuscula(true)
        } else {
            setMaiuscula(false)
        }

        if(numero.test(e)) {
            setNumero(true)
        } else {
            setNumero(false)
        }

        if(simbolo.test(e)) {
            setSimbolo(true)
        } else {
            setSimbolo(false)
        }

        if(qtde.test(e)) {
            setQtde(true)
        } else {
            setQtde(false)
        }        
    };

    return (
    <>
        <div className="form__login">
            <div className="div_login">
                <form onSubmit={async (e) => {
                    e.preventDefault();

                    try {
                        await validationSchema.validate(formRedefinirSenha.values, {abortEarly: false});
                    } catch (erro) {
                        const novoErro = {}
            
                        erro.inner.forEach(err => {
                            novoErro[err.path] = err.message
                        });
                        setErros(novoErro);
                    }
                        
                    /*Código para redefinir a senha */
                    if (formRedefinirSenha.values.senha === formRedefinirSenha.values.confirmar_senha) { //se as senhas coincidirem, pode trocar
                        const { data: resetData, error } = await supabase.auth.updateUser({password: formRedefinirSenha.values.senha})
                        if (!error) {
                            Swal.fire({
                                icon: "success",
                                title: "Senha atualizada com sucesso"
                            })
                            navigate("/");
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
                        <input type="password" name="senha" value={ formRedefinirSenha.values.senha } placeholder="Nova senha" onChange={(e) => { handlePasswordChange(e.target.value);formRedefinirSenha.handleChange(e)}} />
                        <input type="password" name="confirmar_senha" value={ formRedefinirSenha.values.confirmar_senha } placeholder="Confirmar senha" onChange={ formRedefinirSenha.handleChange } />
                        <div className='requisitos_senha'>
                            <div className={validaQtde? 'validado' : 'nao-validado'}>A senha deve ter, no mínimo, oito caracteres</div>
                            <div className={validaMaiuscula? 'validado' : 'nao-validado'}>A senha deve ter, no mínimo, uma letra maiúscula</div>
                            <div className={validaNumero? 'validado' : 'nao-validado'}>A senha deve ter, no mínimo, um número</div>
                            <div className={validaSimbolo? 'validado' : 'nao-validado'}>A senha deve ter, no mínimo, um caractere especial</div>
                        </div>
                        {erros.novaSenha && <div className='text-red-600 mt-0 mb-2'>{erros.senha}</div>}
                        {erros.confirmarSenha && <div className='text-red-600 mt-0 mb-2'>{erros.confirmar_senha}</div>}
                        <button>CONFIRMAR</button>

                    </div>    
                </form>  
            </div>
        </div>
    </>
  )
}

export default Form_redefinir