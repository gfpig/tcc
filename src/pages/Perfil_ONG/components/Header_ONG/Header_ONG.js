import React, { useState }from 'react'
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandHoldingHeart } from '@fortawesome/free-solid-svg-icons';
import { createClient } from "@supabase/supabase-js";

const PROJECT_URL = "https://xljeosvrbsygpekwclan.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhsamVvc3ZyYnN5Z3Bla3djbGFuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ1MTY1NzAsImV4cCI6MjAzMDA5MjU3MH0.InFDrSOcPxRe4LXMBJ4dT59bBb3LSpKw063S90E3uPo"
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

function Header_ONG() {
  const location = useLocation();
  const instituicao = location.state

  const [fotoPerfil, setFotoPerfil] = useState(null)
  const [fetchDone, setFetchDone] = useState(false)

  const FetchFotoStorage = async () => {
    try {
      const { data } = await supabase.storage.from('avatares').getPublicUrl(instituicao.foto);
      setFotoPerfil(data.publicUrl)
    } finally {
      setFetchDone(true)
    }
  }

  FetchFotoStorage();

  return (
    <>
      {fetchDone ? 
      <div className='header_instituicao'>
          <div className='container_fotoONG'>
            {instituicao.foto ?
              <img className='fotoONG' src={fotoPerfil} alt='foto de perfil' />
              : <div className="flex items-center justify-center overflow-clip bg-white h-52 w-52 rounded-full"><FontAwesomeIcon icon={ faHandHoldingHeart } size='8x' color='orange' /></div>
            }
          </div>    
      </div>
      : null} 
    </>
  )
}

export default Header_ONG