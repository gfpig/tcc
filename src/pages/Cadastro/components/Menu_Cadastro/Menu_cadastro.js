import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './menu_cadastro.css';
import ong from './assets/icons/icon_ong.png';
import beneficiario from './assets/icons/icon_beneficiario.png';
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
            <img src={ong} alt="icone ONG" />
            <span>ONG</span>
          </div>
          <div class={`tipo ${tipoAtual === 1 && "selecionado"}`} id="beneficiario" onClick={() => {
            setTipoAtual(1);
          }}>
            <img src={beneficiario} alt="icone beneficiário" />
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