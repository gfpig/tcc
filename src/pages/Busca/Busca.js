import React from 'react'
import Menu_ from '../../components/Menu_/Menu_'
import Resultados from './components/Resultados/Resultados'
import Filtro from './components/Filtro/Filtro'

function Busca() {
  return (
    <>
    <Menu_ />
    <div style={{position: "relative", top: "50px"}}>
        <Filtro />
        <Resultados />
    </div>
    </>
  )
}

export default Busca