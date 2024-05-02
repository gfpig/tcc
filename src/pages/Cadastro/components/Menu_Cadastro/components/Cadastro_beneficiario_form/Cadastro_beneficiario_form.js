import React from 'react'
import {useForm} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { createClient } from "@supabase/supabase-js";

const PROJECT_URL = "https://xljeosvrbsygpekwclan.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhsamVvc3ZyYnN5Z3Bla3djbGFuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ1MTY1NzAsImV4cCI6MjAzMDA5MjU3MH0.InFDrSOcPxRe4LXMBJ4dT59bBb3LSpKw063S90E3uPo"
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

function CreateUser (valoresDoForm) {
    const [values, setValues] = React.useState(valoresDoForm.initialValues);
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

    const {register, setValue, setError, clearErrors, formState} = useForm();
    const { errors, isSubmitting } = formState;
    //const [erro, setErro] = useState(null);

    const pesquisaCEP = (e) => {
        //if (e.target.value == '') { return; }
        const cep = e.target.value.replace(/\D/g, ''); //substitui todos os caracteres que não são números por nulo
        console.log(cep);
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(res => {
            return res.json();
        })
        .then(data => {
            clearErrors('apiError');
            if(data.erro == true) {
                setError('apiError', { message: "Não foi possível encontrar o CEP informado" });
            }
            document.getElementById("alerta_cep").style.display = "none"
            /*setValue('logradouro', data.logradouro);
            setValue('bairro', data.bairro);
            setValue('cidade', data.localidade);
            setValue('uf', data.uf);*/
            formCadastroBeneficiario.values.logradouro = data.logradouro;
            formCadastroBeneficiario.values.bairro = data.bairro;
            formCadastroBeneficiario.values.cidade = data.localidade;
            formCadastroBeneficiario.values.uf = data.uf;
        })
        .catch(() => { //caso o CEP informado não exista, cria um erro e apaga os valores dos outros campos
            setError('apiError', { message: "Não foi possível encontrar o CEP informado" });
            document.getElementById("alerta_cep").style.display = 'block'
            /*setValue('logradouro', '');
            setValue('bairro', '');
            setValue('cidade', '');
            setValue('uf', '');*/
            formCadastroBeneficiario.values.logradouro = '';
            formCadastroBeneficiario.values.bairro = '';
            formCadastroBeneficiario.values.cidade = '';
            formCadastroBeneficiario.values.uf = '';
        });
    }

    const validaCampos = yup.object({
        email: yup
            .string()
            .required("É necessário preencher este campo"),
        senha: yup
            .string()
            .min(8, "A senha deve ter no mínimo 8 caracteres")
            .required("É necessário preencher este campo"),
        CPF: yup
            .string()
            .required("É necessário preencher este campo")
    })

  return (
    <>
    <form onSubmit={(evento) => {
        evento.preventDefault();
        //debugger
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
            console.log(oqueveio);
        })
        formCadastroBeneficiario.clearForm();
    }}>
        <div className="container_inputs">
            <div className="inputs_esquerda">
                <div className='flex_gap'>
                    <input type="text" name="cpf" value={ formCadastroBeneficiario.values.cpf } placeholder="CPF" onChange={ formCadastroBeneficiario.handleChange } required />
                    <input type="text" name="nomeCandidato" value={ formCadastroBeneficiario.values.nomeCandidato } placeholder="Nome completo" onChange={ formCadastroBeneficiario.handleChange } required />
                </div>
                <input type="text" name="nomeMae" value={ formCadastroBeneficiario.values.nomeMae } placeholder="Nome completo da mãe" onChange={ formCadastroBeneficiario.handleChange } required />

                
                <div className='flex_gap'>
                    <input type="text" name="dataNasc" value={ formCadastroBeneficiario.values.dataNasc } placeholder="Data de Nascimento"
                        onFocus={(e) => (e.target.type = "date")}
                        onBlur={(e) => (e.target.type = "text")}
                        onChange={ formCadastroBeneficiario.handleChange }
                        required
                    />
                    <select name="generos" id="generos" value={ formCadastroBeneficiario.values.generos } onChange={ formCadastroBeneficiario.handleChange } required >
                        <option value="">Gênero</option>
                        <option value="Feminino">Feminino</option>
                        <option value="Masculino">Masculino</option>
                    </select>
                </div>
                <input type="email" name="email" value={ formCadastroBeneficiario.values.email } placeholder="E-mail" onChange={ formCadastroBeneficiario.handleChange } required />
                <div className='flex_gap'>
                    <input type="password" name="senha" value={ formCadastroBeneficiario.values.senha } placeholder="Senha" onChange={ formCadastroBeneficiario.handleChange } required />
                    <input type="password" name="confirmar_senha" value={ formCadastroBeneficiario.values.confirmar_senha } placeholder="Confirmar senha" onChange={ formCadastroBeneficiario.handleChange } required />
                </div>
            </div>
            <div className="inputs_direita">
                <div className='flex_gap'>
                    <input type="text" value={ formCadastroBeneficiario.values.cep } placeholder="CEP" name="cep" onBlur={pesquisaCEP} onChange={ formCadastroBeneficiario.handleChange } required />
                    <input type="text" name="bairro" value={ formCadastroBeneficiario.values.bairro } {...register("bairro")} placeholder="Bairro" onChange={ formCadastroBeneficiario.handleChange } disabled />
                </div>

                {/*MENSAGEM DE ERRO CASO O CEP NÃO SEJA ENCONTRADO / SEJA INSERIDA UMA INFORMAÇÃO QUALQUER */}
                {errors && <div className="text-red-600 mt-0 mb-2" id="alerta_cep" style={{display: "none"}}>{errors.apiError?.message}</div>}
                
                <input type="text" name="logradouro" value={ formCadastroBeneficiario.values.logradouro } {...register("logradouro")} placeholder="Logradouro" onChange={ formCadastroBeneficiario.handleChange } disabled />
                <div className='flex_gap'>
                    <input type="text" name="cidade" value={ formCadastroBeneficiario.values.cidade } {...register("cidade")} placeholder="Cidade" style={{width:"100%"}} onChange={ formCadastroBeneficiario.handleChange } disabled />
                    <input type="text" name="uf" value={ formCadastroBeneficiario.values.uf } {...register("uf")} placeholder="UF" style={{width:"50px"}} onChange={ formCadastroBeneficiario.handleChange } disabled />
                </div>
                <div className='flex_gap'>
                    <input type="text" name="complemento" value={ formCadastroBeneficiario.values.complemento } placeholder="Complemento" style={{width:"100%"}} onChange={ formCadastroBeneficiario.handleChange } />
                    <input type="text" name="numero" value={ formCadastroBeneficiario.values.numero } placeholder="Nº" style={{width:"50px"}} onChange={ formCadastroBeneficiario.handleChange } required />      
                </div>
                <input type="text" name="telefone" value={ formCadastroBeneficiario.values.telefone } placeholder="Telefone de contato" onChange={ formCadastroBeneficiario.handleChange } required />
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