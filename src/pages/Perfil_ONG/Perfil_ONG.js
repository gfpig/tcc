import React from 'react'
import Menu_ from '../../components/Menu_/Menu_'
import Header_ONG from './components/Header_ONG/Header_ONG'
import Faixa_detalhes_ONG from './components/Faixa_detalhes_ONG/Faixa_detalhes_ONG'

function Perfil_ONG() {
  return (
    <>
        <Menu_ />
        <Header_ONG />
        <div style={{position:"relative", top:"384px"}}>    
            <Faixa_detalhes_ONG />
        </div>
    </>
  )
}

export default Perfil_ONG