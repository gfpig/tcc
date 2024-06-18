import React, { useState, useEffect } from 'react'
import {useForm} from 'react-hook-form';
import * as yup from "yup";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' ;
import { faHandHoldingHeart, faCamera } from '@fortawesome/free-solid-svg-icons';
import "./form_dados.css";
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
        }
    };
}

function Form_dados() {
    document.title = "Editar Dados"

    const [fetchDone, setFetchDone] = useState(false); //varíavel pra saber se já puxou os dados
    const [img, setImg] = useState(null); //armazena a foto de perfil (para mostrar na tela)
    const [file, setFile] = useState(null); //armazena a foto de perfil (para colocar no banco)
    const [fetchError, setFetchError] = useState([]);
    const [categorias, setCategorias] = useState([]); //vetor que armazenará as categorias
    const {register, setError, clearErrors, formState} = useForm();
    const { errors } = formState; //erros na validação do CEP
    const [erros, setErros] = useState({}); //erros na validação do preenchimento dos campos

    //Vetor que vai armazenar os dados do formulário
    const formUpdateInstituicao = CreateInstituicao({
        initialValues: {
            cnpj: '',
            nomeinstituicao: '',
            emailinstituicao: '',
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
        }
    });

    const onImageChange = (e) => {
        const novaFoto = e.target.files[0];
        setFile(novaFoto);
        setImg(URL.createObjectURL(novaFoto));
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
                formUpdateInstituicao.values.logradouro = '';
                formUpdateInstituicao.values.bairro = '';
                formUpdateInstituicao.values.cidade = '';
                formUpdateInstituicao.values.uf = '';
                return;
            }

            //Preenchendo os campos com seus respectivos valores
            formUpdateInstituicao.values.logradouro = data.logradouro;
            formUpdateInstituicao.values.bairro = data.bairro;
            formUpdateInstituicao.values.cidade = data.localidade;
            formUpdateInstituicao.values.uf = data.uf;

            console.log("nome: ",formUpdateInstituicao.values)
        })
        .catch(() => { //caso o CEP informado não exista, cria um erro e apaga os valores dos outros campos
            setError('apiError', { message: "Não foi possível encontrar o CEP informado" });
            document.getElementById("alerta_cep").style.display = 'block'
            
            //Limpando os campos
            formUpdateInstituicao.values.logradouro = '';
            formUpdateInstituicao.values.bairro = '';
            formUpdateInstituicao.values.cidade = '';
            formUpdateInstituicao.values.uf = '';
        });
    }

    useEffect(() => {
        let imgURL;
        const fetchFotoPerfil = async () => {
            try {       
                const { data: { session }} = await supabase.auth.getSession(); //pega a sessão do usuário (se tem alguém logado e quem é)

                if (session) { //se houver usuário logado, faz um select com base no id do usuário
                    const { data, error } = await supabase
                    .from('instituicao')
                    .select('foto')
                    .eq('id', session.user.id)

                    if (error) {
                        setFetchError("Não foi possível recuperar as informações")
                        setImg(null)
                        console.log(fetchError)
                    }
        
                    if (data) {
                        data.map((user) => imgURL = user.foto)
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
                    .from('instituicao')
                    .select('*')
                    .eq('id', session.user.id)

                    if (error) {
                        setFetchError("Não foi possível recuperar as informações")
                        console.log(fetchError)
                    }
        
                    if (data) {
                        data.map ((user) => (
                            formUpdateInstituicao.values.cnpj = user.cnpj,
                            formUpdateInstituicao.values.nomeinstituicao = user.nomeinstituicao,
                            formUpdateInstituicao.values.emailinstituicao = user.emailinstituicao,
                            formUpdateInstituicao.values.cep = user.cep,
                            formUpdateInstituicao.values.bairro = user.bairro,
                            formUpdateInstituicao.values.logradouro = user.logradouro,
                            formUpdateInstituicao.values.cidade = user.cidade,
                            formUpdateInstituicao.values.uf = user.uf,
                            formUpdateInstituicao.values.complemento = user.complemento,
                            formUpdateInstituicao.values.numero = user.numero,
                            formUpdateInstituicao.values.telefone = user.telefone,                            
                            formUpdateInstituicao.values.categorias = user.codcategoria,
                            formUpdateInstituicao.values.site = user.site,
                            formUpdateInstituicao.values.whatsapp = user.whatsapp,
                            formUpdateInstituicao.values.descricao = user.descricao,
                            formUpdateInstituicao.values.foto = user.foto
                        ))
                        setFetchDone(true);
                    }
                }
            } catch(error) {
                console.log(fetchError)
            }
        }

        fetchFotoPerfil();

        //Preenche as categorias do select com base no banco de dados
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
                setCategorias(data)
                setFetchError(null)
            }
        }
        fetchCategorias()

    }, [])

    const validationSchema= yup.object({
        cnpj: yup.string().required("É necessário informar o CNPJ"),
        nomeinstituicao: yup.string().required("É necessário informar o nome da instituição"),
        emailinstituicao: yup.string().email().required("É necessário informar o e-mail"),
        categorias: yup.string().required("É necessário selecionar uma categoria"),
        cep: yup.string().required("É necessário informar seu CEP"),
        bairro: yup.string().required("É necessário preencher este campo"),
        logradouro: yup.string().required("É necessário preencher este campo"),
        cidade: yup.string().required("É necessário preencher este campo"),
        uf: yup.string().required("É necessário preencher este campo"),
        numero: yup.string().required("É necessário informar o número do logradouro"),
        telefone: yup.string().required("É necessário informar seu telefone")
    })

    async function atualizarDados() { //atualiza a tabela auth.users
        const { data, error } = await supabase.auth.updateUser({ //atualiza na tabela auth
            email: formUpdateInstituicao.values.emailinstituicao,
            data: {
                cnpj: formUpdateInstituicao.values.cnpj,
                nomeinstituicao: formUpdateInstituicao.values.nomeinstituicao,
                cep: formUpdateInstituicao.values.cep,
                bairro: formUpdateInstituicao.values.bairro,
                logradouro: formUpdateInstituicao.values.logradouro,
                cidade: formUpdateInstituicao.values.cidade,
                uf: formUpdateInstituicao.values.uf,
                complemento: formUpdateInstituicao.values.complemento,
                numero: formUpdateInstituicao.values.numero,
                telefone: formUpdateInstituicao.values.telefone,
                categoria: formUpdateInstituicao.values.categorias,
                site: formUpdateInstituicao.values.site,
                whatsapp: formUpdateInstituicao.values.whatsapp,
                descricao: formUpdateInstituicao.values.descricao,
                foto: formUpdateInstituicao.values.foto
            },     
        })

        if (error == null) { //atualiza na tabela do usuário
            const { data: { session }} = await supabase.auth.getSession();

            const { error } = await supabase
                .from('instituicao')
                .update({
                    cnpj: formUpdateInstituicao.values.cnpj,
                    nomeinstituicao: formUpdateInstituicao.values.nomeinstituicao,
                    cep: formUpdateInstituicao.values.cep,
                    bairro: formUpdateInstituicao.values.bairro,
                    logradouro: formUpdateInstituicao.values.logradouro,
                    cidade: formUpdateInstituicao.values.cidade,
                    uf: formUpdateInstituicao.values.uf,
                    complemento: formUpdateInstituicao.values.complemento,
                    numero: formUpdateInstituicao.values.numero,
                    telefone: formUpdateInstituicao.values.telefone,
                    codcategoria: formUpdateInstituicao.values.categorias,
                    site: formUpdateInstituicao.values.site,
                    whatsapp: formUpdateInstituicao.values.whatsapp,
                    descricao: formUpdateInstituicao.values.descricao,
                    foto: formUpdateInstituicao.values.foto })
                .eq('id', session.user.id)

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

    async function uploadAvatar(event) {
        try {
          //const file = event.target.files[0]
          const fileExt = file.name.split('.').pop()
          const fileName = `${Math.random()}.${fileExt}`
          const filePath = `${fileName}`
    
          const { error: uploadError } = await supabase.storage.from('avatares').upload(filePath, file)
    
          if (uploadError) {
            throw uploadError
          } else {
            const { data: { session }} = await supabase.auth.getSession();

            const { error } = await supabase
                .from('instituicao')
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
            await validationSchema.validate(formUpdateInstituicao.values, {abortEarly: false});
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
        <div>
            {fetchDone ? //Só mostra o formulário se os dados já tiverem sido pegos
               
                <form onSubmit={ HandleSubmit }>
                    <div className="inputs_editar_dados">
                        <label id="lbl_img" className="escolher_img">
                            {img === null && <FontAwesomeIcon icon={ faHandHoldingHeart } size='4x' color='#e87f45' id='img_none' />}
                            {img !== null && <img id="img_perfilONG" src={img} alt="foto de perfil" className='rounded-full h-16 w-16' />}
                            <div className='editar_fotoPerfil'>
                                <FontAwesomeIcon icon={ faCamera } color='white' />
                                <p>Escolha uma foto</p>
                                <input type="file" id="input" name="input_imagem" onChange={(e) => {onImageChange(e); formUpdateInstituicao.handleChange(e);}} />
                            </div>
                        </label>
                
                        <p>CNPJ:</p>
                        <input type="text" placeholder="CNPJ" name="cnpj" value={ formUpdateInstituicao.values.cnpj } onChange={formUpdateInstituicao.handleChange} disabled />
                        
                        <p>Nome da entidade:</p>
                        <input type="text" placeholder="Nome da entidade" name="nomeinstituicao" value={ formUpdateInstituicao.values.nomeinstituicao } onChange={formUpdateInstituicao.handleChange} />
                        {erros.nomeinstituicao && <div className='text-red-600 mt-0 mb-2'>{erros.nomeinstituicao}</div>}

                        <p>E-mail:</p>
                        <input type="email" placeholder="E-mail" name="emailinstituicao" value={ formUpdateInstituicao.values.emailinstituicao } onChange={formUpdateInstituicao.handleChange} />
                        {erros.emailinstituicao && <div className='text-red-600 mt-0 mb-2'>{erros.emailinstituicao}</div>}

                        <p>Site:</p>
                        <input type='text' placeholder='Site da instituição' name="site" value={ formUpdateInstituicao.values.site } onChange={formUpdateInstituicao.handleChange} />
                        
                        <div className='flex_gapEditar'>
                            <div>
                                <p>Área:</p>
                                <input type="text" value="Educação" name="area" disabled />
                            </div>
                            <div>
                            <p>Categoria:</p>
                                <select name="categorias" id="categorias" value={ formUpdateInstituicao.values.categorias }>
                                    <option value="">Categoria</option>
                                    {categorias.map((categoria) => (
                                        <option key={categoria.codcategoria} value={categoria.codcategoria} onChange={formUpdateInstituicao.handleChange}>{categoria.nomecategoria}</option>
                                    ))}
                                </select>
                            </div>
                            
                        </div>
                        {erros.categorias && <div className='text-red-600 mt-0 mb-2'>{erros.categorias}</div>}
                        <div className='flex_gapEditar'>
                            <div>
                                <p>CEP:</p>
                                <input type="text" placeholder="CEP" name='cep' value={ formUpdateInstituicao.values.cep } onBlur={pesquisaCEP} onChange={formUpdateInstituicao.handleChange} />
                            </div>
                            <div>
                                <p>Bairro:</p>
                                <input type="text" name='bairro' value={ formUpdateInstituicao.values.bairro } {...register("bairro")} placeholder="Bairro" onChange={formUpdateInstituicao.handleChange} disabled />
                            </div>
                        </div>
                        {erros.cep && <div className='text-red-600 mt-0 mb-2'>{erros.cep}</div>}
                        {errors && <div className="text-red-600 mt-0 mb-2" id="alerta_cep" style={{display: "none"}}>{errors.apiError?.message}</div>}
                        
                        <p>Logradouro:</p>
                        <input type="text" name='logradouro' value={ formUpdateInstituicao.values.logradouro } {...register("logradouro")} placeholder="Logradouro" disabled />
                        <div className='flex_gapEditar'>
                            <div>
                                <p>Cidade:</p>
                                <input type="text" name='cidade' value={ formUpdateInstituicao.values.cidade } {...register("cidade")} placeholder="Cidade" style={{width:"100%"}} disabled />
                            </div>
                            <div style={{width: "20%"}}>
                                <p>UF:</p>
                                <input type="text" name='uf' value={ formUpdateInstituicao.values.uf } {...register("uf")} placeholder="UF" onChange={formUpdateInstituicao.handleChange} disabled />
                            </div>
                        </div>
                        <div className='flex_gapEditar'>
                            <div>
                                <p>Complemento:</p>
                                <input type="text" name='complemento' value={ formUpdateInstituicao.values.complemento } placeholder="Complemento" onChange={formUpdateInstituicao.handleChange}  style={{width:"100%"}} />
                            </div>
                            <div style={{width: "20%"}}>
                                <p>Número:</p>
                                <input type="text" name='numero' value={ formUpdateInstituicao.values.numero } placeholder="Nº" onChange={formUpdateInstituicao.handleChange} />      
                            </div>
                        </div>
                        {erros.numero && <div className='text-red-600 mt-0 mb-2'>{erros.numero}</div>}

                        <div className='flex_gapEditar'>
                            <div>
                                <p>Telefone:</p>
                                <input type="text" placeholder="Telefone de contato"  name="telefone" value={ formUpdateInstituicao.values.telefone } onChange={formUpdateInstituicao.handleChange} />
                            </div>
                            <div>
                                <p>WhatsApp:</p>
                                <input type="text" placeholder='WhatsApp' name="whatsapp" value={ formUpdateInstituicao.values.whatsapp } onChange={formUpdateInstituicao.handleChange} />
                            </div>
                            {erros.telefone && <div className='text-red-600 mt-0 mb-2'>{erros.telefone}</div>}
                        </div>
                        <p>Descrição:</p>
                        <textarea className='digitar_descricao' placeholder="Descreva sobre a instituição"  name="descricao" value={ formUpdateInstituicao.values.descricao } onChange={formUpdateInstituicao.handleChange}  />
                        <div className='flex gap-2 self-end items-center'>
                            <button className='botao_salvar'>SALVAR ALTERAÇÕES</button>
                            <button className='botao_deletarConta'>DELETAR CONTA</button>
                        </div>
                    </div>
                </form>
            : null }</div>
    </>
    )   
}

export default Form_dados