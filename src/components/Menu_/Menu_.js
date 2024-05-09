import React, {useState, useEffect} from 'react';
import './menu_.css';
import { createClient } from "@supabase/supabase-js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' ;
import { faHandHoldingHeart, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import logotipo from '../../assets/other/logotipo_temporario.png';
import search from '../../assets/icons/search_bar.png';

const PROJECT_URL = "https://xljeosvrbsygpekwclan.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhsamVvc3ZyYnN5Z3Bla3djbGFuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ1MTY1NzAsImV4cCI6MjAzMDA5MjU3MH0.InFDrSOcPxRe4LXMBJ4dT59bBb3LSpKw063S90E3uPo"
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

const Menu = () => {
    const [imgPerfil, setImgPerfil] = useState(null);
    const [fetchError, setFetchError] = useState(null);
    const [session, setSession] = useState(null);

    useEffect(() => {
        const fetchFotoPerfil = async () => {
            try {
                const { data: { session }} = await supabase.auth.getSession();

                if (session) {
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
                        //console.log("img:", data)
                        setImgPerfil(data)
                        setFetchError(null)
                    }
                }
            } catch(error) {
                console.log(fetchError)
            }
        }

        const verificaSessao = async () => {
            const { data: { session }} = await supabase.auth.getSession();
            setSession(session);
            fetchFotoPerfil();
        }
        verificaSessao()
    }, [])
    
    return (
        <>
        <nav className='navegacao_menu'>
            <ul className="menu_">
                <div className='logo'>
                    <a href="/"><img src={logotipo} alt="logotipo" /></a>
                </div>
                <div className='search_bar'>
                    <input id="search-input" type="text" maxLength="800" placeholder="Digite o nome da ONG" />
                    <a className='busca' href="resultado"><FontAwesomeIcon icon={ faMagnifyingGlass } size="lg" /></a>
                </div>
                <div className='container__login'>
                {session ? (
                                imgPerfil ? (
                                    <button id="botao-user" className="botaoUser"><a href="/Configuracoes_ONG"><FontAwesomeIcon icon={ faHandHoldingHeart } size='2x' color='#e87f45' id='img_none' /></a></button>
                                ) : (
                                    <button id="botao-user" className="botaoUser"><a href="/Configuracoes_ONG"><img src={imgPerfil}></img></a></button>
                                )
                            )
                        :
                        (
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