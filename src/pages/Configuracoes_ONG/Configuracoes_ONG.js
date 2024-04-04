import React from 'react'
import Menu_ from '../../components/Menu_/Menu_'
import Sidebar from '../../components/Sidebar/Sidebar'
import Form_dados from './components/Form_dados/Form_dados'


function Configuracoes_ONG() {
  return (
    <>
        <Menu_ />
        <div style={{display:"flex", justifyContent:"center"}}>
            <Sidebar />
            <Form_dados />
        </div>
    </>
    
  )
}

export default Configuracoes_ONG