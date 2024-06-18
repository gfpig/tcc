import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
//import './sidebar.css';
//import './alterar_senha.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faLock, faBell, faMessage, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import Form_dados from './components/Form_dados/Form_dados';
import Solicitacoes from './components/Solicitacoes/Solicitacoes';
import Notificacoes from './components/Notificacoes/Notificacoes';
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import Swal from 'sweetalert2';

const PROJECT_URL = "https://xljeosvrbsygpekwclan.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhsamVvc3ZyYnN5Z3Bla3djbGFuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ1MTY1NzAsImV4cCI6MjAzMDA5MjU3MH0.InFDrSOcPxRe4LXMBJ4dT59bBb3LSpKw063S90E3uPo"
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

function ChangePassword (valoresDoForm) {
    const [values, setValues] = React.useState(valoresDoForm.initialValues);
    const {clearErrors} = useForm();

    return {
        values, 
        handleChange: (evento) => {
            clearErrors('ErroSenha');
            document.getElementById("alerta_senha").style.display = "none";
            const value = evento.target.value;
            const name = evento.target.name;
            //console.log("name:", name, "\nvalue: ", value);

            setValues ({
                ...values,
                [name]: value,
            });    
        },

        clearForm () {
            setValues({
                novaSenha: '',
                confirmarSenha: ''
            });
        }
    };
}

function Sidebar() {
    const opcoes = [<Form_dados />, <Notificacoes />, <Solicitacoes />];
    const [opcaoAtual, setOpcaoAtual] = useState(0);
    const [formVisivel, setFormVisivel] = React.useState(false); //form de trocar senha
    const {setError, formState} = useForm();
    const { errors } = formState;
    const [erros, setErros] = useState({}); //erros do yup

    //validação da senha nova
    const [validaQtde, setQtde] = useState(false)
    const [validaMaiuscula, setMaiuscula] = useState(false)
    const [validaNumero, setNumero] = useState(false)
    const [validaSimbolo, setSimbolo] = useState(false)

    const navigate = useNavigate();

    const formSenha = ChangePassword({
        initialValues: {
            senhaAtual: '',
            novaSenha: '',
            confirmarSenha: ''
        }
    });

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

    const resetaValidacao =  () => {
        setMaiuscula(false)
        setNumero(false)
        setSimbolo(false)
        setQtde(false)
    }

    const HandleSubmit = async (e) => {
        e.preventDefault();
        try {
            await validationSchema.validate(formSenha.values, {abortEarly: false});
        } catch (erro) {
            const novoErro = {}

            erro.inner.forEach(err => {
                novoErro[err.path] = err.message
            });
            setErros(novoErro);
        }

        if (formSenha.values.novaSenha === formSenha.values.confirmarSenha) { //se as senhas coincidirem, pode trocar
            const { data: resetData, error } = await supabase.auth.updateUser({password: formSenha.values.novaSenha})
            //console.log(formSenha.values.novaSenha)
            if (!error) {
                Swal.fire({
                    icon: "success",
                    title: "Senha atualizada com sucesso"
                })
                formSenha.clearForm();
                resetaValidacao();
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
    };

  return (
        <>
        <div className='flex justify-center md:flex-row flex-col'>
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
                    <form className='form_alterarSenha' onSubmit={HandleSubmit}>
                        {/* FORM PROPRIAMENTE DITO */}
                        <div>
                            <button type = "button" className="close-modal" onClick={() => setFormVisivel(false)}>
                                x
                            </button>
                            {/*<input name="senhaAtual" value={ formSenha.values.senhaAtual } onChange={ formSenha.handleChange } placeholder="Senha atual" />*/}
                            <input type='password' name="novaSenha" value = { formSenha.values.novaSenha } onChange={(e) => { handlePasswordChange(e.target.value); formSenha.handleChange(e); }} placeholder="Nova senha" />
                            <input type="password" name="confirmarSenha" value = { formSenha.values.confirmarSenha } onChange={ formSenha.handleChange } placeholder="Digite a senha novamente" />
                            {errors && <div className="text-red-600 mt-0 mb-2" id="alerta_senha" style={{display: "none"}}>{errors.ErroSenha?.message}</div>}

                            <div className='requisitos_senha'>
                                <div className={validaQtde? 'validado' : 'nao-validado'}>A senha deve ter, no mínimo, oito caracteres</div>
                                <div className={validaMaiuscula? 'validado' : 'nao-validado'}>A senha deve ter, no mínimo, uma letra maiúscula</div>
                                <div className={validaNumero? 'validado' : 'nao-validado'}>A senha deve ter, no mínimo, um número</div>
                                <div className={validaSimbolo? 'validado' : 'nao-validado'}>A senha deve ter, no mínimo, um caractere especial</div>
                            </div>
                            {erros.novaSenha && <div className='text-red-600 mt-0 mb-2'>{erros.senha}</div>}
                            {erros.confirmarSenha && <div className='text-red-600 mt-0 mb-2'>{erros.confirmar_senha}</div>}
                            <button type="submit">CONFIRMAR</button>
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