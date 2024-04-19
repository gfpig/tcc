import React from 'react'
import Menu_ from '../../components/Menu_/Menu_'
import Header_ONG from './components/Header_ONG/Header_ONG'
import Faixa_detalhes_ONG from './components/Faixa_detalhes_ONG/Faixa_detalhes_ONG'
import Timeline_Sobre from './components/Timeline_Sobre/Timeline_Sobre'

function Perfil_ONG() {
  return (
    <>
      <Menu_ />
      <div style={{position:"relative", top:"50px", marginLeft:"200px", marginRight:"200px"}}>    
        <Header_ONG />
        <Faixa_detalhes_ONG />
        <hr style={{borderColor: "gray", marginTop:"1rem", marginBottom:"1rem"}} />
        <Timeline_Sobre/>
      </div>
    </>
  )
}

export default Perfil_ONG