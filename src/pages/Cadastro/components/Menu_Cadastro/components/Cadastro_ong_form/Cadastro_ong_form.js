import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import "./cadastro_ong_form.css";
import * as yup from "yup";
import { cnpj } from 'cpf-cnpj-validator'; 
import { createClient } from "@supabase/supabase-js";
import Swal from 'sweetalert2';
import { hasUnreliableEmptyValue } from '@testing-library/user-event/dist/utils';

const PROJECT_URL = "https://xljeosvrbsygpekwclan.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhsamVvc3ZyYnN5Z3Bla3djbGFuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ1MTY1NzAsImV4cCI6MjAzMDA5MjU3MH0.InFDrSOcPxRe4LXMBJ4dT59bBb3LSpKw063S90E3uPo"
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);


function CreateInstituicao (valoresDoForm) {
    const [values, setValues] = React.useState(valoresDoForm.initialValues);

    return {
        values, 
        handleChange: (evento) => {
            const value = evento.target.value;
            const name = evento.target.name;
            setValues ({
                ...values,
                [name]: value,
            });
        },

        clearForm () {
            setValues({
                cnpj: '',
                nomeinstituicao: '',
                emailinstituicao: '',
                senhainstituicao: '',
                confirmar_senha: '',
                cep: '',
                bairro: '',
                logradouro: '',
                cidade: '',
                uf: '',
                complemento: '',
                numero: '',
                telefone: '',
                categorias: '',
                site: '',
                whatsapp: '',
                descricao: '',
                foto: ''
            });
        }
    };
}

