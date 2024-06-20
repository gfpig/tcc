import React, {useState, useEffect} from 'react';
import './menu_.css';
import { createClient } from "@supabase/supabase-js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' ;
import { faHandHoldingHeart, faUserCircle, faUser, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import logotipo_roxo from '../../assets/other/logotipo_roxo.png';
import logotipo_gelo from '../../assets/other/logotipo_gelo.png';
import logotipo_transparente from '../../assets/other/logotipo_transparente.png';

const PROJECT_URL = "https://xljeosvrbsygpekwclan.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhsamVvc3ZyYnN5Z3Bla3djbGFuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ1MTY1NzAsImV4cCI6MjAzMDA5MjU3MH0.InFDrSOcPxRe4LXMBJ4dT59bBb3LSpKw063S90E3uPo"
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

const Menu = () => {
    const [imgPerfil, setImgPerfil] = useState(null);
    const [fetchError, setFetchError] = useState(null);
    const [instituicao, setInstituicao] = useState(null)
    const [session, setSession] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        let imgURL;
        const fetchFotoPerfil = async () => {
            try {
                const { data: { session }} = await supabase.auth.getSession(); //pega a sessão do usuário (se tem alguém logado e quem é)

                if (session) { //se houver usuário logado, faz um select com base no id do usuário
                    if (session.user.user_metadata.cpf === undefined){ //se o cpf não existir, checa a tabela instituição
                        const { data, error } = await supabase
                        .from('instituicao')
                        .select('foto, cnpj')
                        .eq('id', session.user.id)

                        if (error) {
                            setFetchError("Não foi possível recuperar as informações")
                            setImgPerfil(null)
                            console.log(fetchError)
                        }
            
                        if (data) {
                            data.map((user) => imgURL = user.foto)
                        }

                        try {
                            //Pega a img do storage
                            if (imgURL !== null) {
                                const { data: img_url } = await supabase.storage.from('avatares').getPublicUrl(imgURL);
                                setImgPerfil(img_url.publicUrl); //Coloca a URL no state
                            }
                        } catch (error) {
                            console.error('Error fetching image:', error.message);
                        }
                    } else { //checa candidato
                        const { data, error } = await supabase
                        .from('candidato')
                        .select('foto, cpf')
                        .eq('id', session.user.id)

                        if (error) {
                            setFetchError("Não foi possível recuperar as informações")
                            setImgPerfil(null)
                        }
            
                        if (data) {
                            data.map((user) => imgURL = user.foto)
                        }

                        try {
                            //Pega a img do storage
                            if (imgURL !== null) {
                                const { data: img_url } = await supabase.storage.from('avatares').getPublicUrl(imgURL);
                                
                                setImgPerfil(img_url.publicUrl); //Coloca a URL no state
                            }
                        } catch (error) {
                            console.error('Error fetching image:', error.message);
                        }
                    }
                }
            } catch(error) {
                console.log(fetchError)
            }
        }

        const verificaSessao = async () => { //pegando a sessão e colocando numa variável
            const { data: { session }} = await supabase.auth.getSession();
            setSession(session);

            if (session && session.user.user_metadata.cpf === undefined) {
                const { data } = await supabase
                .from('instituicao')
                .select('*')
                .eq('id', session.user.id)

                data.map((instituicao) => setInstituicao(instituicao))
            }

            fetchFotoPerfil();
        }
        verificaSessao()
    }, [])
    
    return (
        <>
        <nav className='navegacao_menu'>
            <ul className="menu_">
                <div className='logo'>
                    <a href="/"><img src={logotipo_gelo} alt="logotipo" /></a>
                </div>
                <div className='search_bar'>
                    <input id="search-input" type="text" maxLength="800" placeholder="Digite o nome da ONG" />
                    <a className='busca' href="resultado"><FontAwesomeIcon icon={ faMagnifyingGlass } size="lg" /></a>
                </div>
                <div className='container__login'>
                    {session ? ( //existe sessão? Se sim:
                            session.user.user_metadata.cpf === undefined ? (
                                imgPerfil ? ( //existe imgPerfil? Se sim:
                                    <button id="botao-user" className="botaoUser" onClick={() => navigate('/perfil_instituicao', { state:  instituicao })}><img src={imgPerfil} className='h-9 w-9 rounded-full' /></button>
                                ) : ( //se não existir imgPerfil:
                                    <button id="botao-user" className="botaoUser" onClick={() => navigate('/perfil_instituicao', { state:  instituicao })}><div className="overflow-clip bg-white h-9 w-9 rounded-full"><FontAwesomeIcon icon={ faHandHoldingHeart } size='2x' color='#e87f45' id='img_none' /></div></button>
                                )
                            ) : 
                                imgPerfil ? ( //existe imgPerfil? Se sim:
                                    <button id="botao-user" className="botaoUser"><a href="/configuracoes_candidato"><img src={imgPerfil} className='h-9 w-9 rounded-full' /></a></button>
                                ) : ( //se não existir imgPerfil:
                                    <button id="botao-user" className="botaoUser"><a href="configuracoes_candidato"><div className="flex items-end justify-center overflow-clip bg-white h-9 w-9 rounded-full"><FontAwesomeIcon icon={ faUser } size='2x' color='#e87f45' id='img_none' /></div></a></button>
                                )
                            )
                        :
                        (//se não existir seção:
                            <button id="botao-login" className="botaoLogin"><a href="/login">LOGIN</a></button>
                        )
                    }
                </div>
            </ul>
        </nav>
        </>
    );
}

export default Menu;