import React, {useState} from 'react'
import Menu_ from '../../components/Menu_/Menu_'
import Sidebar from '../../components/Sidebar/Sidebar'
import Form_dados from './components/Form_dados/Form_dados'
import Solicitacoes from './components/Solicitacoes/Solicitacoes';


function Configuracoes_ONG() {
  const opcoes = [<Form_dados />, <Solicitacoes />];

  return (
    <>
        <Menu_ />
        <Sidebar />
    </>
  )
}

export default Configuracoes_ONG