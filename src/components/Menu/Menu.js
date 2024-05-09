import React, {useState, useEffect} from 'react';
import './menu.css';
import { createClient } from "@supabase/supabase-js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' ;
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import logotipo from '../../assets/other/logotipo_temporario.png';

const PROJECT_URL = "https://xljeosvrbsygpekwclan.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhsamVvc3ZyYnN5Z3Bla3djbGFuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ1MTY1NzAsImV4cCI6MjAzMDA5MjU3MH0.InFDrSOcPxRe4LXMBJ4dT59bBb3LSpKw063S90E3uPo"
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

const Menu = () => {
    let dadosUser = null;

    const [user, setUser] = useState(null);
    const [imgPerfil, setImgPerfil] = useState(null);
    const [fetchError, setFetchError] = useState(null);
    
    useEffect(() => {
        const fetchFotoPerfil = async () => {
            try {
                console.log("alo")
                const session = supabase.auth.session();
                console.log("sessao:", session)
                if (session && session.user) {
                    const { data, error } = await supabase
                    .from('instituicao')
                    .select('foto')
                    .eq('id', session.user.id)

                    if (error) {
                        console.log("alo")
                        setFetchError("Não foi possível recuperar as informações")
                        setImgPerfil(null)
                        console.log(fetchError)
                    }
        
                    if (data) {
                        console.log("alo")
                        console.log("img:", data)
                        setImgPerfil(data)
                        console.log(imgPerfil)
                        setFetchError(null)
                    }
                }
            } catch(error) {
                console.log("alo")
                console.log(fetchError)
            }
        }
        // Function to fetch user session
        const fetchUser = async () => {
            try {
                const session = supabase.auth.session;
                setUser(session?.user ?? null); // Set user state based on session
                fetchFotoPerfil();
            } catch (error) {
                console.error('Error fetching user:', error.message);
            }
        };

        // Fetch user session on component mount
        fetchUser();

        // Subscribe to changes in auth state
        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            setUser(session?.user ?? null); // Update user state based on auth event
            console.log("user>", authListener);
        });
        // Cleanup function
        return () => {
            authListener.unsubscribe(); // Unsubscribe from auth state changes
        };
    }, []);

    /*useEffect(() => {
        const fetchFotoPerfil = async () => {
            try {
                console.log("alo")
                const session = supabase.auth.session();
                console.log("sessao:", session)
                if (session && session.user) {
                    const { data, error } = await supabase
                    .from('instituicao')
                    .select('foto')
                    .eq('id', session.user.id)

                    if (error) {
                        console.log("alo")
                        setFetchError("Não foi possível recuperar as informações")
                        setImgPerfil(null)
                        console.log(fetchError)
                    }
        
                    if (data) {
                        console.log("alo")
                        console.log("img:", data)
                        setImgPerfil(data)
                        console.log(imgPerfil)
                        setFetchError(null)
                    }
                }
            } catch(error) {
                console.log("alo")
                console.log(fetchError)
            }
        }

        fetchFotoPerfil();
    }, [])*/

    return (
        <>
        
        <nav className='navegacao_menu'>
            <ul className="menu">
                <div className='logo'>
                    <a href="/"><img src={logotipo} alt="logotipo" /></a>
                </div>
                <div className='search_bar'>
                    
                    <input id="search-input" type="text" maxLength="800" placeholder="Digite o nome da ONG" />
                    <a className='busca' href="resultado"><FontAwesomeIcon icon={ faMagnifyingGlass } size="lg" color='white' /></a>
                </div>
                <div className='container__login'>
                    {user ? (
                                <button id="botao-user" className="botaoUser"><a href="/Configuracoes_ONG">oi</a></button>
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