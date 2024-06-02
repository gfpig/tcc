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
    const [img, setImg] = useState(null); //armazena a foto de perfil (para mostrar na tela)
    const [fetchError, setFetchError] = useState([]);
    const [fetchInstituicaoDone, setFetchInstituicaoDone] = useState(false); //varíavel pra saber se já puxou os dados da instituicao
    const [fetchFiltrosDone, setFetchFiltrosDone] = useState(false)
    //const fetchInstituicoesRef = useRef(null)

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

    let imgURL;

    const fetchInstituicoes = async () => {
        try {
            setFetchInstituicaoDone(false)
            console.log("fetchInstituicao:", fetchInstituicaoDone)
            let query = supabase.from('instituicao').select('*')
            const filtros = {
                'codcategoria': formFiltro.values.categorias,
                'cidade': formFiltro.values.cidade,
                'uf': formFiltro.values.estado,
                'bairro': formFiltro.values.bairro,
                //'vagasAbertas': formFiltro.values.vagasAbertas
            }

            Object.entries(filtros).forEach(([coluna, valor]) => {
                console.log(`Filter column: ${coluna}, Filter value: ${valor}`);
                // Check if filter value is not empty
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

            if (data) {
                setInstituicoes(data)
                setFetchError(null)
                //setFetchInstituicaoDone(true)
            }
        } catch(error) {
            console.log(error);
        } finally {
            setFetchInstituicaoDone(true)
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
    }

    useEffect(() => {
        if (!fetchInstituicaoDone) {
            fetchInstituicoes();
        }
        /*let imgURL;

        fetchInstituicoesRef.current = async () => {
            try {
                setFetchDone(false)
                let query = supabase.from('instituicao').select('*')
                const filtros = {
                    'codcategoria': formFiltro.values.categorias,
                    'cidade': formFiltro.values.cidade,
                    'uf': formFiltro.values.estado,
                    'bairro': formFiltro.values.bairro,
                    //'vagasAbertas': formFiltro.values.vagasAbertas
                }

                Object.entries(filtros).forEach(([coluna, valor]) => {
                    //console.log(`Filter column: ${coluna}, Filter value: ${valor}`);
                    // Check if filter value is not empty
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
                    setFetchDone(true)
                }
            } catch(error) {
                console.log(error);
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
                //console.log("categoria:", data)
                setCategorias(data)
                setFetchError(null)
                setFetchFiltrosDone(true)
                //fetchInstituicoes();
            }
        }
        //fetchCategorias()

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
                //console.log("categoria:", data)
                const estadosUnicos = Array.from(new Set(data.map(row => row.uf)));
                //console.log("unicos:", estadosUnicos)
                setEstados(estadosUnicos)
                setFetchError(null)
                fetchCategorias()
            }
        }
        //fetchEstados()

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
                //console.log("categoria:", data)
                const cidadesUnicas = Array.from(new Set(data.map(row => row.cidade)));
                //console.log("unicos:", estadosUnicos)
                setCidades(cidadesUnicas)
                setFetchError(null)
                fetchEstados()
            }
        }
        //fetchCidades()

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
                //console.log("categoria:", data)
                const bairrosUnicos = Array.from(new Set(data.map(row => row.bairro)));
                //console.log("unicos:", estadosUnicos)
                setBairros(bairrosUnicos)
                setFetchError(null)
                fetchCidades()
            }
        }
        fetchBairros()

    }, [fetchInstituicaoDone])

  return (
    <>
    {/*console.log("done1:", fetchFiltrosDone, "\ndone2:", fetchInstituicaoDone)*/}
    { fetchInstituicaoDone && fetchFiltrosDone ?
    <>
    {/* console.log("fetchDone2", fetchDone)*/}
    <div className='barra_filtros'>
        <select name="estado" id="estados" value={ formFiltro.values.estado } onChange={(e) => {formFiltro.handleChange(e); fetchInstituicoes()}}>
            <option value="">Estado</option>
            {estados.map((estado , index) => (
                <option key={index} value={estado} onChange={formFiltro.handleChange}>{estado}</option>
            ))}
        </select>
        <select name="cidade" id="cidades" value={ formFiltro.values.cidade } onChange={(e) => {formFiltro.handleChange(e); fetchInstituicoes()}}>
            <option value="">Cidade</option>
            {cidades.map((cidade , index) => (
                <option key={index} value={cidade} onChange={formFiltro.handleChange}>{cidade}</option>
            ))}
        </select>
        <select name="bairro" id="bairros" value={ formFiltro.values.bairro } onChange={(e) => {formFiltro.handleChange(e); fetchInstituicoes()}}>
            <option value="">Bairro</option>
            {bairros.map((bairro , index) => (
                <option key={index} value={bairro} onChange={formFiltro.handleChange}>{bairro}</option>
            ))}
        </select>
        <select name="categorias" id="categorias" value={ formFiltro.values.categorias } onChange={(e) => {formFiltro.handleChange(e); fetchInstituicoes()}}>
            <option value="">Categoria</option>
            {categorias.map((categoria) => (
                <option key={categoria.codcategoria} value={categoria.codcategoria} onChange={formFiltro.handleChange}>{categoria.nomecategoria}</option>
            ))}
        </select>
        <span>
            <input type="checkbox" id="vagas" />
            <label for="vagas">Vagas Abertas</label>
        </span>
    </div>
    <div className='resultados'>
        
        {instituicoes.map((instituicao) => (
            <div className='container_resultado'>
                <div className='info_ong'>
                    {!img === null && <FontAwesomeIcon icon={ faHandHoldingHeart } size='8x' color='white' id='img_none' />}
                    {img !== null && <img id="img_perfilONG" src={img} alt="foto de perfil" className='rounded-full h-16 w-16' />}
                    <div className='container__dadosResultado'>
                        <span>
                            <p className='nome_ong'>{instituicao.nomeinstituicao}</p>
                            <p>{instituicao.descricao}</p>
                        </span>

                        <div className='opcoes_resultado'>
                            <button>SITE</button>
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