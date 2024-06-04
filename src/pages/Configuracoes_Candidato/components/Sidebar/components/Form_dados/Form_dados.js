import React, { useState, useEffect } from 'react'
import {useForm} from 'react-hook-form';
import * as yup from "yup";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' ;
import { faUserCircle, faCamera } from '@fortawesome/free-solid-svg-icons';
//import "./form_dados.css";
import { createClient } from "@supabase/supabase-js";
import Swal from 'sweetalert2';

const PROJECT_URL = "https://xljeosvrbsygpekwclan.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhsamVvc3ZyYnN5Z3Bla3djbGFuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ1MTY1NzAsImV4cCI6MjAzMDA5MjU3MH0.InFDrSOcPxRe4LXMBJ4dT59bBb3LSpKw063S90E3uPo"
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

function CreateCandidato (valoresDoForm) {
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
            console.log("name:", name, "\nvalue:", value);    
        }
    };
}
function Form_dados() {
    const [fetchDone, setFetchDone] = useState(false); //varíavel pra saber se já puxou os dados
    const [img, setImg] = useState(null); //armazena a foto de perfil (para mostrar na tela)
    const [file, setFile] = useState(null); //armazena a foto de perfil (para colocar no banco)
    const [fetchError, setFetchError] = useState([]);
    const {register, setError, clearErrors, formState} = useForm();
    const { errors } = formState; //erros na validação do CEP
    const [erros, setErros] = useState({}); //erros na validação do preenchimento dos campos
    //const [session, setSession] = useState(null); //pegando a sessão para poder atualizar na tabela certa

    //Vetor que vai armazenar os dados do formulário
    const formUpdateCandidato = CreateCandidato({
        initialValues: {
            cpf: "",
            nomeCandidato: "",
            nomeMae: "",
            dataNasc: "",
            generos: "",
            email: "",
            cep: "",
            bairro: "",
            cidade: "",
            logradouro: "",
            uf: "",
            complemento: "",
            numero: "",
            telefone: "",
            foto: '',
            nomepai: '',
            escolaridade: ''
        }
    });

    const onImageChange = (e) => {
        const novaFoto = e.target.files[0];
        setFile(novaFoto);
        setImg(URL.createObjectURL(novaFoto));
        console.log("nova foto:", novaFoto)
    };
    //Procura os dados do CEP de acordo com o que foi informado no input
    const pesquisaCEP = (e) => {
        const cep = e.target.value.replace(/\D/g, ''); //substitui todos os caracteres que não são números por nulo
        //console.log(cep);
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
                formUpdateCandidato.values.logradouro = '';
                formUpdateCandidato.values.bairro = '';
                formUpdateCandidato.values.cidade = '';
                formUpdateCandidato.values.uf = '';
                return;
            }

            //Preenchendo os campos com seus respectivos valores
            formUpdateCandidato.values.logradouro = data.logradouro;
            formUpdateCandidato.values.bairro = data.bairro;
            formUpdateCandidato.values.cidade = data.localidade;
            formUpdateCandidato.values.uf = data.uf;

            console.log("nome: ",formUpdateCandidato.values)
        })
        .catch(() => { //caso o CEP informado não exista, cria um erro e apaga os valores dos outros campos
            setError('apiError', { message: "Não foi possível encontrar o CEP informado" });
            document.getElementById("alerta_cep").style.display = 'block'
            
            //Limpando os campos
            formUpdateCandidato.values.logradouro = '';
            formUpdateCandidato.values.bairro = '';
            formUpdateCandidato.values.cidade = '';
            formUpdateCandidato.values.uf = '';
        });
    }

    useEffect(() => {
        let imgURL;
        const fetchFotoPerfil = async () => {
            try {
                
                const { data: { session }} = await supabase.auth.getSession(); //pega a sessão do usuário (se tem alguém logado e quem é)

                if (session) { //se houver usuário logado, faz um select com base no id do usuário
                    const { data, error } = await supabase
                    .from('candidato')
                    .select('foto')
                    .eq('id', session.user.id)

                    if (error) {
                        setFetchError("Não foi possível recuperar as informações")
                        setImg(null)
                        console.log(fetchError)
                    }
        
                    if (data) {
                        data.map((user) => imgURL = user.foto)
                        console.log("url 1:", imgURL)

                        setFetchError(null)
                    }

                    try {
                        // Fetch image URL from Supabase storage
                            if (imgURL !== null) {
                            const { data: img_url } = await supabase.storage.from('avatares').getPublicUrl(imgURL);
                            
                            setImg(img_url.publicUrl); // Set image URL in state
                        }
                    } catch (error) {
                        console.error('Error fetching image:', error.message);
                    }

                    fetchDados();
                }
            } catch(error) {
                console.log(fetchError)
            }
        };

        const fetchDados = async () => {
            try {
                const { data: { session }} = await supabase.auth.getSession();

                if (session) {
                    const { data, error } = await supabase
                    .from('candidato')
                    .select('*')
                    .eq('id', session.user.id)

                    if (error) {
                        setFetchError("Não foi possível recuperar as informações")
                        console.log(fetchError)
                    }
        
                    if (data) {
                        data.map ((user) => (
                            formUpdateCandidato.values.cpf = user.cpf,
                            formUpdateCandidato.values.nomeCandidato = user.nomecandidato,
                            formUpdateCandidato.values.email = user.emailcandidato,
                            formUpdateCandidato.values.nomeMae = user.nomemae,
                            formUpdateCandidato.values.dataNasc = user.datanascimento,
                            formUpdateCandidato.values.generos = user.genero,
                            formUpdateCandidato.values.escolaridade = user.escolaridade,
                            formUpdateCandidato.values.cep = user.cep,
                            formUpdateCandidato.values.bairro = user.bairro,
                            formUpdateCandidato.values.logradouro = user.logradouro,
                            formUpdateCandidato.values.cidade = user.cidade,
                            formUpdateCandidato.values.uf = user.uf,
                            formUpdateCandidato.values.complemento = user.complemento,
                            formUpdateCandidato.values.numero = user.numero,
                            formUpdateCandidato.values.telefone = user.telefone,                            
                            formUpdateCandidato.values.categorias = user.codcategoria,
                            formUpdateCandidato.values.foto = user.foto,
                            formUpdateCandidato.values.escolaridade = user.escolaridade,
                            formUpdateCandidato.values.nomepai = user.nomepai
                        ))
                        setFetchDone(true);
                        console.log("uf:", formUpdateCandidato.values.foto)
                        console.log("data:", data)
                        console.log("imagem pós public:",img);
                    }
                }
                console.log("img",img)
            } catch(error) {
                console.log(fetchError)
            }
        }

        fetchFotoPerfil();
    }, [])

    const validationSchema= yup.object({
        cpf: yup.string().required("É necessário preencher o CPF"),
        nomeCandidato: yup.string().required("É necessário preencher seu nome"),
        nomeMae: yup.string().required("É necessário preencher este campo"),
        dataNasc: yup.string().required("É necessário preencher sua data de nascimento"),
        generos: yup.string().required("É necessário selecionar um gênero"),
        //escolaridade: yup.string().required("É necessário selecionar um gênero"),
        email: yup.string().email().required("É necessário preencher seu e-mail"),
        cep: yup.string().required("É necessário informar seu CEP"),
        bairro: yup.string().required("É necessário preencher este campo"),
        logradouro: yup.string().required("É necessário preencher este campo"),
        cidade: yup.string().required("É necessário preencher este campo"),
        uf: yup.string().required("É necessário preencher este campo"),
        //complemento: yup.string().required("É necessário informar o complemento"),
        numero: yup.string().required("É necessário informar o número do logradouro"),
        telefone: yup.string().required("É necessário informar seu telefone")
    })

    async function deletaAvatar() { //deleta o avatar que foi trocado
        let url;
        const { data: { session }} = await supabase.auth.getSession();

        const { data, error } = await supabase
                .from('instituicao')
                .select('foto')
                .eq('id', session.user.id)
        if (data) {
            data.map((user) => (url = user.foto))

            try {
                const { data, error } = await supabase
                .storage
                .from('avatares')
                .remove([url])
            } catch (erro) {
                console.log("Erro ao deletar a imagem de perfil:", erro);
            }
        } 
    }

    async function atualizarDados() { //atualiza a tabela auth.users
        //const { data: { session }} = await supabase.auth.getSession();

        const { data, error } = await supabase.auth.updateUser({
            email: formUpdateCandidato.values.emailinstituicao,
            data: {
                cpf: formUpdateCandidato.values.cpf,
                nomeCandidato: formUpdateCandidato.values.nomeCandidato,
                emailcandidato: formUpdateCandidato.values.email,
                nomemae: formUpdateCandidato.values.nomeMae,
                datanascimento: formUpdateCandidato.values.dataNasc,
                genero: formUpdateCandidato.values.generos,
                //escolaridade: formUpdateCandidato.values.escolaridade,
                cep: formUpdateCandidato.values.cep,
                bairro: formUpdateCandidato.values.bairro,
                logradouro: formUpdateCandidato.values.logradouro,
                cidade: formUpdateCandidato.values.cidade,
                uf: formUpdateCandidato.values.uf,
                complemento: formUpdateCandidato.values.complemento,
                numero: formUpdateCandidato.values.numero,
                telefone: formUpdateCandidato.values.telefone,                            
                codcategoria: formUpdateCandidato.values.categorias,
                foto: formUpdateCandidato.values.foto,
                escolaridade:formUpdateCandidato.values.escolaridade,
                //nomepai: formUpdateCandidato.values.nomepai
            },     
        })

        if (error == null) {
            const { data: { session }} = await supabase.auth.getSession();

            const { error } = await supabase
                .from('candidato')
                .update({
                    cpf: formUpdateCandidato.values.cpf,
                    nomecandidato: formUpdateCandidato.values.nomeCandidato,
                    emailcandidato: formUpdateCandidato.values.email,
                    nomemae: formUpdateCandidato.values.nomeMae,
                    datanascimento: formUpdateCandidato.values.dataNasc,
                    genero: formUpdateCandidato.values.generos,
                    escolaridade: formUpdateCandidato.values.escolaridade,
                    cep: formUpdateCandidato.values.cep,
                    bairro: formUpdateCandidato.values.bairro,
                    logradouro: formUpdateCandidato.values.logradouro,
                    cidade: formUpdateCandidato.values.cidade,
                    uf: formUpdateCandidato.values.uf,
                    complemento: formUpdateCandidato.values.complemento,
                    numero: formUpdateCandidato.values.numero,
                    telefone: formUpdateCandidato.values.telefone,                            
                    codcategoria: formUpdateCandidato.values.categorias,
                    foto: formUpdateCandidato.values.foto,
                    escolaridade:formUpdateCandidato.values.escolaridade,
                    nomepai: formUpdateCandidato.values.nomepai
                })
                .eq('id', session.user.id)
                console.log("foto form:",formUpdateCandidato.values.foto)
                if(error == null) {
                    Swal.fire({
                        icon: "success",
                        title: "Dados atualizados com sucesso"
                    })
                } else {
                    let mensagem = "Um erro inesperado ocorreu :(";
                
                    Swal.fire({
                        icon: "error",
                        title: mensagem
                    })
                }
        } else {
            let mensagem = "Um erro inesperado ocorreu :(";
        
            Swal.fire({
                icon: "error",
                title: mensagem
            })
        }    
    }

    async function uploadAvatar(event) {
        try {
          const fileExt = file.name.split('.').pop()
          const fileName = `${Math.random()}.${fileExt}`
          const filePath = `${fileName}`
    
          const { error: uploadError } = await supabase.storage.from('avatares').upload(filePath, file)
    
          if (uploadError) {
            throw uploadError
          } else {
            const { data: { session }} = await supabase.auth.getSession();

            const { error } = await supabase
                .from('candidato')
                .update({
                    foto: fileName })
                .eq('id', session.user.id)
          }
        } catch (error) {
          console.log("Erro no upload da foto:",error.message)
        }
    }

    const HandleSubmit = async (e) => {
        e.preventDefault();

        try { //validar se todos os campos necessários estão preenchidos
            await validationSchema.validate(formUpdateCandidato.values, {abortEarly: false});
        } catch (erro) { //se não estão, cria um novo erro para ser exibido ao usuário
            const novoErro = {}

            erro.inner.forEach(err => {
                novoErro[err.path] = err.message
            });
            setErros(novoErro);
            console.log(erros);
            return;
        }
        
        deletaAvatar()
        atualizarDados(); //atualiza a tabela instituição e tabela auth.users
        uploadAvatar(file);
    }

    return (
        <>
        {fetchDone ? 
            <form onSubmit={HandleSubmit}>
                <div className="inputs_editar_dados">
                    
                    <label id="lbl_img" className="escolher_img">
                        {img == null && <FontAwesomeIcon icon={ faUserCircle } size='4x' color='#e87f45' id='img_none' />}
                        {img != null && <img id="img_perfilONG" src={img} alt="foto de perfil" className='rounded-full h-16 w-16' />}

                        <div className='editar_fotoPerfil'>
                            <FontAwesomeIcon icon={ faCamera } color='white' />
                            <p>Escolha uma foto</p>
                            <input type="file" id="input" name="input_imagem" onChange={(e) => {onImageChange(e); formUpdateCandidato.handleChange(e); }} />                        
                        </div>
                    </label>

                    <div className='flex_gapEditar'>
                        <div>
                            <p>CPF:</p>                        
                            <input type="text" name="cpf" placeholder="CPF" value={ formUpdateCandidato.values.cpf } disabled />
                        </div>
                        <div>
                            <p>Data de nascimento:</p>
                            <input type="text" name='datanasc' placeholder="Data de nascimento" value={ formUpdateCandidato.values.dataNasc } disabled />
                        </div>
                    </div>

                    <p>Nome completo:</p>
                    <input type="text" name="nomeCandidato" placeholder="Nome completo" value={ formUpdateCandidato.values.nomeCandidato } onChange={formUpdateCandidato.handleChange}  />
                    {erros.nomeCandidato && <div className='text-red-600 mt-0 mb-2'>{erros.nomeCandidato}</div>}

                    <div className='flex_gapEditar'>
                        <div>
                            <p>Gênero:</p>
                            <select name="generos">
                                <option value="">Gênero</option>
                                <option>Masculino</option>
                                <option>Feminino</option>
                                <option>Não-binário</option>
                                <option>Outro</option>
                            </select>
                        </div>
                        <div>
                            <p>Escolaridade:</p>
                            <select name="escolaridade">
                                <option value="">Escolaridade</option>
                                <option>Ensino fundamental incompleto</option>
                                <option>Ensino fundamental completo</option>
                                <option>Ensino médio incompleto</option>
                                <option>Ensino médio completo</option>
                                <option>Ensino superior incompleto</option>
                                <option>Ensino superior completo</option>
                            </select>
                        </div> 
                    </div>
                    {erros.generos && <div className='text-red-600 mt-0 mb-2'>{erros.generos}</div>}

                    <p>E-mail:</p>
                    <input type="text" name='email' placeholder="E-mail" value={ formUpdateCandidato.values.email } onChange={formUpdateCandidato.handleChange} />
                    {erros.email && <div className='text-red-600 mt-0 mb-2'>{erros.email}</div>}

                    <div className='flex_gapEditar'>
                        <div>
                            <p>Nome completo da mãe:</p>
                            <input type="text" name='nomeMae' placeholder="Nome completo da mãe" value={ formUpdateCandidato.values.nomeMae } onChange={formUpdateCandidato.handleChange}  />
                        </div>
                        <div>
                            <p>Nome completo do pai (opcional)</p>
                            <input type="text" placeholder="Nome completo do pai (opcional)" value={ formUpdateCandidato.values.nomepai } onChange={formUpdateCandidato.handleChange}  />
                        </div>
                    </div>
                    {erros.nomeMae && <div className='text-red-600 mt-0 mb-2'>{erros.nomeMae}</div>}

                    <div className='flex_gapEditar'>
                        <div>
                            <p>CEP:</p>
                            <input type="text" placeholder="CEP" name='cep' value={ formUpdateCandidato.values.cep } onBlur={pesquisaCEP} onChange={formUpdateCandidato.handleChange} />
                        </div>
                        <div>
                            <p>Bairro:</p>
                            <input type="text" name='bairro' value={ formUpdateCandidato.values.bairro } {...register("bairro")} placeholder="Bairro" onChange={formUpdateCandidato.handleChange} disabled />
                        </div>
                    </div>
                    {erros.cep && <div className='text-red-600 mt-0 mb-2'>{erros.cep}</div>}
                    {errors && <div className="text-red-600 mt-0 mb-2" id="alerta_cep" style={{display: "none"}}>{errors.apiError?.message}</div>}

                    <p>Logradouro:</p>
                    <input type="text" name='logradouro' value={ formUpdateCandidato.values.logradouro } {...register("logradouro")} placeholder="Logradouro" disabled />

                    <div className='flex_gapEditar'>
                        <div>
                            <p>Cidade:</p>
                            <input type="text" name='cidade' value={ formUpdateCandidato.values.cidade } {...register("cidade")} placeholder="Cidade" style={{width:"100%"}} disabled />
                        </div>
                        <div style={{width: "20%"}}>
                            <p>UF:</p>
                            <input type="text" name='uf' value={ formUpdateCandidato.values.uf } {...register("uf")} placeholder="UF" onChange={formUpdateCandidato.handleChange} disabled />
                        </div>
                    </div>

                    <div className='flex_gapEditar'>
                        <div>
                            <p>Complemento:</p>
                            <input type="text" name='complemento' value={ formUpdateCandidato.values.complemento } placeholder="Complemento" onChange={formUpdateCandidato.handleChange}  style={{width:"100%"}} />
                        </div>
                        <div style={{width: "20%"}}>
                            <p>Número:</p>
                            <input type="text" name='numero' value={ formUpdateCandidato.values.numero } placeholder="Nº" onChange={formUpdateCandidato.handleChange} />      
                        </div>
                    </div>
                    {erros.numero && <div className='text-red-600 mt-0 mb-2'>{erros.numero}</div>}

                    <p>Telefone:</p>
                    <input type="text" placeholder="Telefone de contato" name="telefone" value={ formUpdateCandidato.values.telefone } onChange={formUpdateCandidato.handleChange} />
                    <div className='flex gap-2 self-end items-center'>
                        <button className='botao_salvar'>SALVAR ALTERAÇÕES</button>
                        <button className='botao_deletarConta'>DELETAR CONTA</button>
                    </div>
                </div>
            </form>
        : null }
    </>
  )
}

export default Form_dados