function Cadastro_ong_form() {
    const {register, setError, clearErrors, formState} = useForm();
    const { errors } = formState;
    const [erros, setErros] = useState({});

    const [fetchError, setFetchError] = useState([]);
    const [categorias, setCategorias] = useState([]);

    //validação da senha
    const [senhaFocus, setSenhaFocus] = useState(false);
    const [validaQtde, setQtde] = useState(false)
    const [validaMaiuscula, setMaiuscula] = useState(false)
    const [validaNumero, setNumero] = useState(false)
    const [validaSimbolo, setSimbolo] = useState(false)
    
    //Preenche as categorias do select com base no banco de dados
    useEffect(() => {
        const fetchCategorias = async () => {
            const { data, error } = await supabase
            .from('categoria')
            .select('*')
            
            if (error) {
                setFetchError("Não foi possível recuperar as informações")
                setCategorias(null)
                console.log(fetchError)
            }

            if (data) {
                console.log("categoria:", data)
                setCategorias(data)
                //console.log(categorias)
                setFetchError(null)
            }
        }
        fetchCategorias()
    }, [])

    //FUNÇÃO DE VALIDAÇÃO DOS CAMPOS DO FORMULÁRIO
    const validationSchema= yup.object({
        cnpj: yup.string().required("É necessário informar o CNPJ"),
        nomeinstituicao: yup.string()
                        .required("É necessário informar o nome da instituição"),
        emailinstituicao: yup.string()
                        .email()
                        //.matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.+-]+\.gov$/, "O e-mail deve terminar com '.gov'")
                        .required("É necessário informar o e-mail"),
        senhainstituicao: yup.string()
                    .min(8, "")
                    .matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])/, "Os requisitos da senha devem ser atendidos")
                    .required("É necessário informar uma senha"),
        confirmar_senha: yup.string().oneOf([yup.ref("senhainstituicao")], "As senhas devem coincidir").required("É necessário confirmar sua senha"),
        categorias: yup.string().required("É necessário selecionar uma categoria"),
        cep: yup.string().required("É necessário informar seu CEP"),
        bairro: yup.string().required("É necessário preencher este campo"),
        logradouro: yup.string().required("É necessário preencher este campo"),
        cidade: yup.string().required("É necessário preencher este campo"),
        uf: yup.string().required("É necessário preencher este campo"),
        numero: yup.string().required("É necessário informar o número do logradouro"),
        telefone: yup.string().required("É necessário informar seu telefone")
    })

    //Função que valida a existência do CNPJ informado
    const validaCNPJ = (e) => {
        const valor = e.target.value.replace(/\D/g, ''); //substitui todos os caracteres que não são números por nulo
        console.log('valor:', valor)

        if(cnpj.isValid(valor)) {
            clearErrors('cnpjInvalido');
            document.getElementById("alerta_cnpj").style.display = 'none'
        } else {     
            setError('cnpjInvalido', { message: "Informe um CNPJ válido"});
            document.getElementById("alerta_cnpj").style.display = 'block'
        }
    }

    const formCadastroInstituicao = CreateInstituicao({
        initialValues: {
            cnpj: '',
            nomeinstituicao: '',
            emailinstituicao: '',
            senhainstituicao: '',
            confirmar_senha: '',
            cep: '',
            bairro: '',
            logradouro: '',
            cidade: '',
            uf: '',
            complemento: '',
            numero: '',
            telefone: '',
            categorias: ''
        }
    });

    //Procura os dados do CEP de acordo com o que foi informado no input
    const pesquisaCEP = (e) => {
        const cep = e.target.value.replace(/\D/g, ''); //substitui todos os caracteres que não são números por nulo
        console.log(cep);
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(res => {
            return res.json();
        })
        .then(data => {
            clearErrors('apiError'); //limpa todos os erros (para não aparecer nenhuma mensagem indesejada)

            document.getElementById("alerta_cep").style.display = "none"
            if (data.erro === true) {
                setError('apiError', { message: "Não foi possível encontrar o CEP informado"});
                document.getElementById("alerta_cep").style.display = "block"
                formCadastroInstituicao.values.logradouro = '';
                formCadastroInstituicao.values.bairro = '';
                formCadastroInstituicao.values.cidade = '';
                formCadastroInstituicao.values.uf = '';
                return;
            }

            //Preenchendo os campos com seus respectivos valores
            formCadastroInstituicao.values.logradouro = data.logradouro;
            formCadastroInstituicao.values.bairro = data.bairro;
            formCadastroInstituicao.values.cidade = data.localidade;
            formCadastroInstituicao.values.uf = data.uf;
        })
        .catch(() => { //caso o CEP informado não exista, cria um erro e apaga os valores dos outros campos
            setError('apiError', { message: "Não foi possível encontrar o CEP informado" });
            document.getElementById("alerta_cep").style.display = 'block'
            
            //Limpando os campos
            formCadastroInstituicao.values.logradouro = '';
            formCadastroInstituicao.values.bairro = '';
            formCadastroInstituicao.values.cidade = '';
            formCadastroInstituicao.values.uf = '';
        });
    }

    //Checa se o CNPJ informado já está cadastrado
    async function checarCNPJExistente(ValorCNPJ) {
        const { data, error } = await supabase
        .from('instituicao')
        .select('*')
        .eq('cnpj', ValorCNPJ);
    
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
        .from('instituicao')
        .select('*')
        .eq('emailinstituicao', ValorEmail);

        if (error) {
            console.error('Error fetching data:', error.message);
            return false; //Se houver um erro, retorna falso
        }

        //se for devolvido um valor, o dado existe
        return data.length > 0;
    }

    const handleSubmit_CadastroONG = async (e) => {
        e.preventDefault();
 
        try { //validar se todos os campos estão preenchidos
            await validationSchema.validate(formCadastroInstituicao.values, {abortEarly: false});
        } catch (erro) { //se não estão, cria um novo erro para ser exibido ao usuário
            const novoErro = {}

            erro.inner.forEach(err => {
                novoErro[err.path] = err.message
            });
            setErros(novoErro);
            console.log(erros);
            return;
        }

        if(errors.cnpjInvalido) { //verificando se o CNPJ informado é válido
            return;
        }

        //Verificando se o CNPJ ou e-mail informados já estão cadastrados
        const cnpjExists = await checarCNPJExistente(formCadastroInstituicao.values.cnpj);
        const emailExists = await checarEmailExistente(formCadastroInstituicao.values.email);

        var mensagem; //variável para possível mensagem de erro

        if(cnpjExists || emailExists ) { //se estiverem, mostra um erro para o usuário
            mensagem = "CPF ou e-mail já cadastrados"
            Swal.fire({
                icon: "error",
                title: mensagem
            })
            return;
        }

        //Colocando todos os dados no user
        const { data, error } = await supabase.auth.signUp({
            email: formCadastroInstituicao.values.emailinstituicao,
            password: formCadastroInstituicao.values.senhainstituicao,
            options: {
              data: {
                cnpj: formCadastroInstituicao.values.cnpj,
                nomeinstituicao: formCadastroInstituicao.values.nomeinstituicao,
                cep: formCadastroInstituicao.values.cep,
                bairro: formCadastroInstituicao.values.bairro,
                logradouro: formCadastroInstituicao.values.logradouro,
                cidade: formCadastroInstituicao.values.cidade,
                uf: formCadastroInstituicao.values.uf,
                complemento: formCadastroInstituicao.values.complemento,
                numero: formCadastroInstituicao.values.numero,
                telefone: formCadastroInstituicao.values.telefone,
                categoria: formCadastroInstituicao.values.categorias,
                site: '',
                whatsapp: '',
                descricao: '',
                foto: ''
              },
            },
        })

        if (error === null) { //Se o cadastro for feito com sucesso
            //Mostra um pop-up na tela
            Swal.fire({
                icon: "success",
                title: "Cadastro efetuado com sucesso. Verique seu email na caixa de entrada"
            })
            formCadastroInstituicao.clearForm(); //limpa o formulário
        }

        if (error !== null) { //Se der algum problema, mostrar esse.
            console.log("erro:",error.message);
            console.log("mensagem:",error.message);
            mensagem = "Um erro inesperado ocorreu :(";
        
            Swal.fire({
                icon: "error",
                title: mensagem
            })
        }

        e.stopPropagation()
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
    
    <form onSubmit={handleSubmit_CadastroONG}>
    <div className="container_inputs">
        <div className="inputs_esquerda">
        <input type="text" name='cnpj' placeholder="CNPJ" value={ formCadastroInstituicao.values.cnpj }
            onChange={formCadastroInstituicao.handleChange}
            onBlur={validaCNPJ} />
            {errors && <div className="text-red-600 mt-0 mb-2" id="alerta_cnpj" style={{display: "none"}}>{errors.cnpjInvalido?.message}</div>}
            {erros.cnpj && <div className='text-red-600 mt-0 mb-2'>{erros.cnpj}</div>}

            <input type="text" name='nomeinstituicao' value={ formCadastroInstituicao.values.nomeinstituicao } placeholder="Nome da instituição" onChange={formCadastroInstituicao.handleChange} />
            {erros.nomeinstituicao && <div className='text-red-600 mt-0 mb-2'>{erros.nomeinstituicao}</div>}

            <div className='flex_gap'>
                <input type="text" value="Educação" onChange={formCadastroInstituicao.handleChange}  disabled />
                <select name="categorias" id="categorias" value={ formCadastroInstituicao.values.categorias } onChange={formCadastroInstituicao.handleChange}>
                    <option value="">Categoria</option>
                    {categorias.map((categoria) => (
                        <option key={categoria.codcategoria} value={categoria.codcategoria} onChange={formCadastroInstituicao.handleChange}>{categoria.nomecategoria}</option>
                    ))}
                </select>
            </div>
            {erros.categorias && <div className='text-red-600 mt-0 mb-2'>{erros.categorias}</div>}

            <input type="email" name='emailinstituicao' value={ formCadastroInstituicao.values.emailinstituicao } placeholder="E-mail" onChange={formCadastroInstituicao.handleChange} />
            {erros.emailinstituicao && <div className='text-red-600 mt-0 mb-2'>{erros.emailinstituicao}</div>}

            <div className='flex_gap'>
                <input type="password" name='senhainstituicao' value={ formCadastroInstituicao.values.senhainstituicao } placeholder="Senha" onChange={(e) => {formCadastroInstituicao.handleChange(e); handlePasswordChange(e.target.value);}} onFocus={() => setSenhaFocus(true)} onBlur={() => setSenhaFocus(false)} />
                <input type="password" name="confirmar_senha" value={ formCadastroInstituicao.values.confirmar_senha } placeholder="Confirmar senha" onChange={formCadastroInstituicao.handleChange} />
            </div>
            {senhaFocus && 
                <div className='requisitos_senha' id="requisitos_senha">
                    <div className={validaQtde? 'validado' : 'nao-validado'}>A senha deve conter, no mínimo, oito caracteres</div>
                    <div className={validaMaiuscula? 'validado' : 'nao-validado'}>A senha deve conter, no mínimo, uma letra maiúscula</div>
                    <div className={validaNumero? 'validado' : 'nao-validado'}>A senha deve conter, no mínimo, um número</div>
                    <div className={validaSimbolo? 'validado' : 'nao-validado'}>A senha deve conter, no mínimo, um caractere especial</div>
                </div>
            }
            {erros.senhainstituicao && <div className='text-red-600 mt-0 mb-2'>{erros.senhainstituicao}</div>}
            {erros.confirmar_senha && <div className='text-red-600 mt-0 mb-2'>{erros.confirmar_senha}</div>}
    
        </div>
        <div className="inputs_direita">
            <div className='flex_gap'>
                <input type="text" placeholder="CEP" name='cep' value={ formCadastroInstituicao.values.cep } onBlur={pesquisaCEP} onChange={formCadastroInstituicao.handleChange} />
                <input type="text" name='bairro' value={ formCadastroInstituicao.values.bairro } {...register("bairro")} placeholder="Bairro" onChange={formCadastroInstituicao.handleChange} disabled />
            </div>

            {erros.cep && <div className='text-red-600 mt-0 mb-2'>{erros.cep}</div>}
            {errors && <div className="text-red-600 mt-0 mb-2" id="alerta_cep" style={{display: "none"}}>{errors.apiError?.message}</div>}
            
            <input type="text" name='logradouro' value={ formCadastroInstituicao.values.logradouro } {...register("logradouro")} placeholder="Logradouro" disabled />
            <div className='flex_gap'>
                <input type="text" name='cidade' value={ formCadastroInstituicao.values.cidade } {...register("cidade")} placeholder="Cidade" style={{width:"100%"}} disabled />
                <input type="text"name='uf' value={ formCadastroInstituicao.values.uf } {...register("uf")} placeholder="UF" onChange={formCadastroInstituicao.handleChange}  style={{width:"50px"}} disabled />
            </div>
            <div className='flex_gap'>
                <input type="text" name='complemento' value={ formCadastroInstituicao.values.complemento } placeholder="Complemento" onChange={formCadastroInstituicao.handleChange}  style={{width:"100%"}} />
                <input type="text" name='numero' value={ formCadastroInstituicao.values.numero } placeholder="Nº" onChange={formCadastroInstituicao.handleChange}  style={{width:"50px"}} />      
            </div>
            {erros.numero && <div className='text-red-600 mt-0 mb-2'>{erros.numero}</div>}

            <input type="text" name='telefone' value={ formCadastroInstituicao.values.telefone } placeholder="Telefone de contato" onChange={formCadastroInstituicao.handleChange} />
            {erros.telefone && <div className='text-red-600 mt-0 mb-2'>{erros.telefone}</div>}
        </div>    
    </div>
    <div className='botao_cadastro'>
        <button type='submit' className="btn_finalizarCadastro">Finalizar Cadastro</button>
    </div>
    </form>
    </>    
  )
}

export default Cadastro_ong_form