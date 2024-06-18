import React from 'react'
import Menu_ from '../../components/Menu_/Menu_'
import Menu_cadastro from './components/Menu_Cadastro/Menu_cadastro';

function Cadastro() {
  document.title = "Cadastro"
  return (
    <>
    <Menu_ />
    <div style={{position:"relative", top:"100px"}}>
      <Menu_cadastro />
    </div>
    </>
  )
}

export default Cadastro;