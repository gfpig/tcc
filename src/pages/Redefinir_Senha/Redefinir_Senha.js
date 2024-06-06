import React from 'react'
import Login_cadastrar from '../Login/components/Login_cadastrar/Login_cadastrar'
import Menu_ from '../../components/Menu_/Menu_'
import Form_redefinir from './components/form_redefinir'

function Redefinir_Senha() {
  return (
    <>
    <Menu_ />
    <div className = "flex flex-col md:flex-row justify-center w-full"style={{display:"flex", height:"100%"}}>
        <Login_cadastrar />
        <Form_redefinir />
    </div>
    </>
  )
}

export default Redefinir_Senha