import React, { useState } from 'react';
import './menu_cadastro.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' ;
import { faBuildingNgo, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import Cadastro_ong_form from './components/Cadastro_ong_form/Cadastro_ong_form';
import Cadastro_beneficiario_form from './components/Cadastro_beneficiario_form/Cadastro_beneficiario_form';

function Menu_cadastro() {

  const tipos = ["ONG", "Beneficiário"];
  const forms = [<Cadastro_ong_form />, <Cadastro_beneficiario_form />];
  const [tipoAtual, setTipoAtual] = useState(0);

  return (
    <>   
      <div className={`tipos_conta`}>
          <div className={`tipo ${tipoAtual === 0 && "selecionado"}`} id="ong" onClick={() =>{
            setTipoAtual(0);
          }}>
            <FontAwesomeIcon icon={ faBuildingNgo} size="6x" />
            <span>INSTITUIÇÃO</span>
          </div>
          <div class={`tipo ${tipoAtual === 1 && "selecionado"}`} id="beneficiario" onClick={() => {
            setTipoAtual(1);
          }}>
            <FontAwesomeIcon icon={ faUserGroup} size="5x" />
            <span>CANDIDATO</span>
          </div>
      </div>

      <div>
        {forms[tipoAtual]}
      </div>
    </>
  )
}

export default Menu_cadastro