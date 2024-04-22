import React from 'react'

function Cadastro_beneficiario_form() {
  return (
    <>
    <div className="container_inputs">
        <div className="inputs_esquerda">
            <input type="text" placeholder="Nome completo" />
            <input type="text" placeholder="CPF" />
            
            <div className='flex_gap'>
                <input type="text" placeholder="Data de Nascimento"
                    onFocus={(e) => (e.target.type = "date")}
                    onBlur={(e) => (e.target.type = "text")}
                />
                <select name="generos" id="generos">
                    <option value="">Gênero</option>
                </select>
            </div>
            <input type="email" placeholder="E-mail" />
            <div className='flex_gap'>
                <input type="password" placeholder="Senha" />
                <input type="password" placeholder="Confirmar senha" />
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
    <div className='botao_cadastro'>
        <button className="btn_finalizarCadastro">Finalizar Cadastro</button>
    </div>
    </>
  )
}

export default Cadastro_beneficiario_form