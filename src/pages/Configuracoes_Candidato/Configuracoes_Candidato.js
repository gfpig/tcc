import React, {useState} from 'react'
import Menu_ from '../../components/Menu_/Menu_'
import Sidebar from './components/Sidebar/Sidebar'
import Form_dados from './components/Sidebar/components/Form_dados/Form_dados'
import Solicitacoes from './components/Sidebar/components/Solicitacoes/Solicitacoes';


function Configuracoes_Candidato() {
  //const opcoes = [<Form_dados />, <Solicitacoes />];

  return (
    <>
        <Menu_ />
        <Sidebar />
    </>
  )
}

export default Configuracoes_Candidato