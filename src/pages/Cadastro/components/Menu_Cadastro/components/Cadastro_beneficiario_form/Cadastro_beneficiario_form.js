import React, {useState} from 'react'
import {useForm} from 'react-hook-form';
import * as yup from "yup";
import { cpf } from 'cpf-cnpj-validator'; 
import { createClient } from "@supabase/supabase-js";
import Swal from 'sweetalert2';

const PROJECT_URL = "https://xljeosvrbsygpekwclan.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhsamVvc3ZyYnN5Z3Bla3djbGFuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ1MTY1NzAsImV4cCI6MjAzMDA5MjU3MH0.InFDrSOcPxRe4LXMBJ4dT59bBb3LSpKw063S90E3uPo"
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

function CreateUser (valoresDoForm) {
    const [values, setValues] = React.useState(valoresDoForm.initialValues);
    //const [erros, setErros] = useState({});
    //console.log(values)

    return {
        values, 
        handleChange: (evento) => {
            const value = evento.target.value;
            const name = evento.target.name;
            setValues ({
                ...values,
                [name]: value,
            });
            //console.log("nome", name)
            //console.log("value:", value)
        },

        clearForm () {
            setValues({
                cpf: '',
                nomeCandidato: '',
                nomeMae: '',
                dataNasc: '',
                generos: '',
                email: '',
                senha: '',
                confirmar_senha: '',
                cep: '',
                bairro: '',
                logradouro: '',
                cidade: '',
                uf: '',
                complemento: '',
                numero: '',
                telefone: '',
            });
        }
    };
}

