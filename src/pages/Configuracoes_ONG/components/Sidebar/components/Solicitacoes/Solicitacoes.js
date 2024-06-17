import React, {useState, useEffect} from 'react';
import './solicitacoes.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' ;
import { faUserCircle, faCircle } from '@fortawesome/free-solid-svg-icons';
import { createClient } from "@supabase/supabase-js";

const PROJECT_URL = "https://xljeosvrbsygpekwclan.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhsamVvc3ZyYnN5Z3Bla3djbGFuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ1MTY1NzAsImV4cCI6MjAzMDA5MjU3MH0.InFDrSOcPxRe4LXMBJ4dT59bBb3LSpKw063S90E3uPo"
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);


function Solicitacoes() {
    //const [sessao, setSessao] = useState(null)
    const [candidaturas, setCandidaturas] = useState([])
    const [categorias, setCategorias] = useState([]);
    const [imgURL, setImgURL] = useState([]) //vetor que armazena a url das fotos de perfil
    const [img, setImg] = useState([]) //vetor que armazena as fotos de perfil
    const [idade, setIdade] = useState([])
    const [datanasc, setDatanasc] = useState([])

    const [fetchDone, setFetchDone] = useState(false)
    const [fetchURLDone, setFetchURLDone] = useState(false)
    const [fetchCategoriasDone, setFetchCategoriasDone] = useState(false)
    const [fetchFotoPerfilDone, setFetchFotoPerfilDone] = useState(false)
    const [calculoIdadeDone, setCalculoIdadeDone] = useState(false)

    useEffect (() => {
        const verificaSessao = async () => { //pegando a sessão e colocando numa variável
            try {
                const { data: { session }} = await supabase.auth.getSession();
                FetchCandidaturas(session)
            } catch (error) {
                console.log(error)
            }
        }
        verificaSessao()

        const fetchCategorias = async () => {
            const { data, error } = await supabase
            .from('categoria')
            .select('*')
            
            if (error) {
                setCategorias(null)
                console.log(error.message)
            }

            if (data) {
                setCategorias(data)
                setFetchCategoriasDone(true)
            }
        }
        fetchCategorias()

        const FetchCandidaturas = async (sessao) => {
            try { //try para pegar as candidaturas               
                const { data, error } = await supabase
                .from('solicitacao')
                .select(`*, candidato(*)`)
                .eq('id_instituicao', sessao.user.id);

                if (error) {
                    console.log(error)
                    setCandidaturas([])
                }
          
                if (data) {
                  setCandidaturas(data)
                }

                //CalculaIdade()
            } catch (erro) {
                console.log(erro)
            } finally {
                //CalculaIdade()
                //FetchUrl()
                setFetchDone(true)
            }
        }
        if (fetchDone) {
            FetchUrl()
        }

        if(fetchURLDone) {
            FetchFotoPerfil()
        }

        /*const FetchUrl = async () => {
            try { //try para pegar a URL das fotos de perfil     
                {console.log("candidaturas", candidaturas)}
                const imgURL = await Promise.all(candidaturas.map(async (solicitacao) =>{
                    const { data, error } = await supabase
                    .from('candidato')
                    .select('foto')
                    .eq('id', solicitacao.id_candidato)

                    if (error) {
                        console.log(error)
                        return null;
                    }
        
                    if (data) { //coloca as urls dentro de um vetor para posteriormente pegar o link delas
                        console.log(data[0].foto)
                        console.log("oi")
                        //data.map((user) => (url_foto = user.foto))
                        return data && data[0] && data[0].foto;
                    }                    
                }));

                setImgURL(imgURL)
            } catch (error) {
                console.log("Erro capturando a foto de perfil:", error.message)
            } finally {
                FetchFotoPerfil()
            }
        }*/

        /*const FetchFotoPerfil = async () => {
            {console.log(imgURL)}
            const imagens = await Promise.all( imgURL.map(async (dado, index) => {
                if(dado.foto === null) { 
                    return null
                } else {
                    const { data } = await supabase.storage.from('avatares').getPublicUrl(dado.foto);
                    return data.publicUrl
                }
            }));
            setImg(imagens)
            setFetchFotoPerfilDone(true)
        }*/

        /*if (!setFetchDone) {
            FetchCandidaturas();
        }*/
    }, [fetchDone, fetchURLDone])

    const FetchUrl = async () => {
        try { //try para pegar a URL das fotos de perfil     
            {console.log("candidaturas", candidaturas)}
            //const imgURL = await Promise.all(candidaturas.map(async (solicitacao) => {
            //candidaturas.map(async (solicitacao) => {
            const imgURLData = await Promise.all(candidaturas.map(async (solicitacao) => {
                const { data, error } = await supabase
                .from('candidato')
                .select('foto')
                .eq('id', solicitacao.id_candidato)

                if (error) {
                    console.log(error)
                    return null
                }
    
                if (data) { //coloca as urls dentro de um vetor para posteriormente pegar o link delas
                    //console.log(data[0].foto)
                    //data.map((user) => setImgURL(user.foto))
                    setImgURL(data)
                    //data.map((user) => (url_foto = user.foto)
                    //return data && data[0] && data[0].foto;
                    //return data && data[0] && data[0].foto;
                }
            //})  
            }));      
            //}));

            //setImgURL(imgURL)
        } catch (error) {
            console.log("Erro capturando a foto de perfil:", error.message)
        } finally {
            setFetchURLDone(true)
        }
    }

    const FetchFotoPerfil = async () => {
        console.log(imgURL)
        console.log(fetchURLDone)
        //console.log("5", Array.isArray(imgURL)
        const imagens = await Promise.all( imgURL.map(async (dado, index) => {
            if(dado.foto === null) { 
                return null
            } else {
                const { data } = await supabase.storage.from('avatares').getPublicUrl(dado.foto);
                return data.publicUrl
            }
        }));
        setImg(imagens)
        setFetchFotoPerfilDone(true)
    }

    useEffect(() => {
        const CalculaIdade = () => {
            const hoje = new Date();
            const birthdateDate = new Date(datanasc);
            let age = hoje.getFullYear() - birthdateDate.getFullYear();
            const monthDiff = hoje.getMonth() - birthdateDate.getMonth();

            if (monthDiff < 0 || (monthDiff === 0 && hoje.getDate() < birthdateDate.getDate())) {
            age--;
            }

            setIdade(age);
            setCalculoIdadeDone(true);
        }

        if (candidaturas.length > 0) {
            for (let i = 0; i < candidaturas.length; i++) {
                setDatanasc(candidaturas[i].candidato.datanascimento);
            }
        }

        CalculaIdade();

    }, [candidaturas, datanasc]);

    const HandleAceitar = async () => {
        console.log("Solicitação Aceita")
    }

    const HandleRecusar = async () => {
        console.log("Solicitação Recusada")
    }

  return (
    <>
    {fetchDone && calculoIdadeDone && fetchFotoPerfilDone && fetchCategoriasDone ?
    <>
    {/*console.log(fetchFotoPerfilDone)*/}
    {console.log(img)}
        <div className='cabecalho__candidatura'>
            <div><p>CANDIDATOS</p></div>
            <div className='flex gap-3'>
                <select name="categorias" id="categorias">
                    <option value="">Categoria</option>
                    {categorias.map((categoria) => (
                        <option key={categoria.codcategoria} >{categoria.nomecategoria}</option>
                    ))}
                </select>
                <select>
                    <option>Status</option>
                    <option>Aprovado</option>
                    <option>Em análise</option>
                    <option>Não aprovado</option>
                </select>
                <button className="botao_salvar">FILTRAR</button>
            </div>
        </div>
        <hr className='hr_solicitacoes' />

        {candidaturas.map((solicitacao, index) => (
            <>
            <div className='container__candidato' key={solicitacao.codsolicitacao}>
                <div className='info_candidatura'>
                    {img[index] !== null && <img id="img_perfilONG" src={img[index]} alt="foto de perfil"  />}
                    {img[index] === null && <FontAwesomeIcon icon={ faUserCircle } size='8x' color='#e87f45' />}
                    <div className='container__dadosCandidato'>
                        <span>
                            <p className='nome_candidato'>{solicitacao.candidato.nomecandidato}</p>
                            <p>Cidade: {solicitacao.candidato.cidade}</p>
                            <p>Idade: {idade}</p>
                            <p>Gênero: {solicitacao.candidato.genero}</p>
                        </span>
                    </div>     
                </div>
                <div className='status_candaditura'>
                        <div className='status analise'>
                            <FontAwesomeIcon icon={ faCircle } />
                            <span>{solicitacao.status}</span>
                        </div>
                        <div className='flex gap-2'>
                            <button onClick={HandleAceitar} style={{backgroundColor:"#4CCD82"}}>ACEITAR</button>
                            <button onClick={HandleRecusar} style={{backgroundColor:"#E84645"}}>RECUSAR</button>
                            <button>MAIS DETALHES</button>
                        </div>
                        
                </div>
            </div>
            </>
        ))}
        </>
    : null}
        </>
  )
}

export default Solicitacoes