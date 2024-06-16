import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import {useForm} from 'react-hook-form';
import './timeline.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' ;
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { createClient } from "@supabase/supabase-js";
import Posts from './Posts/Posts';

const PROJECT_URL = "https://xljeosvrbsygpekwclan.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhsamVvc3ZyYnN5Z3Bla3djbGFuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ1MTY1NzAsImV4cCI6MjAzMDA5MjU3MH0.InFDrSOcPxRe4LXMBJ4dT59bBb3LSpKw063S90E3uPo"
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

function CreateUser (valoresDoLogin) {
  const [values, setValues] = React.useState(valoresDoLogin.initialValues);
  const {clearErrors} = useForm();

  return {
      values, 
      handleChange: (evento) => {
          const value = evento.target.value;
          const name = evento.target.name;
          setValues ({
              ...values,
              [name]: value,
          });
          console.log("value: ", value);
      },
  };
}

var data = new Date()

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
  const [imgPost, setImgPost] = useState() //armazena a imagem do post que será feito
  const [imgURL, setImgURL] = useState([]) //vetor que vai guardar as imagens dos posts já feitos
  const [imagem, setImagem] = useState([]);
  const [imgFront, setImgFront] = useState();
  const [fetchDone, setFetchDone] = useState(false)
  const [fetchImgDone, setFetchImgDone] = useState(false)
  const [isInstituicao, setIsInstituicao] = useState(null) //variável para saber se o usuário é a instituição do perfil
  const [file, setFile] = useState(null); //armazena a foto do post (para colocar no banco)

  const onImageChange = (e) => {
    const novaFoto = e.target.files[0];
    setFile(novaFoto);
    setImgFront(URL.createObjectURL(novaFoto));
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
          setPosts(data)
          for (let i = 0; i < data.length; i++) {
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
        const {data, error} = await supabase
        .from('postagem_instituicao')
        .select('imagem')

        if (error) {
            console.log(error)
        }

        if (data) { //coloca as urls dentro de um vetor para posteriormente pegar o link delas
          setImgURL(data)
        }
      } catch (error) {
          console.log("Erro capturando a foto de perfil:", error.message)
      }
    }  
  }, [])

  useEffect(() => {
    FetchImagemPosts()
  }, [imgURL])

  const FetchImagemPosts = async () => {
    const newImagem = await Promise.all(imgURL.map(async (dado) => {
      if (dado.imagem === null) {
        return null;
      } else {
        const { data } = await supabase.storage.from('imagens_post').getPublicUrl(dado.imagem);
      return data.publicUrl;
      }
    }));

    setImagem(newImagem);
    setFetchImgDone(true);
  };

  const uploadImagemPost = async () => {
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `${fileName}`

      setImgPost(fileName);
      //console.log(imgPost)
      //console.log(fileName)

      const { error: uploadError } = await supabase.storage.from('imagens_post').upload(filePath, file)

      try{
          if (uploadError) {
            throw uploadError
          } else {
            const { error } = await supabase
                .from('postagem_instituicao')
                .update({
                    imagem: fileName })
                .eq('id', instituicao.id)
          }
      } catch (error) {
        console.log("Erro no upload da foto:",error.message)
      }
    } catch (error) {
      console.log("Erro no upload da foto:",error.message)
    }
  }

  const HandleSubmit = async (e) => {
    e.preventDefault()

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

    uploadImagemPost()
  }

  return (
    <>  
    {fetchDone && fetchImgDone && isInstituicao !== null ? 
    <>
    <div className="flex flex-col ml-3 mr-3 md:ml-0 md:mr-0 items-center self-center w-full xl:w-2/3 md:w-2/3">
      {isInstituicao ? (
          <form className='form_post' onSubmit={HandleSubmit}>
            <div className='funcoes_postar'>
              <textarea className='digitar_post' name="descricao" value={ formPost.values.descricao } placeholder="Digite seu post" onChange={ formPost.handleChange } />
              <div className='acoes_postar'>
                  <label className='mr-2'>
                    <FontAwesomeIcon icon={ faCamera } size="2xl" />
                    <input type="file" style={{display:"none"}} className='selecionar_imagem' onChange={(e) => {onImageChange(e); formPost.handleChange(e)}} />
                  </label>
                  <button className='publicar'>PUBLICAR</button>
              </div>
            </div>
          </form>
        ) : null
      }
      {/*<Posts/>*/}
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
                {imagem[index] !== null ? (
                  <img className='img_post' src={imagem[index]} alt="imagem" />
                ) : null}
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