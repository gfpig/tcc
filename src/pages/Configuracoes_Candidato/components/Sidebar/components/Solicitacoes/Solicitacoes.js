import React, { useState, useEffect } from 'react';
//import './solicitacoes.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandHoldingHeart, faCircle } from '@fortawesome/free-solid-svg-icons';
import { createClient } from "@supabase/supabase-js";
import Swal from 'sweetalert2';

const PROJECT_URL = "https://xljeosvrbsygpekwclan.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhsamVvc3ZyYnN5Z3Bla3djbGFuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ1MTY1NzAsImV4cCI6MjAzMDA5MjU3MH0.InFDrSOcPxRe4LXMBJ4dT59bBb3LSpKw063S90E3uPo"
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

function CreateForm (valoresDoForm) {
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

function Solicitacoes() {
    document.title = "Solicitações"

    const [candidaturas, setCandidaturas] = useState([])
    const [imgURL, setImgURL] = useState([]) //vetor que armazena a url das fotos de perfil
    const [img, setImg] = useState([]) //vetor que armazena as fotos de perfil

    const [fetchDone, setFetchDone] = useState(false)
    const [pesquisaDone, setPesquisaDone] = useState(null)
    const [fetchFotoPerfilDone, setFetchFotoPerfilDone] = useState(false)

    //Vetor que vai armazenar os filtros
    const formFiltro = CreateForm({
        initialValues: {
            status: ''
        }
    });

    useEffect (() => {
        const FetchCandidaturas = async () => {
            const { data: { session }} = await supabase.auth.getSession();

            try { //try para pegar as candidaturas               
                const { data, error } = await supabase
                .from('solicitacao')
                .select(`*, instituicao(*)`)
                .eq('id_candidato', session.user.id);

                if (error) {
                    console.log(error)
                    setCandidaturas([])
                }
          
                if (data) {                    
                    setCandidaturas(data)
                    const imgURLData = await Promise.all(data.map(async (solicitacao) => {
                        return solicitacao.instituicao.foto
                    }));
                    setImgURL(imgURLData)
                }
            } catch (erro) {
                console.log(erro)
            } finally {
                setFetchDone(true)
            }
        }

        if(!fetchDone) {
            FetchCandidaturas()
        }

        if (fetchDone || pesquisaDone) {
            FetchFotoPerfil()
        }

        if(pesquisaDone === false) {
            Pesquisar()
         }
    }, [fetchDone, pesquisaDone])

    const FetchFotoPerfil = async () => {
        try {
            const imagens = [] = await Promise.all( imgURL.map(async (dado) => { 
                if(dado === null) {
                    return null;
                } else {
                    const { data, error } = await supabase.storage.from('avatares').getPublicUrl(dado);
                    if(error) {
                        console.log(error)
                        return null
                    }

                    if(data) {
                        return data.publicUrl
                    }
                }
            }));
            setImg(imagens)
        } catch (error) {
            console.log(error.message)
        } finally {
            setFetchFotoPerfilDone(true)
        }
    }

    const Pesquisar = async () => {
        const { data: { session }} = await supabase.auth.getSession();

        try {
            const filtro = {
                'status': formFiltro.values.status
            }

            let query = supabase.from('solicitacao')
            .select('*, instituicao(*)')
            .eq('id_candidato', session.user.id);

            Object.entries(filtro).forEach(([coluna, valor]) => {
                // Checa se o valor do filtro não é vazio/nulo
                if (valor !== '' && valor !== null) {
                    query = query.eq(coluna, valor);
                }
            });

            const { data, error } = await query;

            if (error) {
                setCandidaturas(null)
                console.log(error)
            }

            if (data) {
                setCandidaturas(data)
                const imgURLData = await Promise.all(data.map(async (solicitacao) => {
                    return solicitacao.instituicao.foto
                }));
                setImgURL(imgURLData)
            } 
        } catch(error) {
            console.log(error);
        } finally {
            setPesquisaDone(true)
        }
    }

  return (
    <>
    {fetchDone && fetchFotoPerfilDone && (pesquisaDone === null || pesquisaDone === true) ?
        <>
        <div className='cabecalho__candidatura'>
            <div><p>INSTITUIÇÕES</p></div>
            <div className='flex gap-3'>
                <select name="status" id="status" value={ formFiltro.values.status } onChange={(e) => {formFiltro.handleChange(e)}}>
                    <option value="">FILTRAR</option>
                    <option value="APROVADO">Aprovado</option>
                    <option value="EM ANÁLISE">Em análise</option>
                    <option value="NÃO APROVADO">Não aprovado</option>
                </select>
                <button className="botao_salvar" onClick={() => {setFetchFotoPerfilDone(false); setPesquisaDone(false)}}>FILTRAR</button>
            </div>
        </div>
        <hr className='hr_solicitacoes' />
        {candidaturas.length === 0 ? <center>Nenhuma solicitação safistaz essa pesquisa</center>:
        <>
        {candidaturas.map((solicitacao, index) => (
            <div className='container__candidato' key={solicitacao.codsolicitacao}>
                <div className='info_candidatura'>
                    {img[index] !== null && <img id="img_perfilONG" src={img[index]} alt="foto de perfil"  />}
                    {img[index] === null && <FontAwesomeIcon icon={ faHandHoldingHeart } size='8x' color='white' />}
                    <div className='container__dadosCandidato'>
                        <span>
                            <p className='nome_candidato'>{solicitacao.instituicao.nomeinstituicao}</p>
                            <p>Categoria: Profissionalizante</p>
                            <p>E-mail: {solicitacao.instituicao.emailinstituicao}</p>
                            <p>Telefone: {solicitacao.instituicao.telefone}</p>
                            <p>Cidade: {solicitacao.instituicao.cidade}, {solicitacao.instituicao.uf}</p>
                            {solicitacao.instituicao.site && <p>Site: <a href={solicitacao.instituicao.site}>{solicitacao.instituicao.site}</a></p>}
                        </span>
                    </div>     
                </div>
                <div className='status_candaditura'>
                    <div className='status'
                        style={
                            solicitacao.status === "EM ANÁLISE" ? {color:"#e87f45"} :
                            solicitacao.status === "APROVADO" ? {color:"#8fcd82"} :
                            solicitacao.status === "NÃO APROVADO" ? {color:"#E84645"} : {}
                        }>
                        <FontAwesomeIcon icon={ faCircle } />
                        <span>{solicitacao.status}</span>
                    </div>
                </div>
            </div>
        ))}
        </>
        }
        </>
        : null}
        </>
  )
}

export default Solicitacoes