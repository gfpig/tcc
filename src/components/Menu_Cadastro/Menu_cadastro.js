import React from 'react';
import './menu_cadastro.css';
import ong from '../../assets/icons/icon_ong.png';
import beneficiario from '../../assets/icons/icon_beneficiario.png';

var tipo_conta = "ong";

function Menu_cadastro() {
  return (
    <>
        <div className="tipos_conta">
            <div className="tipo_ong" onClick={trocar_tipo}>
                <img src={ong} alt="icone ONG" />
                <span className="selecionado">ONG</span>
            </div>
            <div class="tipo_beneficiario" onClick={trocar_tipo}>
                <img src={beneficiario} alt="icone beneficiário" />
                <a href="./cadastro_beneficiario.html"><span className="nao_selecionado">BENEFICIÁRIO</span></a>
            </div>
        </div>
    </>
  )
}

const trocar_tipo = () => {
  /* LINK PARA TROCAR PARA O CADASTRO DO BENEFICIARIO */
  if (tipo_conta == "ong") {
      /* LINK PARA TROCAR PARA O CADASTRO DO BENEFICIARIO */
  } else {
      /* LINK PARA TROCAR PARA O CADASTRO DA ONG */
  }

}

export default Menu_cadastro