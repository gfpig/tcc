import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import "./cadastro_ong_form.css";
import * as yup from "yup";
import { createClient } from "@supabase/supabase-js";
import Swal from 'sweetalert2';

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
                telefone: ''
            });
        }
    };
}

function Cadastro_ong_form() {

    const {register, handleSubmit, setValue, setError, clearErrors, formState} = useForm();
    const { errors } = formState;
    //const onSubmit = (data, e) => console.log(data, e)
    //const onError = (errors, e) => console.log(errors, e)
    const [erros, setErros] = useState({});

    //FUNÇÃO DE VALIDAÇÃO DOS CAMPOS DO FORMULÁRIO
    const validationSchema= yup.object({
        cnpj: yup.string().required("É necessário informar o CNPJ"),
        nomeinstituicao: yup.string().required("É necessário informar o nome da instituição"),
        emailinstituicao: yup.string().email().required("É necessário informar o e-mail"),
        senhainstituicao: yup.string()
                    .min(8, "A senha deve ter no mínimo 8 caracteres")
                    .uppercase("A senha deve conter pelo menos uma letra maiúscula")
                    .required("É necessário informar uma senha"),
        confirmar_senha: yup.string().oneOf([yup.ref("senhainstituicao")], "As senhas devem coincidir").required("É necessário confirmar sua senha"),
        categorias: yup.string().required("É necessário selecionar uma categoria"),
        cep: yup.string().required("É necessário informar seu CEP"),
        bairro: yup.string().required("É necessário preencher este campo"),
        logradouro: yup.string().required("É necessário preencher este campo"),
        cidade: yup.string().required("É necessário preencher este campo"),
        uf: yup.string().required("É necessário preencher este campo"),
        complemento: yup.string().required("É necessário informar o complemento"),
        numero: yup.string().required("É necessário informar o número do logradouro"),
        telefone: yup.string().required("É necessário informar seu telefone")
    })

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
            telefone: ''
        }
    });

    const pesquisaCEP = (e) => {
        const cep = e.target.value.replace(/\D/g, ''); //substitui todos os caracteres que não são números por nulo
        console.log(cep);
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(res => {
            //console.log(res);
            return res.json();
        })
        .then(data => {
            clearErrors('apiError');

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

  return (
    <>
    <form onSubmit={async (e) => {
        e.preventDefault();

        try { //validar se todos os campos estão preenchidos
            console.log("try");
            await validationSchema.validate(formCadastroInstituicao.values, {abortEarly: false});
        } catch (erro) { //se não estão, cria um novo erro para ser exibido ao usuário
            console.log("catch");
            const novoErro = {}

            erro.inner.forEach(err => {
                novoErro[err.path] = err.message
            });
            setErros(novoErro);
            console.log(erros);
            return;
        }

        supabase.from('instituicao').insert({
            cnpj: formCadastroInstituicao.values.cnpj,
            nomeinstituicao: formCadastroInstituicao.values.nomeinstituicao,
            emailinstituicao: formCadastroInstituicao.values.emailinstituicao,
            senhainstituicao: formCadastroInstituicao.values.senhainstituicao,
            cep: formCadastroInstituicao.values.cep,
            bairro: formCadastroInstituicao.values.bairro,
            logradouro: formCadastroInstituicao.values.logradouro,
            cidade: formCadastroInstituicao.values.cidade,
            uf: formCadastroInstituicao.values.uf,
            complemento: formCadastroInstituicao.values.complemento,
            numero: formCadastroInstituicao.values.numero,
            telefone: formCadastroInstituicao.values.telefone
        })
        .then ((oqueveio) => {
            if(oqueveio.error == null) { //Se o cadastro for feito com sucesso, mostrar esse popup
                Swal.fire({
                    icon: "success",
                    title: "Cadastro efetuado com sucesso"
                })
                formCadastroInstituicao.clearForm();
            }
            if (oqueveio.error != null) { //Se der algum problema, mostrar esse.
                var mensagem = "Um erro inesperado ocorreu :(";
                
                if (oqueveio.error.code === "23505") { mensagem = "CNPJ e/ou e-mail já cadastrados" }

                Swal.fire({
                    icon: "error",
                    title: mensagem
                })
            }
            console.log(oqueveio);
        })
    }}>
    <div className="container_inputs">
        <div className="inputs_esquerda">
            <input type="text" name='nomeinstituicao' value={ formCadastroInstituicao.values.nomeinstituicao } placeholder="Nome da instituição" onChange={formCadastroInstituicao.handleChange} />
            {erros.nomeinstituicao && <div className='text-red-600 mt-0 mb-2'>{erros.nomeinstituicao}</div>}

            <input type="text" name='cnpj' placeholder="CNPJ" value={ formCadastroInstituicao.values.cnpj }  onChange={formCadastroInstituicao.handleChange} />
            {erros.cnpj && <div className='text-red-600 mt-0 mb-2'>{erros.cnpj}</div>}

            <input type="email" name='emailinstituicao' value={ formCadastroInstituicao.values.emailinstituicao } placeholder="E-mail" onChange={formCadastroInstituicao.handleChange} />
            {erros.emailinstituicao && <div className='text-red-600 mt-0 mb-2'>{erros.emailinstituicao}</div>}

            <div className='flex_gap'>
                <input type="password" name='senhainstituicao' value={ formCadastroInstituicao.values.senhainstituicao } placeholder="Senha" onChange={formCadastroInstituicao.handleChange} />
                <input type="password" name="confirmar_senha" value={ formCadastroInstituicao.values.confirmar_senha } placeholder="Confirmar senha" onChange={formCadastroInstituicao.handleChange} />
            </div>
            {erros.senhainstituicao && <div className='text-red-600 mt-0 mb-2'>{erros.senhainstituicao}</div>}
            {erros.confirmar_senha && <div className='text-red-600 mt-0 mb-2'>{erros.confirmar_senha}</div>}

            <div className='flex_gap'>
                <input type="text" value="Educação" onChange={formCadastroInstituicao.handleChange}  disabled />
                <select name="categorias" id="categorias" value={ formCadastroInstituicao.values.categorias } onChange={formCadastroInstituicao.handleChange}>
                    <option value="">Categoria</option>
                    <option value="Música">Música</option>
                </select>
            </div>
            {erros.categorias && <div className='text-red-600 mt-0 mb-2'>{erros.categorias}</div>}
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
            {erros.complemento && <div className='text-red-600 mt-0 mb-2'>{erros.complemento}</div>}
            {erros.numero && <div className='text-red-600 mt-0 mb-2'>{erros.numero}</div>}

            <input type="text" name='telefone' value={ formCadastroInstituicao.values.telefone } placeholder="Telefone de contato" onChange={formCadastroInstituicao.handleChange} />
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

export default Cadastro_ong_form