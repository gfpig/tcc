import React, {useState} from 'react'
import {useForm} from 'react-hook-form';
//import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { userSchema } from '../../../../../../Validations/UserValidation';
import { createClient } from "@supabase/supabase-js";
import Swal from 'sweetalert2';

const PROJECT_URL = "https://xljeosvrbsygpekwclan.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhsamVvc3ZyYnN5Z3Bla3djbGFuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ1MTY1NzAsImV4cCI6MjAzMDA5MjU3MH0.InFDrSOcPxRe4LXMBJ4dT59bBb3LSpKw063S90E3uPo"
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

function CreateUser (valoresDoForm) {
    const [values, setValues] = React.useState(valoresDoForm.initialValues);
    const [erros, setErros] = useState({});
    //console.log(values)

    /*const validationSchema= yup.object({
        nomeCandidato: yup.string().required("É necessário preencher este campo"),
        nomeMae: yup.string().required("É necessário preencher este campo"),
        email: yup.string().email().required("É necessário preencher este campo"),
        senha: yup.string()
                    .min(8, "A senha deve ter no mínimo 8 caracteres")
                    .uppercase("A senha deve conter pelo menos uma letra maiúscula")
                    .required("É necessário preencher este campo"),
        confirmar_senha: yup.string().oneOf([yup.ref("senha")], "As senhas devem coincidir").required("É necessário preencher este campo"),
        CEP: yup.string().required("É necessário preencher este campo"),
        bairro: yup.string().required("É necessário preencher este campo"),
        logradouro: yup.string().required("É necessário preencher este campo"),
        cidade: yup.string().required("É necessário preencher este campo"),
        uf: yup.string().required("É necessário preencher este campo"),
        complemento: yup.string().required("É necessário preencher este campo"),
        numero: yup.string().required("É necessário preencher este campo"),
        telefone: yup.string().required("É necessário preencher este campo")
    })*/

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

        /*handleSubmit: async () => {

            //FUNÇÃO DE VALIDAÇÃO DOS CAMPOS
            try { //validar se todos os campos estão preenchidos
                await validationSchema.validate(valoresDoForm, {abortEarly: false});
            } catch (erro) { //se não estão, cria um novo erro para ser exibido ao usuário
                const novoErro = {}

                erro.inner.forEach(err => {
                    novoErro[err.path] = err.message
                });
                setErros(novoErro);
                //console.log(erro.inner)
            }
        },*/

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

    const {register, setValue, setError, clearErrors, formState} = useForm();
    const { errors, isSubmitting } = formState;
    const [erros, setErros] = useState({});

    //FUNÇÃO DE VALIDAÇÃO DOS CAMPOS DO FORMULÁRIO
    const validationSchema= yup.object({
        cpf: yup.string().required("É necessário preencher o CPF"),
        nomeCandidato: yup.string().required("É necessário preencher seu nome"),
        nomeMae: yup.string().required("É necessário preencher este campo"),
        dataNasc: yup.string().required("É necessário preencher sua data de nascimento"),
        generos: yup.string().required("É necessário selecionar um gênero"),
        email: yup.string().email().required("É necessário preencher seu e-mail"),
        senha: yup.string()
                    .min(8, "A senha deve ter no mínimo 8 caracteres")
                    .uppercase("A senha deve conter pelo menos uma letra maiúscula")
                    .required("É necessário informar uma senha"),
        confirmar_senha: yup.string().oneOf([yup.ref("senha")], "As senhas devem coincidir").required("É necessário confirmar sua senha"),
        cep: yup.string().required("É necessário informar seu CEP"),
        bairro: yup.string().required("É necessário preencher este campo"),
        logradouro: yup.string().required("É necessário preencher este campo"),
        cidade: yup.string().required("É necessário preencher este campo"),
        uf: yup.string().required("É necessário preencher este campo"),
        complemento: yup.string().required("É necessário informar o complemento"),
        numero: yup.string().required("É necessário informar o número do logradouro"),
        telefone: yup.string().required("É necessário informar seu telefone")
    })

    const pesquisaCEP = (e) => {
        const cep = e.target.value.replace(/\D/g, ''); //substitui todos os caracteres que não são números por nulo
        //console.log(cep);
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(res => {
            //console.log(res);
            return res.json();
        })
        .then(data => {
            //console.log(data);
            clearErrors('apiError');
            document.getElementById("alerta_cep").style.display = "none"
            if(data.erro == true) { //Caso o CEP informado tenha o número certo de caracteres, porém não exista
                console.log("erro = true");
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
            formCadastroBeneficiario.values.logradouro = '';
            formCadastroBeneficiario.values.bairro = '';
            formCadastroBeneficiario.values.cidade = '';
            formCadastroBeneficiario.values.uf = '';
        });
    }

  return (
    <>
    <form onSubmit={async (evento) => {
        evento.preventDefault();
        console.log(formCadastroBeneficiario.values);
        //FUNÇÃO DE VALIDAÇÃO DOS CAMPOS
        try { //validar se todos os campos estão preenchidos
            console.log("try");
            await validationSchema.validate(formCadastroBeneficiario.values, {abortEarly: false});
        } catch (erro) { //se não estão, cria um novo erro para ser exibido ao usuário
            console.log("catch");
            const novoErro = {}

            erro.inner.forEach(err => {
                novoErro[err.path] = err.message
            });
            setErros(novoErro);
            console.log(erros);
            return;
            //console.log(erro.inner)
        }

        supabase.from("candidato").insert({
            cpf: formCadastroBeneficiario.values.cpf,
            nomecandidato: formCadastroBeneficiario.values.nomeCandidato,
            nomemae: formCadastroBeneficiario.values.nomeMae,
            datanascimento: formCadastroBeneficiario.values.dataNasc,
            genero: formCadastroBeneficiario.values.generos,
            emailcandidato: formCadastroBeneficiario.values.email,
            senhacandidato: formCadastroBeneficiario.values.senha,
            cep: formCadastroBeneficiario.values.cep,
            bairro: formCadastroBeneficiario.values.bairro,
            logradouro: formCadastroBeneficiario.values.logradouro,
            cidade: formCadastroBeneficiario.values.cidade,
            uf: formCadastroBeneficiario.values.uf,
            complemento: formCadastroBeneficiario.values.complemento,
            numero: formCadastroBeneficiario.values.numero,
            telefone: formCadastroBeneficiario.values.telefone,
        })
        .then ((oqueveio) => {
            if(oqueveio.error == null) { //Se o cadastro for feito com sucesso, mostrar esse popup e limpar campos
                Swal.fire({
                    icon: "success",
                    title: "Cadastro efetuado com sucesso"
                })
                formCadastroBeneficiario.clearForm();
            }
            if (oqueveio.error != null) { //Se der algum problema, mostrar esse.
                var mensagem = "Um erro inesperado ocorreu :(";
                
                if (oqueveio.error.code == "23505") { mensagem = "CPF e/ou e-mail já cadastrados" }

                Swal.fire({
                    icon: "error",
                    title: mensagem
                })
            }
            console.log(oqueveio);
        })
        .catch ((err) => {
            console.log(err);
        })
        //formCadastroBeneficiario.clearForm();
    }}>
        <div className="container_inputs">
            <div className="inputs_esquerda">
                <div className='flex_gap'>
                    <input type="text" name="cpf" value={ formCadastroBeneficiario.values.cpf } placeholder="CPF" onChange={ formCadastroBeneficiario.handleChange } />
                    <input type="text" name="nomeCandidato" value={ formCadastroBeneficiario.values.nomeCandidato } placeholder="Nome completo" onChange={ formCadastroBeneficiario.handleChange } />
                </div>
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
                    <input type="password" name="senha" value={ formCadastroBeneficiario.values.senha } placeholder="Senha" onChange={ formCadastroBeneficiario.handleChange } />
                    <input type="password" name="confirmar_senha" value={ formCadastroBeneficiario.values.confirmar_senha } placeholder="Confirmar senha" onChange={ formCadastroBeneficiario.handleChange } />
                </div>
                {erros.senha && <div className='text-red-600 mt-0 mb-2'>{erros.senha}</div>}
                {erros.confirmar_senha && <div className='text-red-600 mt-0 mb-2'>{erros.confirmar_senha}</div>}
            </div>
            <div className="inputs_direita">
                <div className='flex_gap'>
                    <input type="text" value={ formCadastroBeneficiario.values.cep } placeholder="CEP" name="cep" onBlur={pesquisaCEP} onChange={ formCadastroBeneficiario.handleChange } />
                    <input type="text" name="bairro" value={ formCadastroBeneficiario.values.bairro } {...register("bairro")} placeholder="Bairro" onChange={ formCadastroBeneficiario.handleChange } disabled />
                </div>
                {erros.cep && <div className='text-red-600 mt-0 mb-2'>{erros.cep}</div>}
                {/*MENSAGEM DE ERRO CASO O CEP NÃO SEJA ENCONTRADO / SEJA INSERIDA UMA INFORMAÇÃO QUALQUER */}
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