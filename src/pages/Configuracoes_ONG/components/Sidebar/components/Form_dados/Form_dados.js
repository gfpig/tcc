import React from 'react'
import "./form_dados.css";

function Form_dados() {
  return (
        <div className="inputs_editar_dados">
            <input type="text" placeholder="Nome da entidade" />
            <input type="text" placeholder="CNPJ" />
            <input type="email" placeholder="E-mail" />
            <div className='flex_gap'>
                <input type="password" placeholder="Senha" />
                <input type="password" placeholder="Confirmar senha" />
            </div>
            <input type='text' placeholder='Site da instituição' />
            <div className='flex_gap'>
                <input type="text" value="Educação" disabled />
                <select name="categorias" id="categorias">
                    <option value="">Categoria</option>
                </select>
            </div>
            <div className='flex_gap'>
                <input type="text" placeholder="CEP" />
                <input type="text" placeholder="Bairro" />
            </div>
                <input type="text" placeholder="Logradouro" />
            <div className='flex_gap'>
                <input type="text" placeholder="Cidade" />
                <input type="text" placeholder="UF" style={{width: "20%"}} />
            </div>
            <div className='flex_gap'>
                <input type="text" placeholder="Complemento" />
                <input type="text" placeholder="Nº" style={{width: "20%"}}/>      
            </div>
            <div className='flex_gap'>
                <input type="text" placeholder="Telefone de contato" />
                <input type="text" placeholder='WhatsApp' />
            </div>
            <textarea className='digitar_descricao' placeholder="Digite seu post" />
            <button className='botao_deletarConta'>DELETAR CONTA</button>
        </div>
  )
}

export default Form_dados