import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import {useForm} from 'react-hook-form';
import './timeline.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' ;
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { createClient } from "@supabase/supabase-js";
import Posts from './Posts/Posts';
//import foto_perfil from './assets/cats.png';
//import imagem_post from './assets/fatec.png';

const PROJECT_URL = "https://xljeosvrbsygpekwclan.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhsamVvc3ZyYnN5Z3Bla3djbGFuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ1MTY1NzAsImV4cCI6MjAzMDA5MjU3MH0.InFDrSOcPxRe4LXMBJ4dT59bBb3LSpKw063S90E3uPo"
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

function CreateUser (valoresDoLogin) {
  const [values, setValues] = React.useState(valoresDoLogin.initialValues);
  const {clearErrors} = useForm();

  return {
      values, 
      handleChange: (evento) => {
          //clearErrors('ErroPost');
          //document.getElementById("alerta_login").style.display = "none";
          const value = evento.target.value;
          const name = evento.target.name;
          setValues ({
              ...values,
              [name]: value,
          });    
          //console.log("value: ", value);
      },
  };
}

var data = new Date()
//console.log(data.toLocaleString())

function Timeline() {
  const location = useLocation();
  const instituicao = location.state
  const formPost = CreateUser({
    initialValues: {
      id_instituicao: instituicao.id,
      descricao: "",
      data: data.toLocaleString(),
      imagem: ""
    }
  });

  const [fotoPerfil, setFotoPerfil] = useState(null)
  const [posts, setPosts] = useState([]);
  const [imgPost, setImgPost] = useState() //vetor que armazena as imagens do post que será feito
  const [imgURL, setImgURL] = useState([]) //vetor que vai guardar as imagens dos posts já feitos
  const [imagem, setImagem] = useState([]);
  const [fetchDone, setFetchDone] = useState(false)
  const [fetchImgDone, setFetchImgDone] = useState(false)
  const [isInstituicao, setIsInstituicao] = useState(null) //variável para saber se o usuário é a instituição do perfil
  const [file, setFile] = useState(null); //armazena a foto do post (para colocar no banco)

  const onImageChange = (e) => {
    const novaFoto = e.target.files[0];
    setFile(novaFoto);
    setImgPost(URL.createObjectURL(novaFoto));
  };

  useEffect(() => {
    const verificaSessao = async () => { //pegando a sessão e colocando numa variável
      const { data: { session }} = await supabase.auth.getSession();
      if (session !== null) {
        if(instituicao.id === session.user.id) {
          setIsInstituicao(true)
        } else {
          setIsInstituicao(false)
        }
      } else {
        setIsInstituicao(false)
      }
    }
    verificaSessao()

    const FetchFotoStorage = async () => { //Pega a foto de perfil da ONG
      try {
        const { data } = await supabase.storage.from('avatares').getPublicUrl(instituicao.foto);
        setFotoPerfil(data.publicUrl)
        FetchPosts()
      } finally {
        setFetchDone(true)
      }
    }
    FetchFotoStorage()

    let codigo_post;
    const FetchPosts = async () => {
      try {
        const { data, error } = await supabase
        .from('postagem_instituicao')
        .select('*')
        .eq('id_instituicao', instituicao.id)
        
        if (error) {
            console.log(error)
            setPosts([])
        }
  
        if (data) {
          //console.log(data.map((post =>(post.codpostagem))))
          setPosts(data)
          for (let i = 0; i < data.length; i++) {
            //console.log(Array.isArray(data[i]))
            //console.log(data[i].codpostagem)
            codigo_post = data[i].codpostagem
            FetchImagemPosts(codigo_post)
          }
        }
      } catch (erro) {
        console.log(erro)
      } finally {
        setFetchDone(true)
      }

      try {
        //setFetchIcon(false)
        const {data, error} = await supabase
        .from('postagem_instituicao')
        .select('imagem')

        if (error) {
            //setFetchError("Não foi possível recuperar as informações")
            //setInstituicoes(null)
            console.log(error)
        }

        if (data) { //coloca as urls dentro de um vetor para posteriormente pegar o link delas
          //console.log(data)
          setImgURL(data)
        }
      } catch (error) {
          console.log("Erro capturando a foto de perfil:", error.message)
      }
    }  
  }, [])

  //let imgURL;
  /*const FetchImagemPosts = async () => {
    //console.log(codPost)
    try {
      const { data, error } = await supabase
      .from('postagem_instituicao')
      .select('codpostagem, imagem')
      //.eq('codpostagem', codPost)
      
      if (error) {
          console.log(error)
          setPosts([])
      }

      if (data) {
        data.map((post) => imgURL = post.imagem)
        console.log(imgURL)
      }

      // Fetch image URL from Supabase storag
      if (imgURL !== null) {
        const { data: img_url } = await supabase.storage.from('imagens_post').getPublicUrl(imgURL); 
        imagem[0] = img_url.publicUrl; // Set image URL in state
        console.log(imagem[0])
        //return imagem;
      }
    } catch (erro) {
      console.log(erro)
    }finally {
      setFetchDone(true)
    }
  }*/
  const FetchImagemPosts = async () => {   
    imgURL.map(async (dado, index) => {
      //console.log(dado.imagem)
      if(dado.imagem === null) { 
        imagem[index] = null
      } else {
        const { data } = await supabase.storage.from('imagens_post').getPublicUrl(dado.imagem);
        imagem[index] = data.publicUrl
        console.log(imagem[index])
      }
    });
    //setFetchImgDone(true)
  }

  FetchImagemPosts()

  const HandleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `${fileName}`

      setImgPost(fileName);

      const { error: uploadError } = await supabase.storage.from('imagens_post').upload(filePath, file)

      try{
          if (uploadError) {
            throw uploadError
          }
        } catch (error) {
          console.log("Erro no upload da foto:",error.message)
        }
      } catch (error) {
        console.log("Erro no upload da foto:",error.message)
      }

    try { //coloca o post na tabela
      const { error } = await supabase
      .from('postagem_instituicao')
      .insert({
        id_instituicao: formPost.values.id_instituicao,
        descricao: formPost.values.descricao,
        data: formPost.values.data,
        imagem: imgPost
      })

    } catch (erro) { //se não estão, cria um novo erro para ser exibido ao usuário
        console.log("Ocorreu um erro: ", erro.message);
    }
  }

  return (
    <>  
    {fetchDone && isInstituicao !== null ? 
    <>
    <div className="flex flex-col ml-3 mr-3 md:ml-0 md:mr-0 items-center self-center w-full xl:w-2/3 md:w-2/3">
      {isInstituicao ? (
          <form className='form_post' onSubmit={HandleSubmit}>
            <div className='funcoes_postar'>
              <textarea className='digitar_post' name="descricao" value={ formPost.values.descricao } placeholder="Digite seu post" onChange={ formPost.handleChange }>
                {imgPost ? <img src={imgPost} alt='imagem post' /> : null}
              </textarea>
              <div className='acoes_postar'>
                  <label className='mr-2'>
                    <FontAwesomeIcon icon={ faCamera } size="2xl" />
                    <input type="file" style={{display:"none"}} className='selecionar_imagem' onChange={(e) => {onImageChange(e);}} />
                  </label>
                  <button className='publicar'>PUBLICAR</button>
              </div>
            </div>
          </form>
        ) : null
      }
      {/*<Posts />*/}
      {posts.length !== 0 ? 
        posts.map((post, index) => (
          <div className='post'>
            <div className='cabecalho_post'>
                <div className='foto_cabecalho'>
                    <img src={fotoPerfil} alt="foto de perfil da instituição" />
                </div>
                <div className='detalhes_cabecalho'>
                    <p className='nome_instituicao'>{instituicao.nomeinstituicao}</p>
                    <p>{post.data}</p>
                </div>
            </div>
            <div className='corpo_post'>
                <p>{post.descricao}</p>
                <img className='img_post' src={imagem[index]} alt="imagem" />
            </div>
          </div>
        ))
        : <div className='mb-2'>Esta instituição ainda não possui nenhuma publicação</div>
      }
    </div>
    </>
    : null}
    </>
  )
}

export default Timeline