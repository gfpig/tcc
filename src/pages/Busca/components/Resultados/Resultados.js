import React, {useEffect, useState} from 'react'
import './resultados.css';
import './filtros.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandHoldingHeart } from '@fortawesome/free-solid-svg-icons';
import { createClient } from "@supabase/supabase-js";

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
            console.log("name:", name, "\nvalue:", value);
        }
    };
}

function Resultados() {
    const [instituicoes, setInstituicoes] = useState(null);
    const [cidades, setCidades] = useState(null);
    const [estados, setEstados] = useState(null);
    const [bairros, setBairros] = useState(null);
    const [categorias, setCategorias] = useState(null);
    const [vagasAbertas, setVagasAbertas] = useState(null)
    const [imgURL, setImgURL] = useState([])
    const [img, setImg] = useState([]); //armazena a foto de perfil em vetor (para mostrar na tela)
    const [fetchIcon, setFetchIcon] = useState(false)
    const [fetchError, setFetchError] = useState([]);
    const [fetchInstituicaoDone, setFetchInstituicaoDone] = useState(false); //varíavel pra saber se já puxou os dados da instituicao
    const [fetchFiltrosDone, setFetchFiltrosDone] = useState(false)

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

    //let imgURL;

    const fetchInstituicoes = async () => {
        try {
            setFetchInstituicaoDone(false)
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
                //console.log("query", query)
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
        } finally {
            setFetchInstituicaoDone(true)
        }

        try {
            setFetchIcon(false)
            const {data, error} = await supabase
            .from('instituicao')
            .select('foto')
            //setImg([])
            //setImgURL([])
            /*let query = supabase.from('instituicao').select('*')
            const filtros = {
                'codcategoria': formFiltro.values.categorias,
                'cidade': formFiltro.values.cidade,
                'uf': formFiltro.values.estado,
                'bairro': formFiltro.values.bairro,
                //'vagasAbertas': formFiltro.values.vagasAbertas
            }

            Object.entries(filtros).forEach(([coluna, valor]) => {
                // Checa se o valor do filtro não é vazio/nulo
                if (valor !== '' && valor !== null) {
                    query = query.eq(coluna, valor);
                }
                //console.log("query", query)
            });*/

            if (error) {
                setFetchError("Não foi possível recuperar as informações")
                setInstituicoes(null)
                console.log(error)
            }

            if (data) { //coloca as urls dentro de um vetor para posteriormente pegar o link delas
                //setImg([])
                //setImgURL([])
                //console.log("status:", imgURL)
                setImgURL(data)

                //console.log("status2:", imgURL)
            }
        } catch (error) {
            console.log("Erro capturando a foto de perfil:", error.message)
        }
    }

    const FetchFotosPerfil = async () => {
        imgURL.map(async (dado, index) => {
            //console.log("foreach:", dado.foto);
            if(dado.foto === null) { 
                //console.log("oi")
                img[index] = null
            } else {
                const { data } = await supabase.storage.from('avatares').getPublicUrl(dado.foto);
                img[index] = data.publicUrl
            }
        });
        //setFetchIcon(true)
        //console.log("img urls", img)
    }

    FetchFotosPerfil()

    useEffect(() => {
        //console.log(fetchIcon)
        if (!fetchInstituicaoDone) {
            fetchInstituicoes();
        }

        /*if(!fetchIcon) {
            FetchFotosPerfil()
        }*/

        //console.log(img);

        //fetchInstituicoes();

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

    const Pesquisar = async (e) => {
        e.preventDefault()
        //setImg([])
        //setImgURL([])
        console.log("vetores:", img, imgURL)

        try {
            setFetchInstituicaoDone(false)
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
                //console.log("query", query)
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
        } finally {
            setFetchInstituicaoDone(true)
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
                console.log("query", query)
            });

            const { data, error } = await query;

            if (error) {
                setFetchError("Não foi possível recuperar as informações")
                setInstituicoes(null)
                console.log(error)
            }

            if (data) { //coloca as urls dentro de um vetor para posteriormente pegar o link delas
                //setImg([])
                //setImgURL([])
                //console.log("status:", imgURL)
                setImgURL(data)

                //console.log("status2:", imgURL)
            }
        } catch (error) {
            console.log("Erro capturando a foto de perfil:", error.message)
        }
    }

  return (
    <>
    { fetchInstituicaoDone && fetchFiltrosDone /*&& fetchIcon*/ ?
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
        <button className='botao_salvar' onClick={(e) => {setImg([]); setImgURL([]); Pesquisar(e)}}>PESQUISAR</button>
    </div>
    <div className='resultados'> 
        {instituicoes.map((instituicao, index) => (
            <div className='container_resultado'>
                <div className='info_ong'>
                    {img[index] === null && <FontAwesomeIcon icon={ faHandHoldingHeart } size='8x' color='white' id='img_none' />}
                    {img[index] !== null && <img id="img_perfilONG" src={img[index]} alt="foto de perfil" className='h-26 w-20' />}
                    <div className='container__dadosResultado'>
                        <span>
                            <p className='nome_ong'>{instituicao.nomeinstituicao}</p>
                            <p>{instituicao.descricao}</p>
                        </span>

                        <div className='opcoes_resultado'>
                            <button><a href={instituicao.site}>SITE</a></button>
                            <button><a href='/perfil_instituicao'>MAIS INFORMAÇÕES</a></button>
                        </div> 
                    </div>       
                </div>
            </div>
        ))}
    </div>
    </>
    : null}
    </>
  )
}

export default Resultados