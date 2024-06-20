import React from 'react'
import { useLocation } from 'react-router-dom'
import { LocationProvider } from '../../components/Context'
import Menu_ from '../../components/Menu_/Menu_'
import Header_ONG from './components/Header_ONG/Header_ONG'
import Faixa_detalhes_ONG from './components/Faixa_detalhes_ONG/Faixa_detalhes_ONG'
import Timeline_Sobre from './components/Timeline_Sobre/Timeline_Sobre'

function Perfil_ONG () {
  const location = useLocation();
  const instituicao = location.state

  document.title = instituicao.nomeinstituicao

  return (
    <>
      <LocationProvider>
        <Menu_ />
        <div className="relative top-12 flex flex-col ml-0 mr-0 md:ml-24 md:mr-24 lg:ml-40 lg:mr-40"> 
          <Header_ONG />
          <Faixa_detalhes_ONG />
          <hr style={{borderColor: "gray", marginTop:"1rem", marginBottom:"1rem"}} />
          <Timeline_Sobre />
        </div>
      </LocationProvider>
    </>
  )
}

export default Perfil_ONG