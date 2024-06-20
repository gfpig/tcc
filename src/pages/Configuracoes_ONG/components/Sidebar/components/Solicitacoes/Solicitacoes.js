import React, {useState, useEffect} from 'react';
import './solicitacoes.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' ;
import { faUserCircle, faCircle } from '@fortawesome/free-solid-svg-icons';
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
    const [cidades, setCidades] = useState([]);
    const [imgURL, setImgURL] = useState([]) //vetor que armazena a url das fotos de perfil
    const [img, setImg] = useState([]) //vetor que armazena as fotos de perfil
    const [idade, setIdade] = useState([])
    const [datanasc, setDatanasc] = useState([])

    const [fetchDone, setFetchDone] = useState(false)
    const [pesquisaDone, setPesquisaDone] = useState(null)
    const [fetchFotoPerfilDone, setFetchFotoPerfilDone] = useState(false)
    const [calculoIdadeDone, setCalculoIdadeDone] = useState(false)

    //Vetor que vai armazenar os filtros
    const formFiltro = CreateForm({
        initialValues: {
            cidades: '',
            status: ''
        }
    });

    useEffect (() => {
        const FetchCandidaturas = async () => {
            const { data: { session }} = await supabase.auth.getSession();

            try { //try para pegar as candidaturas               
                const { data, error } = await supabase
                .from('solicitacao')
                .select(`*, candidato(*)`)
                .eq('id_instituicao', session.user.id);

                if (error) {
                    console.log(error)
                    setCandidaturas([])
                }
          
                if (data) {                    
                    setCandidaturas(data)
                    const imgURLData = await Promise.all(data.map(async (solicitacao) => {
                        return solicitacao.candidato.foto
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

    useEffect(() => { //useEffect para calcular a idade do candidato
        const CalculaIdade = (index) => {
            //console.log(new Date("1988-10-13"))
            const hoje = new Date();
            const birthdateDate = new Date(datanasc[index]);
            //console.log(birthdateDate)
            let age = hoje.getFullYear() - birthdateDate.getFullYear();
            const monthDiff = hoje.getMonth() - birthdateDate.getMonth();

            if (monthDiff < 0 || (monthDiff === 0 && hoje.getDate() < birthdateDate.getDate())) {
            age--;
            }

            idade[index] = age;
            console.log(index)
            console.log(candidaturas.length)
            if (index === candidaturas.length - 1) {
                setCalculoIdadeDone(true);
            }
        }

        if (candidaturas.length > 0) { //coloca as idades no vetor de data de nascimento
            for (let i = 0; i < candidaturas.length; i++) {
                //console.log(candidaturas[i].candidato.datanascimento)
                datanasc[i] = candidaturas[i].candidato.datanascimento
                CalculaIdade(i);
            }
            //console.log(datanasc)
            //CalculaIdade();
        }

        //CalculaIdade();
    }, [candidaturas, datanasc]);

    const Pesquisar = async () => {
        try {
            const filtro = {
                'status': formFiltro.values.status
            }

            let query = supabase.from('solicitacao')
            .select('*, candidato(*)')

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
                    return solicitacao.candidato.foto
                }));
                setImgURL(imgURLData)
            } 
        } catch(error) {
            console.log(error);
        } finally {
            setPesquisaDone(true)
        }
    }

    const HandleAceitar = async (solicitacao) => {
        const { data: { session }} = await supabase.auth.getSession();

        const { error } = await supabase
        .from('solicitacao')
        .update({
            status: "APROVADO"
        })
        .eq('codsolicitacao', solicitacao.codsolicitacao)

        if(!error) {
            try { //enviar notificação de aceitação para o candidato
                const { error } = await supabase
                .from('notificacao')
                .insert({
                  id_instituicao: session.user.id,
                  fk_candidato_id: solicitacao.candidato.id,
                  tipo_mensagem: "Aceito"
                })
        
                if(!error) {
                    Swal.fire({
                        icon: "info",
                        title: "Solicitação aceita"
                    })
                }
              } catch (erro) {
                console.log("Ocorreu um erro: ", erro.message);
                Swal.fire({
                icon: "error",
                title: "Ocorreu um erro"
                })
              }
        } else {
            let mensagem = "Um erro ocorreu";
            console.log(error)
            Swal.fire({
                icon: "error",
                title: mensagem
            })
        }
    }

    const HandleRecusar = async (solicitacao) => {
        const { data: { session }} = await supabase.auth.getSession();
        const { error } = await supabase
        .from('solicitacao')
        .update({
            status: "NÃO APROVADO"
        })
        .eq('codsolicitacao', solicitacao.codsolicitacao)

        if(!error) {
            try { //enviar notificação de recusa para o candidato
                const { error } = await supabase
                .from('notificacao')
                .insert({
                  id_instituicao: session.user.id,
                  fk_candidato_id: solicitacao.candidato.id,
                  tipo_mensagem: "Recusa"
                })
        
                if(!error) {
                    Swal.fire({
                        icon: "info",
                        title: "Solicitação recusada"
                    })
                }
              } catch (erro) {
                    console.log("Ocorreu um erro: ", erro.message);
                    Swal.fire({
                    icon: "error",
                    title: "Ocorreu um erro"
                })
              }
        } else {
            let mensagem = "Um erro ocorreu";
            console.log(error)
            Swal.fire({
                icon: "error",
                title: mensagem
            })
        }
    }

  return (
    <>
    {fetchDone && calculoIdadeDone && fetchFotoPerfilDone && (pesquisaDone === null || pesquisaDone === true) ?
    <>
    {console.log(idade)}
        <div className='cabecalho__candidatura'>
            <div><p>CANDIDATOS</p></div>
            <div className='flex gap-3'>
                <select name="status" id="status" value={ formFiltro.values.status } onChange={(e) => {formFiltro.handleChange(e)}}>
                    <option value="">Status</option>
                    <option value="APROVADO">APROVADO</option>
                    <option value="EM ANÁLISE">EM ANÁLISE</option>
                    <option value="NÃO APROVADO">NÃO APROVADO</option>
                </select>
                <button className="botao_salvar" onClick={() => {setFetchFotoPerfilDone(false); setPesquisaDone(false)}}>FILTRAR</button>
            </div>
        </div>
        <hr className='hr_solicitacoes' />
        {candidaturas.length === 0 ? <center>Nenhum candidato safistaz essa pesquisa</center>:
             <>
            {candidaturas.map((solicitacao, index) => ( 
                <>
                <div className='container__candidato' key={solicitacao.codsolicitacao}>
                    <div className='info_candidatura'>
                        {img[index] !== null && <img id="img_perfilONG" src={img[index]} alt="foto de perfil"  />}
                        {img[index] === null && <FontAwesomeIcon icon={ faUserCircle } size='8x' color='#e87f45' style={{alignSelf:"center"}} />}
                        <div className='container__dadosCandidato'>
                            <span>
                                <p className='nome_candidato'>{solicitacao.candidato.nomecandidato}</p>
                                <p>Gênero: {solicitacao.candidato.genero}</p>
                                <p>Idade: {idade[index]}</p>
                                <p>Cidade: {solicitacao.candidato.cidade}</p>
                                <p>E-mail: {solicitacao.candidato.emailcandidato}</p>
                                <p>Telefone: {solicitacao.candidato.telefone}</p>
                                {solicitacao.candidato.escolaridade && <p>Escolaridade: {solicitacao.candidato.escolaridade}</p>}
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
                        <div className='flex gap-2'>
                            {solicitacao.status === "APROVADO" ? null : solicitacao.status === "NÃO APROVADO" ? null :
                                solicitacao.status === "EM ANÁLISE" ?
                                <>
                                <button onClick={() => {HandleAceitar(solicitacao)}} style={{backgroundColor:"#4CCD82"}}>ACEITAR</button>
                                <button onClick={() => {HandleRecusar(solicitacao)}} style={{backgroundColor:"#E84645"}}>RECUSAR</button>
                                </>
                            : {}}
                        </div>
                    </div>
                </div>
                </>
            ))}
            </>
        }
        </>
    : null}
        </>
  )
}

export default Solicitacoes