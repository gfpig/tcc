import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import {useForm} from 'react-hook-form';
import './timeline.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' ;
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { createClient } from "@supabase/supabase-js";
import Posts from './Posts/Posts';
import foto_perfil from './assets/cats.png';
import imagem_post from './assets/fatec.png';

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
          console.log("value: ", value);
      },
  };
}

var data = new Date()
console.log(data.toLocaleString())

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

  const [posts, setPosts] = useState([]);
  const [fetchDone, setFetchDone] = useState(false)
  const [isInstituicao, setIsInstituicao] = useState(null) //variável para saber se o usuário é a instituição do perfil

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
  }, [])

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
      }
    } catch (erro) {
      console.log(erro)
    } finally {
      setFetchDone(true)
    }
  }

  FetchPosts()

  const HandleSubmit = async (e) => {
    e.preventDefault()
    console.log(formPost);
  }

  return (
    <>  
    {fetchDone && isInstituicao !== null ? 
    <>
    <div className="flex flex-col ml-3 mr-3 md:ml-0 md:mr-0 items-center self-center w-full xl:w-2/3 md:w-2/3">
      {isInstituicao ? (
          <form className='form_post' onSubmit={HandleSubmit}>
            <div className='funcoes_postar'>
              <textarea className='digitar_post' name="descricao" value={ formPost.values.descricao } placeholder="Digite seu post" onChange={ formPost.handleChange } />
              <div className='acoes_postar'>
                  <button className='selecionar_imagem'><FontAwesomeIcon icon={ faCamera } size="2xl" /></button>
                  <button className='publicar'>PUBLICAR</button>
              </div>
            </div>
          </form>
        ) : null
      }
      {/*<Posts />*/}
      {posts.length !== 0 ? 
        posts.map((post) => (
          <div className='post'>
            <div className='cabecalho_post'>
                <div className='foto_cabecalho'>
                    <img src={foto_perfil} alt="foto de perfil da instituição" />
                </div>
                <div className='detalhes_cabecalho'>
                    <p className='nome_instituicao'>Lorem Ipsum</p>
                    <p>8 de setembro de 2023</p>
                </div>
            </div>
            <div className='corpo_post'>
                <p>
                    As inscrições para o vestibular da FATEC já estão abertas! Fique atento às datas para não perder nenhum etapa do processo:
                    <br /><br />
                    Inscrições apenas no site: www.vestibularfatec.com.br
                </p>
                <img className='img_post' src={imagem_post} alt="imagem" />
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