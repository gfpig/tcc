import React from 'react';
import "./cadastro_ong_form.css";

function Cadastro_ong_form() {
  return (
    <>
    <div className="container_inputs">
        <div className="inputs_esquerda">
            <input type="text" placeholder="Nome da entidade" />
            <input type="text" placeholder="CNPJ" />
            <input type="email" placeholder="E-mail" />
            <div className='flex_gap'>
                <input type="password" placeholder="Senha" />
                <input type="password" placeholder="Confirmar senha" />
            </div>
            <div>
                <input type="text" value="Educação" disabled />
                <select name="categorias" id="categorias">
                    <option value="">Categoria</option>
                </select>
            </div>
        </div>
        <div className="inputs_direita">
            <div className='flex_gap'>
                <input type="text" placeholder="CEP" />
                <input type="text" placeholder="Bairro" />
            </div>
                <input type="text" placeholder="Logradouro" />
            <div className='flex_gap'>
                <input type="text" placeholder="Cidade" style={{width:"100%"}} />
                <input type="text" placeholder="UF" style={{width:"50px"}} />
            </div>
            <div className='flex_gap'>
                <input type="text" placeholder="Complemento" style={{width:"100%"}} />
                <input type="text" placeholder="Nº" style={{width:"50px"}} />      
            </div>
            <input type="text" placeholder="Telefone de contato" />
        </div>
    </div>
    </>
  )
}

export default Cadastro_ong_form