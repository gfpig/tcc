import React from 'react'
//import "./form_dados.css";

function Form_dados() {
  return (
        <div className="inputs_editar_dados">
            <input type="text" placeholder="Nome completo" />
            <div className='flex_gap'>
                <input type="text" placeholder="CPF" />
                <input type="text" placeholder="08/06/2000" disabled />
            </div><div className='flex_gap'>
                <select>
                    <option value="">Gênero</option>
                    <option>Masculino</option>
                    <option>Feminino</option>
                    <option>Não-binário</option>
                    <option>Outro</option>
                </select>
                <select>
                    <option value="">Escolaridade</option>
                    <option>Ensino fundamental incompleto</option>
                    <option>Ensino fundamental completo</option>
                    <option>Ensino médio incompleto</option>
                    <option>Ensino médio completo</option>
                    <option>Ensino superior incompleto</option>
                    <option>Ensino superior completo</option>
                </select>
            </div>
            <input type="text" placeholder="E-mail" />
            <div className='flex_gap'>
                <input type="text" value="Educação" disabled />
                <select name="categorias" id="categorias">
                    <option value="">Categoria</option>
                </select>
            </div>
            <div className='flex_gap'>
                <input type="text" placeholder="CEP" />
                <input type="text" placeholder="Bairro" />
            </div><div className='flex_gap'>
                <input type="text" placeholder="Nome completo da mãe" />
                <input type="text" placeholder="Nome completo do pai (opcional)" />
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
            <input type="text" placeholder="Telefone de contato" />
        </div>
  )
}

export default Form_dados