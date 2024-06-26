import React, {useEffect, useState} from 'react'
import './resultados.css';
import './filtros.css'
import { useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandHoldingHeart } from '@fortawesome/free-solid-svg-icons';
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from 'react-router-dom';

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

function Resultados() {
    //recebe os valores da busca por texto
    const location = useLocation();
    const busca = location.state

    const [instituicoes, setInstituicoes] = useState(null);
    const [cidades, setCidades] = useState(null);
    const [estados, setEstados] = useState(null);
    const [bairros, setBairros] = useState(null);
    const [categorias, setCategorias] = useState(null);
    const [imgURL, setImgURL] = useState([])
    const [img, setImg] = useState([]); //armazena a foto de perfil em vetor (para mostrar na tela)
    const [fetchError, setFetchError] = useState([]);
    const [fetchInstituicaoDone, setFetchInstituicaoDone] = useState(false); //varíavel pra saber se já puxou os dados da instituicao
    const [pesquisaDone, setPesquisaDone] = useState(true)
    const [fetchFiltrosDone, setFetchFiltrosDone] = useState(false)
    const [fetchFotoDone, setFetchFotoDone] = useState(false)


    const navigate = useNavigate();

    //Vetor que vai armazenar os filtros
    const formFiltro = CreateForm({
        initialValues: {
            categorias: '',
            estado: '',
            cidade: '',
            bairro: '',
            vagasAbertas: ''
        }
    });

    const fetchInstituicoes = async () => {
        try {
            try {
                setFetchInstituicaoDone(false)
                let query = supabase.from('instituicao').select('*, categoria(nomecategoria)')
                const filtros = {
                    'codcategoria': formFiltro.values.categorias,
                    'cidade': formFiltro.values.cidade,
                    'uf': formFiltro.values.estado,
                    'bairro': formFiltro.values.bairro,
                    'nomeinstituicao': busca
                }

                Object.entries(filtros).forEach(([coluna, valor]) => {
                    // Checa se o valor do filtro não é vazio/nulo
                    if (valor !== '' && valor !== null) {
                        if (coluna === "nomeinstituicao") {
                            query = query.textSearch(coluna, valor)
                        } else {
                            query = query.eq(coluna, valor);
                        }
                    }
                });

                const { data, error } = await query;

                console.log(data)

                if (error) {
                    setFetchError("Não foi possível recuperar as informações")
                    setInstituicoes(null)
                    console.log(error)
                }

                if (data) {
                    setInstituicoes(data)
                    setFetchError(null)
                }
            } catch(error) {
                console.log(error);
            }

            try {
                let query = supabase.from('instituicao').select('*')
                const filtros = {
                    'codcategoria': formFiltro.values.categorias,
                    'cidade': formFiltro.values.cidade,
                    'uf': formFiltro.values.estado,
                    'bairro': formFiltro.values.bairro,
                    'nomeinstituicao': busca
                }

                Object.entries(filtros).forEach(([coluna, valor]) => {
                    // Checa se o valor do filtro não é vazio/nulo
                    if (valor !== '' && valor !== null) {
                        if (coluna === "nomeinstituicao") {
                            query = query.textSearch(coluna, valor)
                        } else {
                            query = query.eq(coluna, valor);
                        }
                    }
                });

                const { data, error } = await query;

                if (error) {
                    setFetchError("Não foi possível recuperar as informações")
                    setInstituicoes(null)
                    console.log(error)
                }

                if (data) { //coloca as urls dentro de um vetor para posteriormente pegar o link delas
                    setImgURL(data)
                }
            } catch (error) {
                console.log("Erro capturando a foto de perfil:", error.message)
            }
        } catch (error) {
            console.log(error.message)
        } finally {
            setFetchInstituicaoDone(true)
        }
    }

    const FetchFotosPerfil = async () => {
        try {
            const imagens = [] = await Promise.all( imgURL.map(async (dado) => {
                if(dado.foto === null) {
                    return null;
                } else {
                    const { data, error } = await supabase.storage.from('avatares').getPublicUrl(dado.foto);
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
        } finally{
            setFetchFotoDone(true)
        }   
    }

    useEffect(() => {
        if (!fetchInstituicaoDone) {
            fetchInstituicoes();
        }

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
                setFetchFiltrosDone(true)
            }
        }

        const fetchEstados = async () => {
            const { data, error } = await supabase
            .from('instituicao')
            .select('uf')
            
            if (error) {
                setFetchError("Não foi possível recuperar as informações")
                setEstados(null)
                console.log(fetchError)
            }

            if (data) {
                const estadosUnicos = Array.from(new Set(data.map(row => row.uf)));
                setEstados(estadosUnicos)
                setFetchError(null)
                fetchCategorias()
            }
        }

        const fetchCidades = async () => {
            const { data, error } = await supabase
            .from('instituicao')
            .select('cidade')
            
            if (error) {
                setFetchError("Não foi possível recuperar as informações")
                setCidades(null)
                console.log(fetchError)
            }

            if (data) {
                const cidadesUnicas = Array.from(new Set(data.map(row => row.cidade)));
                setCidades(cidadesUnicas)
                setFetchError(null)
                fetchEstados()
            }
        }

        const fetchBairros = async () => {
            const { data, error } = await supabase
            .from('instituicao')
            .select('bairro')
            
            if (error) {
                setFetchError("Não foi possível recuperar as informações")
                setBairros(null)
                console.log(fetchError)
            }

            if (data) {
                const bairrosUnicos = Array.from(new Set(data.map(row => row.bairro)));
                setBairros(bairrosUnicos)
                setFetchError(null)
                fetchCidades()
            }
        }
        fetchBairros()

    }, [fetchInstituicaoDone])

    const Pesquisar = async () => {
        try {
            try {
                let query = supabase.from('instituicao').select('*, categoria(nomecategoria)')
                const filtros = {
                    'codcategoria': formFiltro.values.categorias,
                    'cidade': formFiltro.values.cidade,
                    'uf': formFiltro.values.estado,
                    'bairro': formFiltro.values.bairro
                }

                Object.entries(filtros).forEach(([coluna, valor]) => {
                    // Checa se o valor do filtro não é vazio/nulo
                    if (valor !== '' && valor !== null) {
                        query = query.eq(coluna, valor);
                    }
                });

                const { data, error } = await query;

                if (error) {
                    setFetchError("Não foi possível recuperar as informações")
                    setInstituicoes(null)
                    console.log(error)
                }

                if (data) {
                    setInstituicoes(data)
                    setFetchError(null)
                }
            } catch(error) {
                console.log(error);
            }

            try {
                let query = supabase.from('instituicao').select('*')
                const filtros = {
                    'codcategoria': formFiltro.values.categorias,
                    'cidade': formFiltro.values.cidade,
                    'uf': formFiltro.values.estado,
                    'bairro': formFiltro.values.bairro
                }

                Object.entries(filtros).forEach(([coluna, valor]) => {
                    // Checa se o valor do filtro não é vazio/nulo
                    if (valor !== '' && valor !== null) {
                        query = query.eq(coluna, valor);
                    }
                });

                console.log("query", query)

                const { data, error } = await query;

                if (error) {
                    setFetchError("Não foi possível recuperar as informações")
                    setImgURL(null)
                    console.log(error)
                }

                if (data) { //coloca as urls dentro de um vetor para posteriormente pegar o link delas
                    setImgURL(data)
                }
            } catch (error) {
                console.log("Erro capturando a foto de perfil:", error.message)
            }
        } catch (error) {
            console.log(error.message)
        } finally {
            setPesquisaDone(true)
        }
    }

    useEffect(() => {
        console.log("oi")
        setFetchInstituicaoDone(false)
    }, [busca])

    useEffect (() => {
        if(!pesquisaDone) {
           Pesquisar()
        }

        if(fetchInstituicaoDone || pesquisaDone) {
            FetchFotosPerfil()
        }
    }, [pesquisaDone, fetchInstituicaoDone])

  return (
    <>
    { fetchInstituicaoDone && fetchFiltrosDone && fetchFotoDone ?
    <>
    <div className='barra_filtros'>
        <select name="estado" id="estados" value={ formFiltro.values.estado } onChange={(e) => {formFiltro.handleChange(e)}}>
            <option value="">Estado</option>
            {estados.map((estado , index) => (
                <option key={index} value={estado} onChange={formFiltro.handleChange}>{estado}</option>
            ))}
        </select>
        <select name="cidade" id="cidades" value={ formFiltro.values.cidade } onChange={(e) => {formFiltro.handleChange(e)}}>
            <option value="">Cidade</option>
            {cidades.map((cidade , index) => (
                <option key={index} value={cidade} onChange={formFiltro.handleChange}>{cidade}</option>
            ))}
        </select>
        <select name="bairro" id="bairros" value={ formFiltro.values.bairro } onChange={(e) => {formFiltro.handleChange(e)}}>
            <option value="">Bairro</option>
            {bairros.map((bairro , index) => (
                <option key={index} value={bairro} onChange={formFiltro.handleChange}>{bairro}</option>
            ))}
        </select>
        <select name="categorias" id="categorias" value={ formFiltro.values.categorias } onChange={(e) => {formFiltro.handleChange(e)}}>
            <option value="">Categoria</option>
            {categorias.map((categoria) => (
                <option key={categoria.codcategoria} value={categoria.codcategoria} onChange={formFiltro.handleChange}>{categoria.nomecategoria}</option>
            ))}
        </select>
        <button className='botao_salvar' onClick={(e) => {setImg([]); setImgURL([]); setPesquisaDone(false)}}>PESQUISAR</button>
    </div>
    {instituicoes.length === 0 ? <center>Nenhuma instituição satisfaz essa pesquisa</center> :
    <div className='resultados'>
        {instituicoes.map((instituicao, index) => (
            <div className='container_resultado' key={instituicao.id}>
                <div className='info_ong'>
                    {img[index] === null && <FontAwesomeIcon icon={ faHandHoldingHeart } size='8x' color='white' id='img_none' />}
                    {img[index] !== null && <img id="img_perfilONG" src={img[index]} alt="foto de perfil" className='h-26 w-20' />}
                    <div className='container__dadosResultado'>
                        <span>
                            <p className='nome_ong'>{instituicao.nomeinstituicao}</p>
                            <p title={instituicao.descricao}>{instituicao.descricao.length <= 400 ? instituicao.descricao : instituicao.descricao.slice(0, 400)+'...'}</p>
                        </span>

                        <div className='opcoes_resultado'>
                            {instituicao.site && <button><a href={instituicao.site}>SITE</a></button>}
                            <button onClick={() => navigate('/perfil_instituicao', {state: instituicao})}>MAIS INFORMAÇÕES</button>
                        </div> 
                    </div>       
                </div>
            </div>
        ))}
    </div>}
    </>
    : null}
    </>
  )
}

export default Resultados