function Cadastro_beneficiario_form() {

    //Colocando valores nulos para o form quando a página abrir
    const formCadastroBeneficiario = CreateUser({
        initialValues: { cpf: "" , nomeCandidato: "", nomeMae: "", dataNasc: "", generos: "", email: "", senha: "", confirmar_senha: "", cep: "", bairro: "", cidade: "",
        logradouro: "", uf: "", complemento: "", numero: "", telefone: ""}
    });

    const {register, setError, clearErrors, formState} = useForm();
    const { errors } = formState;
    const [erros, setErros] = useState({});

    //validação da senha
    const [senhaFocus, setSenhaFocus] = useState(false);
    const [validaQtde, setQtde] = useState(false)
    const [validaMaiuscula, setMaiuscula] = useState(false)
    const [validaNumero, setNumero] = useState(false)
    const [validaSimbolo, setSimbolo] = useState(false)

    //FUNÇÃO DE VALIDAÇÃO DOS CAMPOS DO FORMULÁRIO
    const validationSchema= yup.object({
        cpf: yup.string().required("É necessário preencher o CPF"),
        nomeCandidato: yup.string().required("É necessário preencher seu nome"),
        nomeMae: yup.string().required("É necessário preencher este campo"),
        dataNasc: yup.string().required("É necessário preencher sua data de nascimento"),
        generos: yup.string().required("É necessário selecionar um gênero"),
        email: yup.string().email().required("É necessário preencher seu e-mail"),
        senha: yup.string("Not string 1")
                    .min(8, "")
                    .matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])/, "Os requisitos da senha devem ser atendidos")
                    .required("É necessário informar uma senha"),
        confirmar_senha: yup.string("Not string")
                    .oneOf([yup.ref("senha"), null], "As senhas devem coincidir")
                    .required("É necessário confirmar sua senha"),
        cep: yup.string().required("É necessário informar seu CEP"),
        bairro: yup.string().required("É necessário preencher este campo"),
        logradouro: yup.string().required("É necessário preencher este campo"),
        cidade: yup.string().required("É necessário preencher este campo"),
        uf: yup.string().required("É necessário preencher este campo"),
        numero: yup.string().required("É necessário informar o número do logradouro"),
        telefone: yup.string().required("É necessário informar seu telefone")
    })

    //Valida a existência do CPF informado
    const validaCPF = (e) => {
        const valor = e.target.value.replace(/\D/g, ''); //substitui todos os caracteres que não são números por nulo

        if(cpf.isValid(valor)) {
            clearErrors('cpfInvalido');
            document.getElementById("alerta_cpf").style.display = 'none'
        } else {     
            setError('cnpjInvalido', { message: "Informe um CPF válido"});
            document.getElementById("alerta_cpf").style.display = 'block'
        }
    }

    //Procura os dados do CEP de acordo com o que foi informado no input
    const pesquisaCEP = (e) => {
        const cep = e.target.value.replace(/\D/g, ''); //substitui todos os caracteres que não são números por nulo
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(res => {
            return res.json();
        })
        .then(data => {
            clearErrors('apiError'); //limpa todos os erros (para não aparecer nenhuma mensagem indesejada)
            document.getElementById("alerta_cep").style.display = "none"
            if(data.erro === true) { //Caso o CEP informado tenha o número certo de caracteres, porém não exista
                setError('apiError', { message: "Não foi possível encontrar o CEP informado" });
                document.getElementById("alerta_cep").style.display = "block"
                formCadastroBeneficiario.values.logradouro = '';
                formCadastroBeneficiario.values.bairro = '';
                formCadastroBeneficiario.values.cidade = '';
                formCadastroBeneficiario.values.uf = '';
                return;
            }
            //Preenchendo os campos com seus respectivos valores
            formCadastroBeneficiario.values.logradouro = data.logradouro;
            formCadastroBeneficiario.values.bairro = data.bairro;
            formCadastroBeneficiario.values.cidade = data.localidade;
            formCadastroBeneficiario.values.uf = data.uf;
        })
        .catch(() => { //caso o CEP informado não exista, cria um erro e apaga os valores dos outros campos
            setError('apiError', { message: "Não foi possível encontrar o CEP informado" });
            document.getElementById("alerta_cep").style.display = 'block'

            //Limpando os campos
            formCadastroBeneficiario.values.logradouro = '';
            formCadastroBeneficiario.values.bairro = '';
            formCadastroBeneficiario.values.cidade = '';
            formCadastroBeneficiario.values.uf = '';
        });
    }

    //Checa se o CPF informado já está cadastrado
    async function checarCPFExistente(ValorCPF) {
            const { data, error } = await supabase
            .from('candidato')
            .select('*')
            .eq('cpf', ValorCPF);
        
            if (error) { //Se houver um erro, retorna falso
                console.error('Error fetching data:', error.message);
                return false;
            }
            //se for devolvido um valor, o dado existe
            return data.length > 0;
    }

    //Checa se o e-mail informado já está cadastrado
    async function checarEmailExistente(ValorEmail) {
        const { data, error } = await supabase
        .from('candidato')
        .select('*')
        .eq('emailcandidato', ValorEmail);
    
        if (error) {
            console.error('Error fetching data:', error.message);
            return false; //Se houver um erro, retorna falso
        }
    
        //se for devolvido um valor, o dado existe
        return data.length > 0;
    }

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
    <form onSubmit={async (evento) => {
        evento.preventDefault();

        //validarCampos();
        try { //validar se todos os campos estão preenchidos
            await validationSchema.validate(formCadastroBeneficiario.values, {abortEarly: false});
        } catch (erro) { //se não estão, cria um novo erro para ser exibido ao usuário
            const novoErro = {}

            erro.inner.forEach(err => {
                novoErro[err.path] = err.message
            });
            setErros(novoErro);
            return;
        }

        if(errors.cpfInvalido) { //verificando se o CPF informado é válido
            return;
        }

        //Verificando se o CPF ou e-mail informados já estão cadastrados
        const cpfExists = await checarCPFExistente(formCadastroBeneficiario.values.cpf);
        const emailExists = await checarEmailExistente(formCadastroBeneficiario.values.email);

        var mensagem; //variável para possível mensagem de erro

        if(cpfExists || emailExists ) { //se estiverem, mostra um erro para o usuário
            mensagem = "CPF ou e-mail já cadastrados";
            Swal.fire({
                icon: "error",
                title: mensagem
            })
            return;
        }

        //Caso contrário, podemos colocar todos os dados no user
        const { data, error } = await supabase.auth.signUp({
            email: formCadastroBeneficiario.values.email,
            password: formCadastroBeneficiario.values.senha,
            options: {
              data: {
                cpf: formCadastroBeneficiario.values.cpf,
                nomecandidato: formCadastroBeneficiario.values.nomeCandidato,
                nomemae: formCadastroBeneficiario.values.nomeMae,
                datanascimento: formCadastroBeneficiario.values.dataNasc,
                genero: formCadastroBeneficiario.values.generos,
                cep: formCadastroBeneficiario.values.cep,
                bairro: formCadastroBeneficiario.values.bairro,
                logradouro: formCadastroBeneficiario.values.logradouro,
                cidade: formCadastroBeneficiario.values.cidade,
                uf: formCadastroBeneficiario.values.uf,
                complemento: formCadastroBeneficiario.values.complemento,
                numero: formCadastroBeneficiario.values.numero,
                telefone: formCadastroBeneficiario.values.telefone,
              },
            },
        })

        if (error == null || data?.user?.identities?.length !== 0) { //Se o cadastro for feito com sucesso
            if(data?.user == null) {
                mensagem = "Um erro inesperado ocorreu :(";
                Swal.fire({
                    icon: "error",
                    title: mensagem
                })
                return;
            }
            //Mostra um pop-up na tela
            Swal.fire({
              icon: "success",
              title: "Cadastro efetuado com sucesso. Verique seu email na caixa de entrada"
            })

            formCadastroBeneficiario.clearForm(); //limpa o formulário

        } else { //Se der algum problema, mostrar esse.
            console.log(error.message);
            mensagem = "Um erro inesperado ocorreu :(";

            Swal.fire({
              icon: "error",
              title: mensagem
            })
        }
    }}>
        <div className="container_inputs">
            <div className="inputs_esquerda">
                <div className='flex_gap'>
                    <input type="text" name="cpf" value={ formCadastroBeneficiario.values.cpf } placeholder="CPF"
                    onChange={ formCadastroBeneficiario.handleChange }
                    onBlur={validaCPF} />
                    <input type="text" name="nomeCandidato" value={ formCadastroBeneficiario.values.nomeCandidato } placeholder="Nome completo" onChange={ formCadastroBeneficiario.handleChange } />
                </div>
                {errors && <div className="text-red-600 mt-0 mb-2" id="alerta_cpf" style={{display: "none"}}>{errors.cnpjInvalido?.message}</div>}
                {erros.cpf && <div className='text-red-600 mt-0 mb-2'>{erros.cpf}</div>}
                {erros.nomeCandidato && <div className='text-red-600 mt-0 mb-2'>{erros.nomeCandidato}</div>}
                <input type="text" name="nomeMae" value={ formCadastroBeneficiario.values.nomeMae } placeholder="Nome completo da mãe" onChange={ formCadastroBeneficiario.handleChange } />
                {erros.nomeMae && <div className='text-red-600 mt-0 mb-2'>{erros.nomeMae}</div>}
                
                <div className='flex_gap'>
                    <input type="text" name="dataNasc" value={ formCadastroBeneficiario.values.dataNasc } placeholder="Data de Nascimento"
                        onFocus={(e) => (e.target.type = "date")}
                        onBlur={(e) => (e.target.type = "text")}
                        onChange={ formCadastroBeneficiario.handleChange }
                        
                    />
                    <select name="generos" id="generos" value={ formCadastroBeneficiario.values.generos } onChange={ formCadastroBeneficiario.handleChange } >
                        <option value="">Gênero</option>
                        <option value="Feminino">Feminino</option>
                        <option value="Masculino">Masculino</option>
                    </select>
                </div>
                {erros.dataNasc && <div className='text-red-600 mt-0 mb-2'>{erros.dataNasc}</div>}
                {erros.generos && <div className='text-red-600 mt-0 mb-2'>{erros.generos}</div>}
                <input type="email" name="email" value={ formCadastroBeneficiario.values.email } placeholder="E-mail" onChange={ formCadastroBeneficiario.handleChange } />
                {erros.email && <div className='text-red-600 mt-0 mb-2'>{erros.email}</div>}
                <div className='flex_gap'>
                    <input type="password" id="senha" name="senha" value={ formCadastroBeneficiario.values.senha } placeholder="Senha" onChange={(e) => { handlePasswordChange(e.target.value); formCadastroBeneficiario.handleChange(e); }} onFocus={() => setSenhaFocus(true)} onBlur={() => setSenhaFocus(false)} />
                    <input type="password" name="confirmar_senha" value={ formCadastroBeneficiario.values.confirmar_senha } placeholder="Confirmar senha" onChange={ formCadastroBeneficiario.handleChange } />
                </div>

                {senhaFocus &&
                    <div className='requisitos_senha'>
                        <div className={validaQtde? 'validado' : 'nao-validado'}>A senha deve conter, no mínimo, oito caracteres</div>
                        <div className={validaMaiuscula? 'validado' : 'nao-validado'}>A senha deve conter, no mínimo, uma letra maiúscula</div>
                        <div className={validaNumero? 'validado' : 'nao-validado'}>A senha deve conter, no mínimo, um número</div>
                        <div className={validaSimbolo? 'validado' : 'nao-validado'}>A senha deve conter, no mínimo, um caractere especial</div>
                    </div>
                }
                {erros.senha && <div className='text-red-600 mt-0 mb-2'>{erros.senha}</div>}
                {erros.confirmar_senha && <div className='text-red-600 mt-0 mb-2'>{erros.confirmar_senha}</div>}
            </div>
            <div className="inputs_direita">
                <div className='flex_gap'>
                    <input type="text" value={ formCadastroBeneficiario.values.cep } placeholder="CEP" name="cep" onBlur={pesquisaCEP} onChange={ formCadastroBeneficiario.handleChange } />
                    <input type="text" name="bairro" value={ formCadastroBeneficiario.values.bairro } {...register("bairro")} placeholder="Bairro" onChange={ formCadastroBeneficiario.handleChange } disabled />
                </div>

                {erros.cep && <div className='text-red-600 mt-0 mb-2'>{erros.cep}</div>}
                {errors && <div className="text-red-600 mt-0 mb-2" id="alerta_cep" style={{display: "none"}}>{errors.apiError?.message}</div>}
                
                <input type="text" name="logradouro" value={ formCadastroBeneficiario.values.logradouro } {...register("logradouro")} placeholder="Logradouro" onChange={ formCadastroBeneficiario.handleChange } disabled />
                <div className='flex_gap'>
                    <input type="text" name="cidade" value={ formCadastroBeneficiario.values.cidade } {...register("cidade")} placeholder="Cidade" style={{width:"100%"}} onChange={ formCadastroBeneficiario.handleChange } disabled />
                    <input type="text" name="uf" value={ formCadastroBeneficiario.values.uf } {...register("uf")} placeholder="UF" style={{width:"50px"}} onChange={ formCadastroBeneficiario.handleChange } disabled />
                </div>
                <div className='flex_gap'>
                    <input type="text" name="complemento" value={ formCadastroBeneficiario.values.complemento } placeholder="Complemento" style={{width:"100%"}} onChange={ formCadastroBeneficiario.handleChange } />
                    <input type="text" name="numero" value={ formCadastroBeneficiario.values.numero } placeholder="Nº" style={{width:"50px"}} onChange={ formCadastroBeneficiario.handleChange } />      
                </div>
                {erros.numero && <div className='text-red-600 mt-0 mb-2'>{erros.numero}</div>}
                <input type="text" name="telefone" value={ formCadastroBeneficiario.values.telefone } placeholder="Telefone de contato" onChange={ formCadastroBeneficiario.handleChange } />
                {erros.telefone && <div className='text-red-600 mt-0 mb-2'>{erros.telefone}</div>}
            </div> 
        </div>
        <div className='botao_cadastro'>
            <button className="btn_finalizarCadastro">Finalizar Cadastro</button>
        </div>
    </form>
    </>
  )
}

export default Cadastro_beneficiario_form